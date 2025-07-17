"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

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
    <div className="h-screen w-full flex justify-center items-center">
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
          {data ? (data.isVerified === "true" ? "Yes" : "No") : "Not available"}
        </span>
      </div>
    </div>
  );
}
