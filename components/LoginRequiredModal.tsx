"use client";

import Link from "next/link";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function LoginRequiredModal({
  open,
  onClose,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-5">

      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">

        <div className="flex items-center justify-between">

          <h2 className="text-2xl font-bold text-[#0B3C8C]">
            Continue to Checkout
          </h2>

          <button
            onClick={onClose}
            className="text-2xl text-gray-500 hover:text-black"
          >
            ✕
          </button>

        </div>

        <p className="mt-4 text-gray-600">
          Please login or create your Aarvya Naturals account to continue your purchase.
        </p>

        <div className="mt-6 space-y-3 rounded-2xl bg-[#F8FAFC] p-5">

          <p>✅ Track your orders</p>

          <p>✅ Save delivery addresses</p>

          <p>✅ Faster future checkout</p>

          <p>✅ View complete order history</p>

          <p>✅ Wishlist your favourite products</p>

          <p>✅ Exclusive offers & discounts</p>

        </div>

        <Link
          href="/login"
          className="mt-8 block w-full rounded-full bg-[#0B3C8C] py-4 text-center font-semibold text-white hover:bg-blue-800"
        >
          Login
        </Link>

        <Link
          href="/register"
          className="mt-4 block w-full rounded-full border-2 border-[#0B3C8C] py-4 text-center font-semibold text-[#0B3C8C] hover:bg-[#0B3C8C] hover:text-white"
        >
          Create Account
        </Link>

      </div>

    </div>
  );
}