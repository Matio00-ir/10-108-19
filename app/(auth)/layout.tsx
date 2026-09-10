import Link from "next/link";
import { Cross } from "lucide-react";
import { SITE } from "@/lib/constants";
import { Container } from "@/components/ui/Container";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center py-10">
      <Link href="/" className="mb-6 flex items-center gap-2">
        <span className="flex size-10 items-center justify-center rounded-lg bg-primary-600 text-white">
          <Cross size={20} strokeWidth={2.5} />
        </span>
        <span className="text-lg font-extrabold text-neutral-900">
          {SITE.name}
        </span>
      </Link>
      <div className="w-full max-w-sm rounded-2xl border border-neutral-200 bg-white p-6 shadow-card">
        {children}
      </div>
    </Container>
  );
}
