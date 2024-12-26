import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

// The base directory where files will be stored (inside the public folder)
const BASE_UPLOAD_DIR = path.resolve(process.env.ROOT_PATH ?? "", "public/uploads");

export const POST = async (req) => {
    const formData = await req.formData();
    const body = Object.fromEntries(formData);
    const file = body.file || null;
    const folder = body.folder || "uploads"; // Default to 'uploads' if no folder is provided

    if (file) {
        const buffer = Buffer.from(await file.arrayBuffer());

        // Create the folder path dynamically (based on the provided folder)
        const folderPath = path.resolve(BASE_UPLOAD_DIR, folder);

        // Ensure the folder exists, create it if necessary
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
        }

        // Define the full file path to save the uploaded image
        const filePath = path.resolve(folderPath, file.name);

        // Write the file to disk
        fs.writeFileSync(filePath, buffer);

        // Generate the full URL to access the uploaded file
        const fullUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/uploads/${folder}/${file.name}`;

        // Return a response with the success status and the file URL
        return NextResponse.json({
            Success: true,
            name: file.name,
            url: fullUrl,
            Message: "file uploaded successfully.",
        });
    } else {
        return NextResponse.json({
            Success: false,
            Message: "No file uploaded",
        });
    }
};
