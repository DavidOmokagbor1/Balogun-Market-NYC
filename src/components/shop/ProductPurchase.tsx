"use client";

import { useMemo, useState } from "react";
import { formatMoney } from "@/lib/money";
import type { ShopifyProductVariant } from "@/types/shopify";
import { AddToCartButton } from "./AddToCartButton";

export function ProductPurchase({
  variants,
}: {
  variants: ShopifyProductVariant[];
}) {
  const initialVariant =
    variants.find((variant) => variant.availableForSale) ?? variants[0];
  const [variantId, setVariantId] = useState(initialVariant?.id ?? "");
  const selected = useMemo(
    () => variants.find((variant) => variant.id === variantId) ?? initialVariant,
    [initialVariant, variantId, variants]
  );

  if (!selected) {
    return (
      <p
        style={{
          color: "rgba(245,241,232,0.4)",
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.75rem",
        }}
      >
        No purchasable variants are available.
      </p>
    );
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: "0.75rem",
          marginBottom: "1.5rem",
        }}
      >
        <span
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.8rem",
            color: "#F5F1E8",
          }}
        >
          {formatMoney(selected.price)}
        </span>
        {selected.compareAtPrice && (
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.7rem",
              color: "rgba(245,241,232,0.3)",
              textDecoration: "line-through",
            }}
          >
            {formatMoney(selected.compareAtPrice)}
          </span>
        )}
      </div>

      {variants.length > 1 && (
        <div style={{ marginBottom: "1.5rem" }}>
          <label
            htmlFor="variant"
            style={{
              display: "block",
              marginBottom: "0.55rem",
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.5rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(245,241,232,0.45)",
            }}
          >
            Select
          </label>
          <select
            id="variant"
            value={selected.id}
            onChange={(event) => setVariantId(event.target.value)}
            style={{
              width: "100%",
              minHeight: 48,
              padding: "0 0.9rem",
              border: "1px solid rgba(245,241,232,0.14)",
              borderRadius: 0,
              background: "#111111",
              color: "#F5F1E8",
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.72rem",
              outline: "none",
            }}
          >
            {variants.map((variant) => (
              <option key={variant.id} value={variant.id}>
                {variant.title}
                {!variant.availableForSale ? " — Unavailable" : ""}
              </option>
            ))}
          </select>
        </div>
      )}

      <AddToCartButton
        variantId={selected.id}
        available={selected.availableForSale}
      />
      <p
        style={{
          margin: "0.8rem 0 0",
          textAlign: "center",
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.55rem",
          lineHeight: 1.5,
          color: "rgba(245,241,232,0.3)",
        }}
      >
        Inventory, payment, shipping, and taxes are secured by Shopify.
      </p>
    </div>
  );
}
