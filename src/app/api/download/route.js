import path from "path"
import fs from "fs"
import { NextResponse } from "next/server"

export async function GET() {
  const filePath = path.resolve("public", "Modern_mannerism.pdf") // Path to the PDF file

  try {
    const fileBuffer = fs.readFileSync(filePath)

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="Modern_mannerism.pdf"', // Changed filename here
      },
    })
  } catch (error) {
    console.error("Error serving PDF file:", error)
    return NextResponse.json({ error: "PDF file not found or accessible." }, { status: 404 })
  }
}
