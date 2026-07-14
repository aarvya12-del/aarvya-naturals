import Image from "next/image";

const products = [
  {
    name: "Premium Almonds",
    image: "/images/products/almond.jpg",
  },
  {
    name: "Cashew W320",
    image: "/images/products/cashew.jpg",
  },
  {
    name: "Pistachios",
    image: "/images/products/pista.jpg",
  },
  {
    name: "Black Raisins",
    image: "/images/products/black-raisins.jpg",
  },
];

export default function FeaturedProducts() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-5xl font-bold text-center text-blue-900">
          Best Sellers
        </h2>

        <p className="text-center text-gray-500 mt-3">
          Freshly packed premium products loved by our customers.
        </p>

        <div className="grid md:grid-cols-4 gap-8 mt-14">

          {products.map((product) => (
            <div
              key={product.name}
              className="rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300"
            >
              <div className="h-64 bg-gray-100 flex items-center justify-center">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={220}
                  height={220}
                />
              </div>

              <div className="p-6">

                <h3 className="text-xl font-bold text-blue-900">
                  {product.name}
                </h3>

                <p className="text-gray-500 mt-2">
                  Premium Quality
                </p>

                <a
                  href="https://wa.me/916374626691"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-6 bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700"
                >
                  Order Now
                </a>

              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}