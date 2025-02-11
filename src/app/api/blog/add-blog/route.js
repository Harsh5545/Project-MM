
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const blogSchema = z.object({
    title: z.string().min(2, "Title is required"),
    content: z.string().min(10, "Content must be at least 10 characters"),
    slug: z
        .string()
        .min(2, "Slug is required")
        .regex(/^[a-z0-9-]+$/, "Slug must be lowercase with dashes"),
    published: z.boolean(),
    authorId: z.number().int().positive("Author ID must be a positive integer"),
    categoryId: z.number().int().positive("Category ID must be a positive integer"),
    meta_title: z.string().optional().nullable(),
    meta_desc: z.string().optional().nullable(),
    tags: z.array(z.string()).optional(),
    image: z.string().optional().nullable()
});

export async function POST(req) {
    console.log(req)
    try {
        const data = await req.json();
        const parsedData = blogSchema.parse(data);

        const {
            title,
            content,
            slug,
            published,
            authorId,
            categoryId,
            meta_title,
            meta_desc,
            tags,
            image
        } = parsedData;


        const existingBlogSlug = await prisma.blog.findUnique({
            where: { slug },
        });

        if (existingBlogSlug) {
            return NextResponse.json(
                { success: false, message: "Slug must be unique" },
                { status: 400 }
            );
        }

        // Check if the author exists
        const author = await prisma.user.findUnique({
            where: { id: authorId },
            select: {
                id: true,
                email: true,
                image: true,
                first_name: true,
                last_name: true,
            },
        });

        if (!author) {
            return NextResponse.json(
                { success: false, message: "Author not found" },
                { status: 400 }
            );
        }


        // Check if the category exists
        const category = await prisma.category.findUnique({
            where: { id: categoryId },
        });

        if (!category) {
            return NextResponse.json(
                { success: false, message: "Category not found" },
                { status: 400 }
            );
        }

        if (category.status === "INACTIVE") {
            return NextResponse.json(
                { success: false, message: "Category is inactive please activate the category or select other category." },
                { status: 400 }
            );
        }



        // Create the blog entry
        const newBlog = await prisma.blog.create({
            data: {
                title,
                content,
                slug,
                published,
                authorId,
                categoryId,
                image,
                meta_title: meta_title || null,
                meta_desc: meta_desc || null,
                tags: {
                    connectOrCreate: tags?.map((tag) => ({
                        where: { name: tag },
                        create: { name: tag },
                    })),
                },
            },
            include: {
                author: {
                    select: {
                        id: true,
                        email: true,
                        image: true,
                        first_name: true,
                        last_name: true,
                    },
                },
                category: true,
                tags: true,
            },
        });

        return NextResponse.json({ success: true, data: newBlog });

    } catch (err) {
        if (err instanceof z.ZodError) {
            return NextResponse.json(
                {
                    success: false,
                    message: err.errors.map((e) => e.message).join(", "),
                },
                { status: 400 }
            );
        }
        return NextResponse.json(
            { success: false, message: "An unexpected error occurred", error: err },
            { status: 500 }
        );
    }
}
