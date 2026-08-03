"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import { updateOrderEverywhere, TrackingInfo } from "@/lib/orderStatus";
import { deductInventoryOnDelivery } from "@/lib/inventory";
import type { CartItem } from "@/context/CartContext";

type OrderDetail = {
  id: string;
  userId: string;
  customer?: { name: string; email: string; mobile: string };
  address?: {
    house: string;
    street: string;
    area: string;
    city: string;
    state: string;
    pincode: string;
  };
  products: CartItem[];
  subtotal: number;
  shipping: number;
  grandTotal: number;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  paymentStatus?: string;
  orderStatus?: string;
  tracking?: TrackingInfo | null;
  // Set to true the first time this order's stock deduction runs,
  // so marking "Delivered" a second time (by accident) never
  // deducts stock twice.
  inventoryUpdated?: boolean;
  createdAt?: { toDate: () => Date };
};

const ORDER_STATUSES = [
  "Pending",
  "Confirmed",
  "Packed",
  "Shipped",
  "Delivered",
  "Cancelled",
];

const emptyTracking: TrackingInfo = {
  courier: "",
  trackingNumber: "",
  trackingUrl: "",
  dispatchDate: "",
};

export default function AdminOrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id as string;

  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);

  const [statusUpdating, setStatusUpdating] = useState(false);

  const [trackingForm, setTrackingForm] = useState<TrackingInfo>(emptyTracking);
  const [savingTracking, setSavingTracking] = useState(false);

  const [refundAmount, setRefundAmount] = useState("");
  const [refundReason, setRefundReason] = useState("");
  const [refunding, setRefunding] = useState(false);

  useEffect(() => {
  async function loadOrder() {
    setLoading(true);

    const snap = await getDoc(doc(db, "orders", orderId));

    if (snap.exists()) {
      const data = {
        id: snap.id,
        ...(snap.data() as Omit<OrderDetail, "id">),
      };

      setOrder(data);
      setTrackingForm(data.tracking ?? emptyTracking);
      setRefundAmount(String(data.grandTotal));
    }

    setLoading(false);
  }

  void loadOrder();
}, [orderId]);

  async function updateStatus(newStatus: string) {
    if (!order) return;
    setStatusUpdating(true);

    try {
      const changes: Record<string, unknown> = { orderStatus: newStatus };
      let justDeducted = false;

      // Deduct real stock only when the order newly reaches
      // "Delivered" — never on Pending/Packed/Shipped, and never
      // twice for the same order even if this gets clicked again.
      if (newStatus === "Delivered" && !order.inventoryUpdated) {
        await deductInventoryOnDelivery(order.products);
        changes.inventoryUpdated = true;
        justDeducted = true;
      }

      await updateOrderEverywhere(order.id, order.userId, changes);

      setOrder({
        ...order,
        orderStatus: newStatus,
        inventoryUpdated: order.inventoryUpdated || justDeducted,
      });
    } catch (err) {
      console.error(err);
      alert("Failed to update order status.");
    } finally {
      setStatusUpdating(false);
    }
  }

  async function saveTracking() {
    if (!order) return;
    setSavingTracking(true);

    try {
      const newStatus =
        order.orderStatus === "Delivered" ? "Delivered" : "Shipped";

      await updateOrderEverywhere(order.id, order.userId, {
        tracking: trackingForm,
        orderStatus: newStatus,
      });

      setOrder({ ...order, tracking: trackingForm, orderStatus: newStatus });
    } catch (err) {
      console.error(err);
      alert("Failed to save tracking info.");
    } finally {
      setSavingTracking(false);
    }
  }

  async function submitRefund() {
    if (!order) return;

    if (!order.razorpayPaymentId) {
      alert("This order has no linked payment ID — can't refund automatically.");
      return;
    }

    const amount = Number(refundAmount);

    if (!amount || amount <= 0 || amount > order.grandTotal) {
      alert(`Enter a valid amount between ₹1 and ₹${order.grandTotal}.`);
      return;
    }

    if (
      !confirm(
        `Refund ₹${amount} to ${order.customer?.name}? This cannot be undone.`
      )
    ) {
      return;
    }

    setRefunding(true);

    try {
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error("Not logged in");

      const idToken = await currentUser.getIdToken();

      const res = await fetch("/api/refund-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          paymentId: order.razorpayPaymentId,
          amount,
          reason: refundReason,
        }),
      });

      const result = await res.json();

      if (!result.success) {
        throw new Error(result.message || "Refund failed");
      }

      const isFullRefund = amount === order.grandTotal;
      const newPaymentStatus = isFullRefund ? "Refunded" : "Partially Refunded";

      await updateOrderEverywhere(order.id, order.userId, {
        paymentStatus: newPaymentStatus,
        orderStatus: "Cancelled",
      });

      setOrder({
        ...order,
        paymentStatus: newPaymentStatus,
        orderStatus: "Cancelled",
      });

      alert("Refund processed successfully.");
    } catch (err) {
      console.error(err);
      alert(
        err instanceof Error
          ? `Refund failed: ${err.message}`
          : "Refund failed. Check Razorpay dashboard to confirm nothing went through."
      );
    } finally {
      setRefunding(false);
    }
  }

  if (loading) {
    return <p className="text-gray-500">Loading order…</p>;
  }

  if (!order) {
    return (
      <div>
        <p className="text-gray-500">Order not found.</p>
        <button
          onClick={() => router.push("/admin/orders")}
          className="mt-4 text-[#0B3C8C] hover:underline"
        >
          ← Back to Orders
        </button>
      </div>
    );
  }

  return (
    <div>
      <Link
        href="/admin/orders"
        className="text-sm font-medium text-[#0B3C8C] hover:underline"
      >
        ← Back to Orders
      </Link>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold text-[#0B3C8C]">
            Order #{order.id.slice(0, 8).toUpperCase()}
          </h1>
          <p className="mt-1 text-gray-500">
            {order.createdAt?.toDate?.().toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            }) ?? "—"}
          </p>
        </div>

        <div className="flex gap-2">
          <span
            className={`rounded-full px-4 py-1.5 text-sm font-semibold ${
              order.paymentStatus === "Paid"
                ? "bg-green-100 text-green-700"
                : order.paymentStatus?.includes("Refund")
                ? "bg-orange-100 text-orange-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {order.paymentStatus ?? "Pending"}
          </span>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">

        {/* Left column — customer, address, items */}
        <div className="space-y-6 lg:col-span-2">

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-800">Customer</h2>
            <div className="mt-3 space-y-1 text-gray-700">
              <p className="font-medium">{order.customer?.name ?? "—"}</p>
              <p className="text-sm text-gray-500">{order.customer?.email}</p>
              <p className="text-sm text-gray-500">{order.customer?.mobile}</p>
            </div>
          </div>

          {order.address && (
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-800">
                Delivery Address
              </h2>
              <div className="mt-3 text-gray-700">
                <p>{order.address.house}</p>
                <p>{order.address.street}</p>
                {order.address.area && <p>{order.address.area}</p>}
                <p>
                  {order.address.city}, {order.address.state} —{" "}
                  {order.address.pincode}
                </p>
              </div>
            </div>
          )}

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-800">Items</h2>

            <div className="mt-4 divide-y divide-gray-100">
              {order.products.map((item, i) => (
                <div key={i} className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-medium text-gray-800">{item.name}</p>
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

            <div className="mt-4 space-y-1 border-t border-gray-100 pt-4 text-sm">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span>₹{order.subtotal}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Shipping</span>
                <span>₹{order.shipping}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-[#0B3C8C]">
                <span>Total</span>
                <span>₹{order.grandTotal}</span>
              </div>
            </div>
          </div>

          {(order.razorpayOrderId || order.razorpayPaymentId) && (
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm text-sm text-gray-500">
              <h2 className="text-lg font-bold text-gray-800">
                Payment Reference
              </h2>
              <p className="mt-3">Razorpay Order ID: {order.razorpayOrderId}</p>
              <p>Razorpay Payment ID: {order.razorpayPaymentId}</p>
            </div>
          )}

        </div>

        {/* Right column — status, tracking, refund */}
        <div className="space-y-6">

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-800">Order Status</h2>
            <select
              value={order.orderStatus ?? "Pending"}
              disabled={statusUpdating}
              onChange={(e) => updateStatus(e.target.value)}
              className="mt-3 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-800"
            >
              {ORDER_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>

            {order.inventoryUpdated && (
              <p className="mt-3 text-xs font-medium text-green-600">
                ✅ Stock deducted for this order
              </p>
            )}
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-800">
              🚚 Shipment Tracking
            </h2>

            <div className="mt-4 space-y-3">
              <div>
                <label className="text-xs font-medium text-gray-600">
                  Courier
                </label>
                <input
                  value={trackingForm.courier}
                  onChange={(e) =>
                    setTrackingForm({ ...trackingForm, courier: e.target.value })
                  }
                  placeholder="e.g. DTDC, Delhivery"
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-gray-600">
                  Tracking Number
                </label>
                <input
                  value={trackingForm.trackingNumber}
                  onChange={(e) =>
                    setTrackingForm({
                      ...trackingForm,
                      trackingNumber: e.target.value,
                    })
                  }
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-gray-600">
                  Tracking URL
                </label>
                <input
                  value={trackingForm.trackingUrl}
                  onChange={(e) =>
                    setTrackingForm({
                      ...trackingForm,
                      trackingUrl: e.target.value,
                    })
                  }
                  placeholder="https://..."
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-gray-600">
                  Dispatch Date
                </label>
                <input
                  type="date"
                  value={trackingForm.dispatchDate}
                  onChange={(e) =>
                    setTrackingForm({
                      ...trackingForm,
                      dispatchDate: e.target.value,
                    })
                  }
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                />
              </div>

              <button
                onClick={saveTracking}
                disabled={savingTracking}
                className="mt-2 w-full rounded-full bg-[#0B3C8C] py-2.5 text-sm font-semibold text-white hover:bg-[#082f6a] disabled:opacity-60"
              >
                {savingTracking ? "Saving…" : "Save Tracking"}
              </button>
            </div>
          </div>

          {order.paymentStatus === "Paid" && order.razorpayPaymentId && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-6 shadow-sm">
              <h2 className="text-lg font-bold text-red-700">
                Refund Payment
              </h2>

              <div className="mt-4 space-y-3">
                <div>
                  <label className="text-xs font-medium text-gray-600">
                    Refund Amount (₹)
                  </label>
                  <input
                    type="number"
                    value={refundAmount}
                    onChange={(e) => setRefundAmount(e.target.value)}
                    max={order.grandTotal}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-600">
                    Reason (optional)
                  </label>
                  <input
                    value={refundReason}
                    onChange={(e) => setRefundReason(e.target.value)}
                    placeholder="For your own records"
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                  />
                </div>

                <p className="text-xs text-gray-500">
                  Calls Razorpay directly and cannot be undone. Funds
                  typically reach the customer in 5-7 business days.
                </p>

                <button
                  onClick={submitRefund}
                  disabled={refunding}
                  className="w-full rounded-full bg-red-600 py-2.5 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60"
                >
                  {refunding ? "Processing…" : "Confirm Refund"}
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
