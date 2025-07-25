import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"

export async function PATCH(req, { params }) {
  try {
    const session = await auth()
    const commentId = Number.parseInt(params.id)
    const { status } = await req.json() // 'APPROVED', 'REJECTED', 'PENDING'

    if (!session || !session.user) {
      return NextResponse.json({ error: "Authentication required." }, { status: 401 })
    }

    // Check if the user is an admin
    const user = await prisma.user.findUnique({
      where: { id: Number.parseInt(session.user.id) },
      include: { role: true },
    })

    if (!user || user.role.name !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized. Admin access required." }, { status: 403 })
    }

    if (!["PENDING", "APPROVED", "REJECTED"].includes(status)) {
      return NextResponse.json({ error: "Invalid status provided." }, { status: 400 })
    }

    const updatedComment = await prisma.comment.update({
      where: { id: commentId },
      data: { status },
    })

    return NextResponse.json({ success: true, data: updatedComment }, { status: 200 })
  } catch (error) {
    console.error("Error updating comment status:", error)
    return NextResponse.json({ error: "Failed to update comment status." }, { status: 500 })
  }
}
