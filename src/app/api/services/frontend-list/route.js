import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

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

// GET handler to fetch all services without any params
export async function GET() {
    console.log('runnning............')
    try {
        // Fetch all services from the database
        const services = await prisma.service.findMany({
            include: {
                category: {
                    select: {
                        category_name: true,
                    },
                },
            },
        });

        // Parse stringified fields before sending to the frontend
        const parsedServices = parseStringifiedFields(services);

        return NextResponse.json({
            Success: true,
            data: parsedServices,
        });
    } catch (error) {
        return NextResponse.json({ Success: false, error: error.message });
    }
}
