"use client";

import { Plus } from "lucide-react";
import { toPersianDigits } from "@/lib/format";
import { buttonClasses } from "@/components/ui/Button";
import { useCatalogParams } from "./useCatalogParams";

export function LoadMore({ shown, total }: { shown: number; total: number }) {
  const { loadMore } = useCatalogParams();
  if (shown >= total) return null;

  return (
    <div className="mt-8 flex flex-col items-center gap-3">
      <p className="text-[12px] text-neutral-400">
        {toPersianDigits(shown)} از {toPersianDigits(total)} کالا
      </p>
      <div className="h-1 w-40 overflow-hidden rounded-full bg-neutral-200">
        <div
          className="h-full rounded-full bg-primary-500"
          style={{ width: `${(shown / total) * 100}%` }}
        />
      </div>
      <button
        type="button"
        onClick={loadMore}
        className={buttonClasses({ variant: "outline", className: "mt-1" })}
      >
        <Plus size={16} />
        نمایش محصولات بیشتر
      </button>
    </div>
  );
}
