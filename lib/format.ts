const FA_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

/** Convert every ASCII digit in a string/number to its Persian equivalent. */
export function toPersianDigits(input: string | number): string {
  return String(input).replace(/[0-9]/g, (d) => FA_DIGITS[Number(d)]);
}

/** Group thousands with a comma: 1234567 -> "1,234,567". */
export function groupThousands(value: number): string {
  return Math.round(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, "،");
}

/**
 * Format a Toman price for display: Persian digits, grouped, with the unit.
 * `withUnit=false` returns just the number (e.g. for compact rows).
 */
export function formatPrice(value: number, withUnit = true): string {
  const n = toPersianDigits(groupThousands(value));
  return withUnit ? `${n} تومان` : n;
}

/** Final price after applying a percentage discount. */
export function finalPrice(price: number, discountPercent: number): number {
  if (!discountPercent) return price;
  return Math.round((price * (100 - discountPercent)) / 100 / 1000) * 1000;
}

/** Absolute amount saved by a discount. */
export function savedAmount(price: number, discountPercent: number): number {
  return price - finalPrice(price, discountPercent);
}

/** "۱۲٪" — discount badge label. */
export function discountLabel(discountPercent: number): string {
  return `${toPersianDigits(discountPercent)}٪`;
}

/** Persian-digit count, e.g. review counts: 1240 -> "۱٬۲۴۰". */
export function faCount(value: number): string {
  return toPersianDigits(groupThousands(value));
}

/** Relative Persian date label for demo review timestamps. */
export function faRelativeDate(iso: string): string {
  const then = new Date(iso).getTime();
  const days = Math.round((Date.now() - then) / 86_400_000);
  if (days <= 0) return "امروز";
  if (days === 1) return "دیروز";
  if (days < 7) return `${toPersianDigits(days)} روز پیش`;
  if (days < 30) return `${toPersianDigits(Math.floor(days / 7))} هفته پیش`;
  if (days < 365) return `${toPersianDigits(Math.floor(days / 30))} ماه پیش`;
  return `${toPersianDigits(Math.floor(days / 365))} سال پیش`;
}
