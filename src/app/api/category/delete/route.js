import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function POST(req) {
    const body = await req.json();
    console.log(body)
    try {
        const result = await prisma.category.delete({
            where: {
                id: body.id
            }
        });
        return NextResponse.json({ Success: true,Message:"Category Deleted Successfully.", data: result });
    } catch (error) {
        return NextResponse.json({ Success: false,Message:"Something Went Wrong.", error: error.message }, { status: 500 });
    }
}