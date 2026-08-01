"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { ComboProduct } from "@/data/comboProducts";
import { getAllCombosFromFirestore } from "@/lib/firestoreProducts";
import WishlistHeartButton from "@/components/WishlistHeartButton";

export default function ComboOffersPage() {
  const [comboProducts, setComboProducts] = useState<ComboProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllCombosFromFirestore()
      .then(setComboProducts)
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Hero */}

      <section className="bg-gradient-to-r from-[#0B3C8C] via-[#1249A3] to-[#0B3C8C] py-24 text-white">

        <div className="mx-auto max-w-7xl px-6 text-center">

          <span className="inline-block rounded-full bg-white/20 px-5 py-2 font-semibold tracking-wide">
            Exclusive Savings
          </span>

          <h1 className="mt-6 text-5xl font-extrabold lg:text-6xl">
            Premium Combo Offers
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-xl leading-8 text-blue-100">
            Carefully curated bundles that combine our best-selling products,
            giving you better value while supporting a healthier lifestyle.
          </p>

        </div>

      </section>

      {/* Intro */}

      <section className="mx-auto mt-14 max-w-7xl px-6">

        <div className="rounded-3xl border border-gray-200 bg-white p-10 shadow-lg">

          <h2 className="text-3xl font-bold text-[#0B3C8C]">
            Curated Wellness Collections
          </h2>

          <p className="mt-5 text-lg leading-8 text-gray-600">
            Whether you&apos;re looking for everyday nutrition, healthy gifting,
            family wellness or premium snacking, our carefully designed combos
            offer the perfect balance of quality, nutrition and value.
          </p>

        </div>

      </section>

      {/* Combo Cards */}

      <section className="mx-auto max-w-7xl px-6 py-20">

        {loading ? (
          <p className="text-center text-lg text-gray-500">Loading combos…</p>
        ) : (
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">

          {comboProducts.map((combo) => (

            <div
              key={combo.slug}
              className="flex h-full flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-[#C9A227] hover:shadow-2xl"
            >

              {/* Image */}

              <div className="relative h-72 bg-gray-50">

                <Image
                  src={combo.image}
                  alt={combo.name}
                  fill
                  className="object-contain p-8 transition duration-500 hover:scale-105"
                />

                <span className="absolute left-5 top-5 rounded-full bg-[#C9A227] px-4 py-2 text-sm font-semibold text-black shadow">

                  {combo.badge}

                </span>

                <WishlistHeartButton slug={combo.slug} type="combo" />

              </div>

              {/* Details */}

              <div className="flex flex-1 flex-col p-7">

                <h2 className="min-h-[64px] text-2xl font-bold text-[#0B3C8C]">

                  {combo.name}

                </h2>

                <p className="mt-2 min-h-[48px] text-sm font-semibold text-[#C9A227]">

                  {combo.tagline}

                </p>

                <p className="mt-5 flex-1 leading-7 text-gray-600">

                  {combo.shortDescription}

                </p>

                {/* Includes */}

                <div className="mt-6">

                  <p className="font-semibold text-gray-700">
                    Includes
                  </p>

                  <ul className="mt-3 space-y-2 text-gray-600">

                    {combo.products.slice(0, 4).map((item) => (

                      <li key={item.slug}>
                        •{" "}
                        {item.slug
                          .replace(/-/g, " ")
                          .replace(/\b\w/g, (c) => c.toUpperCase())}
                        {" "}
                        ({item.quantity})
                      </li>

                    ))}

                    {combo.products.length > 4 && (

                      <li className="font-semibold text-[#0B3C8C]">

                        + {combo.products.length - 4} more item(s)

                      </li>

                    )}

                  </ul>

                </div>

                {/* Price */}

                <div className="mt-auto pt-8 flex items-center justify-between">

                  <span className="text-3xl font-bold text-[#0B3C8C]">

                    ₹{combo.price}

                  </span>

                  {combo.featured && (

                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-[#0B3C8C]">

                      Featured

                    </span>

                  )}

                </div>

                {/* Button */}

                <Link
                  href={`/combo-offers/${combo.slug}`}
                  className="mt-8 block rounded-full bg-[#0B3C8C] py-4 text-center font-semibold text-white transition hover:bg-[#082d6c]"
                >

                  View Combo

                </Link>

              </div>

            </div>

          ))}

        </div>
        )}

      </section>

    </main>
  );
}
