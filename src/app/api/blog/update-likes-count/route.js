
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function POST(req) {
    try {
        const body = await req.json();

        const { id, slug,status } = body;

        if (!id) {
            return NextResponse.json({ message: "ID is required" }, { status: 400 });
        }
        if (!slug) {
            return NextResponse.json({ message: "Slug is required" }, { status: 400 });
        }

        const existingBlog = await prisma.blog.findUnique({
            where: { slug },
        });


        if (!existingBlog) {
            return NextResponse.json({ message: "Blog not found" }, { status: 404 });
        }
        if(status === 'unlike'){
            existingBlog.likes -= 1;
        }else{
            existingBlog.likes += 1;
        }
        
        await prisma.blog.update({
            where: { id },
            data: { likes: existingBlog.likes },
        });

        return NextResponse.json({ message: `${status} Added successfully.` }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
}