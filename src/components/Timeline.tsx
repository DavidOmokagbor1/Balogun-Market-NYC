"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "motion/react";

const PILLARS = [
  {
    year: "01",
    title: "Cultural Authority",
    desc: "Honoring African heritage through curation and storytelling — houses chosen with a point of view, not a catalogue of everything.",
    country: "The House",
    img: "/designers/ywande-featured.jpg",
  },
  {
    year: "02",
    title: "Luxury Craftsmanship",
    desc: "Designers selected for tailoring, textile, and artisanal excellence. Y'WANDELAG and Mokhueleigbe set that standard.",
    country: "Lagos",
    img: "/designers/ywande-shop.jpg",
  },
  {
    year: "03",
    title: "Global Access",
    desc: "Connecting African designers to U.S. consumers, stylists, and editors — starting in New York City.",
    country: "New York",
    img: "/designers/mokhueleigbe-portrait.jpg",
  },
  {
    year: "04",
    title: "Community & Commerce",
    desc: "A cultural hub and a commercial engine. Shop the Show when pieces are live; the Journal when the next collection is dated.",
    country: "The Market",
    img: "/designers/mokhueleigbe-featured.jpg",
  },
  {
    year: "26",
    title: "The First Look",
    desc: "Balogun Market NYC launches as a curated luxury marketplace bridging African creativity with global fashion culture. This is the beginning of a new fashion chapter.",
    country: "NYC · 2026",
    img: "/designers/ywande-featured.jpg",
  },
];

export function BrandStory() {
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="story" style={{ background: "#0D0D0D", padding: "clamp(4rem, 8vw, 10rem) clamp(1rem, 4vw, 4rem)", borderTop: "1px solid rgba(201,168,106,0.08)" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }} ref={ref}>
        <motion.div
          style={{ marginBottom: "6rem" }}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
            <div style={{ width: "30px", height: "1px", background: "#C9A86A" }} />
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#C9A86A" }}>The House</span>
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 5vw, 5rem)", fontWeight: 300, color: "#F5F1E8", margin: 0, lineHeight: 1.0 }}>
            Why we exist.<br /><em style={{ fontStyle: "italic", color: "#C9A86A" }}>Four pillars.</em>
          </h2>
        </motion.div>

        <div className="asa-timeline-grid" style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "4rem", alignItems: "start" }}>
          <div className="asa-timeline-sidebar" style={{ position: "sticky", top: "120px" }}>
            {PILLARS.map((m, i) => (
              <motion.div
                key={m.title}
                onClick={() => setActive(i)}
                style={{ padding: "1.25rem 0", borderBottom: "1px solid rgba(245,241,232,0.06)", cursor: "pointer", display: "flex", alignItems: "center", gap: "1.5rem" }}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.06 }}
                data-cursor-hover
              >
                <div style={{ width: "6px", height: "6px", background: active === i ? "#C9A86A" : "rgba(245,241,232,0.15)", flexShrink: 0, transition: "background 0.3s, transform 0.3s", transform: active === i ? "scale(1.5)" : "scale(1)" }} />
                <div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: active === i ? "1.6rem" : "1.2rem", fontWeight: active === i ? 500 : 300, color: active === i ? "#F5F1E8" : "rgba(245,241,232,0.3)", transition: "all 0.4s", lineHeight: 1 }}>
                    {m.year}
                  </div>
                  {active === i && (
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#C9A86A", marginTop: "3px" }}>
                      {m.country}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <div>
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div style={{ position: "relative", marginBottom: "3rem", overflow: "hidden" }}>
                <img
                  src={PILLARS[active].img}
                  alt={PILLARS[active].title}
                  style={{ width: "100%", height: "380px", objectFit: "cover", filter: "brightness(0.55) saturate(1.1)" }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(10,10,10,0.7) 0%, transparent 60%)" }} />
                <div style={{ position: "absolute", top: "2rem", left: "2rem" }}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "5rem", fontWeight: 300, color: "rgba(201,168,106,0.25)", lineHeight: 1 }}>{PILLARS[active].year}</div>
                </div>
                <div style={{ position: "absolute", bottom: "1.5rem", right: "1.5rem", background: "rgba(10,10,10,0.7)", backdropFilter: "blur(8px)", padding: "0.5rem 1rem", border: "1px solid rgba(201,168,106,0.3)" }}>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.5rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9A86A" }}>{PILLARS[active].country}</span>
                </div>
              </div>

              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.5rem", fontWeight: 400, color: "#F5F1E8", margin: "0 0 1.5rem", lineHeight: 1.1 }}>
                {PILLARS[active].title}
              </h3>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", lineHeight: 1.85, color: "rgba(245,241,232,0.55)", maxWidth: "520px" }}>
                {PILLARS[active].desc}
              </p>
              <div style={{ marginTop: "2.5rem", display: "flex", alignItems: "center", gap: "1rem" }}>
                <button
                  type="button"
                  onClick={() => setActive(Math.max(0, active - 1))}
                  disabled={active === 0}
                  style={{ width: "44px", height: "44px", border: "1px solid rgba(245,241,232,0.15)", background: "transparent", color: active === 0 ? "rgba(245,241,232,0.2)" : "#F5F1E8", cursor: active === 0 ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "border-color 0.2s" }}
                >
                  ←
                </button>
                <div style={{ flex: 1, height: "1px", background: "rgba(245,241,232,0.08)" }}>
                  <div style={{ height: "1px", background: "#C9A86A", width: `${((active + 1) / PILLARS.length) * 100}%`, transition: "width 0.4s" }} />
                </div>
                <button
                  type="button"
                  onClick={() => setActive(Math.min(PILLARS.length - 1, active + 1))}
                  disabled={active === PILLARS.length - 1}
                  style={{ width: "44px", height: "44px", border: "1px solid rgba(245,241,232,0.15)", background: "transparent", color: active === PILLARS.length - 1 ? "rgba(245,241,232,0.2)" : "#F5F1E8", cursor: active === PILLARS.length - 1 ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "border-color 0.2s" }}
                >
                  →
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export { BrandStory as Timeline };
