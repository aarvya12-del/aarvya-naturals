"use client";

import { useRouter } from "next/navigation";
import { useCheckout } from "@/context/CheckoutContext";
import { useCart } from "@/context/CartContext";

export default function PaymentPage() {
  const router = useRouter();

  const { cart } = useCart();
  const { address, shippingCharge } = useCheckout();

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const grandTotal = subtotal + shippingCharge;

  function handlePayment() {
    // Razorpay integration will come here.
    // For now, simulate successful payment.

    router.push("/order-success");
  }

  return (
    <main className="min-h-screen bg-[#FDFBF7] py-16">

      <div className="mx-auto max-w-3xl rounded-3xl bg-white p-10 shadow-xl">

        <h1 className="text-center text-4xl font-bold text-[#0B3C8C]">
          Payment
        </h1>

        <p className="mt-3 text-center text-gray-600">
          Please review your payment details.
        </p>

        <div className="mt-10 space-y-5 rounded-2xl bg-gray-50 p-6">

          <div className="flex justify-between">
            <span>Customer</span>
            <span className="font-semibold">
              {address.fullName}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>

          <div className="flex justify-between">
            <span>Shipping</span>
            <span>₹{shippingCharge}</span>
          </div>

          <hr />

          <div className="flex justify-between text-2xl font-bold text-[#0B3C8C]">
            <span>Grand Total</span>
            <span>₹{grandTotal}</span>
          </div>

        </div>

        <button
          onClick={handlePayment}
          className="mt-10 w-full rounded-full bg-[#0B3C8C] py-4 text-lg font-bold text-white transition hover:bg-blue-800"
        >
          Pay ₹{grandTotal}
        </button>

      </div>

    </main>
  );
}