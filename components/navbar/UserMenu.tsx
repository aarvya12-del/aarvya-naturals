"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import SocialLinks from "@/components/navbar/SocialLinks";

import {
  ShoppingCart,
  ChevronDown,
  LogOut,
  Heart,
  Package,
  MapPin,
  MessageCircle,
  MessageSquarePlus,
  UserCircle,
} from "@/components/Icons";

export default function UserMenu() {
  const { cart } = useCart();
  const { user, loading, logout } = useAuth();

  const [open, setOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const initials =
    user?.displayName
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase() ||
    user?.email?.charAt(0).toUpperCase() ||
    "A";

  const closeMenu = () => setOpen(false);

  return (
    <div className="flex items-center gap-4">

      {/* Account */}

      {!loading &&
        (user ? (
          <div
            ref={menuRef}
            className="relative"
          >
            <button
              onClick={() => setOpen((prev) => !prev)}
              className="flex items-center gap-3 rounded-xl px-3 py-2 transition hover:bg-blue-50"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0B3C8C] font-bold text-white">
                {initials}
              </div>

              <span className="font-semibold text-[#0B3C8C]">
                {user.displayName ||
                  user.email?.split("@")[0]}
              </span>

              <ChevronDown
                size={18}
                className={`transition-transform duration-300 ${
                  open ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`absolute right-0 mt-3 w-64 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl transition-all duration-200 ${
                open
                  ? "visible translate-y-0 opacity-100"
                  : "invisible -translate-y-2 opacity-0"
              }`}
            >
              <Link
                href="/profile"
                onClick={closeMenu}
                className="flex items-center gap-3 px-5 py-4 transition hover:bg-blue-50"
              >
                <UserCircle size={20} />
                My Profile
              </Link>

              <Link
                href="/orders"
                onClick={closeMenu}
                className="flex items-center gap-3 px-5 py-4 transition hover:bg-blue-50"
              >
                <Package size={20} />
                My Orders
              </Link>

              <Link
                href="/wishlist"
                onClick={closeMenu}
                className="flex items-center gap-3 px-5 py-4 transition hover:bg-blue-50"
              >
                <Heart size={20} />
                Wishlist
              </Link>

              <Link
                href="/addresses"
                onClick={closeMenu}
                className="flex items-center gap-3 px-5 py-4 transition hover:bg-blue-50"
              >
                <MapPin size={20} />
                Addresses
              </Link>

              <button
                onClick={async () => {
                  closeMenu();
                  await logout();
                }}
                className="flex w-full items-center gap-3 px-5 py-4 text-red-600 transition hover:bg-red-50"
              >
                <LogOut size={20} />
                Logout
              </button>
            </div>
          </div>
        ) : (
          <Link
            href="/login"
            className="font-semibold text-[#0B3C8C] transition hover:text-[#C9A227]"
          >
            Login
          </Link>
        ))}

      {/* Cart */}

      <Link
        href="/cart"
        className="relative flex h-12 w-12 items-center justify-center rounded-full border border-[#0B3C8C] transition hover:bg-blue-50"
      >
        <ShoppingCart
          size={24}
          className="text-[#0B3C8C]"
        />

        {totalItems > 0 && (
          <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
            {totalItems}
          </span>
        )}
      </Link>

      {/* WhatsApp */}

      <a
        href="https://wa.me/916374626691?text=Hello%20Aarvya%20Naturals,%20I'm%20interested%20in%20your%20products."
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 rounded-full bg-green-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-105 hover:bg-green-700"
      >
        <MessageCircle size={20} />
        WhatsApp
      </a>

      {/* Suggestions — after WhatsApp, out of the primary action cluster */}

      <Link
        href="/suggestions"
        aria-label="Suggestions & Feedback"
        title="Suggestions & Feedback"
        className="flex h-12 w-12 items-center justify-center rounded-full border border-[#0B3C8C] transition hover:bg-blue-50"
      >
        <MessageSquarePlus
          size={22}
          className="text-[#0B3C8C]"
        />
      </Link>

      {/* Social icons — last, least frequently used */}

      <SocialLinks />

    </div>
  );
}
