"use client";

import axios from "axios";
import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const forgotPassword = async () => {
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post("/api/users/forgotpassword", { email });
      setMessage(res.data.message || "Reset email sent");
    } catch (error: any) {
      setMessage(error?.res?.data?.error || "Something went wrong");
    } finally {
      setEmail("");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-y-20">
      <h1 className="fixed top-10 left-1/2 -translate-x-1/2 font-mono text-2xl font-bold">
        FORGOT PASSWORD
      </h1>

      <div className="flex flex-col justify-center gap-y-2">
        <p className="font-mono pl-1">Enter your email</p>

        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="user@email.com"
          className="p-2 bg-[#2a2a2a] hover:bg-[#3a3a3a] duration-150 rounded-lg outline-none"
        />

        <button
          onClick={forgotPassword}
          disabled={loading}
          className="py-2 bg-[#00bfff] hover:bg-[#00bfff96] active:bg-[#00bfff63] rounded-[10px] hover:transition duration-150 ease-out select-none outline-none border-none cursor-pointer font-mono font-medium disabled:cursor-not-allowed"
        >
          {loading ? "Sending..." : "Send"}
        </button>

        {message && (
          <p className="font-mono text-sm text-center pt-2 text-cyan-300">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
