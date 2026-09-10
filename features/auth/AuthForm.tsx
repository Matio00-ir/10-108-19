"use client";

import { useState } from "react";
import Link from "next/link";
import { BadgeInfo, Check, Eye, EyeOff } from "lucide-react";
import { ROUTES } from "@/lib/constants";
import { fa } from "@/lib/dictionary/fa";
import { buttonClasses } from "@/components/ui/Button";

const field =
  "h-11 w-full rounded-lg border border-neutral-300 px-3 text-sm outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100";
const passField = field + " pe-11";

export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const isLogin = mode === "login";
  const [showPass, setShowPass] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const phone = String(data.get("phone") ?? "");
    if (!/^09\d{9}$/.test(phone.replace(/\D/g, "").replace(/^98/, "0"))) {
      setError("شماره موبایل معتبر نیست (نمونه: ۰۹۱۲۳۴۵۶۷۸۹).");
      return;
    }
    setError(null);
    setDone(true);
  };

  if (done) {
    return (
      <div className="text-center">
        <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-success-50 text-success-600">
          <Check size={24} />
        </span>
        <h1 className="mt-3 text-base font-extrabold text-neutral-900">
          {isLogin ? "خوش آمدید!" : "حساب شما ساخته شد"}
        </h1>
        <p className="mt-1.5 text-[13px] leading-6 text-neutral-500">
          این یک نسخه نمایشی است؛ ورود واقعی انجام نشد. می‌توانید ادامه خرید را
          آزمایش کنید.
        </p>
        <Link
          href={ROUTES.home}
          className={buttonClasses({
            variant: "secondary",
            fullWidth: true,
            className: "mt-4",
          })}
        >
          رفتن به فروشگاه
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-base font-extrabold text-neutral-900">
        {isLogin ? fa.auth.loginTitle : fa.auth.registerTitle}
      </h1>

      <div className="mt-3 flex items-start gap-2 rounded-lg bg-accent-50 p-2.5 text-[11.5px] leading-5 text-accent-800">
        <BadgeInfo size={14} className="mt-0.5 shrink-0" />
        {fa.auth.demoNote}
      </div>

      <form onSubmit={submit} className="mt-4 space-y-3">
        {!isLogin && (
          <input name="name" required placeholder={fa.auth.fullName} className={field} />
        )}
        <input
          name="phone"
          required
          inputMode="numeric"
          placeholder={fa.auth.phone}
          className={field}
        />
        <div className="relative">
          <input
            name="password"
            required
            minLength={6}
            type={showPass ? "text" : "password"}
            placeholder={fa.auth.password}
            className={passField}
          />
          <button
            type="button"
            onClick={() => setShowPass((v) => !v)}
            aria-label={showPass ? "پنهان کردن گذرواژه" : "نمایش گذرواژه"}
            className="absolute inset-y-0 end-2 my-auto flex size-8 items-center justify-center rounded-md text-neutral-400 hover:bg-neutral-100"
          >
            {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        {error && (
          <p className="text-[12px] font-bold text-danger-500">{error}</p>
        )}

        <button
          type="submit"
          className={buttonClasses({
            variant: "secondary",
            size: "lg",
            fullWidth: true,
          })}
        >
          {isLogin ? fa.auth.loginCta : fa.auth.registerCta}
        </button>
      </form>

      <p className="mt-4 text-center text-[13px] text-neutral-500">
        {isLogin ? fa.auth.noAccount : fa.auth.haveAccount}{" "}
        <Link
          href={isLogin ? ROUTES.register : ROUTES.login}
          className="font-bold text-primary-700 hover:underline"
        >
          {isLogin ? fa.auth.registerCta : fa.auth.loginCta}
        </Link>
      </p>
    </div>
  );
}
