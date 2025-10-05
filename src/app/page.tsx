import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-3xl font-semibold">Welcome to your Issue Tracker</h1>
      <p className="text-gray-500 mt-2">Start building your Issue Tracker here 🚀</p>
      
      <div className="mt-8 flex gap-4">
        <Link href="/issues" className="bg-blue-500 text-white px-6 py-3 rounded">
          View Issues
        </Link>
        <Link href="/issues/new" className="bg-green-500 text-white px-6 py-3 rounded">
          Create Issue
        </Link>
      </div>
    </main>
  );
}
