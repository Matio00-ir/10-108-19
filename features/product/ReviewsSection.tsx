"use client";

import { useState } from "react";
import { Check, Star, ThumbsUp } from "lucide-react";
import type { Review } from "@/types";
import type { RatingSummary } from "@/lib/api/reviews";
import { faCount, faRelativeDate, toPersianDigits } from "@/lib/format";
import { Rating } from "@/components/ui/Rating";
import { buttonClasses } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

export function ReviewsSection({
  summary,
  reviews,
}: {
  summary: RatingSummary;
  reviews: Review[];
}) {
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [stars, setStars] = useState(5);
  const [hover, setHover] = useState(0);

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-extrabold text-neutral-900 sm:text-xl">
          دیدگاه خریداران
        </h2>
        <button
          type="button"
          onClick={() => setShowForm((v) => !v)}
          className={buttonClasses({ variant: "outline", size: "sm" })}
        >
          ثبت دیدگاه
        </button>
      </div>

      <div className="mt-4 grid gap-5 sm:grid-cols-[200px_1fr] sm:items-center">
        <div className="flex flex-col items-center rounded-xl border border-neutral-200 bg-white p-4">
          <span className="text-3xl font-black text-neutral-900">
            {toPersianDigits(summary.average.toFixed(1))}
          </span>
          <Rating value={summary.average} showValue={false} size={16} />
          <span className="mt-1 text-[12px] text-neutral-400">
            از {faCount(summary.total)} دیدگاه
          </span>
        </div>

        <div className="space-y-1.5">
          {[5, 4, 3, 2, 1].map((s) => {
            const c = summary.distribution[s as 1 | 2 | 3 | 4 | 5];
            const pct = summary.total ? (c / summary.total) * 100 : 0;
            return (
              <div key={s} className="flex items-center gap-2 text-[12px]">
                <span className="flex w-8 shrink-0 items-center gap-0.5 text-neutral-500">
                  {toPersianDigits(s)}
                  <Star size={11} className="fill-accent-500 text-accent-500" />
                </span>
                <span className="h-2 flex-1 overflow-hidden rounded-full bg-neutral-100">
                  <span
                    className="block h-full rounded-full bg-accent-400"
                    style={{ width: `${pct}%` }}
                  />
                </span>
                <span className="w-8 shrink-0 text-start text-neutral-400">
                  {toPersianDigits(c)}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {showForm && (
        <div className="mt-5 rounded-xl border border-primary-200 bg-primary-50/50 p-4">
          {submitted ? (
            <p className="flex items-center gap-2 text-[13px] font-bold text-success-700">
              <Check size={16} /> دیدگاه شما ثبت شد و پس از بررسی نمایش داده می‌شود.
              (نمایشی)
            </p>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="space-y-3"
            >
              <div className="flex items-center gap-2">
                <span className="text-[13px] font-bold text-neutral-700">
                  امتیاز شما:
                </span>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onMouseEnter={() => setHover(n)}
                      onMouseLeave={() => setHover(0)}
                      onClick={() => setStars(n)}
                      aria-label={`${n} ستاره`}
                    >
                      <Star
                        size={22}
                        className={cn(
                          "transition-colors",
                          (hover || stars) >= n
                            ? "fill-accent-500 text-accent-500"
                            : "text-neutral-300",
                        )}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <input
                required
                placeholder="عنوان دیدگاه"
                className="h-10 w-full rounded-md border border-neutral-300 px-3 text-[13px] outline-none focus:border-primary-400"
              />
              <textarea
                required
                rows={3}
                placeholder="تجربه خود را از این محصول بنویسید…"
                className="w-full rounded-md border border-neutral-300 p-3 text-[13px] outline-none focus:border-primary-400"
              />
              <button
                type="submit"
                className={buttonClasses({ variant: "secondary", size: "sm" })}
              >
                ارسال دیدگاه
              </button>
            </form>
          )}
        </div>
      )}

      <h3 className="mt-7 text-sm font-extrabold text-neutral-900">
        جدیدترین دیدگاه‌ها
      </h3>
      <ul className="mt-1 divide-y divide-neutral-100">
        {reviews.map((r) => (
          <li key={r.id} className="py-4">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="text-[13px] font-bold text-neutral-800">
                {r.author}
              </span>
              {r.verified && (
                <span className="flex items-center gap-1 rounded bg-success-50 px-1.5 py-0.5 text-[10.5px] font-bold text-success-700">
                  <Check size={11} /> خرید تأییدشده
                </span>
              )}
              <span className="text-[11px] text-neutral-400">
                {faRelativeDate(r.date)}
              </span>
            </div>
            <div className="mt-1.5">
              <Rating value={r.rating} showValue={false} size={13} />
            </div>
            <p className="mt-1.5 text-[13px] font-bold text-neutral-800">
              {r.title}
            </p>
            <p className="mt-1 text-[13px] leading-7 text-neutral-600">
              {r.body}
            </p>
            <button
              type="button"
              className="mt-2 flex items-center gap-1.5 text-[12px] text-neutral-400 hover:text-primary-700"
            >
              <ThumbsUp size={13} /> مفید بود ({toPersianDigits(r.helpfulCount)})
            </button>
          </li>
        ))}
      </ul>

      {summary.total > reviews.length && (
        <button
          type="button"
          className={buttonClasses({
            variant: "outline",
            size: "sm",
            fullWidth: true,
            className: "mt-4",
          })}
        >
          مشاهده همه {faCount(summary.total)} دیدگاه
        </button>
      )}
    </div>
  );
}
