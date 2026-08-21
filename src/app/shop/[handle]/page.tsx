import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductPurchase } from "@/components/shop/ProductPurchase";
import { getProduct, isShopifyConfigured } from "@/lib/shopify";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  if (!isShopifyConfigured) return { title: "Shop" };

  try {
    const { handle } = await params;
    const product = await getProduct(handle);
    if (!product) return { title: "Piece not found" };
    return {
      title: product.title,
      description: product.description.slice(0, 160),
      openGraph: product.featuredImage
        ? { images: [{ url: product.featuredImage.url }] }
        : undefined,
    };
  } catch {
    return { title: "Shop" };
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  if (!isShopifyConfigured) notFound();

  const { handle } = await params;
  const product = await getProduct(handle);
  if (!product) notFound();

  const gallery =
    product.images.length > 0
      ? product.images
      : product.featuredImage
        ? [product.featuredImage]
        : [];

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "7rem clamp(1.25rem, 5vw, 5rem) 8rem",
        background: "#0A0A0A",
      }}
    >
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <Link
          href="/shop"
          className="catalog-label"
          style={{ textDecoration: "none" }}
        >
          ← The Collection
        </Link>

        <div
          className="asa-product-layout"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.4fr) minmax(320px, 0.75fr)",
            gap: "clamp(2.5rem, 6vw, 7rem)",
            alignItems: "start",
            marginTop: "2rem",
          }}
        >
          <div
            className="asa-product-gallery"
            style={{
              display: "grid",
              gridTemplateColumns:
                gallery.length > 1 ? "repeat(2, minmax(0, 1fr))" : "1fr",
              gap: "1rem",
            }}
          >
            {gallery.length > 0 ? (
              gallery.map((image, index) => (
                <div
                  key={`${image.url}-${index}`}
                  style={{
                    aspectRatio: "4 / 5",
                    overflow: "hidden",
                    background: "#111111",
                    border: "1px solid rgba(245,241,232,0.06)",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image.url}
                    alt={image.altText || `${product.title} view ${index + 1}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>
              ))
            ) : (
              <div
                style={{
                  aspectRatio: "4 / 5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid rgba(245,241,232,0.06)",
                  background: "#111111",
                }}
              >
                <span className="catalog-label">Image forthcoming</span>
              </div>
            )}
          </div>

          <aside
            className="asa-product-info"
            style={{ position: "sticky", top: "6.5rem" }}
          >
            {(product.vendor || product.productType) && (
              <p className="catalog-label" style={{ margin: "0 0 1rem" }}>
                {[product.vendor, product.productType]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            )}
            <h1
              style={{
                margin: 0,
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2.6rem, 5vw, 4.5rem)",
                fontWeight: 300,
                lineHeight: 0.98,
                color: "#F5F1E8",
              }}
            >
              {product.title}
            </h1>

            {product.description && (
              <p
                style={{
                  margin: "1.6rem 0 2rem",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.82rem",
                  fontWeight: 300,
                  lineHeight: 1.85,
                  color: "rgba(245,241,232,0.55)",
                  whiteSpace: "pre-line",
                }}
              >
                {product.description}
              </p>
            )}

            <div
              style={{
                padding: "1.6rem 0",
                borderTop: "1px solid rgba(245,241,232,0.09)",
                borderBottom: "1px solid rgba(245,241,232,0.09)",
              }}
            >
              <ProductPurchase variants={product.variants} />
            </div>

            <dl
              style={{
                margin: "1.5rem 0 0",
                display: "grid",
                gap: "0.8rem",
              }}
            >
              {product.tags.length > 0 && (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "5rem 1fr",
                    gap: "1rem",
                  }}
                >
                  <dt className="catalog-label">Notes</dt>
                  <dd
                    style={{
                      margin: 0,
                      color: "rgba(245,241,232,0.45)",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.68rem",
                      lineHeight: 1.6,
                    }}
                  >
                    {product.tags.join(" · ")}
                  </dd>
                </div>
              )}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "5rem 1fr",
                  gap: "1rem",
                }}
              >
                <dt className="catalog-label">Checkout</dt>
                <dd
                  style={{
                    margin: 0,
                    color: "rgba(245,241,232,0.45)",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.68rem",
                    lineHeight: 1.6,
                  }}
                >
                  Securely fulfilled by Shopify
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </div>
    </div>
  );
}
