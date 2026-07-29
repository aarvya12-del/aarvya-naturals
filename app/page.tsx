import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import FeaturedProducts from "@/components/FeaturedProducts";
import WhyChooseUs from "@/components/WhyChooseUs";
import CustomerReviews from "@/components/CustomerReviews";

export default function Home() {
  return (
    <main
      className="min-h-screen transition-colors duration-300"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      {/* Hero */}
      <Hero />

      {/* Shop by Category */}
      <Categories />

      {/* Best Selling Products */}
      <FeaturedProducts />

      {/* Why Choose Aarvya Naturals */}
      <WhyChooseUs />

      {/* Customer Reviews */}
      <CustomerReviews />
    </main>
  );
}