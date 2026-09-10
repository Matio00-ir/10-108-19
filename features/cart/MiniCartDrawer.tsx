"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { ROUTES, FREE_SHIPPING_THRESHOLD } from "@/lib/constants";
import { formatPrice, toPersianDigits } from "@/lib/format";
import { fa } from "@/lib/dictionary/fa";
import { Drawer } from "@/components/ui/Drawer";
import { buttonClasses } from "@/components/ui/Button";
import { useCart } from "./CartContext";
import { CartLineItem } from "./CartLineItem";

export function MiniCartDrawer() {
  const { miniCartOpen, closeMiniCart, lines, totals } = useCart();

  const progress = Math.min(
    100,
    Math.round((totals.payable / FREE_SHIPPING_THRESHOLD) * 100),
  );

  return (
    <Drawer
      open={miniCartOpen}
      onClose={closeMiniCart}
      side="end"
      title={`${fa.header.cart} (${toPersianDigits(totals.itemCount)})`}
      widthClass="w-[92vw] max-w-md"
    >
      {lines.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
          <span className="flex size-14 items-center justify-center rounded-full bg-primary-50 text-primary-600">
            <ShoppingBag size={24} />
          </span>
          <p className="mt-4 font-bold text-neutral-800">{fa.cart.empty}</p>
          <p className="mt-1 text-sm text-neutral-500">{fa.cart.emptyBody}</p>
          <button
            type="button"
            onClick={closeMiniCart}
            className={buttonClasses({
              variant: "secondary",
              className: "mt-5",
            })}
          >
            {fa.common.continueShopping}
          </button>
        </div>
      ) : (
        <div className="flex h-full flex-col">
          <div className="border-b border-neutral-100 bg-neutral-50 px-4 py-3">
            {totals.freeShippingRemaining > 0 ? (
              <p className="text-[12px] text-neutral-600">
                {fa.cart.freeShippingProgress(
                  formatPrice(totals.freeShippingRemaining),
                )}
              </p>
            ) : (
              <p className="text-[12px] font-bold text-success-600">
                {fa.cart.freeShippingReached}
              </p>
            )}
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-neutral-200">
              <div
                className="h-full rounded-full bg-success-500 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-4">
            {lines.map((line) => (
              <CartLineItem key={line.product.id} line={line} compact />
            ))}
          </div>

          <div className="border-t border-neutral-200 bg-white p-4">
            <div className="mb-3 flex items-center justify-between text-sm">
              <span className="text-neutral-500">{fa.cart.total}</span>
              <span className="text-lg font-extrabold text-primary-800">
                {formatPrice(totals.total)}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Link
                href={ROUTES.cart}
                onClick={closeMiniCart}
                className={buttonClasses({ variant: "outline" })}
              >
                {fa.cart.title}
              </Link>
              <Link
                href={ROUTES.checkout}
                onClick={closeMiniCart}
                className={buttonClasses({ variant: "secondary" })}
              >
                {fa.cart.checkout}
              </Link>
            </div>
          </div>
        </div>
      )}
    </Drawer>
  );
}
