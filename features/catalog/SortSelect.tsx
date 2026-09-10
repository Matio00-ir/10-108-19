"use client";

import { ArrowDownWideNarrow } from "lucide-react";
import { SORT_OPTIONS } from "@/lib/constants";
import { useCatalogParams } from "./useCatalogParams";

export function SortSelect() {
  const { params, commit } = useCatalogParams();
  return (
    <label className="flex h-10 items-center gap-2 rounded-md border border-neutral-300 bg-white ps-3 pe-1 text-[13px]">
      <ArrowDownWideNarrow size={16} className="shrink-0 text-neutral-400" />
      <span className="shrink-0 text-neutral-500">مرتب‌سازی:</span>
      <select
        value={params.sort ?? "popular"}
        onChange={(e) => commit({ sort: e.target.value }, { keepShow: true })}
        aria-label="مرتب‌سازی محصولات"
        className="h-full cursor-pointer bg-transparent pe-2 font-bold text-neutral-800 outline-none"
      >
        {SORT_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
