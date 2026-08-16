"use client";

import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import { useCart } from "./CartProvider";

export function AddToCartButton({
  variantId,
  available,
  label = "Add to collector's bag",
  compact = false,
}: {
  variantId: string;
  available: boolean;
  label?: string;
  compact?: boolean;
}) {
  const { addItem, isLoading } = useCart();
  const [adding, setAdding] = useState(false);

  const disabled = !available || isLoading || adding;

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={async () => {
        setAdding(true);
        try {
          await addItem(variantId);
        } catch {
          // CartProvider surfaces the Shopify error inside the cart drawer.
        } finally {
          setAdding(false);
        }
      }}
      style={{
        width: compact ? "auto" : "100%",
        minHeight: compact ? 38 : 52,
        padding: compact ? "0.6rem 0.8rem" : "0.85rem 1.25rem",
        border: "1px solid",
        borderColor: disabled
          ? "rgba(245,241,232,0.1)"
          : "rgba(201,168,106,0.55)",
        background: disabled ? "rgba(245,241,232,0.03)" : "#C9A86A",
        color: disabled ? "rgba(245,241,232,0.3)" : "#0A0A0A",
        cursor: disabled ? "not-allowed" : "pointer",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.55rem",
        fontFamily: "'Inter', sans-serif",
        fontSize: compact ? "0.5rem" : "0.6rem",
        letterSpacing: "0.16em",
        textTransform: "uppercase",
      }}
    >
      <ShoppingBag size={compact ? 12 : 14} />
      {!available ? "Unavailable" : adding ? "Adding…" : label}
    </button>
  );
}
