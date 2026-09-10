"use client";

import { useState } from "react";
import { Check, Mail } from "lucide-react";
import { fa } from "@/lib/dictionary/fa";

export function NewsletterCta() {
  const [done, setDone] = useState(false);

  return (
    <section className="overflow-hidden rounded-2xl bg-gradient-to-tl from-primary-800 to-primary-600 px-5 py-8 text-white sm:px-10 sm:py-10">
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <span className="flex size-11 items-center justify-center rounded-xl bg-white/15">
          <Mail size={22} />
        </span>
        <h2 className="mt-3 text-lg font-extrabold sm:text-xl">
          {fa.home.newsletterTitle}
        </h2>
        <p className="mt-1.5 text-[13px] leading-7 text-white/80 sm:text-sm">
          {fa.home.newsletterSubtitle}
        </p>

        {done ? (
          <p className="mt-5 flex items-center gap-2 rounded-lg bg-white/15 px-4 py-3 text-[13px] font-bold">
            <Check size={16} /> ایمیل شما ثبت شد. از این پس پیشنهادها را دریافت می‌کنید.
          </p>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setDone(true);
            }}
            className="mt-5 flex w-full max-w-md flex-col gap-2 sm:flex-row"
          >
            <input
              type="email"
              required
              dir="ltr"
              placeholder={fa.home.newsletterPlaceholder}
              className="h-11 flex-1 rounded-lg border-0 bg-white px-4 text-sm text-neutral-800 outline-none placeholder:text-neutral-400"
            />
            <button
              type="submit"
              className="h-11 shrink-0 rounded-lg bg-accent-500 px-6 text-sm font-extrabold text-neutral-900 hover:bg-accent-400"
            >
              {fa.home.newsletterCta}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
