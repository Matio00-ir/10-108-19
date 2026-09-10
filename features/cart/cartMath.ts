import type { CartItem, CartLine, CartTotals, Product } from "@/types";
import { finalPrice } from "@/lib/format";
import { FREE_SHIPPING_THRESHOLD, FLAT_SHIPPING_FEE } from "@/lib/constants";
import { products } from "@/data/products";

const byId = new Map(products.map((p) => [p.id, p]));

export function getProductById(id: string): Product | undefined {
  return byId.get(id);
}

export function buildLines(items: CartItem[]): CartLine[] {
  return items
    .map((item) => {
      const product = byId.get(item.productId);
      if (!product) return null;
      const unitPrice = finalPrice(product.price, product.discountPercent);
      return {
        product,
        quantity: item.quantity,
        unitPrice,
        lineTotal: unitPrice * item.quantity,
      } satisfies CartLine;
    })
    .filter((l): l is CartLine => l !== null);
}

export function computeTotals(lines: CartLine[]): CartTotals {
  const itemCount = lines.reduce((s, l) => s + l.quantity, 0);
  const subtotal = lines.reduce(
    (s, l) => s + l.product.price * l.quantity,
    0,
  );
  const payable = lines.reduce((s, l) => s + l.lineTotal, 0);
  const discount = subtotal - payable;
  const shipping =
    itemCount === 0 || payable >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING_FEE;
  const freeShippingRemaining =
    payable >= FREE_SHIPPING_THRESHOLD
      ? 0
      : Math.max(0, FREE_SHIPPING_THRESHOLD - payable);

  return {
    itemCount,
    subtotal,
    discount,
    payable,
    shipping,
    total: payable + shipping,
    freeShippingRemaining,
  };
}
