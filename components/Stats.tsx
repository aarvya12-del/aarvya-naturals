const stats = [
  {
    value: "500+",
    label: "Happy Customers",
  },
  {
    value: "15+",
    label: "Premium Products",
  },
  {
    value: "100%",
    label: "Freshly Packed",
  },
  {
    value: "4.9★",
    label: "Customer Rating",
  },
];

export default function Stats() {
  return (
    <section className="bg-blue-900 text-white py-20">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">

          {stats.map((stat) => (
            <div key={stat.label}>

              <h2 className="text-5xl font-bold text-yellow-400">
                {stat.value}
              </h2>

              <p className="mt-3 text-lg">
                {stat.label}
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}