"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useEffect, useState } from "react";

import type { ComboProduct } from "@/data/comboProducts";
import { getComboBySlug } from "@/lib/firestoreProducts";
import AddToCartButton from "@/components/AddToCartButton";
import WishlistHeartButton from "@/components/WishlistHeartButton";

export default function ComboDetailsPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [combo, setCombo] = useState<ComboProduct | null | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    getComboBySlug(slug).then(setCombo);
  }, [slug]);

  if (combo === undefined) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FDFBF7]">
        <p className="text-lg text-gray-500">Loading…</p>
      </main>
    );
  }

  if (!combo) {
    notFound();
  }

  function increaseQuantity() {
    setQuantity((prev) => prev + 1);
  }

  function decreaseQuantity() {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  }

  const whatsappMessage = encodeURIComponent(
`Hi Aarvya Naturals,

I'm interested in the following Combo Offer:

${combo.name}

Quantity : ${quantity}

Please share the payment details.

Thank you!`
  );

  return (
    <main className="min-h-screen bg-[#FDFBF7] py-16">

      <div className="mx-auto max-w-7xl px-6">

        <Link
          href="/combo-offers"
          className="mb-10 inline-flex items-center font-semibold text-[#0B3C8C] hover:text-[#C9A227]"
        >
          ← Back to Combo Offers
        </Link>

        <div className="grid gap-14 lg:grid-cols-2 lg:items-start">

          {/* Image */}

         <div className="relative overflow-hidden rounded-3xl shadow-xl">

  <div className="overflow-hidden rounded-3xl">

  <Image
    src={combo.image}
    alt={combo.name}
    width={1536}
    height={1024}
    className="block w-full rounded-3xl object-cover"
    style={{
      clipPath: "inset(0 0 0px 0)"
    }}
    priority
  />

</div>

  <span className="absolute left-6 top-6 rounded-full bg-[#C9A227] px-5 py-2 text-sm font-semibold text-black shadow">
    {combo.badge}
  </span>

  <WishlistHeartButton
    slug={combo.slug}
    type="combo"
    className="absolute right-6 top-6"
  />

</div>

          {/* Details */}

          <div>

            <h1 className="text-5xl font-extrabold text-[#0B3C8C]">

              {combo.name}

            </h1>

            <p className="mt-4 text-lg font-semibold text-[#C9A227]">

              {combo.tagline}

            </p>

            <p className="mt-8 text-lg leading-8 text-gray-600">

              {combo.description}

            </p>

            <div className="mt-10 flex items-center justify-between rounded-3xl border border-green-200 bg-green-50 p-6">

              <div>

                <p className="text-sm text-gray-600">
                  Combo Price
                </p>

                <h2 className="mt-2 text-4xl font-bold text-green-700">

                  ₹{combo.price}

                </h2>

              </div>

              {combo.featured && (

                <span className="rounded-full bg-[#0B3C8C] px-5 py-2 font-semibold text-white">

                  Featured

                </span>

              )}

            </div>

            {/* Quantity */}

            <div className="mt-10">

              <h3 className="text-2xl font-bold text-[#0B3C8C]">

                Quantity

              </h3>

              <div className="mt-5 inline-flex overflow-hidden rounded-2xl border-2 border-gray-300 bg-white shadow-sm">

                <button
                  onClick={decreaseQuantity}
                  className="flex h-16 w-16 items-center justify-center text-3xl font-bold hover:bg-gray-100"
                >
                  −
                </button>

                <div className="flex h-16 w-24 items-center justify-center border-x-2 border-gray-300 text-2xl font-bold">

                  {quantity}

                </div>

                <button
                  onClick={increaseQuantity}
                  className="flex h-16 w-16 items-center justify-center text-3xl font-bold hover:bg-gray-100"
                >
                  +
                </button>

              </div>

            </div>

            {/* Buttons */}

            <div className="mt-10 space-y-4">

              <AddToCartButton
                id={combo.id}
                slug={combo.slug}
                name={combo.name}
                image={combo.image}
                variant="Combo Pack"
                price={combo.price}
                type="combo"
                quantity={quantity}
              />

              <a
                href={`https://wa.me/916374626691?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full rounded-full bg-green-600 py-4 text-center text-lg font-semibold text-white transition hover:bg-green-700"
              >
                Buy via WhatsApp
              </a>

            </div>

          </div>

        </div>

                        {/* Combo Contents */}

        <section className="mt-20">

          <h2 className="text-4xl font-bold text-[#0B3C8C]">
            What&apos;s Included
          </h2>

          <p className="mt-4 text-lg text-gray-600">
            Every combo is carefully curated with premium-quality products
            to provide the perfect balance of taste, nutrition and value.
          </p>

          <div className="mt-10 overflow-hidden rounded-3xl bg-white shadow-lg">

            <table className="w-full">

              <thead className="bg-[#0B3C8C] text-white">

                <tr>
                  <th className="px-6 py-4 text-left">
                    Product
                  </th>

                  <th className="px-6 py-4 text-center">
                    Quantity
                  </th>
                </tr>

              </thead>

              <tbody>

                {combo.products.map((item, index) => (

                  <tr
                    key={item.slug}
                    className={
                      index % 2 === 0
                        ? "bg-white"
                        : "bg-gray-50"
                    }
                  >

                    <td className="border-b px-6 py-5 font-medium text-gray-800">

                      {item.slug
                        .replace(/-/g, " ")
                        .replace(/\b\w/g, (c) => c.toUpperCase())}

                    </td>

                    <td className="border-b px-6 py-5 text-center font-semibold text-[#0B3C8C]">

                      {item.quantity}

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

          {combo.freeProducts.length > 0 && (

            <div className="mt-10 rounded-3xl border border-green-300 bg-green-50 p-8">

              <div className="flex items-center gap-3">

                <span className="text-3xl">
                  🎁
                </span>

                <h3 className="text-2xl font-bold text-green-700">
                  FREE Product Included
                </h3>

              </div>

              <p className="mt-2 text-gray-600">
                This combo also includes the following complimentary product.
              </p>

              <div className="mt-6 overflow-hidden rounded-2xl bg-white shadow">

                <table className="w-full">

                  <thead className="bg-green-700 text-white">

                    <tr>

                      <th className="px-6 py-4 text-left">
                        Product
                      </th>

                      <th className="px-6 py-4 text-center">
                        Quantity
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {combo.freeProducts.map((item) => (

                      <tr key={item.slug}>

                        <td className="border-b px-6 py-5 font-semibold text-green-700">

                          🎁{" "}

                          {item.slug
                            .replace(/-/g, " ")
                            .replace(/\b\w/g, (c) => c.toUpperCase())}

                        </td>

                        <td className="border-b px-6 py-5 text-center font-bold text-green-700">

                          {item.quantity}

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            </div>

          )}

        </section>

        {/* Why Choose This Combo */}

        <section className="mt-20">

          <div className="rounded-3xl bg-white p-10 shadow-lg">

            <h2 className="text-4xl font-bold text-[#0B3C8C]">

              Why Choose This Combo?

            </h2>

            <div className="mt-8 grid gap-6 md:grid-cols-2">

              <div className="rounded-2xl bg-[#F8FAFC] p-6">

                <h3 className="font-bold text-[#0B3C8C]">
                  Premium Quality
                </h3>

                <p className="mt-3 text-gray-600">
                  Carefully selected products sourced from trusted suppliers
                  and packed with freshness.
                </p>

              </div>

              <div className="rounded-2xl bg-[#F8FAFC] p-6">

                <h3 className="font-bold text-[#0B3C8C]">
                  Value for Money
                </h3>

                <p className="mt-3 text-gray-600">
                  Combo packs offer better value compared to purchasing
                  individual products separately.
                </p>

              </div>

              <div className="rounded-2xl bg-[#F8FAFC] p-6">

                <h3 className="font-bold text-[#0B3C8C]">
                  Hygienically Packed
                </h3>

                <p className="mt-3 text-gray-600">
                  Packed with care to maintain freshness and product quality.
                </p>

              </div>

              <div className="rounded-2xl bg-[#F8FAFC] p-6">

                <h3 className="font-bold text-[#0B3C8C]">
                  Perfect for Gifting
                </h3>

                <p className="mt-3 text-gray-600">
                  A thoughtful and healthy gift option for family, friends
                  and colleagues.
                </p>

              </div>

            </div>

          </div>

        </section>

      </div>

    </main>
  );
}
