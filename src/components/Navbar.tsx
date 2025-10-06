"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { BookOpen, User, LogOut, Plus, Settings, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-black/20 backdrop-blur-xl shadow-2xl border-b border-white/10 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo & Navigation */}
          <div className="flex items-center space-x-12">
            <Link 
              href="/" 
              className="text-3xl font-black bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300"
            >
              Digital Library
            </Link>
            
            <div className="hidden lg:flex items-center space-x-8">
              <Link 
                href="/books" 
                className="group text-white/80 hover:text-white font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                Collection
              </Link>
              
              {session && (
                <Link 
                  href="/my-books" 
                  className="group text-white/80 hover:text-white font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-2"
                >
                  <User className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                  My Books
                </Link>
              )}
              
              {session?.user?.role === 'admin' && (
                <>
                  <Link 
                    href="/books/new" 
                    className="group text-white/80 hover:text-white font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                    Add Book
                  </Link>
                  <Link 
                    href="/admin" 
                    className="group text-white/80 hover:text-white font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-2"
                  >
                    <Settings className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                    Admin
                  </Link>
                </>
              )}
            </div>
          </div>
          
          {/* User Section */}
          <div className="flex items-center space-x-4">
            {session ? (
              <>
                <div className="hidden sm:flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
                    {session.user?.email?.charAt(0).toUpperCase()}
                  </div>
                  <div className="text-white/90 font-medium">
                    {session.user?.email?.split('@')[0]}
                  </div>
                </div>
                <button 
                  onClick={() => signOut()}
                  className="group bg-white/10 hover:bg-red-500/20 text-white px-6 py-3 rounded-xl font-semibold border border-white/20 hover:border-red-500/50 transition-all duration-300 hover:scale-105 flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link 
                  href="/signin" 
                  className="text-white/80 hover:text-white font-semibold transition-colors duration-300 hover:scale-105"
                >
                  Sign In
                </Link>
                <Link 
                  href="/signup" 
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl font-bold shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300"
                >
                  Get Started
                </Link>
              </>
            )}
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <div className="flex flex-col space-y-4">
              <Link 
                href="/books" 
                className="text-white/80 hover:text-white font-semibold transition-colors duration-300 flex items-center gap-3"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <BookOpen className="w-5 h-5" />
                Collection
              </Link>
              
              {session && (
                <Link 
                  href="/my-books" 
                  className="text-white/80 hover:text-white font-semibold transition-colors duration-300 flex items-center gap-3"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User className="w-5 h-5" />
                  My Books
                </Link>
              )}
              
              {session?.user?.role === 'admin' && (
                <>
                  <Link 
                    href="/books/new" 
                    className="text-white/80 hover:text-white font-semibold transition-colors duration-300 flex items-center gap-3"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Plus className="w-5 h-5" />
                    Add Book
                  </Link>
                  <Link 
                    href="/admin" 
                    className="text-white/80 hover:text-white font-semibold transition-colors duration-300 flex items-center gap-3"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Settings className="w-5 h-5" />
                    Admin
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}