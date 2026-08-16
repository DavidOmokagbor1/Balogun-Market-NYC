"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ShopifyCart } from "@/types/shopify";

const CART_STORAGE_KEY = "asa-shopify-cart-id";

interface CartContextValue {
  cart: ShopifyCart | null;
  isOpen: boolean;
  isLoading: boolean;
  error: string | null;
  openCart: () => void;
  closeCart: () => void;
  addItem: (merchandiseId: string, quantity?: number) => Promise<void>;
  updateItem: (lineId: string, quantity: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
}

const CartContext = createContext<CartContextValue | null>(null);

async function cartRequest(
  body: Record<string, unknown>
): Promise<ShopifyCart | null> {
  const response = await fetch("/api/shopify/cart", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = (await response.json()) as {
    cart?: ShopifyCart | null;
    error?: string;
  };
  if (!response.ok) throw new Error(data.error || "The cart could not be updated.");
  return data.cart ?? null;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<ShopifyCart | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cartId = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!cartId) return;

    cartRequest({ action: "get", cartId })
      .then((restoredCart) => {
        if (restoredCart) {
          setCart(restoredCart);
        } else {
          window.localStorage.removeItem(CART_STORAGE_KEY);
        }
      })
      .catch(() => {
        window.localStorage.removeItem(CART_STORAGE_KEY);
      });
  }, []);

  const saveCart = useCallback((nextCart: ShopifyCart | null) => {
    setCart(nextCart);
    if (nextCart?.id) {
      window.localStorage.setItem(CART_STORAGE_KEY, nextCart.id);
    } else {
      window.localStorage.removeItem(CART_STORAGE_KEY);
    }
  }, []);

  const addItem = useCallback(
    async (merchandiseId: string, quantity = 1) => {
      setIsLoading(true);
      setError(null);
      try {
        const nextCart = await cartRequest({
          action: "add",
          cartId: cart?.id,
          merchandiseId,
          quantity,
        });
        saveCart(nextCart);
        setIsOpen(true);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "The piece could not be added."
        );
        setIsOpen(true);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [cart?.id, saveCart]
  );

  const updateItem = useCallback(
    async (lineId: string, quantity: number) => {
      if (!cart?.id) return;
      setIsLoading(true);
      setError(null);
      try {
        const nextCart = await cartRequest({
          action: "update",
          cartId: cart.id,
          lineId,
          quantity,
        });
        saveCart(nextCart);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "The cart could not be updated."
        );
      } finally {
        setIsLoading(false);
      }
    },
    [cart?.id, saveCart]
  );

  const removeItem = useCallback(
    async (lineId: string) => {
      if (!cart?.id) return;
      setIsLoading(true);
      setError(null);
      try {
        const nextCart = await cartRequest({
          action: "remove",
          cartId: cart.id,
          lineId,
        });
        saveCart(nextCart);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "The piece could not be removed."
        );
      } finally {
        setIsLoading(false);
      }
    },
    [cart?.id, saveCart]
  );

  const value = useMemo<CartContextValue>(
    () => ({
      cart,
      isOpen,
      isLoading,
      error,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      addItem,
      updateItem,
      removeItem,
    }),
    [addItem, cart, error, isLoading, isOpen, removeItem, updateItem]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error("useCart must be used inside CartProvider.");
  return value;
}
