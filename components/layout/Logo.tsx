import Link from "next/link";
import { Cross } from "lucide-react";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/cn";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label={SITE.name}
      className={cn("flex shrink-0 items-center gap-2", className)}
    >
      <span className="flex size-9 items-center justify-center rounded-lg bg-primary-600 text-white sm:size-10">
        <Cross size={20} strokeWidth={2.5} />
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-base font-extrabold text-neutral-900 sm:text-[17px]">
          {SITE.name}
        </span>
        <span className="mt-0.5 hidden text-[10px] font-medium text-neutral-400 sm:block">
          مکمل و محصولات داروخانه‌ای
        </span>
      </span>
    </Link>
  );
}
