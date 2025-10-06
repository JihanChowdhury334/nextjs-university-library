"use client";

import { useState, useEffect } from "react";
import { db } from "@/db";
import { books, categories } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, BookOpen, Calendar, MapPin, Tag, CheckCircle, XCircle, User, Building } from "lucide-react";

interface BookPageProps {
  params: {
    id: string;
  };
}

export default function BookPage({ params }: BookPageProps) {
  const [bookData, setBookData] = useState<any>(null);
  const [category, setCategory] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const bookId = parseInt(params.id);
  
  if (isNaN(bookId)) {
    notFound();
  }

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`/api/books/${bookId}`);
        if (response.ok) {
          const data = await response.json();
          setBookData(data.book);
          setCategory(data.category);
        } else {
          notFound();
        }
      } catch (error) {
        console.error("Error fetching book:", error);
        notFound();
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [bookId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!bookData) {
    notFound();
  }

  const isAvailable = (bookData.availableCopies || 0) > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Back Button */}
        <Link 
          href="/books"
          className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-300 mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
          Back to Collection
        </Link>

        {/* Book Details */}
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/10">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Book Info */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <h1 className="text-5xl font-black text-white leading-tight">
                  {bookData.title}
                </h1>
                <span className={`px-4 py-2 rounded-full text-sm font-bold border flex items-center gap-2 ${
                  isAvailable 
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' 
                    : 'bg-red-500/20 text-red-400 border-red-500/30'
                }`}>
                  {isAvailable ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                  {isAvailable ? 'Available' : 'Borrowed'}
                </span>
              </div>

              <div className="space-y-6 mb-8">
                <div className="flex items-center gap-4 text-white/80 text-xl">
                  <User className="w-6 h-6 text-purple-400" />
                  <span className="font-semibold">Author:</span> {bookData.author}
                </div>
                
                {bookData.publisher && (
                  <div className="flex items-center gap-4 text-white/70 text-lg">
                    <Building className="w-6 h-6 text-blue-400" />
                    <span className="font-semibold">Publisher:</span> {bookData.publisher}
                    {bookData.publicationYear && ` (${bookData.publicationYear})`}
                  </div>
                )}
                
                {bookData.isbn && (
                  <div className="flex items-center gap-4 text-white/70 text-lg">
                    <BookOpen className="w-6 h-6 text-green-400" />
                    <span className="font-semibold">ISBN:</span> {bookData.isbn}
                  </div>
                )}
                
                <div className="flex items-center gap-4 text-white/70 text-lg">
                  <Tag className="w-6 h-6 text-purple-400" />
                  <span className="font-semibold">Category:</span> {category?.[0]?.name || 'Uncategorized'}
                </div>
                
                <div className="flex items-center gap-4 text-white/70 text-lg">
                  <CheckCircle className="w-6 h-6 text-emerald-400" />
                  <span className="font-semibold">Copies:</span> {bookData.availableCopies || 0} of {bookData.totalCopies || 0} available
                </div>
                
                {bookData.location && (
                  <div className="flex items-center gap-4 text-white/70 text-lg">
                    <MapPin className="w-6 h-6 text-orange-400" />
                    <span className="font-semibold">Location:</span> {bookData.location}
                  </div>
                )}
              </div>

              {bookData.description && (
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-white mb-4">Description</h3>
                  <p className="text-white/70 text-lg leading-relaxed">
                    {bookData.description}
                  </p>
                </div>
              )}

              <div className="flex items-center gap-8 text-white/60 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  Book #{bookData.id}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Added {new Date(bookData.createdAt!).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col justify-center">
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-6">Actions</h3>
                
                <div className="space-y-4">
                  {isAvailable ? (
                    <button 
                      onClick={async () => {
                        try {
                          const response = await fetch("/api/borrow", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ bookId: bookData.id })
                          });

                          if (response.ok) {
                            alert("Book borrowed successfully! Check 'My Books' to see it.");
                            // Refresh the page to update availability
                            window.location.reload();
                          } else {
                            const error = await response.json();
                            alert(`Failed to borrow book: ${error.error}`);
                          }
                        } catch (error) {
                          console.error("Error borrowing book:", error);
                          alert("Failed to borrow book. Please try again.");
                        }
                      }}
                      className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-2xl hover:shadow-emerald-500/25 transform hover:scale-105 transition-all duration-300"
                    >
                      Borrow This Book
                    </button>
                  ) : (
                    <button className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-2xl hover:shadow-red-500/25 transform hover:scale-105 transition-all duration-300">
                      Book Currently Borrowed
                    </button>
                  )}
                  
                  <button className="w-full bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg border border-white/20 hover:border-white/30 transition-all duration-300">
                    Add to Wishlist
                  </button>
                  
                  <button className="w-full bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg border border-white/20 hover:border-white/30 transition-all duration-300">
                    Share Book
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
