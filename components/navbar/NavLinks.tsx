"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "@/components/Icons";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "Combo Offers", href: "/combo-offers" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function NavLinks() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close the mobile menu automatically whenever the route changes
  // (e.g. after tapping a link), so it never stays open by mistake.
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Desktop nav — unchanged */}
      <nav className="hidden items-center gap-10 lg:flex">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`group relative text-lg font-semibold tracking-wide transition-all duration-300 ${
              pathname === item.href
                ? "text-[#0B3C8C]"
                : "text-gray-700 hover:text-[#0B3C8C]"
            }`}
          >
            {item.name}

            <span
              className={`absolute -bottom-2 left-0 h-[3px] rounded-full bg-[#C9A227] transition-all duration-300 ${
                pathname === item.href
                  ? "w-full"
                  : "w-0 group-hover:w-full"
              }`}
            />
          </Link>
        ))}
      </nav>

      {/* Mobile hamburger button — only shown below the lg breakpoint,
          exactly where the nav links used to just disappear with no
          replacement. */}
      <button
        onClick={() => setMobileOpen((prev) => !prev)}
        aria-label={mobileOpen ? "Close menu" : "Open menu"}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-300 text-gray-700 lg:hidden"
      >
        {mobileOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Mobile dropdown panel */}
      {mobileOpen && (
        <div className="absolute left-0 right-0 top-full z-40 border-t border-gray-100 bg-white shadow-lg lg:hidden">
          <nav className="flex flex-col divide-y divide-gray-100">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-6 py-4 text-lg font-semibold ${
                  pathname === item.href
                    ? "text-[#0B3C8C]"
                    : "text-gray-700"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
