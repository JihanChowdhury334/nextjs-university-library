"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { BookOpen, Calendar, Clock, CheckCircle, AlertCircle, RotateCcw } from "lucide-react";

interface BorrowedBook {
  id: number;
  bookId: number;
  borrowedAt: string;
  dueDate: string;
  returnedAt: string | null;
  status: string;
  bookTitle: string;
  bookAuthor: string;
  categoryName: string | null;
}

export default function MyBooksPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [borrowedBooks, setBorrowedBooks] = useState<BorrowedBook[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
      return;
    }

    if (status === "authenticated") {
      fetchMyBooks();
    }
  }, [status, router]);

  const fetchMyBooks = async () => {
    try {
      const response = await fetch("/api/my-books");
      if (response.ok) {
        const data = await response.json();
        setBorrowedBooks(data);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReturn = async (borrowingId: number) => {
    try {
      const response = await fetch("/api/return", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ borrowingId })
      });

      if (response.ok) {
        // Refresh the list
        fetchMyBooks();
      } else {
        const error = await response.json();
        alert(`Failed to return book: ${error.error}`);
      }
    } catch (error) {
      console.error("Error returning book:", error);
      alert("Failed to return book");
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-6xl font-black bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-4">
            My Books
          </h1>
          <p className="text-xl text-white/80 font-light">
            Manage your borrowed books and track due dates
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-blue-500/20 rounded-xl">
                <BookOpen className="w-8 h-8 text-blue-400" />
              </div>
              <div>
                <p className="text-3xl font-bold text-white">{borrowedBooks.length}</p>
                <p className="text-white/60">Total Borrowed</p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-emerald-500/20 rounded-xl">
                <CheckCircle className="w-8 h-8 text-emerald-400" />
              </div>
              <div>
                <p className="text-3xl font-bold text-white">
                  {borrowedBooks.filter(book => book.status === 'borrowed').length}
                </p>
                <p className="text-white/60">Currently Borrowed</p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-red-500/20 rounded-xl">
                <AlertCircle className="w-8 h-8 text-red-400" />
              </div>
              <div>
                <p className="text-3xl font-bold text-white">
                  {borrowedBooks.filter(book => {
                    if (book.status !== 'borrowed') return false;
                    return new Date(book.dueDate) < new Date();
                  }).length}
                </p>
                <p className="text-white/60">Overdue Books</p>
              </div>
            </div>
          </div>
        </div>

        {/* Books List */}
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/10">
          <h2 className="text-3xl font-bold text-white mb-8">My Books</h2>
          
          {borrowedBooks.length === 0 ? (
            <div className="text-center py-16">
              <BookOpen className="w-24 h-24 text-white/20 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-white/60 mb-4">No Books Borrowed</h3>
              <p className="text-white/40 text-lg">Start exploring our collection to borrow books!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {borrowedBooks.map((book) => {
                const isOverdue = book.status === 'borrowed' && new Date(book.dueDate) < new Date();
                const isReturned = book.status === 'returned';
                
                return (
                  <div key={book.id} className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-white mb-2">{book.bookTitle}</h3>
                        <p className="text-white/70 text-lg mb-2">by {book.bookAuthor}</p>
                        {book.categoryName && (
                          <p className="text-white/50 text-sm mb-4">Category: {book.categoryName}</p>
                        )}
                        
                        <div className="flex items-center gap-8 text-white/60">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-5 h-5" />
                            <span>Borrowed: {new Date(book.borrowedAt).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-5 h-5" />
                            <span>Due: {new Date(book.dueDate).toLocaleDateString()}</span>
                          </div>
                          {isReturned && book.returnedAt && (
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-5 h-5" />
                              <span>Returned: {new Date(book.returnedAt).toLocaleDateString()}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <span className={`px-4 py-2 rounded-full text-sm font-bold border flex items-center gap-2 ${
                          isReturned
                            ? 'bg-gray-500/20 text-gray-400 border-gray-500/30'
                            : isOverdue
                            ? 'bg-red-500/20 text-red-400 border-red-500/30'
                            : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                        }`}>
                          {isReturned ? <CheckCircle className="w-4 h-4" /> : 
                           isOverdue ? <AlertCircle className="w-4 h-4" /> : 
                           <CheckCircle className="w-4 h-4" />}
                          {isReturned ? 'Returned' : isOverdue ? 'Overdue' : 'On Time'}
                        </span>
                        
                        {!isReturned && (
                          <button 
                            onClick={() => handleReturn(book.id)}
                            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl shadow-lg hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
                          >
                            <RotateCcw className="w-4 h-4" />
                            Return Book
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
