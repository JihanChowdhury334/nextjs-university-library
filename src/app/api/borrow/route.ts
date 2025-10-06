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

    const { bookId } = await request.json();
    
    if (!bookId) {
      return NextResponse.json({ error: "Book ID required" }, { status: 400 });
    }

    // Check if book exists and is available
    const book = await db.select().from(books).where(eq(books.id, bookId)).limit(1);
    
    if (book.length === 0) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    if ((book[0].availableCopies || 0) <= 0) {
      return NextResponse.json({ error: "Book not available" }, { status: 400 });
    }

    // Check if user already borrowed this book
    const existingBorrowing = await db.select()
      .from(borrowings)
      .where(and(
        eq(borrowings.userId, parseInt(session.user.id)),
        eq(borrowings.bookId, bookId),
        eq(borrowings.status, "borrowed")
      ))
      .limit(1);

    if (existingBorrowing.length > 0) {
      return NextResponse.json({ error: "You already borrowed this book" }, { status: 400 });
    }

    // Calculate due date (14 days from now)
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14);

    // Create borrowing record
    await db.insert(borrowings).values({
      userId: parseInt(session.user.id),
      bookId: bookId,
      dueDate: dueDate.toISOString().split('T')[0],
      status: "borrowed"
    });

    // Update available copies
    await db.update(books)
      .set({ 
        availableCopies: (book[0].availableCopies || 0) - 1,
        updatedAt: new Date()
      })
      .where(eq(books.id, bookId));

    return NextResponse.json({ message: "Book borrowed successfully" });

  } catch (error) {
    console.error("Error borrowing book:", error);
    return NextResponse.json(
      { error: "Failed to borrow book" },
      { status: 500 }
    );
  }
}
