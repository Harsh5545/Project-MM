import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

// Define the validation schemas
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
  overviewImage: z.string().min(1, "overview Image is required"),
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
  heroImage: z.string().min(1, "hero Image is required"),
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
  heroImage: z.string().min(1, "hero Image is required"),
});

// Function to translate Zod error paths to user-friendly messages
const translateZodErrors = (errors) => {
  const userFriendlyMessages = {
    heading: "Please provide a heading for the service.",
    subheading: "Please provide a subheading for the service.",
    courseDescription: "Please provide a course description.",
    category: "Category is required. Please select a valid category.",
    "courseDetails.courseHeadings.0.heading": "The course heading is required in the course details.",
    "courseDetails.courseHeadings.0.subheading": "The course subheading is required in the course details.",
    "courseDetails.courseHeadings.0.icon": "Icon is required in the course details.",
    "courseDetails.programHighlights.0.heading": "The highlight heading is required.",
    "courseDetails.programHighlights.0.description": "The highlight description is required.",
    "courseDetails.overviewDescription": "The overview description is required.",
    "courseDetails.overviewImage": "The overview Image is required.",
    "programDetails.ageGroups.0.subheading": "The age group subheading is required.",
    "programDetails.formats.0.heading": "The format heading is required.",
    "programDetails.formats.0.subheading": "The format subheading is required.",
    "programDetails.durations.0.heading": "The duration heading is required.",
    "programDetails.durations.0.subheading": "The duration subheading is required.",
    "programDetails.locations.0.heading": "The location heading is required.",
    "programDetails.locations.0.subheading": "The location subheading is required.",
    "testimonials.taglineHeading": "The tagline heading is required.",
    "testimonials.mmDescription": "The MM description is required.",
    "testimonials.testimonials.0.comment": "The testimonial comment is required.",
    "testimonials.testimonials.0.name": "The testimonial name is required.",
    "testimonials.faqs.0.question": "The FAQ question is required.",
    "testimonials.faqs.0.answer": "The FAQ answer is required.",
    "testimonials.heroImage": "Please provide a valid URL for the hero image.",
    "seo.meta_title": "Please provide a meta title.",
    "seo.meta_description": "Please provide a meta description.",
    "seo.og_title": "Please provide an OG title.",
    "seo.og_image": "Please provide a valid URL for the OG image.",
    image: "Please provide a valid URL for the image.",
  };

  return errors.map((error) => {
    const path = error.path.join(".");
    return {
      field: path,
      message: userFriendlyMessages[path] || `${path} is invalid.`,
    };
  });
};

// POST request handler
export async function POST(req) {
  try {
    const data = await req.json();
    const parsedData = serviceSchema.parse(data); // Zod validation

    // Check if the category exists in the database
    const categoryExists = await prisma.category.findUnique({
      where: { id: parseInt(parsedData.category) },
    });

    if (!categoryExists) {
      return NextResponse.json(
        { success: false, message: "The specified category was not found. Please check the category ID." },
        { status: 400 }
      );
    }

    // Create a new service entry in the database
    const newService = await prisma.service.create({
      data: {
        heading: parsedData.heading,
        subheading: parsedData.subheading,
        courseDescription: parsedData.courseDescription,
        testimonials: parsedData.testimonials ? JSON.stringify(parsedData.testimonials) : null,
        programDetails: parsedData.programDetails ? JSON.stringify(parsedData.programDetails) : null,
        courseDetails: parsedData.courseDetails ? JSON.stringify(parsedData.courseDetails) : null,
        hero_image: parsedData.testimonials.heroImage || "",
        image: parsedData.image || "",
        slug: parsedData.heading.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''),
        meta_title: parsedData.seo.meta_title,
        meta_description: parsedData.seo.meta_description,
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
    if (error instanceof z.ZodError) {
      const errorMessages = translateZodErrors(error.errors);
      return NextResponse.json(
        { success: false, errors: errorMessages },
        { status: 400 }
      );
    }

    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}
