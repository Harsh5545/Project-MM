import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const categorySchema = z.object({
  categoryName: z.string().min(2, "Category name is required"),
  categoryImage: z.string().optional().nullable(),
  status: z.boolean(),
  id: z.string().optional().nullable(), // Include `id` for update operations
});

export async function POST(req) {
  try {
    const data = await req.json();
    const parsedData = categorySchema.parse(data);

    const { id, categoryName, status } = parsedData;

    if (id) {
      // Update existing category
      const existingCategory = await prisma.category.findUnique({
        where: { id },
      });

      if (!existingCategory) {
        return NextResponse.json({ Success: false, Message: "Category not found" }, { status: 404 });
      }

      const updatedCategory = await prisma.category.update({
        where: { id },
        data: {
          category_name: categoryName,
          status: status ? "ACTIVE" : "INACTIVE",
        },
      });

      return NextResponse.json({ Success: true,Message:"Category Updated Successfully.", Data: updatedCategory });
    } else {
      // Create new category
      const existingCategory = await prisma.category.findUnique({
        where: { category_name: categoryName },
      });

      if (existingCategory) {
        return NextResponse.json({ Success: false, Message: "Category already exists" }, { status: 400 });
      }

      const newCategory = {
        category_name: categoryName,
        status: status ? "ACTIVE" : "INACTIVE",
      };

      const result = await prisma.category.create({
        data: newCategory,
      });

      return NextResponse.json({ Success: true, Data: result });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          Success: false,
          Message: error.errors.map((e) => e.message).join(", "),
        },
        { status: 400 }
      );
    }

    console.error("Error:", error);
    return NextResponse.json({ Success: false, Message: error.message }, { status: 500 });
  }
}
