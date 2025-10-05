"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-gray-100 p-4 border-b">
      <div className="flex gap-4 items-center justify-between">
        <div className="flex gap-4 items-center">
          <Link href="/" className="text-blue-600 hover:underline">Home</Link>
          <Link href="/issues" className="text-blue-600 hover:underline">Issues</Link>
          <Link href="/issues/new" className="text-blue-600 hover:underline">New Issue</Link>
        </div>
        
        <div className="flex gap-4 items-center">
          {session ? (
            <>
              <span className="text-gray-600">Welcome, {session.user?.email}</span>
              <button 
                onClick={() => signOut()}
                className="text-red-600 hover:underline"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link href="/signin" className="text-blue-600 hover:underline">Sign In</Link>
              <Link href="/signup" className="text-blue-600 hover:underline">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}