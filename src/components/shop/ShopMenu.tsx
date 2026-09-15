"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import {
  SHOP_CATEGORIES,
  SHOP_FEATURED,
  SHOP_HOUSES,
  SHOP_OCCASIONS,
  shopHref,
  type ShopLane,
} from "@/lib/shop-taxonomy";

const SHOP_COLUMNS = [
  { id: "houses", label: "The Houses", lanes: SHOP_HOUSES },
  {
    id: "category",
    label: "Category",
    lanes: SHOP_CATEGORIES.filter((lane) => !lane.forthcoming),
  },
  { id: "occasion", label: "Occasion", lanes: SHOP_OCCASIONS },
];

function laneHref(columnId: string, lane: ShopLane): string {
  if (lane.forthcoming) return "/journal";
  if (columnId === "houses") return shopHref({ house: lane.slug });
  if (columnId === "category") return shopHref({ category: lane.slug });
  return shopHref({ occasion: lane.slug });
}

export function NavLane({
  href,
  label,
  forthcoming,
  onNavigate,
}: {
  href: string;
  label: string;
  forthcoming?: boolean;
  onNavigate?: () => void;
}) {
  return (
    <a
      href={href}
      onClick={onNavigate}
      className="asa-nav-lane"
      style={{
        display: "block",
        fontFamily: forthcoming ? "'Inter', sans-serif" : "'Cormorant Garamond', serif",
        fontSize: forthcoming ? "0.72rem" : "1.2rem",
        fontWeight: 400,
        letterSpacing: forthcoming ? "0.08em" : "0.02em",
        textTransform: forthcoming ? "uppercase" : "none",
        color: forthcoming ? "rgba(245,241,232,0.28)" : "#F5F1E8",
        textDecoration: "none",
        padding: "0.4rem 0",
      }}
    >
      {forthcoming ? `${label} — Forthcoming` : label}
    </a>
  );
}

export function FeaturedTile({
  compact,
  href,
  img,
  eyebrow,
  title,
  credit,
  onNavigate,
}: {
  compact?: boolean;
  href?: string;
  img?: string;
  eyebrow?: string;
  title?: string;
  credit?: string;
  onNavigate?: () => void;
}) {
  const tile = {
    href: href ?? SHOP_FEATURED.href,
    img: img ?? SHOP_FEATURED.img,
    eyebrow: eyebrow ?? SHOP_FEATURED.eyebrow,
    title: title ?? SHOP_FEATURED.title,
    credit: credit ?? SHOP_FEATURED.credit,
  };

  return (
    <a
      href={tile.href}
      onClick={onNavigate}
      style={{
        display: "block",
        position: "relative",
        overflow: "hidden",
        background: "#111111",
        border: "1px solid rgba(201,168,106,0.18)",
        minHeight: compact ? 168 : 320,
        textDecoration: "none",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={tile.img}
        alt={tile.title}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          position: "absolute",
          inset: 0,
          filter: "brightness(0.35) saturate(1.1)",
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          height: "100%",
          minHeight: compact ? 168 : 320,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: compact ? "1.1rem 1.15rem" : "1.6rem",
        }}
      >
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.5rem",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "#C9A86A",
            marginBottom: "0.45rem",
          }}
        >
          {tile.eyebrow}
        </span>
        <span
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: compact ? "1.35rem" : "1.85rem",
            fontWeight: 400,
            lineHeight: 1.08,
            color: "#F5F1E8",
          }}
        >
          {tile.title}
        </span>
        <span
          style={{
            marginTop: "0.5rem",
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.55rem",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "rgba(245,241,232,0.45)",
          }}
        >
          {tile.credit}
        </span>
      </div>
    </a>
  );
}

export function ShopPanel({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div
      className="asa-nav-curtain-grid"
      style={{
        maxWidth: 1400,
        margin: "0 auto",
        padding: "2.25rem clamp(1rem, 4vw, 3rem) 2.6rem",
        display: "grid",
        gridTemplateColumns: "minmax(280px, 0.85fr) 1fr",
        gap: "3rem",
      }}
    >
      <FeaturedTile onNavigate={onNavigate} />
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            gap: "1rem",
            marginBottom: "1.75rem",
          }}
        >
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.5rem",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "#C9A86A",
            }}
          >
            Shop the Show
          </span>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <a href={shopHref({ edit: "new-in" })} onClick={onNavigate} className="asa-nav-meta">
              New In
            </a>
            <a href="/fitting" onClick={onNavigate} className="asa-nav-meta">
              The Fitting
            </a>
            <a href="/shop" onClick={onNavigate} className="asa-nav-meta">
              View all →
            </a>
          </div>
        </div>
        <div
          className="asa-shop-mega-cols"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "2rem",
          }}
        >
          {SHOP_COLUMNS.map((column) => (
            <div key={column.id}>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.5rem",
                  letterSpacing: "0.24em",
                  textTransform: "uppercase",
                  color: "rgba(245,241,232,0.32)",
                  marginBottom: "0.85rem",
                  paddingBottom: "0.65rem",
                  borderBottom: "1px solid rgba(245,241,232,0.08)",
                }}
              >
                {column.label}
              </div>
              {column.lanes.map((lane) => (
                <NavLane
                  key={lane.slug}
                  href={laneHref(column.id, lane)}
                  label={lane.label}
                  forthcoming={lane.forthcoming}
                  onNavigate={onNavigate}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function MobileShopDirectory({ onNavigate }: { onNavigate: () => void }) {
  const [openSection, setOpenSection] = useState<string | null>(null);

  return (
    <div>
      <FeaturedTile compact onNavigate={onNavigate} />

      <a
        href="/shop"
        onClick={onNavigate}
        style={{
          display: "block",
          marginTop: "1.5rem",
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "1.85rem",
          fontWeight: 300,
          color: "#F5F1E8",
          textDecoration: "none",
          letterSpacing: "0.04em",
        }}
      >
        View all pieces
      </a>

      {SHOP_HOUSES.map((house) => (
        <a
          key={house.slug}
          href={shopHref({ house: house.slug })}
          onClick={onNavigate}
          style={{
            display: "block",
            padding: "0.85rem 0 0",
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.35rem",
            fontWeight: 300,
            color: "rgba(245,241,232,0.7)",
            textDecoration: "none",
          }}
        >
          {house.label}
        </a>
      ))}

      {SHOP_COLUMNS.filter((column) => column.id !== "houses").map((column) => {
        const open = openSection === column.id;
        return (
          <div
            key={column.id}
            style={{ marginTop: "0.85rem", borderTop: "1px solid rgba(245,241,232,0.08)" }}
          >
            <button
              type="button"
              onClick={() => setOpenSection(open ? null : column.id)}
              aria-expanded={open}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "1rem 0 0.85rem",
                background: "none",
                border: "none",
                color: "#F5F1E8",
              }}
            >
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.85rem",
                  fontWeight: 300,
                  letterSpacing: "0.04em",
                }}
              >
                {column.label}
              </span>
              <ChevronRight
                size={16}
                color="#C9A86A"
                style={{
                  transform: open ? "rotate(90deg)" : "none",
                  transition: "transform 0.25s ease",
                }}
              />
            </button>
            {open && (
              <div style={{ paddingBottom: "0.65rem" }}>
                {column.lanes.map((lane) => (
                  <NavLane
                    key={lane.slug}
                    href={laneHref(column.id, lane)}
                    label={lane.label}
                    forthcoming={lane.forthcoming}
                    onNavigate={onNavigate}
                  />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
