"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, LayoutGrid } from "lucide-react";
import type { Category } from "@/types";
import { ROUTES } from "@/lib/constants";
import { fa } from "@/lib/dictionary/fa";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

export function MegaMenu({ tree }: { tree: Category[] }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const open = (id: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenId(id);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenId(null), 120);
  };

  const activeAll = openId === "__all__";
  const activeCat = tree.find((c) => c.id === openId) ?? null;

  return (
    <div
      className="relative"
      onMouseLeave={scheduleClose}
      onKeyDown={(e) => e.key === "Escape" && setOpenId(null)}
    >
      <ul className="no-scrollbar flex items-stretch gap-1 overflow-x-auto lg:flex-wrap lg:overflow-visible">
        <li className="shrink-0" onMouseEnter={() => open("__all__")}>
          <button
            type="button"
            aria-expanded={activeAll}
            onFocus={() => open("__all__")}
            onClick={() => setOpenId(activeAll ? null : "__all__")}
            className={cn(
              "flex h-11 items-center gap-2 whitespace-nowrap rounded-md px-3 text-[13px] font-extrabold transition-colors",
              activeAll
                ? "bg-primary-50 text-primary-700"
                : "text-neutral-700 hover:bg-neutral-100",
            )}
          >
            <LayoutGrid size={17} />
            {fa.header.allCategories}
            <ChevronDown
              size={15}
              className={cn("transition-transform", activeAll && "rotate-180")}
            />
          </button>
        </li>

        {tree.map((cat) => {
          const active = openId === cat.id;
          return (
            <li key={cat.id} className="shrink-0" onMouseEnter={() => open(cat.id)}>
              <Link
                href={ROUTES.category([cat.slug])}
                onFocus={() => open(cat.id)}
                aria-expanded={active}
                className={cn(
                  "flex h-11 items-center gap-1.5 whitespace-nowrap rounded-md px-3 text-[13px] font-bold transition-colors",
                  active
                    ? "bg-primary-50 text-primary-700"
                    : "text-neutral-700 hover:bg-neutral-100",
                )}
              >
                {cat.name}
                {cat.children?.length ? (
                  <ChevronDown
                    size={14}
                    className={cn(
                      "text-neutral-400 transition-transform",
                      active && "rotate-180 text-primary-500",
                    )}
                  />
                ) : null}
              </Link>
            </li>
          );
        })}
      </ul>

      {(activeAll || activeCat) && (
        <div
          onMouseEnter={() => open(openId!)}
          className="absolute inset-x-0 top-[calc(100%+6px)] z-[var(--z-megamenu)] rounded-xl border border-neutral-200 bg-white p-5 shadow-popover"
        >
          {activeAll ? (
            <AllPanel tree={tree} />
          ) : activeCat ? (
            <CategoryPanel category={activeCat} />
          ) : null}
        </div>
      )}
    </div>
  );
}

function AllPanel({ tree }: { tree: Category[] }) {
  return (
    <div className="grid grid-cols-3 gap-x-6 gap-y-5">
      {tree.map((cat) => (
        <div key={cat.id}>
          <Link
            href={ROUTES.category([cat.slug])}
            className="flex items-center gap-2 text-[13px] font-extrabold text-neutral-900 hover:text-primary-700"
          >
            <span className="flex size-7 items-center justify-center rounded-md bg-primary-50 text-primary-600">
              <Icon name={cat.icon} size={16} />
            </span>
            {cat.name}
          </Link>
          <ul className="mt-2 space-y-1.5 ps-9">
            {(cat.children ?? []).slice(0, 5).map((child) => (
              <li key={child.id}>
                <Link
                  href={ROUTES.category([cat.slug, child.slug])}
                  className="text-[12.5px] text-neutral-500 hover:text-primary-700"
                >
                  {child.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function CategoryPanel({ category }: { category: Category }) {
  const groups = category.children ?? [];
  return (
    <div className="flex gap-6">
      <div className="grid flex-1 grid-cols-4 gap-x-6 gap-y-5">
        {groups.map((group) => (
          <div key={group.id}>
            <Link
              href={ROUTES.category([category.slug, group.slug])}
              className="text-[13px] font-extrabold text-neutral-900 hover:text-primary-700"
            >
              {group.name}
            </Link>
            <ul className="mt-2 space-y-1.5">
              {(group.children ?? []).map((leaf) => (
                <li key={leaf.id}>
                  <Link
                    href={ROUTES.category([category.slug, group.slug, leaf.slug])}
                    className={cn(
                      "text-[12.5px] hover:text-primary-700",
                      leaf.featured
                        ? "font-bold text-primary-700"
                        : "text-neutral-500",
                    )}
                  >
                    {leaf.name}
                  </Link>
                </li>
              ))}
              {!group.children?.length && (
                <li>
                  <Link
                    href={ROUTES.category([category.slug, group.slug])}
                    className="text-[12.5px] text-neutral-500 hover:text-primary-700"
                  >
                    مشاهده همه
                  </Link>
                </li>
              )}
            </ul>
          </div>
        ))}
      </div>

      <Link
        href={ROUTES.category([category.slug])}
        className="hidden w-56 shrink-0 flex-col justify-between rounded-xl bg-gradient-to-b from-primary-600 to-primary-700 p-4 text-white xl:flex"
      >
        <span className="flex size-10 items-center justify-center rounded-lg bg-white/15">
          <Icon name={category.icon} size={20} />
        </span>
        <span>
          <span className="block text-sm font-extrabold">{category.name}</span>
          <span className="mt-1 block text-[12px] leading-6 text-white/80 clamp-3">
            {category.description}
          </span>
          <span className="mt-3 inline-block text-[12px] font-bold underline underline-offset-4">
            مشاهده همه محصولات
          </span>
        </span>
      </Link>
    </div>
  );
}
