import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-blue-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-3 gap-10">

          {/* Company */}
          <div>
            <h2 className="text-3xl font-bold">
              Aarvya Naturals
            </h2>

            <p className="mt-4 text-gray-300 leading-7">
              Premium dry fruits, healthy seeds, honey products and
              nutritious snacks carefully packed with freshness and
              delivered with care.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-2xl font-semibold mb-5">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3">

              <Link href="/" className="hover:text-yellow-400 transition">
                Home
              </Link>

              <Link href="/products" className="hover:text-yellow-400 transition">
                Products
              </Link>

              <Link href="/about" className="hover:text-yellow-400 transition">
                About Us
              </Link>

              <Link href="/contact" className="hover:text-yellow-400 transition">
                Contact
              </Link>

            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-2xl font-semibold mb-5">
              Contact Us
            </h3>

            <div className="space-y-3 text-gray-300">

              <p>📍 Ammankovil, Saravanampatti, Coimbatore - 641035</p>

              <p>📧 aarvya12@gmail.com</p>

              <p>📱 +91 63746 26691</p>

              <p>🕙 10:00 AM - 9:00 PM</p>

            </div>
          </div>

        </div>

        <div className="border-t border-blue-800 mt-12 pt-6 text-center text-gray-400">

          © {new Date().getFullYear()} Aarvya Naturals. All Rights Reserved.

        </div>

      </div>
    </footer>
  );
}