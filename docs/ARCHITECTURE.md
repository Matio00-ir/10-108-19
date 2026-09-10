# معماری و مسیر توسعه به Production

این Demo فقط Frontend است، اما لایه‌بندی طوری انتخاب شده که افزودن Backend واقعی، PostgreSQL و
Authentication **بدون بازنویسی UI** ممکن باشد.

## ۱. لایه‌بندی

```
UI (Server/Client Components)
        │  فقط از lib/api/* می‌خواند
        ▼
lib/api/*   ← «قرارداد داده» — امضای async، خروجی typed و صفحه‌بندی‌شده
        │  امروز: از data/* (آرایه در حافظه)
        ▼
data/*      ← Mock Data
```

همه‌ی صفحات و کامپوننت‌های سروری داده را فقط از `lib/api/*` می‌گیرند:

| فایل | توابع |
|---|---|
| `lib/api/products.ts` | `getProducts(query)`, `getProductBySlug`, `getFeaturedProducts`, `getBestSellers`, `getSpecialOffers`, `getRelatedProducts`, `getCatalogFacets` |
| `lib/api/categories.ts` | `getCategoryTree`, `resolveCategoryPath`, `getAllCategoryPaths` |
| `lib/api/search.ts` | `searchProducts`, `getSearchSuggestions` |
| `lib/api/brands.ts` | `getBrands`, `getBrandById`, `getActiveBrands` |
| `lib/api/reviews.ts` | `getReviewsByProductId`, `getRatingSummary` |

## ۲. افزودن PostgreSQL + Backend

1. **دیتابیس:** جدول‌های `products`, `categories` (self-reference برای درخت), `brands`, `reviews`,
   `orders`, `order_items`, `users`. شکل فیلدها همان `types/index.ts` است.
2. **ORM:** Prisma یا Drizzle. مدل‌ها را از `types/index.ts` مشتق کنید.
3. **جایگزینی:** بدنه‌ی هر تابع در `lib/api/*` را از `products.filter(...)` به کوئری واقعی تغییر دهید.
   امضا و شکل خروجی ثابت می‌ماند → هیچ کامپوننتی تغییر نمی‌کند.
   - منطق فیلتر/سورت/facet در `lib/api/query.ts` است؛ می‌تواند به `WHERE`/`ORDER BY`/`GROUP BY` نگاشت شود.
4. **Seed:** `data/*` را به‌عنوان seed اولیه‌ی دیتابیس استفاده کنید.

## ۳. سبد خرید و سفارش

- امروز: `features/cart/CartContext.tsx` سبد را در `localStorage` نگه می‌دارد و `cartMath.ts`
  جمع‌ها را محاسبه می‌کند.
- Production: هنگام Checkout، `POST /api/orders` با آیتم‌های سبد؛ محاسبه‌ی قیمت/تخفیف/ارسال در سرور
  تکرار شود (منبع اعتماد). `app/checkout/page.tsx` فقط باید `fetch` را جایگزین `setTimeout` فعلی کند.
- صفحه‌ی `checkout/success` کد سفارش واقعی را از پاسخ API می‌گیرد (الان ساختگی است).

## ۴. Authentication

- امروز: `features/auth/AuthForm.tsx` فقط فرم و اعتبارسنجی سمت کلاینت است.
- Production: NextAuth/Auth.js یا JWT اختصاصی. `AccountMenu` و `MobileNav` وضعیت ورود را از session بخوانند.
- مسیرهای `account`, `orders` و `checkout` پشت middleware محافظت شوند.

## ۵. i18n / RTL

- همه‌ی رشته‌ها در `lib/dictionary/fa.ts`. برای افزودن انگلیسی: `en.ts` هم‌ساختار + یک provider سبک
  (یا `next-intl`) و `dir`/`lang` داینامیک در `app/layout.tsx`.
- در استایل‌ها از logical properties استفاده شده (`ps-`, `pe-`, `ms-`, `start-*`, …) تا LTR بدون
  بازنویسی کار کند.

## ۶. تصاویر

`components/product/ProductImage.tsx` تنها نقطه‌ی مصرف تصویر است. با `PRODUCT_IMAGES_ENABLED=true`
از `next/image` روی `/images/products/<slug>.webp` استفاده می‌کند و در صورت نبود فایل به SVG برمی‌گردد.
برای CDN/آبجکت‌استوریج کافی است `images` در `next.config.ts` و مسیر در `data/products.ts` تنظیم شود.

## ۷. Performance

- Server Components پیش‌فرض؛ Client فقط برای تعامل (سبد، مگامنو، فیلتر، گالری، فرم‌ها).
- `generateStaticParams` برای صفحات محصول (SSG).
- `next/font` برای فونت، `loading.tsx`/Skeleton برای جلوگیری از layout shift.
- کارت محصول با ردیف‌های hight-ثابت طراحی شده تا CLS نداشته باشد.
