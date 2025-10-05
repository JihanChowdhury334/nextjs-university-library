import { db } from "@/db";
import { issues } from "@/db/schema";
import Link from "next/link";

export default async function IssuesPage() {
  const allIssues = await db.select().from(issues);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Issues</h1>
      
      <Link
        href="/issues/new"
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block"
      >
        New Issue
      </Link>

      {allIssues.length === 0 ? (
        <p>No issues yet.</p>
      ) : (
        <div className="space-y-4">
          {allIssues.map((issue) => (
            <div key={issue.id} className="border p-4 rounded">
              <h2 className="font-bold">{issue.title}</h2>
              <p className="text-gray-600">{issue.description}</p>
              <p className="text-sm text-gray-500">
                Status: {issue.status} | Created: {new Date(issue.createdAt!).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
