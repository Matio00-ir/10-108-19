"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BadgeInfo,
  CreditCard,
  Landmark,
  MapPin,
  ShoppingBag,
  Truck,
  Wallet,
} from "lucide-react";
import { FREE_SHIPPING_THRESHOLD, ROUTES } from "@/lib/constants";
import { formatPrice, toPersianDigits } from "@/lib/format";
import { fa } from "@/lib/dictionary/fa";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { buttonClasses } from "@/components/ui/Button";
import { useCart } from "@/features/cart/CartContext";

const PROVINCES = [
  "تهران",
  "البرز",
  "اصفهان",
  "فارس",
  "خراسان رضوی",
  "آذربایجان شرقی",
  "گیلان",
  "مازندران",
  "خوزستان",
  "کرمان",
];

const SHIPPING = [
  { id: "express", label: "پیک سریع تهران", note: "تحویل امروز/فردا", fee: 69_000 },
  { id: "post", label: "پست پیشتاز", note: "۲ تا ۴ روز کاری", fee: 49_000 },
  { id: "pickup", label: "تحویل حضوری از داروخانه", note: "رایگان", fee: 0 },
];

const PAYMENT = [
  { id: "gateway", label: "پرداخت اینترنتی", note: "درگاه امن بانکی", icon: CreditCard },
  { id: "card", label: "کارت به کارت", note: "ثبت فیش پس از واریز", icon: Landmark },
  { id: "cod", label: "پرداخت در محل", note: "فقط تهران", icon: Wallet },
];

const field =
  "h-11 w-full rounded-lg border border-neutral-300 px-3 text-sm outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100";

export default function CheckoutPage() {
  const router = useRouter();
  const { lines, totals, clear, hydrated } = useCart();
  const [shipping, setShipping] = useState("express");
  const [payment, setPayment] = useState("gateway");
  const [submitting, setSubmitting] = useState(false);

  const shipFee = useMemo(() => {
    if (totals.payable >= FREE_SHIPPING_THRESHOLD && shipping !== "express")
      return 0;
    return SHIPPING.find((s) => s.id === shipping)?.fee ?? 0;
  }, [shipping, totals.payable]);

  const grandTotal = totals.payable + shipFee;

  if (hydrated && lines.length === 0) {
    return (
      <Container className="py-10">
        <EmptyState
          icon={ShoppingBag}
          title="سبد خرید شما خالی است"
          description="برای تکمیل خرید ابتدا محصولی به سبد اضافه کنید."
          action={{ label: fa.common.continueShopping, href: ROUTES.home }}
        />
      </Container>
    );
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const code = "MB-" + Math.floor(100000 + Math.random() * 899999);
    setTimeout(() => {
      clear();
      router.push(`${ROUTES.checkoutSuccess}?code=${code}`);
    }, 700);
  };

  return (
    <Container className="py-4 sm:py-6">
      <h1 className="text-xl font-extrabold text-neutral-900 sm:text-2xl">
        {fa.checkout.title}
      </h1>

      <div className="mt-3 flex items-start gap-2 rounded-lg border border-accent-200 bg-accent-50 p-3 text-[12.5px] leading-6 text-accent-800">
        <BadgeInfo size={16} className="mt-0.5 shrink-0" />
        {fa.checkout.demoNote}
      </div>

      <form
        onSubmit={submit}
        className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]"
      >
        <div className="space-y-6">
          {/* Address */}
          <section className="rounded-xl border border-neutral-200 bg-white p-4 sm:p-5">
            <h2 className="flex items-center gap-2 text-sm font-extrabold text-neutral-900">
              <MapPin size={17} className="text-primary-600" />
              {fa.checkout.address}
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <input required placeholder="نام و نام خانوادگی" className={field} />
              <input
                required
                inputMode="numeric"
                placeholder="شماره موبایل"
                className={field}
              />
              <select required defaultValue="" className={field}>
                <option value="" disabled>
                  انتخاب استان
                </option>
                {PROVINCES.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
              <input required placeholder="شهر" className={field} />
              <textarea
                required
                rows={3}
                placeholder="نشانی کامل پستی"
                className="rounded-lg border border-neutral-300 p-3 text-sm outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 sm:col-span-2"
              />
              <input
                required
                inputMode="numeric"
                placeholder="کد پستی ۱۰ رقمی"
                className={field}
              />
            </div>
          </section>

          {/* Shipping */}
          <section className="rounded-xl border border-neutral-200 bg-white p-4 sm:p-5">
            <h2 className="flex items-center gap-2 text-sm font-extrabold text-neutral-900">
              <Truck size={17} className="text-primary-600" />
              {fa.checkout.shippingMethod}
            </h2>
            <div className="mt-4 space-y-2">
              {SHIPPING.map((s) => (
                <label
                  key={s.id}
                  className={
                    "flex cursor-pointer items-center gap-3 rounded-lg border p-3 text-[13px] transition-colors " +
                    (shipping === s.id
                      ? "border-primary-500 bg-primary-50/60"
                      : "border-neutral-200 hover:border-neutral-300")
                  }
                >
                  <input
                    type="radio"
                    name="shipping"
                    checked={shipping === s.id}
                    onChange={() => setShipping(s.id)}
                    className="size-4 accent-primary-600"
                  />
                  <span className="flex-1 font-bold text-neutral-800">
                    {s.label}
                    <span className="ms-2 font-normal text-neutral-400">
                      {s.note}
                    </span>
                  </span>
                  <span className="font-bold text-neutral-700">
                    {s.fee === 0 ? "رایگان" : formatPrice(s.fee, false)}
                  </span>
                </label>
              ))}
            </div>
          </section>

          {/* Payment */}
          <section className="rounded-xl border border-neutral-200 bg-white p-4 sm:p-5">
            <h2 className="flex items-center gap-2 text-sm font-extrabold text-neutral-900">
              <CreditCard size={17} className="text-primary-600" />
              {fa.checkout.paymentMethod}
            </h2>
            <div className="mt-4 grid gap-2 sm:grid-cols-3">
              {PAYMENT.map((p) => {
                const I = p.icon;
                return (
                  <label
                    key={p.id}
                    className={
                      "flex cursor-pointer flex-col items-center gap-1.5 rounded-lg border p-3 text-center text-[12px] transition-colors " +
                      (payment === p.id
                        ? "border-primary-500 bg-primary-50/60"
                        : "border-neutral-200 hover:border-neutral-300")
                    }
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={payment === p.id}
                      onChange={() => setPayment(p.id)}
                      className="sr-only"
                    />
                    <I size={20} className="text-primary-600" />
                    <span className="font-bold text-neutral-800">{p.label}</span>
                    <span className="text-neutral-400">{p.note}</span>
                  </label>
                );
              })}
            </div>
          </section>
        </div>

        {/* Summary */}
        <div className="lg:sticky lg:top-40 lg:self-start">
          <div className="rounded-xl border border-neutral-200 bg-white p-4 sm:p-5">
            <h2 className="mb-3 text-base font-extrabold text-neutral-900">
              {fa.checkout.summary}
            </h2>
            <ul className="mb-3 max-h-52 space-y-2 overflow-y-auto text-[12.5px]">
              {lines.map((l) => (
                <li key={l.product.id} className="flex justify-between gap-2">
                  <span className="clamp-1 text-neutral-600">
                    {l.product.name}
                    <span className="text-neutral-400">
                      {" "}
                      ×{toPersianDigits(l.quantity)}
                    </span>
                  </span>
                  <span className="shrink-0 font-bold text-neutral-700">
                    {formatPrice(l.lineTotal, false)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="space-y-2 border-t border-dashed border-neutral-200 pt-3 text-[13px]">
              <div className="flex justify-between">
                <span className="text-neutral-500">{fa.cart.subtotal}</span>
                <span className="font-bold">{formatPrice(totals.subtotal)}</span>
              </div>
              {totals.discount > 0 && (
                <div className="flex justify-between">
                  <span className="text-neutral-500">{fa.cart.discount}</span>
                  <span className="font-bold text-success-600">
                    −{formatPrice(totals.discount)}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-neutral-500">{fa.cart.shipping}</span>
                <span className="font-bold">
                  {shipFee === 0 ? (
                    <span className="text-success-600">رایگان</span>
                  ) : (
                    formatPrice(shipFee)
                  )}
                </span>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-neutral-200 pt-3">
              <span className="text-sm font-bold text-neutral-700">
                {fa.cart.total}
              </span>
              <span className="text-lg font-extrabold text-primary-800">
                {formatPrice(grandTotal)}
              </span>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className={buttonClasses({
                variant: "primary",
                size: "lg",
                fullWidth: true,
                className: "mt-4",
              })}
            >
              {submitting ? "در حال ثبت…" : fa.checkout.placeOrder}
            </button>
            <Link
              href={ROUTES.cart}
              className="mt-2 block text-center text-[12px] font-bold text-primary-700 hover:underline"
            >
              بازگشت به سبد خرید
            </Link>
          </div>
        </div>
      </form>
    </Container>
  );
}
