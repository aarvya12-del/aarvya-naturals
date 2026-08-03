"use client";

import { Suspense, useMemo, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import type { Product } from "@/types/product";
import { getAllProductsFromFirestore } from "@/lib/firestoreProducts";
import ProductCard from "@/components/ProductCard";

function ProductsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryFromUrl = searchParams.get("category") || "All";

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  // Derive directly from the URL to satisfy the React 19 lint rule.
  const selectedCategory = categoryFromUrl;
  const [search, setSearch] = useState("");

  useEffect(() => {
    getAllProductsFromFirestore()
      .then((all) => {
        // stock === false means an admin explicitly hid it —
        // treat missing/undefined stock as visible (default state).
        setProducts(all.filter((p) => p.stock !== false));
      })
      .finally(() => setLoading(false));
  }, []);

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  const handleCategoryChange = (category: string) => {
    if (category === "All") {
      router.push("/products");
    } else {
      router.replace(
        `/products?category=${encodeURIComponent(category)}`
      );
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "All" ||
        product.category === selectedCategory;

      const keyword = search.toLowerCase();

      const matchesSearch =
        product.name.toLowerCase().includes(keyword) ||
        product.category.toLowerCase().includes(keyword) ||
        product.description.toLowerCase().includes(keyword);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, search, products]);

  return (
    <main className="min-h-screen bg-gray-50">

      <section className="bg-gradient-to-r from-blue-900 to-blue-700 py-20 text-white">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h1 className="text-5xl font-extrabold">
            Our Products
          </h1>

          <p className="mt-5 text-xl text-blue-100">
            Premium Dry Fruits • Healthy Seeds • Honey Collection
          </p>
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-7xl px-6">
        <div className="relative">
          <span className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl">
            🔍
          </span>

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl border-2 border-gray-300 bg-white py-5 pl-16 pr-16 text-lg text-black shadow-sm outline-none transition focus:border-[#0B3C8C] focus:ring-4 focus:ring-blue-100"
          />

          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-2xl text-gray-500 hover:text-red-500"
            >
              ×
            </button>
          )}
        </div>
      </section>

      <section className="mx-auto mt-8 max-w-7xl px-6">
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`rounded-full px-6 py-3 font-semibold transition ${
                selectedCategory === category
                  ? "bg-[#0B3C8C] text-white"
                  : "border border-gray-300 bg-white text-gray-700 hover:border-[#0B3C8C] hover:text-[#0B3C8C]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-8 max-w-7xl px-6">
        <p className="text-lg font-semibold text-gray-600">
          {loading
            ? "Loading products…"
            : `Showing ${filteredProducts.length} Product${filteredProducts.length !== 1 ? "s" : ""}`}
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        {loading ? (
          <div className="rounded-3xl bg-white py-24 text-center shadow-lg">
            <p className="text-lg text-gray-500">Loading products…</p>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.slug}
                product={product}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl bg-white py-24 text-center shadow-lg">
            <div className="text-6xl">🔍</div>

            <h2 className="mt-6 text-3xl font-bold text-gray-700">
              No Products Found
            </h2>

            <p className="mt-4 text-lg text-gray-500">
              Try another search keyword.
            </p>

            <button
              onClick={() => {
                setSearch("");
                handleCategoryChange("All");
              }}
              className="mt-8 rounded-full bg-[#0B3C8C] px-8 py-4 font-semibold text-white transition hover:bg-[#082F6D]"
            >
              Show All Products
            </button>
          </div>
        )}
      </section>

    </main>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading products...</div>}>
      <ProductsContent />
    </Suspense>
  );
}