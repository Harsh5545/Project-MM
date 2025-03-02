
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function POST(req) {
    try {
        const body = await req.json();

        const { id, slug } = body;

        if (!id) {
            return NextResponse.json({ message: "ID is required" }, { status: 400 });
        }
        if (!slug) {
            return NextResponse.json({ message: "Slug is required" }, { status: 400 });
        }

        const existingBlog = await prisma.blog.findUnique({
            where: { slug },
        });
        console.log(existingBlog, 'RESPONSE FROM PRISMA');

        if (!existingBlog) {
            return NextResponse.json({ message: "Blog not found" }, { status: 404 });
        }

        existingBlog.views += 1;

        await prisma.blog.update({
            where: { id },
            data: { views: existingBlog.views },
        });

        return NextResponse.json({ message: "Updated blog view count successfully." }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
}