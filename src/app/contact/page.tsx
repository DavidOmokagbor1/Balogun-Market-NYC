import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Press, partners, and collaborators — write to Balogun Market NYC.",
};

export default function ContactPage() {
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
          Partners, press,{" "}
          <em style={{ fontStyle: "italic", color: "#C9A86A" }}>collaborators.</em>
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
          Balogun Market NYC invites partners, press, and collaborators to join
          us in shaping the future of African luxury. This is the beginning of a
          new fashion chapter.
        </p>

        <dl
          style={{
            margin: "3rem 0 0",
            display: "grid",
            gap: "1.75rem",
            paddingTop: "2rem",
            borderTop: "1px solid rgba(245,241,232,0.08)",
          }}
        >
          <div>
            <dt className="catalog-label" style={{ marginBottom: "0.65rem" }}>
              Press & partners
            </dt>
            <dd
              style={{
                margin: 0,
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.88rem",
                lineHeight: 1.7,
                color: "rgba(245,241,232,0.7)",
              }}
            >
              <a
                href="mailto:hello@balogunmarketnyc.com"
                style={{ color: "#C9A86A", textDecoration: "none" }}
              >
                hello@balogunmarketnyc.com
              </a>
              <span
                style={{
                  display: "block",
                  marginTop: "0.4rem",
                  fontSize: "0.75rem",
                  color: "rgba(245,241,232,0.35)",
                }}
              >
                Press, partnerships, and house introductions.
              </span>
            </dd>
          </div>
          <div>
            <dt className="catalog-label" style={{ marginBottom: "0.65rem" }}>
              Visit
            </dt>
            <dd
              style={{
                margin: 0,
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.88rem",
                lineHeight: 1.7,
                color: "rgba(245,241,232,0.7)",
              }}
            >
              New York City
              <span
                style={{
                  display: "block",
                  marginTop: "0.4rem",
                  fontSize: "0.75rem",
                  color: "rgba(245,241,232,0.35)",
                }}
              >
                Pop-ups and Fashion Week activations are announced in the
                Journal with a place and a date.
              </span>
            </dd>
          </div>
        </dl>

        <div
          style={{
            marginTop: "3rem",
            display: "flex",
            gap: "2rem",
            flexWrap: "wrap",
          }}
        >
          <Link
            href="/journal"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.62rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#C9A86A",
              textDecoration: "none",
            }}
          >
            The Journal →
          </Link>
          <Link
            href="/policies"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.62rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(245,241,232,0.45)",
              textDecoration: "none",
            }}
          >
            Shipping & returns →
          </Link>
        </div>
      </div>
    </div>
  );
}
