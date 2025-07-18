"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      await axios.post("/api/users/login", user);
      toast.success("Logged in");
      router.push("/profile");
    } catch (error: any) {
      toast.error("Error while login");
      console.log("Error while login", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  }, [user]);

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <h1 className="fixed top-10 left-1/2 -translate-x-1/2 font-mono text-2xl font-bold">
        LOGIN PAGE
      </h1>

      <hr />

      <div className="w-full md:w-[60%] lg:w-[30%] p-5 flex flex-col gap-y-4">
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
          onClick={onLogin}
          disabled={btnDisabled}
          className="p-[8px] bg-[#00bfff] hover:bg-[#00bfff96] active:bg-[#00bfff63] rounded-[10px] hover:transition duration-150 ease-out select-none outline-none border-none cursor-pointer disabled:cursor-not-allowed"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="flex justify-between items-center">
          <Link
            href="/forgotpassword"
            className="text-[#00bfff] hover:underline"
          >
            Forgot password
          </Link>

          <div className="flex">
            Don't have an account?&nbsp;
            <Link href="/signup" className="text-[#00bfff] hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
