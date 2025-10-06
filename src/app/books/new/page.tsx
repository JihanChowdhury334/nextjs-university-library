"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { db } from "@/db";
import { categories } from "@/db/schema";

export default function NewBookPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    publisher: "",
    publicationYear: "",
    description: "",
    totalCopies: "",
    location: "",
    categoryId: "",
  });

  useEffect(() => {
    // Fetch categories
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          totalCopies: parseInt(formData.totalCopies),
          availableCopies: parseInt(formData.totalCopies),
          publicationYear: formData.publicationYear ? parseInt(formData.publicationYear) : null,
          categoryId: formData.categoryId ? parseInt(formData.categoryId) : null,
        }),
      });

      if (response.ok) {
        router.push("/books");
      } else {
        const errorData = await response.json();
        console.error("Failed to create book:", errorData.error);
        alert(`Failed to create book: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error creating book:", error);
      alert("Failed to create book. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-6xl font-black bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-4">
              Add New Book
            </h1>
            <p className="text-xl text-white/80 font-light">
              Expand our digital collection with a new book
            </p>
          </div>

          {/* Form */}
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/10">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label htmlFor="title" className="block text-lg font-bold text-white mb-3">
                    Book Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 text-white placeholder-white/60 shadow-2xl text-lg font-medium"
                    placeholder="Enter book title"
                  />
                </div>

                <div>
                  <label htmlFor="author" className="block text-lg font-bold text-white mb-3">
                    Author *
                  </label>
                  <input
                    type="text"
                    id="author"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 text-white placeholder-white/60 shadow-2xl text-lg font-medium"
                    placeholder="Enter author name"
                  />
                </div>

                <div>
                  <label htmlFor="isbn" className="block text-lg font-bold text-white mb-3">
                    ISBN
                  </label>
                  <input
                    type="text"
                    id="isbn"
                    name="isbn"
                    value={formData.isbn}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 text-white placeholder-white/60 shadow-2xl text-lg font-medium"
                    placeholder="Enter ISBN (optional)"
                  />
                </div>

                <div>
                  <label htmlFor="publisher" className="block text-lg font-bold text-white mb-3">
                    Publisher
                  </label>
                  <input
                    type="text"
                    id="publisher"
                    name="publisher"
                    value={formData.publisher}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 text-white placeholder-white/60 shadow-2xl text-lg font-medium"
                    placeholder="Enter publisher name"
                  />
                </div>

                <div>
                  <label htmlFor="publicationYear" className="block text-lg font-bold text-white mb-3">
                    Publication Year
                  </label>
                  <input
                    type="number"
                    id="publicationYear"
                    name="publicationYear"
                    value={formData.publicationYear}
                    onChange={handleChange}
                    min="1000"
                    max="2024"
                    className="w-full px-6 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 text-white placeholder-white/60 shadow-2xl text-lg font-medium"
                    placeholder="Enter publication year"
                  />
                </div>

                <div>
                  <label htmlFor="totalCopies" className="block text-lg font-bold text-white mb-3">
                    Total Copies *
                  </label>
                  <input
                    type="number"
                    id="totalCopies"
                    name="totalCopies"
                    value={formData.totalCopies}
                    onChange={handleChange}
                    min="1"
                    required
                    className="w-full px-6 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 text-white placeholder-white/60 shadow-2xl text-lg font-medium"
                    placeholder="Enter number of copies"
                  />
                </div>

                <div>
                  <label htmlFor="location" className="block text-lg font-bold text-white mb-3">
                    Shelf Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 text-white placeholder-white/60 shadow-2xl text-lg font-medium"
                    placeholder="e.g., A1-B2, Section 3"
                  />
                </div>

                <div>
                  <label htmlFor="categoryId" className="block text-lg font-bold text-white mb-3">
                    Category
                  </label>
                  <select
                    id="categoryId"
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 text-white shadow-2xl text-lg font-medium appearance-none"
                  >
                    <option value="" className="bg-slate-900 text-white">Select a category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id} className="bg-slate-900 text-white">
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block text-lg font-bold text-white mb-3">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-6 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 text-white placeholder-white/60 shadow-2xl text-lg font-medium resize-none"
                  placeholder="Enter book description"
                ></textarea>
              </div>

              <div className="flex items-center justify-end gap-6">
                <Link
                  href="/books"
                  className="px-8 py-4 text-white/80 hover:text-white font-bold text-lg transition-colors duration-300"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-12 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? "Adding Book..." : "Add Book"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}