"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import type { CartItem } from "@/context/CartContext";
import type { TrackingInfo } from "@/lib/orderStatus";

type OrderDoc = {
  id: string;
  products: CartItem[];
  grandTotal: number;
  paymentStatus?: string;
  orderStatus?: string;
  tracking?: TrackingInfo | null;
  createdAt?: { toDate: () => Date };
};

const STATUS_STYLES: Record<string, string> = {
  Pending: "bg-yellow-100 text-yellow-700",
  Confirmed: "bg-blue-100 text-blue-700",
  Packed: "bg-indigo-100 text-indigo-700",
  Shipped: "bg-purple-100 text-purple-700",
  Delivered: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
};

export default function OrdersPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [orders, setOrders] = useState<OrderDoc[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  useEffect(() => {
    if (!user) return;

    async function loadOrders() {
      const q = query(
        collection(db, "users", user!.uid, "orders"),
        orderBy("createdAt", "desc")
      );
      const snap = await getDocs(q);
      setOrders(
        snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<OrderDoc, "id">) }))
      );
      setOrdersLoading(false);
    }

    loadOrders();
  }, [user]);

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

        {ordersLoading ? (
          <div className="mt-10 rounded-3xl bg-white p-16 text-center shadow-xl">
            <p className="text-gray-500">Loading your orders…</p>
          </div>
        ) : orders.length === 0 ? (
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
        ) : (
          <div className="mt-10 space-y-6">

            {orders.map((order) => {
              const status = order.orderStatus ?? "Pending";
              const statusStyle =
                STATUS_STYLES[status] ?? "bg-gray-100 text-gray-700";

              return (
                <div
                  key={order.id}
                  className="rounded-3xl bg-white p-6 shadow-md"
                >

                  <div className="flex flex-wrap items-center justify-between gap-3">

                    <div>
                      <p className="text-sm text-gray-500">
                        {order.createdAt?.toDate?.().toLocaleDateString(
                          "en-IN",
                          { day: "numeric", month: "long", year: "numeric" }
                        ) ?? "—"}
                      </p>
                      <p className="mt-1 text-xs text-gray-400">
                        Order #{order.id.slice(0, 8).toUpperCase()}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`rounded-full px-4 py-1.5 text-sm font-semibold ${statusStyle}`}
                      >
                        {status}
                      </span>

                      <span
                        className={`rounded-full px-4 py-1.5 text-sm font-semibold ${
                          order.paymentStatus === "Paid"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {order.paymentStatus ?? "Pending"}
                      </span>
                    </div>

                  </div>

                  {/* Items */}

                  <div className="mt-5 divide-y divide-gray-100 border-y border-gray-100">
                    {order.products.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between py-3"
                      >
                        <div>
                          <p className="font-medium text-gray-800">
                            {item.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {item.variant} × {item.quantity}
                          </p>
                        </div>
                        <p className="font-semibold text-gray-700">
                          ₹{item.price * item.quantity}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-gray-600">Total</span>
                    <span className="text-xl font-bold text-[#0B3C8C]">
                      ₹{order.grandTotal}
                    </span>
                  </div>

                  {/* Tracking */}

                  {order.tracking?.trackingNumber && (
                    <div className="mt-5 rounded-2xl bg-blue-50 p-5">

                      <p className="font-semibold text-[#0B3C8C]">
                        🚚 Shipment Tracking
                      </p>

                      <div className="mt-3 grid gap-2 text-sm text-gray-700 sm:grid-cols-2">
                        {order.tracking.courier && (
                          <p>
                            <span className="text-gray-500">Courier:</span>{" "}
                            {order.tracking.courier}
                          </p>
                        )}

                        <p>
                          <span className="text-gray-500">Tracking No:</span>{" "}
                          {order.tracking.trackingNumber}
                        </p>

                        {order.tracking.dispatchDate && (
                          <p>
                            <span className="text-gray-500">Dispatched:</span>{" "}
                            {new Date(
                              order.tracking.dispatchDate
                            ).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "long",
                            })}
                          </p>
                        )}
                      </div>

                      {order.tracking.trackingUrl && (
                        <a
                          href={order.tracking.trackingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 inline-block rounded-full bg-[#0B3C8C] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#082F6D]"
                        >
                          Track Package →
                        </a>
                      )}

                    </div>
                  )}

                </div>
              );
            })}

          </div>
        )}

      </div>

    </main>
  );
}
