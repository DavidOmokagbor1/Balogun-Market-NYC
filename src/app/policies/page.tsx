import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Policies",
  description:
    "Shipping, returns, and privacy for Balogun Market NYC — checkout fulfilled by Shopify.",
};

const SECTIONS = [
  {
    title: "Orders & payment",
    body: "The collection is sold through this site. Cart and checkout are fulfilled by Shopify: inventory, payment, tax, and shipping are calculated there. You will receive Shopify’s order confirmation after a successful payment.",
  },
  {
    title: "Shipping",
    body: "Shipping options and costs are shown at checkout. Dispatch times depend on the house and the piece. If a made-to-order or limited piece needs a longer lead time, it will be stated on the product page.",
  },
  {
    title: "Returns",
    body: "Returns are arranged with the house after delivery. Write to us with your order number and we will advise. Unworn pieces in original condition are the baseline; final-sale or made-to-order items will be marked as such.",
  },
  {
    title: "Privacy",
    body: "Checkout and payment data are processed by Shopify. This site uses only what is needed to show the collection, keep a cart, and complete an order. We do not sell personal information.",
  },
];

export default function PoliciesPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "7rem clamp(1.25rem, 5vw, 5rem) 8rem",
        background: "#0A0A0A",
      }}
    >
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <p className="catalog-label" style={{ margin: "0 0 1.2rem" }}>
          The House
        </p>
        <h1
          style={{
            margin: 0,
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(2.4rem, 5vw, 4.25rem)",
            fontWeight: 300,
            lineHeight: 0.95,
            color: "#F5F1E8",
          }}
        >
          Shipping, returns,{" "}
          <em style={{ fontStyle: "italic", color: "#C9A86A" }}>privacy.</em>
        </h1>

        <div style={{ marginTop: "3.5rem", display: "grid", gap: "2.5rem" }}>
          {SECTIONS.map((section) => (
            <section key={section.title}>
              <h2
                style={{
                  margin: "0 0 0.75rem",
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.65rem",
                  fontWeight: 400,
                  color: "#F5F1E8",
                }}
              >
                {section.title}
              </h2>
              <p
                style={{
                  margin: 0,
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.88rem",
                  fontWeight: 300,
                  lineHeight: 1.85,
                  color: "rgba(245,241,232,0.5)",
                }}
              >
                {section.body}
              </p>
            </section>
          ))}
        </div>

        <p
          style={{
            margin: "3rem 0 0",
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.78rem",
            lineHeight: 1.7,
            color: "rgba(245,241,232,0.35)",
          }}
        >
          Questions —{" "}
          <Link href="/contact" style={{ color: "#C9A86A", textDecoration: "none" }}>
            write to the house
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
