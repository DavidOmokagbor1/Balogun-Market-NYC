import type { Metadata } from "next";
import { ProductCard } from "@/components/shop/ProductCard";
import {
  getProducts,
  isShopifyConfigured,
  ShopifyConfigError,
} from "@/lib/shopify";
import type { ShopifyProduct } from "@/types/shopify";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Shop the Show — pieces from Y'WANDELAG and Mokhueleigbe at Balogun Market NYC.",
};

export const dynamic = "force-dynamic";

export default async function ShopPage() {
  let products: ShopifyProduct[] = [];
  let error: string | null = null;

  if (!isShopifyConfigured) {
    console.error(
      "Shop page: SHOPIFY_STORE_DOMAIN or SHOPIFY_STOREFRONT_ACCESS_TOKEN is missing."
    );
  } else {
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
            "clamp(7rem, 10vw, 8.5rem) clamp(1.25rem, 5vw, 5rem) clamp(2.5rem, 4vw, 3.5rem)",
          borderBottom: "1px solid rgba(201,168,106,0.1)",
          background:
            "radial-gradient(circle at 80% 20%, rgba(201,168,106,0.08), transparent 34%), #080808",
        }}
      >
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <p className="catalog-label" style={{ margin: "0 0 1.2rem" }}>
            Shop the Show
          </p>
          <h1
            style={{
              maxWidth: 780,
              margin: 0,
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2.4rem, 5vw, 4.25rem)",
              fontWeight: 300,
              lineHeight: 0.95,
              color: "#F5F1E8",
            }}
          >
            The Collection.
          </h1>
          <p
            style={{
              maxWidth: 560,
              margin: "1.25rem 0 0",
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.88rem",
              fontWeight: 300,
              lineHeight: 1.85,
              color: "rgba(245,241,232,0.48)",
            }}
          >
            Pieces from Y&apos;WANDELAG and Mokhueleigbe — Lagos-made, shown in
            New York.
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
        {error ? (
          <ShopState title="The collection is temporarily unavailable." message="Please return shortly." />
        ) : products.length === 0 ? (
          <ShopState
            title="The first drop is being prepared."
            message="Pieces from Y'WANDELAG and Mokhueleigbe will appear here as they are published. Meet the houses in the meantime."
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
}: {
  title: string;
  message: string;
}) {
  return (
    <div
      style={{
        maxWidth: 650,
        padding: "2.5rem 0",
      }}
    >
      <p
        style={{
          margin: 0,
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "1.85rem",
          fontWeight: 300,
          color: "#F5F1E8",
        }}
      >
        {title}
      </p>
      <p
        style={{
          margin: "0.8rem 0 1.5rem",
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.8rem",
          lineHeight: 1.75,
          color: "rgba(245,241,232,0.45)",
        }}
      >
        {message}
      </p>
      <a
        href="/#designers"
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.62rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "#C9A86A",
          textDecoration: "none",
        }}
      >
        Meet the Designers →
      </a>
    </div>
  );
}
