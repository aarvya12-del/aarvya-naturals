"use client";

import { useState } from "react";
import AddToCartButton from "@/components/AddToCartButton";
import type { Product } from "@/types/product";

type Props = {
  product: Product;
};

export default function ProductPurchase({ product }: Props) {
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants[0]
  );

  const [quantity, setQuantity] = useState(1);

  function increaseQuantity() {
    setQuantity((prev) => prev + 1);
  }

  function decreaseQuantity() {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  }

  return (
    <div className="mt-10">

      {/* Weight Selection */}

      <h3 className="text-2xl font-bold text-blue-900">
        Select Weight
      </h3>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">

        {product.variants.map((variant) => (

          <button
            key={variant.id}
            onClick={() => setSelectedVariant(variant)}
            className={`rounded-2xl border-2 py-4 font-semibold transition-all duration-300 ${
              selectedVariant.id === variant.id
                ? "border-green-700 bg-green-700 text-white shadow-lg"
                : "border-gray-300 bg-white text-gray-800 hover:border-green-600 hover:text-green-700"
            }`}
          >
            <div>{variant.weight}</div>

            <div className="mt-1 text-sm font-normal">
              ₹{variant.price}
            </div>

          </button>

        ))}

      </div>

      {/* Selected Variant */}

      <div className="mt-6 rounded-2xl border border-green-200 bg-green-50 p-5">

        <p className="text-sm text-gray-700">
          Selected
        </p>

        <p className="mt-2 text-2xl font-bold text-green-700">
          {selectedVariant.weight}
        </p>

        <p className="mt-1 text-lg font-semibold text-gray-800">
          ₹{selectedVariant.price}
        </p>

      </div>

      {/* Quantity */}

      <div className="mt-8">

        <h3 className="text-2xl font-bold text-blue-900">
          Quantity
        </h3>

        <div className="mt-4 inline-flex overflow-hidden rounded-2xl border-2 border-gray-300 bg-white shadow-sm">

          <button
            onClick={decreaseQuantity}
            className="flex h-16 w-16 items-center justify-center text-3xl font-bold hover:bg-gray-100"
          >
            −
          </button>

          <div className="flex h-16 w-24 items-center justify-center border-x-2 border-gray-300 text-2xl font-bold">
            {quantity}
          </div>

          <button
            onClick={increaseQuantity}
            className="flex h-16 w-16 items-center justify-center text-3xl font-bold hover:bg-gray-100"
          >
            +
          </button>

        </div>

      </div>

      {/* Buttons */}

      <div className="mt-10 space-y-4">

        <AddToCartButton
          id={product.id}
          slug={product.slug}
          name={product.name}
          image={product.image}
          variant={selectedVariant.weight}
          price={selectedVariant.price}
          type="product"
          quantity={quantity}
        />

        <button
  className="block w-full rounded-full bg-green-600 py-4 text-center text-lg font-semibold text-white transition hover:bg-green-700"
  onClick={() => {
    alert("Checkout coming next! 🚀");
  }}
>
  Buy Now
</button>

      </div>

    </div>
  );
}