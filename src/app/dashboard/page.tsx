import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { db } from "@/db";
import { borrowings, books, users } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function Dashboard() {
  const session = await getServerSession();
  
  if (!session) {
    redirect("/signin");
  }

  // Get user's borrowed books
  const userBorrowings = await db
    .select({
      id: borrowings.id,
      borrowedAt: borrowings.borrowedAt,
      dueDate: borrowings.dueDate,
      returnedAt: borrowings.returnedAt,
      status: borrowings.status,
      fineAmount: borrowings.fineAmount,
      book: {
        id: books.id,
        title: books.title,
        author: books.author,
        coverImage: books.coverImage,
      }
    })
    .from(borrowings)
    .innerJoin(books, eq(borrowings.bookId, books.id))
    .where(eq(borrowings.userId, parseInt(session.user.id)));

  const activeBorrowings = userBorrowings.filter(b => b.status === 'borrowed');
  const overdueBorrowings = activeBorrowings.filter(b => {
    if (!b.dueDate) return false;
    return new Date(b.dueDate) < new Date();
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      <div className="container mx-auto px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
            My Library Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            Welcome back, {session.user.name}! Manage your borrowed books here.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center text-white text-xl">
                📚
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{activeBorrowings.length}</p>
                <p className="text-gray-600">Books Borrowed</p>
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center text-white text-xl">
                ⚠️
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{overdueBorrowings.length}</p>
                <p className="text-gray-600">Overdue Books</p>
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white text-xl">
                📋
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{userBorrowings.length}</p>
                <p className="text-gray-600">Total History</p>
              </div>
            </div>
          </div>
        </div>

        {/* Borrowed Books */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">My Borrowed Books</h2>
          
          {activeBorrowings.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full flex items-center justify-center text-4xl mb-6 mx-auto">
                📚
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">No books borrowed</h3>
              <p className="text-gray-600 mb-6">Start exploring our library collection!</p>
              <Link 
                href="/books"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Browse Books
              </Link>
            </div>
          ) : (
            <div className="grid gap-4">
              {activeBorrowings.map((borrowing) => (
                <div 
                  key={borrowing.id}
                  className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {borrowing.book.title}
                      </h3>
                      <p className="text-gray-600 mb-2">by {borrowing.book.author}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>📅 Borrowed: {new Date(borrowing.borrowedAt!).toLocaleDateString()}</span>
                        <span>📅 Due: {new Date(borrowing.dueDate!).toLocaleDateString()}</span>
                        {overdueBorrowings.includes(borrowing) && (
                          <span className="text-red-600 font-semibold">⚠️ OVERDUE</span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="bg-emerald-50 text-emerald-600 px-4 py-2 rounded-lg font-medium hover:bg-emerald-100 transition-colors duration-200">
                        Return Book
                      </button>
                      <button className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-100 transition-colors duration-200">
                        Renew
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
