"use client";

import React, { useState } from "react";
import Link from "next/link";
import LoaderButton from "@/components/LoaderButton/LoaderButton";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Failed to login");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      window.location.href = "/profile";
    } catch (error) {
      setError("Invalid email or password");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen min-w-screen bg-zinc-900">
      <div className="w-full min-h-screen bg-zinc-900 text-white p-10">
        <h3 className="text-4xl mb-3 font-semibold">Login</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            className="px-3 py-2 bg-zinc-800 rounded-lg"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="px-3 py-2 bg-zinc-800 rounded-lg"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <LoaderButton loading={loading}>Login</LoaderButton>
          {error && (
            <div className="border rounded-lg border-zinc-800 px-3 py-2 w-max">
              {error}
            </div>
          )}
        </form>
        <p className="mt-3 text-lg">
          Don't have an account?{" "}
          <Link href="/signup" className="text-green-500 font-bold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
