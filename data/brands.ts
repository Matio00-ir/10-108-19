import type { Brand } from "@/types";

/** Demo brands — names are illustrative for a mock catalog. */
export const brands: Brand[] = [
  { id: "b-optimum", name: "اپتیموم نوتریشن", nameEn: "Optimum Nutrition", slug: "optimum-nutrition", country: "آمریکا", logoText: "ON" },
  { id: "b-dymatize", name: "دایماتایز", nameEn: "Dymatize", slug: "dymatize", country: "آمریکا", logoText: "DYM" },
  { id: "b-now", name: "ناو فودز", nameEn: "NOW Foods", slug: "now-foods", country: "آمریکا", logoText: "NOW" },
  { id: "b-solgar", name: "سولگار", nameEn: "Solgar", slug: "solgar", country: "آمریکا", logoText: "SOL" },
  { id: "b-naturemade", name: "نیچرمید", nameEn: "Nature Made", slug: "nature-made", country: "آمریکا", logoText: "NM" },
  { id: "b-doctorsbest", name: "دکترز بست", nameEn: "Doctor's Best", slug: "doctors-best", country: "آمریکا", logoText: "DB" },
  { id: "b-biotech", name: "بایوتک یو‌اس‌ای", nameEn: "BioTechUSA", slug: "biotechusa", country: "مجارستان", logoText: "BT" },
  { id: "b-vitabiotics", name: "ویتابیوتیکس", nameEn: "Vitabiotics", slug: "vitabiotics", country: "انگلستان", logoText: "VB" },
  { id: "b-karen", name: "کارن", nameEn: "Karen", slug: "karen", country: "ایران", logoText: "KRN" },
  { id: "b-dana", name: "دانا", nameEn: "Dana", slug: "dana", country: "ایران", logoText: "DANA" },
  { id: "b-zisttakhmir", name: "زیست تخمیر", nameEn: "Zist Takhmir", slug: "zist-takhmir", country: "ایران", logoText: "ZT" },
  { id: "b-bsn", name: "بی‌اس نوتریشن", nameEn: "BS Nutrition", slug: "bs-nutrition", country: "ایران", logoText: "BSN" },
];

const brandById = new Map(brands.map((b) => [b.id, b]));
const brandBySlug = new Map(brands.map((b) => [b.slug, b]));

export function getBrandByIdSync(id: string): Brand | undefined {
  return brandById.get(id);
}
export function getBrandBySlugSync(slug: string): Brand | undefined {
  return brandBySlug.get(slug);
}
