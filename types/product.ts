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
}