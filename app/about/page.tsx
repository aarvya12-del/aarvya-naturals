import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">

      <section className="bg-blue-900 text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">

          <h1 className="text-5xl font-bold">
            About Aarvya Naturals
          </h1>

          <p className="mt-6 text-xl text-blue-100">
            Grace That Grows With Peace
          </p>

        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-20">

        <h2 className="text-4xl font-bold text-blue-900">
          Our Story
        </h2>

        <p className="mt-6 leading-8 text-gray-700 text-lg">
          Aarvya Naturals was started with a simple vision — to provide
          premium quality dry fruits, healthy seeds and natural products
          at honest prices. Every product is carefully selected, hygienically
          packed and delivered with freshness.
        </p>

        <h2 className="text-4xl font-bold text-blue-900 mt-16">
          Our Mission
        </h2>

        <p className="mt-6 leading-8 text-gray-700 text-lg">
          We believe healthy eating should be simple, trustworthy and
          affordable. Our goal is to make premium nutrition accessible
          to every family.
        </p>

        <h2 className="text-4xl font-bold text-blue-900 mt-16">
          Why Choose Us?
        </h2>

        <div className="grid md:grid-cols-2 gap-8 mt-10">

          <div className="bg-gray-100 rounded-2xl p-8">
            🌿 Premium Quality Products
          </div>

          <div className="bg-gray-100 rounded-2xl p-8">
            📦 Hygienically Packed
          </div>

          <div className="bg-gray-100 rounded-2xl p-8">
            ❤️ Honest Pricing
          </div>

          <div className="bg-gray-100 rounded-2xl p-8">
            🚚 Quick WhatsApp Support
          </div>

        </div>

        <div className="text-center mt-20">

          <Link
            href="/products"
            className="bg-blue-900 text-white px-8 py-4 rounded-full hover:bg-blue-800 transition"
          >
            Explore Our Products
          </Link>

        </div>

      </section>

    </main>
  );
}