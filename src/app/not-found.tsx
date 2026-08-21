import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "7rem clamp(1.25rem, 5vw, 5rem) 8rem",
        background: "#0A0A0A",
      }}
    >
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <p className="catalog-label" style={{ margin: "0 0 1.2rem" }}>
          404
        </p>
        <h1
          style={{
            margin: 0,
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(2.4rem, 5vw, 4rem)",
            fontWeight: 300,
            lineHeight: 1.05,
            color: "#F5F1E8",
          }}
        >
          This page is not{" "}
          <em style={{ fontStyle: "italic", color: "#C9A86A" }}>in the market.</em>
        </h1>
        <p
          style={{
            margin: "1.5rem 0 2rem",
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.88rem",
            lineHeight: 1.8,
            color: "rgba(245,241,232,0.48)",
          }}
        >
          The collection, the roster, and the Journal are live. Start there.
        </p>
        <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
          <Link href="/shop" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9A86A", textDecoration: "none" }}>
            Shop the Show →
          </Link>
          <Link href="/" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,241,232,0.45)", textDecoration: "none" }}>
            Home →
          </Link>
        </div>
      </div>
    </div>
  );
}
