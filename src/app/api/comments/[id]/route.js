import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"

export async function DELETE(req, { params }) {
  try {
    const session = await auth()
    const commentId = Number.parseInt(params.id)

    if (!session || !session.user) {
      return NextResponse.json({ error: "Authentication required." }, { status: 401 })
    }

    // Check if the user is an admin
    const user = await prisma.user.findUnique({
      where: { id: Number.parseInt(session.user.id) },
      include: { role: true },
    })

    if (!user || user.role.name !== "ADMIN") {
      // Assuming 'ADMIN' is the role name for administrators
      return NextResponse.json({ error: "Unauthorized. Admin access required." }, { status: 403 })
    }

    // Delete the comment
    await prisma.comment.delete({
      where: { id: commentId },
    })

    return NextResponse.json({ success: true, message: "Comment deleted successfully." }, { status: 200 })
  } catch (error) {
    console.error("Error deleting comment:", error)
    return NextResponse.json({ error: "Failed to delete comment." }, { status: 500 })
  }
}
