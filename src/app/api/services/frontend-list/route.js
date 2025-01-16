import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Helper function to parse stringified JSON fields
const parseStringifiedFields = (data) => {
    console.log(data,"DATA>>>>>>>>>>>>")
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

// GET handler to fetch all services without any params
export async function GET() {
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
