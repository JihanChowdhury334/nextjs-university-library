import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { db } from "@/db";
import { borrowings, books, categories } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Get user's borrowings with book and category info
    const userBorrowings = await db
      .select({
        id: borrowings.id,
        bookId: borrowings.bookId,
        borrowedAt: borrowings.borrowedAt,
        dueDate: borrowings.dueDate,
        returnedAt: borrowings.returnedAt,
        status: borrowings.status,
        bookTitle: books.title,
        bookAuthor: books.author,
        categoryName: categories.name
      })
      .from(borrowings)
      .innerJoin(books, eq(borrowings.bookId, books.id))
      .leftJoin(categories, eq(books.categoryId, categories.id))
      .where(eq(borrowings.userId, parseInt(session.user.id)))
      .orderBy(borrowings.borrowedAt);

    return NextResponse.json(userBorrowings);

  } catch (error) {
    console.error("Error fetching user books:", error);
    return NextResponse.json(
      { error: "Failed to fetch books" },
      { status: 500 }
    );
  }
}
