const items = [
  {
    icon: "🚚",
    title: "Fast Delivery",
  },
  {
    icon: "🌿",
    title: "Premium Quality",
  },
  {
    icon: "❤️",
    title: "Freshly Packed",
  },
  {
    icon: "⭐",
    title: "Trusted Products",
  },
];

export default function TrustBar() {
  return (
    <section className="bg-yellow-50 border-y border-yellow-200">
      <div className="max-w-7xl mx-auto px-6 py-5">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          {items.map((item) => (
            <div
              key={item.title}
              className="flex items-center justify-center gap-3 text-center"
            >
              <span className="text-3xl">
                {item.icon}
              </span>

              <span className="font-semibold text-blue-900">
                {item.title}
              </span>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}