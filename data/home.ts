/** Content blocks for the home page. Editable without touching components. */

export interface HeroSlide {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  /** tailwind gradient classes for the demo banner background */
  gradient: string;
  icon: string; // lucide name
}

export const heroSlides: HeroSlide[] = [
  {
    id: "hero-sport",
    eyebrow: "مکمل‌های ورزشی",
    title: "پروتئین و کراتین اصل، مستقیم از نمایندگی",
    subtitle: "ضمانت اصالت کالا و ارسال سریع از انبار تهران؛ همراه با مشاوره رایگان.",
    ctaLabel: "خرید مکمل‌های ورزشی",
    ctaHref: "/category/sport-supplements",
    gradient: "from-primary-700 to-primary-500",
    icon: "Dumbbell",
  },
  {
    id: "hero-vitamin",
    eyebrow: "سلامت روزانه",
    title: "ویتامین D، امگا ۳ و مولتی‌ویتامین با بهترین قیمت",
    subtitle: "تا ۲۰٪ تخفیف روی محصولات منتخب ویتامین و مواد معدنی.",
    ctaLabel: "مشاهده ویتامین‌ها",
    ctaHref: "/category/vitamins-minerals",
    gradient: "from-success-700 to-success-500",
    icon: "Pill",
  },
  {
    id: "hero-beauty",
    eyebrow: "زیبایی از درون",
    title: "کلاژن و بیوتین برای پوست، مو و ناخن",
    subtitle: "فرمول‌های تخصصی با جذب بالا؛ همین حالا سبک مراقبتی‌ات را بساز.",
    ctaLabel: "محصولات زیبایی و پوست",
    ctaHref: "/category/beauty-skin",
    gradient: "from-accent-600 to-accent-400",
    icon: "Sparkles",
  },
];

export interface Benefit {
  icon: string;
  title: string;
  text: string;
}

export const benefits: Benefit[] = [
  {
    icon: "BadgeCheck",
    title: "ضمانت اصالت کالا",
    text: "همه محصولات دارای کد رهگیری و قابل استعلام از شرکت واردکننده هستند.",
  },
  {
    icon: "Truck",
    title: "ارسال سریع",
    text: "ارسال از انبار تهران و تحویل اکسپرس در کمتر از ۲۴ ساعت برای مرکز شهر.",
  },
  {
    icon: "Stethoscope",
    title: "مشاوره داروساز",
    text: "پیش از خرید می‌توانید رایگان با داروساز ما درباره مصرف مکمل مشورت کنید.",
  },
  {
    icon: "ShieldCheck",
    title: "پرداخت امن",
    text: "پرداخت از طریق درگاه‌های معتبر بانکی و امکان پرداخت در محل.",
  },
];

/** Ordered list of home-page sections so the layout can be rearranged from data. */
export const homeSections = [
  "hero",
  "benefits",
  "categories",
  "featured",
  "bestSellers",
  "offers",
  "brands",
  "newsletter",
] as const;
