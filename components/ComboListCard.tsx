"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Leaf, ShieldCheck, BadgeCheck, ShoppingCart, ChevronRight } from "@/components/Icons";
import WishlistHeartButton from "@/components/WishlistHeartButton";
import { useCart } from "@/context/CartContext";
import type { ComboProduct } from "@/data/comboProducts";

const TAG_ICONS = [Leaf, ShieldCheck, BadgeCheck];

function badgeStyle(badge: string) {
  const lower = badge.toLowerCase();

  if (lower.includes("best") || lower.includes("value")) {
    return "bg-green-100 text-green-700";
  }

  if (lower.includes("premium")) {
    return "bg-amber-100 text-amber-700";
  }

  return "bg-blue-50 text-[#0B3C8C]";
}

export default function ComboListCard({ combo }: { combo: ComboProduct }) {
  const router = useRouter();
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const href = `/combo-offers/${combo.slug}`;

  function goToCombo() {
    router.push(href);
  }

  function handleAddToCart(e: React.MouseEvent) {
    e.stopPropagation();

    addToCart({
      id: combo.id,
      slug: combo.slug,
      name: combo.name,
      image: combo.image,
      variant: "Combo Pack",
      price: combo.price,
      type: "combo",
      quantity: 1,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div
      role="link"
      tabIndex={0}
      onClick={goToCombo}
      onKeyDown={(e) => {
        if (e.key === "Enter") goToCombo();
      }}
      className="group flex cursor-pointer flex-col gap-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg sm:flex-row"
    >
      {/* Image */}
      <div className="relative mx-auto h-44 w-44 shrink-0 overflow-hidden rounded-xl bg-gray-50 sm:mx-0">
        <Image
          src={combo.image}
          alt={combo.name}
          fill
          sizes="176px"
          className="object-contain p-3 transition duration-500 group-hover:scale-105"
        />

        <WishlistHeartButton
          slug={combo.slug}
          type="combo"
          className="absolute right-2 top-2 h-8 w-8"
        />
      </div>

      {/* Details */}
      <div className="min-w-0 flex-1">
        {combo.badge && (
          <span
            className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${badgeStyle(
              combo.badge
            )}`}
          >
            {combo.badge}
          </span>
        )}

        <h3 className="mt-2 text-xl font-bold text-[#0B3C8C] transition group-hover:underline sm:text-2xl">
          {combo.name}
        </h3>

        <p className="mt-1 text-sm font-semibold text-[#C9A227]">
          {combo.tagline}
        </p>

        <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-600 sm:text-base">
          {combo.shortDescription}
        </p>

        {combo.products?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
            {combo.products.slice(0, 3).map((item, i) => {
              const Icon = TAG_ICONS[i % TAG_ICONS.length];
              const label = item.slug
                .replace(/-/g, " ")
                .replace(/\b\w/g, (c) => c.toUpperCase());

              return (
                <span
                  key={item.slug}
                  className="flex items-center gap-1.5 text-xs text-gray-500 sm:text-sm"
                >
                  <Icon size={15} className="text-green-600" />
                  {label} ({item.quantity})
                </span>
              );
            })}

            {combo.products.length > 3 && (
              <span className="text-xs font-semibold text-[#0B3C8C] sm:text-sm">
                + {combo.products.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>

      {/* Price + Actions */}
      <div className="flex w-full shrink-0 flex-col sm:w-52">
        <p className="text-2xl font-bold text-green-700">
          ₹{combo.price}
        </p>

        <p className="text-xs text-gray-500">
          {combo.products.length + combo.freeProducts.length} items included
        </p>

        {combo.featured && (
          <span className="mt-3 inline-block w-fit rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-[#0B3C8C]">
            Featured
          </span>
        )}

        <span className="mt-3 flex items-center justify-center gap-1 rounded-full border border-[#0B3C8C] py-2.5 text-sm font-semibold text-[#0B3C8C] transition group-hover:bg-blue-50">
          View Combo
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
