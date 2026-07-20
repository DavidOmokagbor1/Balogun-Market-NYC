"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";

const EXHIBITIONS = [
  {
    id: 1,
    title: "Threads of Time",
    subtitle: "The Living Archive of West African Textiles",
    period: "15 Jan — 30 Apr 2026",
    works: 84,
    curator: "Dr. Adaeze Nwosu",
    img: "https://images.unsplash.com/photo-1552710307-537199cd41c0?w=900&h=600&fit=crop&auto=format",
    color: "#C9A86A",
    tag: "Textiles",
  },
  {
    id: 2,
    title: "Kinshasa to Kyoto",
    subtitle: "Cross-Continental Fashion Dialogues",
    period: "01 Mar — 15 Jun 2026",
    works: 56,
    curator: "Yusuf Osei-Bonsu",
    img: "https://images.unsplash.com/photo-1771153847642-9204ec2ed92e?w=900&h=600&fit=crop&auto=format",
    color: "#8B5E3C",
    tag: "Fashion",
  },
  {
    id: 3,
    title: "Invisible Cities",
    subtitle: "Urban Photography Across the Continent",
    period: "20 Feb — 10 May 2026",
    works: 112,
    curator: "Amara Diallo",
    img: "https://images.unsplash.com/photo-1761641062457-bc8603350eb0?w=900&h=600&fit=crop&auto=format",
    color: "#0F5F4B",
    tag: "Photography",
  },
];

export function VirtualExhibition() {
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="exhibition" style={{ background: "#080808", padding: "clamp(4rem, 8vw, 10rem) clamp(1rem, 4vw, 4rem)", borderTop: "1px solid rgba(201,168,106,0.08)", position: "relative", overflow: "hidden" }}>
      {/* Ambient background glow */}
      <div style={{ position: "absolute", top: "20%", right: "-10%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(201,168,106,0.04) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: "1400px", margin: "0 auto" }} ref={ref}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "5rem" }}>
          <div>
            <motion.div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }} initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.7 }}>
              <div style={{ width: "30px", height: "1px", background: "#C9A86A" }} />
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#C9A86A" }}>Virtual Exhibitions</span>
            </motion.div>
            <motion.h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 5vw, 5rem)", fontWeight: 300, color: "#F5F1E8", margin: 0, lineHeight: 1.0 }} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, delay: 0.1 }}>
              Immersive<br /><em style={{ fontStyle: "italic", color: "#C9A86A" }}>Digital Halls.</em>
            </motion.h2>
          </div>
        </div>

        {/* Exhibition selector tabs */}
        <div style={{ display: "flex", gap: "0", marginBottom: "3rem", borderBottom: "1px solid rgba(245,241,232,0.06)" }}>
          {EXHIBITIONS.map((ex, i) => (
            <button
              key={ex.id}
              onClick={() => setActive(i)}
              style={{ padding: "1rem 2rem", background: "transparent", border: "none", borderBottom: active === i ? `2px solid ${ex.color}` : "2px solid transparent", color: active === i ? "#F5F1E8" : "rgba(245,241,232,0.3)", fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer", transition: "all 0.3s", marginBottom: "-1px" }}
            >
              {ex.tag}
            </button>
          ))}
        </div>

        {/* Active exhibition */}
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="asa-exhibition-grid"
          style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "2rem" }}
        >
          {/* Main image */}
          <div style={{ position: "relative", overflow: "hidden" }}>
            <img src={EXHIBITIONS[active].img} alt={EXHIBITIONS[active].title} style={{ width: "100%", height: "480px", objectFit: "cover", filter: "brightness(0.6) saturate(0.8)" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(8,8,8,0.6) 0%, transparent 50%)" }} />

            {/* Virtual tour button */}
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                style={{ width: "100px", height: "100px", borderRadius: "50%", border: "1px solid rgba(201,168,106,0.4)", background: "rgba(10,10,10,0.5)", backdropFilter: "blur(12px)", color: "#F5F1E8", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "4px" }}
              >
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", color: "#C9A86A" }}>▶</div>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.45rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>Enter</span>
              </motion.button>
            </div>

            {/* Tag */}
            <div style={{ position: "absolute", top: "1.5rem", right: "1.5rem", background: "rgba(10,10,10,0.7)", backdropFilter: "blur(8px)", padding: "0.4rem 0.9rem", border: `1px solid ${EXHIBITIONS[active].color}30` }}>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.5rem", letterSpacing: "0.2em", textTransform: "uppercase", color: EXHIBITIONS[active].color }}>Now Showing</span>
            </div>
          </div>

          {/* Info panel */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "2rem 0" }}>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.5rem", letterSpacing: "0.25em", textTransform: "uppercase", color: EXHIBITIONS[active].color, marginBottom: "1rem" }}>{EXHIBITIONS[active].period}</div>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.25rem", fontWeight: 400, color: "#F5F1E8", margin: "0 0 0.5rem", lineHeight: 1.1 }}>{EXHIBITIONS[active].title}</h3>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontStyle: "italic", color: "rgba(245,241,232,0.5)", margin: "0 0 2rem" }}>{EXHIBITIONS[active].subtitle}</p>

            <div style={{ display: "flex", gap: "2rem", marginBottom: "2rem", padding: "1.5rem 0", borderTop: "1px solid rgba(245,241,232,0.06)", borderBottom: "1px solid rgba(245,241,232,0.06)" }}>
              <div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", color: "#C9A86A" }}>{EXHIBITIONS[active].works}</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.5rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,241,232,0.3)" }}>Works</div>
              </div>
              <div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", color: "#F5F1E8", marginTop: "0.3rem" }}>{EXHIBITIONS[active].curator}</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.5rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,241,232,0.3)" }}>Curator</div>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <button style={{ padding: "0.9rem 1.75rem", background: "#C9A86A", color: "#0A0A0A", border: "none", fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer", textAlign: "left" }}>
                Enter Virtual Exhibition →
              </button>
              <button style={{ padding: "0.9rem 1.75rem", background: "transparent", color: "#F5F1E8", border: "1px solid rgba(245,241,232,0.12)", fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer", textAlign: "left" }}>
                View Catalogue PDF
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
