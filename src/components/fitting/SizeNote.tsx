"use client";

import { useEffect, type CSSProperties } from "react";
import {
  findSuggestedVariant,
  hasFittingBasics,
  isHouseFitId,
  isOneSize,
  suggestSize,
} from "@/lib/fitting";
import type { ShopifyProductVariant } from "@/types/shopify";
import { useFittingProfile } from "./useFittingProfile";

export function SizeNote({
  houseSlug,
  variants,
  onSuggest,
}: {
  houseSlug?: string;
  variants: ShopifyProductVariant[];
  onSuggest?: (variantId: string) => void;
}) {
  const { profile, ready } = useFittingProfile();
  const house = isHouseFitId(houseSlug) ? houseSlug : undefined;
  const suggestion = house ? suggestSize(profile, house) : null;
  const match = suggestion
    ? findSuggestedVariant(variants, suggestion.label)
    : undefined;

  useEffect(() => {
    if (!ready || !match?.availableForSale || !onSuggest) return;
    onSuggest(match.id);
  }, [match?.availableForSale, match?.id, onSuggest, ready]);

  if (!ready) return null;

  if (!hasFittingBasics(profile)) {
    return (
      <p style={NOTE}>
        Every house cuts differently.{" "}
        <a href="/fitting" style={LINK}>
          Add your measurements
        </a>{" "}
        for a size from this house.
      </p>
    );
  }

  if (!house) {
    return (
      <p style={NOTE}>
        Your fitting is saved. Size suggestions appear on Y&apos;WANDELAG and
        Mokhueleigbe pieces.
      </p>
    );
  }

  if (isOneSize(variants)) {
    return <p style={NOTE}>This piece is offered as one size.</p>;
  }

  if (!suggestion) {
    return (
      <p style={NOTE}>
        Add bust, waist, and hip — or a usual US size —{" "}
        <a href="/fitting" style={LINK}>
          in The Fitting
        </a>
        .
      </p>
    );
  }

  const stock = match
    ? match.availableForSale
      ? "Your size is here."
      : "Your size is not in this drop."
    : "This piece is not offered in your suggested size.";

  return (
    <div style={{ marginBottom: "1.35rem" }}>
      <p style={{ ...NOTE, marginBottom: "0.45rem" }}>{suggestion.note}</p>
      <p style={{ ...NOTE, color: "#C9A86A", marginBottom: 0 }}>
        {stock}{" "}
        <a href="/fitting" style={LINK}>
          Edit fitting
        </a>
      </p>
    </div>
  );
}

const NOTE: CSSProperties = {
  margin: "0 0 1.35rem",
  fontFamily: "'Inter', sans-serif",
  fontSize: "0.68rem",
  lineHeight: 1.7,
  color: "rgba(245,241,232,0.45)",
};

const LINK: CSSProperties = {
  color: "#C9A86A",
  textDecoration: "none",
};
