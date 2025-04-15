import path from 'path';
import fs from 'fs';
import { NextResponse } from 'next/server';

export async function GET() {
  const filePath = path.resolve('public', 'Modern_mannerism.pdf'); // Path to the PDF file
  const fileBuffer = fs.readFileSync(filePath);
  
  return new NextResponse(fileBuffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="free-tips.pdf"',
    },
  });
}
