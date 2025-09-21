"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../../packages/backend/convex/_generated/api";

const Test = () => {
  // Example query - you can replace this with your actual Convex queries
  const tasks = useQuery(api.tasks.get);

  return (
    <div>
      <h1>Test Page with ConvexClientProvider</h1>
      <p>Convex provider is working!</p>
      {tasks ? (
        <div>
          <h2>Tasks:</h2>
          <ul>
            {tasks.map((task) => (
              <li key={task._id}>{task.text}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading tasks...</p>
      )}
    </div>
  );
};

export default Test;
