import Link from "next/link";

// Cache home page for 5 minutes for optimal performance
export const revalidate = 300;

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      <div className="container mx-auto px-8 py-20">
        {/* Hero Section */}
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
              Issue Tracker Pro
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Streamline your workflow with our powerful, secure issue tracking platform. 
              Built with modern technology for teams that demand excellence.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12">
            <Link 
              href="/issues" 
              className="group bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3 min-w-[200px] justify-center"
            >
              <span>📋</span>
              View Issues
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </Link>
            <Link 
              href="/issues/new" 
              className="group bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3 min-w-[200px] justify-center"
            >
              <span>✨</span>
              Create Issue
              <span className="group-hover:translate-x-1 transition-transform duration-300">+</span>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-24 grid md:grid-cols-3 gap-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white text-xl mb-4">
              🔒
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Secure Authentication</h3>
            <p className="text-gray-600">Enterprise-grade security with encrypted passwords and JWT sessions.</p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center text-white text-xl mb-4">
              ⚡
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Lightning Fast</h3>
            <p className="text-gray-600">Built on Next.js 15 with optimized performance and server-side rendering.</p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white text-xl mb-4">
              🎯
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Production Ready</h3>
            <p className="text-gray-600">TypeScript, PostgreSQL, and modern architecture for real-world applications.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
