"use client";

import { authClient } from "@/lib/auth-client";
import { useState } from "react";

export default function Home() {
  const { data: session, isPending } = authClient.useSession();
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  if (isPending) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <div>Loading...</div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Tasks</h1>
          {session ? (
            <div className="flex items-center gap-4">
              <span>Welcome, {session.user.email}</span>
              <button
                onClick={() => authClient.signOut()}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4 max-w-md">
              <div className="flex gap-2">
                <button
                  onClick={() => setIsSignup(false)}
                  className={`px-4 py-2 rounded-md ${
                    !isSignup
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setIsSignup(true)}
                  className={`px-4 py-2 rounded-md ${
                    isSignup
                      ? "bg-green-600 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  Sign Up
                </button>
              </div>

              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (isSignup) {
                    await authClient.signUp.email({ email, password, name });
                  } else {
                    await authClient.signIn.email({ email, password });
                  }
                }}
                className="flex flex-col gap-3"
              >
                {isSignup && (
                  <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="px-3 py-2 border rounded-md"
                    required
                  />
                )}
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-3 py-2 border rounded-md"
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="px-3 py-2 border rounded-md"
                  required
                />
                <button
                  type="submit"
                  className={`px-4 py-2 rounded-md text-white ${
                    isSignup
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {isSignup ? "Sign Up" : "Sign In"}
                </button>
              </form>
            </div>
          )}
        </div>

        {session ? (
          <div className="text-center">
            <p className="text-lg">
              You are signed in! Start managing your tasks.
            </p>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-lg mb-4">Welcome to the Tasks app!</p>
            <p className="text-gray-600">
              Please sign in or create an account to get started.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
