"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/cn";

export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

/**
 * Scrollable tab bar (works down to 360px) with panels below.
 * On very small screens the tab list scrolls horizontally without clipping.
 */
export function Tabs({
  items,
  className,
}: {
  items: TabItem[];
  className?: string;
}) {
  const [active, setActive] = useState(items[0]?.id);
  const uid = useId();

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-label="بخش‌های محصول"
        className="no-scrollbar -mx-1 flex gap-1 overflow-x-auto border-b border-neutral-200 px-1"
      >
        {items.map((t) => {
          const selected = t.id === active;
          return (
            <button
              key={t.id}
              role="tab"
              id={`${uid}-tab-${t.id}`}
              aria-selected={selected}
              aria-controls={`${uid}-panel-${t.id}`}
              onClick={() => setActive(t.id)}
              className={cn(
                "shrink-0 whitespace-nowrap border-b-2 px-3 pb-3 pt-2 text-[13px] font-bold transition-colors sm:text-sm",
                selected
                  ? "border-primary-600 text-primary-700"
                  : "border-transparent text-neutral-500 hover:text-neutral-800",
              )}
            >
              {t.label}
            </button>
          );
        })}
      </div>
      {items.map((t) => (
        <div
          key={t.id}
          role="tabpanel"
          id={`${uid}-panel-${t.id}`}
          aria-labelledby={`${uid}-tab-${t.id}`}
          hidden={t.id !== active}
          className="pt-5 text-sm leading-8 text-neutral-700"
        >
          {t.content}
        </div>
      ))}
    </div>
  );
}
