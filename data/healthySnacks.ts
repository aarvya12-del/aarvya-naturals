import type { Product } from "@/types/product";
import { createVariants } from "@/lib/productHelpers";

export const healthySnacks: Product[] = [
  {
    id: 31,
    slug: "fruit-chips",
    name: "Fruit Chips",

    category: "Healthy Snacks",

    image: "/images/products/fruit-chips.png",

    shortDescription: "Premium Dehydrated Fruit Chips",

    description:
      "Naturally delicious dehydrated fruit chips prepared without compromising taste and nutrition.",

    benefits: [
      "100% Vegetarian",
      "Healthy Snack",
      "Travel Friendly",
      "No Artificial Colours",
    ],

    variants: createVariants(1500),

    badge: "Best Seller",

    featured: true,
    bestseller: true,
    newArrival: false,

    stock: true,
  },

  {
    id: 32,
    slug: "vegetable-chips",

    name: "Vegetable Chips",

    category: "Healthy Snacks",

    image: "/images/products/vegetable-chips.png",

    shortDescription: "Premium Dehydrated Vegetable Chips",

    description:
      "Crunchy dehydrated vegetable chips made from carefully selected vegetables for guilt-free snacking.",

    benefits: [
      "Healthy Snack",
      "High Fibre",
      "Travel Friendly",
      "Premium Quality",
    ],

    variants: createVariants(1200),

    badge: "Popular",

    featured: true,
    bestseller: true,
    newArrival: false,

    stock: true,
  },

  {
    id: 33,
    slug: "berry-mix",

    name: "Berry Mix",

    category: "Healthy Snacks",

    image: "/images/products/berry-mix.png",

    shortDescription: "Premium Berry Mix",

    description:
      "A delicious blend of premium dried cranberries, strawberries, blueberries, raspberries, blackberries and black raisins for a naturally sweet and nutritious snack.",

    benefits: [
      "Rich in Antioxidants",
      "Naturally Sweet",
      "High Fibre",
      "Ready to Eat",
    ],

    variants: createVariants(0, [
      {
        weight: "200g",
        price: 350,
      },
    ]),

    badge: "Premium",

    featured: true,
    bestseller: false,
    newArrival: true,

    stock: true,
  },

  {
    id: 34,
    slug: "breakfast-mix",

    name: "Breakfast Mix",

    category: "Healthy Snacks",

    image: "/images/products/breakfast-mix.png",

    shortDescription: "Healthy Breakfast Mix",

    description:
      "A wholesome blend of roasted almonds, black raisins, cranberries, pumpkin seeds, roasted peanuts and roasted hazelnuts to kick-start your day with natural nutrition.",

    benefits: [
      "Protein Rich",
      "Energy Booster",
      "High Fibre",
      "Ready to Eat",
    ],

    variants: createVariants(0, [
      {
        weight: "200g",
        price: 380,
      },
    ]),

    badge: "Healthy",

    featured: true,
    bestseller: false,
    newArrival: true,

    stock: true,
  },
];