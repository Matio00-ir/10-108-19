import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { toPersianDigits } from "@/lib/format";

/**
 * Numbered pagination. `buildHref` keeps every other query param intact.
 * Used together with a "load more" button on the listing pages.
 */
export function Pagination({
  page,
  pageSize,
  total,
  buildHref,
}: {
  page: number;
  pageSize: number;
  total: number;
  buildHref: (page: number) => string;
}) {
  const pages = Math.ceil(total / pageSize);
  if (pages <= 1) return null;

  const window = 1;
  const nums: (number | "…")[] = [];
  for (let i = 1; i <= pages; i++) {
    if (i === 1 || i === pages || (i >= page - window && i <= page + window)) {
      nums.push(i);
    } else if (nums[nums.length - 1] !== "…") {
      nums.push("…");
    }
  }

  const linkCls =
    "flex h-10 min-w-10 items-center justify-center rounded-md border border-neutral-200 bg-white px-2 text-sm font-bold text-neutral-700 hover:border-primary-300 hover:text-primary-700";

  return (
    <nav
      aria-label="صفحه‌بندی"
      className="mt-8 flex flex-wrap items-center justify-center gap-2"
    >
      {page > 1 && (
        <Link href={buildHref(page - 1)} className={linkCls} aria-label="صفحه قبل">
          <ChevronRight size={18} />
        </Link>
      )}
      {nums.map((n, i) =>
        n === "…" ? (
          <span key={`e${i}`} className="px-1 text-neutral-400">
            …
          </span>
        ) : (
          <Link
            key={n}
            href={buildHref(n)}
            aria-current={n === page ? "page" : undefined}
            className={cn(
              linkCls,
              n === page &&
                "border-primary-600 bg-primary-600 text-white hover:text-white",
            )}
          >
            {toPersianDigits(n)}
          </Link>
        ),
      )}
      {page < pages && (
        <Link href={buildHref(page + 1)} className={linkCls} aria-label="صفحه بعد">
          <ChevronLeft size={18} />
        </Link>
      )}
    </nav>
  );
}
