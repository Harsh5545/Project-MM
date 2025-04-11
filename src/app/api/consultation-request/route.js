import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const consultationRequestSchema = z.object({
    fullName: z.string().min(2, "Full name is required"),
    phoneNumber: z
        .string()
        .min(10, "Phone number must be 10 digits")
        .max(10, "Phone number must be 10 digits")
        .regex(/^[789]\d{9}$/, "Invalid Indian phone number format"), // Indian phone number format
    emailAddress: z.string().email("Invalid email address"),
    serviceOfInterest: z.string().min(1, "Service of interest is required"),
    message: z.string().min(1, "Message is required"), // Ensures message is not empty
});

export async function POST(req) {
    const body = await req.json();

    try {
        // Parse and validate request body using Zod schema
        const parsedBody = consultationRequestSchema.parse(body);
        const { fullName, phoneNumber, emailAddress, serviceOfInterest, message } = parsedBody;

        const newConsultationRequest = await prisma.consultationRequest.create({
            data: {
                fullName,
                phoneNumber,
                emailAddress,
                serviceOfInterest,
                message,
            },
        });

        return NextResponse.json({ success: true, message: 'Your Consultation request has been submitted.', data: newConsultationRequest });

    } catch (error) {
        if (error instanceof z.ZodError) {
            // If the error is a Zod validation error, return detailed errors
            return NextResponse.json({
                success: false,
                message: "Validation Error",
                errors: error.errors.map(err => ({
                    path: err.path.join('.'),
                    message: err.message,
                })),
            }, { status: 400 });
        }

        // Handle unexpected errors
        return NextResponse.json({ success: false, message: "Something went wrong.", error: error.message }, { status: 500 });
    }
}
