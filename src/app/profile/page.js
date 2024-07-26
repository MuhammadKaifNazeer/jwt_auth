"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader/Loader";
import LoaderButton from "@/components/LoaderButton/LoaderButton";

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
    <div className="min-h-screen min-w-screen bg-zinc-900 text-white p-10">
      <h3 className="text-4xl mb-3 font-semibold">Profile</h3>
      <p className="text-lg mb-3">Name: {user.name}</p>
      <p className="text-lg mb-3">Email: {user.email}</p>
      <div className="flex items-center justify-start gap-2">
        <LoaderButton loading={loggingOut} onClick={handleLogout}>
          Logout
        </LoaderButton>
        <LoaderButton loading={deleting} onClick={handleDeleteAccount}>
          Delete Account
        </LoaderButton>
      </div>
      {error && (
        <div className="border rounded-lg broder-zinc-800 px-3 py-2 w-max mt-3">
          {error}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
