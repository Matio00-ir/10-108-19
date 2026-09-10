import { cn } from "@/lib/cn";

type Tone = "accent" | "primary" | "success" | "danger" | "neutral";

const tones: Record<Tone, string> = {
  accent: "bg-accent-500 text-neutral-900",
  primary: "bg-primary-600 text-white",
  success: "bg-success-50 text-success-700 ring-1 ring-success-100",
  danger: "bg-danger-50 text-danger-600 ring-1 ring-danger-100",
  neutral: "bg-neutral-100 text-neutral-600",
};

export function Badge({
  tone = "neutral",
  className,
  children,
}: {
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-bold leading-5",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
