import Image from "next/image";
import Link from "next/link";
import { getAllProductsFromFirestore } from "@/lib/firestoreProducts";

export default async function FeaturedProducts() {
  const allProducts = await getAllProductsFromFirestore();

  const featuredProducts = allProducts
    .filter((product) => product.featured)
    .slice(0, 4);

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-[1500px] px-6">

        {/* Heading */}

        <div className="text-center">

          <span className="inline-block rounded-full bg-blue-100 px-4 py-2 font-semibold text-blue-900">
            Featured Collection
          </span>

          <h2 className="mt-6 text-5xl font-bold text-blue-900">
            Premium Products You&apos;ll Love
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-gray-600">
            Discover our most loved products, carefully selected to bring
            premium quality, great taste, and natural goodness to your home.
          </p>

        </div>

        {/* Products */}

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

          {featuredProducts.map((product) => (

            <div
              key={product.slug}
              className="group flex h-full flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-green-500 hover:shadow-2xl"
            >

              {/* Image */}

              <div className="relative h-96 overflow-hidden rounded-t-3xl bg-gray-50">

                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width:768px)100vw,(max-width:1024px)50vw,25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {product.badge && (
                  <span className="absolute left-4 top-4 rounded-full bg-[#C9A227] px-4 py-1 text-sm font-bold text-white shadow-md">
                    {product.badge}
                  </span>
                )}

              </div>

              {/* Details */}

              <div className="flex flex-1 flex-col p-7">

                <h3 className="text-2xl font-bold text-blue-900">
                  {product.name}
                </h3>

                <p className="mt-3 flex-1 leading-7 text-gray-600">
                  {product.shortDescription}
                </p>

                {/* Price */}

                <div className="mt-6">

                  <p className="text-3xl font-bold text-green-700">
                    ₹{product.variants[0].price}
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    Starting from {product.variants[0].weight}
                  </p>

                </div>

                {/* Button */}

                <Link
                  href={`/products/${product.slug}?category=${encodeURIComponent(
                    product.category
                  )}`}
                  className="mt-8 rounded-full bg-[#0B3C8C] py-4 text-center font-semibold text-white transition-all duration-300 hover:bg-[#082F6D]"
                >
                  View Details
                </Link>

              </div>

            </div>

          ))}

        </div>

        {/* View All */}

        <div className="mt-16 text-center">

          <Link
            href="/products"
            className="inline-block rounded-full border-2 border-[#0B3C8C] px-8 py-4 font-semibold text-[#0B3C8C] transition-all duration-300 hover:bg-[#0B3C8C] hover:text-white"
          >
            View All Products
          </Link>

        </div>

      </div>
    </section>
  );
}
