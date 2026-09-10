import type { Brand } from "@/types";
import { brands } from "@/data/brands";
import { products } from "@/data/products";

export async function getBrands(): Promise<Brand[]> {
  return brands;
}

export async function getBrandById(id: string): Promise<Brand | undefined> {
  return brands.find((b) => b.id === id);
}

export async function getBrandBySlug(slug: string): Promise<Brand | undefined> {
  return brands.find((b) => b.slug === slug);
}

/** Brands that actually have at least one product — used by the brand strip. */
export async function getActiveBrands(): Promise<Brand[]> {
  const withProducts = new Set(products.map((p) => p.brandId));
  return brands.filter((b) => withProducts.has(b.id));
}
