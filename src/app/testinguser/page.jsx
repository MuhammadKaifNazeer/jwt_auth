"use client";

import React, { useEffect, useState } from "react";

function TestingUser() {
  const [user, setUser] = useState({});

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
        console.log(data);
        setUser(data);
      } catch (error) {
        console.log("Error fetching user data: ", error);
        router.push("/login");
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      <div className="min-h-screen min-w-screen bg-zinc-900 text-white p-10">
        <h3 className="text-4xl mb-3 font-semibold">Profile</h3>
        <p className="text-lg mb-3">Name: {user.name}</p>
        <p className="text-lg mb-3">Email: {user.email}</p>
      </div>
    </div>
  );
}

export default TestingUser;
