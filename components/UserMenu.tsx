"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function UserMenu() {
  const { user, logout } = useAuth();

  const [open, setOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  if (!user) return null;

  return (
    <div
      className="relative"
      ref={menuRef}
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-full border border-[#0B3C8C] px-4 py-2 font-semibold text-[#0B3C8C] transition hover:bg-[#0B3C8C] hover:text-white"
      >
        👤{" "}
        {user.displayName ||
          user.email?.split("@")[0]}

        <span
          className={`transition ${
            open ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-64 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">

          <div className="border-b bg-[#0B3C8C] p-5 text-white">

            <h3 className="font-bold">
              {user.displayName || "Customer"}
            </h3>

            <p className="mt-1 text-sm opacity-80">
              {user.email}
            </p>

          </div>

          <div className="py-2">

            <Link
              href="/profile"
              className="block px-5 py-3 hover:bg-gray-100"
            >
              👤 My Profile
            </Link>

            <Link
              href="/wishlist"
              className="block px-5 py-3 hover:bg-gray-100"
            >
              ❤️ Wishlist
            </Link>

            <Link
              href="/orders"
              className="block px-5 py-3 hover:bg-gray-100"
            >
              📦 My Orders
            </Link>

            <Link
              href="/addresses"
              className="block px-5 py-3 hover:bg-gray-100"
            >
              📍 Saved Addresses
            </Link>

            <hr className="my-2" />

            <button
              onClick={logout}
              className="w-full px-5 py-3 text-left text-red-600 hover:bg-red-50"
            >
              🚪 Logout
            </button>

          </div>

        </div>
      )}

    </div>
  );
}