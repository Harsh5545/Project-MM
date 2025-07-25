import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/auth" // Assuming you have NextAuth setup

export async function POST(req) {
  try {
    const session = await auth()
    const { blogId, content, parentId, name, email } = await req.json()

    console.log("Received comment data:", { blogId, content, parentId, name, email }) // Log received data

    if (!blogId || !content) {
      console.error("Validation failed: Missing blogId or content", { blogId, content }) // Log specific missing fields
      return NextResponse.json({ error: "Blog ID and content are required." }, { status: 400 })
    }

    let userId = null
    let guestName = null
    let guestEmail = null

    if (session?.user?.id) {
      // User is logged in
      userId = Number.parseInt(session.user.id) // Ensure userId is an integer
    } else {
      // User is not logged in (guest)
      if (!name || !email) {
        return NextResponse.json({ error: "Name and email are required for guest comments." }, { status: 400 })
      }
      guestName = name
      guestEmail = email
    }

    const newComment = await prisma.comment.create({
      data: {
        blogId: Number.parseInt(blogId), // Ensure blogId is an integer
        content,
        userId, // Will be null if guest
        guestName,
        guestEmail,
        parentId: parentId ? Number.parseInt(parentId) : null, // Ensure parentId is an integer or null
        status: "APPROVED", // Changed from PENDING to APPROVED
      },
    })

    return NextResponse.json({ success: true, data: newComment }, { status: 201 })
  } catch (error) {
    console.error("Error posting comment:", error)
    return NextResponse.json({ error: "Failed to post comment." }, { status: 500 })
  }
}

export async function GET(req) {
  try {
    const url = new URL(req.url)
    const blogId = url.searchParams.get("blogId")

    if (!blogId) {
      return NextResponse.json({ error: "Blog ID is required." }, { status: 400 })
    }

    const comments = await prisma.comment.findMany({
      where: {
        blogId: Number.parseInt(blogId),
        parentId: null, // Fetch top-level comments
        // No longer filtering by status: "APPROVED" here, as all new comments are approved.
        // Admins will see all comments, public will see only approved ones.
        // If you want public to see only approved, keep `status: "APPROVED"` here.
        // For now, I'll assume the GET route should return all comments for the admin view,
        // and the frontend will filter if needed for public.
        // However, the previous instruction was "Only show approved comments to public",
        // so I will keep the filter here for consistency with public view.
        status: "APPROVED",
      },
      include: {
        user: {
          select: {
            first_name: true,
            last_name: true,
            image: true,
            role: { select: { name: true } }, // Include user role to identify author/admin
          },
        },
        replies: {
          where: {
            status: "APPROVED", // Only show approved replies
          },
          include: {
            user: {
              select: {
                first_name: true,
                last_name: true,
                image: true,
                role: { select: { name: true } },
              },
            },
          },
          orderBy: {
            createdAt: "asc",
          },
        },
      },
      orderBy: {
        createdAt: "desc", // Most recent comments first
      },
    })

    return NextResponse.json({ success: true, data: comments }, { status: 200 })
  } catch (error) {
    console.error("Error fetching comments:", error)
    return NextResponse.json({ error: "Failed to fetch comments." }, { status: 500 })
  }
}
