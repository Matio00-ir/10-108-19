import Link from "next/link";
import { ChevronLeft, Home } from "lucide-react";
import { cn } from "@/lib/cn";

export interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumbs({
  items,
  className,
}: {
  items: Crumb[];
  className?: string;
}) {
  return (
    <nav
      aria-label="مسیر ناوبری"
      className={cn("min-w-0 text-[13px] text-neutral-500", className)}
    >
      <ol className="flex flex-wrap items-center gap-x-1 gap-y-1">
        <li className="flex items-center">
          <Link
            href="/"
            className="flex items-center gap-1 hover:text-primary-700"
          >
            <Home size={14} />
            <span className="sr-only sm:not-sr-only">خانه</span>
          </Link>
        </li>
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={i} className="flex min-w-0 items-center">
              <ChevronLeft size={14} className="mx-0.5 shrink-0 text-neutral-300" />
              {item.href && !last ? (
                <Link
                  href={item.href}
                  className="truncate hover:text-primary-700"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className="truncate font-semibold text-neutral-700"
                  aria-current={last ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
