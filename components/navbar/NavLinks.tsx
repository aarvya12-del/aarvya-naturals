"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Combo Offers", href: "/combo-offers" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
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
  );
}