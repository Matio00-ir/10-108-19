"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  Menu,
  Package2,
  Phone,
  UserRound,
} from "lucide-react";
import type { Category } from "@/types";
import { ROUTES, SITE } from "@/lib/constants";
import { fa } from "@/lib/dictionary/fa";
import { Drawer } from "@/components/ui/Drawer";
import { Accordion } from "@/components/ui/Accordion";
import { Icon } from "@/components/ui/Icon";

export function MobileNav({ tree }: { tree: Category[] }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={fa.header.allCategories}
        className="flex size-11 items-center justify-center rounded-lg text-neutral-700 hover:bg-neutral-100"
      >
        <Menu size={24} />
      </button>

      <Drawer
        open={open}
        onClose={close}
        side="start"
        title={SITE.name}
        widthClass="w-[86vw] max-w-sm"
      >
        <div className="flex flex-col">
          <div className="grid grid-cols-2 gap-2 border-b border-neutral-100 p-4">
            <Link
              href={ROUTES.login}
              onClick={close}
              className="flex items-center justify-center gap-2 rounded-lg border border-neutral-200 py-2.5 text-[13px] font-bold text-neutral-700"
            >
              <UserRound size={16} /> {fa.header.login}
            </Link>
            <Link
              href={ROUTES.orders}
              onClick={close}
              className="flex items-center justify-center gap-2 rounded-lg border border-neutral-200 py-2.5 text-[13px] font-bold text-neutral-700"
            >
              <Package2 size={16} /> {fa.header.orders}
            </Link>
          </div>

          <nav className="px-4">
            {tree.map((cat) => (
              <Accordion
                key={cat.id}
                title={
                  <span className="flex items-center gap-2.5">
                    <span className="flex size-8 items-center justify-center rounded-md bg-primary-50 text-primary-600">
                      <Icon name={cat.icon} size={17} />
                    </span>
                    {cat.name}
                  </span>
                }
              >
                <div className="ps-10">
                  <Link
                    href={ROUTES.category([cat.slug])}
                    onClick={close}
                    className="flex items-center gap-1 py-2 text-[13px] font-bold text-primary-700"
                  >
                    مشاهده همه {cat.name}
                    <ChevronLeft size={14} />
                  </Link>
                  {(cat.children ?? []).map((group) => (
                    <div key={group.id} className="border-t border-neutral-100 py-1">
                      <Link
                        href={ROUTES.category([cat.slug, group.slug])}
                        onClick={close}
                        className="block py-2 text-[13px] font-semibold text-neutral-700"
                      >
                        {group.name}
                      </Link>
                      {group.children?.length ? (
                        <ul className="ps-3">
                          {group.children.map((leaf) => (
                            <li key={leaf.id}>
                              <Link
                                href={ROUTES.category([
                                  cat.slug,
                                  group.slug,
                                  leaf.slug,
                                ])}
                                onClick={close}
                                className="block py-1.5 text-[12.5px] text-neutral-500"
                              >
                                {leaf.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  ))}
                </div>
              </Accordion>
            ))}
          </nav>

          <a
            href={`tel:${SITE.supportPhone}`}
            className="m-4 flex items-center justify-center gap-2 rounded-lg bg-neutral-100 py-3 text-[13px] font-bold text-neutral-600"
          >
            <Phone size={15} /> پشتیبانی: {SITE.supportPhone}
          </a>
        </div>
      </Drawer>
    </>
  );
}
