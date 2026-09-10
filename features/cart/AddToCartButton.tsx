"use client";

import { useState } from "react";
import { Check, ShoppingCart } from "lucide-react";
import { buttonClasses } from "@/components/ui/Button";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { cn } from "@/lib/cn";
import { useCart } from "./CartContext";

export function AddToCartButton({
  productId,
  disabled,
  size = "md",
  className,
  quantity = 1,
}: {
  productId: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
  /** initial quantity to add (product page passes the chosen amount) */
  quantity?: number;
}) {
  const { add, setQty, quantityOf } = useCart();
  const inCart = quantityOf(productId);
  const [justAdded, setJustAdded] = useState(false);

  if (disabled) {
    return (
      <button
        type="button"
        disabled
        className={buttonClasses({
          variant: "outline",
          size,
          className: cn("cursor-not-allowed opacity-60", className),
        })}
      >
        ناموجود
      </button>
    );
  }

  if (inCart > 0) {
    return (
      <div className={cn("flex items-center justify-between gap-2", className)}>
        <QuantityStepper
          value={inCart}
          onChange={(n) => setQty(productId, n)}
          size={size === "sm" ? "sm" : "md"}
          className="flex-1 justify-between"
        />
        <span className="hidden shrink-0 items-center gap-1 text-[12px] font-bold text-success-600 sm:flex">
          <Check size={14} /> در سبد
        </span>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => {
        add(productId, quantity);
        setJustAdded(true);
        setTimeout(() => setJustAdded(false), 1200);
      }}
      className={buttonClasses({ variant: "primary", size, className })}
    >
      {justAdded ? (
        <>
          <Check size={size === "sm" ? 15 : 18} /> افزوده شد
        </>
      ) : (
        <>
          <ShoppingCart size={size === "sm" ? 15 : 18} /> افزودن به سبد
        </>
      )}
    </button>
  );
}
