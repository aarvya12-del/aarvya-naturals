import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0B1F3A] text-white">

      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Company */}

          <div>

            <h2 className="text-3xl font-bold">
              Aarvya Naturals
            </h2>

            <p className="mt-5 text-gray-300 leading-8">

              Premium dry fruits, healthy seeds, honey products and wholesome
              snacks sourced with care and packed hygienically for every family.

            </p>

            <div className="mt-6">

              <p className="font-semibold text-green-400">

                FSSAI Licence No.

              </p>

              <p className="text-gray-300">

                22426552000244

              </p>

            </div>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="text-xl font-semibold mb-6">

              Quick Links

            </h3>

            <div className="space-y-4">

              <Link href="/" className="block hover:text-yellow-400 transition">
                Home
              </Link>

              <Link href="/products" className="block hover:text-yellow-400 transition">
                Products
              </Link>

              <Link href="/combo-offers" className="block hover:text-yellow-400 transition">
                Combo Offers
              </Link>

              <Link href="/about" className="block hover:text-yellow-400 transition">
                About Us
              </Link>

              <Link href="/contact" className="block hover:text-yellow-400 transition">
                Contact
              </Link>

            </div>

          </div>

          {/* Contact */}

          <div>

            <h3 className="text-xl font-semibold mb-6">

              Contact

            </h3>

            <div className="space-y-4 text-gray-300 leading-7">

              <p>
                📍 Ammankovil,<br />
                Saravanampatti,<br />
                Coimbatore - 641035
              </p>

              <p>📞 +91 63746 26691</p>

              <p>✉️ aarvya12@gmail.com</p>

              <p>🕙 10:00 AM – 9:00 PM</p>

            </div>

          </div>

          {/* Follow Us */}

          <div>

            <h3 className="text-xl font-semibold mb-6">

              Connect With Us

            </h3>

            <div className="space-y-4">

              <a
                href="https://wa.me/916374626691"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-green-400 transition"
              >
                💬 WhatsApp
              </a>

              <a
                href="#"
                className="block hover:text-pink-400 transition"
              >
                📷 Instagram
              </a>

              <a
                href="#"
                className="block hover:text-blue-400 transition"
              >
                👍 Facebook
              </a>

              <a
                href="mailto:aarvya12@gmail.com"
                className="block hover:text-yellow-400 transition"
              >
                ✉️ Email Us
              </a>

            </div>

          </div>

        </div>

        {/* Bottom Strip */}

        <div className="border-t border-blue-800 mt-14 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-gray-400 text-center md:text-left">

            © {new Date().getFullYear()} Aarvya Naturals. All Rights Reserved.

          </p>

          <p className="text-gray-400 text-center">

            Freshly Packed • Premium Quality • Pan India Delivery

          </p>

        </div>

      </div>

    </footer>
  );
}