import type { Category } from "@/types";
import { categories } from "@/data/categories";

export interface CategoryCrumb {
  name: string;
  slug: string;
  path: string[];
}

export interface ResolvedCategory {
  category: Category;
  path: string[]; // slug path root -> this
  crumbs: CategoryCrumb[];
  parents: Category[];
  ancestorsAndSelf: Category[];
}

export async function getCategoryTree(): Promise<Category[]> {
  return categories;
}

/** Flat list of every category with its full slug path — handy for sitemaps. */
export async function getAllCategoryPaths(): Promise<string[][]> {
  const out: string[][] = [];
  const walk = (nodes: Category[], prefix: string[]) => {
    for (const n of nodes) {
      const path = [...prefix, n.slug];
      out.push(path);
      if (n.children?.length) walk(n.children, path);
    }
  };
  walk(categories, []);
  return out;
}

export async function resolveCategoryPath(
  slugPath: string[],
): Promise<ResolvedCategory | undefined> {
  let level: Category[] = categories;
  const chain: Category[] = [];
  for (const slug of slugPath) {
    const found = level.find((c) => c.slug === slug);
    if (!found) return undefined;
    chain.push(found);
    level = found.children ?? [];
  }
  if (!chain.length) return undefined;

  const crumbs: CategoryCrumb[] = chain.map((c, i) => ({
    name: c.name,
    slug: c.slug,
    path: slugPath.slice(0, i + 1),
  }));

  return {
    category: chain[chain.length - 1],
    path: slugPath,
    crumbs,
    parents: chain.slice(0, -1),
    ancestorsAndSelf: chain,
  };
}

/** Immediate children (for the listing sub-nav / chips). */
export async function getChildCategories(
  slugPath: string[],
): Promise<Category[]> {
  const resolved = await resolveCategoryPath(slugPath);
  return resolved?.category.children ?? [];
}

/** Top-level entries for the home category grid. */
export async function getTopCategories(): Promise<Category[]> {
  return categories;
}
