"use client";

import Link from "next/link";
import { ArrowRight, ShoppingBag, Trash2 } from "lucide-react";
import { ROUTES } from "@/lib/constants";
import { toPersianDigits } from "@/lib/format";
import { fa } from "@/lib/dictionary/fa";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { ProductGridSkeleton } from "@/components/ui/Skeleton";
import { useCart } from "@/features/cart/CartContext";
import { CartLineItem } from "@/features/cart/CartLineItem";
import { CartSummary } from "@/features/cart/CartSummary";

export default function CartPage() {
  const { lines, totals, clear, hydrated } = useCart();

  if (!hydrated) {
    return (
      <Container className="py-6">
        <div className="h-8 w-40 animate-pulse rounded bg-neutral-200" />
        <div className="mt-6">
          <ProductGridSkeleton count={3} />
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-4 sm:py-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-extrabold text-neutral-900 sm:text-2xl">
          {fa.cart.title}
          {lines.length > 0 && (
            <span className="ms-2 text-sm font-bold text-neutral-400">
              {toPersianDigits(totals.itemCount)} کالا
            </span>
          )}
        </h1>
        {lines.length > 0 && (
          <button
            type="button"
            onClick={clear}
            className="flex items-center gap-1.5 text-[13px] font-bold text-danger-500 hover:underline"
          >
            <Trash2 size={15} /> خالی کردن سبد
          </button>
        )}
      </div>

      {lines.length === 0 ? (
        <div className="mt-6">
          <EmptyState
            icon={ShoppingBag}
            title={fa.cart.empty}
            description={fa.cart.emptyBody}
            action={{ label: fa.common.continueShopping, href: ROUTES.home }}
          />
        </div>
      ) : (
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_340px]">
          <div>
            <div className="rounded-xl border border-neutral-200 bg-white px-4">
              {lines.map((line) => (
                <CartLineItem key={line.product.id} line={line} />
              ))}
            </div>
            <Link
              href={ROUTES.home}
              className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-bold text-primary-700 hover:underline"
            >
              <ArrowRight size={16} />
              {fa.common.continueShopping}
            </Link>
          </div>

          <div className="lg:sticky lg:top-40 lg:self-start">
            <CartSummary totals={totals} cta="checkout" />
          </div>
        </div>
      )}
    </Container>
  );
}
