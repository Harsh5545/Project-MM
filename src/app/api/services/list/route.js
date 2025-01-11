// import { prisma } from "@/lib/prisma";
// import { NextResponse } from "next/server";

// // Helper function to handle sorting
// const handleSorting = (sortBy, sortOrder) => {
//   const validSortByFields = [
//     "heading", 
//     "subheading", 
//     "createdAt",
//     "updatedAt"
//   ]; // Add other fields that can be sorted
//   const validSortOrder = ["asc", "desc"];

//   return {
//     orderBy: {
//       [validSortByFields.includes(sortBy) ? sortBy : "createdAt"]:
//         validSortOrder.includes(sortOrder) ? sortOrder : "asc",
//     },
//   };
// };

// // Helper function to handle filtering
// const handleFiltering = (filterBy, categoryId) => {
//   const filters = {};

//   if (filterBy) {
//     filters.OR = [
//       { heading: { contains: filterBy, mode: "insensitive" } },
//       { subheading: { contains: filterBy, mode: "insensitive" } },
//       { testimonial: { contains: filterBy, mode: "insensitive" } },
//       { program_details: { contains: filterBy, mode: "insensitive" } },
//       { program_highlights: { contains: filterBy, mode: "insensitive" } },
//       { what_you_learn: { contains: filterBy, mode: "insensitive" } },
//     ];
//   }

//   if (categoryId) {
//     filters.categoryId = parseInt(categoryId, 10);
//   }

//   return filters;
// };

// // GET handler to fetch services with filtering, sorting, and pagination
// export async function GET(req) {
//   try {
//     // Parse query parameters
//     const url = new URL(req.url);
//     const page = parseInt(url.searchParams.get("page") || "1", 10);
//     const pageSize = parseInt(url.searchParams.get("pageSize") || "10", 10);
//     const filterBy = url.searchParams.get("filterBy") || ""; // Search term for filtering
//     const categoryId = url.searchParams.get("categoryId"); // Filter by categoryId
//     const sortBy = url.searchParams.get("sortBy") || "createdAt"; // Default sorting by `createdAt`
//     const sortOrder = url.searchParams.get("sortOrder") || "desc"; // Default sort order is `desc`

//     // Prepare query options
//     const sortOptions = handleSorting(sortBy, sortOrder);
//     const filterOptions = handleFiltering(filterBy, categoryId);

//     // Fetch services with pagination, sorting, and filtering
//     const services = await prisma.service.findMany({
//       ...filterOptions,
//       ...sortOptions,
//       skip: (page - 1) * pageSize,
//       take: pageSize,
//     });

//     // Get the total count of services for pagination purposes
//     const totalCount = await prisma.service.count({
//       where: filterOptions,
//     });

//     return NextResponse.json({
//       success: true,
//       data: services,
//       totalCount,
//       page,
//       pageSize,
//       totalPages: Math.ceil(totalCount / pageSize),
//     });
//   } catch (error) {
//     return NextResponse.json({ success: false, error: error.message });
//   }
// }



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
      { testimonial: { contains: filterBy, mode: "insensitive" } },
      { program_details: { contains: filterBy, mode: "insensitive" } },
      { program_highlights: { contains: filterBy, mode: "insensitive" } },
      { what_you_learn: { contains: filterBy, mode: "insensitive" } },
    ];
  }

  if (categoryId) {
    filters.categoryId = parseInt(categoryId, 10);
  }

  return filters;
};

// Helper function to parse stringified JSON fields
const parseStringifiedFields = (data) => {
  return data.map(item => {
    // Parse stringified JSON fields into actual objects
    return {
      ...item,
      testimonial: item.testimonial ? JSON.parse(item.testimonial) : null,
      faq: item.faq ? JSON.parse(item.faq) : null,
      program_details: item.program_details ? JSON.parse(item.program_details) : null,
      program_highlights: item.program_highlights ? JSON.parse(item.program_highlights) : null,
      overview: item.overview ? JSON.parse(item.overview) : null,
      what_program_offers: item.what_program_offers ? JSON.parse(item.what_program_offers) : null,
    };
  });
};

// GET handler to fetch services with filtering, sorting, and pagination
export async function GET(req) {
  try {
    // Parse query parameters
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const pageSize = parseInt(url.searchParams.get("pageSize") || "10", 10);
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

    // Parse stringified fields before sending to the frontend
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
    return NextResponse.json({ Success: false, error: error.message });
  }
}
