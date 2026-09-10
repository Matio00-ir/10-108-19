import type { Review } from "@/types";
import { products } from "./products";

/** Persian first names for demo review authors. */
const AUTHORS = [
  "امیر رضایی",
  "سارا محمدی",
  "حسین کاظمی",
  "نگار احمدی",
  "پیمان صادقی",
  "مریم حسینی",
  "علی موسوی",
  "الهام کریمی",
  "رضا نوری",
  "شیما عباسی",
  "محمد جعفری",
  "فاطمه رحیمی",
  "کیان اسدی",
  "پریسا یوسفی",
  "بهنام قاسمی",
];

const POSITIVE = [
  {
    title: "کیفیت عالی",
    body: "چند هفته‌ست استفاده می‌کنم و از نتیجه‌ش راضی‌ام. بسته‌بندی سالم و با تاریخ انقضای دور به دستم رسید.",
  },
  {
    title: "ارزش خرید داره",
    body: "نسبت به قیمتش کیفیت خوبی داره. حل شدنش توی شیکر بدون گلوله بود و طعمش هم قابل قبوله.",
  },
  {
    title: "اصل بودن تأیید شد",
    body: "هولوگرام و کد رهگیری روی بسته بود و از سایت شرکت هم استعلام گرفتم. ارسال هم سریع بود.",
  },
  {
    title: "توصیه می‌کنم",
    body: "برای هدفی که خریدم دقیقاً همون چیزی بود که انتظار داشتم. دفعه بعد هم از همین‌جا می‌گیرم.",
  },
  {
    title: "راضی‌ام",
    body: "مصرفش راحته و عارضه‌ای برام نداشت. پشتیبانی هم برای سوالم سریع جواب داد.",
  },
];

const NEUTRAL = [
  {
    title: "خوبه ولی طعمش متوسطه",
    body: "کیفیت خود محصول مشکلی نداره اما طعمش اونقدرها که فکر می‌کردم خوب نبود. با شیر بهتر می‌شه.",
  },
  {
    title: "بسته‌بندی می‌تونست بهتر باشه",
    body: "محصول سالم رسید ولی درب قوطی کمی شل بود. خود مکمل تا اینجا خوب بوده.",
  },
];

const CRITICAL = [
  {
    title: "برای من مناسب نبود",
    body: "بعد از چند روز مصرف کمی سنگینی معده داشتم. احتمالاً به بدن خودم برمی‌گرده، کیفیت محصول بد نیست.",
  },
];

/** Deterministic pseudo-random so the demo is stable between renders. */
function seeded(n: number) {
  const x = Math.sin(n) * 10_000;
  return x - Math.floor(x);
}

function buildReviews(): Review[] {
  const all: Review[] = [];
  const now = Date.now();

  products.forEach((product, pi) => {
    const count = 3 + Math.floor(seeded(pi + 1) * 4); // 3–6 reviews
    for (let i = 0; i < count; i++) {
      const r = seeded((pi + 1) * 100 + i);
      let pool = POSITIVE;
      let rating = 5;
      if (r > 0.82) {
        pool = CRITICAL;
        rating = 3;
      } else if (r > 0.62) {
        pool = NEUTRAL;
        rating = 4;
      } else {
        rating = r > 0.3 ? 5 : 4;
      }
      const tpl = pool[Math.floor(seeded((pi + 3) * 7 + i) * pool.length)];
      const daysAgo = 4 + Math.floor(seeded((pi + 5) * 11 + i) * 240);
      all.push({
        id: `rv-${product.id}-${i}`,
        productId: product.id,
        author: AUTHORS[(pi * 3 + i) % AUTHORS.length],
        rating,
        date: new Date(now - daysAgo * 86_400_000).toISOString(),
        title: tpl.title,
        body: tpl.body,
        verified: r < 0.85,
        helpfulCount: Math.floor(seeded((pi + 7) * 13 + i) * 40),
      });
    }
  });

  return all;
}

export const reviews: Review[] = buildReviews();
