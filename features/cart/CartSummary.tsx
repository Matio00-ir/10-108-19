"use client";

import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import type { CartTotals } from "@/types";
import { ROUTES } from "@/lib/constants";
import { formatPrice } from "@/lib/format";
import { fa } from "@/lib/dictionary/fa";
import { buttonClasses } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

export function CartSummary({
  totals,
  cta,
  className,
}: {
  totals: CartTotals;
  /** which action button to show under the summary */
  cta?: "checkout" | "placeOrder" | "none";
  className?: string;
}) {
  const row = "flex items-center justify-between text-sm";
  return (
    <div
      className={cn(
        "rounded-xl border border-neutral-200 bg-white p-4 sm:p-5",
        className,
      )}
    >
      <h2 className="mb-3 text-base font-extrabold text-neutral-900">
        {fa.checkout.summary}
      </h2>

      <div className="space-y-2.5">
        <div className={row}>
          <span className="text-neutral-500">{fa.cart.subtotal}</span>
          <span className="font-bold text-neutral-800">
            {formatPrice(totals.subtotal)}
          </span>
        </div>
        {totals.discount > 0 && (
          <div className={row}>
            <span className="text-neutral-500">{fa.cart.discount}</span>
            <span className="font-bold text-success-600">
              −{formatPrice(totals.discount)}
            </span>
          </div>
        )}
        <div className={row}>
          <span className="text-neutral-500">{fa.cart.shipping}</span>
          <span className="font-bold text-neutral-800">
            {totals.shipping === 0 ? (
              <span className="text-success-600">{fa.cart.shippingFree}</span>
            ) : (
              formatPrice(totals.shipping)
            )}
          </span>
        </div>
      </div>

      <div className="my-3 border-t border-dashed border-neutral-200" />

      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-neutral-700">
          {fa.cart.total}
        </span>
        <span className="text-lg font-extrabold text-primary-800">
          {formatPrice(totals.total)}
        </span>
      </div>

      {cta === "checkout" && (
        <Link
          href={ROUTES.checkout}
          className={buttonClasses({
            variant: "secondary",
            size: "lg",
            fullWidth: true,
            className: "mt-4",
          })}
        >
          {fa.cart.checkout}
        </Link>
      )}

      <p className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-neutral-400">
        <ShieldCheck size={13} /> پرداخت امن از طریق درگاه‌های بانکی
      </p>
    </div>
  );
}
