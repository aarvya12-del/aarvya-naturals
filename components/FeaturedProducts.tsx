import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";

export default function FeaturedProducts() {
  const featuredProducts = products
    .filter((product) => product.featured)
    .slice(0, 4);

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}

        <div className="text-center">

          <span className="inline-block rounded-full bg-blue-100 px-4 py-2 font-semibold text-blue-900">
            Featured Collection
          </span>

          <h2 className="mt-6 text-5xl font-bold text-blue-900">
            Premium Products You'll Love
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-xl text-gray-600">
            Carefully selected premium products from Aarvya Naturals for a
            healthier lifestyle.
          </p>

        </div>

        {/* Products */}

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {featuredProducts.map((product) => (

            <div
              key={product.id}
              className="flex h-full flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >

              {/* Image */}

              <div className="relative flex h-72 items-center justify-center bg-gray-50">

                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width:768px)100vw,(max-width:1024px)50vw,25vw"
                  className="object-contain p-6"
                />

                {product.badge && (
                  <span className="absolute left-4 top-4 rounded-full bg-[#C9A227] px-3 py-1 text-sm font-semibold text-white">
                    {product.badge}
                  </span>
                )}

              </div>

              {/* Details */}

              <div className="flex flex-1 flex-col p-6">

                <h3 className="min-h-[72px] text-2xl font-bold text-blue-900">
                  {product.name}
                </h3>

                <p className="mt-3 min-h-[56px] text-gray-600">
                  {product.shortDescription}
                </p>

                {/* Price */}

                <div className="mt-5">

                  <p className="text-3xl font-bold text-green-700">
                    ₹{product.variants[0].price}
                  </p>

                  <p className="text-sm text-gray-500">
                    Starting from {product.variants[0].weight}
                  </p>

                </div>

                {/* Packs */}

                <div className="mt-6">

                  <p className="mb-3 text-sm font-semibold text-gray-500">
                    Available Packs
                  </p>

                  <div className="flex min-h-[68px] flex-wrap gap-2">

                    {product.variants.map((variant) => (

                      <span
                        key={variant.id}
                        className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-900"
                      >
                        {variant.weight}
                      </span>

                    ))}

                  </div>

                </div>

                {/* Button */}

                <Link
                  href={`/products/${product.slug}?category=${encodeURIComponent(product.category)}`}
                  className="mt-auto rounded-full bg-[#0B3C8C] py-4 text-center font-semibold text-white transition hover:bg-[#082F6D]"
                >
                  View Product
                </Link>

              </div>

            </div>

          ))}

        </div>

        {/* View All */}

        <div className="mt-16 text-center">

          <Link
            href="/products"
            className="inline-block rounded-full border-2 border-[#0B3C8C] px-8 py-4 font-semibold text-[#0B3C8C] transition hover:bg-[#0B3C8C] hover:text-white"
          >
            View All Products
          </Link>

        </div>

      </div>
    </section>
  );
}