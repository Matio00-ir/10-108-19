"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";

type Side = "start" | "end" | "bottom";

export function Drawer({
  open,
  onClose,
  side = "end",
  title,
  children,
  className,
  widthClass = "w-[88vw] max-w-sm",
}: {
  open: boolean;
  onClose: () => void;
  side?: Side;
  title?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  widthClass?: string;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect -- portal mount guard so SSR and first client render agree
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  // Render nothing until mounted so server and first client render agree.
  if (!mounted || typeof document === "undefined") return null;

  const sideAnim =
    side === "bottom"
      ? open
        ? "translate-y-0"
        : "translate-y-full"
      : side === "start"
        ? open
          ? "translate-x-0"
          : "-translate-x-full rtl:translate-x-full"
        : open
          ? "translate-x-0"
          : "translate-x-full rtl:-translate-x-full";

  const position =
    side === "bottom"
      ? "inset-x-0 bottom-0 max-h-[85vh] rounded-t-2xl w-full"
      : side === "start"
        ? "inset-y-0 start-0 h-full"
        : "inset-y-0 end-0 h-full";

  return createPortal(
    <div
      className="fixed inset-0 z-[var(--z-drawer)] overflow-hidden"
      aria-hidden={!open}
      style={{ pointerEvents: open ? "auto" : "none" }}
    >
      <div
        className={cn(
          "absolute inset-0 bg-neutral-900/45 backdrop-blur-[1px] transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0",
        )}
        onClick={onClose}
      />
      <div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={typeof title === "string" ? title : "پنجره"}
        className={cn(
          "absolute flex flex-col bg-white shadow-modal outline-none transition-transform duration-300 ease-[var(--ease-out-soft)]",
          position,
          side !== "bottom" && widthClass,
          sideAnim,
          className,
        )}
      >
        {side === "bottom" && (
          <div className="flex justify-center pt-2.5">
            <span className="h-1 w-10 rounded-full bg-neutral-300" />
          </div>
        )}
        {title != null && (
          <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-3">
            <div className="text-sm font-extrabold text-neutral-900">{title}</div>
            <button
              type="button"
              onClick={onClose}
              aria-label="بستن"
              className="flex size-9 items-center justify-center rounded-md text-neutral-500 hover:bg-neutral-100"
            >
              <X size={20} />
            </button>
          </div>
        )}
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
}
