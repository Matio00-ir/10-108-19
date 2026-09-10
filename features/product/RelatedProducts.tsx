import type { Product } from "@/types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCarousel } from "@/components/product/ProductCarousel";
import { fa } from "@/lib/dictionary/fa";

export function RelatedProducts({ products }: { products: Product[] }) {
  if (!products.length) return null;
  return (
    <section className="mt-10">
      <SectionHeading title={fa.product.related} />
      <ProductCarousel products={products} />
    </section>
  );
}
