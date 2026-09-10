import type { Benefit } from "@/data/home";
import { Icon } from "@/components/ui/Icon";

export function BenefitsBar({ benefits }: { benefits: Benefit[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {benefits.map((b) => (
        <div
          key={b.title}
          className="flex items-center gap-2.5 rounded-xl border border-neutral-200 bg-white p-3 sm:items-start sm:gap-3 sm:p-3.5"
        >
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600 sm:size-10">
            <Icon name={b.icon} size={18} />
          </span>
          <div className="min-w-0">
            <p className="text-[12.5px] font-extrabold text-neutral-800 sm:text-[13px]">
              {b.title}
            </p>
            <p className="mt-0.5 hidden text-[11.5px] leading-5 text-neutral-500 sm:block">
              {b.text}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
