"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";

type Props = {
  id: number;
  slug: string;
  name: string;
  image: string;
  variant: string;
  price: number; // ⭐ NEW
  type?: "product" | "combo";
  quantity?: number;
};

export default function AddToCartButton({
  id,
  slug,
  name,
  image,
  variant,
  price,
  type = "product",
  quantity = 1,
}: Props) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  function handleClick() {
    addToCart({
      id,
      slug,
      name,
      image,
      variant,
      price, // ⭐ NEW
      type,
      quantity,
    });

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 1500);
  }

  return (
    <button
      onClick={handleClick}
      className={`w-full rounded-full py-4 font-semibold transition-all duration-300 ${
        added
          ? "bg-green-600 text-white"
          : "bg-blue-900 text-white hover:bg-blue-800"
      }`}
    >
      {added
        ? `✓ Added ${quantity} to Cart`
        : "🛒 Add to Cart"}
    </button>
  );
}