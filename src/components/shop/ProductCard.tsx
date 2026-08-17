import Link from "next/link";
import { formatMoney } from "@/lib/money";
import type { ShopifyProduct } from "@/types/shopify";
import { AddToCartButton } from "./AddToCartButton";

export function ProductCard({ product }: { product: ShopifyProduct }) {
  const firstVariant =
    product.variants.find((variant) => variant.availableForSale) ??
    product.variants[0];

  return (
    <article>
      <Link
        href={`/shop/${product.handle}`}
        style={{ display: "block", color: "inherit", textDecoration: "none" }}
      >
        <div
          style={{
            position: "relative",
            aspectRatio: "4 / 5",
            overflow: "hidden",
            background: "#111111",
            border: "1px solid rgba(245,241,232,0.06)",
          }}
        >
          {product.featuredImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.featuredImage.url}
              alt={product.featuredImage.altText || product.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                transition: "transform 0.7s ease, filter 0.7s ease",
              }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "rgba(245,241,232,0.25)",
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.55rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              Image forthcoming
            </div>
          )}
          {!product.availableForSale && (
            <span
              style={{
                position: "absolute",
                top: "0.8rem",
                left: "0.8rem",
                padding: "0.4rem 0.65rem",
                background: "rgba(10,10,10,0.86)",
                color: "#F5F1E8",
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.5rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              Sold out
            </span>
          )}
        </div>
      </Link>

      <div style={{ paddingTop: "1rem" }}>
        {(product.vendor || product.productType) && (
          <p
            style={{
              margin: "0 0 0.45rem",
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.5rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#C9A86A",
            }}
          >
            {[product.vendor, product.productType].filter(Boolean).join(" · ")}
          </p>
        )}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "0.75rem",
          }}
        >
          <div>
            <Link
              href={`/shop/${product.handle}`}
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <h2
                style={{
                  margin: 0,
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.35rem",
                  fontWeight: 400,
                  lineHeight: 1.15,
                  color: "#F5F1E8",
                }}
              >
                {product.title}
              </h2>
            </Link>
            <p
              style={{
                margin: "0.5rem 0 0",
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.65rem",
                color: "rgba(245,241,232,0.5)",
              }}
            >
              {formatMoney(product.priceRange.minVariantPrice)}
            </p>
          </div>
          {firstVariant && (
            <AddToCartButton
              compact
              variantId={firstVariant.id}
              available={firstVariant.availableForSale}
              label="Add"
            />
          )}
        </div>
      </div>
    </article>
  );
}
