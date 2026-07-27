"use client";

import Image from "next/image";
import Link from "next/link";

import TrustBar from "@/components/navbar/TrustBar";
import NavLinks from "@/components/navbar/NavLinks";
import UserMenu from "@/components/navbar/UserMenu";

export default function Navbar() {
  return (
    <>
      <TrustBar />

      <header className="sticky top-0 z-50 bg-white shadow-md">

        <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-6 lg:px-8">

          {/* Logo */}

          <Link
            href="/"
            className="flex items-center transition duration-300 hover:scale-105"
          >
            <Image
              src="/images/logo/logo-horizontal.png"
              alt="Aarvya Naturals"
              width={300}
              height={80}
              priority
              className="h-16 w-auto object-contain"
            />
          </Link>

          {/* Navigation */}

          <NavLinks />

          {/* User Menu */}

          <UserMenu />

        </div>

      </header>
    </>
  );
}