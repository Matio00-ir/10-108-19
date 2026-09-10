import { Star } from "lucide-react";
import { cn } from "@/lib/cn";
import { faCount, toPersianDigits } from "@/lib/format";

/** Read-only star rating with optional review count. */
export function Rating({
  value,
  count,
  size = 14,
  showValue = true,
  compact = false,
  className,
}: {
  value: number;
  count?: number;
  size?: number;
  showValue?: boolean;
  /** tighter spacing + "(۹۸۰)" instead of "(۹۸۰ دیدگاه)" — for product cards */
  compact?: boolean;
  className?: string;
}) {
  const pct = Math.max(0, Math.min(100, (value / 5) * 100));
  return (
    <div
      className={cn(
        "flex min-w-0 items-center",
        compact ? "gap-1" : "gap-1.5",
        className,
      )}
    >
      <span
        className="relative inline-flex shrink-0"
        style={{ width: size * 5 + 8, height: size }}
        aria-hidden
      >
        <span className="absolute inset-0 flex gap-0.5 text-neutral-300">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={size} strokeWidth={2} />
          ))}
        </span>
        <span
          className="absolute inset-0 flex gap-0.5 overflow-hidden text-accent-500"
          style={{ width: `calc(${pct}% )` }}
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={size} strokeWidth={2} fill="currentColor" />
          ))}
        </span>
      </span>
      {showValue && (
        <span className="shrink-0 text-[12px] font-bold text-neutral-700">
          {toPersianDigits(value.toFixed(1))}
        </span>
      )}
      {count != null && (
        <span className="truncate text-[11px] text-neutral-400">
          {compact ? `(${faCount(count)})` : `(${faCount(count)} دیدگاه)`}
        </span>
      )}
    </div>
  );
}
