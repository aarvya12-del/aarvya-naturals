"use client";

import { useEffect, useState, useCallback } from "react";
import {
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

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
  createdAt?: {
    toDate: () => Date;
  };
};

const ORDER_STATUSES = [
  "Pending",
  "Confirmed",
  "Packed",
  "Shipped",
  "Delivered",
  "Cancelled",
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const load = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function updateStatus(orderId: string, newStatus: string) {
    setUpdatingId(orderId);

    try {
      await updateDoc(doc(db, "orders", orderId), {
        orderStatus: newStatus,
      });

      setOrders((prev) =>
        prev.map((o) =>
          o.id === orderId ? { ...o, orderStatus: newStatus } : o
        )
      );
    } catch (err) {
      console.error(err);
      alert("Failed to update order status.");
    } finally {
      setUpdatingId(null);
    }
  }

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
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t border-gray-100">
                <td className="px-5 py-4 text-gray-600">
                  {order.createdAt?.toDate?.().toLocaleDateString("en-IN") ??
                    "—"}
                </td>

                <td className="px-5 py-4">
                  <p className="font-medium text-gray-800">
                    {order.customer?.name ?? "—"}
                  </p>

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
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.paymentStatus ?? "Pending"}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <select
                    value={order.orderStatus ?? "Pending"}
                    disabled={updatingId === order.id}
                    onChange={(e) =>
                      updateStatus(order.id, e.target.value)
                    }
                    className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-800"
                  >
                    {ORDER_STATUSES.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}

            {!loading && orders.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-5 py-10 text-center text-gray-400"
                >
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