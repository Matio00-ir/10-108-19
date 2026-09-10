"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import type { CatalogFacets } from "@/types";
import { formatPrice, toPersianDigits } from "@/lib/format";
import { Accordion } from "@/components/ui/Accordion";
import { cn } from "@/lib/cn";
import { useCatalogParams } from "./useCatalogParams";

function CheckRow({
  checked,
  onChange,
  label,
  count,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
  count?: number;
}) {
  return (
    <label className="flex min-h-9 cursor-pointer items-center gap-2.5 py-1 text-[13px] text-neutral-600">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="size-4 shrink-0 rounded border-neutral-300 accent-primary-600"
      />
      <span className="flex-1">{label}</span>
      {count != null && (
        <span className="text-[11px] text-neutral-400">
          {toPersianDigits(count)}
        </span>
      )}
    </label>
  );
}

export function FilterPanel({ facets }: { facets: CatalogFacets }) {
  const { params, commit, toggleInArray } = useCatalogParams();
  const [minInput, setMinInput] = useState(
    params.minPrice != null ? String(params.minPrice) : "",
  );
  const [maxInput, setMaxInput] = useState(
    params.maxPrice != null ? String(params.maxPrice) : "",
  );

  return (
    <div className="divide-y divide-neutral-200">
      <label className="flex min-h-11 items-center justify-between gap-2 py-3 text-sm font-bold text-neutral-800">
        فقط کالاهای موجود
        <input
          type="checkbox"
          checked={!!params.inStockOnly}
          onChange={() => commit({ inStockOnly: !params.inStockOnly })}
          className="size-5 rounded border-neutral-300 accent-primary-600"
        />
      </label>

      <Accordion title="محدوده قیمت (تومان)" defaultOpen>
        <div className="flex items-center gap-2 pt-1">
          <input
            inputMode="numeric"
            value={minInput}
            onChange={(e) => setMinInput(e.target.value.replace(/\D/g, ""))}
            placeholder="از"
            className="h-10 w-full rounded-md border border-neutral-300 px-2 text-[13px] outline-none focus:border-primary-400"
          />
          <span className="text-neutral-300">—</span>
          <input
            inputMode="numeric"
            value={maxInput}
            onChange={(e) => setMaxInput(e.target.value.replace(/\D/g, ""))}
            placeholder="تا"
            className="h-10 w-full rounded-md border border-neutral-300 px-2 text-[13px] outline-none focus:border-primary-400"
          />
        </div>
        <button
          type="button"
          onClick={() =>
            commit({
              minPrice: minInput ? Number(minInput) : undefined,
              maxPrice: maxInput ? Number(maxInput) : undefined,
            })
          }
          className="mt-2 h-9 w-full rounded-md bg-neutral-100 text-[13px] font-bold text-neutral-700 hover:bg-neutral-200"
        >
          اعمال قیمت
        </button>
        <p className="mt-2 text-[11px] text-neutral-400">
          بازه موجود: {formatPrice(facets.priceRange.min, false)} تا{" "}
          {formatPrice(facets.priceRange.max, false)}
        </p>
      </Accordion>

      <Accordion title="امتیاز" defaultOpen>
        <div className="space-y-1 pt-1">
          {[4, 3].map((r) => (
            <label
              key={r}
              className="flex min-h-9 cursor-pointer items-center gap-2 py-1 text-[13px] text-neutral-600"
            >
              <input
                type="radio"
                name="rating"
                checked={params.minRating === r}
                onChange={() => commit({ minRating: r })}
                className="size-4 accent-primary-600"
              />
              <span className="flex items-center gap-1">
                <Star size={14} className="fill-accent-500 text-accent-500" />
                {toPersianDigits(r)} به بالا
              </span>
            </label>
          ))}
          {params.minRating ? (
            <button
              type="button"
              onClick={() => commit({ minRating: undefined })}
              className="mt-1 text-[12px] font-bold text-primary-700"
            >
              حذف فیلتر امتیاز
            </button>
          ) : null}
        </div>
      </Accordion>

      {facets.brands.length > 0 && (
        <Accordion title="برند" defaultOpen>
          <div className="max-h-56 space-y-0.5 overflow-y-auto pt-1 pe-2">
            {facets.brands.map((b) => (
              <CheckRow
                key={b.value}
                label={b.label}
                count={b.count}
                checked={!!params.brands?.includes(b.value)}
                onChange={() => toggleInArray("brands", b.value)}
              />
            ))}
          </div>
        </Accordion>
      )}

      {facets.forms.length > 0 && (
        <Accordion title="شکل محصول">
          <div className="space-y-0.5 pt-1">
            {facets.forms.map((f) => (
              <CheckRow
                key={f.value}
                label={f.label}
                count={f.count}
                checked={!!params.forms?.includes(f.value)}
                onChange={() => toggleInArray("forms", f.value)}
              />
            ))}
          </div>
        </Accordion>
      )}

      {facets.flavors.length > 0 && (
        <Accordion title="طعم">
          <div className="max-h-52 space-y-0.5 overflow-y-auto pt-1 pe-2">
            {facets.flavors.map((f) => (
              <CheckRow
                key={f.value}
                label={f.label}
                count={f.count}
                checked={!!params.flavors?.includes(f.value)}
                onChange={() => toggleInArray("flavors", f.value)}
              />
            ))}
          </div>
        </Accordion>
      )}

      <label className="flex min-h-11 items-center justify-between gap-2 py-3 text-sm font-bold text-neutral-800">
        مناسب برای گیاه‌خواران
        <input
          type="checkbox"
          checked={!!params.vegan}
          onChange={() => commit({ vegan: !params.vegan })}
          className={cn("size-5 rounded border-neutral-300 accent-success-600")}
        />
      </label>
    </div>
  );
}
