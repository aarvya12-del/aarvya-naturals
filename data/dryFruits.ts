import type { Product } from "@/types/product";
import { createVariants } from "@/lib/productHelpers";

export const dryFruits: Product[] = [
  {
    id: 1,
    slug: "premium-almonds",
    name: "Premium Almonds",
    category: "Dry Fruits",
    image: "/images/products/almond.png",

    shortDescription: "Premium California Almonds",

    description:
      "Crunchy premium almonds rich in protein, fibre and healthy fats. Hygienically packed for everyday healthy snacking.",

    benefits: [
      "Rich in Protein",
      "High in Fibre",
      "Heart Healthy",
      "Rich in Vitamin E",
    ],

    variants: createVariants(1200),

    badge: "Best Seller",

    featured: true,
    bestseller: true,
    newArrival: false,

    stock: true,
  },

  {
    id: 2,
    slug: "cashew-w320",
    name: "Cashew W320",
    category: "Dry Fruits",
    image: "/images/products/cashew.png",

    shortDescription: "Premium W320 Whole Cashews",

    description:
      "Premium quality W320 whole cashews with a rich buttery taste and excellent crunch.",

    benefits: [
      "Rich in Healthy Fats",
      "Good Source of Magnesium",
      "High in Protein",
      "Energy Booster",
    ],

    variants: createVariants(1100),

    badge: "Most Popular",

    featured: true,
    bestseller: true,
    newArrival: false,

    stock: true,
  },

  {
    id: 3,
    slug: "salted-pistachios",
    name: "Salted Pistachios",
    category: "Dry Fruits",
    image: "/images/products/pistachio.png",

    shortDescription: "Premium Salted Pistachios",

    description:
      "Premium salted pistachios packed with antioxidants, protein and delicious flavour.",

    benefits: [
      "Rich in Antioxidants",
      "High Protein",
      "Heart Healthy",
      "Good Source of Fibre",
    ],

    variants: createVariants(1600),

    badge: "Premium",

    featured: true,
    bestseller: false,
    newArrival: false,

    stock: true,
  },

  {
    id: 4,
    slug: "premium-chile-walnut",
    name: "Premium Chile Walnut",
    category: "Dry Fruits",
    image: "/images/products/walnut.png",

    shortDescription: "Premium Chile Walnut",

    description:
      "Premium Chile walnuts naturally rich in Omega-3 fatty acids and essential nutrients.",

    benefits: [
      "Omega 3 Rich",
      "Brain Health",
      "Heart Healthy",
      "Rich in Antioxidants",
    ],

    variants: createVariants(2000),

    badge: "Premium",

    featured: true,
    bestseller: false,
    newArrival: false,

    stock: true,
  },

  {
    id: 5,
    slug: "black-raisins",
    name: "Black Raisins",
    category: "Dry Fruits",
    image: "/images/products/black-raisin.png",

    shortDescription: "Naturally Sweet Black Raisins",

    description:
      "Naturally sweet black raisins packed with iron and essential nutrients.",

    benefits: [
      "Rich in Iron",
      "Natural Sweetness",
      "Improves Digestion",
      "Energy Booster",
    ],

    variants: createVariants(600),

    badge: "Natural",

    featured: false,
    bestseller: true,
    newArrival: false,

    stock: true,
  },

  {
    id: 6,
    slug: "yellow-raisins",
    name: "Yellow Raisins",
    category: "Dry Fruits",
    image: "/images/products/yellow-raisin.png",

    shortDescription: "Premium Yellow Raisins",

    description:
      "Soft golden raisins with delicious flavour and natural sweetness.",

    benefits: [
      "Rich in Iron",
      "Natural Energy",
      "Good for Digestion",
      "Healthy Snack",
    ],

    variants: createVariants(550),

    badge: "Natural",

    featured: false,
    bestseller: false,
    newArrival: false,

    stock: true,
  },

  {
    id: 7,
    slug: "premium-figs",
    name: "Premium Figs",
    category: "Dry Fruits",
    image: "/images/products/fig.png",

    shortDescription: "Premium Dried Figs",

    description:
      "Premium dried figs rich in fibre, calcium and natural goodness.",

    benefits: [
      "High Fibre",
      "Rich in Calcium",
      "Good Digestion",
      "Healthy Bones",
    ],

    variants: createVariants(1200),

    badge: "Healthy Choice",

    featured: true,
    bestseller: false,
    newArrival: false,

    stock: true,
  },
];