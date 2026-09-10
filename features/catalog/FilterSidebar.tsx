"use client";

import { SlidersHorizontal } from "lucide-react";
import type { CatalogFacets } from "@/types";
import { countActiveFilters } from "./params";
import { useCatalogParams } from "./useCatalogParams";
import { FilterPanel } from "./FilterPanel";

/** Desktop sticky sidebar. */
export function FilterSidebar({ facets }: { facets: CatalogFacets }) {
  const { params, clearAll } = useCatalogParams();
  const active = countActiveFilters(params);

  return (
    <aside className="hidden w-64 shrink-0 lg:block">
      <div className="sticky top-40 rounded-xl border border-neutral-200 bg-white">
        <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-3">
          <span className="flex items-center gap-2 text-sm font-extrabold text-neutral-900">
            <SlidersHorizontal size={16} /> فیلترها
          </span>
          {active > 0 && (
            <button
              type="button"
              onClick={clearAll}
              className="text-[12px] font-bold text-danger-500 hover:underline"
            >
              حذف ({active})
            </button>
          )}
        </div>
        <div className="px-4 pb-2">
          <FilterPanel facets={facets} />
        </div>
      </div>
    </aside>
  );
}
