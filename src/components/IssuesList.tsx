"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";

interface Issue {
  id: number;
  title: string;
  description: string;
  status: string | null;
  createdAt: Date | null;
}

interface IssuesListProps {
  issues: Issue[];
}

export default function IssuesList({ issues }: IssuesListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300); // 300ms delay

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Filter issues based on debounced search term
  const filteredIssues = useMemo(() => {
    if (!debouncedSearchTerm.trim()) return issues;
    
    return issues.filter(issue =>
      issue.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      issue.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
  }, [issues, debouncedSearchTerm]);

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
      case 'closed': return '⚪';
      default: return '🔵';
    }
  };

  return (
    <>
      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative max-w-md mx-auto">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <span className="text-gray-400 text-lg">🔍</span>
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search issues by title or description..."
            className="w-full pl-12 pr-4 py-4 bg-white/80 backdrop-blur-sm border-2 border-white/20 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-black placeholder-gray-400 shadow-lg"
          />
          {debouncedSearchTerm && (
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
              <span className="text-sm text-gray-500">
                {filteredIssues.length} result{filteredIssues.length !== 1 ? 's' : ''}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Issues List */}
      {filteredIssues.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full flex items-center justify-center text-4xl mb-6 mx-auto">
            {searchTerm ? '🔍' : '📝'}
          </div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">
            {searchTerm ? 'No matching issues found' : 'No issues yet'}
          </h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            {searchTerm 
              ? `Try adjusting your search term "${searchTerm}" or create a new issue.`
              : 'Get started by creating your first issue to track bugs, features, or tasks.'
            }
          </p>
          <Link 
            href="/issues/new"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            ✨ Create Your First Issue
          </Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {filteredIssues.map((issue) => (
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
                  <Link 
                    href={`/issues/${issue.id}`}
                    className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-lg font-medium hover:bg-indigo-100 transition-colors duration-200 text-center"
                  >
                    View Details
                  </Link>
                  <button className="text-gray-600 hover:text-gray-800 px-4 py-2 rounded-lg transition-colors duration-200">
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}