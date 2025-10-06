import Link from "next/link";
import { BookOpen, Search, Users, BarChart3, ArrowRight, Sparkles, Shield, Zap } from "lucide-react";

// Cache home page for 5 minutes for optimal performance
export const revalidate = 300;

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-20">
        {/* Hero Section */}
        <div className="text-center space-y-12">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 text-white/90 text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              Next-Generation Library Management
            </div>
            
            <h1 className="text-7xl md:text-8xl font-black bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent leading-tight">
              Digital Library
            </h1>
            
            <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed font-light">
              Experience the future of library management with our cutting-edge platform. 
              Seamlessly discover, borrow, and manage your digital collection.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-16">
            <Link 
              href="/books" 
              className="group relative bg-gradient-to-r from-purple-600 to-pink-600 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-500 flex items-center gap-3 min-w-[240px] justify-center overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <BookOpen className="w-6 h-6 relative z-10" />
              <span className="relative z-10">Explore Collection</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            
            <Link 
              href="/admin" 
              className="group relative bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-white/10 transform hover:scale-105 transition-all duration-500 flex items-center gap-3 min-w-[240px] justify-center"
            >
              <Shield className="w-6 h-6" />
              <span>Admin Portal</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-32 grid md:grid-cols-3 gap-8">
          <div className="group bg-white/5 backdrop-blur-xl rounded-3xl p-10 shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 border border-white/10 hover:border-white/20 hover:scale-105">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-white text-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
              <BookOpen className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Smart Catalog</h3>
            <p className="text-white/70 text-lg leading-relaxed">Discover thousands of books with our intelligent search and recommendation system.</p>
          </div>

          <div className="group bg-white/5 backdrop-blur-xl rounded-3xl p-10 shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 border border-white/10 hover:border-white/20 hover:scale-105">
            <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center text-white text-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Advanced Search</h3>
            <p className="text-white/70 text-lg leading-relaxed">Find exactly what you need with our powerful filtering and AI-powered search.</p>
          </div>

          <div className="group bg-white/5 backdrop-blur-xl rounded-3xl p-10 shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 border border-white/10 hover:border-white/20 hover:scale-105">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white text-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
              <Zap className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Instant Management</h3>
            <p className="text-white/70 text-lg leading-relaxed">Borrow, return, and track books with our streamlined digital workflow.</p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-32 bg-white/5 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/10">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Library Analytics</h2>
            <p className="text-white/70 text-xl">Real-time insights into our digital collection</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="text-5xl font-black text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text mb-3 group-hover:scale-110 transition-transform duration-300">0</div>
              <div className="text-white/70 text-lg font-medium">Total Books</div>
            </div>
            <div className="text-center group">
              <div className="text-5xl font-black text-transparent bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text mb-3 group-hover:scale-110 transition-transform duration-300">0</div>
              <div className="text-white/70 text-lg font-medium">Available</div>
            </div>
            <div className="text-center group">
              <div className="text-5xl font-black text-transparent bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text mb-3 group-hover:scale-110 transition-transform duration-300">0</div>
              <div className="text-white/70 text-lg font-medium">Borrowed</div>
            </div>
            <div className="text-center group">
              <div className="text-5xl font-black text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text mb-3 group-hover:scale-110 transition-transform duration-300">0</div>
              <div className="text-white/70 text-lg font-medium">Active Users</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
