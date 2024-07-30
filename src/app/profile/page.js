"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUser(data);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching user data: ", error);
        // router.push("/login");
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      const res = await fetch("/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (res.status === 200) {
        router.push("/login"); // Redirect to login after logout
      } else {
        setError("Failed to log out");
      }
    } catch (error) {
      setError("An unexpected error occurred");
    }
  };

  const handleDeleteAccount = async () => {
    setDeleting(true);
    try {
      const res = await fetch("/api/delete-account", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (res.status === 200) {
        router.push("/signup"); // Redirect to signup after account deletion
      } else {
        setError("Failed to delete account");
      }
    } catch (error) {
      setError("An unexpected error occurred");
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-md rounded-xl border border-[#27272A] p-6 shadow-lg">
        <div className="space-y-4 text-center">
          <div className="flex items-center justify-center">
            <span className="relative flex shrink-0 overflow-hidden rounded-full h-16 w-16 items-center justify-center bg-[#27272A]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-user"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </span>
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              {user.name}
            </h2>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
          <div className="flex flex-col gap-2">
            <LoaderButton
              loading={loggingOut}
              onClick={handleLogout}
              className="bg-transparent hover:bg-zinc-900 border border-[#27272A] hover:border-zinc-900"
            >
              Logout
            </LoaderButton>
            <LoaderButton loading={deleting} onClick={handleDeleteAccount}>
              Delete Account
            </LoaderButton>
          </div>
          {error && (
            <div className="border rounded-lg border-[#27272A] px-3 py-2 w-max mt-4">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
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

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
      <div className="loader"></div>
    </div>
  );
};

const styles = `
  .loader {
    display: inline-block;
    border: 5px solid rgba(255, 255, 255, 0.6);
    border-top-color: rgba(255, 255, 255, 1);
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }

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

export default ProfilePage;
