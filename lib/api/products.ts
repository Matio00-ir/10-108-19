import "server-only";
import type { CatalogFacets, CatalogQuery, Paginated, Product } from "@/types";
import { products } from "@/data/products";
import { computeFacets, runQuery } from "./query";

/**
 * Data-access layer. Today it reads the in-memory mock catalog; swapping the
 * body of these functions for real `fetch`/SQL calls is the only change needed
 * when a backend is added. Signatures and return shapes stay identical.
 */

export async function getProducts(
  query: CatalogQuery = {},
): Promise<Paginated<Product>> {
  return runQuery(products, query);
}

export async function getCatalogFacets(
  query: CatalogQuery = {},
): Promise<CatalogFacets> {
  return computeFacets(products, query);
}

export async function getProductBySlug(
  slug: string,
): Promise<Product | undefined> {
  return products.find((p) => p.slug === slug);
}

export async function getAllProductSlugs(): Promise<string[]> {
  return products.map((p) => p.slug);
}

export async function getFeaturedProducts(limit = 8): Promise<Product[]> {
  return products.filter((p) => p.flags.featured).slice(0, limit);
}

export async function getBestSellers(limit = 10): Promise<Product[]> {
  return products
    .filter((p) => p.flags.bestSeller)
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, limit);
}

export async function getSpecialOffers(limit = 10): Promise<Product[]> {
  return products
    .filter((p) => p.flags.specialOffer || p.discountPercent >= 15)
    .sort((a, b) => b.discountPercent - a.discountPercent)
    .slice(0, limit);
}

export async function getNewArrivals(limit = 10): Promise<Product[]> {
  return [...products]
    .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
    .slice(0, limit);
}

export async function getRelatedProducts(
  product: Product,
  limit = 8,
): Promise<Product[]> {
  const [root, mid] = product.categoryPath;
  const scored = products
    .filter((p) => p.id !== product.id)
    .map((p) => {
      let score = 0;
      if (p.categoryPath[0] === root) score += 1;
      if (p.categoryPath[1] === mid) score += 2;
      if (p.brandId === product.brandId) score += 1;
      return { p, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || b.p.rating - a.p.rating);
  return scored.slice(0, limit).map((x) => x.p);
}

export async function getProductsByIds(ids: string[]): Promise<Product[]> {
  const byId = new Map(products.map((p) => [p.id, p]));
  return ids.map((id) => byId.get(id)).filter((p): p is Product => Boolean(p));
}
