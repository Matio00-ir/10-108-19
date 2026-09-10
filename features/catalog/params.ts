import type { CatalogQuery } from "@/types";
import { PAGE_SIZE } from "@/lib/constants";

export interface CatalogParams extends CatalogQuery {
  /** number of items currently revealed (load-more) */
  show: number;
}

type RawParams = Record<string, string | string[] | undefined>;

const list = (v: string | string[] | undefined): string[] =>
  !v ? [] : (Array.isArray(v) ? v.join(",") : v).split(",").filter(Boolean);

const num = (v: string | string[] | undefined): number | undefined => {
  const s = Array.isArray(v) ? v[0] : v;
  if (s == null || s === "") return undefined;
  const n = Number(s);
  return Number.isFinite(n) ? n : undefined;
};

/** Parse Next.js `searchParams` into a typed catalog query. */
export function parseCatalogParams(
  raw: RawParams,
  categoryPath?: string[],
): CatalogParams {
  const show = Math.max(PAGE_SIZE, num(raw.show) ?? PAGE_SIZE);
  return {
    categoryPath,
    q: (Array.isArray(raw.q) ? raw.q[0] : raw.q) || undefined,
    brands: list(raw.brands),
    minPrice: num(raw.min),
    maxPrice: num(raw.max),
    minRating: num(raw.rating),
    inStockOnly: raw.stock === "1",
    flavors: list(raw.flavor),
    forms: list(raw.form),
    vegan: raw.vegan === "1",
    sort: (Array.isArray(raw.sort) ? raw.sort[0] : raw.sort) || "popular",
    show,
    page: 1,
    pageSize: show,
  };
}

/** Build a querystring from a partial params object (drops empty values). */
export function serializeCatalogParams(p: Partial<CatalogParams>): string {
  const sp = new URLSearchParams();
  if (p.q) sp.set("q", p.q);
  if (p.brands?.length) sp.set("brands", p.brands.join(","));
  if (p.minPrice != null) sp.set("min", String(p.minPrice));
  if (p.maxPrice != null) sp.set("max", String(p.maxPrice));
  if (p.minRating) sp.set("rating", String(p.minRating));
  if (p.inStockOnly) sp.set("stock", "1");
  if (p.flavors?.length) sp.set("flavor", p.flavors.join(","));
  if (p.forms?.length) sp.set("form", p.forms.join(","));
  if (p.vegan) sp.set("vegan", "1");
  if (p.sort && p.sort !== "popular") sp.set("sort", p.sort);
  if (p.show && p.show > PAGE_SIZE) sp.set("show", String(p.show));
  const s = sp.toString();
  return s ? `?${s}` : "";
}

/** Count of filters that are actually applied (for the mobile badge). */
export function countActiveFilters(p: CatalogParams): number {
  let n = 0;
  n += p.brands?.length ?? 0;
  n += p.flavors?.length ?? 0;
  n += p.forms?.length ?? 0;
  if (p.minPrice != null || p.maxPrice != null) n += 1;
  if (p.minRating) n += 1;
  if (p.inStockOnly) n += 1;
  if (p.vegan) n += 1;
  return n;
}
