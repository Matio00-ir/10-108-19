import type { Product } from "@/types";
import { ProductCard } from "./ProductCard";

/**
 * Horizontal scroll rail used on the home + product pages. Uses native
 * scroll-snap so it works well with touch and needs no JS.
 */
export function ProductCarousel({ products }: { products: Product[] }) {
  return (
    <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1 sm:mx-0 sm:gap-4 sm:px-0">
      {products.map((p, i) => (
        <div
          key={p.id}
          className="w-[46%] shrink-0 snap-start xs:w-[42%] sm:w-56 md:w-[15rem]"
        >
          <ProductCard product={p} priority={i < 2} />
        </div>
      ))}
    </div>
  );
}
