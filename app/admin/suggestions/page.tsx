"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import { Send } from "@/components/Icons";

const CATEGORIES = [
  "Product Suggestion",
  "Website Feedback",
  "Delivery Experience",
  "Packaging Feedback",
  "Pricing Feedback",
  "Other",
];

export default function SuggestionsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [category, setCategory] = useState(CATEGORIES[0]);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <h1 className="text-2xl font-semibold text-[#0B3C8C]">
          Loading...
        </h1>
      </main>
    );
  }

  if (!user) return null;

  async function handleSubmit() {
    if (!message.trim()) {
      alert("Please write your suggestion before submitting.");
      return;
    }

    setSubmitting(true);

    try {
      await addDoc(collection(db, "suggestions"), {
        userId: user!.uid,
        userName: user!.displayName || "",
        userEmail: user!.email || "",
        category,
        message: message.trim(),
        createdAt: serverTimestamp(),
      });

      setSubmitted(true);
      setMessage("");
      setCategory(CATEGORIES[0]);
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F8F6F1] px-6 py-12">

      <div className="mx-auto max-w-2xl">

        <h1 className="text-4xl font-bold text-[#0B3C8C]">
          💬 Suggestions & Feedback
        </h1>

        <p className="mt-3 text-gray-600">
          Your thoughts help us improve. Let us know what you&apos;d like to
          see, or how we&apos;re doing.
        </p>

        <div className="mt-10 rounded-3xl bg-white p-8 shadow-xl">

          {submitted ? (
            <div className="py-10 text-center">

              <div className="text-6xl">✅</div>

              <h2 className="mt-6 text-2xl font-bold text-gray-800">
                Thank you for your feedback!
              </h2>

              <p className="mt-3 text-gray-500">
                We&apos;ve received your suggestion and really appreciate you
                taking the time to share it.
              </p>

              <button
                onClick={() => setSubmitted(false)}
                className="mt-8 rounded-xl bg-[#0B3C8C] px-8 py-3 font-semibold text-white hover:bg-[#082F6D]"
              >
                Submit Another
              </button>

            </div>
          ) : (
            <>
              <label className="text-sm font-semibold text-gray-700">
                What&apos;s this about?
              </label>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-800"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>

              <label className="mt-6 block text-sm font-semibold text-gray-700">
                Your Suggestion
              </label>

              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
                placeholder="Tell us what's on your mind..."
                className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-800"
              />

              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0B3C8C] py-4 font-semibold text-white transition hover:bg-[#082F6D] disabled:opacity-60"
              >
                <Send size={18} />
                {submitting ? "Sending…" : "Submit Feedback"}
              </button>
            </>
          )}

        </div>

      </div>

    </main>
  );
}
