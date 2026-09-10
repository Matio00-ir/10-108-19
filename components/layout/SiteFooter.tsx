import Link from "next/link";
import {
  BadgeCheck,
  Camera,
  Cross,
  Headphones,
  Send,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { getCategoryTree } from "@/lib/api/categories";
import { SITE, ROUTES } from "@/lib/constants";
import { fa } from "@/lib/dictionary/fa";
import { Container } from "@/components/ui/Container";

const quickLinks = [
  { href: ROUTES.home, label: "صفحه اصلی" },
  { href: "/category/sport-supplements", label: "مکمل‌های ورزشی" },
  { href: "/category/vitamins-minerals", label: "ویتامین و مواد معدنی" },
  { href: "/search?q=%D9%BE%D8%B1%D9%81%D8%B1%D9%88%D8%B4", label: "پرفروش‌ترین‌ها" },
];

const serviceLinks = [
  { href: ROUTES.orders, label: "پیگیری سفارش" },
  { href: ROUTES.cart, label: "سبد خرید" },
  { href: "#", label: "شرایط بازگشت کالا" },
  { href: "#", label: "سوالات متداول" },
  { href: "#", label: "حریم خصوصی" },
];

export async function SiteFooter() {
  const tree = await getCategoryTree();

  return (
    <footer className="mt-14 border-t border-neutral-200 bg-white">
      {/* trust bar */}
      <div className="border-b border-neutral-100 bg-neutral-50">
        <Container className="grid grid-cols-2 gap-4 py-6 md:grid-cols-4">
          {[
            { icon: BadgeCheck, t: "ضمانت اصالت کالا" },
            { icon: Truck, t: "ارسال سریع سراسر کشور" },
            { icon: ShieldCheck, t: "پرداخت امن" },
            { icon: Headphones, t: "پشتیبانی و مشاوره داروساز" },
          ].map(({ icon: I, t }) => (
            <div key={t} className="flex items-center gap-2.5">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                <I size={20} />
              </span>
              <span className="text-[12.5px] font-bold text-neutral-600">{t}</span>
            </div>
          ))}
        </Container>
      </div>

      <Container className="grid grid-cols-2 gap-x-4 gap-y-8 py-10 md:grid-cols-12">
        <div className="col-span-2 md:col-span-4">
          <div className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-lg bg-primary-600 text-white">
              <Cross size={18} strokeWidth={2.5} />
            </span>
            <span className="text-base font-extrabold text-neutral-900">
              {SITE.name}
            </span>
          </div>
          <p className="mt-3 text-[13px] leading-7 text-neutral-500">
            {fa.footer.aboutText}
          </p>
          <div className="mt-4 flex gap-2">
            <a
              href="#"
              aria-label="اینستاگرام"
              className="flex size-9 items-center justify-center rounded-lg border border-neutral-200 text-neutral-500 hover:text-primary-700"
            >
              <Camera size={18} />
            </a>
            <a
              href="#"
              aria-label="تلگرام"
              className="flex size-9 items-center justify-center rounded-lg border border-neutral-200 text-neutral-500 hover:text-primary-700"
            >
              <Send size={18} />
            </a>
          </div>
        </div>

        <div className="md:col-span-2">
          <h3 className="text-[13px] font-extrabold text-neutral-900">
            {fa.footer.quickLinks}
          </h3>
          <ul className="mt-3 space-y-2">
            {quickLinks.map((l) => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  className="text-[12.5px] text-neutral-500 hover:text-primary-700"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <h3 className="text-[13px] font-extrabold text-neutral-900">
            دسته‌بندی‌ها
          </h3>
          <ul className="mt-3 space-y-2">
            {tree.slice(0, 6).map((c) => (
              <li key={c.id}>
                <Link
                  href={ROUTES.category([c.slug])}
                  className="text-[12.5px] text-neutral-500 hover:text-primary-700"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <h3 className="text-[13px] font-extrabold text-neutral-900">
            {fa.footer.customerService}
          </h3>
          <ul className="mt-3 space-y-2">
            {serviceLinks.map((l) => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  className="text-[12.5px] text-neutral-500 hover:text-primary-700"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className="border-t border-neutral-100 bg-neutral-50">
        <Container className="flex flex-col items-center justify-between gap-2 py-4 text-center text-[11.5px] text-neutral-400 sm:flex-row sm:text-start">
          <span>
            © {new Date().toLocaleDateString("fa-IR", { year: "numeric" })} —{" "}
            {fa.footer.rights}
          </span>
          <span className="font-semibold text-accent-700">
            {fa.footer.disclaimer}
          </span>
        </Container>
      </div>
    </footer>
  );
}
