import { db } from "@/db";
import { issues } from "@/db/schema";
import Link from "next/link";
import IssuesList from "@/components/IssuesList";

// Cache this page for 60 seconds for better performance
export const revalidate = 60;

export default async function IssuesPage() {
  const allIssues = await db.select().from(issues);

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

        {/* Issues List with Search */}
        <IssuesList issues={allIssues} />
      </div>
    </div>
  );
}
