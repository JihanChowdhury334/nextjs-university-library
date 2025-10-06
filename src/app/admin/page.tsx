import { db } from "@/db";
import { books, users, borrowings, categories } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import Link from "next/link";

// Cache this page for 30 seconds
export const revalidate = 30;

export default async function AdminDashboard() {
  // Get all data for dashboard
  const [allBooks, allUsers, allBorrowings, allCategories] = await Promise.all([
    db.select().from(books),
    db.select().from(users),
    db.select().from(borrowings),
    db.select().from(categories),
  ]);

  // Calculate statistics
  const totalBooks = allBooks.length;
  const availableBooks = allBooks.filter(b => (b.availableCopies || 0) > 0).length;
  const borrowedBooks = allBooks.filter(b => (b.availableCopies || 0) === 0).length;
  const totalUsers = allUsers.length;
  const activeBorrowings = allBorrowings.filter(b => b.status === 'borrowed').length;
  const overdueBorrowings = allBorrowings.filter(b => {
    if (!b.dueDate) return false;
    return new Date(b.dueDate) < new Date() && b.status === 'borrowed';
  }).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      <div className="container mx-auto px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
                Admin Dashboard
              </h1>
              <p className="text-lg text-gray-600">
                Manage your library system
              </p>
            </div>
            
            <div className="flex gap-4">
              <Link
                href="/books/new"
                className="group bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                <span className="text-lg">➕</span>
                Add Book
              </Link>
              <Link
                href="/books"
                className="group bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                <span className="text-lg">📚</span>
                View Books
              </Link>
            </div>
          </div>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center text-white text-xl">
                📚
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{totalBooks}</p>
                <p className="text-gray-600">Total Books</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-white text-xl">
                ✅
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{availableBooks}</p>
                <p className="text-gray-600">Available</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center text-white text-xl">
                📖
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{borrowedBooks}</p>
                <p className="text-gray-600">Borrowed</p>
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center text-white text-xl">
                👥
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{totalUsers}</p>
                <p className="text-gray-600">Users</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white text-xl">
                📋
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{activeBorrowings}</p>
                <p className="text-gray-600">Active Loans</p>
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center text-white text-xl">
                ⚠️
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{overdueBorrowings}</p>
                <p className="text-gray-600">Overdue</p>
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center text-white text-xl">
                🏷️
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{allCategories.length}</p>
                <p className="text-gray-600">Categories</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            href="/admin/books"
            className="group bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 hover:scale-105"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center text-white text-2xl mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                📚
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Manage Books</h3>
              <p className="text-gray-600">Add, edit, and manage your book collection</p>
            </div>
          </Link>

          <Link
            href="/admin/users"
            className="group bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 hover:scale-105"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center text-white text-2xl mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                👥
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Manage Users</h3>
              <p className="text-gray-600">View and manage user accounts and permissions</p>
            </div>
          </Link>

          <Link
            href="/admin/borrowings"
            className="group bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 hover:scale-105"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center text-white text-2xl mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                📋
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Borrowing Records</h3>
              <p className="text-gray-600">Track all book loans and returns</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
