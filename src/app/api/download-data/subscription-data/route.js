import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    // Extract the month parameter from the request query
    const url = new URL(req.url);
    const month = url.searchParams.get("month");

    // Validate the month format (should be in YYYY-MM format)
    if (!month || !/^\d{4}-\d{2}$/.test(month)) {
      return NextResponse.json({ message: "Invalid month format. Please use YYYY-MM." });
    }

    // Calculate start and end dates for the given month
    const startDate = new Date(`${month}-01T00:00:00Z`); // Start of the month (00:00:00 UTC)
    const endDate = new Date(startDate);
    endDate.setMonth(startDate.getMonth() + 1); // Set the date to the first day of the next month
    endDate.setHours(0, 0, 0, 0); // Set time to 00:00:00 for the end of the range

    // Fetch data filtered by the provided month
    const data = await prisma.subscription.groupBy({
      by: ['createdAt'],
      _count: {
        id: true,
      },
      where: {
        createdAt: {
          gte: startDate, // Start of the month
          lt: endDate, // End of the month (exclusive)
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    // Format the data for charting
    const chartData = data.map((entry) => ({
      date: entry.createdAt.toISOString().split('T')[0], // Format as YYYY-MM-DD
      count: entry._count.id,
    }));

    return NextResponse.json({ message: 'Data found successfully.', data: chartData });

  } catch (error) {
    return NextResponse.json({ message: 'No data found', error: error.message });
  }
}
