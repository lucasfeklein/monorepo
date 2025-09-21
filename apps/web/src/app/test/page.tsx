"use client";

import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { api } from "../../../../../packages/backend/convex/_generated/api";

const Test = () => {
  // Example query - you can replace this with your actual Convex queries
  const tasks = useQuery(api.tasks.get);

  return (
    <div>
      <Authenticated>
        <div>
          <h2>Tasks:</h2>
          <ul>
            {tasks?.map((task) => (
              <li key={task._id}>{task.text}</li>
            ))}
          </ul>
        </div>
      </Authenticated>
      <Unauthenticated>
        <p>Logged out</p>
      </Unauthenticated>
    </div>
  );
};

export default Test;
