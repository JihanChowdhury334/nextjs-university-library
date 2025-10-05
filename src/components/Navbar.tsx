"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/20 sticky top-0 z-50">
      <div className="container mx-auto px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo & Navigation */}
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-200">
              IssueTracker
            </Link>
            
            <div className="hidden md:flex items-center space-x-6">
              <Link 
                href="/issues" 
                className="text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-200 hover:scale-105 transform"
              >
                Issues
              </Link>
              <Link 
                href="/issues/new" 
                className="text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-200 hover:scale-105 transform"
              >
                New Issue
              </Link>
            </div>
          </div>
          
          {/* User Section */}
          <div className="flex items-center space-x-4">
            {session ? (
              <>
                <div className="hidden sm:flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                    {session.user?.email?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-gray-700 font-medium">
                    {session.user?.email?.split('@')[0]}
                  </span>
                </div>
                <button 
                  onClick={() => signOut()}
                  className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link 
                  href="/signin" 
                  className="text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-200"
                >
                  Sign In
                </Link>
                <Link 
                  href="/signup" 
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}