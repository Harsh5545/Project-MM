// import prisma from "@/lib/prisma";
// import { NextResponse } from "next/server";

// // GET handler to fetch all categories
// export async function GET(req) {
//   try {
//     // Fetch all categories from the database
//     const categories = await prisma.category.findMany();

//     // Return the list of categories
//     return NextResponse.json({ success: true, data: categories });
//   } catch (error) {
//     // Handle any errors that occur during the process
//     console.error("Error fetching categories:", error);
//     return NextResponse.json({ success: false, error: error.message });
//   }
// }



import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Helper function to handle sorting
const handleSorting = (sortBy, sortOrder) => {
  const validSortByFields = ["category_name", "status", "createdAt"];
  const validSortOrder = ["asc", "desc"];

  return {
    orderBy: {
      [validSortByFields.includes(sortBy) ? sortBy : "createdAt"]: 
        validSortOrder.includes(sortOrder) ? sortOrder : "asc",
    }
  };
};

// Helper function to handle filtering
const handleFiltering = (filterBy) => {
  if (!filterBy) return {};

  return {
    where: {
      category_name: {
        contains: filterBy, // Case-insensitive filtering by category name
        mode: 'insensitive',
      },
    },
  };
};

// GET handler to fetch categories with filtering, sorting, and pagination
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

    // Fetch categories with pagination, sorting, and filtering
    const categories = await prisma.category.findMany({
      ...filterOptions,
      ...sortOptions,
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    // Get the total count of categories for pagination purposes
    const totalCount = await prisma.category.count({
      where: filterOptions.where || {},
    });

    return NextResponse.json({
      success: true,
      data: categories,
      totalCount,
      page,
      pageSize,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
