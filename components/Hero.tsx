export default function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 text-white overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 py-28">

        <div className="max-w-3xl">

          <span className="bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-semibold">
            🌿 Premium Quality Since Day One
          </span>

          <h1 className="mt-8 text-5xl md:text-7xl font-extrabold leading-tight">
            Premium Dry Fruits
            <br />
            For A Healthier Life
          </h1>

          <p className="mt-8 text-xl text-blue-100 leading-9">
            Discover premium almonds, cashews, pistachios, raisins,
            seeds and healthy snacks carefully packed with freshness
            and delivered with care.
          </p>

          <div className="flex flex-wrap gap-5 mt-10">

            <a
              href="/products"
              className="bg-yellow-400 hover:bg-yellow-300 text-black px-8 py-4 rounded-full font-bold transition"
            >
              Browse Products
            </a>

            <a
              href="https://wa.me/916374626691"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white px-8 py-4 rounded-full hover:bg-white hover:text-blue-900 transition"
            >
              Order on WhatsApp
            </a>

          </div>

        </div>

      </div>

    </section>
  );
}