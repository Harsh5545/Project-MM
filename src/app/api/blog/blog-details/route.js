import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Helper function to parse stringified JSON fields
const parseStringifiedFields = (data) => {
    return {
        ...data,
        seo: {
            meta_title: data.meta_title,
            meta_description: data.meta_description,
            og_title: data.og_title,
            og_image: data.og_image,
            keywords: data.keywords ? JSON.parse(data.keywords) : null,
        },
    };
};

// GET handler to fetch blog details by slug
export async function GET(req) {
    const url = new URL(req.url);
    const slug = url.searchParams.get("slug");

    if (!slug) {
        return NextResponse.json({ Success: false, error: "Slug is required" });
    }

    try {
   
        const blog = await prisma.blog.findUnique({
            where: {
                slug: slug, 
            },
            include: {
                category: {
                    select: {
                        category_name: true,
                    },
                },
                author: {
                    select: {
                        name: true,
                        bio: true,
                    },
                },
            },
        });

        if (!blog) {
            return NextResponse.json({ Success: false, error: "Blog not found" });
        }

        // Parse stringified fields before sending to the frontend
        const parsedBlog = parseStringifiedFields(blog);
        console.log(parsedBlog);

        return NextResponse.json({
            Success: true,
            data: parsedBlog,
        });
    } catch (error) {
        console.error("Error fetching blog by slug:", error);
        return NextResponse.json({ Success: false, error: error.message });
    }
}
