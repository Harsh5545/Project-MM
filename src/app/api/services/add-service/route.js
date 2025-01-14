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
//   image: z.string().optional(),
//   heroImage: z.string().optional(),
// });

// export async function POST(req) {
//   try {
//     const data = await req.json();
//     const parsedData = serviceSchema.parse(data);
//     console.log(parsedData);

//     // Check if the category exists in the database
//     const categoryExists = await prisma.category.findUnique({
//       where: { id: parseInt(parsedData.category) },
//     });

//     if (!categoryExists) {
//       return NextResponse.json({ success: false, message: "Category not found" }, { status: 400 });
//     }

//     // Extract the necessary data for Prisma insertion
//     const newService = await prisma.service.create({
//       data: {
//         heading: parsedData.heading,
//         subheading: parsedData.subheading,
//         testimonial: parsedData.testimonials ? JSON.stringify(parsedData.testimonials) : null,
//         faq: parsedData.courseDetails ? JSON.stringify(parsedData.courseDetails) : null,
//         why_choose_program: parsedData.courseDescription,  // Assuming "courseDescription" maps here
//         program_details: parsedData.programDetails ? JSON.stringify(parsedData.programDetails) : null,
//         program_highlights: parsedData.courseDetails ? JSON.stringify(parsedData.courseDetails) : null, // Adjust as needed
//         overview: parsedData.courseDetails ? JSON.stringify(parsedData.courseDetails) : null, // Adjust as needed
//         what_program_offers: parsedData.programDetails ? JSON.stringify(parsedData.programDetails) : null, // Adjust as needed
//         hero_image: parsedData.heroImage || "", // If valid, save the hero image URL
//         image: parsedData.image || "", // If valid, save the image URL
//         slug: parsedData.mainTitle.toLowerCase().replace(/\s+/g, '-'), // Generate slug from title
//         meta_title: parsedData.mainTitle, // Set these fields if necessary
//         meta_description: parsedData.courseDescription, // Set these fields if necessary
//         og_title: parsedData.mainTitle, // Set these fields if necessary
//         og_image: parsedData.image || "", // Set these fields if necessary
//         keywords: "", // Set these fields if necessary
//         category: {
//           connect: { id: parseInt(parsedData.category) }, // Connect the category by ID
//         },
//       },
//     });

//     return NextResponse.json({ success: true, data: newService });
//   } catch (error) {

//     // Handle error safely without breaking the flow
//     const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";

//     return NextResponse.json({ success: false, message: errorMessage }, { status: 500 });
//   }
// }



import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

// Define validation schemas for nested structures

const courseHeadingSchema = z.object({
  heading: z.string().min(1, "Course heading is required"),
  subheading: z.string().min(1, "Course subheading is required"),
  icon: z.string().min(1, "Icon is required"),
});

const programHighlightSchema = z.object({
  icon: z.string().min(1, "Highlight icon is required"),
  heading: z.string().min(1, "Highlight heading is required"),
  description: z.string().min(1, "Highlight description is required"),
});

const faqSchema = z.object({
  question: z.string().min(1, "FAQ question is required"),
  answer: z.string().min(1, "FAQ answer is required"),
});

const testimonialSchema = z.object({
  comment: z.string().min(1, "Testimonial comment is required"),
  name: z.string().min(1, "Testimonial name is required"),
});

const ageGroupSchema = z.object({
  heading: z.string().min(1, "Age group heading is required"),
  subheading: z.string().min(1, "Age group subheading is required"),
});

const formatSchema = z.object({
  heading: z.string().min(1, "Format heading is required"),
  subheading: z.string().min(1, "Format subheading is required"),
});

const durationSchema = z.object({
  heading: z.string().min(1, "Duration heading is required"),
  subheading: z.string().min(1, "Duration subheading is required"),
});

const locationSchema = z.object({
  heading: z.string().min(1, "Location heading is required"),
  subheading: z.string().min(1, "Location subheading is required"),
});

const seoSchema = z.object({
  meta_title: z.string().min(1, "Meta title is required"),
  meta_description: z.string().min(1, "Meta description is required"),
  og_title: z.string().min(1, "OG title is required"),
  og_image: z.string().url("Invalid URL format for OG image").min(1),
  keywords: z.array(z.string().min(1)).optional(),
});

const courseDetailsSchema = z.object({
  courseHeadings: z.array(courseHeadingSchema).min(1, "At least one course heading is required"),
  programHighlights: z.array(programHighlightSchema).min(1, "At least one program highlight is required"),
  overviewDescription: z.string().min(1, "Overview description is required"),
});

const programDetailsSchema = z.object({
  ageGroups: z.array(ageGroupSchema).min(1, "At least one age group is required"),
  formats: z.array(formatSchema).min(1, "At least one format is required"),
  durations: z.array(durationSchema).min(1, "At least one duration is required"),
  locations: z.array(locationSchema).min(1, "At least one location is required"),
});

const testimonialDetailsSchema = z.object({
  taglineHeading: z.string().min(1, "Tagline heading is required"),
  mmDescription: z.string().min(1, "MM description is required"),
  testimonials: z.array(testimonialSchema).min(1, "At least one testimonial is required"),
  faqs: z.array(faqSchema).min(1, "At least one FAQ is required"),
  heroImage: z.string().url("Invalid URL format for hero image").optional(),
});

// Main schema for the root structure
const serviceSchema = z.object({
  heading: z.string().min(1, "Location heading is required"),
  subheading: z.string().min(1, "Location subheading is required"),
  courseDescription: z.string().min(1, "Course description is required"),
  category: z.string().min(1, "Category is required"),
  courseDetails: courseDetailsSchema,
  programDetails: programDetailsSchema,
  testimonials: testimonialDetailsSchema,
  seo: seoSchema,
  image: z.string().url("Invalid URL format for image").optional(),
  heroImage: z.string().url("Invalid URL format for hero image").optional(),
  // slug: z.string().min(1, "Slug is required"),
});

export async function POST(req) {
  try {
    const data = await req.json();
    const parsedData = serviceSchema.parse(data);
    console.log(parsedData);

    const categoryExists = await prisma.category.findUnique({
      where: { id: parseInt(parsedData.category) },
    });

    if (!categoryExists) {
      return NextResponse.json(
        { success: false, message: "The specified category was not found. Please check the category ID." },
        { status: 400 }
      );
    }

    const newService = await prisma.service.create({
      data: {
        heading: parsedData.heading,
        subheading: parsedData.subheading,
        testimonial: parsedData.testimonials ? JSON.stringify(parsedData.testimonials) : null,
        faq: parsedData.courseDetails ? JSON.stringify(parsedData.courseDetails) : null,
        why_choose_program: parsedData.courseDescription,
        program_details: parsedData.programDetails ? JSON.stringify(parsedData.programDetails) : null,
        program_highlights: parsedData.courseDetails ? JSON.stringify(parsedData.courseDetails) : null,
        overview: parsedData.courseDetails ? JSON.stringify(parsedData.courseDetails) : null,
        what_program_offers: parsedData.programDetails ? JSON.stringify(parsedData.programDetails) : null,
        hero_image: parsedData.heroImage || "",
        image: parsedData.image || "",
        slug: parsedData.heading.toLowerCase().replace(/\s+/g, '-'),
        meta_title: parsedData.mainTitle,
        meta_description: parsedData.courseDescription,
        og_title: parsedData.seo.og_title,
        og_image: parsedData.seo.og_image || "",
        keywords: parsedData.seo.keywords ? JSON.stringify(parsedData.seo.keywords) : null,
        category: {
          connect: { id: parseInt(parsedData.category) },
        },
      },
    });

    return NextResponse.json({ success: true, data: newService });

  } catch (error) {
    // Handle specific errors, and return user-friendly messages
    if (error instanceof z.ZodError) {
      const errorMessages = error.errors.map((e) => `${e.path.join(".")}: ${e.message}`);
      return NextResponse.json(
        { success: false, message: `Validation failed: ${errorMessages.join(', ')}` },
        { status: 400 }
      );
    }

    // Catch any other error, such as database-related issues
    console.error(error); // Log the error for debugging purposes
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}
