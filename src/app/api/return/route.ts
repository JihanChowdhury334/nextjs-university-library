import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { db } from "@/db";
import { books, borrowings } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { borrowingId } = await request.json();
    
    if (!borrowingId) {
      return NextResponse.json({ error: "Borrowing ID required" }, { status: 400 });
    }

    // Check if borrowing exists and belongs to user
    const borrowing = await db.select()
      .from(borrowings)
      .where(and(
        eq(borrowings.id, borrowingId),
        eq(borrowings.userId, parseInt(session.user.id)),
        eq(borrowings.status, "borrowed")
      ))
      .limit(1);

    if (borrowing.length === 0) {
      return NextResponse.json({ error: "Borrowing not found" }, { status: 404 });
    }

    // Update borrowing status
    await db.update(borrowings)
      .set({ 
        status: "returned",
        returnedAt: new Date()
      })
      .where(eq(borrowings.id, borrowingId));

    // Get book info
    const book = await db.select().from(books).where(eq(books.id, borrowing[0].bookId)).limit(1);
    
    if (book.length > 0) {
      // Update available copies
      await db.update(books)
        .set({ 
          availableCopies: (book[0].availableCopies || 0) + 1,
          updatedAt: new Date()
        })
        .where(eq(books.id, borrowing[0].bookId));
    }

    return NextResponse.json({ message: "Book returned successfully" });

  } catch (error) {
    console.error("Error returning book:", error);
    return NextResponse.json(
      { error: "Failed to return book" },
      { status: 500 }
    );
  }
}
