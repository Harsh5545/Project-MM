import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Helper function to handle sorting
const handleSorting = (sortBy, sortOrder) => {
  const validSortByFields = [
    "heading",
    "subheading",
    "createdAt",
    "updatedAt"
  ]; // Add other fields that can be sorted
  const validSortOrder = ["asc", "desc"];

  return {
    orderBy: {
      [validSortByFields.includes(sortBy) ? sortBy : "createdAt"]:
        validSortOrder.includes(sortOrder) ? sortOrder : "asc",
    },
  };
};

// Helper function to handle filtering
const handleFiltering = (filterBy, categoryId) => {
  const filters = {};

  if (filterBy) {
    filters.OR = [
      { heading: { contains: filterBy, mode: "insensitive" } },
      { subheading: { contains: filterBy, mode: "insensitive" } },
      // Remove JSON fields from the filter logic
    ];
  }

  if (categoryId) {
    filters.categoryId = parseInt(categoryId, 10);
  }

  return filters;
};

// Helper function to parse stringified JSON fields (if needed)
const parseStringifiedFields = (data) => {
  return data.map(item => {
    return {
      ...item,
      testimonials: item.testimonials ? JSON.parse(item.testimonials) : null,
      programDetails: item.programDetails ? JSON.parse(item.programDetails) : null,
      courseDetails: item.courseDetails ? JSON.parse(item.courseDetails) : null, 
      seo: {
        meta_title: item.meta_title,
        meta_description: item.meta_description,
        og_title: item.og_title,
        og_image: item.og_image,
        keywords: item.keywords ? JSON.parse(item.keywords) : null,
      },
    };
  });
};



// GET handler to fetch services with filtering, sorting, and pagination
export async function GET(req) {
  try {
    // Parse query parameters
    const url = new URL(req.url);
    const page = Math.max(1, parseInt(url.searchParams.get("page") || "1", 10)); // Ensure page is at least 1
    const pageSize = Math.max(1, parseInt(url.searchParams.get("pageSize") || "10", 10)); // Ensure pageSize is at least 1
    const filterBy = url.searchParams.get("filterBy") || ""; // Search term for filtering
    const categoryId = url.searchParams.get("categoryId"); // Filter by categoryId
    const sortBy = url.searchParams.get("sortBy") || "createdAt"; // Default sorting by `createdAt`
    const sortOrder = url.searchParams.get("sortOrder") || "desc"; // Default sort order is `desc`

    // Prepare query options
    const sortOptions = handleSorting(sortBy, sortOrder);
    const filterOptions = handleFiltering(filterBy, categoryId);

    // Fetch services with pagination, sorting, and filtering
    const services = await prisma.service.findMany({
      ...filterOptions,
      ...sortOptions,
      include: {
        category: {
          select: {
            category_name: true,
          },
        },
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    // Get the total count of services for pagination purposes
    const totalCount = await prisma.service.count({
      where: filterOptions,
    });

    // Don't parse the stringified JSON fields that are already stored as strings
    const parsedServices = parseStringifiedFields(services);

    return NextResponse.json({
      Success: true,
      data: parsedServices,
      totalCount,
      page,
      pageSize,
      totalPages: Math.ceil(totalCount / pageSize),
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return NextResponse.json({ Success: false, error: error.message });
  }
}
