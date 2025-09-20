"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../packages/backend/convex/_generated/api";

export default function Home() {
  const tasks = useQuery(api.tasks.get);

  if (tasks === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-2xl font-bold mb-8">Tasks</h1>
      {tasks.length === 0 ? (
        <p>No tasks found. Create some tasks in your Convex backend!</p>
      ) : (
        <div className="space-y-4">
          {tasks.map(({ _id, text }) => (
            <div key={_id} className="p-4 border rounded">
              {text}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
