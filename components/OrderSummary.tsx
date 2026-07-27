"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useCart } from "@/context/CartContext";

type Props = {
  shipping?: number;
};

export default function OrderSummary({
  shipping = 0,
}: Props) {
  const { cart } = useCart();

  const subtotal = useMemo(() => {
    return cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }, [cart]);

  const totalItems = useMemo(() => {
    return cart.reduce(
      (total, item) => total + item.quantity,
      0
    );
  }, [cart]);

  const grandTotal = subtotal + shipping;

  return (
    <div className="sticky top-24 rounded-3xl bg-[#0B3C8C] p-8 text-white shadow-xl">

      <h2 className="text-3xl font-bold">
        Order Summary
      </h2>

      <p className="mt-2 text-blue-100">
        Review your order before payment.
      </p>

      {/* Products */}

      <div className="mt-8 space-y-5">

        {cart.map((item) => (

          <div
            key={`${item.id}-${item.variant}-${item.type}`}
            className="border-b border-white/20 pb-5"
          >

            <div className="flex justify-between">

              <div>

                <p className="font-semibold">
                  {item.name}
                </p>

                <p className="mt-1 text-sm text-blue-100">
                  {item.variant}
                </p>

              </div>

              <div className="text-right">

                <p className="font-semibold">
                  ₹{item.price}
                </p>

                <p className="text-sm text-blue-100">
                  Qty : {item.quantity}
                </p>

              </div>

            </div>

            <div className="mt-3 text-right font-bold text-green-300">
              ₹{item.price} × {item.quantity} = ₹{item.price * item.quantity}
            </div>

          </div>

        ))}

      </div>

      {/* Totals */}

      <div className="mt-8 space-y-4 text-lg">

        <div className="flex justify-between">
          <span>Total Items</span>
          <span>{totalItems}</span>
        </div>

        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{subtotal}</span>
        </div>

        <div className="flex justify-between">
          <span>Shipping</span>
          <span>
            {shipping === 0
              ? "Calculated at Checkout"
              : `₹${shipping}`}
          </span>
        </div>

        <hr className="border-white/20" />

        <div className="flex justify-between text-2xl font-bold">
          <span>Grand Total</span>
          <span>
            {shipping === 0
              ? "—"
              : `₹${grandTotal}`}
          </span>
        </div>

      </div>

      <Link
        href="/review"
        className={`mt-16 block w-full rounded-full py-4 text-center text-lg font-bold transition ${
          cart.length === 0 || shipping === 0
            ? "pointer-events-none cursor-not-allowed bg-gray-300 text-gray-600"
            : "bg-white text-[#0B3C8C] hover:bg-blue-100"
        }`}
      >
        Review & Continue
      </Link>

    </div>
  );
}