import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";
import ProductPurchase from "@/components/ProductPurchase";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = products
    .filter(
      (p) =>
        p.category === product.category &&
        p.id !== product.id
    )
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-gray-50 py-14">

      <div className="mx-auto max-w-[1500px] px-6">

        {/* Breadcrumb */}

        <div className="mb-10 flex flex-wrap items-center gap-2 text-sm text-gray-500">

          <Link
            href="/"
            className="transition hover:text-green-700"
          >
            Home
          </Link>

          <span>/</span>

          <Link
            href="/products"
            className="transition hover:text-green-700"
          >
            Products
          </Link>

          <span>/</span>

          <Link
            href={`/products?category=${encodeURIComponent(product.category)}`}
            className="transition hover:text-green-700"
          >
            {product.category}
          </Link>

          <span>/</span>

          <span className="font-semibold text-gray-800">
            {product.name}
          </span>

        </div>

        {/* Product Section */}

        <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr]">

          {/* Product Image */}

          <div>

            <div className="rounded-[32px] bg-white p-8 shadow-lg">

              <div className="relative h-[620px]">

                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width:768px)100vw,50vw"
                  className="object-contain"
                />

              </div>

            </div>

          </div>

          {/* Product Details */}

          <div className="lg:sticky lg:top-24 h-fit">

            {product.badge && (

              <span className="inline-flex rounded-full bg-yellow-400 px-5 py-2 text-sm font-semibold shadow-sm">

                {product.badge}

              </span>

            )}

            <h1 className="mt-6 text-4xl font-bold text-blue-900 md:text-5xl">

              {product.name}

            </h1>

            <p className="mt-6 text-lg leading-8 text-gray-600">

              {product.description}

            </p>

            <ProductPurchase product={product} />

            {/* Trust Badges */}

            <div className="mt-8 grid grid-cols-2 gap-4">

              <div className="rounded-2xl border border-gray-200 bg-white p-5 text-center shadow-sm">

                <div className="text-3xl">🚚</div>

                <p className="mt-2 font-semibold text-gray-800">
                  Fast Delivery
                </p>

              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-5 text-center shadow-sm">

                <div className="text-3xl">🥜</div>

                <p className="mt-2 font-semibold text-gray-800">
                  Freshly Packed
                </p>

              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-5 text-center shadow-sm">

                <div className="text-3xl">🛡️</div>

                <p className="mt-2 font-semibold text-gray-800">
                  FSSAI Certified
                </p>

              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-5 text-center shadow-sm">

                <div className="text-3xl">⭐</div>

                <p className="mt-2 font-semibold text-gray-800">
                  Premium Quality
                </p>

              </div>

            </div>

          </div>

        </div>

                {/* Health Benefits */}

        <section className="mt-20">

          <h2 className="text-3xl font-bold text-blue-900">
            Health Benefits
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-2">

            {[
              {
                title: "Naturally Nutritious",
                desc: "Packed with essential nutrients for a healthy lifestyle.",
              },
              {
                title: "Rich in Vitamins & Minerals",
                desc: "Supports your daily nutritional requirements.",
              },
              {
                title: "Healthy Everyday Snacking",
                desc: "A delicious alternative to processed snacks.",
              },
              {
                title: "Freshly Packed",
                desc: "Packed with care to preserve freshness and taste.",
              },
            ].map((benefit) => (

              <div
                key={benefit.title}
                className="rounded-3xl bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
              >

                <div className="mb-4 text-3xl">
                  ✅
                </div>

                <h3 className="text-xl font-bold text-blue-900">
                  {benefit.title}
                </h3>

                <p className="mt-3 leading-7 text-gray-600">
                  {benefit.desc}
                </p>

              </div>

            ))}

          </div>

        </section>

        {/* Storage */}

        <section className="mt-16 rounded-3xl bg-white p-8 shadow-md">

          <div className="flex items-center gap-3">

            <span className="text-3xl">
              📦
            </span>

            <h2 className="text-3xl font-bold text-blue-900">
              Storage Instructions
            </h2>

          </div>

          <p className="mt-6 leading-8 text-gray-700">

            Store in a cool, dry place away from direct sunlight.
            Reseal the pouch immediately after every use to maintain
            freshness, aroma and crispness.

          </p>

        </section>

        {/* FSSAI */}

        <section className="mt-10 rounded-3xl border border-green-200 bg-green-50 p-8">

          <div className="flex items-center gap-3">

            <span className="text-3xl">
              🛡️
            </span>

            <h2 className="text-3xl font-bold text-green-800">
              Aarvya Naturals
            </h2>

          </div>

          <p className="mt-5 text-lg text-green-700">

            FSSAI Licence No:
            <strong> 22426552000244</strong>

          </p>

          <p className="mt-3 text-green-700">

            Hygienically Packed • Premium Quality • Carefully Selected Ingredients

          </p>

        </section>

        {/* Related Products */}

        <section className="mt-24">

          <div className="mb-10 flex items-center justify-between">

            <h2 className="text-4xl font-bold text-blue-900">
              Related Products
            </h2>

            <Link
              href="/products"
              className="font-semibold text-green-700 hover:underline"
            >
              View All →
            </Link>

          </div>

          <div className="grid gap-8 md:grid-cols-3">

            {relatedProducts.map((item) => (

              <Link
                key={item.id}
                href={`/products/${item.slug}`}
                className="group overflow-hidden rounded-3xl bg-white shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl"
              >

                <div className="relative h-64 overflow-hidden bg-white p-6">

                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="33vw"
                    className="object-contain transition duration-500 group-hover:scale-105"
                  />

                </div>

                <div className="p-6">

                  <h3 className="text-xl font-bold text-blue-900">

                    {item.name}

                  </h3>

                  <p className="mt-5 inline-flex items-center rounded-full bg-green-700 px-5 py-2 text-sm font-semibold text-white transition group-hover:bg-green-800">

                    View Details →

                  </p>

                </div>

              </Link>

            ))}

          </div>

        </section>

      </div>

    </main>

  );

}