import React from "react";
import Link from "next/link";

const LoginForm = () => {
  return (
    <div className="min-h-screen min-w-screen bg-zinc-900">
      <div className="w-full min-h-screen bg-zinc-900 text-white p-10">
        <h3 className="text-4xl mb-3 font-semibold">Login</h3>
        <form action="/login" method="POST" className="flex flex-col gap-3">
          <input
            className="px-3 py-2 bg-zinc-800 rounded-lg"
            type="emial"
            placeholder="email"
            name="email"
            required
          />
          <input
            className="px-3 py-2 bg-zinc-800 rounded-lg"
            type="password"
            placeholder="password"
            name="password"
            required
          />
          <input
            className="px-3 py-2 bg-green-500 font-bold cursor-pointer rounded-lg"
            type="submit"
            value="Login"
          />
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
