"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";

type OrderDoc = {
  grandTotal: number;
  createdAt?: { toDate: () => Date };
  paymentStatus?: string;
};

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState<OrderDoc[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      setOrders(snap.docs.map((d) => d.data() as OrderDoc));
      setLoading(false);
    }
    load();
  }, []);

  const totalOrders = orders.length;
  const paidOrders = orders.filter((o) => o.paymentStatus === "Paid");
  const totalRevenue = paidOrders.reduce((sum, o) => sum + (o.grandTotal || 0), 0);

  const today = new Date();
  const ordersToday = orders.filter((o) => {
    const d = o.createdAt?.toDate?.();
    return (
      d &&
      d.getDate() === today.getDate() &&
      d.getMonth() === today.getMonth() &&
      d.getFullYear() === today.getFullYear()
    );
  }).length;

  const cards = [
    { label: "Total Orders", value: totalOrders },
    { label: "Orders Today", value: ordersToday },
    { label: "Paid Orders", value: paidOrders.length },
    { label: "Total Revenue", value: `₹${totalRevenue.toLocaleString("en-IN")}` },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-[#0B3C8C]">Dashboard</h1>
      <p className="mt-2 text-gray-500">Overview of your store activity.</p>

      {loading ? (
        <p className="mt-10 text-gray-500">Loading stats…</p>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {cards.map((c) => (
            <div
              key={c.label}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <p className="text-sm text-gray-500">{c.label}</p>
              <p className="mt-2 text-3xl font-bold text-[#0B3C8C]">
                {c.value}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
