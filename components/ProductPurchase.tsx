"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import AddToCartButton from "@/components/AddToCartButton";
import LoginRequiredModal from "@/components/LoginRequiredModal";
import { parseWeightToGrams, isUnitTracked } from "@/lib/inventory";
import type { Product } from "@/types/product";

type Props = {
  product: Product;
};

export default function ProductPurchase({ product }: Props) {
  const router = useRouter();

const { user } = useAuth();

const { addToCart } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants[0]
  );

  const [quantity, setQuantity] = useState(1);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const unitTracked = isUnitTracked(product);

  // Stock is only "tracked" once an admin has explicitly set a
  // number for this product. Until then, purchasing works exactly
  // as before — nothing gets blocked, no messaging shown.
  const stockTracked = unitTracked
    ? typeof product.stockUnits === "number"
    : typeof product.stockGrams === "number";

  const available = unitTracked
    ? product.stockUnits ?? 0
    : product.stockGrams ?? 0;

  const needed = unitTracked
    ? quantity
    : parseWeightToGrams(selectedVariant.weight) * quantity;

  const lowStockThreshold = unitTracked
    ? product.lowStockAlertUnits ?? 5
    : product.lowStockAlertGrams ?? 500;

  // In practice, a genuinely out-of-stock product is hidden from
  // browsing entirely before a customer ever reaches this page —
  // this stays only as a defensive fallback.
  const outOfStock = stockTracked && available <= 0;
  const insufficientStock = stockTracked && !outOfStock && needed > available;
  const isLowStock = stockTracked && !outOfStock && available <= lowStockThreshold;

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

      {/* Stock status — deliberately no exact numbers shown */}

      {outOfStock ? (
        <div className="mb-6 rounded-2xl bg-red-50 border border-red-200 px-5 py-3 text-red-700 font-semibold">
          Currently Out of Stock
        </div>
      ) : isLowStock ? (
        <div className="mb-6 rounded-2xl bg-amber-50 border border-amber-200 px-5 py-3 text-amber-700 font-medium">
          ⚡ Low Stock — order soon
        </div>
      ) : null}

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

        {insufficientStock && (
          <p className="mt-2 text-sm font-medium text-red-600">
            This quantity isn&apos;t available right now — try a smaller pack or lower quantity.
          </p>
        )}

      </div>

      {/* Buttons */}

      <div className="mt-10 space-y-4">

        {outOfStock || insufficientStock ? (
          <button
            disabled
            className="block w-full cursor-not-allowed rounded-full bg-gray-300 py-4 text-center text-lg font-semibold text-gray-500"
          >
            {outOfStock ? "Out of Stock" : "Not Available"}
          </button>
        ) : (
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
        )}

        <button
          disabled={outOfStock || insufficientStock}
          className="block w-full rounded-full bg-green-600 py-4 text-center text-lg font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-300"
          onClick={() => {

  if (!user) {

  sessionStorage.setItem(
    "pendingBuyNow",
    JSON.stringify({
      id: product.id,
      slug: product.slug,
      name: product.name,
      image: product.image,
      variant: selectedVariant.weight,
      price: selectedVariant.price,
      type: "product",
      quantity,
    })
  );

  setShowLoginModal(true);
  return;
}

  addToCart({
    id: product.id,
    slug: product.slug,
    name: product.name,
    image: product.image,
    variant: selectedVariant.weight,
    price: selectedVariant.price,
    type: "product",
    quantity,
  });

  router.push("/checkout");

}}
>
          Buy Now
        </button>

            </div>

      <LoginRequiredModal
        open={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />

    </div>
  );
}
