import type { Metadata } from "next";
import { ProductCard } from "@/components/shop/ProductCard";
import {
  getProducts,
  isShopifyConfigured,
  ShopifyConfigError,
} from "@/lib/shopify";
import type { ShopifyProduct } from "@/types/shopify";

export const metadata: Metadata = {
  title: "The Shop",
  description:
    "Limited editions, African luxury objects, and collector pieces selected by Balogun Market NYC.",
};

export const dynamic = "force-dynamic";

export default async function ShopPage() {
  let products: ShopifyProduct[] = [];
  let error: string | null = null;

  if (isShopifyConfigured) {
    try {
      products = await getProducts();
    } catch (err) {
      error =
        err instanceof ShopifyConfigError
          ? err.message
          : "The Shopify collection could not be reached. Please return shortly.";
      console.error("Shop page error:", err);
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0A0A0A" }}>
      <header
        style={{
          padding:
            "clamp(8rem, 13vw, 12rem) clamp(1.25rem, 5vw, 5rem) clamp(4rem, 7vw, 7rem)",
          borderBottom: "1px solid rgba(201,168,106,0.1)",
          background:
            "radial-gradient(circle at 80% 20%, rgba(201,168,106,0.08), transparent 34%), #080808",
        }}
      >
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <p className="catalog-label" style={{ margin: "0 0 1.2rem" }}>
            Balogun Market Editions · Powered by Shopify
          </p>
          <h1
            style={{
              maxWidth: 780,
              margin: 0,
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(3rem, 7vw, 6.5rem)",
              fontWeight: 300,
              lineHeight: 0.95,
              color: "#F5F1E8",
            }}
          >
            Collect the <em style={{ color: "#C9A86A" }}>future.</em>
          </h1>
          <p
            style={{
              maxWidth: 560,
              margin: "1.5rem 0 0",
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.88rem",
              fontWeight: 300,
              lineHeight: 1.85,
              color: "rgba(245,241,232,0.48)",
            }}
          >
            Limited objects, garments, and editions grounded in African
            authorship. Every purchase is completed through Shopify&apos;s
            secure global checkout.
          </p>
        </div>
      </header>

      <section
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: "clamp(3rem, 6vw, 6rem) clamp(1.25rem, 5vw, 5rem) 8rem",
        }}
      >
        {!isShopifyConfigured ? (
          <ShopState
            title="The shop connection is ready."
            message="Add the Shopify store domain and Storefront access token to activate live products, inventory, cart, and checkout."
            showSetup={process.env.NODE_ENV !== "production"}
          />
        ) : error ? (
          <ShopState title="The collection is temporarily unavailable." message={error} />
        ) : products.length === 0 ? (
          <ShopState
            title="The first edition is being prepared."
            message="Shopify is connected, but no products are currently published to this storefront."
          />
        ) : (
          <>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
                gap: "1rem",
                marginBottom: "2rem",
              }}
            >
              <p className="catalog-label" style={{ margin: 0 }}>
                Available now
              </p>
              <span
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.58rem",
                  color: "rgba(245,241,232,0.3)",
                }}
              >
                {products.length} {products.length === 1 ? "piece" : "pieces"}
              </span>
            </div>
            <div
              className="asa-shop-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                gap: "clamp(2rem, 4vw, 4rem) clamp(1rem, 2vw, 2rem)",
              }}
            >
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}

function ShopState({
  title,
  message,
  showSetup = false,
}: {
  title: string;
  message: string;
  showSetup?: boolean;
}) {
  return (
    <div
      style={{
        maxWidth: 650,
        padding: "3rem",
        border: "1px solid rgba(201,168,106,0.18)",
        background: "rgba(245,241,232,0.015)",
      }}
    >
      <p
        style={{
          margin: 0,
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "2rem",
          fontWeight: 300,
          color: "#F5F1E8",
        }}
      >
        {title}
      </p>
      <p
        style={{
          margin: "0.8rem 0 0",
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.8rem",
          lineHeight: 1.75,
          color: "rgba(245,241,232,0.45)",
        }}
      >
        {message}
      </p>
      {showSetup && (
        <pre
          style={{
            margin: "1.5rem 0 0",
            padding: "1rem",
            overflowX: "auto",
            background: "#050505",
            border: "1px solid rgba(245,241,232,0.08)",
            color: "#C9A86A",
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.65rem",
            lineHeight: 1.7,
          }}
        >
          SHOPIFY_STORE_DOMAIN=your-store.myshopify.com{"\n"}
          SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-token{"\n"}
          SHOPIFY_API_VERSION=2026-07
        </pre>
      )}
    </div>
  );
}
