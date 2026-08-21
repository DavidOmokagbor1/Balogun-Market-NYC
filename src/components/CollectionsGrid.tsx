"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "motion/react";

const CATEGORY_META = [
  {
    id: 1,
    label: "Ready-to-Wear",
    count: "Y'WANDELAG",
    span: "tall",
    desc: "Heritage embroidery on minimal, locally made silhouettes — Zubi, Tinko, and tie-dye.",
    href: "/shop",
    img: "/designers/ywande-featured.jpg",
  },
  {
    id: 2,
    label: "Occasionwear",
    count: "Mokhueleigbe",
    span: "normal",
    desc: "Bridal, haute, and ready-to-wear from Lekki — heritage cut, modern silhouette.",
    href: "/shop",
    img: "/designers/mokhueleigbe-featured.jpg",
  },
  {
    id: 3,
    label: "Scarves & Textiles",
    count: "The Houses",
    span: "normal",
    desc: "Cloth as the first language of the roster — published as each house releases it.",
    href: "/shop",
    img: "/designers/ywande-shop.jpg",
  },
  {
    id: 4,
    label: "Accessories",
    count: "Forthcoming",
    span: "tall",
    desc: "Objects selected with the same standard as the garments — when a house is ready.",
    href: "/journal",
    img: "/designers/mokhueleigbe-portrait.jpg",
  },
  {
    id: 5,
    label: "Jewelry",
    count: "Forthcoming",
    span: "wide",
    desc: "A lane held for houses chosen for craft. Watch the Journal for the first dated drop.",
    href: "/journal",
    img: "/designers/ywande-featured.jpg",
  },
  {
    id: 6,
    label: "The Roster",
    count: "Two houses",
    span: "normal",
    desc: "Y'WANDELAG and Mokhueleigbe — Lagos-made, shown first in New York.",
    href: "/#designers",
    img: "/designers/mokhueleigbe-portrait.jpg",
  },
];

function CategoryCard({
  item,
  delay,
}: {
  item: (typeof CATEGORY_META)[0];
  delay: number;
}) {
  const [hovered, setHovered] = useState(false);
  const isWide = item.span === "wide";
  const isTall = item.span === "tall";

  return (
    <Link href={item.href} style={{ display: "block", color: "inherit", textDecoration: "none", gridColumn: isWide ? "span 2" : "span 1", gridRow: isTall ? "span 2" : "span 1" }}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        style={{
          position: "relative",
          overflow: "hidden",
          height: "100%",
          minHeight: isTall ? 0 : undefined,
          background: "#111111",
          border: "1px solid rgba(245,241,232,0.06)",
        }}
        data-cursor-hover
      >
        <motion.img
          src={item.img}
          alt={item.label}
          style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.5) saturate(1.1)" }}
          animate={{ scale: hovered ? 1.06 : 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />

        <div style={{ position: "absolute", inset: 0, background: hovered ? "linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.3) 60%, transparent 100%)" : "linear-gradient(to top, rgba(10,10,10,0.8) 0%, transparent 60%)", transition: "background 0.4s" }} />

        <div style={{ position: "absolute", top: 0, right: 0, width: "40px", height: "40px", borderTop: "1px solid rgba(201,168,106,0.4)", borderRight: "1px solid rgba(201,168,106,0.4)", transition: "width 0.4s, height 0.4s", ...(hovered ? { width: "60px", height: "60px" } : {}) }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, width: hovered ? "60px" : "40px", height: hovered ? "60px" : "40px", borderBottom: "1px solid rgba(201,168,106,0.4)", borderLeft: "1px solid rgba(201,168,106,0.4)", transition: "width 0.4s, height 0.4s" }} />

        <div style={{ position: "absolute", top: "1.5rem", left: "1.5rem", fontFamily: "'Inter', sans-serif", fontSize: "0.5rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#C9A86A", background: "rgba(10,10,10,0.6)", backdropFilter: "blur(8px)", padding: "0.35rem 0.75rem", border: "1px solid rgba(201,168,106,0.2)" }}>
          {item.count}
        </div>

        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "2rem" }}>
          <motion.p
            style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(201,168,106,0.7)", marginBottom: "0.5rem", lineHeight: 1.6 }}
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
            transition={{ duration: 0.3 }}
          >
            {item.desc}
          </motion.p>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: isTall ? "2rem" : "1.5rem", fontWeight: 400, color: "#F5F1E8", margin: 0, letterSpacing: "0.02em" }}>{item.label}</h3>
          <motion.div
            style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.75rem" }}
            animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -10 }}
            transition={{ duration: 0.3 }}
          >
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9A86A" }}>
              {item.href === "/journal" ? "Watch the Journal" : item.href === "/#designers" ? "Meet the houses" : "Shop the Show"}
            </span>
            <div style={{ width: "24px", height: "1px", background: "#C9A86A" }} />
          </motion.div>
        </div>
      </motion.div>
    </Link>
  );
}

export function CollectionsGrid() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="collections" style={{ background: "#0A0A0A", padding: "clamp(4rem, 8vw, 10rem) clamp(1rem, 4vw, 4rem)" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "5rem", gap: "2rem", flexWrap: "wrap" }} ref={ref}>
          <div>
            <motion.div
              style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <div style={{ width: "30px", height: "1px", background: "#C9A86A" }} />
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#C9A86A" }}>The Offering</span>
            </motion.div>
            <motion.h2
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 5vw, 5rem)", fontWeight: 300, color: "#F5F1E8", margin: 0, lineHeight: 1.0 }}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.1 }}
            >
              Five lanes.<br /><em style={{ fontStyle: "italic", color: "#C9A86A" }}>One roster.</em>
            </motion.h2>
          </div>
          <motion.p
            style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", lineHeight: 1.8, color: "rgba(245,241,232,0.45)", maxWidth: "300px", textAlign: "right" }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Ready-to-wear, accessories, jewelry, scarves and textiles, occasionwear — from houses selected for craft.
          </motion.p>
        </div>

        <div className="asa-collections-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridTemplateRows: "350px 350px", gap: "1.5px" }}>
          {CATEGORY_META.map((item, i) => (
            <CategoryCard key={item.id} item={item} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}
