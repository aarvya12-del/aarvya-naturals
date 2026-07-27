import type { Product } from "@/types/product";
import { createVariants } from "@/lib/productHelpers";

export const honeyCollection: Product[] = [
  {
    id: 20,
    slug: "honey-amla",
    name: "Honey Amla",
    category: "Honey Collection",
    image: "/images/products/honey-amla.png",

    shortDescription: "Indian Gooseberries Preserved in Pure Honey",

    description:
      "Fresh Indian gooseberries carefully preserved in pure honey. A traditional health food rich in Vitamin C and antioxidants.",

    benefits: [
      "Rich in Vitamin C",
      "Natural Immunity Booster",
      "Pure Honey",
      "Traditional Wellness Food",
    ],

    variants: createVariants(0, [
      {
        weight: "500g",
        price: 160,
      },
    ]),

    badge: "Best Seller",

    featured: true,
    bestseller: true,
    newArrival: false,

    stock: true,
  },

  {
    id: 21,
    slug: "nuts-in-honey-250",
    name: "Nuts in Honey (250g)",
    category: "Honey Collection",
    image: "/images/products/nuts-in-honey.png",

    shortDescription: "Premium Nuts Preserved in Honey",

    description:
      "A premium blend of almonds, cashews, walnuts and pistachios soaked in pure honey for a delicious and nutritious treat.",

    benefits: [
      "Premium Dry Fruits",
      "Pure Honey",
      "Rich in Protein",
      "Energy Booster",
    ],

    variants: createVariants(0, [
      {
        weight: "250g",
        price: 120,
      },
    ]),

    badge: "Popular",

    featured: true,
    bestseller: false,
    newArrival: false,

    stock: true,
  },

  {
    id: 22,
    slug: "nuts-in-honey-500",
    name: "Nuts in Honey (500g)",
    category: "Honey Collection",
    image: "/images/products/nuts-in-honey.png",

    shortDescription: "Premium Nuts Preserved in Honey",

    description:
      "Premium mixed dry fruits preserved in pure honey, perfect for daily nutrition and gifting.",

    benefits: [
      "Premium Dry Fruits",
      "Pure Honey",
      "Healthy Snack",
      "Energy Booster",
    ],

    variants: createVariants(0, [
      {
        weight: "500g",
        price: 220,
      },
    ]),

    badge: "Family Pack",

    featured: true,
    bestseller: true,
    newArrival: false,

    stock: true,
  },

  {
    id: 23,
    slug: "honey-fig",
    name: "Honey Fig",
    category: "Honey Collection",
    image: "/images/products/honey-fig.png",

    shortDescription: "Premium Figs Preserved in Honey",

    description:
      "Premium dried figs soaked in pure honey for a naturally sweet and healthy delicacy.",

    benefits: [
      "Rich in Fibre",
      "Pure Honey",
      "Healthy Dessert",
      "Premium Quality",
    ],

    variants: createVariants(0, [
      {
        weight: "600g",
        price: 350,
      },
    ]),

    badge: "Premium",

    featured: true,
    bestseller: false,
    newArrival: false,

    stock: true,
  },
];