"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/context/AuthContext";
import AddressList from "@/components/address/AddressList";

export default function AddressesPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

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

  return (
    <main className="min-h-screen bg-[#F8F6F1] px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-[#0B3C8C]">
            My Addresses
          </h1>

          <p className="mt-3 text-gray-600">
            Manage your delivery addresses for faster checkout.
          </p>
        </div>

        <AddressList />
      </div>
    </main>
  );
}