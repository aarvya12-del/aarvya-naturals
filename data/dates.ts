import type { Product } from "@/types/product";
import { createVariants } from "@/lib/productHelpers";

export const dates: Product[] = [
  {
    id: 24,
    slug: "black-dates",
    name: "Black Dates",
    category: "Dates",
    image: "/images/products/black-dates.png",

    shortDescription: "Premium Black Dates",

    description:
      "Naturally sweet premium black dates carefully selected for freshness and quality.",

    benefits: [
      "Natural Energy",
      "Rich in Iron",
      "High Fibre",
      "Healthy Snack",
    ],

    variants: createVariants(450),

    badge: "Popular",

    featured: true,
    bestseller: true,
    newArrival: false,

    stock: true,
  },

  {
    id: 25,
    slug: "seedless-dates",
    name: "Seedless Dates",
    category: "Dates",
    image: "/images/products/seedless-dates.png",

    shortDescription: "Premium Seedless Dates",

    description:
      "Soft and delicious seedless dates perfect for daily snacking and desserts.",

    benefits: [
      "Easy to Eat",
      "Natural Sweetness",
      "Rich in Fibre",
      "Daily Nutrition",
    ],

    variants: createVariants(250),

    badge: "Family Favourite",

    featured: true,
    bestseller: false,
    newArrival: false,

    stock: true,
  },

  {
    id: 26,
    slug: "crown-dates",
    name: "Crown Dates",
    category: "Dates",
    image: "/images/products/crown-dates.png",

    shortDescription: "Premium Crown Dates",

    description:
      "Premium quality Crown dates with rich taste and excellent texture.",

    benefits: [
      "Rich in Minerals",
      "Natural Energy",
      "Healthy Snack",
      "Premium Quality",
    ],

    variants: createVariants(0, [
      {
        weight: "500g",
        price: 300,
      },
    ]),

    badge: "Premium",

    featured: true,
    bestseller: false,
    newArrival: false,

    stock: true,
  },

  {
    id: 27,
    slug: "safawi-dates",
    name: "Safawi Dates (Loose)",
    category: "Dates",
    image: "/images/products/safawi-loose.png",

    shortDescription: "Premium Safawi Dates",

    description:
      "Authentic Safawi dates known for their soft texture, rich flavour and nutritional value.",

    benefits: [
      "Premium Quality",
      "Natural Energy",
      "High Fibre",
      "Imported Dates",
    ],

    variants: createVariants(600),

    badge: "Imported",

    featured: true,
    bestseller: true,
    newArrival: false,

    stock: true,
  },

  {
    id: 28,
    slug: "safawi-dates-box",
    name: "Safawi Dates Box",

    category: "Dates",

    image: "/images/products/safawi-box.png",

    shortDescription: "400g Premium Safawi Dates Box",

    description:
      "Premium packed Safawi dates in a hygienically sealed 400g retail box.",

    benefits: [
      "Retail Pack",
      "Imported",
      "Ready to Gift",
      "Premium Quality",
    ],

    variants: createVariants(0, [
      {
        weight: "400g",
        price: 460,
      },
    ]),

    badge: "Gift Pack",

    featured: true,
    bestseller: false,
    newArrival: false,

    stock: true,
  },

  {
    id: 29,
    slug: "medjool-dates",

    name: "Medjool Dates",

    category: "Dates",

    image: "/images/products/medjool-dates.png",

    shortDescription: "Premium Medjool Dates",

    description:
      "Large, soft and naturally caramel-sweet Medjool dates imported for premium quality.",

    benefits: [
      "Premium Imported",
      "Natural Sweetness",
      "Rich in Potassium",
      "Luxury Dates",
    ],

    variants: createVariants(0, [
      {
        weight: "500g",
        price: 750,
      },
    ]),

    badge: "Premium",

    featured: true,
    bestseller: true,
    newArrival: false,

    stock: true,
  },

  {
    id: 30,
    slug: "kimia-dates",

    name: "Kimia Dates",

    category: "Dates",

    image: "/images/products/kimia-dates.png",

    shortDescription: "Premium Kimia Dates",

    description:
      "Soft, juicy Kimia dates packed in a premium 500g retail box.",

    benefits: [
      "Soft Texture",
      "Premium Imported",
      "Natural Energy",
      "Ready to Eat",
    ],

    variants: createVariants(0, [
      {
        weight: "500g",
        price: 220,
      },
    ]),

    badge: "Imported",

    featured: true,
    bestseller: false,
    newArrival: true,

    stock: true,
  },
];