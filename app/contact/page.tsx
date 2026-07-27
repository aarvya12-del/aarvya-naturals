export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">

      {/* Hero */}
      <section className="bg-blue-900 text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold">Contact Us</h1>

          <p className="mt-6 text-xl text-blue-100">
            We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="max-w-6xl mx-auto px-6 py-20">

        <div className="grid md:grid-cols-2 gap-10">

          {/* Contact Details */}
          <div className="bg-gray-100 rounded-3xl p-10 shadow-sm">

            <h2 className="text-3xl font-bold text-blue-900 mb-8">
              Contact Information
            </h2>

            <div className="space-y-6 text-gray-700">

              <div>
                <h3 className="font-semibold text-lg text-blue-900">
                  Email
                </h3>
                <p>aarvya12@gmail.com</p>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-blue-900">
                  Phone / WhatsApp
                </h3>
                <p>+91 63746 26691</p>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-blue-900">
                  Address
                </h3>
                <p>
                  Ammankovil,
                  <br />
                  Saravanampatti,
                  <br />
                  Coimbatore - 641035
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-blue-900">
                  Working Hours
                </h3>
                <p>10:00 AM - 9:00 PM</p>
              </div>

            </div>

          </div>

          {/* WhatsApp Card */}
          <div className="bg-blue-900 text-white rounded-3xl p-10 shadow-lg">

            <h2 className="text-3xl font-bold mb-8">
              Order via WhatsApp
            </h2>

            <p className="text-blue-100 leading-8">
              Looking for premium dry fruits, healthy seeds or carefully
              curated healthy products? Send us a message and we'll help
              you choose the perfect products for your needs.
            </p>

            <a
              href="https://wa.me/916374626691?text=Hello%20Aarvya%20Naturals,%20I'm%20interested%20in%20your%20products."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-10 bg-green-600 hover:bg-green-700 px-8 py-4 rounded-full font-semibold transition"
            >
              Chat on WhatsApp
            </a>

          </div>

        </div>

      </section>

    </main>
  );
}