import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Package2, Truck } from "lucide-react";
import { ROUTES } from "@/lib/constants";
import { fa } from "@/lib/dictionary/fa";
import { Container } from "@/components/ui/Container";
import { buttonClasses } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "سفارش ثبت شد",
  robots: { index: false, follow: false },
};

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ code?: string }>;
}) {
  const { code } = await searchParams;

  return (
    <Container className="flex flex-col items-center py-16 text-center">
      <span className="flex size-16 items-center justify-center rounded-full bg-success-50 text-success-600">
        <CheckCircle2 size={34} />
      </span>
      <h1 className="mt-4 text-xl font-extrabold text-neutral-900 sm:text-2xl">
        {fa.checkout.successTitle}
      </h1>
      <p className="mt-2 text-sm text-neutral-500">
        {fa.checkout.successBody}{" "}
        <span dir="ltr" className="font-extrabold text-neutral-900">
          {code ?? "MB-000000"}
        </span>
      </p>

      <div className="mt-6 w-full max-w-md rounded-xl border border-neutral-200 bg-white p-5 text-start">
        <div className="flex items-center gap-3 border-b border-neutral-100 pb-3">
          <Package2 size={18} className="text-primary-600" />
          <div className="text-[13px]">
            <p className="font-bold text-neutral-800">در حال آماده‌سازی</p>
            <p className="text-neutral-400">سفارش شما در انبار پردازش می‌شود.</p>
          </div>
        </div>
        <div className="flex items-center gap-3 pt-3">
          <Truck size={18} className="text-primary-600" />
          <div className="text-[13px]">
            <p className="font-bold text-neutral-800">ارسال</p>
            <p className="text-neutral-400">
              کد رهگیری مرسوله پس از تحویل به پست پیامک می‌شود. (نمایشی)
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link
          href={ROUTES.orders}
          className={buttonClasses({ variant: "outline" })}
        >
          پیگیری سفارش‌ها
        </Link>
        <Link
          href={ROUTES.home}
          className={buttonClasses({ variant: "secondary" })}
        >
          {fa.checkout.successCta}
        </Link>
      </div>
    </Container>
  );
}
