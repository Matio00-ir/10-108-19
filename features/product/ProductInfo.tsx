"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BadgeCheck,
  Check,
  ShieldCheck,
  ShoppingCart,
  Truck,
} from "lucide-react";
import type { Brand, Product } from "@/types";
import { formatPrice, savedAmount } from "@/lib/format";
import { fa } from "@/lib/dictionary/fa";
import { Rating } from "@/components/ui/Rating";
import { Price } from "@/components/ui/Price";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { buttonClasses } from "@/components/ui/Button";
import { useCart } from "@/features/cart/CartContext";
import { cn } from "@/lib/cn";

export function ProductInfo({
  product,
  brand,
}: {
  product: Product;
  brand?: Brand;
}) {
  const { add, setQty, quantityOf } = useCart();
  const inCart = quantityOf(product.id);
  const [qty, setLocalQty] = useState(1);
  const outOfStock = product.stock <= 0;
  const lowStock = product.stock > 0 && product.stock <= 5;

  const keyFacts = [
    brand && { label: "برند", value: brand.name },
    product.attributes.size && { label: "حجم / تعداد", value: product.attributes.size },
    product.attributes.flavor && { label: "طعم", value: product.attributes.flavor },
    product.attributes.form && { label: "شکل", value: product.attributes.form },
    product.attributes.madeIn && { label: "کشور سازنده", value: product.attributes.madeIn },
    product.attributes.suitableFor?.length && {
      label: "مناسب برای",
      value: product.attributes.suitableFor.join("، "),
    },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <div className="md:rounded-2xl md:border md:border-neutral-200 md:bg-white md:p-5">
      {brand && (
        <Link
          href={`/search?q=${encodeURIComponent(brand.name)}`}
          className="text-[13px] font-bold text-primary-700 hover:underline"
        >
          {brand.name}
        </Link>
      )}
      <h1 className="mt-1 text-lg font-extrabold leading-8 text-neutral-900 sm:text-xl">
        {product.name}
      </h1>

      <div className="mt-2 flex items-center gap-3">
        <Rating value={product.rating} size={15} />
        <a
          href="#reviews"
          className="text-[12px] font-semibold text-primary-700 hover:underline"
        >
          مشاهده {product.reviewCount.toLocaleString("fa-IR")} دیدگاه
        </a>
      </div>

      <div className="my-4 border-t border-dashed border-neutral-200" />

      {/* key facts */}
      <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-[12.5px]">
        {keyFacts.map((f) => (
          <div key={f.label} className="flex gap-1.5">
            <dt className="shrink-0 text-neutral-400">{f.label}:</dt>
            <dd className="font-semibold text-neutral-700">{f.value}</dd>
          </div>
        ))}
      </dl>

      <div className="my-4 border-t border-dashed border-neutral-200" />

      <Price
        price={product.price}
        discountPercent={product.discountPercent}
        size="lg"
      />
      {product.discountPercent > 0 && (
        <p className="mt-1 text-[12px] font-bold text-success-600">
          سود شما از این خرید:{" "}
          {formatPrice(savedAmount(product.price, product.discountPercent))}
        </p>
      )}

      <div className="mt-3">
        {outOfStock ? (
          <span className="inline-flex items-center gap-1.5 rounded-md bg-danger-50 px-2.5 py-1.5 text-[12px] font-bold text-danger-600">
            فعلاً ناموجود
          </span>
        ) : lowStock ? (
          <span className="inline-flex items-center gap-1.5 rounded-md bg-accent-50 px-2.5 py-1.5 text-[12px] font-bold text-accent-700">
            تنها {product.stock.toLocaleString("fa-IR")} عدد در انبار
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 rounded-md bg-success-50 px-2.5 py-1.5 text-[12px] font-bold text-success-700">
            <Check size={14} /> موجود در انبار
          </span>
        )}
      </div>

      {/* buy row */}
      <div className="mt-4">
        {inCart > 0 ? (
          <div className="flex items-center gap-3">
            <QuantityStepper
              value={inCart}
              onChange={(n) => setQty(product.id, n)}
            />
            <span className="flex items-center gap-1 text-[13px] font-bold text-success-600">
              <Check size={15} /> در سبد خرید شما
            </span>
          </div>
        ) : (
          <div className="flex items-stretch gap-3">
            <QuantityStepper
              value={qty}
              onChange={setLocalQty}
              max={Math.max(1, Math.min(10, product.stock))}
            />
            <button
              type="button"
              disabled={outOfStock}
              onClick={() => add(product.id, qty)}
              className={buttonClasses({
                variant: outOfStock ? "outline" : "primary",
                size: "lg",
                className: cn("flex-1", outOfStock && "cursor-not-allowed"),
              })}
            >
              <ShoppingCart size={18} />
              {outOfStock ? "ناموجود" : "افزودن به سبد خرید"}
            </button>
          </div>
        )}
      </div>

      {/* trust */}
      <ul className="mt-5 space-y-2.5 text-[12px] text-neutral-600">
        <li className="flex items-center gap-2">
          <BadgeCheck size={16} className="text-success-500" />
          {fa.product.guarantee}
        </li>
        <li className="flex items-center gap-2">
          <Truck size={16} className="text-primary-500" />
          {fa.product.fastShip}
        </li>
        <li className="flex items-center gap-2">
          <ShieldCheck size={16} className="text-primary-500" />
          {fa.product.securePay}
        </li>
      </ul>
    </div>
  );
}
