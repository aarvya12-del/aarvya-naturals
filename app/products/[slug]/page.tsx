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
    <main className="bg-gray-50 min-h-screen py-16">

      <div className="max-w-7xl mx-auto px-6">

        {/* Breadcrumb */}

        <div className="mb-8 text-sm text-gray-500">

          <Link href="/" className="hover:text-green-700">
            Home
          </Link>

          {" / "}

          <Link href="/products" className="hover:text-green-700">
            Products
          </Link>

          {" / "}

          <Link
            href={`/products?category=${encodeURIComponent(product.category)}`}
            className="hover:text-green-700"
          >
            {product.category}
          </Link>

          {" / "}

          <span className="font-medium text-gray-800">
            {product.name}
          </span>

        </div>

        {/* Product */}

        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Image */}

          <div className="rounded-3xl bg-white p-10 shadow-lg">

            <div className="relative h-[550px]">

              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width:768px)100vw,50vw"
                className="object-contain"
              />

            </div>

          </div>

          {/* Details */}

          <div>

            {product.badge && (

              <span className="inline-block rounded-full bg-yellow-400 px-4 py-2 text-sm font-semibold">

                {product.badge}

              </span>

            )}

            <h1 className="mt-6 text-5xl font-bold text-blue-900">
              {product.name}
            </h1>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              {product.description}
            </p>

            <ProductPurchase product={product} />

            {/* Health Benefits */}

            <div className="mt-12">

              <h3 className="text-2xl font-bold text-blue-900">
                Health Benefits
              </h3>

              <ul className="mt-6 space-y-3 text-gray-700">

                <li>✔ Naturally nutritious</li>
                <li>✔ Rich in vitamins & minerals</li>
                <li>✔ Suitable for everyday healthy snacking</li>
                <li>✔ Freshly packed for quality</li>

              </ul>

            </div>

            {/* Storage */}

            <div className="mt-12">

              <h3 className="text-2xl font-bold text-blue-900">
                Storage Instructions
              </h3>

              <p className="mt-4 leading-7 text-gray-700">
                Store in a cool, dry place away from direct sunlight.
                Keep the pouch tightly sealed after opening to retain
                freshness.
              </p>

            </div>

            {/* FSSAI */}

            <div className="mt-10 rounded-2xl border border-green-200 bg-green-50 p-6">

              <h3 className="font-bold text-green-800">
                Aarvya Naturals
              </h3>

              <p className="mt-2 text-green-700">
                FSSAI Licence No: <strong>22426552000244</strong>
              </p>

            </div>

          </div>

        </div>

        {/* Related Products */}

        <section className="mt-24">

          <h2 className="mb-10 text-4xl font-bold text-blue-900">
            Related Products
          </h2>

          <div className="grid gap-8 md:grid-cols-3">

            {relatedProducts.map((item) => (

              <Link
                key={item.id}
                href={`/products/${item.slug}?category=${encodeURIComponent(product.category)}`}
                className="rounded-3xl bg-white p-6 shadow-lg transition hover:shadow-xl"
              >

                <div className="relative h-56">

                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="33vw"
                    className="object-contain"
                  />

                </div>

                <h3 className="mt-5 text-xl font-bold text-blue-900">
                  {item.name}
                </h3>

              </Link>

            ))}

          </div>

        </section>

      </div>

    </main>
  );
}