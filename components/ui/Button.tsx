import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "outline" | "danger";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-semibold rounded-md transition-all duration-200 ease-[var(--ease-out-soft)] disabled:opacity-50 disabled:pointer-events-none select-none whitespace-nowrap active:scale-[0.98]";

const variants: Record<Variant, string> = {
  // Amber accent is reserved for the primary buy action.
  primary:
    "bg-accent-500 text-neutral-900 hover:bg-accent-400 shadow-sm focus-visible:outline-accent-600",
  secondary:
    "bg-primary-600 text-white hover:bg-primary-700 shadow-sm focus-visible:outline-primary-700",
  outline:
    "border border-primary-600 text-primary-700 bg-white hover:bg-primary-50 focus-visible:outline-primary-600",
  ghost: "text-neutral-700 hover:bg-neutral-100 focus-visible:outline-primary-500",
  danger:
    "bg-danger-500 text-white hover:bg-danger-600 focus-visible:outline-danger-600",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3 text-[13px]",
  md: "h-11 px-4 text-sm",
  lg: "h-12 px-6 text-[15px]",
};

export function buttonClasses(opts?: {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  className?: string;
}) {
  const { variant = "secondary", size = "md", fullWidth, className } = opts ?? {};
  return cn(
    base,
    variants[variant],
    sizes[size],
    fullWidth && "w-full",
    className,
  );
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
}

export function Button({
  className,
  variant,
  size,
  fullWidth,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonClasses({ variant, size, fullWidth, className })}
      {...props}
    />
  );
}
