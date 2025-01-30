import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Helper function to parse stringified JSON fields
const parseStringifiedFields = (data) => {
    // If the data is not null or undefined, parse the stringified JSON fields
    return {
        ...data,
        testimonials: data.testimonials ? JSON.parse(data.testimonials) : null,
        programDetails: data.programDetails ? JSON.parse(data.programDetails) : null,
        courseDetails: data.courseDetails ? JSON.parse(data.courseDetails) : null,
        seo: {
            meta_title: data.meta_title,
            meta_description: data.meta_description,
            og_title: data.og_title,
            og_image: data.og_image,
            keywords: data.keywords ? JSON.parse(data.keywords) : null,
        },
    };
};

// GET handler to fetch service details by slug
export async function GET(req) {
    const url = new URL(req.url);
    const slug = url.searchParams.get("slug")

    if (!slug) {
        return NextResponse.json({ Success: false, error: "Slug is required" });
    }

    try {
        // Fetch the service by slug from the database
        const service = await prisma.service.findUnique({
            where: {
                slug: slug, // Use slug to find the service
            },
            include: {
                category: {
                    select: {
                        category_name: true,
                    },
                },
            },
        });

        if (!service) {
            return NextResponse.json({ Success: false, error: "Service not found" });
        }

        // Parse stringified fields before sending to the frontend
        const parsedService = parseStringifiedFields(service);
        console.log(parsedService)
        return NextResponse.json({
            Success: true,
            data: parsedService,
        });
    } catch (error) {
        console.error("Error fetching service by slug:", error);
        return NextResponse.json({ Success: false, error: error.message });
    }
}
