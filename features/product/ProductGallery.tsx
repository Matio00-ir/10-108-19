"use client";

import { useState } from "react";
import type { Packaging } from "@/types";
import { cn } from "@/lib/cn";
import { ProductImage } from "@/components/product/ProductImage";

export function ProductGallery({
  images,
  name,
  packaging,
  brandText,
  discountPercent,
}: {
  images: string[];
  name: string;
  packaging: Packaging;
  brandText?: string;
  discountPercent?: number;
}) {
  const list = images.length ? images : [""];
  const [active, setActive] = useState(0);

  return (
    <div className="md:flex md:gap-3">
      {/* Thumbnails — vertical on desktop, hidden on mobile (uses dots instead) */}
      {list.length > 1 && (
        <div className="order-first hidden shrink-0 flex-col gap-2 md:flex">
          {list.map((src, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`تصویر ${i + 1}`}
              className={cn(
                "size-16 overflow-hidden rounded-lg border-2 bg-white transition-colors",
                i === active
                  ? "border-primary-500"
                  : "border-neutral-200 hover:border-neutral-300",
              )}
            >
              <ProductImage
                src={src}
                alt={`${name} ${i + 1}`}
                packaging={packaging}
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}

      <div className="min-w-0 flex-1">
        <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-white">
          {discountPercent ? (
            <span className="absolute start-3 top-3 z-10 rounded-md bg-accent-500 px-2 py-1 text-[12px] font-extrabold text-neutral-900">
              {discountPercent}٪ تخفیف
            </span>
          ) : null}

          {/* Mobile: horizontal snap slider. Desktop: single active image. */}
          <div className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto md:hidden">
            {list.map((src, i) => (
              <div key={i} className="w-full shrink-0 snap-center">
                <ProductImage
                  src={src}
                  alt={`${name} ${i + 1}`}
                  packaging={packaging}
                  brandText={brandText}
                  name={name}
                  priority={i === 0}
                  sizes="(max-width: 1024px) 100vw, 520px"
                  className="!aspect-square"
                />
              </div>
            ))}
          </div>
          <div className="hidden md:block">
            <ProductImage
              src={list[active]}
              alt={name}
              packaging={packaging}
              brandText={brandText}
              name={name}
              priority
              sizes="520px"
            />
          </div>
        </div>

        {/* Mobile dots */}
        {list.length > 1 && (
          <div className="mt-3 flex justify-center gap-1.5 md:hidden">
            {list.map((_, i) => (
              <span
                key={i}
                className="size-1.5 rounded-full bg-neutral-300"
                aria-hidden
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
