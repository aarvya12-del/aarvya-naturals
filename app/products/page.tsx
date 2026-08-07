"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import type { Product } from "@/types/product";
import { getAllProductsFromFirestore } from "@/lib/firestoreProducts";
import ProductListCard from "@/components/ProductListCard";
import FiltersSidebar, { type CategoryCount } from "@/components/FiltersSidebar";
import Breadcrumb from "@/components/Breadcrumb";
import { SlidersHorizontal, Search, X } from "@/components/Icons";

const PAGE_SIZE = 12;

type SortOption = "popular" | "price-asc" | "price-desc" | "newest";

const SORT_LABELS: Record<SortOption, string> = {
  popular: "Most Popular",
  "price-asc": "Price: Low to High",
  "price-desc": "Price: High to Low",
  newest: "Newest First",
};

function ProductsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryFromUrl = searchParams.get("category") || "All";
  const selectedCategory = categoryFromUrl;

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("popular");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [priceInitialized, setPriceInitialized] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(true);
  const [page, setPage] = useState(1);
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  useEffect(() => {
    getAllProductsFromFirestore()
      .then((all) => {
        // stock === false means an admin explicitly hid it —
        // treat missing/undefined stock as visible (default state).
        setProducts(all.filter((p) => p.stock !== false));
      })
      .finally(() => setLoading(false));
  }, []);

  const maxPrice = useMemo(() => {
    const highest = products.reduce((max, p) => {
      const productMax = Math.max(...p.variants.map((v) => v.price), 0);
      return Math.max(max, productMax);
    }, 0);
    return Math.max(1000, Math.ceil(highest / 100) * 100);
  }, [products]);

  // Once products (and therefore maxPrice) are known, default the
  // slider to the full available range — but only the first time,
  // so it doesn't stomp on a range the person picked themselves.
  useEffect(() => {
    if (!priceInitialized && products.length > 0) {
      setPriceRange([0, maxPrice]);
      setPriceInitialized(true);
    }
  }, [priceInitialized, products.length, maxPrice]);

  const handleCategoryChange = (category: string) => {
    setPage(1);
    if (category === "All") {
      router.push("/products");
    } else {
      router.replace(`/products?category=${encodeURIComponent(category)}`);
    }
  };

  const handleClearAll = () => {
    setSearch("");
    setPriceRange([0, maxPrice]);
    setInStockOnly(true);
    setPage(1);
    handleCategoryChange("All");
  };

  // Products matching search text only — used to compute stable
  // per-category counts in the sidebar.
  const searchMatchedProducts = useMemo(() => {
    const keyword = search.toLowerCase();
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(keyword) ||
        product.category.toLowerCase().includes(keyword) ||
        product.description.toLowerCase().includes(keyword)
    );
  }, [products, search]);

  const categories: CategoryCount[] = useMemo(() => {
    const counts = new Map<string, number>();
    searchMatchedProducts.forEach((p) => {
      counts.set(p.category, (counts.get(p.category) ?? 0) + 1);
    });
    return Array.from(counts.entries()).map(([name, count]) => ({ name, count }));
  }, [searchMatchedProducts]);

  const inStockCount = useMemo(
    () => searchMatchedProducts.filter((p) => (p.stockGrams ?? p.stockUnits ?? 1) > 0).length,
    [searchMatchedProducts]
  );

  const outOfStockCount = searchMatchedProducts.length - inStockCount;

  const filteredProducts = useMemo(() => {
    let result = searchMatchedProducts.filter((product) => {
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;

      const basePrice = product.variants[0]?.price ?? 0;
      const matchesPrice = basePrice >= priceRange[0] && basePrice <= priceRange[1];

      const matchesStock = !inStockOnly || (product.stockGrams ?? product.stockUnits ?? 1) > 0;

      return matchesCategory && matchesPrice && matchesStock;
    });

    result = [...result].sort((a, b) => {
      if (sort === "price-asc") return (a.variants[0]?.price ?? 0) - (b.variants[0]?.price ?? 0);
      if (sort === "price-desc") return (b.variants[0]?.price ?? 0) - (a.variants[0]?.price ?? 0);
      if (sort === "newest") return Number(b.newArrival) - Number(a.newArrival);
      // popular: featured + bestseller first
      return Number(b.featured || b.bestseller) - Number(a.featured || a.bestseller);
    });

    return result;
  }, [searchMatchedProducts, selectedCategory, priceRange, inStockOnly, sort]);

  useEffect(() => {
    setPage(1);
  }, [selectedCategory, search, priceRange, inStockOnly, sort]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const rangeStart = filteredProducts.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(currentPage * PAGE_SIZE, filteredProducts.length);

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      <div className="mx-auto max-w-7xl px-6 pt-8">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Products" }]} />

        {/* Title + toolbar */}
        <div className="mt-5 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              All Products
            </h1>
            <p className="mt-2 text-gray-500">
              Premium quality dry fruits, nuts, seeds &amp; more
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-gray-500 sm:block">
              {loading
                ? "Loading…"
                : filteredProducts.length === 0
                ? "No products found"
                : `Showing ${rangeStart}–${rangeEnd} of ${filteredProducts.length} products`}
            </span>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 outline-none focus:border-[#0B3C8C]"
            >
              {(Object.keys(SORT_LABELS) as SortOption[]).map((key) => (
                <option key={key} value={key}>
                  {SORT_LABELS[key]}
                </option>
              ))}
            </select>

            <button
              onClick={() => setShowFiltersMobile((v) => !v)}
              className="flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 lg:hidden"
            >
              <SlidersHorizontal size={16} />
              Filters
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative mt-6 max-w-xl">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-11 pr-11 text-sm outline-none focus:border-[#0B3C8C]"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"
            >
              <X size={18} />
            </button>
          )}
        </div>

        <p className="mt-3 text-sm text-gray-500 sm:hidden">
          {loading
            ? "Loading…"
            : filteredProducts.length === 0
            ? "No products found"
            : `Showing ${rangeStart}–${rangeEnd} of ${filteredProducts.length} products`}
        </p>

        {/* Sidebar + Product list */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[280px_1fr]">
          <div className={`${showFiltersMobile ? "block" : "hidden"} lg:block`}>
            <FiltersSidebar
              categories={categories}
              totalCount={searchMatchedProducts.length}
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
              priceRange={priceRange}
              maxPrice={maxPrice}
              onPriceRangeChange={setPriceRange}
              inStockOnly={inStockOnly}
              onInStockOnlyChange={setInStockOnly}
              inStockCount={inStockCount}
              outOfStockCount={outOfStockCount}
              onClearAll={handleClearAll}
            />
          </div>

          <div>
            {loading ? (
              <div className="rounded-2xl bg-white py-24 text-center shadow-sm">
                <p className="text-lg text-gray-500">Loading products…</p>
              </div>
            ) : paginatedProducts.length > 0 ? (
              <div className="flex flex-col gap-5">
                {paginatedProducts.map((product) => (
                  <ProductListCard key={product.slug} product={product} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl bg-white py-24 text-center shadow-sm">
                <div className="text-6xl">🔍</div>
                <h2 className="mt-6 text-2xl font-bold text-gray-700">
                  No Products Found
                </h2>
                <p className="mt-3 text-gray-500">
                  Try another search keyword or adjust your filters.
                </p>
                <button
                  onClick={handleClearAll}
                  className="mt-8 rounded-full bg-[#0B3C8C] px-8 py-3 font-semibold text-white transition hover:bg-[#082F6D]"
                >
                  Show All Products
                </button>
              </div>
            )}

            {/* Pagination */}
            {!loading && totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-600 transition hover:border-[#0B3C8C] hover:text-[#0B3C8C] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Prev
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                  <button
                    key={num}
                    onClick={() => setPage(num)}
                    className={`h-9 w-9 rounded-lg text-sm font-semibold transition ${
                      num === currentPage
                        ? "bg-[#0B3C8C] text-white"
                        : "border border-gray-300 text-gray-600 hover:border-[#0B3C8C] hover:text-[#0B3C8C]"
                    }`}
                  >
                    {num}
                  </button>
                ))}

                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-600 transition hover:border-[#0B3C8C] hover:text-[#0B3C8C] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
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
