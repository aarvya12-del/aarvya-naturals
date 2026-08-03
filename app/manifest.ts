import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/admin",
    name: "Aarvya Admin",
    short_name: "Aarvya Admin",
    description:
      "Aarvya Naturals Admin Panel for managing products, inventory, customers and orders.",

    start_url: "/admin",
    scope: "/",
    display: "standalone",
    orientation: "portrait",

    background_color: "#ffffff",
    theme_color: "#0f172a",

    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icons/maskable-icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}