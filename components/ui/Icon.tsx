import {
  Activity,
  Atom,
  BadgeCheck,
  Bone,
  Dumbbell,
  Fish,
  Flame,
  Gem,
  Heart,
  HeartPulse,
  LayoutGrid,
  Leaf,
  Milk,
  Moon,
  Package,
  Pill,
  ShieldCheck,
  ShieldPlus,
  Sparkles,
  Sprout,
  Stethoscope,
  Sun,
  Truck,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";

const MAP: Record<string, LucideIcon> = {
  Activity,
  Atom,
  BadgeCheck,
  Bone,
  Dumbbell,
  Fish,
  Flame,
  Gem,
  Heart,
  HeartPulse,
  LayoutGrid,
  Leaf,
  Milk,
  Moon,
  Pill,
  ShieldCheck,
  ShieldPlus,
  Sparkles,
  Sprout,
  Stethoscope,
  Sun,
  Truck,
  Users,
  Zap,
};

export function Icon({
  name,
  size = 20,
  className,
}: {
  name?: string;
  size?: number;
  className?: string;
}) {
  const Cmp = (name && MAP[name]) || Package;
  return <Cmp size={size} className={className} />;
}
