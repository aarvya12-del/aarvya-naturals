import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">

      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">

          <p className="uppercase tracking-[4px] text-yellow-400 font-semibold">
            About Us
          </p>

          <h1 className="text-5xl md:text-6xl font-bold mt-4">
            Grace That Grows With Peace
          </h1>

          <p className="mt-8 max-w-3xl mx-auto text-xl text-blue-100 leading-8">
            Aarvya Naturals is committed to bringing premium dry fruits,
            healthy seeds and carefully curated healthy products to every
            family with quality, freshness and trust.
          </p>

        </div>
      </section>

      {/* Our Story */}
      <section className="max-w-6xl mx-auto px-6 py-20">

        <div className="grid md:grid-cols-2 gap-14 items-center">

          <div>

            <h2 className="text-4xl font-bold text-blue-900">
              Our Story
            </h2>

            <p className="mt-6 text-gray-700 leading-8 text-lg">
              Aarvya Naturals was born from a passion for offering wholesome,
              premium-quality foods that people can trust. Every product we
              pack or carefully curate is selected with one goal in mind:
              delivering quality without compromise.
            </p>

            <p className="mt-6 text-gray-700 leading-8 text-lg">
              We believe that healthy living starts with good ingredients,
              honest sourcing and genuine customer relationships.
            </p>

          </div>

          <div className="bg-blue-50 rounded-3xl p-10">

            <h3 className="text-2xl font-bold text-blue-900 mb-6">
              Our Promise
            </h3>

            <ul className="space-y-4 text-gray-700 text-lg">
              <li>✔ Premium Quality Products</li>
              <li>✔ Hygienic Packing</li>
              <li>✔ Trusted Product Selection</li>
              <li>✔ Friendly Customer Support</li>
              <li>✔ Honest Pricing</li>
            </ul>

          </div>

        </div>

      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-50 py-20">

        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center text-blue-900">
            Why Choose Aarvya Naturals?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-14">

            <div className="bg-white shadow rounded-2xl p-8 text-center">
              <h3 className="font-bold text-xl text-blue-900">
                Premium Quality
              </h3>
              <p className="mt-4 text-gray-600">
                Carefully selected products for the best quality.
              </p>
            </div>

            <div className="bg-white shadow rounded-2xl p-8 text-center">
              <h3 className="font-bold text-xl text-blue-900">
                Hygienically Packed
              </h3>
              <p className="mt-4 text-gray-600">
                Packed with care to maintain freshness.
              </p>
            </div>

            <div className="bg-white shadow rounded-2xl p-8 text-center">
              <h3 className="font-bold text-xl text-blue-900">
                Trusted Products
              </h3>
              <p className="mt-4 text-gray-600">
                Every item is chosen with customer trust in mind.
              </p>
            </div>

            <div className="bg-white shadow rounded-2xl p-8 text-center">
              <h3 className="font-bold text-xl text-blue-900">
                Customer First
              </h3>
              <p className="mt-4 text-gray-600">
                Friendly support before and after every purchase.
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* CTA */}
      <section className="py-20">

        <div className="max-w-4xl mx-auto px-6 text-center">

          <h2 className="text-4xl font-bold text-blue-900">
            Experience the Aarvya Difference
          </h2>

          <p className="mt-6 text-lg text-gray-700">
            Explore our premium collection and discover healthier choices
            for you and your family.
          </p>

          <Link
            href="/products"
            className="inline-block mt-10 bg-blue-900 hover:bg-blue-800 text-white px-10 py-4 rounded-full font-semibold transition"
          >
            Explore Products
          </Link>

        </div>

      </section>

    </main>
  );
}