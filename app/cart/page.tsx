"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  const totalItems = cart.length;

  const totalQuantity = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <main className="min-h-screen bg-[#FDFBF7] py-16">
      <div className="mx-auto max-w-7xl px-6">

        <h1 className="mb-10 text-5xl font-bold text-blue-900">
          Shopping Cart
        </h1>

        {cart.length === 0 ? (
          <div className="rounded-3xl bg-white p-16 text-center shadow-lg">

            <h2 className="text-3xl font-bold text-gray-700">
              Your Cart is Empty
            </h2>

            <p className="mt-4 text-gray-500">
              Add your favourite Aarvya Naturals products to begin shopping.
            </p>

            <Link
              href="/products"
              className="mt-8 inline-block rounded-full bg-green-600 px-8 py-4 font-semibold text-white transition hover:bg-green-700"
            >
              Browse Products
            </Link>

          </div>
        ) : (
          <div className="grid gap-10 lg:grid-cols-3">

            {/* Cart Items */}

            <div className="space-y-6 lg:col-span-2">

              {cart.map((item) => (

                <div
                  key={`${item.id}-${item.variant}-${item.type}`}
                  className="rounded-3xl bg-white p-6 shadow-lg"
                >

                  <div className="flex gap-6">

                    <div className="relative h-28 w-28 overflow-hidden rounded-2xl bg-gray-100">

                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="112px"
                        className="object-contain p-3"
                      />

                    </div>

                    <div className="flex-1">

                      <h2 className="text-2xl font-bold text-blue-900">
                        {item.name}
                      </h2>

                      <p className="mt-2 text-gray-600">
                        {item.type === "combo" ? "Combo" : "Variant"} :
                        <strong> {item.variant}</strong>
                      </p>

                      <p className="mt-1 text-sm font-medium text-green-700">
                        {item.type === "combo"
                          ? "Combo Offer"
                          : "Product"}
                      </p>

                      <div className="mt-5 flex items-center gap-3">

                        <button
                          onClick={() =>
                            decreaseQuantity(item.id, item.variant)
                          }
                          className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-xl font-bold hover:bg-gray-300"
                        >
                          −
                        </button>

                        <span className="w-10 text-center text-xl font-bold">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            increaseQuantity(item.id, item.variant)
                          }
                          className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-xl font-bold text-white hover:bg-green-700"
                        >
                          +
                        </button>

                      </div>

                    </div>

                    <button
                      onClick={() =>
                        removeFromCart(item.id, item.variant)
                      }
                      className="h-fit rounded-full bg-red-500 px-5 py-3 font-semibold text-white hover:bg-red-600"
                    >
                      Remove
                    </button>

                  </div>

                </div>

              ))}

            </div>

            {/* Order Summary */}

            <div className="h-fit rounded-3xl bg-[#0B3C8C] p-8 text-white shadow-xl">

              <h2 className="text-3xl font-bold">
                Order Summary
              </h2>

              <div className="mt-8 space-y-5 text-lg">

                <div className="flex justify-between">

                  <span>Total Items</span>

                  <span>{totalItems}</span>

                </div>

                <div className="flex justify-between">

                  <span>Total Quantity</span>

                  <span>{totalQuantity}</span>

                </div>

              </div>

              <Link
                href="/checkout"
                className="mt-10 block rounded-full bg-white py-4 text-center text-lg font-semibold text-[#0B3C8C] transition hover:bg-blue-100"
              >
                Proceed to Checkout →
              </Link>

            </div>

          </div>
        )}

      </div>
    </main>
  );
}