import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AlertTriangle } from "lucide-react";
import {
  getAllProductSlugs,
  getProductBySlug,
  getRelatedProducts,
} from "@/lib/api/products";
import { getBrandById } from "@/lib/api/brands";
import { resolveCategoryPath } from "@/lib/api/categories";
import { getRatingSummary, getReviewsByProductId } from "@/lib/api/reviews";
import { ROUTES } from "@/lib/constants";
import { finalPrice } from "@/lib/format";
import { fa } from "@/lib/dictionary/fa";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Tabs } from "@/components/ui/Tabs";
import { ProductGallery } from "@/features/product/ProductGallery";
import { ProductInfo } from "@/features/product/ProductInfo";
import { ProductSpecsTable } from "@/features/product/ProductSpecsTable";
import { RelatedProducts } from "@/features/product/RelatedProducts";
import { ReviewsSection } from "@/features/product/ReviewsSection";
import { StickyBuyBar } from "@/features/product/StickyBuyBar";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getAllProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "محصول یافت نشد" };
  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: { title: product.name, description: product.shortDescription },
  };
}

const Paragraphs = ({ text }: { text: string }) => (
  <>
    {text.split("\n\n").map((p, i) => (
      <p key={i} className="mb-3 last:mb-0">
        {p}
      </p>
    ))}
  </>
);

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const [brand, catPath, related, reviews, summary] = await Promise.all([
    getBrandById(product.brandId),
    resolveCategoryPath(product.categoryPath),
    getRelatedProducts(product, 10),
    getReviewsByProductId(product.id),
    getRatingSummary(product.id),
  ]);

  const crumbs = [
    ...(catPath?.crumbs.map((c) => ({
      label: c.name,
      href: ROUTES.category(c.path),
    })) ?? []),
    { label: product.name },
  ];

  const tabs = [
    {
      id: "desc",
      label: fa.product.description,
      content: <Paragraphs text={product.description} />,
    },
    {
      id: "specs",
      label: fa.product.specifications,
      content: <ProductSpecsTable specs={product.specifications} />,
    },
    {
      id: "ingredients",
      label: fa.product.ingredients,
      content: <p className="leading-8">{product.ingredients}</p>,
    },
    {
      id: "usage",
      label: fa.product.usage,
      content: <p className="leading-8">{product.usage}</p>,
    },
    {
      id: "warnings",
      label: fa.product.warnings,
      content: (
        <div className="flex gap-3 rounded-xl bg-accent-50 p-4 text-[13px] leading-8 text-accent-800">
          <AlertTriangle size={18} className="mt-1 shrink-0 text-accent-600" />
          <p>{product.warnings}</p>
        </div>
      ),
    },
  ];

  return (
    <Container className="py-4 pb-28 sm:py-6 md:pb-10">
      <Breadcrumbs items={crumbs} />

      <div className="mt-4 grid gap-6 md:grid-cols-[minmax(0,1fr)_320px] lg:grid-cols-[minmax(0,1fr)_380px]">
        <ProductGallery
          images={product.images}
          name={product.name}
          packaging={product.packaging}
          brandText={brand?.logoText}
          discountPercent={product.discountPercent}
        />
        <ProductInfo product={product} brand={brand} />
      </div>

      <div className="mt-8 rounded-2xl border border-neutral-200 bg-white p-4 sm:p-6">
        <Tabs items={tabs} />
      </div>

      <RelatedProducts products={related} />

      <section id="reviews" className="mt-10 scroll-mt-40">
        <ReviewsSection summary={summary} reviews={reviews} />
      </section>

      <StickyBuyBar product={product} />

      {/* JSON-LD for richer search results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            brand: brand?.nameEn,
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: product.rating,
              reviewCount: product.reviewCount,
            },
            offers: {
              "@type": "Offer",
              priceCurrency: "IRR",
              price: finalPrice(product.price, product.discountPercent),
              availability:
                product.stock > 0
                  ? "https://schema.org/InStock"
                  : "https://schema.org/OutOfStock",
            },
          }),
        }}
      />
    </Container>
  );
}
