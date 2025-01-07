// import { prisma } from "@/lib/prisma";
// import { NextResponse } from "next/server";
// import { z } from "zod";

// const serviceSchema = z.object({
//   mainTitle: z.string().min(1, "Main title is required"),
//   subTitle: z.string().min(1, "Subtitle is required"),
//   courseDescription: z.string().min(1, "Course description is required"),
//   category: z.string().min(1, "Category is required"),
//   courseDetails: z.object({}).passthrough(),
//   programDetails: z.object({}).passthrough(),
//   testimonials: z.object({}).passthrough(),
// });

// export async function POST(req) {
//   try {
//     const data = await req.json();
//     const parsedData = serviceSchema.parse(data);

//     const newService = await prisma.service.create({
//       data: parsedData,
//     });

//     return NextResponse.json({ success: true, data: newService });
//   } catch (error) {
//     if (error instanceof z.ZodError) {
//       return NextResponse.json({
//         success: false,
//         message: error.errors.map((e) => e.message).join(", "),
//       }, { status: 400 });
//     }

//     console.error("Error:", error);
//     return NextResponse.json({ success: false, message: error.message }, { status: 500 });
//   }
// }