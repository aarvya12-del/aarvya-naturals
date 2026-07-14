import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import TrustBar from "../components/TrustBar";
import FeaturedProducts from "../components/FeaturedProducts";
import Categories from "../components/Categories";
import WhyChooseUs from "../components/WhyChooseUs";
import Footer from "../components/Footer";
import FloatingWhatsApp from "../components/FloatingWhatsApp";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <TrustBar />
        <FeaturedProducts />
        <Categories />
        <WhyChooseUs />
      </main>

      <Footer />

      <FloatingWhatsApp />
    </>
  );
}