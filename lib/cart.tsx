"use client";

import React from "react";
import type { Product } from "./catalog";

export type CartItem = {
  id: string;
  slug: string;
  name: string;
  stone: string;
  price: number;
  image: string;
  qty: number;
};

type CartState = {
  items: CartItem[];
  open: boolean;
  count: number;
  subtotal: number;
  add: (p: Product, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  openCart: () => void;
  closeCart: () => void;
};

const CartContext = React.createContext<CartState | null>(null);
const STORAGE_KEY = "lumorani.cart.v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<CartItem[]>([]);
  const [open, setOpen] = React.useState(false);
  const [hydrated, setHydrated] = React.useState(false);

  // Synchronisation mit dem ausschließlich im Browser verfügbaren Speicher.
  /* eslint-disable react-hooks/set-state-in-effect */
  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  // persistieren
  React.useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items, hydrated]);

  const add = React.useCallback((p: Product, qty = 1) => {
    setItems((prev) => {
      const i = prev.findIndex((it) => it.id === p.id);
      if (i >= 0) {
        const next = prev.slice();
        next[i] = { ...next[i], qty: next[i].qty + qty };
        return next;
      }
      return prev.concat([
        { id: p.id, slug: p.slug, name: p.name, stone: p.gem, price: p.price, image: p.image, qty },
      ]);
    });
    setOpen(true);
  }, []);

  const setQty = React.useCallback((id: string, qty: number) => {
    setItems((prev) =>
      prev
        .map((it) => (it.id === id ? { ...it, qty: Math.max(0, qty) } : it))
        .filter((it) => it.qty > 0),
    );
  }, []);

  const remove = React.useCallback((id: string) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  }, []);

  const clear = React.useCallback(() => setItems([]), []);
  const openCart = React.useCallback(() => setOpen(true), []);
  const closeCart = React.useCallback(() => setOpen(false), []);

  const count = items.reduce((n, it) => n + it.qty, 0);
  const subtotal = items.reduce((n, it) => n + it.qty * it.price, 0);

  const value: CartState = {
    items,
    open,
    count,
    subtotal,
    add,
    setQty,
    remove,
    clear,
    openCart,
    closeCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartState {
  const ctx = React.useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within <CartProvider>");
  return ctx;
}
