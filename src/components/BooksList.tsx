"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Search, Filter, BookOpen, Calendar, MapPin, Tag, CheckCircle, XCircle, Eye, BookMarked } from "lucide-react";

interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string | null;
  publisher: string | null;
  publicationYear: number | null;
  description: string | null;
  coverImage: string | null;
  totalCopies: number | null;
  availableCopies: number | null;
  categoryId: number | null;
  location: string | null;
  isActive: boolean | null;
  createdAt: Date | null;
}

interface Category {
  id: number;
  name: string;
  description: string | null;
}

interface BooksListProps {
  books: Book[];
  categories: Category[];
}

export default function BooksList({ books, categories }: BooksListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Filter books based on search term and category
  const filteredBooks = useMemo(() => {
    let filtered = books;

    if (debouncedSearchTerm.trim()) {
      filtered = filtered.filter(book =>
        book.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        (book.isbn && book.isbn.toLowerCase().includes(debouncedSearchTerm.toLowerCase())) ||
        (book.publisher && book.publisher.toLowerCase().includes(debouncedSearchTerm.toLowerCase()))
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(book => book.categoryId === parseInt(selectedCategory));
    }

    return filtered;
  }, [books, debouncedSearchTerm, selectedCategory]);

  const getAvailabilityColor = (availableCopies: number) => {
    if (availableCopies > 0) {
      return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
    }
    return 'bg-red-500/20 text-red-400 border-red-500/30';
  };

  const getAvailabilityIcon = (availableCopies: number) => {
    return availableCopies > 0 ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />;
  };

  const getCategoryName = (categoryId: number | null) => {
    if (!categoryId) return 'Uncategorized';
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : 'Unknown';
  };

  return (
    <>
      {/* Search and Filter Bar */}
      <div className="mb-12">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-white/60" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by title, author, ISBN, or publisher..."
              className="w-full pl-14 pr-6 py-5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 text-white placeholder-white/60 shadow-2xl text-lg font-medium"
            />
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
              <Filter className="w-5 h-5 text-white/60" />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-14 py-5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 text-white shadow-2xl min-w-[240px] text-lg font-medium appearance-none"
            >
              <option value="" className="bg-slate-900 text-white">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id} className="bg-slate-900 text-white">
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {debouncedSearchTerm && (
          <div className="mt-6 text-center">
            <span className="text-white/70 text-lg font-medium">
              {filteredBooks.length} result{filteredBooks.length !== 1 ? 's' : ''} found
            </span>
          </div>
        )}
      </div>

      {/* Books List */}
      {filteredBooks.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-32 h-32 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center text-6xl mb-8 mx-auto backdrop-blur-xl border border-white/10">
            {searchTerm || selectedCategory ? <Search className="w-16 h-16 text-white/60" /> : <BookOpen className="w-16 h-16 text-white/60" />}
          </div>
          <h3 className="text-3xl font-bold text-white mb-4">
            {searchTerm || selectedCategory ? 'No matching books found' : 'No books yet'}
          </h3>
          <p className="text-white/70 text-xl mb-10 max-w-md mx-auto leading-relaxed">
            {searchTerm || selectedCategory
              ? 'Try adjusting your search terms or filters.'
              : 'Get started by adding your first book to the library catalog.'
            }
          </p>
          <Link 
            href="/books/new"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300"
          >
            <BookOpen className="w-6 h-6" />
            Add Your First Book
          </Link>
        </div>
      ) : (
        <div className="grid gap-8">
          {filteredBooks.map((book) => (
            <Link 
              key={book.id} 
              href={`/books/${book.id}`}
              className="group bg-white/5 backdrop-blur-xl rounded-3xl p-10 shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 border border-white/10 hover:border-white/20 hover:scale-[1.02] block"
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-6">
                    <h2 className="text-3xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300">
                      {book.title}
                    </h2>
                    <span className={`px-4 py-2 rounded-full text-sm font-bold border flex items-center gap-2 ${getAvailabilityColor(book.availableCopies || 0)}`}>
                      {getAvailabilityIcon(book.availableCopies || 0)}
                      {book.availableCopies && book.availableCopies > 0 ? 'Available' : 'Borrowed'}
                    </span>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3 text-white/80 text-lg">
                      <BookOpen className="w-5 h-5 text-purple-400" />
                      <span className="font-semibold">Author:</span> {book.author}
                    </div>
                    
                    {book.publisher && (
                      <div className="flex items-center gap-3 text-white/70 text-lg">
                        <Tag className="w-5 h-5 text-blue-400" />
                        <span className="font-semibold">Publisher:</span> {book.publisher}
                        {book.publicationYear && ` (${book.publicationYear})`}
                      </div>
                    )}
                    
                    {book.isbn && (
                      <div className="flex items-center gap-3 text-white/70 text-lg">
                        <BookMarked className="w-5 h-5 text-green-400" />
                        <span className="font-semibold">ISBN:</span> {book.isbn}
                      </div>
                    )}
                    
                    <div className="flex items-center gap-3 text-white/70 text-lg">
                      <Tag className="w-5 h-5 text-purple-400" />
                      <span className="font-semibold">Category:</span> {getCategoryName(book.categoryId)}
                    </div>
                    
                    <div className="flex items-center gap-3 text-white/70 text-lg">
                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                      <span className="font-semibold">Copies:</span> {book.availableCopies || 0} of {book.totalCopies || 0} available
                    </div>
                    
                    {book.location && (
                      <div className="flex items-center gap-3 text-white/70 text-lg">
                        <MapPin className="w-5 h-5 text-orange-400" />
                        <span className="font-semibold">Location:</span> {book.location}
                      </div>
                    )}
                  </div>
                  
                  {book.description && (
                    <p className="text-white/70 text-lg mb-6 line-clamp-3 leading-relaxed">
                      {book.description}
                    </p>
                  )}
                  
                  <div className="flex items-center gap-8 text-white/60 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      Book #{book.id}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Added {new Date(book.createdAt!).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-3 lg:ml-8">
                  {(book.availableCopies || 0) > 0 && (
                    <button 
                      onClick={async (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        
                        try {
                          const response = await fetch("/api/borrow", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ bookId: book.id })
                          });

                          if (response.ok) {
                            alert("Book borrowed successfully! Check 'My Books' to see it.");
                            // Refresh the page to update available copies
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
                      className="group bg-gradient-to-r from-emerald-500/20 to-teal-500/20 hover:from-emerald-500/30 hover:to-teal-500/30 text-emerald-400 px-6 py-3 rounded-xl font-bold border border-emerald-500/30 hover:border-emerald-500/50 transition-all duration-300 flex items-center gap-2"
                    >
                      <BookMarked className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                      Borrow Book
                    </button>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
