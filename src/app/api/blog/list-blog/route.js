import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Helper function to handle sorting
const handleSorting = (sortBy, sortOrder) => {
  const validSortByFields = ["title", "createdAt", "updatedAt", "published"];
  const validSortOrder = ["asc", "desc"];

  return {
    orderBy: {
      [validSortByFields.includes(sortBy) ? sortBy : "createdAt"]:
        validSortOrder.includes(sortOrder) ? sortOrder : "asc",
    },
  };
};

// Helper function to handle filtering
const handleFiltering = (filterBy, categoryId, tags, published) => {
  const filters = {};

  // Filter by title/content if filterBy is provided
  if (filterBy) {
    filters.OR = [
      { title: { contains: filterBy, mode: "insensitive" } },
      { content: { contains: filterBy, mode: "insensitive" } },
    ];
  }

  // Filter by categoryId if provided
  if (categoryId) {
    filters.categoryId = parseInt(categoryId, 10);
  }

  // Filter by tags if provided
  if (tags && tags.length > 0) {
    filters.tags = {
      some: {
        name: { in: tags },
      },
    };
  }

  // Check if the `published` parameter is provided, and if it's not an empty string.
  // If `published` is an empty string (i.e., ''), we don't apply any filter.
  if (published !== '' && published !== null && published !== undefined) {
    filters.published = published === 'true'; // Convert 'true'/'false' string to boolean
  }

  return filters;
};

// Helper function to parse the response
const parseResponse = (data) => {
  return data.map(item => {
    return {
      ...item,
      seo: {
        metaTitle: item.meta_title,
        metaDescription: item.meta_desc,
      },
    };
  });
};

// GET handler to fetch blog posts with filtering, sorting, and pagination
export async function GET(req) {
  try {
    // Parse query parameters
    const url = new URL(req.url);
    const page = Math.max(1, parseInt(url.searchParams.get("page") || "1", 10));
    const pageSize = url.searchParams.get("pageSize") ? Math.max(1, parseInt(url.searchParams.get("pageSize"), 10)) : undefined; // If `pageSize` is not provided, it will be undefined
    const filterBy = url.searchParams.get("filterBy") || ""; // Search term for filtering
    const categoryId = url.searchParams.get("categoryId"); // Filter by categoryId
    const tags = url.searchParams.getAll("tags"); // Filter by tags
    const published = url.searchParams.get("published"); // Filter by published status
    const sortBy = url.searchParams.get("sortBy") || "createdAt"; // Default sorting by `createdAt`
    const sortOrder = url.searchParams.get("sortOrder") || "desc"; // Default sort order is `desc`

    // Prepare query options
    const sortOptions = handleSorting(sortBy, sortOrder);
    const filterOptions = handleFiltering(filterBy, categoryId, tags, published);

    // If pageSize is undefined, it means no pagination is needed, so fetch all records
    const queryOptions = pageSize
      ? {
          skip: (page - 1) * pageSize,
          take: pageSize,
      }
      : {}; // No pagination if pageSize is undefined

    // Fetch blog posts with pagination, sorting, and filtering
    const blogs = await prisma.blog.findMany({
      where: filterOptions,
      ...sortOptions,
      include: {
        author: {
          select: {
            first_name: true,  // Adjust these fields based on your actual schema
            last_name: true,
          },
        },
        category: {
          select: {
            category_name: true,
          },
        },
        tags: {
          select: {
            name: true,
          },
        },
      },
      ...queryOptions, // Apply pagination or fetch all records based on pageSize
    });

    // Get the total count of blogs for pagination purposes
    const totalCount = await prisma.blog.count({
      where: filterOptions,
    });

    // Parse the response (SEO fields, etc.)
    const parsedBlogs = parseResponse(blogs);

    return NextResponse.json({
      Success: true,
      data: parsedBlogs,
      totalCount,
      page,
      pageSize: pageSize || totalCount, // If no pageSize, treat all records as a single page
      totalPages: pageSize ? Math.ceil(totalCount / pageSize) : 1, // If no pagination, set totalPages to 1
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json({ Success: false, error: error.message });
  }
}
