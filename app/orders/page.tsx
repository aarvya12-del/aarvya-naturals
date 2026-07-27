"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function OrdersPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-semibold text-[#0B3C8C]">
          Loading...
        </h1>
      </main>
    );
  }

  if (!user) return null;

  return (
    <main className="min-h-screen bg-[#F8F6F1] py-12 px-6">

      <div className="mx-auto max-w-5xl">

        <h1 className="text-4xl font-bold text-[#0B3C8C]">
          📦 My Orders
        </h1>

        <p className="mt-2 text-gray-600">
          Track your purchases and view your order history.
        </p>

        <div className="mt-10 rounded-3xl bg-white p-16 text-center shadow-xl">

          <div className="text-7xl">
            📦
          </div>

          <h2 className="mt-6 text-3xl font-bold text-gray-800">
            No Orders Yet
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-gray-500">
            Looks like you haven't placed any orders yet.
            Explore our premium dry fruits and healthy snacks to begin your wellness journey.
          </p>

          <Link
            href="/products"
            className="mt-10 inline-block rounded-xl bg-[#0B3C8C] px-8 py-4 font-semibold text-white transition hover:bg-[#082F6D]"
          >
            Shop Now
          </Link>

        </div>

        <div className="mt-12 rounded-3xl border border-dashed border-[#0B3C8C] bg-blue-50 p-8">

          <h3 className="text-xl font-bold text-[#0B3C8C]">
            🚀 Upcoming Features
          </h3>

          <ul className="mt-5 space-y-3 text-gray-700">

            <li>✅ Live order tracking.</li>

            <li>✅ Order status updates.</li>

            <li>✅ Download invoice.</li>

            <li>✅ Reorder with one click.</li>

            <li>✅ Cancel orders (before dispatch).</li>

          </ul>

        </div>

      </div>

    </main>
  );
}