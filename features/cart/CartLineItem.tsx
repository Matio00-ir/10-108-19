"use client";

import Link from "next/link";
import { Trash2 } from "lucide-react";
import type { CartLine } from "@/types";
import { ROUTES } from "@/lib/constants";
import { formatPrice, toPersianDigits } from "@/lib/format";
import { getBrandByIdSync } from "@/data/brands";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { ProductImage } from "@/components/product/ProductImage";
import { useCart } from "./CartContext";
import { cn } from "@/lib/cn";

export function CartLineItem({
  line,
  compact = false,
}: {
  line: CartLine;
  compact?: boolean;
}) {
  const { setQty, remove } = useCart();
  const { product, quantity, unitPrice, lineTotal } = line;
  const brand = getBrandByIdSync(product.brandId);

  return (
    <div
      className={cn(
        "flex gap-3",
        compact ? "py-3" : "py-4",
        "border-b border-neutral-100 last:border-0",
      )}
    >
      <Link
        href={ROUTES.product(product.slug)}
        className={cn(
          "shrink-0 overflow-hidden rounded-md border border-neutral-200 bg-white",
          compact ? "size-16" : "size-20 sm:size-24",
        )}
      >
        <ProductImage
          src={product.images[0]}
          alt={product.name}
          packaging={product.packaging}
          brandText={brand?.logoText}
          sizes="96px"
        />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col">
        {brand && (
          <span className="text-[11px] font-semibold text-neutral-400">
            {brand.name}
          </span>
        )}
        <Link
          href={ROUTES.product(product.slug)}
          className={cn(
            "font-bold text-neutral-800 hover:text-primary-700",
            compact ? "text-[12px] clamp-2" : "text-[13px] clamp-2 sm:text-sm",
          )}
        >
          {product.name}
        </Link>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-2">
          <QuantityStepper
            value={quantity}
            onChange={(n) => setQty(product.id, n)}
            size="sm"
          />
          <div className="flex items-center gap-2">
            <span className="text-[13px] font-extrabold text-neutral-900">
              {formatPrice(lineTotal)}
            </span>
            <button
              type="button"
              onClick={() => remove(product.id)}
              aria-label="حذف از سبد"
              className="flex size-8 items-center justify-center rounded-md text-neutral-400 hover:bg-danger-50 hover:text-danger-500"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
        {quantity > 1 && (
          <span className="pt-1 text-[11px] text-neutral-400">
            هر عدد {toPersianDigits(formatPrice(unitPrice, false))} تومان
          </span>
        )}
      </div>
    </div>
  );
}
