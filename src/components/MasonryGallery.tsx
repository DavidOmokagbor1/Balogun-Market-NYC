"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "motion/react";
import { X, ZoomIn } from "lucide-react";

type Look = {
  id: string;
  title: string;
  house: string;
  category: string;
  origin: string;
  note: string;
  img: string;
};

const LOOKS: Look[] = [
  {
    id: "zare",
    title: "Zare",
    house: "Y'WANDELAG",
    category: "Ready-to-Wear",
    origin: "Lagos",
    note: "Heritage embroidery on a locally made silhouette.",
    img: "/designers/ywande-studio.jpg",
  },
  {
    id: "lfw-2025",
    title: "Lagos Fashion Week",
    house: "Y'WANDELAG",
    category: "Runway",
    origin: "Lagos · 2025",
    note: "Zubi, Tinko, and tie-dye on the 2025 runway.",
    img: "/designers/ywande-lfw2025-26.jpg",
  },
  {
    id: "lfw-2025-b",
    title: "Lagos Fashion Week",
    house: "Y'WANDELAG",
    category: "Runway",
    origin: "Lagos · 2025",
    note: "The founding house on the Lagos Fashion Week 2025 runway.",
    img: "/designers/ywande-lfw2025-24.jpg",
  },
  {
    id: "lfw-2025-c",
    title: "Lagos Fashion Week",
    house: "Y'WANDELAG",
    category: "Runway",
    origin: "Lagos · 2025",
    note: "A look from the Y'WANDELAG 2025 collection.",
    img: "/designers/ywande-lfw2025-34.jpg",
  },
  {
    id: "elan",
    title: "Élan",
    house: "Mokhueleigbe",
    category: "Haute",
    origin: "Lekki",
    note: "The 2025 rebrand — heritage cut, modern silhouette.",
    img: "/designers/mokhueleigbe-portrait.jpg",
  },
  {
    id: "oath-bloom",
    title: "Oath & Bloom",
    house: "Mokhueleigbe",
    category: "Occasionwear",
    origin: "Lekki",
    note: "Bridal collection — structured occasionwear.",
    img: "/designers/mokhueleigbe-featured.jpg",
  },
];

const HEIGHTS = ["420px", "280px", "380px", "300px"];

export function MasonryGallery() {
  const [houseFilter, setHouseFilter] = useState("All");
  const [lightbox, setLightbox] = useState<Look | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const houses = useMemo(
    () => ["All", ...Array.from(new Set(LOOKS.map((look) => look.house)))],
    []
  );

  const filtered = LOOKS.filter(
    (look) => houseFilter === "All" || look.house === houseFilter
  );

  const columns: Look[][] = [[], [], []];
  filtered.forEach((look, i) => columns[i % 3].push(look));

  return (
    <section id="gallery" style={{ background: "#0A0A0A", padding: "clamp(4rem, 8vw, 10rem) clamp(1rem, 4vw, 4rem)", borderTop: "1px solid rgba(201,168,106,0.08)" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }} ref={ref}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "4rem", flexWrap: "wrap", gap: "1.5rem" }}>
          <div>
            <motion.div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }} initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.7 }}>
              <div style={{ width: "30px", height: "1px", background: "#C9A86A" }} />
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#C9A86A" }}>The Gallery</span>
            </motion.div>
            <motion.h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 5vw, 5rem)", fontWeight: 300, color: "#F5F1E8", margin: 0, lineHeight: 1.0 }} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, delay: 0.1 }}>
              The houses.<br /><em style={{ fontStyle: "italic", color: "#C9A86A" }}>In stills.</em>
            </motion.h2>
          </div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,241,232,0.3)" }}>
            {filtered.length} {filtered.length === 1 ? "look" : "looks"}
          </div>
        </div>

        <div style={{ marginBottom: "3rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {houses.map((house) => (
            <button
              key={house}
              type="button"
              onClick={() => setHouseFilter(house)}
              style={{ padding: "0.45rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", letterSpacing: "0.15em", textTransform: "uppercase", background: houseFilter === house ? "#C9A86A" : "transparent", color: houseFilter === house ? "#0A0A0A" : "rgba(245,241,232,0.45)", border: `1px solid ${houseFilter === house ? "#C9A86A" : "rgba(245,241,232,0.1)"}`, cursor: "pointer", transition: "all 0.2s" }}
            >
              {house}
            </button>
          ))}
        </div>

        <div className="asa-masonry-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", alignItems: "start" }}>
          {columns.map((col, ci) => (
            <div key={ci} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <AnimatePresence>
                {col.map((look, i) => (
                  <GalleryCard
                    key={look.id}
                    look={look}
                    height={HEIGHTS[(ci * 3 + i) % HEIGHTS.length]}
                    delay={i * 0.05}
                    onOpen={() => setLightbox(look)}
                  />
                ))}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            style={{ position: "fixed", inset: 0, zIndex: 800, background: "rgba(5,5,5,0.96)", display: "flex", alignItems: "center", justifyContent: "center", padding: "3rem" }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="asa-lightbox-inner"
              style={{ display: "flex", gap: "3rem", maxWidth: "1000px", width: "100%", alignItems: "center" }}
            >
              <img src={lightbox.img} alt={lightbox.title} className="asa-lightbox-img" style={{ maxHeight: "80vh", maxWidth: "55%", objectFit: "contain" }} />
              <div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.5rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#C9A86A", marginBottom: "1rem" }}>
                  {lightbox.category} · {lightbox.origin}
                </div>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.5rem", fontWeight: 400, color: "#F5F1E8", margin: "0 0 0.5rem", lineHeight: 1.1 }}>{lightbox.title}</h2>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", color: "rgba(245,241,232,0.5)", margin: "0 0 1.5rem" }}>{lightbox.house}</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", lineHeight: 1.7, color: "rgba(245,241,232,0.55)", margin: "0 0 2rem", maxWidth: "360px" }}>
                  {lightbox.note}
                </p>
                <Link
                  href="/shop"
                  style={{ display: "inline-block", padding: "0.85rem 1.75rem", background: "#C9A86A", color: "#0A0A0A", fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none" }}
                >
                  Shop the Show
                </Link>
              </div>
            </motion.div>
            <button type="button" onClick={() => setLightbox(null)} style={{ position: "absolute", top: "2rem", right: "2rem", background: "none", border: "none", cursor: "pointer", color: "#F5F1E8", opacity: 0.6 }}>
              <X size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function GalleryCard({
  look,
  height,
  delay,
  onOpen,
}: {
  look: Look;
  height: string;
  delay: number;
  onOpen: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{ position: "relative", overflow: "hidden", cursor: "pointer", background: "#111111" }}
      data-cursor-hover
      onClick={onOpen}
    >
      <motion.img
        src={look.img}
        alt={look.title}
        style={{ width: "100%", height, objectFit: "cover", filter: "brightness(0.7) saturate(1.1)", display: "block" }}
        animate={{ scale: hovered ? 1.05 : 1 }}
        transition={{ duration: 0.6 }}
      />
      <motion.div
        style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,10,0.9) 0%, transparent 55%)" }}
        animate={{ opacity: hovered ? 1 : 0.6 }}
      />
      <motion.div
        style={{ position: "absolute", top: "1rem", right: "1rem" }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpen();
          }}
          style={{ width: "32px", height: "32px", background: "rgba(10,10,10,0.7)", backdropFilter: "blur(8px)", border: "1px solid rgba(245,241,232,0.15)", color: "#F5F1E8", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <ZoomIn size={13} />
        </button>
      </motion.div>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1.25rem" }}>
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.5rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(201,168,106,0.6)", marginBottom: "0.35rem" }}>
          {look.category} · {look.origin}
        </div>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontWeight: 400, color: "#F5F1E8" }}>{look.title}</div>
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", color: "rgba(245,241,232,0.4)", marginTop: "0.2rem" }}>
          {look.house}
        </div>
      </div>
    </motion.div>
  );
}
