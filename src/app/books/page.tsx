import { db } from "@/db";
import { books, categories } from "@/db/schema";
import Link from "next/link";
import BooksList from "@/components/BooksList";
import { BookOpen, Plus, Settings, TrendingUp, CheckCircle, BookMarked, Tag } from "lucide-react";

// Cache this page for 60 seconds for better performance
export const revalidate = 60;

export default async function BooksPage() {
  const allBooks = await db.select().from(books);
  const allCategories = await db.select().from(categories);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="mb-16">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div>
              <h1 className="text-6xl font-black bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-4">
                Digital Collection
              </h1>
              <p className="text-xl text-white/80 font-light">
                Explore our curated library of knowledge and discovery
              </p>
            </div>
            
            <div className="flex gap-4">
              <Link
                href="/books/new"
                className="group bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl font-bold shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-500 flex items-center gap-3"
              >
                <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                Add Book
              </Link>
              <Link
                href="/admin"
                className="group bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-2xl font-bold shadow-2xl hover:shadow-white/10 transform hover:scale-105 transition-all duration-500 flex items-center gap-3"
              >
                <Settings className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                Admin
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
            <div className="group bg-white/5 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center text-white text-2xl group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-4xl font-black text-white mb-1">{allBooks.length}</p>
                  <p className="text-white/70 text-lg font-medium">Total Books</p>
                </div>
              </div>
            </div>
            
            <div className="group bg-white/5 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center text-white text-2xl group-hover:scale-110 transition-transform duration-300">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-4xl font-black text-white mb-1">{allBooks.filter(b => (b.availableCopies || 0) > 0).length}</p>
                  <p className="text-white/70 text-lg font-medium">Available</p>
                </div>
              </div>
            </div>
            
            <div className="group bg-white/5 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center text-white text-2xl group-hover:scale-110 transition-transform duration-300">
                  <BookMarked className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-4xl font-black text-white mb-1">{allBooks.filter(b => (b.availableCopies || 0) === 0).length}</p>
                  <p className="text-white/70 text-lg font-medium">Borrowed</p>
                </div>
              </div>
            </div>

            <div className="group bg-white/5 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center text-white text-2xl group-hover:scale-110 transition-transform duration-300">
                  <Tag className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-4xl font-black text-white mb-1">{allCategories.length}</p>
                  <p className="text-white/70 text-lg font-medium">Categories</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Books List with Search */}
        <BooksList books={allBooks} categories={allCategories} />
      </div>
    </div>
  );
}
