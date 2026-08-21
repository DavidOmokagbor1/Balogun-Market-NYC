import { HeroSection } from "@/components/HeroSection";
import { CollectionsGrid } from "@/components/CollectionsGrid";
import { Designers } from "@/components/Designers";
import { Lookbook } from "@/components/Lookbook";
import { MasonryGallery } from "@/components/MasonryGallery";
import { BrandStory } from "@/components/Timeline";
import { VideoReel } from "@/components/VideoReel";
import { Membership } from "@/components/Membership";
import { Journal } from "@/components/Journal";
import { ProductCard } from "@/components/shop/ProductCard";
import {
  getProducts,
  isShopifyConfigured,
} from "@/lib/shopify";
import type { ShopifyProduct } from "@/types/shopify";

export const dynamic = "force-dynamic";

export default async function Home() {
  let products: ShopifyProduct[] = [];
  if (isShopifyConfigured) {
    try {
      products = await getProducts(6);
    } catch (err) {
      console.error("Home shop preview error:", err);
    }
  }

  return (
    <>
      <HeroSection />
      {products.length > 0 && <ShopPreview products={products} />}
      <CollectionsGrid />
      <Designers />
      <Lookbook />
      <MasonryGallery />
      <BrandStory />
      <VideoReel />
      <Membership />
      <Journal />
    </>
  );
}

function ShopPreview({ products }: { products: ShopifyProduct[] }) {
  return (
    <section
      id="shop"
      style={{
        background: "#0A0A0A",
        padding: "clamp(3rem, 6vw, 6rem) clamp(1rem, 4vw, 4rem)",
        borderTop: "1px solid rgba(201,168,106,0.08)",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "2rem",
            flexWrap: "wrap",
            marginBottom: "2.5rem",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                marginBottom: "1.5rem",
              }}
            >
              <div style={{ width: "30px", height: "1px", background: "#C9A86A" }} />
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.55rem",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "#C9A86A",
                }}
              >
                Shop the Show
              </span>
            </div>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(1.85rem, 3.4vw, 3rem)",
                fontWeight: 300,
                color: "#F5F1E8",
                margin: 0,
                lineHeight: 1.0,
              }}
            >
              The Collection.
              <br />
              <em style={{ fontStyle: "italic", color: "#C9A86A" }}>Shop the Show.</em>
            </h2>
          </div>
          <a
            href="/shop"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.62rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#C9A86A",
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            View all pieces →
          </a>
        </div>

        {products.length > 0 ? (
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
        ) : (
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.85rem",
              lineHeight: 1.8,
              color: "rgba(245,241,232,0.45)",
              maxWidth: "480px",
              margin: 0,
            }}
          >
            Pieces from Y&apos;WANDELAG and Mokhueleigbe will appear here as they
            are published to the shop.
          </p>
        )}
      </div>
    </section>
  );
}
