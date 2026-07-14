export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">

      {/* Header */}
      <section className="bg-blue-900 text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold">Contact Us</h1>

          <p className="mt-6 text-xl text-blue-100">
            We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Details */}
      <section className="max-w-5xl mx-auto px-6 py-20">

        <div className="grid md:grid-cols-2 gap-10">

          <div className="bg-gray-100 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-blue-900 mb-6">
              Contact Information
            </h2>

            <div className="space-y-5 text-gray-700">

              <p>
                <strong>Email:</strong><br />
                aarvya12@gmail.com
              </p>

              <p>
                <strong>Phone / WhatsApp:</strong><br />
                +91 63746 26691
              </p>

              <p>
                <strong>Address:</strong><br />
                Ammankovil,<br />
                Saravanampatti,<br />
                Coimbatore – 641035
              </p>

              <p>
                <strong>Working Hours:</strong><br />
                10:00 AM – 9:00 PM
              </p>

            </div>
          </div>

          <div className="bg-blue-900 rounded-2xl p-8 text-white">

            <h2 className="text-2xl font-bold mb-6">
              Order on WhatsApp
            </h2>

            <p className="leading-8 text-blue-100">
              Looking for premium dry fruits, healthy seeds,
              honey products or healthy snacks?
              Send us a message on WhatsApp and we'll be happy
              to help you choose the right products.
            </p>

            <a
              href="https://wa.me/916374626691"
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