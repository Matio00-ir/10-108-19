import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export function SectionHeading({
  title,
  subtitle,
  moreHref,
  moreLabel = "مشاهده همه",
}: {
  title: string;
  subtitle?: string;
  moreHref?: string;
  moreLabel?: string;
}) {
  return (
    <div className="mb-4 flex items-end justify-between gap-3 sm:mb-6">
      <div className="min-w-0">
        <h2 className="text-lg font-extrabold text-neutral-900 sm:text-xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-1 text-[13px] text-neutral-500 sm:text-sm">
            {subtitle}
          </p>
        )}
      </div>
      {moreHref && (
        <Link
          href={moreHref}
          className="group flex shrink-0 items-center gap-1 text-[13px] font-bold text-primary-700 hover:text-primary-800"
        >
          {moreLabel}
          <ChevronLeft
            size={16}
            className="transition-transform group-hover:-translate-x-0.5"
          />
        </Link>
      )}
    </div>
  );
}
