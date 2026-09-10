import type { Product } from "@/types";
import { cn } from "@/lib/cn";
import { ProductCard } from "./ProductCard";

/**
 * Responsive product grid — 2 columns from 360px, up to 5 on wide screens.
 */
export function ProductGrid({
  products,
  priorityCount = 0,
  className,
}: {
  products: Product[];
  priorityCount?: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
        className,
      )}
    >
      {products.map((p, i) => (
        <ProductCard key={p.id} product={p} priority={i < priorityCount} />
      ))}
    </div>
  );
}
