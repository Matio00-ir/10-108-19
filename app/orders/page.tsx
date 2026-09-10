import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft, PackageCheck, Truck } from "lucide-react";
import { getBestSellers } from "@/lib/api/products";
import { ROUTES } from "@/lib/constants";
import { finalPrice, formatPrice, toPersianDigits } from "@/lib/format";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = { title: "سفارش‌های من" };

const SAMPLE = [
  { code: "MB-482910", date: "۱۴۰۴/۰۶/۰۲", status: "تحویل شده", delivered: true, take: 2 },
  { code: "MB-471655", date: "۱۴۰۴/۰۵/۲۴", status: "در حال ارسال", delivered: false, take: 3 },
];

export default async function OrdersPage() {
  const products = await getBestSellers(6);

  return (
    <Container className="py-6">
      <h1 className="text-xl font-extrabold text-neutral-900 sm:text-2xl">
        سفارش‌های من
      </h1>
      <p className="mt-1 text-[12px] text-neutral-400">
        نمونه سفارش‌های زیر صرفاً برای نمایش ساختار این بخش است.
      </p>

      <div className="mt-5 space-y-3">
        {SAMPLE.map((order, oi) => {
          const items = products.slice(oi * 2, oi * 2 + order.take);
          const total = items.reduce(
            (s, p) => s + finalPrice(p.price, p.discountPercent),
            0,
          );
          return (
            <div
              key={order.code}
              className="overflow-hidden rounded-xl border border-neutral-200 bg-white"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-100 bg-neutral-50 px-4 py-3 text-[12.5px]">
                <span className="flex items-center gap-2 font-bold text-neutral-700">
                  {order.delivered ? (
                    <PackageCheck size={16} className="text-success-600" />
                  ) : (
                    <Truck size={16} className="text-primary-600" />
                  )}
                  <span dir="ltr">{order.code}</span>
                </span>
                <span className="text-neutral-400">{order.date}</span>
                <span
                  className={
                    "rounded-full px-2 py-0.5 text-[11px] font-bold " +
                    (order.delivered
                      ? "bg-success-50 text-success-700"
                      : "bg-primary-50 text-primary-700")
                  }
                >
                  {order.status}
                </span>
              </div>

              <div className="flex items-center gap-3 px-4 py-3">
                <div className="flex -space-x-3 -space-x-reverse">
                  {items.map((p) => (
                    <span
                      key={p.id}
                      className="flex size-11 items-center justify-center rounded-lg border-2 border-white bg-primary-50 text-[10px] font-bold text-primary-700 ring-1 ring-neutral-200"
                    >
                      {p.name.slice(0, 6)}
                    </span>
                  ))}
                </div>
                <span className="text-[12px] text-neutral-500">
                  {toPersianDigits(items.length)} کالا
                </span>
                <span className="ms-auto text-[13px] font-extrabold text-neutral-900">
                  {formatPrice(total)}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <Link
        href={ROUTES.home}
        className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-bold text-primary-700 hover:underline"
      >
        ادامه خرید
        <ChevronLeft size={16} />
      </Link>
    </Container>
  );
}
