"use client";

import { useState } from "react";
import Link from "next/link";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const resetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      await sendPasswordResetEmail(auth, email);

      alert(
        "Password reset email sent successfully. Please check your inbox."
      );

      setEmail("");
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 flex items-center justify-center px-6 py-16">

      <div className="w-full max-w-md rounded-3xl bg-white p-10 shadow-xl border border-gray-200">

        <h1 className="text-4xl font-bold text-center text-[#0B3C8C]">
          Forgot Password
        </h1>

        <p className="mt-3 text-center text-gray-600">
          Enter your email address and we'll send you a password reset link.
        </p>

        <form
          onSubmit={resetPassword}
          className="mt-10 space-y-5"
        >

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-xl border-2 border-gray-300 bg-white p-4 text-gray-900 placeholder:text-gray-500 outline-none transition focus:border-[#0B3C8C] focus:ring-2 focus:ring-blue-200"
          />

          <button
            disabled={loading}
            className="w-full rounded-xl bg-[#0B3C8C] py-4 font-semibold text-white transition hover:bg-[#082E6B]"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

        </form>

        <div className="mt-8 text-center">

          <Link
            href="/login"
            className="font-semibold text-[#0B3C8C] hover:text-[#C9A227]"
          >
            ← Back to Login
          </Link>

        </div>

      </div>

    </main>
  );
}