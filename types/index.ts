/* ==========================================================================
   Shared domain contracts.
   These shapes intentionally mirror what a REST/GraphQL backend would return,
   so only `lib/api/*` internals change when a real database is added.
   ========================================================================== */

export interface Brand {
  id: string;
  name: string;
  nameEn: string;
  slug: string;
  country: string;
  /** short text mark used in the brand strip / chips */
  logoText: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  /** lucide-react icon name, used for the category grid + mega menu */
  icon?: string;
  description?: string;
  /** highlighted entry inside the mega menu promo column */
  featured?: boolean;
  children?: Category[];
}

export type Packaging =
  | "tub" // powder tub (protein, gainer, pre-workout)
  | "bottle" // tablet/capsule bottle
  | "softgel-bottle" // amber softgel bottle (omega, vit D)
  | "box" // carton (multivitamin, kids)
  | "sachet-box" // box of single-serve sachets
  | "blister" // blister pack
  | "tube" // cream / gel tube (collagen, topical)
  | "dropper"; // liquid dropper bottle

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  brandId: string;
  /** slugs from root category to leaf, e.g. ["sport-supplements","protein","whey-protein"] */
  categoryPath: string[];
  /** original price in Toman */
  price: number;
  /** 0–100; 0 means no discount */
  discountPercent: number;
  /** absolute paths under /public; first entry is the primary image */
  images: string[];
  /** 0–5, one decimal */
  rating: number;
  reviewCount: number;
  /** units available; 0 = out of stock */
  stock: number;
  shortDescription: string;
  /** paragraphs separated by "\n\n" */
  description: string;
  specifications: ProductSpec[];
  ingredients: string;
  usage: string;
  warnings: string;
  packaging: Packaging;
  /** merchandising flags that drive the home-page rails + badges */
  flags: {
    bestSeller?: boolean;
    isNew?: boolean;
    featured?: boolean;
    specialOffer?: boolean;
  };
  /** faceted attributes used by catalog filters */
  attributes: {
    flavor?: string;
    form?: string; // پودر / کپسول / قرص / شربت …
    size?: string; // "۹۰۸ گرم" / "۶۰ کپسول"
    servings?: number;
    suitableFor?: string[];
    vegan?: boolean;
    madeIn?: string;
  };
  createdAt: string; // ISO — powers "newest" sort
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number; // 1–5
  date: string; // ISO
  title: string;
  body: string;
  verified: boolean;
  helpfulCount: number;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

/** Cart line enriched with product data for rendering. */
export interface CartLine {
  product: Product;
  quantity: number;
  unitPrice: number; // after discount
  lineTotal: number;
}

export interface CartTotals {
  itemCount: number;
  subtotal: number; // sum of original prices
  discount: number; // total saved
  payable: number; // subtotal - discount
  shipping: number;
  total: number; // payable + shipping
  freeShippingRemaining: number; // 0 when reached
}

export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export interface CatalogQuery {
  categoryPath?: string[];
  q?: string;
  brands?: string[];
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  inStockOnly?: boolean;
  flavors?: string[];
  forms?: string[];
  vegan?: boolean;
  sort?: string;
  page?: number;
  pageSize?: number;
}

export interface FacetValue {
  value: string;
  label: string;
  count: number;
}

export interface CatalogFacets {
  brands: FacetValue[];
  flavors: FacetValue[];
  forms: FacetValue[];
  priceRange: { min: number; max: number };
}
