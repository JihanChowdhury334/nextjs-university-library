import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { books, categories } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const bookId = parseInt(params.id);
    
    if (isNaN(bookId)) {
      return NextResponse.json({ error: "Invalid book ID" }, { status: 400 });
    }

    const book = await db.select().from(books).where(eq(books.id, bookId)).limit(1);
    
    if (book.length === 0) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    const bookData = book[0];
    const category = bookData.categoryId 
      ? await db.select().from(categories).where(eq(categories.id, bookData.categoryId)).limit(1)
      : null;

    return NextResponse.json({
      book: bookData,
      category: category?.[0] || null
    });

  } catch (error) {
    console.error("Error fetching book:", error);
    return NextResponse.json(
      { error: "Failed to fetch book" },
      { status: 500 }
    );
  }
}
