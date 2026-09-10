# پرامپت‌های تولید تصویر محصولات (Google Gemini / Nano Banana)

این سند برای تولید تصویر همه‌ی ۳۰ محصول Demo است. هر تصویر را با Gemini بسازید و با **نام فایل دقیق**
داخل پوشه‌ی زیر قرار دهید:

```
public/images/products/<slug>.webp
```

کد به‌صورت خودکار همین مسیر را می‌خواند (`components/product/ProductImage.tsx`). تا وقتی فایل واقعی
وجود نداشته باشد، یک تصویر جایگزین SVG برندشده نمایش داده می‌شود؛ به‌محض قرار دادن فایل `.webp`،
تصویر واقعی جایگزین می‌شود و نیازی به تغییر کد نیست.

## مشخصات مشترک همه‌ی تصاویر (Style Preamble)

این متن را به ابتدای هر پرامپت اضافه کنید تا کل کاتالوگ یکدست دیده شود:

> Professional e-commerce product photograph. A single product, centered, on a seamless
> white-to-light-grey gradient studio background. Bright, soft, even softbox lighting with a
> gentle contact shadow beneath the product. Slight three-quarter front camera angle. Crisp
> focus, photorealistic, high resolution. Clean minimal packaging label using simple color
> blocking only — **no legible text, no brand logos, no watermark**. No extra props, no hands,
> no background objects. Square 1:1 composition, product fills about 80% of the frame.

- **نسبت تصویر:** `1:1` (مربع)
- **خروجی:** ابتدا PNG/JPG، سپس به `webp` با کیفیت ~۸۰ و اندازه‌ی ~۱۰۰۰×۱۰۰۰ تبدیل شود
- **نکته:** رنگ بدنه‌ی هر بسته را مطابق ستون «Prompt» نگه دارید تا هم‌خانواده دیده شوند

---

## فهرست ۳۰ محصول

| # | Product Name | Image Filename | Image Prompt (بعد از Style Preamble) |
|---|---|---|---|
| 1 | پروتئین وی گلد استاندارد اپتیموم | `on-gold-standard-whey.webp` | A large cylindrical sports **protein powder tub** with a glossy black screw-on lid and a deep royal-blue matte body. Premium fitness supplement packaging. |
| 2 | وی پروتئین ایزوله ۱۰۰ دایماتایز | `dymatize-iso100.webp` | A cylindrical **whey protein isolate powder tub**, charcoal-grey body with a single red accent band and a black lid. Athletic, premium look. |
| 3 | پروتئین وی کارن | `karen-whey-protein.webp` | A mid-size **whey protein powder tub** with a teal-green body and a white screw lid. Clean, modern, approachable supplement packaging. |
| 4 | کازئین میسلار گلد استاندارد اپتیموم | `on-gold-standard-casein.webp` | A cylindrical **micellar casein protein powder tub** with a dark navy-blue body and a brushed-silver lid. Premium night-recovery look. |
| 5 | گینر سریوس مس اپتیموم | `on-serious-mass-gainer.webp` | A very large, tall and wide **mass gainer protein powder tub**, bronze-brown body with a black lid. Bulk weight-gain supplement packaging. |
| 6 | پروتئین گیاهی نخود ناو فودز | `now-pea-protein.webp` | A **plant protein powder tub** with an earthy matte sage-green kraft-paper finish and a natural cream lid. Vegan, natural supplement look. |
| 7 | کراتین مونوهیدرات میکرونایز اپتیموم | `on-micronized-creatine.webp` | A medium cylindrical **creatine monohydrate powder tub** with a clean white body and a blue lid. Clinical sports-supplement look. |
| 8 | کراتین مونوهیدرات کارن | `karen-creatine-monohydrate.webp` | A small-to-medium **creatine powder tub**, white body with a green lid and a green accent stripe. Simple, economical packaging. |
| 9 | آمینو BCAA ۲:۱:۱ بی‌اس نوتریشن | `bsn-bcaa-211.webp` | A **BCAA amino-acid powder tub** with a bright magenta-pink body and a white lid. Watermelon-flavour sports supplement look. |
| 10 | آمینو اسید EAA بایوتک یو‌اس‌ای | `biotechusa-eaa-zero.webp` | An **EAA essential-amino-acid powder tub** with a vivid orange body and a black lid. Modern sports supplement packaging. |
| 11 | گلوتامین پودری اپتیموم | `on-glutamine-powder.webp` | A small **L-glutamine powder tub** with a light-grey and white body and a dark grey lid. Minimalist recovery supplement look. |
| 12 | پیش از تمرین گلد استاندارد اپتیموم | `on-gold-standard-pre-workout.webp` | A **pre-workout powder tub** with an energetic red-to-orange gradient body and a black lid. Bold, high-energy sports packaging. |
| 13 | ال-کارنیتین مایع ۳۰۰۰ بایوتک | `biotechusa-liquid-lcarnitine-3000.webp` | A tall slim transparent plastic **bottle of bright yellow liquid** with a screw measuring cap. Lemon fat-burner supplement look. |
| 14 | ویتامین D3 ۵۰۰۰ واحد ناو فودز | `now-vitamin-d3-5000.webp` | A small **amber plastic supplement bottle** with a white child-proof cap and a warm yellow accent label. Softgel vitamin packaging. |
| 15 | ویتامین C ۱۰۰۰ سولگار | `solgar-vitamin-c-1000.webp` | A classic **amber glass supplement bottle** with a gold metallic cap and a cream label band. Premium vitamin packaging. |
| 16 | ویتامین B کمپلکس نیچرمید | `nature-made-b-complex.webp` | A white **plastic supplement bottle** with a royal-blue cap and a blue accent label. Clean pharmacy vitamin look. |
| 17 | منیزیم گلایسینات دکترز بست | `doctors-best-magnesium-glycinate.webp` | A white **supplement bottle** with a white cap and green accent label blocks. Clinical mineral supplement look. |
| 18 | زینک پیکولینات ۵۰ ناو فودز | `now-zinc-picolinate-50.webp` | A white **supplement bottle** with a white cap and an orange accent label. Simple mineral capsule packaging. |
| 19 | قرص آهن آهسته‌رهش دانا | `dana-slow-release-iron.webp` | A small **pharmaceutical carton box** standing next to a silver **blister strip of round tablets**. Red-and-white clinical medicine look. |
| 20 | کلسیم + ویتامین D کارن | `karen-calcium-vitamin-d.webp` | A white **supplement bottle** with a white cap and blue-and-white label blocking. Bone-health supplement look. |
| 21 | مولتی‌ویتامین آقایان اپتی-من اپتیموم | `on-opti-men-multivitamin.webp` | A **supplement carton box** standing beside a matching tablet bottle, deep-blue body with orange accent blocking. Men's multivitamin look. |
| 22 | مولتی‌ویتامین بانوان ول‌وومن ویتابیوتیکس | `vitabiotics-wellwoman.webp` | A slim **pharmaceutical carton box** with purple-and-white color blocking. Elegant women's supplement packaging. |
| 23 | امگا ۳ روغن ماهی ۱۰۰۰ ناو فودز | `now-omega-3-fish-oil-1000.webp` | A **supplement bottle filled with visible golden amber softgels**, blue accent label, white cap. Fish-oil omega-3 look. |
| 24 | پروبیوتیک ۱۰ سویه زیست تخمیر | `zist-takhmir-probiotic-10-strain.webp` | A **carton box** with a few single-serve powder **sachets** leaning against it. Blue-and-teal medical probiotic look. |
| 25 | ملاتونین ۳ میلی‌گرم ناو فودز | `now-melatonin-3.webp` | A small white **supplement bottle** with a white cap and deep-blue "night" accent label with a subtle crescent-moon shape. Sleep-aid look. |
| 26 | گلوکزامین کندرویتین MSM دکترز بست | `doctors-best-glucosamine-chondroitin-msm.webp` | A large white **supplement bottle** with a white cap and blue-and-green accent label. Joint-health supplement look. |
| 27 | کلاژن پپتید هیدرولیزشده + ویتامین C | `hydrolyzed-collagen-peptides-vitamin-c.webp` | An elegant **collagen powder tub** with a soft blush / rose-gold body and a matte white lid. Premium beauty-supplement look. |
| 28 | بیوتین ۱۰٬۰۰۰ میکروگرم ناو فودز | `now-biotin-10000.webp` | A white **supplement bottle** with a white cap and purple accent label blocking. Hair-and-nail supplement look. |
| 29 | عصاره خارمریم (سیلی‌مارین) دانا | `dana-milk-thistle-silymarin.webp` | A **pharmaceutical carton box** beside a **blister strip of coated tablets**, green-and-white herbal medicine color blocking. |
| 30 | مولتی‌ویتامین کودکان کارن (پاستیل) | `karen-kids-multivitamin-gummy.webp` | A rounded **gummy-vitamin jar** with a white lid, cheerful orange-and-yellow label blocking, a few colorful fruit-shaped gummies resting beside it. Playful but clean kids-supplement look. |

---

## پس از تولید

1. همه فایل‌ها را با نام دقیق بالا در `public/images/products/` قرار دهید.
2. در فایل `lib/constants.ts` مقدار `PRODUCT_IMAGES_ENABLED` را به `true` تغییر دهید. تا وقتی `false`
   است، همه‌ی کارت‌ها placeholderِ SVG برندشده را نشان می‌دهند و هیچ درخواست تصویری ارسال نمی‌شود؛
   با `true` شدن، تصویر واقعی `<slug>.webp` بارگذاری می‌شود و اگر تک‌فایلی نبود همان محصول به placeholder برمی‌گردد.
3. اگر برای صفحه‌ی محصول تصویر دوم دارید، آن را `<slug>-2.webp` نام‌گذاری کنید و در `data/products.ts`
   در آرایه‌ی `images` همان محصول اضافه کنید (گالری چند تصویری به‌صورت خودکار فعال می‌شود).
4. هیچ تغییر دیگری در کامپوننت‌ها لازم نیست.
