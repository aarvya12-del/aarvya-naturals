"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { formatGrams, formatUnits } from "@/lib/inventory";
import type { Product } from "@/types/product";

type OrderDoc = {
  grandTotal: number;
  createdAt?: { toDate: () => Date };
  paymentStatus?: string;
};

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState<OrderDoc[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      setOrders(snap.docs.map((d) => d.data() as OrderDoc));

      const productSnap = await getDocs(collection(db, "products"));
      setProducts(productSnap.docs.map((d) => d.data() as Product));

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

  const lowStockProducts = products.filter((p) => {
    if (p.variants.length === 1) {
      return (
        typeof p.stockUnits === "number" &&
        p.stockUnits <= (p.lowStockAlertUnits ?? 5)
      );
    }
    return (
      typeof p.stockGrams === "number" &&
      p.stockGrams <= (p.lowStockAlertGrams ?? 500)
    );
  });

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
        <>
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

            <div className="rounded-2xl border border-red-200 bg-red-50 p-6 shadow-sm">
              <p className="text-sm text-red-600">Low Stock</p>
              <p className="mt-2 text-3xl font-bold text-red-700">
                {lowStockProducts.length}
              </p>
            </div>
          </div>

          {lowStockProducts.length > 0 && (
            <div className="mt-8 rounded-2xl border border-red-200 bg-white shadow-sm">
              <div className="border-b border-red-100 bg-red-50 px-6 py-4">
                <h2 className="font-bold text-red-700">
                  ⚠️ Products Running Low
                </h2>
              </div>

              <div className="divide-y divide-gray-100">
                {lowStockProducts.map((p) => (
                  <div
                    key={p.slug}
                    className="flex items-center justify-between px-6 py-4"
                  >
                    <p className="font-medium text-gray-800">{p.name}</p>
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-red-600">
                        {p.variants.length === 1
                          ? formatUnits(p.stockUnits ?? 0)
                          : formatGrams(p.stockGrams ?? 0)}{" "}
                        left
                      </span>
                      <Link
                        href="/admin/products"
                        className="text-sm font-medium text-[#0B3C8C] hover:underline"
                      >
                        Restock →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
