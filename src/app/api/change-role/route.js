import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function POST(req) {
  const { userId, newRole } = await req.json();

  if (!userId || !newRole) {
    return new Response(JSON.stringify({ message: "User ID and new role are required" }), { status: 400 });
  }

  try {
    const session = await auth();
    if (!session || !session.user) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    }

    await prisma.user.update({
      where: { id: userId },
      data: { role: newRole },
    });

    return new Response(JSON.stringify({ message: "User role updated successfully" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Internal server error", error }), { status: 500 });
  }
}