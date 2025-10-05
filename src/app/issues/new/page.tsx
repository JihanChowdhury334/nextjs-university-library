import { createIssue } from "./actions";

export default function NewIssuePage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Create New Issue</h1>

      <form action={createIssue} className="space-y-4 max-w-md">
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            required
            className="w-full border p-2 rounded"
            placeholder="Enter issue title"
          />
        </div>

        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            required
            rows={4}
            className="w-full border p-2 rounded"
            placeholder="Describe the issue"
          />
        </div>

        <div>
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            name="status"
            className="w-full border p-2 rounded"
          >
            <option value="open">Open</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          >
            Create Issue
          </button>
          
          <a
            href="/issues"
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}
