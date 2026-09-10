"use client";

import { X } from "lucide-react";
import type { CatalogFacets } from "@/types";
import { formatPrice, toPersianDigits } from "@/lib/format";
import { countActiveFilters } from "./params";
import { useCatalogParams } from "./useCatalogParams";

function Chip({
  children,
  onRemove,
}: {
  children: React.ReactNode;
  onRemove: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onRemove}
      className="flex items-center gap-1 rounded-full bg-primary-50 py-1 ps-2.5 pe-2 text-[12px] font-semibold text-primary-700 hover:bg-primary-100"
    >
      {children}
      <X size={13} />
    </button>
  );
}

export function ActiveFilters({ facets }: { facets: CatalogFacets }) {
  const { params, commit, toggleInArray, clearAll } = useCatalogParams();
  if (countActiveFilters(params) === 0) return null;

  const label = (arr: { value: string; label: string }[], v: string) =>
    arr.find((x) => x.value === v)?.label ?? v;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {params.brands?.map((b) => (
        <Chip key={b} onRemove={() => toggleInArray("brands", b)}>
          {label(facets.brands, b)}
        </Chip>
      ))}
      {params.forms?.map((f) => (
        <Chip key={f} onRemove={() => toggleInArray("forms", f)}>
          {f}
        </Chip>
      ))}
      {params.flavors?.map((f) => (
        <Chip key={f} onRemove={() => toggleInArray("flavors", f)}>
          {f}
        </Chip>
      ))}
      {(params.minPrice != null || params.maxPrice != null) && (
        <Chip
          onRemove={() =>
            commit({ minPrice: undefined, maxPrice: undefined })
          }
        >
          قیمت{" "}
          {params.minPrice != null ? formatPrice(params.minPrice, false) : "۰"}
          {" – "}
          {params.maxPrice != null
            ? formatPrice(params.maxPrice, false)
            : "بی‌نهایت"}
        </Chip>
      )}
      {params.minRating ? (
        <Chip onRemove={() => commit({ minRating: undefined })}>
          امتیاز {toPersianDigits(params.minRating)}+
        </Chip>
      ) : null}
      {params.inStockOnly && (
        <Chip onRemove={() => commit({ inStockOnly: false })}>فقط موجود</Chip>
      )}
      {params.vegan && (
        <Chip onRemove={() => commit({ vegan: false })}>گیاهی</Chip>
      )}

      <button
        type="button"
        onClick={clearAll}
        className="text-[12px] font-bold text-danger-500 hover:underline"
      >
        حذف همه فیلترها
      </button>
    </div>
  );
}
