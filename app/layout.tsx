import type { Metadata } from "next";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { CheckoutProvider } from "@/context/CheckoutContext";
import { OrderProvider } from "@/context/OrderContext";

export const metadata: Metadata = {
  title: "Aarvya Naturals | Premium Dry Fruits, Seeds & Healthy Products",
  description:
    "Discover premium dry fruits, healthy seeds and healthy products from Aarvya Naturals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="bg-white text-gray-900">

        <AuthProvider>

          <CartProvider>

            <CheckoutProvider>

              <OrderProvider>

                <Navbar />

                {children}

                <Footer />

                <FloatingWhatsApp />

              </OrderProvider>

            </CheckoutProvider>

          </CartProvider>

        </AuthProvider>

      </body>
    </html>
  );
}