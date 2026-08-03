import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { CheckoutProvider } from "@/context/CheckoutContext";
import { OrderProvider } from "@/context/OrderContext";
import { WishlistProvider } from "@/context/WishlistContext";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.aarvyanaturals.in"),

  title: "Aarvya Naturals | Premium Dry Fruits, Seeds & Healthy Products",

  description:
    "Discover premium dry fruits, healthy seeds and healthy products from Aarvya Naturals.",

  manifest: "/manifest.webmanifest",

  applicationName: "Aarvya Admin",

  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Aarvya Admin",
  },

  formatDetection: {
    telephone: false,
  },

  openGraph: {
    title: "Aarvya Naturals",
    description:
      "Premium Dry Fruits, Healthy Seeds & Healthy Products",
    url: "https://www.aarvyanaturals.in",
    siteName: "Aarvya Naturals",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Aarvya Naturals",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Aarvya Naturals",
    description:
      "Premium Dry Fruits, Healthy Seeds & Healthy Products",
    images: ["/og-image.png"],
  },

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      {
        url: "/icons/apple-touch-icon.png",
        sizes: "180x180",
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
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
            <WishlistProvider>
              <CheckoutProvider>
                <OrderProvider>
                  <Navbar />

                  {children}

                  <Footer />
                </OrderProvider>
              </CheckoutProvider>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>

        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}