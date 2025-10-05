import { createIssue } from "./actions";
import Link from "next/link";

export default function NewIssuePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      <div className="container mx-auto px-8 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Create New Issue
            </h1>
            <p className="text-lg text-gray-600">
              Report a bug, request a feature, or track a task
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 lg:p-12">
            <form action={createIssue} className="space-y-8">
              {/* Title Field */}
              <div className="space-y-2">
                <label htmlFor="title" className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <span className="text-xl">📝</span>
                  Issue Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-lg placeholder-gray-400 text-black"
                  placeholder="Enter a clear, descriptive title..."
                />
                <p className="text-sm text-gray-500">Be specific and concise about the issue</p>
              </div>

              {/* Description Field */}
              <div className="space-y-2">
                <label htmlFor="description" className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <span className="text-xl">📄</span>
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  rows={6}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-lg placeholder-gray-400 resize-none text-black"
                  placeholder="Provide detailed information about the issue..."
                />
                <p className="text-sm text-gray-500">Include steps to reproduce, expected behavior, and any relevant context</p>
              </div>

              {/* Status Field */}
              <div className="space-y-2">
                <label htmlFor="status" className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <span className="text-xl">🏷️</span>
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-lg bg-white text-gray-800"
                >
                  <option value="open">🟢 Open - Needs attention</option>
                  <option value="closed">⚫ Closed - Resolved</option>
                </select>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <span className="text-xl">✨</span>
                  Create Issue
                  <span className="text-xl">→</span>
                </button>
                
                <Link
                  href="/issues"
                  className="flex-1 bg-gray-100 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg border-2 border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 flex items-center justify-center gap-3"
                >
                  <span className="text-xl">←</span>
                  Back to Issues
                </Link>
              </div>
            </form>
          </div>

          {/* Tips Section */}
          <div className="mt-12 bg-indigo-50/50 backdrop-blur-sm rounded-2xl p-8 border border-indigo-100">
            <h3 className="text-lg font-semibold text-indigo-900 mb-4 flex items-center gap-2">
              <span className="text-xl">💡</span>
              Tips for Better Issues
            </h3>
            <ul className="space-y-2 text-indigo-800">
              <li className="flex items-start gap-2">
                <span className="text-indigo-500 mt-1">•</span>
                Use clear, actionable titles that describe the problem or request
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-500 mt-1">•</span>
                Include steps to reproduce for bugs or detailed requirements for features
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-500 mt-1">•</span>
                Add context about the environment, browser, or system where applicable
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
