import Link from "next/link";
import type { Brand } from "@/types";
import { ROUTES } from "@/lib/constants";

export function BrandStrip({ brands }: { brands: Brand[] }) {
  return (
    <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4 sm:gap-3 lg:grid-cols-6">
      {brands.map((brand) => (
        <Link
          key={brand.id}
          href={ROUTES.search(brand.name)}
          className="flex flex-col items-center justify-center gap-1 rounded-xl border border-neutral-200 bg-white px-3 py-4 transition-colors hover:border-primary-300"
        >
          <span className="text-lg font-black tracking-tight text-neutral-700">
            {brand.logoText}
          </span>
          <span className="text-[11px] font-semibold text-neutral-400">
            {brand.name}
          </span>
        </Link>
      ))}
    </div>
  );
}
