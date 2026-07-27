"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function WishlistPage() {
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
          ❤️ My Wishlist
        </h1>

        <p className="mt-2 text-gray-600">
          Save your favourite products and buy them whenever you're ready.
        </p>

        <div className="mt-10 rounded-3xl bg-white p-16 shadow-xl text-center">

          <div className="text-7xl">
            ❤️
          </div>

          <h2 className="mt-6 text-3xl font-bold text-gray-800">
            Your Wishlist is Empty
          </h2>

          <p className="mt-4 text-gray-500 max-w-xl mx-auto">
            You haven't added any products to your wishlist yet.
            Browse our premium dry fruits, healthy snacks and natural products
            to start building your favourites.
          </p>

          <Link
            href="/products"
            className="inline-block mt-10 rounded-xl bg-[#0B3C8C] px-8 py-4 font-semibold text-white transition hover:bg-[#082F6D]"
          >
            Browse Products
          </Link>

        </div>

        <div className="mt-12 rounded-3xl border border-dashed border-[#0B3C8C] bg-blue-50 p-8">

          <h3 className="text-xl font-bold text-[#0B3C8C]">
            🚀 Coming Soon
          </h3>

          <ul className="mt-4 space-y-3 text-gray-700">

            <li>✅ Save products with one click.</li>

            <li>✅ Sync wishlist across all your devices.</li>

            <li>✅ Move products directly to Cart.</li>

            <li>✅ Get notified when favourite products are back in stock.</li>

          </ul>

        </div>

      </div>

    </main>
  );
}