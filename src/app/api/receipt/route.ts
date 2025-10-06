import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { borrowings, books, users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const borrowingId = searchParams.get("id");

    if (!borrowingId) {
      return NextResponse.json({ error: "Borrowing ID is required" }, { status: 400 });
    }

    // Get borrowing details with book and user info
    const borrowingData = await db
      .select({
        id: borrowings.id,
        borrowedAt: borrowings.borrowedAt,
        dueDate: borrowings.dueDate,
        book: {
          title: books.title,
          author: books.author,
          isbn: books.isbn,
        },
        user: {
          name: users.name,
          email: users.email,
        }
      })
      .from(borrowings)
      .innerJoin(books, eq(borrowings.bookId, books.id))
      .innerJoin(users, eq(borrowings.userId, users.id))
      .where(eq(borrowings.id, parseInt(borrowingId)))
      .limit(1);

    if (borrowingData.length === 0) {
      return NextResponse.json({ error: "Borrowing record not found" }, { status: 404 });
    }

    const borrowing = borrowingData[0];

    // Return borrowing details as JSON (PDF generation can be added later)
    return NextResponse.json({
      message: "Borrowing receipt data",
      borrowing: borrowing,
      note: "PDF generation feature coming soon!"
    });

  } catch (error) {
    console.error("Error fetching borrowing details:", error);
    return NextResponse.json(
      { error: "Failed to fetch borrowing details" },
      { status: 500 }
    );
  }
}