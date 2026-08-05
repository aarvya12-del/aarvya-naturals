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

      <header className="sticky top-0 z-50 bg-white shadow-md relative">

        <div className="mx-auto flex h-24 max-w-7xl items-center justify-between pl-3 pr-6 lg:pl-4 lg:pr-8">

          {/* Logo */}

          <Link
            href="/"
            className="mr-6 flex shrink-0 items-center transition duration-300 hover:scale-105"
          >
            <Image
              src="/images/logo/logo-horizontal.png"
              alt="Aarvya Naturals"
              width={340}
              height={90}
              priority
              className="h-20 w-auto object-contain"
            />
          </Link>

          {/* Navigation */}

          <NavLinks />

          {/* User Menu (includes cart, WhatsApp, suggestions, social icons) */}

          <UserMenu />

        </div>

      </header>
    </>
  );
}
