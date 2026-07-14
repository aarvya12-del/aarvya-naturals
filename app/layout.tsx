import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aarvya Naturals | Premium Dry Fruits, Seeds & Healthy Products",
  description:
    "Discover premium dry fruits, healthy seeds, and carefully curated healthy products from Aarvya Naturals. Freshly packed with quality and care.",
  keywords: [
    "Aarvya Naturals",
    "Dry Fruits",
    "Almonds",
    "Cashews",
    "Pistachios",
    "Raisins",
    "Healthy Seeds",
    "Seed Mix",
    "Coimbatore Dry Fruits",
    "Healthy Snacks",
  ],
  authors: [{ name: "Aarvya Naturals" }],
  creator: "Aarvya Naturals",
  publisher: "Aarvya Naturals",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}