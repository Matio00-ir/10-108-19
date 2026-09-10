import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { buttonClasses } from "./Button";

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: { label: string; href: string };
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-neutral-300 bg-white px-6 py-14 text-center">
      <span className="flex size-14 items-center justify-center rounded-full bg-primary-50 text-primary-600">
        <Icon size={26} />
      </span>
      <h3 className="mt-4 text-base font-extrabold text-neutral-900">{title}</h3>
      {description && (
        <p className="mt-1.5 max-w-sm text-sm text-neutral-500">{description}</p>
      )}
      {action && (
        <Link
          href={action.href}
          className={buttonClasses({ variant: "secondary", className: "mt-5" })}
        >
          {action.label}
        </Link>
      )}
    </div>
  );
}
