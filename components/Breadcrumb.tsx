import Link from "next/link";
import { ChevronRight } from "@/components/Icons";

type Crumb = {
  label: string;
  href?: string;
};

export default function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex flex-wrap items-center gap-1.5 text-sm text-gray-500"
    >
      {items.map((item, i) => {
        const isLast = i === items.length - 1;

        return (
          <span key={`${item.label}-${i}`} className="flex items-center gap-1.5">
            {i > 0 && (
              <ChevronRight size={14} className="text-gray-400" />
            )}

            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="transition hover:text-[#0B3C8C]"
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={isLast ? "font-semibold text-[#0B3C8C]" : ""}
              >
                {item.label}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
