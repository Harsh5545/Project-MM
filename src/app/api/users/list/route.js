import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json(); // Parsing the incoming request body
    const { page = 1, pageSize = 10, sortBy = 'email', sortOrder = 'asc', search = '' } = body;

    // Construct search condition
    const where = search
      ? {
          OR: [
            { email: { contains: search, mode: 'insensitive' } },
            { first_name: { contains: search, mode: 'insensitive' } },
            { last_name: { contains: search, mode: 'insensitive' } },
          ],
        }
      : {};

    // Fetch paginated and sorted data from the database
    const users = await prisma.user.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: {
        [sortBy]: sortOrder,
      },
      include: {
        role: true, // Include role data if needed
      },
    });

    // Count the total number of users for pagination calculation
    const totalUsers = await prisma.user.count({ where });

    return NextResponse.json({
      data: users,
      total: totalUsers, // Ensure this is a numeric value
      page,
      pageSize,
      totalPages: Math.ceil(totalUsers / pageSize),
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
