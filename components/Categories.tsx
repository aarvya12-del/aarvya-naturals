import Link from "next/link";

const categories = [
  {
    emoji: "🥜",
    title: "Premium Nuts",
    description: "Almonds, Cashews, Pistachios & Walnuts",
    link: "/products",
  },
  {
    emoji: "🌱",
    title: "Healthy Seeds",
    description: "Pumpkin, Sunflower, Flax & Chia Seeds",
    link: "/products",
  },
  {
    emoji: "🍯",
    title: "Honey Products",
    description: "Natural Honey & Honey Infused Delights",
    link: "/products",
  },
  {
    emoji: "🥭",
    title: "Healthy Snacks",
    description: "Dry Fruits, Fruit Snacks & Seed Mixes",
    link: "/products",
  },
];

export default function Categories() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">
          <h2 className="text-5xl font-bold text-blue-900">
            Explore Our Categories
          </h2>

          <p className="mt-4 text-gray-600 text-lg">
            Healthy choices carefully packed for every lifestyle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-14">

          {categories.map((category) => (
            <Link
              key={category.title}
              href={category.link}
              className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition duration-300 p-8 text-center group"
            >
              <div className="text-6xl group-hover:scale-110 transition">
                {category.emoji}
              </div>

              <h3 className="mt-6 text-2xl font-bold text-blue-900">
                {category.title}
              </h3>

              <p className="mt-3 text-gray-600 leading-7">
                {category.description}
              </p>

              <span className="inline-block mt-6 text-green-700 font-semibold group-hover:translate-x-1 transition">
                View Products →
              </span>
            </Link>
          ))}

        </div>

      </div>
    </section>
  );
}