import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { books } from "@/db/schema";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      title,
      author,
      isbn,
      publisher,
      publicationYear,
      description,
      totalCopies,
      availableCopies,
      location,
      categoryId,
    } = body;

    // Validate required fields
    if (!title || !author) {
      return NextResponse.json(
        { error: "Title and author are required" },
        { status: 400 }
      );
    }

    // Create the book
    const newBook = await db.insert(books).values({
      title,
      author,
      isbn: isbn || null,
      publisher: publisher || null,
      publicationYear: publicationYear || null,
      description: description || null,
      totalCopies: totalCopies || 1,
      availableCopies: availableCopies || totalCopies || 1,
      location: location || null,
      categoryId: categoryId || null,
      isActive: true,
    }).returning();

    return NextResponse.json(
      { message: "Book created successfully", book: newBook[0] },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating book:", error);
    return NextResponse.json(
      { error: "Failed to create book" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";

    let query = db.select().from(books);

    // Apply filters
    if (search) {
      query = query.where(
        // This would need to be implemented with proper SQL conditions
        // For now, we'll get all books and filter in the application
      );
    }

    const allBooks = await query;
    
    // Apply search filter
    const filteredBooks = search 
      ? allBooks.filter(book => 
          book.title.toLowerCase().includes(search.toLowerCase()) ||
          book.author.toLowerCase().includes(search.toLowerCase()) ||
          (book.isbn && book.isbn.toLowerCase().includes(search.toLowerCase()))
        )
      : allBooks;

    // Apply category filter
    const categoryFilteredBooks = category
      ? filteredBooks.filter(book => book.categoryId === parseInt(category))
      : filteredBooks;

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedBooks = categoryFilteredBooks.slice(startIndex, endIndex);

    return NextResponse.json({
      books: paginatedBooks,
      total: categoryFilteredBooks.length,
      page,
      limit,
      totalPages: Math.ceil(categoryFilteredBooks.length / limit),
    });
  } catch (error) {
    console.error("Error fetching books:", error);
    return NextResponse.json(
      { error: "Failed to fetch books" },
      { status: 500 }
    );
  }
}
