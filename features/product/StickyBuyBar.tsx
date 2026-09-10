"use client";

import { Check, ShoppingCart } from "lucide-react";
import type { Product } from "@/types";
import { finalPrice, formatPrice } from "@/lib/format";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { useCart } from "@/features/cart/CartContext";

/** Fixed bottom purchase bar — mobile / tablet only. */
export function StickyBuyBar({ product }: { product: Product }) {
  const { add, setQty, quantityOf } = useCart();
  const inCart = quantityOf(product.id);
  const outOfStock = product.stock <= 0;
  const pay = finalPrice(product.price, product.discountPercent);

  return (
    <div className="fixed inset-x-0 bottom-0 z-[var(--z-buybar)] border-t border-neutral-200 bg-white/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-2xl items-center gap-3">
        <div className="flex flex-col leading-tight">
          {product.discountPercent > 0 && (
            <span className="text-[11px] text-neutral-400 line-through">
              {formatPrice(product.price, false)}
            </span>
          )}
          <span className="text-[15px] font-extrabold text-neutral-900">
            {formatPrice(pay)}
          </span>
        </div>

        {inCart > 0 ? (
          <QuantityStepper
            value={inCart}
            onChange={(n) => setQty(product.id, n)}
            className="ms-auto"
          />
        ) : (
          <button
            type="button"
            disabled={outOfStock}
            onClick={() => add(product.id, 1)}
            className="ms-auto flex h-12 flex-1 items-center justify-center gap-2 rounded-lg bg-accent-500 px-4 text-sm font-extrabold text-neutral-900 disabled:bg-neutral-200 disabled:text-neutral-400"
          >
            {outOfStock ? (
              "ناموجود"
            ) : (
              <>
                <ShoppingCart size={18} /> افزودن به سبد
              </>
            )}
          </button>
        )}

        {inCart > 0 && (
          <span className="flex items-center gap-1 text-[12px] font-bold text-success-600">
            <Check size={14} /> در سبد
          </span>
        )}
      </div>
    </div>
  );
}
