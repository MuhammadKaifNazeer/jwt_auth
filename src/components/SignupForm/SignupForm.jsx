"use client";

import React, { useState } from "react";
import Link from "next/link";
import { dbConnect } from "@/lib/dbConnect";
import LoaderButton from "@/components/LoaderButton/LoaderButton";

const SignupForm = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (res.status === 201) {
        // Redirect to profile page or show success message
        console.log(data.message);
        window.location.href = "/profile";
      } else {
        setError(data.message);
        setLoading(false);
      }
    } catch (error) {
      setError("An unexpected error occurred");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen min-w-screen bg-zinc-900">
      <div className="w-full min-h-screen bg-zinc-900 text-white p-10">
        <h3 className="text-4xl mb-3 font-semibold">Register</h3>
        <form
          onSubmit={handleSubmit}
          method="POST"
          className="flex flex-col gap-3"
        >
          <input
            className="px-3 py-2 bg-zinc-800 rounded-lg"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="px-3 py-2 bg-zinc-800 rounded-lg"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="px-3 py-2 bg-zinc-800 rounded-lg"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <LoaderButton loading={loading}>Register</LoaderButton>
          {error && (
            <div className="border rounded-lg broder-zinc-800 px-3 py-2 w-max">
              {error}
            </div>
          )}
        </form>
        <p className="mt-3 text-lg">
          Already have an account?{" "}
          <Link href="/login" className="text-green-500 font-bold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
