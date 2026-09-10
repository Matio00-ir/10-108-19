import type { Metadata } from "next";
import Link from "next/link";
import { SearchX } from "lucide-react";
import { getCatalogFacets, getProducts } from "@/lib/api/products";
import { POPULAR_SEARCHES } from "@/lib/api/search";
import { ROUTES } from "@/lib/constants";
import { toPersianDigits } from "@/lib/format";
import { fa } from "@/lib/dictionary/fa";
import { parseCatalogParams } from "@/features/catalog/params";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ProductGrid } from "@/components/product/ProductGrid";
import { FilterSidebar } from "@/features/catalog/FilterSidebar";
import { CatalogControls } from "@/features/catalog/CatalogControls";
import { ActiveFilters } from "@/features/catalog/ActiveFilters";
import { LoadMore } from "@/features/catalog/LoadMore";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const raw = await searchParams;
  const q = (Array.isArray(raw.q) ? raw.q[0] : raw.q)?.trim();
  return {
    title: q ? `جستجو: ${q}` : "جستجو",
    robots: { index: false, follow: true },
  };
}

const PopularChips = () => (
  <div className="flex flex-wrap gap-2">
    {POPULAR_SEARCHES.map((term) => (
      <Link
        key={term}
        href={ROUTES.search(term)}
        className="rounded-full border border-neutral-200 bg-white px-3.5 py-2 text-[12.5px] font-bold text-neutral-600 hover:border-primary-300 hover:text-primary-700"
      >
        {term}
      </Link>
    ))}
  </div>
);

export default async function SearchPage({ searchParams }: Props) {
  const raw = await searchParams;
  const q = (Array.isArray(raw.q) ? raw.q[0] : raw.q)?.trim() ?? "";

  const query = parseCatalogParams(raw);
  const [page, facets] = q
    ? await Promise.all([getProducts(query), getCatalogFacets(query)])
    : [null, null];

  return (
    <Container className="py-4 sm:py-6">
      <Breadcrumbs items={[{ label: q ? `جستجو: ${q}` : "جستجو" }]} />

      <h1 className="mt-4 text-lg font-extrabold text-neutral-900 sm:text-xl">
        {q ? fa.search.resultsFor(q) : "جستجوی محصولات"}
      </h1>

      {!q && (
        <div className="mt-6 space-y-3">
          <p className="text-sm text-neutral-500">
            برای شروع یکی از جستجوهای پرطرفدار را انتخاب کنید:
          </p>
          <PopularChips />
        </div>
      )}

      {q && page && facets && page.total > 0 && (
        <>
          <p className="mt-1 text-[13px] text-neutral-400">
            {toPersianDigits(page.total)} کالا یافت شد
          </p>
          <div className="mt-5 flex items-start gap-6">
            <FilterSidebar facets={facets} />
            <div className="min-w-0 flex-1">
              <CatalogControls facets={facets} total={page.total} />
              <div className="mt-3">
                <ActiveFilters facets={facets} />
              </div>
              <div className="mt-4">
                <ProductGrid products={page.items} priorityCount={4} />
                <LoadMore shown={page.items.length} total={page.total} />
              </div>
            </div>
          </div>
        </>
      )}

      {q && page && page.total === 0 && (
        <div className="mt-8 flex flex-col items-center rounded-xl border border-dashed border-neutral-300 bg-white px-6 py-14 text-center">
          <span className="flex size-14 items-center justify-center rounded-full bg-primary-50 text-primary-600">
            <SearchX size={26} />
          </span>
          <h2 className="mt-4 text-base font-extrabold text-neutral-900">
            {fa.search.emptyTitle}
          </h2>
          <p className="mt-1.5 max-w-sm text-sm text-neutral-500">
            {fa.search.emptyBody}
          </p>
          <div className="mt-5">
            <PopularChips />
          </div>
        </div>
      )}
    </Container>
  );
}
