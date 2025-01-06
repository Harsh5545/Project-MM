import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

const categorySchema = z.object({
  categoryName: z.string().min(2, "Category name is required"),
  categoryImage: z.string().optional().nullable(),
  status: z.boolean(),
});

export async function POST(req) {
  try {
    const data = await req.json();
    const parsedData = categorySchema.parse(data);

    const { categoryName, status } = parsedData;

    const existingCategory = await prisma.category.findUnique({
      where: { category_name: categoryName },
    });

    if (existingCategory) {
      return NextResponse.json({ success: false, message: "Category already exists" }, { status: 400 });
    }

    const newCategory = {
      category_name: categoryName,
      status: status ? "ACTIVE" : "INACTIVE",
    };


    const result = await prisma.category.create({
      data: newCategory,
    });
    return NextResponse.json({ success: true, data: result });
    
  } catch (error) {

    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        message: error.errors.map(e => e.message).join(", "),
      }, { status: 400 });
    }

    console.error("Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
