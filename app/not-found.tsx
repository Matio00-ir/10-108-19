import Link from "next/link";
import { Compass } from "lucide-react";
import { ROUTES } from "@/lib/constants";
import { Container } from "@/components/ui/Container";
import { buttonClasses } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center py-20 text-center">
      <span className="flex size-16 items-center justify-center rounded-full bg-primary-50 text-primary-600">
        <Compass size={32} />
      </span>
      <h1 className="mt-4 text-2xl font-extrabold text-neutral-900">
        صفحه پیدا نشد
      </h1>
      <p className="mt-2 max-w-sm text-sm text-neutral-500">
        نشانی‌ای که وارد کرده‌اید وجود ندارد یا حذف شده است. از فروشگاه ادامه دهید.
      </p>
      <Link
        href={ROUTES.home}
        className={buttonClasses({ variant: "secondary", className: "mt-5" })}
      >
        بازگشت به صفحه اصلی
      </Link>
    </Container>
  );
}
