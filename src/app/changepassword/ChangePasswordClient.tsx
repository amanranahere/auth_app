"use client";

import axios from "axios";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function ChangePasswordClient() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const [newPassword, setNewPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChangePassword = async () => {
    setLoading(true);
    setMessage("");

    if (!newPassword || !confPassword) {
      setMessage("Please fill in all fields");
      setLoading(false);
      return;
    }

    if (newPassword !== confPassword) {
      setMessage("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post("/api/users/changepassword", {
        token,
        newPassword,
      });

      setMessage(res.data.message || "Password changed successfully");
    } catch (error: any) {
      setMessage(error.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
      setNewPassword("");
      setConfPassword("");
    }
  };

  return (
    <div className="h-screen w-full flex flex-col gap-y-10 justify-center items-center font-mono">
      <h1 className="fixed top-10 left-1/2 -translate-x-1/2 font-mono text-2xl font-bold">
        CHANGE PASSWORD
      </h1>

      <div className="flex flex-col">
        <label htmlFor="email" className="pl-1">
          New Password
        </label>
        <input
          id="email"
          type="text"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Enter your new password"
          className="p-2 bg-[#2a2a2a] hover:bg-[#3a3a3a] duration-150 rounded-lg outline-none"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="password" className="pl-1">
          Confirm Password
        </label>
        <input
          id="password"
          type="text"
          value={confPassword}
          onChange={(e) => setConfPassword(e.target.value)}
          placeholder="Enter your new password again"
          className="p-2 bg-[#2a2a2a] hover:bg-[#3a3a3a] duration-150 rounded-lg outline-none"
        />
      </div>

      <button
        onClick={handleChangePassword}
        disabled={loading}
        className="p-[8px] bg-[#00bfff] hover:bg-[#00bfff96] active:bg-[#00bfff63] rounded-[10px] hover:transition duration-150 ease-out select-none outline-none border-none cursor-pointer disabled:cursor-not-allowed"
      >
        {loading ? "Changing password..." : "Change Password"}
      </button>

      {message && (
        <p className="font-mono text-sm text-center pt-2 text-cyan-300">
          {message}
        </p>
      )}

      <Link
        href="/login"
        className="mt-6 px-6 py-2 bg-[#00bfff] hover:bg-[#00bfff96] active:bg-[#00bfff63] rounded-full transition duration-150 ease-out select-none outline-none border-none cursor-pointer disabled:cursor-not-allowed"
      >
        Go to Login
      </Link>
    </div>
  );
}
