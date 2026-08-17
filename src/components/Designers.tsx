"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";

const DESIGNERS = [
  {
    id: 1,
    name: "Y'WANDELAG",
    country: "Nigeria",
    category: "Ready-to-Wear",
    founded: "June 2021, Lagos · Fatima Wande Lagundoye",
    signature: "Heritage embroidery — Zubi, Tinko, and tie-dye — on minimal, locally made silhouettes",
    collections: ["The Zubi Collection", "Zare Collection", "Lagos Fashion Week 2024"],
    img: "/designers/ywande-shop.jpg",
    featured: "/designers/ywande-featured.jpg",
    quote: "African craft holds endless possibilities when approached with intention and innovation.",
    color: "#C9A86A",
  },
  {
    id: 2,
    name: "Mokhueleigbe",
    country: "Nigeria",
    category: "Occasionwear",
    founded: "2018, Lagos · Margaret Okhueleigbe — as 3&4 Fashion; rebranded 2025",
    signature: "Bridal, haute, and ready-to-wear from Lekki — heritage cut with a modern silhouette",
    collections: ["Oath & Bloom — Bridal", "Élan — Haute", "Eko Muse — Ready-to-Wear"],
    img: "/designers/mokhueleigbe-portrait.jpg",
    featured: "/designers/mokhueleigbe-featured.jpg",
    quote: "This successful rebrand and collection marks a new era for Mokhueleigbe Studios as it steps into a fresh identity while continuing to deliver elegance and innovation in Nigerian fashion.",
    color: "#C9A86A",
  },
];

export function Designers() {
  const [active, setActive] = useState<typeof DESIGNERS[0] | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="designers" style={{ background: "#0D0D0D", padding: "clamp(4rem, 8vw, 10rem) clamp(1rem, 4vw, 4rem)", borderTop: "1px solid rgba(201,168,106,0.08)" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }} ref={ref}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "5rem" }}>
          <div>
            <motion.div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }} initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.7 }}>
              <div style={{ width: "30px", height: "1px", background: "#C9A86A" }} />
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#C9A86A" }}>The Roster</span>
            </motion.div>
            <motion.h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 5vw, 5rem)", fontWeight: 300, color: "#F5F1E8", margin: 0, lineHeight: 1.0 }} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, delay: 0.1 }}>
              The Designers<br /><em style={{ fontStyle: "italic", color: "#C9A86A" }}>Defining Now.</em>
            </motion.h2>
          </div>
          <motion.p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", lineHeight: 1.8, color: "rgba(245,241,232,0.4)", maxWidth: "260px", textAlign: "right" }} initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.8, delay: 0.3 }}>
            Designers selected for tailoring, textile, and artisanal excellence — shown first in New York City.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="asa-artists-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.5px", maxWidth: "720px" }}>
          {DESIGNERS.map((designer, i) => (
            <motion.div
              key={designer.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              onClick={() => setActive(designer)}
              style={{ position: "relative", overflow: "hidden", cursor: "pointer", height: "520px", background: "#111111" }}
              data-cursor-hover
            >
              <DesignerCard designer={designer} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            style={{ position: "fixed", inset: 0, zIndex: 800, background: "rgba(5,5,5,0.95)", overflowY: "auto" }}
          >
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              onClick={e => e.stopPropagation()}
              style={{ maxWidth: "1000px", margin: "8rem auto", padding: "0 3rem 6rem" }}
            >
              {/* Close */}
              <button onClick={() => setActive(null)} style={{ background: "none", border: "none", color: "rgba(245,241,232,0.5)", cursor: "pointer", fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "3rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                ← Back to Designers
              </button>

              <div className="asa-artist-detail-grid" style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "3rem" }}>
                <div>
                  <img src={active.img} alt={active.name} style={{ width: "100%", height: "380px", objectFit: "cover", filter: "brightness(0.8)" }} />
                  <div style={{ marginTop: "1.5rem", borderTop: "1px solid rgba(201,168,106,0.15)", paddingTop: "1.5rem" }}>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: active.color, marginBottom: "0.5rem" }}>{active.category}</div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", color: "rgba(245,241,232,0.45)", marginBottom: "1rem" }}>Founded {active.founded}</div>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontStyle: "italic", color: "rgba(245,241,232,0.6)", lineHeight: 1.5 }}>"{active.quote}"</div>
                  </div>
                </div>
                <div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#C9A86A", marginBottom: "0.75rem" }}>{active.country}</div>
                  <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "3.5rem", fontWeight: 300, color: "#F5F1E8", margin: "0 0 1rem", lineHeight: 1.0 }}>{active.name}</h2>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", lineHeight: 1.8, color: "rgba(245,241,232,0.5)", margin: "0 0 2.5rem" }}>{active.signature}</p>

                  <img src={active.featured} alt="Notable collection" style={{ width: "100%", height: "240px", objectFit: "cover", filter: "brightness(0.75)", marginBottom: "2rem" }} />

                  <div style={{ marginBottom: "2rem" }}>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(245,241,232,0.3)", marginBottom: "1rem" }}>Notable Collections</div>
                    {active.collections.map(collection => (
                      <div key={collection} style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", color: "rgba(245,241,232,0.55)", padding: "0.6rem 0", borderBottom: "1px solid rgba(245,241,232,0.06)" }}>{collection}</div>
                    ))}
                  </div>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", padding: "1.25rem 0", borderTop: "1px solid rgba(201,168,106,0.15)" }}>
                    <button style={{ padding: "0.85rem 2rem", background: "#C9A86A", color: "#0A0A0A", border: "none", fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer" }}>
                      View Collection
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function DesignerCard({ designer }: { designer: typeof DESIGNERS[0] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div style={{ height: "100%", width: "100%" }} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <motion.img
        src={designer.img}
        alt={designer.name}
        style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.5) saturate(0.8)", position: "absolute", inset: 0 }}
        animate={{ scale: hovered ? 1.06 : 1 }}
        transition={{ duration: 0.7 }}
      />
      <div style={{ position: "absolute", inset: 0, background: hovered ? "linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.2) 50%)" : "linear-gradient(to top, rgba(10,10,10,0.85) 0%, transparent 60%)", transition: "background 0.4s" }} />
      <div style={{ position: "absolute", top: "1.5rem", left: "1.5rem" }}>
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.5rem", letterSpacing: "0.25em", textTransform: "uppercase", color: designer.color, background: "rgba(10,10,10,0.6)", backdropFilter: "blur(8px)", padding: "0.3rem 0.7rem", border: `1px solid ${designer.color}30` }}>
          {designer.country}
        </div>
      </div>
      <div style={{ position: "absolute", bottom: "2rem", left: "1.5rem", right: "1.5rem" }}>
        <motion.div animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }} style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", lineHeight: 1.6, color: "rgba(245,241,232,0.5)", marginBottom: "0.75rem" }}>
          {designer.signature}
        </motion.div>
        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", fontWeight: 400, color: "#F5F1E8", margin: "0 0 0.25rem", lineHeight: 1.1 }}>{designer.name}</h3>
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(245,241,232,0.35)" }}>{designer.category}</div>
        <motion.div animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -10 }} style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "1rem" }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.5rem", letterSpacing: "0.2em", textTransform: "uppercase", color: designer.color }}>View House</span>
          <div style={{ width: "20px", height: "1px", background: designer.color }} />
        </motion.div>
      </div>
    </div>
  );
}
