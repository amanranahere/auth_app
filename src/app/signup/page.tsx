"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SingupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      await axios.post("/api/users/signup", user);
      toast.success("Account created successfully");
      router.push("/login");
    } catch (error: any) {
      console.log("Error while signup", error.message);
      toast.error("Error while signup");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.username.length > 0 &&
      user.password.length > 0
    ) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  }, [user]);

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <h1 className="font-mono text-2xl">SIGNUP PAGE</h1>

      <hr />

      <div className="w-full md:w-[60%] lg:w-[30%] p-5 flex flex-col gap-y-4">
        <div className="flex flex-col">
          <label htmlFor="username" className="pl-1">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={user.username}
            onChange={(e) => {
              setUser({ ...user, username: e.target.value });
            }}
            placeholder="Enter your username"
            className="p-2 bg-[#2a2a2a] hover:bg-[#3a3a3a] duration-150 rounded-lg outline-none"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="pl-1">
            Email
          </label>
          <input
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
            }}
            placeholder="Enter your email"
            className="p-2 bg-[#2a2a2a] hover:bg-[#3a3a3a] duration-150 rounded-lg outline-none"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="pl-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => {
              setUser({ ...user, password: e.target.value });
            }}
            placeholder="Enter your password"
            className="p-2 bg-[#2a2a2a] hover:bg-[#3a3a3a] duration-150 rounded-lg outline-none"
          />
        </div>

        <button
          onClick={onSignup}
          disabled={btnDisabled}
          className="p-[8px] bg-[#00bfff] hover:bg-[#00bfff96] active:bg-[#00bfff63] rounded-[10px] hover:transition duration-150 ease-out select-none outline-none border-none cursor-pointer disabled:cursor-not-allowed"
        >
          {loading ? "Signing up..." : "Sign up"}
        </button>

        <div className="w-full flex justify-center">
          Already have an account?&nbsp;
          <Link href="/login" className="text-[#00bfff] hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
