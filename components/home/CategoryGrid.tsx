import Link from "next/link";
import type { Category } from "@/types";
import { ROUTES } from "@/lib/constants";
import { Icon } from "@/components/ui/Icon";

export function CategoryGrid({ categories }: { categories: Category[] }) {
  return (
    <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4 sm:gap-3 lg:grid-cols-6">
      {categories.map((cat) => (
        <Link
          key={cat.id}
          href={ROUTES.category([cat.slug])}
          className="group flex flex-col items-center gap-2 rounded-xl border border-neutral-200 bg-white p-3 text-center transition-all hover:border-primary-300 hover:shadow-card sm:p-4"
        >
          <span className="flex size-12 items-center justify-center rounded-full bg-primary-50 text-primary-600 transition-colors group-hover:bg-primary-600 group-hover:text-white sm:size-14">
            <Icon name={cat.icon} size={24} />
          </span>
          <span className="text-[12px] font-bold leading-5 text-neutral-700 sm:text-[13px]">
            {cat.name}
          </span>
        </Link>
      ))}
    </div>
  );
}
