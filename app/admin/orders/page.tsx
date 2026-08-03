"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { TrackingInfo } from "@/lib/orderStatus";

type OrderRow = {
  id: string;
  customer?: {
    name: string;
    email: string;
    mobile: string;
  };
  grandTotal: number;
  paymentStatus?: string;
  orderStatus?: string;
  tracking?: TrackingInfo;
  createdAt?: {
    toDate: () => Date;
  };
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
  async function loadOrders() {
    setLoading(true);

    try {
      const q = query(
        collection(db, "orders"),
        orderBy("createdAt", "desc")
      );

      const snap = await getDocs(q);

      setOrders(
        snap.docs.map((d) => ({
          id: d.id,
          ...(d.data() as Omit<OrderRow, "id">),
        }))
      );
    } catch (err) {
      console.error("Failed to load orders:", err);
    } finally {
      setLoading(false);
    }
  }

  void loadOrders();
}, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-[#0B3C8C]">Orders</h1>

      <p className="mt-2 text-gray-500">
        {loading ? "Loading..." : `${orders.length} orders`}
      </p>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-left text-gray-600">
            <tr>
              <th className="px-5 py-3">Date</th>
              <th className="px-5 py-3">Customer</th>
              <th className="px-5 py-3">Total</th>
              <th className="px-5 py-3">Payment</th>
              <th className="px-5 py-3">Order Status</th>
              <th className="px-5 py-3">Tracking</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-t border-gray-100 transition hover:bg-blue-50/50"
              >
                <td className="px-5 py-4 text-gray-600">
                  {order.createdAt?.toDate?.().toLocaleDateString("en-IN") ??
                    "—"}
                </td>

                <td className="px-5 py-4">
                  <Link
                    href={`/admin/orders/${order.id}`}
                    className="font-medium text-[#0B3C8C] hover:underline"
                  >
                    {order.customer?.name ?? "—"}
                  </Link>

                  <p className="text-xs text-gray-500">
                    {order.customer?.mobile}
                  </p>
                </td>

                <td className="px-5 py-4 font-semibold text-[#0B3C8C]">
                  ₹{order.grandTotal}
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      order.paymentStatus === "Paid"
                        ? "bg-green-100 text-green-700"
                        : order.paymentStatus?.includes("Refund")
                        ? "bg-orange-100 text-orange-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.paymentStatus ?? "Pending"}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                    {order.orderStatus ?? "Pending"}
                  </span>
                </td>

                <td className="px-5 py-4 text-gray-500">
                  {order.tracking?.trackingNumber ? "✅ Added" : "—"}
                </td>

                <td className="px-5 py-4">
                  <Link
                    href={`/admin/orders/${order.id}`}
                    className="font-medium text-[#0B3C8C] hover:underline"
                  >
                    View →
                  </Link>
                </td>
              </tr>
            ))}

            {!loading && orders.length === 0 && (
              <tr>
                <td colSpan={7} className="px-5 py-10 text-center text-gray-400">
                  No orders yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
