import type { CatalogQuery, Paginated, Product } from "@/types";
import { products } from "@/data/products";
import { runQuery } from "./query";

export async function searchProducts(
  query: string,
  options: Omit<CatalogQuery, "q"> = {},
): Promise<Paginated<Product>> {
  return runQuery(products, { ...options, q: query });
}

/** Lightweight suggestions for the search box dropdown. */
export async function getSearchSuggestions(
  query: string,
  limit = 6,
): Promise<Product[]> {
  if (!query.trim()) return [];
  return runQuery(products, { q: query, sort: "popular", pageSize: limit }).items;
}

export const POPULAR_SEARCHES = [
  "وی پروتئین",
  "کراتین",
  "ویتامین D",
  "امگا ۳",
  "کلاژن",
  "مولتی ویتامین",
  "منیزیم",
  "پروبیوتیک",
];
