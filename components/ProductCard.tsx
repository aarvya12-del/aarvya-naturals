import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";
import WishlistHeartButton from "@/components/WishlistHeartButton";

export default function ProductCard({
  product,
}: {
  product: Product;
}) {
  return (
    <div className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

      {/* Product Image */}

      <div className="relative h-96 overflow-hidden rounded-t-3xl bg-gray-50">

        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width:768px)100vw,(max-width:1200px)50vw,33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {product.badge && (
          <span className="absolute left-4 top-4 rounded-full bg-[#C9A227] px-4 py-1 text-sm font-bold text-white shadow">
            {product.badge}
          </span>
        )}

        <WishlistHeartButton slug={product.slug} type="product" />

      </div>

      {/* Details */}

      <div className="p-7">

        <h3 className="text-2xl font-bold text-[#0B3C8C]">
          {product.name}
        </h3>

        <p className="mt-3 min-h-[60px] leading-7 text-gray-600">
          {product.shortDescription}
        </p>

        {/* Price */}

        <div className="mt-5">

          <p className="text-3xl font-bold text-green-700">
            ₹{product.variants[0].price}
          </p>

          <p className="text-sm text-gray-500">
            Starting at ₹{product.variants[0].price} /{" "}
            {product.variants[0].weight}
          </p>

        </div>

        {/* Button */}

        <div className="mt-8">

          <Link
            href={`/products/${product.slug}?category=${encodeURIComponent(
              product.category
            )}`}
            className="block w-full rounded-full bg-[#0B3C8C] py-3 text-center font-semibold text-white transition duration-300 hover:bg-[#082f6a]"
          >
            View Details
          </Link>

        </div>

      </div>

    </div>
  );
}
