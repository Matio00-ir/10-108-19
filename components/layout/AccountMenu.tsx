"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, Heart, LogIn, Package2, UserPlus, UserRound } from "lucide-react";
import { ROUTES } from "@/lib/constants";
import { fa } from "@/lib/dictionary/fa";
import { cn } from "@/lib/cn";

const links = [
  { href: ROUTES.login, label: fa.header.login, icon: LogIn },
  { href: ROUTES.register, label: fa.header.register, icon: UserPlus },
  { href: ROUTES.orders, label: fa.header.orders, icon: Package2 },
  { href: ROUTES.account, label: "علاقه‌مندی‌ها", icon: Heart },
];

export function AccountMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex h-11 items-center gap-2 rounded-lg px-3 text-[13px] font-bold text-neutral-700 hover:bg-neutral-100"
      >
        <UserRound size={20} />
        <span className="hidden lg:inline">{fa.header.account}</span>
        <ChevronDown size={14} className={cn("transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div className="absolute end-0 top-[calc(100%+4px)] z-[var(--z-megamenu)] w-52 overflow-hidden rounded-lg border border-neutral-200 bg-white py-1 shadow-popover">
          {links.map(({ href, label, icon: I }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2.5 px-3 py-2.5 text-[13px] font-semibold text-neutral-600 hover:bg-neutral-50 hover:text-primary-700"
            >
              <I size={16} className="text-neutral-400" />
              {label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
