"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import type { CartItem, CartLine, CartTotals } from "@/types";
import { CART_STORAGE_KEY } from "@/lib/constants";
import { buildLines, computeTotals } from "./cartMath";

type Action =
  | { type: "hydrate"; items: CartItem[] }
  | { type: "add"; productId: string; quantity?: number }
  | { type: "setQty"; productId: string; quantity: number }
  | { type: "remove"; productId: string }
  | { type: "clear" };

function reducer(state: CartItem[], action: Action): CartItem[] {
  switch (action.type) {
    case "hydrate":
      return action.items;
    case "add": {
      const qty = action.quantity ?? 1;
      const existing = state.find((i) => i.productId === action.productId);
      if (existing) {
        return state.map((i) =>
          i.productId === action.productId
            ? { ...i, quantity: Math.min(99, i.quantity + qty) }
            : i,
        );
      }
      return [...state, { productId: action.productId, quantity: qty }];
    }
    case "setQty":
      if (action.quantity <= 0)
        return state.filter((i) => i.productId !== action.productId);
      return state.map((i) =>
        i.productId === action.productId
          ? { ...i, quantity: Math.min(99, action.quantity) }
          : i,
      );
    case "remove":
      return state.filter((i) => i.productId !== action.productId);
    case "clear":
      return [];
    default:
      return state;
  }
}

interface CartContextValue {
  items: CartItem[];
  lines: CartLine[];
  totals: CartTotals;
  hydrated: boolean;
  /** quantity of a specific product currently in the cart (0 if none) */
  quantityOf: (productId: string) => number;
  add: (productId: string, quantity?: number) => void;
  setQty: (productId: string, quantity: number) => void;
  remove: (productId: string) => void;
  clear: () => void;
  miniCartOpen: boolean;
  openMiniCart: () => void;
  closeMiniCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, dispatch] = useReducer(reducer, []);
  const [hydrated, setHydrated] = useState(false);
  const [miniCartOpen, setMiniCartOpen] = useState(false);
  const firstRun = useRef(true);

  // Load persisted cart once on mount.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(CART_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartItem[];
        if (Array.isArray(parsed)) dispatch({ type: "hydrate", items: parsed });
      }
    } catch {
      /* ignore private-mode / parse errors */
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration flag after reading localStorage on mount
    setHydrated(true);
  }, []);

  // Persist on every change after hydration.
  useEffect(() => {
    if (!hydrated) return;
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items, hydrated]);

  const lines = useMemo(() => buildLines(items), [items]);
  const totals = useMemo(() => computeTotals(lines), [lines]);

  const value: CartContextValue = {
    items,
    lines,
    totals,
    hydrated,
    quantityOf: (id) => items.find((i) => i.productId === id)?.quantity ?? 0,
    add: (productId, quantity) => {
      dispatch({ type: "add", productId, quantity });
      setMiniCartOpen(true);
    },
    setQty: (productId, quantity) =>
      dispatch({ type: "setQty", productId, quantity }),
    remove: (productId) => dispatch({ type: "remove", productId }),
    clear: () => dispatch({ type: "clear" }),
    miniCartOpen,
    openMiniCart: () => setMiniCartOpen(true),
    closeMiniCart: () => setMiniCartOpen(false),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within <CartProvider>");
  return ctx;
}
