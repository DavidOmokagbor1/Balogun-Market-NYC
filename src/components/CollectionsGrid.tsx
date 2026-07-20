"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { usePexelsPhotos } from "@/hooks/usePexelsPhotos";

const CATEGORY_META = [
  { id: 1, label: "Fashion Archive", count: "840 Works", span: "tall", desc: "Haute couture, ready-to-wear, and avant-garde fashion spanning six decades of African design mastery.", query: "african fashion runway", fallback: "https://images.unsplash.com/photo-1713845784497-fe3d7ed176d8?w=600&h=800&fit=crop&auto=format" },
  { id: 2, label: "Photography", count: "420 Works", span: "normal", desc: "Documentary and fine-art photography capturing the continent's cultural shifts and beauty.", query: "african portrait photography", fallback: "https://images.unsplash.com/photo-1539701938214-0d9736e1c16b?w=600&h=500&fit=crop&auto=format" },
  { id: 3, label: "Textiles", count: "310 Works", span: "normal", desc: "Kente, kanga, bogolan, adire — sacred weaving traditions reimagined for the contemporary eye.", query: "african textile fabric colorful", fallback: "https://images.unsplash.com/photo-1768212566108-4ce4f329e4d2?w=600&h=500&fit=crop&auto=format" },
  { id: 4, label: "Emerging Artists", count: "190 Works", span: "tall", desc: "First editions and studio works from the next generation shaping Africa's creative future.", query: "african artist studio creative", fallback: "https://images.unsplash.com/photo-1708170236295-20ab8fbadcef?w=600&h=700&fit=crop&auto=format" },
  { id: 5, label: "Sculptures", count: "260 Works", span: "wide", desc: "Bronze, wood, ceramic, and mixed-media sculpture from across the continent's rich material traditions.", query: "sculpture art museum exhibition", fallback: "https://images.unsplash.com/photo-1771153847642-9204ec2ed92e?w=800&h=400&fit=crop&auto=format" },
  { id: 6, label: "Contemporary Art", count: "380 Works", span: "normal", desc: "Painting, installation, and digital art by Africa's most celebrated contemporary voices.", query: "contemporary art gallery painting", fallback: "https://images.unsplash.com/photo-1761641062457-bc8603350eb0?w=600&h=500&fit=crop&auto=format" },
];

function CategoryCard({ item, delay }: { item: typeof CATEGORY_META[0] & { img: string }; delay: number }) {
  const [hovered, setHovered] = useState(false);
  const isWide = item.span === "wide";
  const isTall = item.span === "tall";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        gridColumn: isWide ? "span 2" : "span 1",
        gridRow: isTall ? "span 2" : "span 1",
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        background: "#111111",
        border: "1px solid rgba(245,241,232,0.06)",
      }}
      data-cursor-hover
    >
      <motion.img
        src={item.img}
        alt={item.label}
        style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.5) saturate(0.8)" }}
        animate={{ scale: hovered ? 1.06 : 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Gradient */}
      <div style={{ position: "absolute", inset: 0, background: hovered ? "linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.3) 60%, transparent 100%)" : "linear-gradient(to top, rgba(10,10,10,0.8) 0%, transparent 60%)", transition: "background 0.4s" }} />

      {/* Gold corner accent */}
      <div style={{ position: "absolute", top: 0, right: 0, width: "40px", height: "40px", borderTop: "1px solid rgba(201,168,106,0.4)", borderRight: "1px solid rgba(201,168,106,0.4)", transition: "width 0.4s, height 0.4s", ...(hovered ? { width: "60px", height: "60px" } : {}) }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, width: hovered ? "60px" : "40px", height: hovered ? "60px" : "40px", borderBottom: "1px solid rgba(201,168,106,0.4)", borderLeft: "1px solid rgba(201,168,106,0.4)", transition: "width 0.4s, height 0.4s" }} />

      {/* Count badge */}
      <div style={{ position: "absolute", top: "1.5rem", left: "1.5rem", fontFamily: "'Inter', sans-serif", fontSize: "0.5rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#C9A86A", background: "rgba(10,10,10,0.6)", backdropFilter: "blur(8px)", padding: "0.35rem 0.75rem", border: "1px solid rgba(201,168,106,0.2)" }}>
        {item.count}
      </div>

      {/* Text */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "2rem" }}>
        <motion.p
          style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(201,168,106,0.7)", marginBottom: "0.5rem" }}
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
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9A86A" }}>Browse Archive</span>
          <div style={{ width: "24px", height: "1px", background: "#C9A86A" }} />
        </motion.div>
      </div>
    </motion.div>
  );
}

export function CollectionsGrid() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  // One batch fetch for all 6 category hero images
  const { photos } = usePexelsPhotos("african fashion culture art textile sculpture", 6);
  const CATEGORIES = CATEGORY_META.map((m, i) => ({
    ...m,
    img: photos[i]?.url || m.fallback,
  }));

  return (
    <section id="collections" style={{ background: "#0A0A0A", padding: "clamp(4rem, 8vw, 10rem) clamp(1rem, 4vw, 4rem)" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "5rem" }} ref={ref}>
          <div>
            <motion.div
              style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <div style={{ width: "30px", height: "1px", background: "#C9A86A" }} />
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#C9A86A" }}>The Archive</span>
            </motion.div>
            <motion.h2
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 5vw, 5rem)", fontWeight: 300, color: "#F5F1E8", margin: 0, lineHeight: 1.0 }}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.1 }}
            >
              Six Disciplines.<br /><em style={{ fontStyle: "italic", color: "#C9A86A" }}>One Continent.</em>
            </motion.h2>
          </div>
          <motion.p
            style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", lineHeight: 1.8, color: "rgba(245,241,232,0.45)", maxWidth: "300px", textAlign: "right" }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Curated selections across fashion, art, textiles, photography, sculpture, and emerging practices from 54 African nations.
          </motion.p>
        </div>

        {/* Bento grid */}
        <div className="asa-collections-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridTemplateRows: "350px 350px", gap: "1.5px" }}>
          {CATEGORIES.map((item, i) => (
            <CategoryCard key={item.id} item={item} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}
