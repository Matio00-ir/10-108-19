# داروخانه مثبت — Demo فروشگاه مکمل و محصولات داروخانه‌ای

نمونه‌ی نمایشی (Demo) یک فروشگاه اینترنتی تخصصی مکمل ورزشی، ویتامین و محصولات داروخانه‌ای.
هدف: نمایش ساختار نهایی، معماری اطلاعات، ناوبری، جستجو و تجربه‌ی خرید — با الهام از UX آمازون
(بدون کپی ظاهر). RTL و فارسی.

> این نسخه فقط **Frontend + Mock Data** است. بدون Backend، Database و پرداخت واقعی.
> معماری طوری چیده شده که در فاز بعد PostgreSQL + API + Authentication بدون بازنویسی Frontend اضافه شود.

## اجرا

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build && npm run start   # نسخه‌ی production
```

نیازمندی: Node 20+.

## استک

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (توکن‌های Design System در `app/globals.css`)
- **lucide-react** برای آیکن‌ها
- فونت **Vazirmatn** (variable, self-host با `next/font/local`)
- State سبد خرید: React Context + `useReducer` + `localStorage`

## ساختار پوشه‌ها

```
app/                صفحات (App Router) + robots + sitemap + loading/not-found/error
  category/[...slug] لیست/دسته‌بندی چندسطحی
  product/[slug]     صفحه‌ی محصول (generateStaticParams)
  search             نتایج جستجو (?q=)
  cart · checkout · checkout/success
  (auth)/login · (auth)/register
  account · orders
components/
  ui/               اجزای پایه (Button, Price, Rating, Drawer, Tabs, …)
  layout/           Header, MegaMenu, MobileNav, Footer, SearchBar, …
  product/          ProductCard, ProductGrid, ProductCarousel, ProductImage
  home/             بخش‌های صفحه‌ی اصلی
features/
  cart/             CartContext, MiniCartDrawer, AddToCartButton, cartMath
  catalog/          FilterPanel, FilterSidebar, CatalogControls, SortSelect, params
  product/          ProductGallery, ProductInfo, ReviewsSection, StickyBuyBar, …
  auth/             AuthForm (فرم دموی ورود/ثبت‌نام)
data/               Mock Data: products (۳۰ محصول), categories, brands, reviews, home
lib/
  api/              لایه‌ی Data Access (امضاهای async شبیه یک API واقعی)
  dictionary/fa.ts  همه‌ی رشته‌های UI (آماده برای افزودن en.ts)
  format.ts         toPersianDigits, formatPrice, finalPrice, …
  constants.ts      SITE, PAGE_SIZE, ROUTES, PRODUCT_IMAGES_ENABLED
types/              قراردادهای دامنه (Product, Category, CartLine, …)
public/images/products/  محل قرارگیری تصاویر محصول (نگاه کنید به docs/IMAGE-PROMPTS.md)
```

## تصاویر محصول

تصاویر با ابزار داخلی قابل تولید نبودند؛ در عوض `docs/IMAGE-PROMPTS.md` شامل **پرامپت دقیق Gemini +
نام فایل** برای هر ۳۰ محصول است. تا زمانی که فایل‌های `.webp` را در `public/images/products/`
قرار ندهید و `PRODUCT_IMAGES_ENABLED` را `true` نکنید، یک تصویر جایگزین SVG برندشده (متناسب با نوع
بسته‌بندی و رنگ برند) نمایش داده می‌شود؛ هیچ کارت یا گالری‌ای بدون تصویر نیست و هیچ درخواست شبکه‌ی
خطادار ارسال نمی‌شود.

## مسیر مهاجرت به Backend

نگاه کنید به [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md). خلاصه: فقط بدنه‌ی توابع در `lib/api/*`
از خواندن `data/*` به `fetch`/Prisma تغییر می‌کند؛ Componentها دست نمی‌خورند.

## Responsive

طراحی Mobile-first و تست‌شده در ۳۶۰ / ۳۹۰ / ۴۳۰ / ۷۶۸ / ۱۰۲۴ / ۱۴۴۰ پیکسل:
هدر و مگامنو و فیلترها نسخه‌ی اختصاصی موبایل دارند (Drawer / Bottom Sheet)، گرید محصول از ۳۶۰ px دو
ستون است، صفحه‌ی محصول نوار خرید چسبان (StickyBuyBar) دارد و هیچ Horizontal Scroll ناخواسته‌ای وجود ندارد.
