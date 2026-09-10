import type {
  CatalogFacets,
  CatalogQuery,
  FacetValue,
  Paginated,
  Product,
} from "@/types";
import { finalPrice } from "@/lib/format";
import { PAGE_SIZE } from "@/lib/constants";
import { getBrandByIdSync } from "@/data/brands";

/** Price a customer actually pays (after discount). */
export function payPrice(p: Product): number {
  return finalPrice(p.price, p.discountPercent);
}

function matchesText(p: Product, q: string): boolean {
  const needle = q.trim().toLowerCase();
  if (!needle) return true;
  const brand = getBrandByIdSync(p.brandId);
  const haystack = [
    p.name,
    p.shortDescription,
    p.attributes.flavor,
    p.attributes.form,
    p.categoryPath.join(" "),
    brand?.name,
    brand?.nameEn,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return needle.split(/\s+/).every((token) => haystack.includes(token));
}

function applyFilters(list: Product[], q: CatalogQuery): Product[] {
  return list.filter((p) => {
    if (q.categoryPath?.length) {
      const path = q.categoryPath;
      const ok = path.every((seg, i) => p.categoryPath[i] === seg);
      if (!ok) return false;
    }
    if (q.q && !matchesText(p, q.q)) return false;
    if (q.brands?.length && !q.brands.includes(p.brandId)) return false;
    const price = payPrice(p);
    if (q.minPrice != null && price < q.minPrice) return false;
    if (q.maxPrice != null && price > q.maxPrice) return false;
    if (q.minRating != null && p.rating < q.minRating) return false;
    if (q.inStockOnly && p.stock <= 0) return false;
    if (q.vegan && !p.attributes.vegan) return false;
    if (q.flavors?.length) {
      if (!p.attributes.flavor || !q.flavors.includes(p.attributes.flavor))
        return false;
    }
    if (q.forms?.length) {
      if (!p.attributes.form || !q.forms.includes(p.attributes.form))
        return false;
    }
    return true;
  });
}

function sortProducts(list: Product[], sort?: string): Product[] {
  const arr = [...list];
  switch (sort) {
    case "newest":
      return arr.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
    case "cheapest":
      return arr.sort((a, b) => payPrice(a) - payPrice(b));
    case "expensive":
      return arr.sort((a, b) => payPrice(b) - payPrice(a));
    case "rating":
      return arr.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
    case "discount":
      return arr.sort((a, b) => b.discountPercent - a.discountPercent);
    case "popular":
    default:
      return arr.sort(
        (a, b) =>
          Number(!!b.flags.bestSeller) - Number(!!a.flags.bestSeller) ||
          b.reviewCount - a.reviewCount,
      );
  }
}

export function runQuery(
  source: Product[],
  q: CatalogQuery,
): Paginated<Product> {
  const filtered = sortProducts(applyFilters(source, q), q.sort);
  const page = Math.max(1, q.page ?? 1);
  const pageSize = q.pageSize ?? PAGE_SIZE;
  const start = (page - 1) * pageSize;
  const items = filtered.slice(start, start + pageSize);
  return {
    items,
    total: filtered.length,
    page,
    pageSize,
    hasMore: start + pageSize < filtered.length,
  };
}

/** Facet counts computed against everything matching the query EXCEPT the
 *  facet being counted (so a facet never zeroes itself out). */
export function computeFacets(
  source: Product[],
  q: CatalogQuery,
): CatalogFacets {
  const base = applyFilters(source, {
    categoryPath: q.categoryPath,
    q: q.q,
    inStockOnly: q.inStockOnly,
    minRating: q.minRating,
  });

  const countBy = (
    getKey: (p: Product) => string | undefined,
    label: (k: string) => string,
  ): FacetValue[] => {
    const map = new Map<string, number>();
    for (const p of base) {
      const k = getKey(p);
      if (!k) continue;
      map.set(k, (map.get(k) ?? 0) + 1);
    }
    return [...map.entries()]
      .map(([value, count]) => ({ value, label: label(value), count }))
      .sort((a, b) => b.count - a.count);
  };

  const prices = base.map(payPrice);
  return {
    brands: countBy(
      (p) => p.brandId,
      (id) => getBrandByIdSync(id)?.name ?? id,
    ),
    flavors: countBy(
      (p) => p.attributes.flavor,
      (k) => k,
    ),
    forms: countBy(
      (p) => p.attributes.form,
      (k) => k,
    ),
    priceRange: {
      min: prices.length ? Math.min(...prices) : 0,
      max: prices.length ? Math.max(...prices) : 0,
    },
  };
}
