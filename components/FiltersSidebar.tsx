"use client";

import PriceRangeSlider from "@/components/PriceRangeSlider";

export type CategoryCount = {
  name: string;
  count: number;
};

type Props = {
  categories: CategoryCount[];
  totalCount: number;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;

  priceRange: [number, number];
  maxPrice: number;
  onPriceRangeChange: (range: [number, number]) => void;

  inStockOnly?: boolean;
  onInStockOnlyChange?: (value: boolean) => void;
  inStockCount?: number;
  outOfStockCount?: number;
  showAvailability?: boolean;

  onClearAll: () => void;
};

function getQuickPriceBuckets(maxPrice: number): { label: string; range: [number, number] }[] {
  return [
    { label: "Under ₹250", range: [0, 250] },
    { label: "₹250 – ₹500", range: [250, 500] },
    { label: "₹500 – ₹750", range: [500, 750] },
    { label: "Above ₹750", range: [750, maxPrice] },
  ];
}

export default function FiltersSidebar({
  categories,
  totalCount,
  selectedCategory,
  onCategoryChange,
  priceRange,
  maxPrice,
  onPriceRangeChange,
  inStockOnly = false,
  onInStockOnlyChange,
  inStockCount = 0,
  outOfStockCount = 0,
  showAvailability = true,
  onClearAll,
}: Props) {
  return (
    <aside className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm lg:sticky lg:top-28">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-bold text-[#0B3C8C]">Filters</h2>

        <button
          onClick={onClearAll}
          className="text-sm font-semibold text-gray-400 transition hover:text-[#0B3C8C]"
        >
          Clear All
        </button>
      </div>

      {/* Categories */}
      <section className="mb-7 border-b border-gray-100 pb-7">
        <h3 className="mb-3 font-semibold text-gray-800">Categories</h3>

        <div className="space-y-1">
          <label className="flex cursor-pointer items-center justify-between rounded-lg px-1 py-1.5 text-sm hover:bg-gray-50">
            <span className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedCategory === "All"}
                onChange={() => onCategoryChange("All")}
                className="h-4 w-4 accent-[#0B3C8C]"
              />
              <span
                className={
                  selectedCategory === "All"
                    ? "font-semibold text-[#0B3C8C]"
                    : "text-gray-700"
                }
              >
                All Categories
              </span>
            </span>
            <span className="text-gray-400">({totalCount})</span>
          </label>

          {categories.map((category) => (
            <label
              key={category.name}
              className="flex cursor-pointer items-center justify-between rounded-lg px-1 py-1.5 text-sm hover:bg-gray-50"
            >
              <span className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedCategory === category.name}
                  onChange={() => onCategoryChange(category.name)}
                  className="h-4 w-4 accent-[#0B3C8C]"
                />
                <span
                  className={
                    selectedCategory === category.name
                      ? "font-semibold text-[#0B3C8C]"
                      : "text-gray-700"
                  }
                >
                  {category.name}
                </span>
              </span>
              <span className="text-gray-400">({category.count})</span>
            </label>
          ))}
        </div>
      </section>

      {/* Price Range */}
      <section className={showAvailability ? "mb-7 border-b border-gray-100 pb-7" : ""}>
        <h3 className="mb-4 font-semibold text-gray-800">Price Range</h3>

        <PriceRangeSlider
          min={0}
          max={maxPrice}
          value={priceRange}
          onChange={onPriceRangeChange}
        />

        <div className="mt-4 grid grid-cols-2 gap-2">
          {getQuickPriceBuckets(maxPrice).map((bucket) => {
            const active =
              priceRange[0] === bucket.range[0] &&
              priceRange[1] === bucket.range[1];

            return (
              <button
                key={bucket.label}
                onClick={() => onPriceRangeChange(bucket.range)}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                  active
                    ? "border-[#0B3C8C] bg-[#0B3C8C] text-white"
                    : "border-gray-300 text-gray-600 hover:border-[#0B3C8C] hover:text-[#0B3C8C]"
                }`}
              >
                {bucket.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Availability */}
      {showAvailability && (
        <section>
          <h3 className="mb-3 font-semibold text-gray-800">Availability</h3>

          <div className="space-y-1">
            <label className="flex cursor-pointer items-center justify-between rounded-lg px-1 py-1.5 text-sm hover:bg-gray-50">
              <span className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => onInStockOnlyChange?.(e.target.checked)}
                  className="h-4 w-4 accent-[#0B3C8C]"
                />
                <span className="text-gray-700">In Stock</span>
              </span>
              <span className="text-gray-400">({inStockCount})</span>
            </label>

            <label className="flex cursor-not-allowed items-center justify-between rounded-lg px-1 py-1.5 text-sm opacity-60">
              <span className="flex items-center gap-2">
                <input type="checkbox" disabled className="h-4 w-4" />
                <span className="text-gray-700">Out of Stock</span>
              </span>
              <span className="text-gray-400">({outOfStockCount})</span>
            </label>
          </div>
        </section>
      )}
    </aside>
  );
}
