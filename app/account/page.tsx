import type { Metadata } from "next";
import Link from "next/link";
import {
  ChevronLeft,
  Heart,
  LogOut,
  MapPin,
  Package2,
  UserRound,
} from "lucide-react";
import { ROUTES } from "@/lib/constants";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = { title: "حساب کاربری" };

const tiles = [
  { href: ROUTES.orders, icon: Package2, title: "سفارش‌های من", desc: "پیگیری و تاریخچه خرید" },
  { href: ROUTES.account, icon: Heart, title: "علاقه‌مندی‌ها", desc: "محصولات ذخیره‌شده" },
  { href: ROUTES.account, icon: MapPin, title: "آدرس‌ها", desc: "مدیریت آدرس‌های تحویل" },
  { href: ROUTES.account, icon: UserRound, title: "اطلاعات حساب", desc: "نام، موبایل و گذرواژه" },
];

export default function AccountPage() {
  return (
    <Container className="py-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex size-12 items-center justify-center rounded-full bg-primary-50 text-primary-600">
            <UserRound size={24} />
          </span>
          <div>
            <p className="text-base font-extrabold text-neutral-900">
              کاربر مهمان
            </p>
            <p className="text-[13px] text-neutral-400">۰۹۱۲ — — — — ۳۴</p>
          </div>
        </div>
        <Link
          href={ROUTES.login}
          className="flex items-center gap-1.5 rounded-lg border border-neutral-200 px-3 py-2 text-[13px] font-bold text-neutral-600 hover:text-danger-500"
        >
          <LogOut size={15} /> خروج
        </Link>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {tiles.map((t) => (
          <Link
            key={t.title}
            href={t.href}
            className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-white p-4 transition-colors hover:border-primary-300"
          >
            <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
              <t.icon size={20} />
            </span>
            <span className="flex-1">
              <span className="block text-[13px] font-extrabold text-neutral-800">
                {t.title}
              </span>
              <span className="block text-[12px] text-neutral-400">
                {t.desc}
              </span>
            </span>
            <ChevronLeft size={18} className="text-neutral-300" />
          </Link>
        ))}
      </div>

      <p className="mt-6 rounded-lg bg-neutral-100 p-3 text-center text-[12px] text-neutral-400">
        این بخش در نسخه نمایشی صرفاً جهت نمایش ساختار است.
      </p>
    </Container>
  );
}
