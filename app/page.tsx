import { getTopCategories } from "@/lib/api/categories";
import {
  getBestSellers,
  getFeaturedProducts,
  getSpecialOffers,
} from "@/lib/api/products";
import { getActiveBrands } from "@/lib/api/brands";
import { benefits, heroSlides } from "@/data/home";
import { fa } from "@/lib/dictionary/fa";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCarousel } from "@/components/product/ProductCarousel";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { BenefitsBar } from "@/components/home/BenefitsBar";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { BrandStrip } from "@/components/home/BrandStrip";
import { NewsletterCta } from "@/components/home/NewsletterCta";

export default async function HomePage() {
  const [categories, featured, bestSellers, offers, brands] = await Promise.all([
    getTopCategories(),
    getFeaturedProducts(8),
    getBestSellers(10),
    getSpecialOffers(10),
    getActiveBrands(),
  ]);

  return (
    <Container className="space-y-10 py-4 sm:space-y-14 sm:py-6">
      <HeroCarousel slides={heroSlides} />

      <BenefitsBar benefits={benefits} />

      <section>
        <SectionHeading title={fa.home.categoriesTitle} />
        <CategoryGrid categories={categories} />
      </section>

      <section>
        <SectionHeading title={fa.home.featuredTitle} moreHref="/search?q=" />
        <ProductCarousel products={featured} />
      </section>

      <section className="rounded-2xl bg-white p-4 ring-1 ring-neutral-200 sm:p-6">
        <SectionHeading
          title={fa.home.offersTitle}
          subtitle="تخفیف‌های محدود روی مکمل‌های پرطرفدار"
        />
        <ProductCarousel products={offers} />
      </section>

      <section>
        <SectionHeading title={fa.home.bestSellersTitle} />
        <ProductCarousel products={bestSellers} />
      </section>

      <section>
        <SectionHeading
          title={fa.home.brandsTitle}
          subtitle={fa.home.brandsSubtitle}
        />
        <BrandStrip brands={brands} />
      </section>

      <NewsletterCta />
    </Container>
  );
}
