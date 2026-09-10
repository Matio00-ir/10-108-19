"use client";

import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import type { CatalogFacets } from "@/types";
import { toPersianDigits } from "@/lib/format";
import { Drawer } from "@/components/ui/Drawer";
import { buttonClasses } from "@/components/ui/Button";
import { countActiveFilters } from "./params";
import { useCatalogParams } from "./useCatalogParams";
import { FilterPanel } from "./FilterPanel";
import { SortSelect } from "./SortSelect";

/**
 * Toolbar shown above the grid. On mobile the "filters" button opens a
 * bottom-sheet drawer with the full filter panel; sort is inline.
 */
export function CatalogControls({
  facets,
  total,
}: {
  facets: CatalogFacets;
  total: number;
}) {
  const [open, setOpen] = useState(false);
  const { params, clearAll } = useCatalogParams();
  const active = countActiveFilters(params);

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex h-10 items-center gap-2 rounded-md border border-neutral-300 bg-white px-3 text-[13px] font-bold text-neutral-700 lg:hidden"
      >
        <SlidersHorizontal size={16} />
        فیلترها
        {active > 0 && (
          <span className="flex size-5 items-center justify-center rounded-full bg-primary-600 text-[11px] font-extrabold text-white">
            {toPersianDigits(active)}
          </span>
        )}
      </button>

      <SortSelect />

      <span className="ms-auto hidden text-[13px] text-neutral-400 sm:block">
        {toPersianDigits(total)} کالا
      </span>

      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        side="bottom"
        title="فیلترها"
      >
        <div className="px-4 pb-2">
          <FilterPanel facets={facets} />
        </div>
        <div className="sticky bottom-0 grid grid-cols-2 gap-2 border-t border-neutral-200 bg-white p-3">
          <button
            type="button"
            onClick={() => {
              clearAll();
            }}
            className={buttonClasses({ variant: "outline" })}
          >
            حذف فیلترها
          </button>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className={buttonClasses({ variant: "secondary" })}
          >
            نمایش {toPersianDigits(total)} کالا
          </button>
        </div>
      </Drawer>
    </div>
  );
}
