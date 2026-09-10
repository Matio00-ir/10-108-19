"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

export function Accordion({
  title,
  children,
  defaultOpen = false,
  className,
  contentClassName,
}: {
  title: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
  contentClassName?: string;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={cn("border-b border-neutral-200", className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex min-h-12 w-full items-center justify-between gap-2 py-3 text-start text-sm font-bold text-neutral-800"
      >
        <span>{title}</span>
        <ChevronDown
          size={18}
          className={cn(
            "shrink-0 text-neutral-400 transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>
      <div
        className={cn(
          "grid transition-all duration-200 ease-[var(--ease-out-soft)]",
          open ? "grid-rows-[1fr] pb-4" : "grid-rows-[0fr]",
        )}
      >
        <div className={cn("overflow-hidden", contentClassName)}>{children}</div>
      </div>
    </div>
  );
}
