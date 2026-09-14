import type { Metadata } from "next";
import Link from "next/link";
import { FittingForm } from "@/components/fitting/FittingForm";

export const metadata: Metadata = {
  title: "The Fitting",
  description:
    "Add your measurements. Balogun Market NYC suggests a size for each house — every cut is different.",
};

export default function FittingPage() {
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
          The Fitting
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
          Your measurements.
          <br />
          <em style={{ fontStyle: "italic", color: "#C9A86A" }}>Each house, its own cut.</em>
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
          Y&apos;WANDELAG and Mokhueleigbe do not size the same. We keep your
          measurements on this device and suggest a size for the piece in front
          of you.
        </p>

        <FittingForm />

        <div
          style={{
            marginTop: "3rem",
            paddingTop: "1.75rem",
            borderTop: "1px solid rgba(245,241,232,0.08)",
            display: "flex",
            gap: "2rem",
            flexWrap: "wrap",
          }}
        >
          <Link
            href="/shop"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.62rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#C9A86A",
              textDecoration: "none",
            }}
          >
            Shop the Show →
          </Link>
          <Link
            href="/#designers"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.62rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(245,241,232,0.45)",
              textDecoration: "none",
            }}
          >
            Meet the houses
          </Link>
        </div>
      </div>
    </div>
  );
}
