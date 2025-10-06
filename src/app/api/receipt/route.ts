import { NextRequest, NextResponse } from "next/server";
import { renderToStream } from "@react-pdf/renderer";
import { BorrowingReceipt } from "@/lib/pdf-generator";
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

    // Generate PDF
    const stream = await renderToStream(
      <BorrowingReceipt borrowing={borrowing} />
    );

    const chunks: Uint8Array[] = [];
    const reader = stream.getReader();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
    }

    const pdfBuffer = Buffer.concat(chunks);

    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="borrowing-receipt-${borrowing.id}.pdf"`,
      },
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    );
  }
}
