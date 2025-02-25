import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Helper function to handle sorting
const handleSorting = (sortBy, sortOrder) => {
  const validSortByFields = ["name", "last_name", "email", "createdAt"];
  const validSortOrder = ["asc", "desc"];

  return {
    orderBy: {
      [validSortByFields.includes(sortBy) ? sortBy : "createdAt"]: 
        validSortOrder.includes(sortOrder) ? sortOrder : "desc",
    },
  };
};

// Helper function to handle filtering
const handleFiltering = (filterBy) => {
  if (!filterBy) return {};

  return {
    where: {
      OR: [
        {
          name: {
            contains: filterBy,
            mode: 'insensitive',
          },
        },
        {
          last_name: {
            contains: filterBy,
            mode: 'insensitive',
          },
        },
        {
          email: {
            contains: filterBy,
            mode: 'insensitive',
          },
        },
      ],
    },
  };
};

// GET handler to fetch download entries with filtering, sorting, and pagination
export async function GET(req) {
  try {
    // Parse query parameters
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const pageSize = parseInt(url.searchParams.get("pageSize") || "10", 10);
    const filterBy = url.searchParams.get("filterBy") || "";
    const sortBy = url.searchParams.get("sortBy") || "createdAt";
    const sortOrder = url.searchParams.get("sortOrder") || "desc";

    // Prepare query options
    const sortOptions = handleSorting(sortBy, sortOrder);
    const filterOptions = handleFiltering(filterBy);

    // Fetch download entries with pagination, sorting, and filtering
    const downloadEntries = await prisma.downloadEntry.findMany({
      ...filterOptions,
      ...sortOptions,
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    // Get the total count of download entries for pagination purposes
    const totalCount = await prisma.downloadEntry.count({
      where: filterOptions.where || {},
    });

    return NextResponse.json({
      success: true,
      data: downloadEntries,
      totalCount,
      page,
      pageSize,
    });
  } catch (error) {
    console.error("Error fetching download entries:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
