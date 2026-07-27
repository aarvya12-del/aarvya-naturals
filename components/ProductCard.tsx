import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";

export default function ProductCard({
  product,
}: {
  product: Product;
}) {
  return (
    <div className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

      {/* Product Image */}

      <div className="relative h-72 bg-gray-100">

        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width:768px)100vw,(max-width:1200px)50vw,33vw"
          className="object-contain p-6 transition duration-500 group-hover:scale-105"
        />

        {product.badge && (
          <span className="absolute left-4 top-4 rounded-full bg-[#C9A227] px-4 py-1 text-sm font-bold text-white shadow">
            {product.badge}
          </span>
        )}

      </div>

      {/* Details */}

      <div className="p-7">

        <h3 className="text-2xl font-bold text-[#0B3C8C]">
          {product.name}
        </h3>

        <p className="mt-3 min-h-[70px] leading-7 text-gray-600">
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

        {/* Variants */}

        <div className="mt-5 flex flex-wrap gap-2">

          {product.variants.map((variant) => (

            <span
              key={variant.id}
              className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-900"
            >
              {variant.weight}
            </span>

          ))}

        </div>

        {/* Buttons */}

        <div className="mt-8 grid grid-cols-2 gap-3">

          <Link
            href={`/products/${product.slug}?category=${encodeURIComponent(product.category)}`}
            className="rounded-full border-2 border-[#0B3C8C] py-3 text-center font-semibold text-[#0B3C8C] transition hover:bg-[#0B3C8C] hover:text-white"
          >
            View Product
          </Link>

          <Link
            href={`/products/${product.slug}?category=${encodeURIComponent(product.category)}`}
            className="rounded-full bg-green-600 py-3 text-center font-semibold text-white transition hover:bg-green-700"
          >
            Choose Options
          </Link>

        </div>

      </div>

    </div>
  );
}