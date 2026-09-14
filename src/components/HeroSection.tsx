"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const HOUSE_LOOKS = [
  {
    src: "/designers/ywande-lfw2025-26.jpg",
    alt: "Y'WANDELAG at Lagos Fashion Week 2025",
    credit: "Y'WANDELAG",
  },
  {
    src: "/designers/mokhueleigbe-portrait.jpg",
    alt: "Mokhueleigbe, Élan collection",
    credit: "Mokhueleigbe",
  },
];

export function HeroSection() {
  const { scrollY } = useScroll();
  const imgY = useTransform(scrollY, [0, 600], ["0%", "18%"]);
  const [bgIndex, setBgIndex] = useState(0);
  const look = HOUSE_LOOKS[bgIndex % HOUSE_LOOKS.length];

  useEffect(() => {
    const t = setInterval(() => setBgIndex((i) => i + 1), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        height: "68vh",
        minHeight: "440px",
        maxHeight: "580px",
        overflow: "hidden",
        display: "flex",
        alignItems: "flex-end",
      }}
    >
      <motion.div style={{ position: "absolute", inset: "-8%", y: imgY }}>
        <motion.img
          key={look.src}
          src={look.src}
          alt={look.alt}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          style={{
            width: "100%",
            height: "115%",
            objectFit: "cover",
            filter: "brightness(0.42) saturate(1.1)",
          }}
        />
      </motion.div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.35) 48%, rgba(10,10,10,0.2) 100%)",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 clamp(1.25rem, 5vw, 5rem) clamp(2.5rem, 5vw, 3.5rem)",
        }}
      >
        <motion.div
          style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div style={{ width: "30px", height: "1px", background: "#C9A86A" }} />
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.62rem",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "#C9A86A",
            }}
          >
            Balogun Market NYC
          </span>
        </motion.div>

        <motion.h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(2.4rem, 5.5vw, 4.25rem)",
            fontWeight: 300,
            color: "#F5F1E8",
            lineHeight: 1.05,
            margin: "0 0 0.85rem",
            maxWidth: "16ch",
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          The First Look at the{" "}
          <em style={{ fontStyle: "italic", color: "#C9A86A" }}>Founding Houses.</em>
        </motion.h1>

        <motion.p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.82rem",
            lineHeight: 1.7,
            color: "rgba(245,241,232,0.55)",
            maxWidth: "420px",
            margin: "0 0 1.5rem",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.55 }}
        >
          Y&apos;WANDELAG and Mokhueleigbe — Lagos-made fashion, shown in New York.
        </motion.p>

        <motion.div
          style={{ display: "flex", alignItems: "center", gap: "1.25rem", flexWrap: "wrap" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.65 }}
        >
          <a
            href="/shop"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.75rem",
              padding: "0.85rem 1.6rem",
              background: "#C9A86A",
              color: "#0A0A0A",
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.62rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#F5F1E8")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#C9A86A")}
          >
            Shop the Show
          </a>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.55rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(245,241,232,0.45)",
            }}
          >
            {look.credit}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
