"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { ROUTES } from "@/lib/constants";
import { fa } from "@/lib/dictionary/fa";
import { POPULAR_SEARCHES } from "@/lib/api/search";
import { cn } from "@/lib/cn";

export function SearchBar({
  size = "md",
  autoFocus = false,
  onSubmitted,
  className,
}: {
  size?: "md" | "lg";
  autoFocus?: boolean;
  onSubmitted?: () => void;
  className?: string;
}) {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const go = (q: string) => {
    const term = q.trim();
    if (!term) return;
    router.push(ROUTES.search(term));
    setFocused(false);
    inputRef.current?.blur();
    onSubmitted?.();
  };

  return (
    <div className={cn("relative w-full", className)}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          go(value);
        }}
        role="search"
        className={cn(
          "flex items-center gap-2 rounded-lg border bg-white ps-3 pe-1 transition-colors",
          focused ? "border-primary-400 ring-2 ring-primary-100" : "border-neutral-300",
          size === "lg" ? "h-12" : "h-11",
        )}
      >
        <Search size={18} className="shrink-0 text-neutral-400" />
        <input
          ref={inputRef}
          type="search"
          autoFocus={autoFocus}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          placeholder={fa.common.searchPlaceholder}
          aria-label={fa.common.search}
          className="h-full min-w-0 flex-1 bg-transparent text-sm text-neutral-800 outline-none placeholder:text-neutral-400"
          enterKeyHint="search"
        />
        {value && (
          <button
            type="button"
            aria-label={fa.common.clear}
            onClick={() => {
              setValue("");
              inputRef.current?.focus();
            }}
            className="flex size-8 shrink-0 items-center justify-center rounded-md text-neutral-400 hover:bg-neutral-100"
          >
            <X size={16} />
          </button>
        )}
        <button
          type="submit"
          className="flex h-9 shrink-0 items-center rounded-md bg-primary-600 px-4 text-[13px] font-bold text-white hover:bg-primary-700"
        >
          {fa.common.search}
        </button>
      </form>

      {focused && !value && (
        <div className="absolute inset-x-0 top-[calc(100%+8px)] z-[var(--z-megamenu)] rounded-lg border border-neutral-200 bg-white p-3 shadow-popover">
          <p className="mb-2 text-[12px] font-bold text-neutral-400">
            {fa.search.popular}
          </p>
          <div className="flex flex-wrap gap-2">
            {POPULAR_SEARCHES.map((term) => (
              <button
                key={term}
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  setValue(term);
                  go(term);
                }}
                className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-[12px] font-semibold text-neutral-600 hover:border-primary-300 hover:text-primary-700"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
