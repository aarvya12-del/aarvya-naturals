"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useAdminAuth } from "@/lib/useAdminAuth";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/suggestions", label: "Suggestions" },
];

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { isAdmin, loading, user } = useAdminAuth();
  const router = useRouter();
  const pathname = usePathname();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FDFBF7]">
        <p className="text-gray-500">Checking access…</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#FDFBF7] px-6 text-center">
        <p className="text-xl font-semibold text-[#0B3C8C]">
          Please log in to continue
        </p>
        <button
          onClick={() => router.push("/login")}
          className="rounded-full bg-[#0B3C8C] px-6 py-3 font-semibold text-white hover:bg-[#082f6a]"
        >
          Go to Login
        </button>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-[#FDFBF7] px-6 text-center">
        <p className="text-xl font-semibold text-red-700">
          You don&apos;t have admin access
        </p>
        <p className="text-gray-500">
          Signed in as {user.email}. Contact the store owner if you
          believe this is a mistake.
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#FDFBF7]">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 border-r border-gray-200 bg-white px-5 py-8">
        <div className="mb-10 px-2">
          <p className="text-lg font-bold text-[#0B3C8C]">
            Aarvya Admin
          </p>
          <p className="mt-1 text-xs text-gray-500">{user.email}</p>
        </div>

        <nav className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                  active
                    ? "bg-[#0B3C8C] text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-10 border-t border-gray-200 pt-4">
          <Link
            href="/"
            className="block px-4 py-2 text-sm text-gray-500 hover:text-gray-800"
          >
            ← Back to store
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 px-8 py-8">{children}</main>
    </div>
  );
}
