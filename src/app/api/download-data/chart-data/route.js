import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const month = url.searchParams.get("month");

    if (!month) {
      return NextResponse.json({ message: 'Month parameter is required' }, { status: 400 });
    }

    // Extract year and month from the "YYYY-MM" format
    const [year, monthString] = month.split('-');
    const startOfMonth = new Date(`${year}-${monthString}-01T00:00:00.000Z`);
    const endOfMonth = new Date(startOfMonth);
    endOfMonth.setMonth(endOfMonth.getMonth() + 1); // Move to the next month
    endOfMonth.setDate(0); // Go back to the last day of the month

    // Use Prisma raw query to group by date only (ignoring time)
    const downloads = await prisma.$queryRaw`
      SELECT 
        DATE(createdAt) as date, 
        COUNT(*) as count
      FROM 
        DownloadEntry
      WHERE 
        createdAt >= ${startOfMonth} AND createdAt <= ${endOfMonth}
      GROUP BY 
        DATE(createdAt)
      ORDER BY 
        DATE(createdAt) ASC
    `;

    // Convert BigInt to Number for serialization
    const result = downloads.map((entry) => ({
      date: entry.date,
      count: Number(entry.count), // Convert BigInt to regular number
    }));

    return NextResponse.json({ message: 'Data found successfully.', data: result });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching data', error: error.message }, { status: 500 });
  }
}
