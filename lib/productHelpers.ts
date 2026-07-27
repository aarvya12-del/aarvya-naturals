import type { ProductVariant } from "@/types/product";

/**
 * Creates standard product variants from a 1kg price.
 *
 * Example:
 * createVariants(1200)
 *
 * 100g  -> 120
 * 250g  -> 300
 * 500g  -> 600
 * 1kg   -> 1200
 */
export function createVariants(
  kgPrice: number,
  customWeights?: {
    weight: string;
    price: number;
  }[]
): ProductVariant[] {
  if (customWeights) {
    return customWeights.map((item) => ({
      id: item.weight,
      weight: item.weight,
      price: item.price,
      mrp: item.price,
      stock: true,
    }));
  }

  return [
    {
      id: "100g",
      weight: "100g",
      price: Math.round(kgPrice * 0.1),
      mrp: Math.round(kgPrice * 0.1),
      stock: true,
    },
    {
      id: "250g",
      weight: "250g",
      price: Math.round(kgPrice * 0.25),
      mrp: Math.round(kgPrice * 0.25),
      stock: true,
    },
    {
      id: "500g",
      weight: "500g",
      price: Math.round(kgPrice * 0.5),
      mrp: Math.round(kgPrice * 0.5),
      stock: true,
    },
    {
      id: "1kg",
      weight: "1kg",
      price: kgPrice,
      mrp: kgPrice,
      stock: true,
    },
  ];
}