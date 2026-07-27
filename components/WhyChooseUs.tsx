"use client";

import Link from "next/link";
import {
  Leaf,
  Package,
  ShieldCheck,
  Truck,
  Heart,
  MessageCircle,
} from "@/components/Icons";

const features = [
  {
    icon: Leaf,
    title: "Premium Quality",
    description:
      "Every product is carefully sourced to ensure freshness, rich taste and superior quality.",
  },
  {
    icon: Package,
    title: "Freshly Packed",
    description:
      "Packed only after your order is received to maintain maximum freshness and hygiene.",
  },
  {
    icon: Heart,
    title: "Healthy Lifestyle",
    description:
      "Premium dry fruits, seeds and wellness products for your everyday nutrition.",
  },
  {
    icon: ShieldCheck,
    title: "FSSAI Licensed",
    description:
      "Licensed food business following quality and food safety standards.",
  },
  {
    icon: Truck,
    title: "Pan India Delivery",
    description:
      "Reliable delivery service across India with secure packaging.",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Support",
    description:
      "Quick assistance for orders, enquiries and personalised product recommendations.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-24">
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}

        <div className="text-center">

          <span className="inline-block rounded-full bg-blue-100 px-5 py-2 font-semibold text-[#0B3C8C]">
            The Aarvya Promise
          </span>

          <h2 className="mt-6 text-5xl font-bold text-[#0B3C8C]">
            Why Choose Aarvya Naturals?
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-xl leading-8 text-gray-600">
            Premium quality products, hygienically packed and delivered with care
            to support your healthy lifestyle.
          </p>

        </div>

        {/* Feature Cards */}

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="flex h-full flex-col rounded-3xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-[#C9A227] hover:shadow-2xl"
              >

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100">

                  <Icon
                    size={32}
                    className="text-[#0B3C8C]"
                  />

                </div>

                <h3 className="mt-6 text-2xl font-bold text-[#0B3C8C]">
                  {feature.title}
                </h3>

                <p className="mt-4 flex-grow leading-7 text-gray-600">
                  {feature.description}
                </p>

              </div>
            );
          })}

        </div>

        {/* CTA */}

        <div className="mt-24 rounded-3xl bg-[#0B3C8C] px-10 py-16 text-center text-white">

          <h2 className="text-4xl font-bold">
            Ready to Start Your Healthy Journey?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-blue-100">
            Discover premium dry fruits, healthy snacks and wellness products
            sourced with care and packed fresh for every order.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-5">

            <Link
              href="/products"
              className="rounded-full bg-[#C9A227] px-8 py-4 font-semibold text-black transition hover:scale-105"
            >
              Shop Products
            </Link>

            <a
              href="https://wa.me/916374626691"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border-2 border-white px-8 py-4 font-semibold text-white transition hover:bg-white hover:text-[#0B3C8C]"
            >
              WhatsApp Us
            </a>

          </div>

        </div>

      </div>
    </section>
  );
}