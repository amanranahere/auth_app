"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";

interface User {
  _id: string;
  username: string;
  email: string;
  isVerified: string;
}

export default function UserProfile({ params }: any) {
  const [data, setData] = useState<User | null>(null);

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      setData(res.data.data);
    } catch (error: any) {
      toast.error("Failed to fetch user data");
      console.error("Error fetching user details:", error.message);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center gap-y-10">
      <h1 className="fixed top-10 left-1/2 -translate-x-1/2 font-mono text-2xl font-bold">
        USER DETAILS
      </h1>

      <div className="grid grid-cols-[auto_40px_1fr] gap-x-2 text-white">
        <span className="text-left">Username</span>
        <span className="text-center">:</span>
        <span className="font-mono text-cyan-200">
          {data ? data.username : "Not available"}
        </span>

        <span className="text-left">User Id</span>
        <span className="text-center">:</span>
        <span className="font-mono text-cyan-200">
          {data ? data._id : "Not available"}
        </span>

        <span className="text-left">Email</span>
        <span className="text-center">:</span>
        <span className="font-mono text-cyan-200">
          {data ? data.email : "Not available"}
        </span>

        <span className="text-left">Verified</span>
        <span className="text-center">:</span>
        <span className="font-mono text-cyan-200">
          {data ? (data.isVerified ? "Yes" : "No") : "Not available"}
        </span>
      </div>

      <Link
        href="/profile"
        className="px-4 mt-4 rounded-full bg-blue-400 hover:bg-blue-400/80 active:bg-blue-400/60 duration-200 text-white flex items-center justify-center py-2 font-medium cursor-pointer font-mono"
      >
        Go back to Profile
      </Link>
    </div>
  );
}
