import type { Product } from "@/types/product";
import { createVariants } from "@/lib/productHelpers";

export const seeds: Product[] = [
  {
    id: 12,
    slug: "pumpkin-seeds",
    name: "Pumpkin Seeds",
    category: "Seeds",
    image: "/images/products/pumpkin-seed.png",

    shortDescription: "Premium Pumpkin Seeds",

    description:
      "Premium quality pumpkin seeds packed with protein, magnesium and essential nutrients for a healthy lifestyle.",

    benefits: [
      "High Protein",
      "Rich in Magnesium",
      "High Fibre",
      "Healthy Snacking",
    ],

    variants: createVariants(650),

    badge: "Superfood",

    featured: true,
    bestseller: true,
    newArrival: false,

    stock: true,
  },

  {
    id: 13,
    slug: "watermelon-seeds",
    name: "Watermelon Seeds",
    category: "Seeds",
    image: "/images/products/watermelon-seed.png",

    shortDescription: "Premium Watermelon Seeds",

    description:
      "Crunchy watermelon seeds rich in healthy fats, minerals and plant protein.",

    benefits: [
      "Rich in Protein",
      "Healthy Fats",
      "Magnesium Rich",
      "Perfect Snack",
    ],

    variants: createVariants(650),

    badge: "Healthy Choice",

    featured: true,
    bestseller: false,
    newArrival: false,

    stock: true,
  },

  {
    id: 14,
    slug: "sunflower-seeds",
    name: "Sunflower Seeds",
    category: "Seeds",
    image: "/images/products/sunflower-seed.png",

    shortDescription: "Premium Sunflower Seeds",

    description:
      "Fresh sunflower seeds naturally rich in Vitamin E and healthy fats.",

    benefits: [
      "Vitamin E",
      "Heart Healthy",
      "Healthy Fats",
      "Rich in Minerals",
    ],

    variants: createVariants(400),

    badge: "Superfood",

    featured: true,
    bestseller: false,
    newArrival: false,

    stock: true,
  },

  {
    id: 15,
    slug: "flax-seeds",
    name: "Flax Seeds",
    category: "Seeds",
    image: "/images/products/flax-seed.png",

    shortDescription: "Premium Flax Seeds",

    description:
      "Premium flax seeds naturally rich in Omega-3 fatty acids and dietary fibre.",

    benefits: [
      "Omega 3",
      "High Fibre",
      "Heart Healthy",
      "Weight Management",
    ],

    variants: createVariants(200),

    badge: "Healthy Choice",

    featured: true,
    bestseller: true,
    newArrival: false,

    stock: true,
  },

  {
    id: 16,
    slug: "mini-cucumber-seeds",
    name: "Mini Cucumber Seeds",
    category: "Seeds",
    image: "/images/products/mini-cucumber-seed.png",

    shortDescription: "Premium Mini Cucumber Seeds",

    description:
      "Premium mini cucumber seeds selected for freshness and nutritional value.",

    benefits: [
      "Protein Rich",
      "Mineral Rich",
      "Healthy Snack",
      "Natural Goodness",
    ],

    variants: createVariants(450),

    badge: "Natural",

    featured: false,
    bestseller: false,
    newArrival: false,

    stock: true,
  },

  {
    id: 17,
    slug: "chia-seeds",
    name: "Chia Seeds",
    category: "Seeds",
    image: "/images/products/chia-seed.png",

    shortDescription: "Premium Chia Seeds",

    description:
      "Premium chia seeds packed with fibre, antioxidants and plant protein.",

    benefits: [
      "High Fibre",
      "Protein Rich",
      "Omega 3",
      "Superfood",
    ],

    variants: createVariants(350),

    badge: "Superfood",

    featured: true,
    bestseller: true,
    newArrival: false,

    stock: true,
  },

  {
    id: 18,
    slug: "sabja-seeds",
    name: "Sabja Seeds",
    category: "Seeds",
    image: "/images/products/sabja-seed.png",

    shortDescription: "Premium Sabja Seeds",

    description:
      "Cooling sabja seeds ideal for beverages, desserts and healthy drinks.",

    benefits: [
      "Cooling Effect",
      "Digestive Health",
      "Rich Fibre",
      "Natural Superfood",
    ],

    variants: createVariants(350),

    badge: "Natural",

    featured: false,
    bestseller: false,
    newArrival: false,

    stock: true,
  },

  {
    id: 19,
    slug: "healthy-seed-mix",
    name: "Healthy Seed Mix",
    category: "Seeds",
    image: "/images/products/seedmix.png",

    shortDescription: "7 Premium Seeds Blend",

    description:
      "A balanced mix of seven premium seeds carefully blended for everyday nutrition and wellness.",

    benefits: [
      "7 Seed Blend",
      "Rich in Protein",
      "High Fibre",
      "Daily Nutrition",
    ],

    variants: createVariants(0, [
      {
        weight: "250g",
        price: 190,
      },
      {
        weight: "500g",
        price: 380,
      },
      {
        weight: "1kg",
        price: 760,
      },
    ]),

    badge: "Best Seller",

    featured: true,
    bestseller: true,
    newArrival: false,

    stock: true,
  },
];