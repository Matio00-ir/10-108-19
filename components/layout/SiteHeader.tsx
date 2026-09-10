import Link from "next/link";
import { Package2, Phone, ShieldCheck, Stethoscope, Truck } from "lucide-react";
import { getCategoryTree } from "@/lib/api/categories";
import { SITE, ROUTES } from "@/lib/constants";
import { fa } from "@/lib/dictionary/fa";
import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";
import { SearchBar } from "./SearchBar";
import { MegaMenu } from "./MegaMenu";
import { MobileNav } from "./MobileNav";
import { AccountMenu } from "./AccountMenu";
import { CartButton } from "./CartButton";

export async function SiteHeader() {
  const tree = await getCategoryTree();

  return (
    <header className="sticky top-0 z-[var(--z-header)] border-b border-neutral-200 bg-white/95 backdrop-blur">
      {/* Utility strip — desktop only */}
      <div className="hidden border-b border-neutral-100 bg-neutral-50 md:block">
        <Container className="flex h-9 items-center justify-between text-[12px] text-neutral-500">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5">
              <Truck size={14} className="text-success-600" />
              {fa.header.freeShippingNote}
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-success-600" />
              {fa.header.authenticGuarantee}
            </span>
          </div>
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5">
              <Stethoscope size={14} className="text-primary-600" />
              {fa.header.pharmacistConsult}
            </span>
            <a
              href={`tel:${SITE.supportPhone}`}
              className="flex items-center gap-1.5 font-bold text-neutral-600"
            >
              <Phone size={14} />
              {SITE.supportPhone}
            </a>
          </div>
        </Container>
      </div>

      {/* Main bar */}
      <Container className="py-2.5 sm:py-3">
        {/* Desktop */}
        <div className="hidden items-center gap-5 md:flex">
          <Logo />
          <div className="flex flex-1 justify-center">
            <SearchBar size="lg" className="max-w-2xl" />
          </div>
          <div className="flex items-center gap-1">
            <AccountMenu />
            <Link
              href={ROUTES.orders}
              className="flex h-11 items-center gap-2 rounded-lg px-3 text-[13px] font-bold text-neutral-700 hover:bg-neutral-100"
            >
              <Package2 size={20} />
              <span className="hidden lg:inline">{fa.header.orders}</span>
            </Link>
            <CartButton />
          </div>
        </div>

        {/* Mobile */}
        <div className="md:hidden">
          <div className="flex items-center justify-between gap-2">
            <MobileNav tree={tree} />
            <Logo />
            <CartButton variant="icon" />
          </div>
          <div className="mt-2.5">
            <SearchBar />
          </div>
        </div>
      </Container>

      {/* Primary nav — desktop only */}
      <div className="hidden border-t border-neutral-100 md:block">
        <Container className="py-1">
          <MegaMenu tree={tree} />
        </Container>
      </div>
    </header>
  );
}
