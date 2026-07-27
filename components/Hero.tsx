import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] overflow-hidden">

      {/* Background */}

      <Image
        src="/images/hero/hero-banner.png"
        alt="Aarvya Naturals"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center scale-105"
      />

      {/* Dark Overlay */}

      <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/40 to-transparent" />

      {/* Hero Content */}

      <div className="relative z-10 flex min-h-[92vh] items-center">

        <div className="mx-auto max-w-7xl w-full px-6 lg:px-12">

          <div className="max-w-3xl">

            {/* Badge */}

            <span className="inline-flex items-center rounded-full border border-white/30 bg-white/15 px-5 py-2 text-sm font-semibold text-white backdrop-blur-md">

              🌿 Freshly Packed • Premium Quality • Healthy Living

            </span>

            {/* Heading */}

            <h1 className="mt-8 text-5xl font-black leading-tight text-white md:text-6xl lg:text-7xl">

              Premium Dry Fruits

              <br />

              <span className="text-yellow-400">
                For A Healthier Lifestyle
              </span>

            </h1>

            {/* Description */}

            <p className="mt-8 max-w-2xl text-xl leading-9 text-gray-200">

              Premium dry fruits, healthy seeds, nutritious snack collections,
              wellness combos and non-alcoholic beverages packed hygienically
              and delivered across India.

            </p>

            {/* Buttons */}

            <div className="mt-10 flex flex-wrap gap-5">

              <Link
                href="/products"
                className="rounded-full bg-yellow-500 px-8 py-4 font-semibold text-black shadow-xl transition hover:scale-105 hover:bg-yellow-400"
              >
                Shop Products
              </Link>

              <Link
                href="/combo-offers"
                className="rounded-full border-2 border-white px-8 py-4 font-semibold text-white transition hover:bg-white hover:text-black"
              >
                Explore Combos
              </Link>

            </div>

            {/* Trust Boxes */}

            <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4">

              <div className="rounded-2xl bg-white/15 p-4 text-center backdrop-blur-md">

                <div className="text-2xl">🌿</div>

                <p className="mt-2 text-sm font-semibold text-white">
                  100% Natural
                </p>

              </div>

              <div className="rounded-2xl bg-white/15 p-4 text-center backdrop-blur-md">

                <div className="text-2xl">🛡</div>

                <p className="mt-2 text-sm font-semibold text-white">
                  Hygienically Packed
                </p>

              </div>

              <div className="rounded-2xl bg-white/15 p-4 text-center backdrop-blur-md">

                <div className="text-2xl">🚚</div>

                <p className="mt-2 text-sm font-semibold text-white">
                  Pan India Delivery
                </p>

              </div>

              <div className="rounded-2xl bg-white/15 p-4 text-center backdrop-blur-md">

                <div className="text-2xl">🏅</div>

                <p className="mt-2 text-sm font-semibold text-white">
                  FSSAI Certified
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}