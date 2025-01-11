import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Helper function to parse stringified JSON fields
const parseStringifiedFields = (data) => {
    // If the data is not null or undefined, parse the stringified JSON fields
    return {
        ...data,
        testimonial: data.testimonial ? JSON.parse(data.testimonial) : null,
        faq: data.faq ? JSON.parse(data.faq) : null,
        program_details: data.program_details ? JSON.parse(data.program_details) : null,
        program_highlights: data.program_highlights ? JSON.parse(data.program_highlights) : null,
        overview: data.overview ? JSON.parse(data.overview) : null,
        what_program_offers: data.what_program_offers ? JSON.parse(data.what_program_offers) : null,
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

        return NextResponse.json({
            Success: true,
            data: parsedService,
        });
    } catch (error) {
        console.error("Error fetching service by slug:", error);
        return NextResponse.json({ Success: false, error: error.message });
    }
}
