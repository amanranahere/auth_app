"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const urlToken = new URLSearchParams(window.location.search).get("token");

    if (!urlToken) {
      setError("No token found in URL");
      setLoading(false);
      return;
    }

    setToken(urlToken);

    axios
      .post("/api/users/verifyemail", { token: urlToken })
      .then((res) => {
        if (res.data.verified) {
          setVerified(true);
        } else {
          setError("Verification failed");
        }
      })
      .catch((err) => {
        setError(err?.response?.data?.error || "Something went wrong");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen w-full flex justify-center items-center px-4">
      <div className="flex flex-col items-center justify-center gap-y-6 max-w-md w-full">
        <h1 className="font-mono text-2xl font-bold">VERIFY EMAIL</h1>

        {loading ? (
          <p className="font-mono text-cyan-300">Verifying...</p>
        ) : error ? (
          <p className="font-mono text-red-500">{error}</p>
        ) : (
          <p className="font-mono text-green-400">
            Email verified successfully!
          </p>
        )}

        <div className="grid grid-cols-[100px_40px_1fr] gap-x-2 w-full text-sm text-white">
          <span className="text-left">Token</span>
          <span className="text-center">:</span>
          <span className="font-mono text-cyan-200 break-words">
            {token || "Not available"}
          </span>

          <span className="text-left">Email verified</span>
          <span className="text-center">:</span>
          <span className="font-mono text-cyan-200">
            {verified ? "YES" : "NO"}
          </span>
        </div>

        <Link
          href="/login"
          className="mt-6 px-6 py-2 bg-[#00bfff] hover:bg-[#00bfff96] active:bg-[#00bfff63] rounded-full transition duration-150 ease-out select-none outline-none border-none cursor-pointer disabled:cursor-not-allowed"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
}
