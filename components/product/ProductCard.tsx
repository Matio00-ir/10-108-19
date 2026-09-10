import Link from "next/link";
import type { Product } from "@/types";
import { getBrandByIdSync } from "@/data/brands";
import { ROUTES } from "@/lib/constants";
import { toPersianDigits } from "@/lib/format";
import { cn } from "@/lib/cn";
import { Rating } from "@/components/ui/Rating";
import { Price } from "@/components/ui/Price";
import { ProductImage } from "./ProductImage";
import { AddToCartButton } from "@/features/cart/AddToCartButton";

export function ProductCard({
  product,
  priority = false,
  className,
}: {
  product: Product;
  priority?: boolean;
  className?: string;
}) {
  const brand = getBrandByIdSync(product.brandId);
  const href = ROUTES.product(product.slug);
  const outOfStock = product.stock <= 0;
  const lowStock = product.stock > 0 && product.stock <= 5;

  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-lg border border-neutral-200 bg-white transition-shadow duration-200 hover:shadow-card-hover",
        className,
      )}
    >
      {/* fixed-height rows below keep every card the same height (no dead space) */}
      <div className="relative">
        <div className="absolute inset-x-0 top-0 z-10 flex items-start justify-between p-2">
          <div className="flex flex-col gap-1">
            {product.discountPercent > 0 && (
              <span className="rounded-md bg-accent-500 px-1.5 py-0.5 text-[11px] font-extrabold text-neutral-900">
                {toPersianDigits(product.discountPercent)}٪ تخفیف
              </span>
            )}
            {product.flags.bestSeller && (
              <span className="rounded-md bg-primary-600 px-1.5 py-0.5 text-[11px] font-bold text-white">
                پرفروش
              </span>
            )}
            {product.flags.isNew && !product.flags.bestSeller && (
              <span className="rounded-md bg-success-500 px-1.5 py-0.5 text-[11px] font-bold text-white">
                جدید
              </span>
            )}
          </div>
        </div>

        <Link href={href} tabIndex={-1} aria-hidden className="block">
          <ProductImage
            src={product.images[0]}
            alt={product.name}
            packaging={product.packaging}
            brandText={brand?.logoText}
            name={product.name}
            priority={priority}
            className="transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </Link>
      </div>

      <div className="flex flex-col p-3">
        <span className="h-4 truncate text-[12px] font-semibold text-neutral-400">
          {brand?.name ?? " "}
        </span>
        <h3 className="mt-1 min-h-10 text-[13px] font-bold leading-6 text-neutral-800 clamp-2 sm:text-sm">
          <Link href={href} className="outline-none hover:text-primary-700">
            {product.name}
          </Link>
        </h3>

        <div className="mt-1.5 h-5">
          <Rating
            value={product.rating}
            count={product.reviewCount}
            size={12}
            compact
          />
        </div>

        <div className="mt-2 h-5 text-[12px] font-bold">
          {outOfStock ? (
            <span className="text-danger-500">ناموجود</span>
          ) : lowStock ? (
            <span className="text-accent-700">
              تنها {toPersianDigits(product.stock)} عدد باقی مانده
            </span>
          ) : (
            <span className="font-semibold text-success-600">موجود در انبار</span>
          )}
        </div>

        <Price
          price={product.price}
          discountPercent={product.discountPercent}
          size="sm"
          reserveDiscountRow
          className="mt-1.5"
        />

        <AddToCartButton
          productId={product.id}
          disabled={outOfStock}
          size="sm"
          className="mt-3 w-full"
        />
      </div>
    </article>
  );
}
