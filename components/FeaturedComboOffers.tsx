import Image from "next/image";
import Link from "next/link";
import { getAllCombosFromFirestore } from "@/lib/firestoreProducts";
import WishlistHeartButton from "@/components/WishlistHeartButton";

export default async function FeaturedComboOffers() {
  const comboProducts = await getAllCombosFromFirestore();
  const featured = comboProducts.slice(0, 4);

  return (
    <section className="py-24 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center">

          <span className="inline-block rounded-full bg-green-100 px-5 py-2 font-semibold text-green-700">
            Best Selling Combos
          </span>

          <h2 className="mt-6 text-5xl font-bold text-blue-900">
            Combo Offers
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-xl text-gray-600">
            Carefully curated healthy combinations for every lifestyle.
          </p>

        </div>

        {/* Cards */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">

          {featured.map((combo) => (

            <div
              key={combo.slug}
              className="flex flex-col overflow-hidden rounded-3xl bg-white shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >

              {/* Full Poster */}
              <div className="relative bg-white p-4">

                <Image
                  src={combo.image}
                  alt={combo.name}
                  width={1080}
                  height={1350}
                  className="w-full h-auto rounded-2xl"
                />

                <WishlistHeartButton
                  slug={combo.slug}
                  type="combo"
                  className="absolute right-8 top-8"
                />

              </div>

              {/* Details */}
              <div className="flex flex-1 flex-col px-6 pb-6">

                <span className="mb-3 w-fit rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-900">
                  {combo.badge}
                </span>

                <h3 className="min-h-[70px] text-2xl font-bold text-blue-900">
                  {combo.name}
                </h3>

                <p className="mt-3 min-h-[90px] leading-7 text-gray-600">
                  {combo.description}
                </p>

                <Link
                  href={`/combo-offers/${combo.slug}`}
                  className="mt-auto block w-full rounded-full bg-green-600 py-3 text-center font-semibold text-white transition hover:bg-green-700"
                >
                  View Details
                </Link>

              </div>

            </div>

          ))}

        </div>

        {/* Bottom Button */}
        <div className="mt-16 text-center">

          <Link
            href="/combo-offers"
            className="inline-flex items-center rounded-full border-2 border-blue-900 px-8 py-4 font-semibold text-blue-900 transition hover:bg-blue-900 hover:text-white"
          >
            View All Combo Offers
          </Link>

        </div>

      </div>
    </section>
  );
}
