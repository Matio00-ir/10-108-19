import { cn } from "@/lib/cn";

export function Container({
  className,
  as: Tag = "div",
  ...props
}: React.ComponentPropsWithoutRef<"div"> & { as?: React.ElementType }) {
  return <Tag className={cn("container-page", className)} {...props} />;
}
