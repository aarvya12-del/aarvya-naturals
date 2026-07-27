"use client";

import Image from "next/image";
import Link from "next/link";

const collections = [
  {
    title: "Premium Dry Fruits",
    description: "Almonds, Cashews, Pistachios, Walnuts, Figs and Raisins.",
    image: "/images/collections/dry-fruits.jpg",
    href: "/products?category=dry-fruits",
  },
  {
    title: "Premium Dates",
    description: "Medjool, Kimia, Safawi, Crown and more premium varieties.",
    image: "/images/collections/dates.jpg",
    href: "/products?category=dates",
  },
  {
    title: "Seeds & Superfoods",
    description: "Pumpkin, Sunflower, Flax, Chia and other healthy seeds.",
    image: "/images/collections/seeds.jpg",
    href: "/products?category=seeds",
  },
  {
    title: "Healthy Mixes",
    description: "Breakfast Mix, Berry Mix and Roasted Seed Mix.",
    image: "/images/collections/mixes.jpg",
    href: "/products?category=healthy-mixes",
  },
  {
    title: "Honey Collection",
    description: "Honey Amla, Honey Fig and Nuts in Honey.",
    image: "/images/collections/honey.jpg",
    href: "/products?category=honey",
  },
  {
    title: "Healthy Snacks",
    description: "Fruit Chips and Vegetable Chips.",
    image: "/images/collections/snacks.jpg",
    href: "/products?category=snacks",
  },
];

export default function FeaturedCollections() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}

        <div className="text-center">

          <span className="inline-block rounded-full bg-blue-100 px-5 py-2 font-semibold text-[#0B3C8C]">
            Premium Collections
          </span>

          <h2 className="mt-6 text-5xl font-bold text-[#0B3C8C]">
            Explore Our Categories
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-xl leading-8 text-gray-600">
            Carefully curated collections to help you find exactly what you're looking for.
          </p>

        </div>

        {/* Cards */}

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {collections.map((collection) => (

            <Link
              key={collection.title}
              href={collection.href}
              className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-[#C9A227] hover:shadow-2xl"
            >

              <div className="relative h-64 overflow-hidden">

                <Image
                  src={collection.image}
                  alt={collection.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

              </div>

              <div className="p-8">

                <h3 className="text-2xl font-bold text-[#0B3C8C]">
                  {collection.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  {collection.description}
                </p>

                <span className="mt-6 inline-flex items-center font-semibold text-[#C9A227]">
                  Explore Collection →
                </span>

              </div>

            </Link>

          ))}

        </div>

      </div>
    </section>
  );
}