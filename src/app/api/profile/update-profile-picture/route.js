import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    // Parse the request body to JSON
    const body = await req.json();

    // Destructure the userId and imageUrl from the body
    let { userId, imageUrl } = body;

    // Validate that both userId and imageUrl are provided
    if (!userId || !imageUrl) {
      return NextResponse.json({
        Success: false,
        Message: "Please provide both userId and imageUrl.",
      });
    }

    // Convert userId to an integer if it's passed as a string
    userId = parseInt(userId, 10);
    if (isNaN(userId)) {
      return NextResponse.json({
        Success: false,
        Message: "Invalid userId format. It must be an integer.",
      });
    }

    // Update the user's image in the database
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { image: imageUrl },  // Update the image URL
    });

    // Return success response with updated user data
    return NextResponse.json({
      Success: true,
      data: updatedUser,
      Message: "Profile picture uploaded successfully.",
    });
  } catch (error) {
    console.error("Error while updating profile picture:", error);
    return NextResponse.json({
      Success: false,
      Message: `Error occurred while updating the profile picture: ${error.message}`,
    });
  }
};
