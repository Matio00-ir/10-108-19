import type { ProductSpec } from "@/types";

export function ProductSpecsTable({ specs }: { specs: ProductSpec[] }) {
  return (
    <dl className="overflow-hidden rounded-xl border border-neutral-200">
      {specs.map((s, i) => (
        <div
          key={s.label}
          className={
            "flex gap-3 px-4 py-3 text-[13px] " +
            (i % 2 ? "bg-white" : "bg-neutral-50")
          }
        >
          <dt className="w-32 shrink-0 font-semibold text-neutral-400">
            {s.label}
          </dt>
          <dd className="font-semibold text-neutral-700">{s.value}</dd>
        </div>
      ))}
    </dl>
  );
}
