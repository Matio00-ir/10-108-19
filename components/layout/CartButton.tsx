"use client";

import { ShoppingCart } from "lucide-react";
import { toPersianDigits } from "@/lib/format";
import { fa } from "@/lib/dictionary/fa";
import { useCart } from "@/features/cart/CartContext";
import { cn } from "@/lib/cn";

export function CartButton({ variant = "full" }: { variant?: "full" | "icon" }) {
  const { totals, openMiniCart, hydrated } = useCart();
  const count = hydrated ? totals.itemCount : 0;

  return (
    <button
      type="button"
      onClick={openMiniCart}
      aria-label={`${fa.header.cart}${count ? ` (${toPersianDigits(count)})` : ""}`}
      className={cn(
        "relative flex items-center gap-2 rounded-lg font-bold text-neutral-700 transition-colors hover:bg-neutral-100",
        variant === "full" ? "h-11 px-3 text-[13px]" : "size-11 justify-center",
      )}
    >
      <span className="relative">
        <ShoppingCart size={22} />
        {count > 0 && (
          <span className="absolute -end-2 -top-2 flex min-w-[18px] items-center justify-center rounded-full bg-accent-500 px-1 text-[10px] font-extrabold text-neutral-900">
            {toPersianDigits(count)}
          </span>
        )}
      </span>
      {variant === "full" && <span className="hidden lg:inline">{fa.header.cart}</span>}
    </button>
  );
}
