"use client";

import React, { useState } from "react";
import Link from "next/link";

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
    <>
      <div className="flex items-center justify-center h-screen bg-black text-white">
        <div className="rounded-xl border border-[#27272A] bg-card text-card-foreground shadow mx-auto max-w-sm">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="font-semibold tracking-tight text-2xl">Login</h3>
            <p className="text-sm text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <div className="p-6 pt-0">
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    className="flex h-9 w-full rounded-md border border-[#27272A] border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    id="email"
                    placeholder="m@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    className="flex h-9 w-full rounded-md border border-[#27272A] border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <LoaderButton loading={loading}>Login</LoaderButton>
              </div>
              {error && (
                <div className="border rounded-lg border-[#27272A] px-3 py-2 w-max mt-4">
                  {error}
                </div>
              )}
            </form>
            <div className="mt-4 text-center text-sm">
              Don't have an account?{" "}
              <Link className="underline" href="/signup">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const LoaderButton = ({ loading, children, ...props }) => {
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-[#0DDD50] text-primary-foreground shadow hover:bg-[#0DDD50]/90 h-9 px-4 py-2 w-full ${props.className} ${loading ? "bg-[#0DDD50]/70 text-white/80" : ""}`}
      disabled={loading || props.disabled}
    >
      {loading && <div className="buttonLoader mr-2"></div>}
      {children}
    </button>
  );
};

const styles = `
  .buttonLoader {
    display: inline-block;
    border: 3px solid rgba(255, 255, 255, 0.6);
    border-top-color: rgba(255, 255, 255, 1);
    border-radius: 50%;
    width: 18px;
    height: 18px;
    animation: blspin 1s linear infinite;
  }

  @keyframes blspin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`;

const injectStyles = () => {
  if (typeof document !== "undefined") {
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
  }
};

injectStyles();

export default LoginForm;
