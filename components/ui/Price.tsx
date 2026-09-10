import { cn } from "@/lib/cn";
import { finalPrice, formatPrice, toPersianDigits } from "@/lib/format";

/**
 * Renders a price block: discounted price prominent, original struck-through,
 * plus an optional discount pill. Layout stays stable whether or not there is
 * a discount (no layout shift between cards).
 */
export function Price({
  price,
  discountPercent,
  size = "md",
  reserveDiscountRow = false,
  className,
}: {
  price: number;
  discountPercent: number;
  size?: "sm" | "md" | "lg";
  /** keep the struck-price row's height even with no discount (aligns cards) */
  reserveDiscountRow?: boolean;
  className?: string;
}) {
  const pay = finalPrice(price, discountPercent);
  const hasDiscount = discountPercent > 0;

  const payCls = {
    sm: "text-[15px]",
    md: "text-lg",
    lg: "text-2xl",
  }[size];

  return (
    <div className={cn("flex flex-col gap-0.5", className)}>
      {hasDiscount ? (
        <div className="flex h-[18px] items-center gap-2">
          <span className="text-[12px] text-neutral-400 line-through">
            {formatPrice(price, false)}
          </span>
          <span className="rounded bg-accent-500 px-1.5 py-px text-[11px] font-bold text-neutral-900">
            {toPersianDigits(discountPercent)}٪
          </span>
        </div>
      ) : reserveDiscountRow ? (
        <div className="h-[18px]" aria-hidden />
      ) : null}
      <div className={cn("font-extrabold text-neutral-900", payCls)}>
        {formatPrice(pay, false)}
        <span className="ms-1 text-[12px] font-medium text-neutral-500">
          تومان
        </span>
      </div>
    </div>
  );
}
