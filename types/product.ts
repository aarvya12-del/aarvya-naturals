export interface ProductVariant {
  id: string;
  weight: string;
  price: number;
  mrp: number;
  stock: boolean;
}

export interface Product {
  id: number;
  slug: string;
  name: string;
  category: string;
  image: string;

  shortDescription: string;
  description: string;
  benefits: string[];

  variants: ProductVariant[];

  badge?: string;

  featured: boolean;
  bestseller: boolean;
  newArrival: boolean;

  stock: boolean;

  // WEIGHT-BASED tracking — used when a product has more than one
  // pack size (100g/250g/500g/1kg). Tracked in grams so one number
  // covers all pack sizes at once.
  stockGrams?: number;
  lowStockAlertGrams?: number;

  // UNIT-BASED tracking — used when a product only has ONE pack
  // option (a bottle of wine, a jar of honey, a fixed-size mix).
  // Tracked as a plain count of items, not weight.
  stockUnits?: number;
  lowStockAlertUnits?: number;
}
