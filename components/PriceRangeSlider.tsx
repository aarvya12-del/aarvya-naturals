"use client";

type Props = {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
};

export default function PriceRangeSlider({ min, max, value, onChange }: Props) {
  const [low, high] = value;

  function handleLowChange(next: number) {
    onChange([Math.min(next, high), high]);
  }

  function handleHighChange(next: number) {
    onChange([low, Math.max(next, low)]);
  }

  const lowPercent = ((low - min) / (max - min)) * 100;
  const highPercent = ((high - min) / (max - min)) * 100;

  return (
    <div>
      <div className="relative h-6">
        {/* Track */}
        <div className="absolute top-1/2 h-1.5 w-full -translate-y-1/2 rounded-full bg-gray-200" />

        {/* Active range */}
        <div
          className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-green-600"
          style={{
            left: `${lowPercent}%`,
            right: `${100 - highPercent}%`,
          }}
        />

        <input
          type="range"
          min={min}
          max={max}
          value={low}
          onChange={(e) => handleLowChange(Number(e.target.value))}
          className="price-range-thumb pointer-events-none absolute top-1/2 h-1.5 w-full -translate-y-1/2 appearance-none bg-transparent"
          style={{ zIndex: low > max - (max - min) / 2 ? 5 : 3 }}
          aria-label="Minimum price"
        />

        <input
          type="range"
          min={min}
          max={max}
          value={high}
          onChange={(e) => handleHighChange(Number(e.target.value))}
          className="price-range-thumb pointer-events-none absolute top-1/2 h-1.5 w-full -translate-y-1/2 appearance-none bg-transparent"
          style={{ zIndex: 4 }}
          aria-label="Maximum price"
        />
      </div>

      <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
        <span>₹{low}</span>
        <span>₹{max}{max >= 1000 ? "+" : ""}</span>
      </div>

      <style jsx>{`
        .price-range-thumb::-webkit-slider-thumb {
          pointer-events: auto;
          appearance: none;
          height: 18px;
          width: 18px;
          border-radius: 9999px;
          background: #ffffff;
          border: 3px solid #16a34a;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
          cursor: pointer;
        }

        .price-range-thumb::-moz-range-thumb {
          pointer-events: auto;
          height: 18px;
          width: 18px;
          border-radius: 9999px;
          background: #ffffff;
          border: 3px solid #16a34a;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
