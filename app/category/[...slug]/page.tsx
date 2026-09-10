import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PackageSearch } from "lucide-react";
import { resolveCategoryPath } from "@/lib/api/categories";
import { getCatalogFacets, getProducts } from "@/lib/api/products";
import { ROUTES } from "@/lib/constants";
import { toPersianDigits } from "@/lib/format";
import { parseCatalogParams } from "@/features/catalog/params";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { EmptyState } from "@/components/ui/EmptyState";
import { ProductGrid } from "@/components/product/ProductGrid";
import { FilterSidebar } from "@/features/catalog/FilterSidebar";
import { CatalogControls } from "@/features/catalog/CatalogControls";
import { ActiveFilters } from "@/features/catalog/ActiveFilters";
import { LoadMore } from "@/features/catalog/LoadMore";

type Props = {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const resolved = await resolveCategoryPath(slug);
  if (!resolved) return { title: "دسته‌بندی یافت نشد" };
  return {
    title: resolved.category.name,
    description:
      resolved.category.description ??
      `خرید ${resolved.category.name} با ضمانت اصالت کالا و ارسال سریع.`,
  };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const raw = await searchParams;

  const resolved = await resolveCategoryPath(slug);
  if (!resolved) notFound();

  const { category, crumbs } = resolved;
  const query = parseCatalogParams(raw, slug);

  const [page, facets] = await Promise.all([
    getProducts(query),
    getCatalogFacets(query),
  ]);

  const children = category.children ?? [];

  return (
    <Container className="py-4 sm:py-6">
      <Breadcrumbs
        items={crumbs.map((c) => ({
          label: c.name,
          href: ROUTES.category(c.path),
        }))}
      />

      <header className="mt-4">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h1 className="text-xl font-extrabold text-neutral-900 sm:text-2xl">
            {category.name}
          </h1>
          <span className="text-[13px] text-neutral-400">
            {toPersianDigits(page.total)} کالا
          </span>
        </div>
        {category.description && (
          <p className="mt-2 max-w-3xl text-[13px] leading-7 text-neutral-500 sm:text-sm">
            {category.description}
          </p>
        )}
        {children.length > 0 && (
          <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto pb-1">
            {children.map((child) => (
              <Link
                key={child.id}
                href={ROUTES.category([...slug, child.slug])}
                className="shrink-0 rounded-full border border-neutral-200 bg-white px-3.5 py-2 text-[12.5px] font-bold text-neutral-600 hover:border-primary-300 hover:text-primary-700"
              >
                {child.name}
              </Link>
            ))}
          </div>
        )}
      </header>

      <div className="mt-6 flex items-start gap-6">
        <FilterSidebar facets={facets} />

        <div className="min-w-0 flex-1">
          <CatalogControls facets={facets} total={page.total} />

          <div className="mt-3">
            <ActiveFilters facets={facets} />
          </div>

          <div className="mt-4">
            {page.items.length > 0 ? (
              <>
                <ProductGrid products={page.items} priorityCount={4} />
                <LoadMore shown={page.items.length} total={page.total} />
              </>
            ) : (
              <EmptyState
                icon={PackageSearch}
                title="محصولی با این فیلترها پیدا نشد"
                description="فیلترها را تغییر دهید یا همه را حذف کنید تا محصولات این دسته را ببینید."
                action={{ label: "مشاهده همه محصولات دسته", href: ROUTES.category([slug[0]]) }}
              />
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}
