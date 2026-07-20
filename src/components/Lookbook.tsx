"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";

const LOOKS = [
  {
    id: 1,
    look: "Look 01",
    title: "Dust & Gold",
    designer: "Chidinma Obi",
    material: "Hand-loomed aso-oke, 24K gold thread",
    season: "SS 2026",
    img: "https://images.unsplash.com/photo-1713845784497-fe3d7ed176d8?w=700&h=1000&fit=crop&auto=format",
  },
  {
    id: 2,
    look: "Look 02",
    title: "The Wanderer",
    designer: "Lola Adeyemi",
    material: "Wax-resist indigo, silk organza",
    season: "SS 2026",
    img: "https://images.unsplash.com/photo-1664662566408-ef40c502a66b?w=700&h=1000&fit=crop&auto=format",
  },
  {
    id: 3,
    look: "Look 03",
    title: "Harmattan",
    designer: "Amara Diallo",
    material: "Saharan linen, burnished brass hardware",
    season: "SS 2026",
    img: "https://images.unsplash.com/photo-1659522761084-79196b64abe4?w=700&h=1000&fit=crop&auto=format",
  },
  {
    id: 4,
    look: "Look 04",
    title: "Night Market",
    designer: "Yasmin El-Rashid",
    material: "Kente weave, leather from Marrakech",
    season: "SS 2026",
    img: "https://images.unsplash.com/photo-1709809081557-78f803ce93a0?w=700&h=1000&fit=crop&auto=format",
  },
  {
    id: 5,
    look: "Look 05",
    title: "Duality",
    designer: "Kofi Mensah",
    material: "Bogolan mudcloth, metallic georgette",
    season: "SS 2026",
    img: "https://images.unsplash.com/photo-1625646741211-711bdd65c570?w=700&h=1000&fit=crop&auto=format",
  },
];

export function Lookbook() {
  const [activeLook, setActiveLook] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section id="lookbook" style={{ background: "#0A0A0A", padding: "clamp(4rem, 8vw, 10rem) 0", borderTop: "1px solid rgba(201,168,106,0.08)", overflow: "hidden" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 4rem" }} ref={ref}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "5rem" }}>
          <div>
            <motion.div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }} initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.7 }}>
              <div style={{ width: "30px", height: "1px", background: "#C9A86A" }} />
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#C9A86A" }}>SS 2026 Lookbook</span>
            </motion.div>
            <motion.h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 5vw, 5rem)", fontWeight: 300, color: "#F5F1E8", margin: 0, lineHeight: 1.0 }} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, delay: 0.1 }}>
              Runway. Editorial.<br /><em style={{ fontStyle: "italic", color: "#C9A86A" }}>Collectible.</em>
            </motion.h2>
          </div>
          <motion.div style={{ display: "flex", gap: "0.5rem" }} initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.7, delay: 0.3 }}>
            {LOOKS.map((_, i) => (
              <button key={i} onClick={() => setActiveLook(i)} style={{ width: i === activeLook ? "32px" : "8px", height: "2px", background: i === activeLook ? "#C9A86A" : "rgba(245,241,232,0.2)", border: "none", cursor: "pointer", transition: "all 0.3s" }} />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Horizontal scroll strip */}
      <div
        ref={scrollRef}
        style={{ display: "flex", gap: "1.5px", overflowX: "auto", paddingLeft: "clamp(1rem, 4vw, 4rem)", scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {LOOKS.map((look, i) => (
          <motion.div
            key={look.id}
            onClick={() => setActiveLook(i)}
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: i * 0.1 }}
            style={{ flexShrink: 0, width: activeLook === i ? "clamp(240px, 70vw, 380px)" : "clamp(80px, 25vw, 200px)", height: "clamp(400px, 70vh, 600px)", position: "relative", overflow: "hidden", cursor: "pointer", transition: "width 0.5s cubic-bezier(0.22, 1, 0.36, 1)" }}
            data-cursor-hover
          >
            <img
              src={look.img}
              alt={look.title}
              style={{ width: "100%", height: "100%", objectFit: "cover", filter: activeLook === i ? "brightness(0.7)" : "brightness(0.4) saturate(0.5)", transition: "filter 0.5s" }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,10,0.9) 0%, transparent 55%)" }} />

            {/* Look number */}
            <div style={{ position: "absolute", top: "1.5rem", left: "1.5rem", fontFamily: "'Inter', sans-serif", fontSize: "0.5rem", letterSpacing: "0.25em", textTransform: "uppercase", color: activeLook === i ? "#C9A86A" : "rgba(245,241,232,0.4)" }}>
              {look.look}
            </div>

            {/* Info */}
            <div style={{ position: "absolute", bottom: "2rem", left: "1.5rem", right: "1.5rem", opacity: activeLook === i ? 1 : 0, transition: "opacity 0.4s" }}>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.5rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9A86A", marginBottom: "0.5rem" }}>{look.season}</div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.75rem", fontWeight: 400, color: "#F5F1E8", margin: "0 0 0.35rem", lineHeight: 1.1 }}>{look.title}</h3>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", color: "rgba(245,241,232,0.5)", marginBottom: "0.25rem" }}>{look.designer}</div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", fontStyle: "italic", color: "rgba(245,241,232,0.35)" }}>{look.material}</div>
            </div>

            {/* Minimal title for closed state */}
            <div style={{ position: "absolute", bottom: "2rem", left: "1.5rem", opacity: activeLook === i ? 0 : 1, transition: "opacity 0.3s" }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", color: "rgba(245,241,232,0.5)", writingMode: "vertical-rl", transform: "rotate(180deg)" }}>{look.title}</div>
            </div>
          </motion.div>
        ))}
        {/* Spacer */}
        <div style={{ flexShrink: 0, width: "4rem" }} />
      </div>
    </section>
  );
}
