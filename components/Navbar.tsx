import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-2">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-4">
          <Image
            src="/images/logo/logo.jpg"
            alt="Aarvya Naturals"
            width={120}
            height={120}
            className="object-contain"
            priority
          />

          <div>
            <h1 className="text-3xl font-bold text-blue-900">
              Aarvya Naturals
            </h1>

            <p className="text-sm text-yellow-600">
              Grace That Grows With Peace
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8 font-medium">
          <Link
            href="/"
            className="text-gray-800 hover:text-blue-700 transition"
          >
            Home
          </Link>

          <Link
            href="/products"
            className="text-gray-800 hover:text-blue-700 transition"
          >
            Products
          </Link>

          <Link
            href="/about"
            className="text-gray-800 hover:text-blue-700 transition"
          >
            About
          </Link>

          <Link
            href="/contact"
            className="text-gray-800 hover:text-blue-700 transition"
          >
            Contact
          </Link>
        </nav>

        {/* WhatsApp Button */}
        <a
          href="https://wa.me/916374626691"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-semibold transition"
        >
          WhatsApp
        </a>

      </div>
    </header>
  );
}