
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        // Parse the request body
        const body = await req.json();

        // Basic validation of input fields
        if (
            !body.firstName ||
            !body.lastName ||
            !body.email ||
            !body.mobileNumber ||
            !body.password
        ) {
            return NextResponse.json({
                Message: "All fields are required.",
                Success: false,
            }, { status: 400 });
        }

        // Check if email is valid
        if (!/\S+@\S+\.\S+/.test(body.email)) {
            return NextResponse.json({
                Message: "Please enter a valid email.",
                Success: false,
            }, { status: 400 });
        }

        // Check if mobile number is valid (10 digits)
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(body.mobileNumber)) {
            return NextResponse.json({
                Message: "Please enter a valid 10-digit phone number.",
                Success: false,
            }, { status: 400 });
        }

        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(body.password, 10);

        // Prepare the new user object
        const newUser = {
            first_name: body.firstName,
            last_name: body.lastName,
            email: body.email,
            mobile_number: body.mobileNumber,
            password: hashedPassword,
            roleId: 1,  // Default role, you can adjust this as needed
        };

        // Create the user in the database
        const user = await prisma.user.create({
            data: newUser,
        });

        // Return success response
        return NextResponse.json({
            Message: "User created successfully",
            Success: true,
        });
    } catch (error) {
        console.error("Error in user creation:", error);

        // Return error response if anything goes wrong
        return NextResponse.json({
            Message: "User creation failed. Please try again later.",
            Success: false,
            Error: error.message || error,
        }, { status: 500 });
    }
}
