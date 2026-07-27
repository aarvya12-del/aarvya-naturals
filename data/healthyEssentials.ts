import type { Product } from "@/types/product";
import { createVariants } from "@/lib/productHelpers";

export const healthyEssentials: Product[] = [
  {
    id: 35,
    slug: "dry-amla",

    name: "Dry Amla",

    category: "Healthy Essentials",

    image: "/images/products/dry-amla.png",

    shortDescription: "Premium Naturally Dried Amla",

    description:
      "Naturally dried Indian gooseberries rich in Vitamin C and antioxidants. A healthy traditional snack suitable for everyday consumption.",

    benefits: [
      "Rich in Vitamin C",
      "Natural Immunity",
      "High in Antioxidants",
      "Traditional Wellness Food",
    ],

    variants: createVariants(500),

    badge: "Natural",

    featured: true,
    bestseller: true,
    newArrival: false,

    stock: true,
  },

  {
    id: 36,
    slug: "non-alcoholic-red-wine",

    name: "Non-Alcoholic Red Wine",

    category: "Healthy Essentials",

    image: "/images/products/red-wine.png",

    shortDescription: "Premium Non-Alcoholic Red Wine",

    description:
      "Premium non-alcoholic red wine prepared for those who enjoy the rich taste of grapes without alcohol.",

    benefits: [
      "0% Alcohol",
      "Premium Quality",
      "Ready to Serve",
      "Refreshing Beverage",
    ],

    variants: createVariants(0, [
      {
        weight: "750ml",
        price: 600,
      },
    ]),

    badge: "Premium",

    featured: true,
    bestseller: false,
    newArrival: false,

    stock: true,
  },
];