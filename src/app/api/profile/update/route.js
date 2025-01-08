import { NextResponse } from "next/server";

export const POST = async (req) => {
    return NextResponse.json({
        Success: true,
        name: file.name,
        url: fullUrl,
        Message: "file uploaded successfully.",
    });
}