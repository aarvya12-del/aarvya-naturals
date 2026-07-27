export default function CustomerReviews() {
  const reviews = [
    {
      name: "Priya S.",
      rating: 5,
      review:
        "Excellent quality almonds and cashews. Fresh packing and quick delivery. Highly recommended!",
    },
    {
      name: "Arun K.",
      rating: 5,
      review:
        "The combo offers are worth every rupee. Packaging was neat and delivery was on time.",
    },
    {
      name: "Divya R.",
      rating: 5,
      review:
        "Premium quality products with excellent customer support. Will definitely order again.",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-green-50 to-white">

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <div className="text-center">

          <span className="inline-block rounded-full bg-yellow-100 text-yellow-700 px-5 py-2 font-semibold">
            Customer Love ❤️
          </span>

          <h2 className="mt-6 text-5xl font-bold text-blue-900">
            What Our Customers Say
          </h2>

          <p className="mt-5 text-xl text-gray-600 max-w-3xl mx-auto">
            Your trust is our biggest achievement.
          </p>

        </div>

        {/* Rating */}

        <div className="mt-12 text-center">

          <h3 className="text-6xl font-bold text-green-700">
            ★★★★★
          </h3>

          <p className="mt-3 text-2xl font-semibold text-gray-800">
            5.0 Customer Satisfaction
          </p>

          <p className="text-gray-500 mt-2">
            Fresh Products • Premium Quality • Fast Support
          </p>

        </div>

        {/* Reviews */}

        <div className="grid md:grid-cols-3 gap-8 mt-16">

          {reviews.map((review) => (

            <div
              key={review.name}
              className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 hover:shadow-2xl transition"
            >

              <div className="text-yellow-400 text-2xl">
                ★★★★★
              </div>

              <p className="mt-5 leading-8 text-gray-600 italic">
                "{review.review}"
              </p>

              <div className="mt-8">

                <h4 className="font-bold text-blue-900">
                  {review.name}
                </h4>

                <p className="text-sm text-gray-500">
                  Verified Customer
                </p>

              </div>

            </div>

          ))}

        </div>

        {/* Google Reviews */}

        <div className="text-center mt-16">

          <a
            href="#"
            className="inline-block rounded-full bg-blue-900 px-8 py-4 text-white font-semibold hover:bg-blue-800 transition"
          >
            View Google Reviews
          </a>

        </div>

      </div>

    </section>
  );
}