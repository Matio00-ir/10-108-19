import type { Category } from "@/types";

/**
 * Multi-level category tree that drives the mega menu, the mobile nav accordion,
 * the home category grid and the `/category/[...slug]` routes.
 * Swap this array to reshape the whole store — nothing is hard-coded elsewhere.
 */
export const categories: Category[] = [
  {
    id: "c-sport",
    name: "مکمل‌های ورزشی",
    slug: "sport-supplements",
    icon: "Dumbbell",
    description:
      "پروتئین، کراتین، آمینواسید و مکمل‌های پیش و پس از تمرین برای عملکرد بهتر و ریکاوری سریع‌تر.",
    children: [
      {
        id: "c-protein",
        name: "پروتئین",
        slug: "protein",
        icon: "Milk",
        description: "انواع پروتئین وی، کازئین، گینر و پروتئین گیاهی.",
        children: [
          { id: "c-whey", name: "وی پروتئین", slug: "whey-protein", featured: true },
          { id: "c-casein", name: "کازئین", slug: "casein-protein" },
          { id: "c-gainer", name: "گینر و افزایش وزن", slug: "mass-gainer" },
          { id: "c-plantpro", name: "پروتئین گیاهی", slug: "plant-protein" },
        ],
      },
      {
        id: "c-creatine",
        name: "کراتین",
        slug: "creatine",
        icon: "Zap",
        description: "کراتین مونوهیدرات میکرونایز و فرمول‌های ترکیبی.",
      },
      {
        id: "c-amino",
        name: "آمینو اسیدها",
        slug: "amino-acids",
        icon: "Atom",
        description: "BCAA، EAA و گلوتامین برای حفظ توده عضلانی.",
        children: [
          { id: "c-bcaa", name: "بی‌سی‌ای‌ای (BCAA)", slug: "bcaa" },
          { id: "c-eaa", name: "ای‌ای‌ای (EAA)", slug: "eaa" },
          { id: "c-glutamine", name: "گلوتامین", slug: "glutamine" },
        ],
      },
      {
        id: "c-preworkout",
        name: "پیش از تمرین",
        slug: "pre-workout",
        icon: "Flame",
        description: "افزایش انرژی، تمرکز و پمپ عضلانی.",
      },
      {
        id: "c-carnitine",
        name: "ال‌کارنیتین و چربی‌سوز",
        slug: "carnitine",
        icon: "Activity",
        description: "کمک به سوخت‌وساز چربی در کنار رژیم و تمرین.",
      },
    ],
  },
  {
    id: "c-vitmin",
    name: "ویتامین‌ها و مواد معدنی",
    slug: "vitamins-minerals",
    icon: "Pill",
    description:
      "ویتامین‌ها، مینرال‌ها، مولتی‌ویتامین‌ها و امگا ۳ برای پوشش نیازهای روزانه بدن.",
    children: [
      {
        id: "c-vitamins",
        name: "ویتامین‌ها",
        slug: "vitamins",
        icon: "Sun",
        children: [
          { id: "c-vitd", name: "ویتامین D", slug: "vitamin-d", featured: true },
          { id: "c-vitc", name: "ویتامین C", slug: "vitamin-c" },
          { id: "c-vitb", name: "ویتامین‌های گروه B", slug: "vitamin-b" },
        ],
      },
      {
        id: "c-minerals",
        name: "مواد معدنی",
        slug: "minerals",
        icon: "Gem",
        children: [
          { id: "c-mag", name: "منیزیم", slug: "magnesium" },
          { id: "c-zinc", name: "زینک", slug: "zinc" },
          { id: "c-iron", name: "آهن", slug: "iron" },
          { id: "c-calcium", name: "کلسیم", slug: "calcium" },
        ],
      },
      {
        id: "c-multivit",
        name: "مولتی‌ویتامین",
        slug: "multivitamins",
        icon: "LayoutGrid",
        description: "فرمول‌های اختصاصی آقایان، بانوان و بزرگسالان.",
      },
      {
        id: "c-omega",
        name: "امگا ۳ و روغن ماهی",
        slug: "omega-fish-oil",
        icon: "Fish",
      },
    ],
  },
  {
    id: "c-general",
    name: "سلامت عمومی",
    slug: "general-health",
    icon: "HeartPulse",
    description:
      "تقویت ایمنی، سلامت گوارش، خواب و آرامش و مراقبت از مفاصل و استخوان.",
    children: [
      { id: "c-immune", name: "تقویت سیستم ایمنی", slug: "immune-support", icon: "ShieldPlus" },
      { id: "c-digest", name: "گوارش و پروبیوتیک", slug: "digestion-probiotics", icon: "Sprout" },
      { id: "c-sleep", name: "خواب و آرامش", slug: "sleep-relax", icon: "Moon" },
      { id: "c-joint", name: "مفاصل و استخوان", slug: "joint-bone", icon: "Bone" },
      { id: "c-heart", name: "سلامت قلب", slug: "heart-health", icon: "Heart" },
    ],
  },
  {
    id: "c-beauty",
    name: "زیبایی، پوست و مو",
    slug: "beauty-skin",
    icon: "Sparkles",
    description: "کلاژن، بیوتین و مکمل‌های تخصصی مو، پوست و ناخن.",
    children: [
      { id: "c-collagen", name: "کلاژن", slug: "collagen", featured: true },
      { id: "c-biotin", name: "بیوتین", slug: "biotin" },
      { id: "c-hairnails", name: "مو و ناخن", slug: "hair-nails" },
    ],
  },
  {
    id: "c-herbal",
    name: "گیاهی و طب سنتی",
    slug: "herbal-traditional",
    icon: "Leaf",
    description: "عصاره‌های گیاهی استاندارد و دمنوش‌های تخصصی.",
    children: [
      { id: "c-herbext", name: "عصاره‌های گیاهی", slug: "herbal-extracts" },
      { id: "c-herbtea", name: "دمنوش‌های تخصصی", slug: "herbal-teas" },
    ],
  },
  {
    id: "c-family",
    name: "مراقبت شخصی و خانواده",
    slug: "personal-family",
    icon: "Users",
    description: "مکمل‌های کودکان، دوران بارداری و شیردهی و سالمندان.",
    children: [
      { id: "c-kids", name: "مکمل کودکان", slug: "kids" },
      { id: "c-prenatal", name: "بارداری و شیردهی", slug: "prenatal" },
      { id: "c-seniors", name: "سالمندان", slug: "seniors" },
    ],
  },
];
