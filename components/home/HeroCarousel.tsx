"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import type { HeroSlide } from "@/data/home";
import { Icon } from "@/components/ui/Icon";
import { buttonClasses } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

export function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || slides.length < 2) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % slides.length),
      6000,
    );
    return () => clearInterval(id);
  }, [paused, slides.length]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="پیشنهادهای ویژه"
      className="relative overflow-hidden rounded-2xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* All slides share one grid cell so the section sizes to the tallest. */}
      <div className="grid">
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            aria-hidden={i !== index}
            className={cn(
              "col-start-1 row-start-1 flex flex-col justify-center bg-gradient-to-tl px-5 py-8 text-white transition-opacity duration-500 sm:px-10 sm:py-12 md:min-h-[280px]",
              slide.gradient,
              i === index
                ? "opacity-100"
                : "pointer-events-none opacity-0",
            )}
          >
            <span className="flex size-11 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
              <Icon name={slide.icon} size={22} />
            </span>
            <span className="mt-4 text-[12px] font-bold tracking-wide text-white/80">
              {slide.eyebrow}
            </span>
            <h2 className="mt-1.5 max-w-lg text-lg font-extrabold leading-8 sm:text-2xl md:text-[28px] md:leading-10">
              {slide.title}
            </h2>
            <p className="mt-2 max-w-md text-[13px] leading-7 text-white/85 sm:text-sm">
              {slide.subtitle}
            </p>
            <Link
              href={slide.ctaHref}
              tabIndex={i === index ? 0 : -1}
              className={buttonClasses({
                variant: "primary",
                className: "mt-5 w-fit",
              })}
            >
              {slide.ctaLabel}
              <ChevronLeft size={16} />
            </Link>
          </div>
        ))}
      </div>

      <div className="absolute inset-x-0 bottom-3 flex justify-center gap-2">
        {slides.map((s, i) => (
          <button
            key={s.id}
            type="button"
            aria-label={`اسلاید ${i + 1}`}
            aria-current={i === index}
            onClick={() => setIndex(i)}
            className={cn(
              "h-1.5 rounded-full bg-white transition-all",
              i === index ? "w-6 opacity-100" : "w-1.5 opacity-50",
            )}
          />
        ))}
      </div>
    </section>
  );
}
