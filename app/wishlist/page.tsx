"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import {
  getAllProductsFromFirestore,
  getAllCombosFromFirestore,
} from "@/lib/firestoreProducts";
import type { Product } from "@/types/product";
import type { ComboProduct } from "@/data/comboProducts";
import WishlistHeartButton from "@/components/WishlistHeartButton";

export default function WishlistPage() {
  const { user, loading: authLoading } = useAuth();
  const { wishlist, loading: wishlistLoading } = useWishlist();
  const { addToCart } = useCart();
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [combos, setCombos] = useState<ComboProduct[]>([]);
  const [catalogLoading, setCatalogLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/login");
    }
  }, [authLoading, user, router]);

  useEffect(() => {
    Promise.all([getAllProductsFromFirestore(), getAllCombosFromFirestore()])
      .then(([p, c]) => {
        setProducts(p);
        setCombos(c);
      })
      .finally(() => setCatalogLoading(false));
  }, []);

  if (authLoading || wishlistLoading || catalogLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-semibold text-[#0B3C8C]">
          Loading...
        </h1>
      </main>
    );
  }

  if (!user) return null;

  const wishlistedSlugs = (type: "product" | "combo") =>
    wishlist.filter((item) => item.type === type).map((item) => item.slug);

  const wishlistedProducts = products.filter((p) =>
    wishlistedSlugs("product").includes(p.slug)
  );

  const wishlistedCombos = combos.filter((c) =>
    wishlistedSlugs("combo").includes(c.slug)
  );

  const isEmpty =
    wishlistedProducts.length === 0 && wishlistedCombos.length === 0;

  return (
    <main className="min-h-screen bg-[#F8F6F1] py-12 px-6">

      <div className="mx-auto max-w-6xl">

        <h1 className="text-4xl font-bold text-[#0B3C8C]">
          ❤️ My Wishlist
        </h1>

        <p className="mt-2 text-gray-600">
          Save your favourite products and combos, and buy them whenever
          you&apos;re ready.
        </p>

        {isEmpty ? (
          <div className="mt-10 rounded-3xl bg-white p-16 shadow-xl text-center">

            <div className="text-7xl">
              ❤️
            </div>

            <h2 className="mt-6 text-3xl font-bold text-gray-800">
              Your Wishlist is Empty
            </h2>

            <p className="mt-4 text-gray-500 max-w-xl mx-auto">
              You haven&apos;t added anything to your wishlist yet. Browse
              our products and combo offers, and tap the heart icon to save
              your favourites here.
            </p>

            <div className="mt-10 flex justify-center gap-4">
              <Link
                href="/products"
                className="inline-block rounded-xl bg-[#0B3C8C] px-8 py-4 font-semibold text-white transition hover:bg-[#082F6D]"
              >
                Browse Products
              </Link>

              <Link
                href="/combo-offers"
                className="inline-block rounded-xl border border-[#0B3C8C] px-8 py-4 font-semibold text-[#0B3C8C] transition hover:bg-blue-50"
              >
                Browse Combos
              </Link>
            </div>

          </div>
        ) : (
          <>
            {wishlistedProducts.length > 0 && (
              <section className="mt-10">

                <h2 className="text-2xl font-bold text-[#0B3C8C]">
                  Products
                </h2>

                <div className="mt-6 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

                  {wishlistedProducts.map((product) => (

                    <div
                      key={product.slug}
                      className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-md"
                    >

                      <div className="relative h-64 bg-gray-50">

                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="(max-width:768px)100vw,33vw"
                          className="object-cover"
                        />

                        <WishlistHeartButton
                          slug={product.slug}
                          type="product"
                        />

                      </div>

                      <div className="p-6">

                        <h3 className="text-xl font-bold text-[#0B3C8C]">
                          {product.name}
                        </h3>

                        <p className="mt-2 text-2xl font-bold text-green-700">
                          ₹{product.variants[0].price}
                        </p>

                        <p className="text-sm text-gray-500">
                          Starting at {product.variants[0].weight}
                        </p>

                        <div className="mt-5 flex gap-3">

                          <button
                            onClick={() =>
                              addToCart({
                                id: product.id,
                                slug: product.slug,
                                name: product.name,
                                image: product.image,
                                variant: product.variants[0].weight,
                                price: product.variants[0].price,
                                type: "product",
                                quantity: 1,
                              })
                            }
                            className="flex-1 rounded-full bg-[#0B3C8C] py-3 text-sm font-semibold text-white transition hover:bg-[#082F6D]"
                          >
                            Add to Cart
                          </button>

                          <Link
                            href={`/products/${product.slug}`}
                            className="flex-1 rounded-full border border-gray-300 py-3 text-center text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                          >
                            View
                          </Link>

                        </div>

                      </div>

                    </div>

                  ))}

                </div>

              </section>
            )}

            {wishlistedCombos.length > 0 && (
              <section className="mt-14">

                <h2 className="text-2xl font-bold text-[#0B3C8C]">
                  Combo Offers
                </h2>

                <div className="mt-6 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

                  {wishlistedCombos.map((combo) => (

                    <div
                      key={combo.slug}
                      className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-md"
                    >

                      <div className="relative h-64 bg-gray-50 p-4">

                        <Image
                          src={combo.image}
                          alt={combo.name}
                          fill
                          sizes="(max-width:768px)100vw,33vw"
                          className="object-contain"
                        />

                        <WishlistHeartButton
                          slug={combo.slug}
                          type="combo"
                        />

                      </div>

                      <div className="p-6">

                        <h3 className="text-xl font-bold text-[#0B3C8C]">
                          {combo.name}
                        </h3>

                        <p className="mt-2 text-2xl font-bold text-green-700">
                          ₹{combo.price}
                        </p>

                        <div className="mt-5 flex gap-3">

                          <button
                            onClick={() =>
                              addToCart({
                                id: combo.id,
                                slug: combo.slug,
                                name: combo.name,
                                image: combo.image,
                                variant: "Combo Pack",
                                price: combo.price,
                                type: "combo",
                                quantity: 1,
                              })
                            }
                            className="flex-1 rounded-full bg-[#0B3C8C] py-3 text-sm font-semibold text-white transition hover:bg-[#082F6D]"
                          >
                            Add to Cart
                          </button>

                          <Link
                            href={`/combo-offers/${combo.slug}`}
                            className="flex-1 rounded-full border border-gray-300 py-3 text-center text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                          >
                            View
                          </Link>

                        </div>

                      </div>

                    </div>

                  ))}

                </div>

              </section>
            )}
          </>
        )}

      </div>

    </main>
  );
}
