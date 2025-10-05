import { db } from "@/db";
import { issues } from "@/db/schema";
import Link from "next/link";

export default async function IssuesPage() {
  const allIssues = await db.select().from(issues);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'closed': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open': return '🟢';
      case 'closed': return '⚫';
      default: return '🔵';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      <div className="container mx-auto px-8 py-12">
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
                Issue Dashboard
              </h1>
              <p className="text-lg text-gray-600">
                Manage and track all your issues in one place
              </p>
            </div>
            
            <Link
              href="/issues/new"
              className="group bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3 w-fit"
            >
              <span className="text-xl">✨</span>
              Create New Issue
              <span className="group-hover:translate-x-1 transition-transform duration-300">+</span>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center text-white text-xl">
                  📊
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">{allIssues.length}</p>
                  <p className="text-gray-600">Total Issues</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-white text-xl">
                  🟢
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">{allIssues.filter(i => i.status === 'open').length}</p>
                  <p className="text-gray-600">Open Issues</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-gray-500 to-slate-500 rounded-xl flex items-center justify-center text-white text-xl">
                  ⚫
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">{allIssues.filter(i => i.status === 'closed').length}</p>
                  <p className="text-gray-600">Closed Issues</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Issues List */}
        {allIssues.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full flex items-center justify-center text-4xl mb-6 mx-auto">
              📝
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">No issues yet</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Get started by creating your first issue to track bugs, features, or tasks.
            </p>
            <Link
              href="/issues/new"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 inline-flex items-center gap-2"
            >
              <span>✨</span>
              Create Your First Issue
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {allIssues.map((issue) => (
              <div 
                key={issue.id} 
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 group hover:scale-[1.02]"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <h2 className="text-2xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors duration-300">
                        {issue.title}
                      </h2>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(issue.status || 'open')} flex items-center gap-1`}>
                        {getStatusIcon(issue.status || 'open')}
                        {(issue.status || 'open').charAt(0).toUpperCase() + (issue.status || 'open').slice(1)}
                      </span>
                    </div>
                    
                    <p className="text-gray-700 text-lg leading-relaxed mb-4">
                      {issue.description}
                    </p>
                    
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-indigo-400 rounded-full"></span>
                        Issue #{issue.id}
                      </div>
                      <div className="flex items-center gap-2">
                        <span>📅</span>
                        Created {new Date(issue.createdAt!).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2 lg:ml-6">
                    <button className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-lg font-medium hover:bg-indigo-100 transition-colors duration-200">
                      View Details
                    </button>
                    <button className="text-gray-600 hover:text-gray-800 px-4 py-2 rounded-lg transition-colors duration-200">
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
