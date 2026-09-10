"use client";

import { RotateCw } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { buttonClasses } from "@/components/ui/Button";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <Container className="flex flex-col items-center py-20 text-center">
      <h1 className="text-xl font-extrabold text-neutral-900">
        مشکلی پیش آمد
      </h1>
      <p className="mt-2 max-w-sm text-sm text-neutral-500">
        در بارگذاری این بخش خطایی رخ داد. لطفاً دوباره تلاش کنید.
      </p>
      <button
        type="button"
        onClick={reset}
        className={buttonClasses({ variant: "secondary", className: "mt-5" })}
      >
        <RotateCw size={16} />
        تلاش مجدد
      </button>
    </Container>
  );
}
