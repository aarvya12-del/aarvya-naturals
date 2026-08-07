"use client";

import { useEffect, useMemo, useState } from "react";
import type { ComboProduct } from "@/data/comboProducts";
import { getAllCombosFromFirestore } from "@/lib/firestoreProducts";
import ComboListCard from "@/components/ComboListCard";
import FiltersSidebar, { type CategoryCount } from "@/components/FiltersSidebar";
import Breadcrumb from "@/components/Breadcrumb";
import { SlidersHorizontal, Search, X } from "@/components/Icons";

const PAGE_SIZE = 12;

type SortOption = "popular" | "price-asc" | "price-desc";

const SORT_LABELS: Record<SortOption, string> = {
  popular: "Featured First",
  "price-asc": "Price: Low to High",
  "price-desc": "Price: High to Low",
};

export default function ComboOffersPage() {
  const [comboProducts, setComboProducts] = useState<ComboProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("popular");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [priceInitialized, setPriceInitialized] = useState(false);
  const [page, setPage] = useState(1);
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  useEffect(() => {
    getAllCombosFromFirestore()
      .then(setComboProducts)
      .finally(() => setLoading(false));
  }, []);

  const maxPrice = useMemo(() => {
    const highest = comboProducts.reduce((max, c) => Math.max(max, c.price), 0);
    return Math.max(1000, Math.ceil(highest / 100) * 100);
  }, [comboProducts]);

  // Default the slider to the full range the first time combos load.
  useEffect(() => {
    if (!priceInitialized && comboProducts.length > 0) {
      setPriceRange([0, maxPrice]);
      setPriceInitialized(true);
    }
  }, [priceInitialized, comboProducts.length, maxPrice]);

  const handleClearAll = () => {
    setSearch("");
    setPriceRange([0, maxPrice]);
    setSelectedCategory("All");
    setPage(1);
  };

  // Combos matching search text only — used for stable category counts.
  const searchMatchedCombos = useMemo(() => {
    const keyword = search.toLowerCase();
    return comboProducts.filter(
      (combo) =>
        combo.name.toLowerCase().includes(keyword) ||
        combo.category.toLowerCase().includes(keyword) ||
        combo.tagline.toLowerCase().includes(keyword)
    );
  }, [comboProducts, search]);

  const categories: CategoryCount[] = useMemo(() => {
    const counts = new Map<string, number>();
    searchMatchedCombos.forEach((c) => {
      counts.set(c.category, (counts.get(c.category) ?? 0) + 1);
    });
    return Array.from(counts.entries()).map(([name, count]) => ({ name, count }));
  }, [searchMatchedCombos]);

  const filteredCombos = useMemo(() => {
    let result = searchMatchedCombos.filter((combo) => {
      const matchesCategory =
        selectedCategory === "All" || combo.category === selectedCategory;

      const matchesPrice = combo.price >= priceRange[0] && combo.price <= priceRange[1];

      return matchesCategory && matchesPrice;
    });

    result = [...result].sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      return Number(b.featured) - Number(a.featured);
    });

    return result;
  }, [searchMatchedCombos, selectedCategory, priceRange, sort]);

  useEffect(() => {
    setPage(1);
  }, [selectedCategory, search, priceRange, sort]);

  const totalPages = Math.max(1, Math.ceil(filteredCombos.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginatedCombos = filteredCombos.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const rangeStart = filteredCombos.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(currentPage * PAGE_SIZE, filteredCombos.length);

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      <div className="mx-auto max-w-7xl px-6 pt-8">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Combo Offers" }]} />

        {/* Title + toolbar */}
        <div className="mt-5 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              All Combos
            </h1>
            <p className="mt-2 text-gray-500">
              Bundled savings across our best-loved products
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-gray-500 sm:block">
              {loading
                ? "Loading…"
                : filteredCombos.length === 0
                ? "No combos found"
                : `Showing ${rangeStart}–${rangeEnd} of ${filteredCombos.length} combos`}
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
            placeholder="Search combos..."
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
            : filteredCombos.length === 0
            ? "No combos found"
            : `Showing ${rangeStart}–${rangeEnd} of ${filteredCombos.length} combos`}
        </p>

        {/* Sidebar + Combo list */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[280px_1fr]">
          <div className={`${showFiltersMobile ? "block" : "hidden"} lg:block`}>
            <FiltersSidebar
              categories={categories}
              totalCount={searchMatchedCombos.length}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              priceRange={priceRange}
              maxPrice={maxPrice}
              onPriceRangeChange={setPriceRange}
              showAvailability={false}
              onClearAll={handleClearAll}
            />
          </div>

          <div>
            {loading ? (
              <div className="rounded-2xl bg-white py-24 text-center shadow-sm">
                <p className="text-lg text-gray-500">Loading combos…</p>
              </div>
            ) : paginatedCombos.length > 0 ? (
              <div className="flex flex-col gap-5">
                {paginatedCombos.map((combo) => (
                  <ComboListCard key={combo.slug} combo={combo} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl bg-white py-24 text-center shadow-sm">
                <div className="text-6xl">🔍</div>
                <h2 className="mt-6 text-2xl font-bold text-gray-700">
                  No Combos Found
                </h2>
                <p className="mt-3 text-gray-500">
                  Try another search keyword or adjust your filters.
                </p>
                <button
                  onClick={handleClearAll}
                  className="mt-8 rounded-full bg-[#0B3C8C] px-8 py-3 font-semibold text-white transition hover:bg-[#082F6D]"
                >
                  Show All Combos
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
