"use client";

import { Minus, Plus } from "lucide-react";
import { toPersianDigits } from "@/lib/format";
import { cn } from "@/lib/cn";

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
  size = "md",
  className,
}: {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "md";
  className?: string;
}) {
  const btn =
    size === "sm"
      ? "size-8"
      : "size-10 sm:size-11";
  const clamp = (n: number) => Math.max(min, Math.min(max, n));

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-md border border-neutral-300 bg-white",
        className,
      )}
    >
      <button
        type="button"
        aria-label="کاهش تعداد"
        onClick={() => onChange(clamp(value - 1))}
        disabled={value <= min}
        className={cn(
          "flex items-center justify-center rounded-r-md text-neutral-600 hover:bg-neutral-100 disabled:opacity-40",
          btn,
        )}
      >
        <Minus size={16} />
      </button>
      <span
        className={cn(
          "min-w-9 text-center text-sm font-bold text-neutral-900 tabular-nums",
        )}
        aria-live="polite"
      >
        {toPersianDigits(value)}
      </span>
      <button
        type="button"
        aria-label="افزایش تعداد"
        onClick={() => onChange(clamp(value + 1))}
        disabled={value >= max}
        className={cn(
          "flex items-center justify-center rounded-l-md text-neutral-600 hover:bg-neutral-100 disabled:opacity-40",
          btn,
        )}
      >
        <Plus size={16} />
      </button>
    </div>
  );
}
