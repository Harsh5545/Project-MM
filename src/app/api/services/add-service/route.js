import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const serviceSchema = z.object({
  mainTitle: z.string().min(1, "Main title is required"),
  subTitle: z.string().min(1, "Subtitle is required"),
  courseDescription: z.string().min(1, "Course description is required"),
  category: z.string().min(1, "Category is required"),
  courseDetails: z.object({}).passthrough(),
  programDetails: z.object({}).passthrough(),
  testimonials: z.object({}).passthrough(),
});

export async function POST(req) {
  try {
    const data = await req.json();
    const parsedData = serviceSchema.parse(data);

    // Extract the necessary data for Prisma insertion
    const newService = await prisma.service.create({
      data: {
        heading: parsedData.mainTitle,
        subheading: parsedData.subTitle,
        testimonial: parsedData.testimonials ? JSON.stringify(parsedData.testimonials) : null,
        faq: parsedData.courseDetails ? JSON.stringify(parsedData.courseDetails) : null,
        why_choose_program: parsedData.courseDescription,  // Assuming "courseDescription" maps here
        program_details: parsedData.programDetails ? JSON.stringify(parsedData.programDetails) : null,
        program_highlights: parsedData.courseDetails ? JSON.stringify(parsedData.courseDetails) : null, // Adjust as needed
        overview: parsedData.courseDetails ? JSON.stringify(parsedData.courseDetails) : null, // Adjust as needed
        what_program_offers: parsedData.programDetails ? JSON.stringify(parsedData.programDetails) : null, // Adjust as needed
        hero_image: "", // You can add logic here to handle images
        image: "", // You can add logic here to handle images
        slug: parsedData.mainTitle.toLowerCase().replace(/\s+/g, '-'), // Generate slug from title (you may adjust the logic)
        meta_title: "", // Set these fields if necessary
        meta_description: "", // Set these fields if necessary
        og_title: "", // Set these fields if necessary
        og_image: "", // Set these fields if necessary
        keywords: "", // Set these fields if necessary
        category: {
          connect: { id: parseInt(parsedData.category) }, // Assuming categoryId is the ID of the category
        },
      },
    });

    return NextResponse.json({ success: true, data: newService });
  } catch (error) {
    // Handle error safely without breaking the flow
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";

    // Send the actual error message in the response without crashing the app
    return NextResponse.json({ success: false, message: errorMessage }, { status: 500 });
  }
}