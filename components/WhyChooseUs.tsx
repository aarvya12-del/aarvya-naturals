const features = [
  {
    icon: "🌿",
    title: "100% Premium Quality",
    description:
      "We carefully select every product to ensure freshness, taste and superior quality.",
  },
  {
    icon: "📦",
    title: "Freshly Packed",
    description:
      "Every order is packed hygienically only after receiving your order.",
  },
  {
    icon: "❤️",
    title: "Healthy Lifestyle",
    description:
      "Natural dry fruits, seeds and healthy snacks for everyday wellness.",
  },
  {
    icon: "🚚",
    title: "Fast Support",
    description:
      "Quick response on WhatsApp and reliable delivery across India.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">
          <h2 className="text-5xl font-bold text-blue-900">
            Why Choose Aarvya Naturals?
          </h2>

          <p className="mt-4 text-lg text-gray-600">
            We don't just sell dry fruits. We deliver freshness, health and trust.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-14">

          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-3xl bg-gray-50 p-8 shadow-lg hover:shadow-xl transition duration-300 text-center"
            >
              <div className="text-6xl">
                {feature.icon}
              </div>

              <h3 className="mt-6 text-2xl font-bold text-blue-900">
                {feature.title}
              </h3>

              <p className="mt-4 text-gray-600 leading-7">
                {feature.description}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}