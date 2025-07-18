"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface User {
  _id: string;
  username: string;
  email: string;
  isVerified: string;
}

export default function UserProfile() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<User | null>(null);

  const logout = async () => {
    try {
      setLoading(true);
      await axios.get("/api/users/logout");
      toast.success("Logged out");
      router.push("/");
    } catch (error: any) {
      toast.error("Error logging out");
      console.log("Error loggin out", error.message);
    } finally {
      setLoading(false);
    }
  };

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
    <>
      <div className="h-screen w-full flex flex-col gap-y-10 justify-center items-center font-mono">
        <h1 className="fixed top-10 left-1/2 -translate-x-1/2 font-mono text-2xl font-bold">
          PROFILE PAGE
        </h1>

        <div className="flex flex-col">
          <h2>
            Username:&nbsp;
            <span className="font-mono text-cyan-200">
              {data ? data.username : "Not avaiable"}
            </span>
          </h2>

          <h2>
            Email:&nbsp;
            <span className="font-mono text-cyan-200">
              {data ? data.email : "Not avaiable"}
            </span>
          </h2>

          <Link
            href={`/profile/${data?._id}`}
            className={`mt-4 rounded-full bg-blue-400 hover:bg-blue-400/80 active:bg-blue-400/60 duration-200 text-white flex items-center justify-center py-2 font-medium cursor-pointer ${
              loading && "disabled:cursor-not-allowed"
            }`}
          >
            All details
          </Link>
        </div>
      </div>

      <button
        onClick={logout}
        className={`fixed top-5 right-5 rounded-full bg-red-400 hover:bg-red-400/80 active:bg-red-400/60 duration-200 text-white px-8 py-2 font-medium cursor-pointer ${
          loading && "disabled:cursor-not-allowed"
        }`}
      >
        {loading ? "Logging out..." : "Logout"}
      </button>
    </>
  );
}
