"use client";

import {
  Leaf,
  BadgeCheck,
  Star,
  ShieldCheck,
  Truck,
} from "@/components/Icons";

export default function TrustBar() {
  const items = [
    {
      icon: Leaf,
      text: "FSSAI Lic. No: 22426552000244",
    },
    {
      icon: BadgeCheck,
      text: "Freshly Packed",
    },
    {
      icon: Star,
      text: "Premium Quality",
    },
    {
      icon: ShieldCheck,
      text: "Hygienically Packed",
    },
    {
      icon: Truck,
      text: "Pan India Delivery",
    },
  ];

  return (
    <div className="border-b border-[#C9A227]/30 bg-[#082F6D] text-white">

      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-8 px-6 py-3">

        {items.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.text}
              className="flex items-center gap-2 text-sm font-medium tracking-wide"
            >
              <Icon
                size={18}
                className="text-[#FFD54F]"
              />

              <span>{item.text}</span>

            </div>
          );
        })}

      </div>

    </div>
  );
}