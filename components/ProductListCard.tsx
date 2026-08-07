"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Leaf, ShieldCheck, BadgeCheck, ShoppingCart, ChevronRight } from "@/components/Icons";
import WishlistHeartButton from "@/components/WishlistHeartButton";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/types/product";

const TAG_ICONS = [Leaf, ShieldCheck, BadgeCheck];

function badgeStyle(badge: string) {
  const lower = badge.toLowerCase();

  if (lower.includes("best") || lower.includes("popular")) {
    return "bg-green-100 text-green-700";
  }

  if (lower.includes("premium")) {
    return "bg-amber-100 text-amber-700";
  }

  return "bg-blue-50 text-[#0B3C8C]";
}

export default function ProductListCard({ product }: { product: Product }) {
  const router = useRouter();
  const { addToCart } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [added, setAdded] = useState(false);

  const href = `/products/${product.slug}?category=${encodeURIComponent(product.category)}`;

  function goToProduct() {
    router.push(href);
  }

  function handleAddToCart(e: React.MouseEvent) {
    e.stopPropagation();

    addToCart({
      id: product.id,
      slug: product.slug,
      name: product.name,
      image: product.image,
      variant: selectedVariant.weight,
      price: selectedVariant.price,
      type: "product",
      quantity: 1,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div
      role="link"
      tabIndex={0}
      onClick={goToProduct}
      onKeyDown={(e) => {
        if (e.key === "Enter") goToProduct();
      }}
      className="group flex cursor-pointer flex-col gap-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg sm:flex-row"
    >
      {/* Image */}
      <div className="relative mx-auto h-44 w-44 shrink-0 overflow-hidden rounded-xl bg-gray-50 sm:mx-0">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="176px"
          className="object-cover transition duration-500 group-hover:scale-105"
        />

        <WishlistHeartButton
          slug={product.slug}
          type="product"
          className="absolute right-2 top-2 h-8 w-8"
        />
      </div>

      {/* Details */}
      <div className="min-w-0 flex-1">
        {product.badge && (
          <span
            className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${badgeStyle(
              product.badge
            )}`}
          >
            {product.badge}
          </span>
        )}

        <h3 className="mt-2 text-xl font-bold text-[#0B3C8C] transition group-hover:underline sm:text-2xl">
          {product.name}
        </h3>

        <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-600 sm:text-base">
          {product.shortDescription || product.description}
        </p>

        {product.benefits?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
            {product.benefits.slice(0, 3).map((benefit, i) => {
              const Icon = TAG_ICONS[i % TAG_ICONS.length];

              return (
                <span
                  key={benefit}
                  className="flex items-center gap-1.5 text-xs text-gray-500 sm:text-sm"
                >
                  <Icon size={15} className="text-green-600" />
                  {benefit}
                </span>
              );
            })}
          </div>
        )}
      </div>

      {/* Price + Actions */}
      <div className="flex w-full shrink-0 flex-col sm:w-52">
        <p className="text-2xl font-bold text-green-700">
          ₹{selectedVariant.price}
        </p>

        <p className="text-xs text-gray-500">
          Starting at ₹{product.variants[0].price} / {product.variants[0].weight}
        </p>

        {product.variants.length > 1 && (
          <select
            value={selectedVariant.id}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => {
              const next = product.variants.find((v) => v.id === e.target.value);
              if (next) setSelectedVariant(next);
            }}
            className="mt-3 rounded-xl border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 outline-none focus:border-[#0B3C8C]"
          >
            {product.variants.map((variant) => (
              <option key={variant.id} value={variant.id}>
                {variant.weight}
              </option>
            ))}
          </select>
        )}

        <span className="mt-3 flex items-center justify-center gap-1 rounded-full border border-[#0B3C8C] py-2.5 text-sm font-semibold text-[#0B3C8C] transition group-hover:bg-blue-50">
          View Details
          <ChevronRight size={16} />
        </span>

        <button
          onClick={handleAddToCart}
          className={`mt-2 flex items-center justify-center gap-2 rounded-full py-2.5 text-sm font-semibold text-white transition ${
            added ? "bg-green-600" : "bg-[#0B3C8C] hover:bg-[#082F6D]"
          }`}
        >
          {added ? (
            "✓ Added"
          ) : (
            <>
              <ShoppingCart size={16} />
              Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
}
