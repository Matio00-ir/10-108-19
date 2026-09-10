/** Central place for tunables so a future backend can override them. */

export const SITE = {
  name: "داروخانه مثبت",
  nameEn: "Mosbat Pharmacy",
  tagline: "مکمل و محصولات داروخانه‌ای، اصل و مطمئن",
  supportPhone: "۰۲۱-۹۱۰۰۲۰۳۰",
  domain: "mosbat.example",
} as const;

/** Catalog paging. */
export const PAGE_SIZE = 12;

/** Free-shipping threshold (Toman) used by the cart summary. */
export const FREE_SHIPPING_THRESHOLD = 900_000;
export const FLAT_SHIPPING_FEE = 49_000;

/** Sort options shared by listing + search. */
export const SORT_OPTIONS = [
  { value: "popular", label: "پرفروش‌ترین" },
  { value: "newest", label: "جدیدترین" },
  { value: "cheapest", label: "ارزان‌ترین" },
  { value: "expensive", label: "گران‌ترین" },
  { value: "rating", label: "بیشترین امتیاز" },
  { value: "discount", label: "بیشترین تخفیف" },
] as const;

export type SortValue = (typeof SORT_OPTIONS)[number]["value"];

/** Responsive breakpoints we explicitly QA against. */
export const QA_BREAKPOINTS = [360, 390, 430, 768, 1024, 1440] as const;

export const ROUTES = {
  home: "/",
  category: (slugPath: string[]) => `/category/${slugPath.join("/")}`,
  product: (slug: string) => `/product/${slug}`,
  search: (q: string) => `/search?q=${encodeURIComponent(q)}`,
  cart: "/cart",
  checkout: "/checkout",
  checkoutSuccess: "/checkout/success",
  login: "/login",
  register: "/register",
  account: "/account",
  orders: "/orders",
} as const;

export const CART_STORAGE_KEY = "mosbat.cart.v1";

/**
 * Flip to `true` after you drop the real product photos into
 * `public/images/products/<slug>.webp` (see docs/IMAGE-PROMPTS.md).
 * While `false`, product images render the branded placeholder directly
 * (no failed network requests). Individual missing files still fall back
 * gracefully when this is `true`.
 */
export const PRODUCT_IMAGES_ENABLED = false;
