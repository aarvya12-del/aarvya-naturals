import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    image: "/images/categories/dry-fruits.png",
    title: "Premium Dry Fruits",
    description: "Almonds, Cashews, Pistachios, Walnuts & Raisins",
    link: "/products",
  },
  {
    image: "/images/categories/healthy-seeds.png",
    title: "Healthy Seeds",
    description: "Pumpkin, Sunflower, Flax, Chia & More",
    link: "/products",
  },
  {
    image: "/images/categories/honey-collection.png",
    title: "Honey Collection",
    description: "Honey Amla, Honey Fig & Nuts in Honey",
    link: "/products",
  },
  {
    image: "/images/categories/red-wine.png",
    title: "Non Alcoholic Red Wine",
    description: "Premium Imported Non Alcoholic Red Wine",
    link: "/products",
  },
  {
    image: "/images/categories/combo-offers.png",
    title: "Combo Offers",
    description: "Healthy wellness combos for every lifestyle",
    link: "/combo-offers",
  },
  {
    image: "/images/categories/healthy-snacks.png",
    title: "Healthy Snacks",
    description: "Fruit Chips, Vegetable Chips & More",
    link: "/products",
  },
];

export default function Categories() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-[1500px] px-6">

        {/* Heading */}

        <div className="text-center">

          <span className="inline-block rounded-full bg-green-100 px-5 py-2 font-semibold text-green-700">
            Shop by Category
          </span>

          <h2 className="mt-6 text-5xl font-bold text-blue-900">
            Explore Aarvya Naturals
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-gray-600">
            From premium dry fruits to wholesome seeds and natural wellness
            products, discover carefully selected collections for a healthier
            lifestyle.
          </p>

        </div>

        {/* Category Cards */}

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

          {categories.map((category) => (

            <Link
              key={category.title}
              href={category.link}
              className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-green-500 hover:shadow-2xl"
            >

              {/* Image */}

              <div className="relative flex h-64 items-center justify-center bg-white p-2">

                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  sizes="(max-width:768px)100vw,(max-width:1200px)50vw,33vw"
                  className="object-contain p-1 transition-transform duration-500 group-hover:scale-105"
                />

              </div>

              {/* Details */}

              <div className="flex flex-col p-8">

                <h3 className="text-2xl font-bold text-blue-900">
                  {category.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  {category.description}
                </p>

                <div className="mt-8 flex items-center justify-between">

                  <span className="font-semibold text-green-700 transition-colors duration-300 group-hover:text-green-800">
                    Explore Collection
                  </span>

                  <span className="text-2xl transition-transform duration-300 group-hover:translate-x-2">
                    →
                  </span>

                </div>

              </div>

            </Link>

          ))}

        </div>

      </div>
    </section>
  );
}