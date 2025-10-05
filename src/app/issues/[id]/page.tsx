import { db } from "@/db";
import { issues, comments, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Link from "next/link";
import { createComment } from "./actions";

// Cache individual issue pages for 30 seconds
export const revalidate = 30;

interface IssuePageProps {
  params: {
    id: string;
  };
}

export default async function IssuePage({ params }: IssuePageProps) {
  const issueId = parseInt(params.id);
  
  // Get the issue
  const issue = await db
    .select({
      id: issues.id,
      title: issues.title,
      description: issues.description,
      status: issues.status,
      createdAt: issues.createdAt,
      userId: issues.userId,
      userName: users.name,
      userEmail: users.email,
    })
    .from(issues)
    .leftJoin(users, eq(issues.userId, users.id))
    .where(eq(issues.id, issueId))
    .limit(1);

  if (!issue[0]) {
    notFound();
  }

  // Get comments for this issue
  const issueComments = await db
    .select({
      id: comments.id,
      content: comments.content,
      createdAt: comments.createdAt,
      userName: users.name,
      userEmail: users.email,
    })
    .from(comments)
    .leftJoin(users, eq(comments.userId, users.id))
    .where(eq(comments.issueId, issueId))
    .orderBy(comments.createdAt);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'closed': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open': return '🟢';
      case 'in-progress': return '🔵';
      case 'closed': return '⚪';
      default: return '❓';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 py-12">
      <div className="container mx-auto px-8">
        {/* Back Button */}
        <div className="mb-8">
          <Link 
            href="/issues"
            className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
          >
            ← Back to Issues
          </Link>
        </div>

        {/* Issue Details */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-gray-900">{issue[0].title}</h1>
              <p className="text-gray-600">
                Created by <span className="font-medium">{issue[0].userName || 'Anonymous'}</span> on{' '}
                {issue[0].createdAt?.toLocaleDateString()}
              </p>
            </div>
            <span className={`px-4 py-2 rounded-full text-sm font-medium border-2 flex items-center gap-2 ${getStatusColor(issue[0].status || 'open')}`}>
              {getStatusIcon(issue[0].status || 'open')} {issue[0].status || 'open'}
            </span>
          </div>
          
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {issue[0].description}
            </p>
          </div>
        </div>

        {/* Comments Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            💬 Comments ({issueComments.length})
          </h2>

          {/* Comments List */}
          <div className="space-y-4 mb-8">
            {issueComments.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>No comments yet. Be the first to comment!</p>
              </div>
            ) : (
              issueComments.map((comment) => (
                <div key={comment.id} className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-6 border border-gray-100">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {comment.userName?.[0]?.toUpperCase() || '?'}
                      </div>
                      <span className="font-medium text-gray-900">{comment.userName || 'Anonymous'}</span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {comment.createdAt?.toLocaleDateString()} at {comment.createdAt?.toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap ml-11">
                    {comment.content}
                  </p>
                </div>
              ))
            )}
          </div>

          {/* Add Comment Form */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add a Comment</h3>
            <form action={createComment} className="space-y-4">
              <input type="hidden" name="issueId" value={issueId} />
              <div>
                <textarea
                  name="content"
                  required
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-black placeholder-gray-400"
                  placeholder="Share your thoughts, provide updates, or ask questions..."
                />
              </div>
              <button
                type="submit"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all duration-200 flex items-center gap-2"
              >
                � Post Comment
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
