import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";
import { getAllProductSlugs } from "@/lib/api/products";
import { getAllCategoryPaths } from "@/lib/api/categories";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = `https://${SITE.domain}`;
  const [slugs, catPaths] = await Promise.all([
    getAllProductSlugs(),
    getAllCategoryPaths(),
  ]);

  return [
    { url: base, priority: 1 },
    ...catPaths.map((path) => ({
      url: `${base}/category/${path.join("/")}`,
      priority: 0.7,
    })),
    ...slugs.map((slug) => ({
      url: `${base}/product/${slug}`,
      priority: 0.6,
    })),
  ];
}
