import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function POST(req) {
    const body = await req.json();
    try {
        const result = await prisma.blog.delete({
            where: {
                id: body.blog_id
            }
        });
        return NextResponse.json({ Success: true, Message: "Blog Deleted Successfully.", data: result }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ Success: false, Message: "Something Went Wrong.", error: error.message }, { status: 500 });
    }
}