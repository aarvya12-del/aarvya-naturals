import type { Product } from "@/types/product";
import { createVariants } from "@/lib/productHelpers";

export const flavouredNuts: Product[] = [
  {
    id: 8,
    slug: "pepper-cashew",
    name: "Pepper Cashew",
    category: "Flavoured Nuts",
    image: "/images/products/pepper-cashew.png",

    shortDescription: "Pepper Flavoured Premium Cashews",

    description:
      "Premium W320 cashews roasted and seasoned with aromatic black pepper for a delicious crunchy snack.",

    benefits: [
      "High in Protein",
      "Premium W320 Cashews",
      "Freshly Roasted",
      "Perfect Tea Time Snack",
    ],

    variants: createVariants(1300),

    badge: "Spicy",

    featured: true,
    bestseller: true,
    newArrival: false,

    stock: true,
  },

  {
    id: 9,
    slug: "chilli-cashew",
    name: "Chilli Cashew",
    category: "Flavoured Nuts",
    image: "/images/products/chilli-cashew.png",

    shortDescription: "Chilli Flavoured Premium Cashews",

    description:
      "Crunchy premium cashews coated with delicious chilli seasoning for spice lovers.",

    benefits: [
      "Premium W320 Cashews",
      "Crunchy & Spicy",
      "High Protein",
      "Ready to Eat",
    ],

    variants: createVariants(1300),

    badge: "Hot Favourite",

    featured: true,
    bestseller: true,
    newArrival: false,

    stock: true,
  },

  {
    id: 10,
    slug: "roasted-salted-almonds",
    name: "Roasted & Salted Almonds",
    category: "Flavoured Nuts",
    image: "/images/products/roasted-almond.png",

    shortDescription: "Roasted & Salted Almonds",

    description:
      "Premium almonds perfectly roasted and lightly salted for a healthy and tasty snack.",

    benefits: [
      "Rich in Vitamin E",
      "Protein Rich",
      "Freshly Roasted",
      "Healthy Snack",
    ],

    variants: createVariants(1300),

    badge: "Snack Time",

    featured: true,
    bestseller: false,
    newArrival: false,

    stock: true,
  },

  {
    id: 11,
    slug: "roasted-salted-cashew",
    name: "Roasted & Salted Cashew",
    category: "Flavoured Nuts",
    image: "/images/products/roasted-cashew.png",

    shortDescription: "Roasted & Salted Cashews",

    description:
      "Premium whole cashews roasted to perfection and seasoned with a light touch of salt.",

    benefits: [
      "Premium W320 Cashews",
      "High Protein",
      "Freshly Roasted",
      "Perfect Evening Snack",
    ],

    variants: createVariants(1200),

    badge: "New",

    featured: true,
    bestseller: false,
    newArrival: true,

    stock: true,
  },
];