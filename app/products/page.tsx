import Image from "next/image";
import Link from "next/link";
import { products } from "../../data/products";

export default function ProductsPage() {
  const categories = [...new Set(products.map((product) => product.category))];

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Hero */}
      <section className="bg-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">

          <h1 className="text-5xl font-bold">
            Our Products
          </h1>

          <p className="mt-5 text-xl text-blue-100">
            Premium dry fruits and carefully curated healthy products.
          </p>

        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">

        {categories.map((category) => (
          <div key={category} className="mb-20">

            <h2 className="text-4xl font-bold text-blue-900 mb-10">
              {category}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

              {products
                .filter((product) => product.category === category)
                .map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300"
                  >

                    <div className="relative h-72 bg-gray-100">

                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />

                      {product.badge && (
                        <span className="absolute top-4 left-4 bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-semibold">
                          {product.badge}
                        </span>
                      )}

                    </div>

                    <div className="p-8">

                      <h3 className="text-2xl font-bold text-blue-900">
                        {product.name}
                      </h3>

                      <p className="mt-4 text-gray-600 leading-7">
                        {product.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mt-6">

                        {product.packs.map((pack) => (
                          <span
                            key={pack}
                            className="bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-sm"
                          >
                            {pack}
                          </span>
                        ))}

                      </div>

                      <a
                        href="https://wa.me/916374626691"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-8 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-semibold transition"
                      >
                        Order via WhatsApp
                      </a>

                    </div>

                  </div>
                ))}

            </div>

          </div>
        ))}

        <div className="text-center mt-10">

          <Link
            href="/"
            className="text-blue-900 font-semibold hover:underline"
          >
            ← Back to Home
          </Link>

        </div>

      </section>

    </main>
  );
}