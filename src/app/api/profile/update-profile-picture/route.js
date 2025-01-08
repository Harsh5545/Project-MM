import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    const body = await req.json();

    console.log(body);
    if (!body?.userId || !body?.image) {
        return NextResponse.json({ Success: false, Message: "Please fill all required data." });
    }
    const updatedUser = await prisma.user.update({
        where: { id: body.userId },
        data: { image: body.image },
    });
    console.log(updatedUser)
    return NextResponse.json({
        Success: true,
        data:updatedUser,
        Message: "Profile picture uploaded successfully.",
    });
}