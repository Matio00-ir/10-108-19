import type { Review } from "@/types";
import { reviews } from "@/data/reviews";
import { products } from "@/data/products";

export interface RatingSummary {
  average: number;
  total: number;
  /** counts for 5,4,3,2,1 stars */
  distribution: Record<1 | 2 | 3 | 4 | 5, number>;
}

export async function getReviewsByProductId(
  productId: string,
): Promise<Review[]> {
  return reviews
    .filter((r) => r.productId === productId)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

/**
 * Rating summary shown on the product page. To keep the headline number
 * consistent with the catalog (`product.rating` / `product.reviewCount`),
 * the star distribution is modelled from those two values rather than counted
 * from the handful of sample reviews.
 */
export async function getRatingSummary(
  productId: string,
): Promise<RatingSummary> {
  const product = products.find((p) => p.id === productId);
  const average = product?.rating ?? 0;
  const total = product?.reviewCount ?? 0;

  // Triangular weighting peaked at the average, with a lift on 5★.
  const weights = ([5, 4, 3, 2, 1] as const).map((s) => {
    const w = Math.max(0, 1 - Math.abs(s - average) / 1.6) ** 2;
    return s === 5 ? w + 0.12 : w;
  });
  const sum = weights.reduce((a, b) => a + b, 0) || 1;

  const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } as Record<
    1 | 2 | 3 | 4 | 5,
    number
  >;
  ([5, 4, 3, 2, 1] as const).forEach((s, i) => {
    distribution[s] = Math.round((weights[i] / sum) * total);
  });

  return { average, total, distribution };
}
