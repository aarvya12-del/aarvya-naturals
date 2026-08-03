"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useCheckout } from "@/context/CheckoutContext";

export default function ReviewPage() {
  const { cart } = useCart();
  const { address, shippingCharge, shippingCalculated } = useCheckout();

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const grandTotal = subtotal + shippingCharge;

  const canProceed =
    cart.length > 0 &&
    shippingCalculated &&
    !!address.fullName;

  return (
    <main className="min-h-screen bg-[#FDFBF7] py-16">
      <div className="mx-auto max-w-6xl px-6">

        <div className="text-center">
          <h1 className="text-5xl font-bold text-blue-900">
            Review Your Order
          </h1>

          <p className="mt-4 text-lg text-gray-600">
            Please verify your order before proceeding to payment.
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-3">

          {/* LEFT */}

          <div className="space-y-8 lg:col-span-2">

            {/* Address */}

            <div className="rounded-3xl bg-white p-8 shadow-lg">

              <h2 className="text-2xl font-bold text-blue-900">
                Delivery Address
              </h2>

              {address.fullName ? (
                <div className="mt-6 space-y-2 text-gray-700">

                  <p className="text-lg font-bold">
                    {address.fullName}
                  </p>

                  <p>{address.mobile}</p>

                  {address.email && <p>{address.email}</p>}

                  <p>{address.house}</p>

                  <p>{address.street}</p>

                  <p>{address.area}</p>

                  <p>
                    {address.city} - {address.pincode}
                  </p>

                  <p>{address.state}</p>

                </div>
              ) : (
                <p className="mt-6 text-gray-500">
                  No delivery address added yet.
                </p>
              )}

              <Link
                href="/checkout"
                className="mt-8 inline-block rounded-full border-2 border-blue-900 px-6 py-3 font-semibold text-blue-900 transition hover:bg-blue-900 hover:text-white"
              >
                Edit Address
              </Link>

            </div>

            {/* Products */}

            <div className="rounded-3xl bg-white p-8 shadow-lg">

              <h2 className="text-2xl font-bold text-blue-900">
                Products
              </h2>

              {cart.length === 0 ? (
                <p className="mt-6 text-gray-500">
                  No products added.
                </p>
              ) : (
                <div className="mt-8 space-y-5">

                  {cart.map((item) => (
                    <div
                      key={`${item.id}-${item.variant}-${item.type}`}
                      className="flex items-center justify-between border-b pb-5"
                    >
                      <div>
                        <h3 className="font-semibold text-blue-900">
                          {item.name}
                        </h3>

                        <p className="text-gray-500">
                          {item.variant}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="font-semibold">
                          Qty : {item.quantity}
                        </p>

                        <p className="font-bold text-green-700">
                          ₹{item.price * item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}

                </div>
              )}

            </div>

          </div>

          {/* RIGHT */}

          <div>

            <div className="sticky top-24 rounded-3xl bg-[#0B3C8C] p-8 text-white shadow-xl">

              <h2 className="text-3xl font-bold">
                Payment Summary
              </h2>

              <div className="mt-8 space-y-5">

                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>
                    {!shippingCalculated
                      ? "Not Calculated"
                      : shippingCharge === 0
                      ? "FREE"
                      : `₹${shippingCharge}`}
                  </span>
                </div>

                <hr className="border-white/20" />

                <div className="flex justify-between text-2xl font-bold">
                  <span>Grand Total</span>
                  <span>₹{grandTotal}</span>
                </div>

              </div>

              <div className="mt-10 border-t border-white/20 pt-8">

                {canProceed ? (
                  <Link
                    href="/payment"
                    className="block w-full rounded-full bg-white py-4 text-center text-lg font-bold text-[#0B3C8C] transition hover:bg-blue-100"
                  >
                    Continue to Payment
                  </Link>
                ) : (
                  <button
                    disabled
                    className="w-full cursor-not-allowed rounded-full bg-gray-300 py-4 text-lg font-bold text-gray-600"
                  >
                    Continue to Payment
                  </button>
                )}

              </div>

            </div>

          </div>

        </div>

      </div>
    </main>
  );
}