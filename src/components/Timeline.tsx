"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "motion/react";

const MILESTONES = [
  { year: "1960", title: "Independence & Identity", desc: "Newly independent nations reclaim sartorial sovereignty. Kwame Nkrumah dons kente on the world stage. Fashion becomes political language.", country: "Ghana", color: "#C9A86A" },
  { year: "1972", title: "Afrocentrism Rises", desc: "Ozwald Boateng's predecessors spark London's African fashion moment. Wax prints enter the global conversation as haute couture.", country: "Nigeria / UK", color: "#8B5E3C" },
  { year: "1985", title: "Lagos Fashion Council Founded", desc: "Nigeria's fashion infrastructure begins its formalization. Labels like Ade Bakare bring Nigerian tailoring to international runways.", country: "Nigeria", color: "#0F5F4B" },
  { year: "1996", title: "Black Excellence Goes Global", desc: "Ozwald Boateng becomes the first Black designer on Savile Row. African patterns enter the lexicon of international luxury.", country: "Ghana / UK", color: "#C9A86A" },
  { year: "2008", title: "Arise Magazine & Platform Era", desc: "Africa's first luxury fashion magazine launches. Lagos, Nairobi, and Cape Town emerge as fashion capitals. The African Fashion Week circuit begins.", country: "Pan-African", color: "#8B5E3C" },
  { year: "2015", title: "Digital Revolution", desc: "African designers launch directly to global audiences via Instagram. Maxhosa Africa, Christie Brown, and Studio 189 gain international acclaim.", country: "Continent-wide", color: "#0F5F4B" },
  { year: "2019", title: "Beyoncé's Black Is King Moment", desc: "African design becomes global pop culture's visual language. Designers from 20+ African countries participate in the landmark visual album.", country: "Pan-African", color: "#C9A86A" },
  { year: "2026", title: "The Digital Museum Era", desc: "ÀṢÀ Collector launches — archiving Africa's fashion and art legacy with AI curation, virtual exhibitions, and global collector networks.", country: "The Future", color: "#C9A86A" },
];

export function Timeline() {
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="timeline" style={{ background: "#0D0D0D", padding: "clamp(4rem, 8vw, 10rem) clamp(1rem, 4vw, 4rem)", borderTop: "1px solid rgba(201,168,106,0.08)" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }} ref={ref}>
        {/* Header */}
        <motion.div
          style={{ marginBottom: "6rem" }}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
            <div style={{ width: "30px", height: "1px", background: "#C9A86A" }} />
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#C9A86A" }}>Living Archive</span>
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 5vw, 5rem)", fontWeight: 300, color: "#F5F1E8", margin: 0, lineHeight: 1.0 }}>
            Six Decades of<br /><em style={{ fontStyle: "italic", color: "#C9A86A" }}>African Fashion Evolution</em>
          </h2>
        </motion.div>

        {/* Timeline layout */}
        <div className="asa-timeline-grid" style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "4rem", alignItems: "start" }}>
          {/* Left: year list */}
          <div className="asa-timeline-sidebar" style={{ position: "sticky", top: "120px" }}>
            {MILESTONES.map((m, i) => (
              <motion.div
                key={m.year}
                onClick={() => setActive(i)}
                style={{ padding: "1.25rem 0", borderBottom: "1px solid rgba(245,241,232,0.06)", cursor: "pointer", display: "flex", alignItems: "center", gap: "1.5rem" }}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.06 }}
                data-cursor-hover
              >
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: active === i ? m.color : "rgba(245,241,232,0.15)", flexShrink: 0, transition: "background 0.3s, transform 0.3s", transform: active === i ? "scale(1.5)" : "scale(1)" }} />
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

          {/* Right: detail */}
          <div>
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div style={{ position: "relative", marginBottom: "3rem", overflow: "hidden" }}>
                <img
                  src={[
                    "https://images.unsplash.com/photo-1595882669314-919b3d51f2c7?w=900&h=500&fit=crop&auto=format",
                    "https://images.unsplash.com/photo-1625646741211-711bdd65c570?w=900&h=500&fit=crop&auto=format",
                    "https://images.unsplash.com/photo-1552710307-537199cd41c0?w=900&h=500&fit=crop&auto=format",
                    "https://images.unsplash.com/photo-1596015301017-471ad3599a30?w=900&h=500&fit=crop&auto=format",
                    "https://images.unsplash.com/photo-1709809081557-78f803ce93a0?w=900&h=500&fit=crop&auto=format",
                    "https://images.unsplash.com/photo-1713845784497-fe3d7ed176d8?w=900&h=500&fit=crop&auto=format",
                    "https://images.unsplash.com/photo-1708170236295-20ab8fbadcef?w=900&h=500&fit=crop&auto=format",
                    "https://images.unsplash.com/photo-1664662566408-ef40c502a66b?w=900&h=500&fit=crop&auto=format",
                  ][active]}
                  alt={MILESTONES[active].title}
                  style={{ width: "100%", height: "380px", objectFit: "cover", filter: "brightness(0.6) saturate(0.9)" }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(10,10,10,0.7) 0%, transparent 60%)" }} />
                <div style={{ position: "absolute", top: "2rem", left: "2rem" }}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "5rem", fontWeight: 300, color: "rgba(201,168,106,0.25)", lineHeight: 1 }}>{MILESTONES[active].year}</div>
                </div>
                <div style={{ position: "absolute", bottom: "1.5rem", right: "1.5rem", background: "rgba(10,10,10,0.7)", backdropFilter: "blur(8px)", padding: "0.5rem 1rem", border: `1px solid ${MILESTONES[active].color}30` }}>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.5rem", letterSpacing: "0.2em", textTransform: "uppercase", color: MILESTONES[active].color }}>{MILESTONES[active].country}</span>
                </div>
              </div>

              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.5rem", fontWeight: 400, color: "#F5F1E8", margin: "0 0 1.5rem", lineHeight: 1.1 }}>
                {MILESTONES[active].title}
              </h3>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", lineHeight: 1.85, color: "rgba(245,241,232,0.55)", maxWidth: "520px" }}>
                {MILESTONES[active].desc}
              </p>
              <div style={{ marginTop: "2.5rem", display: "flex", alignItems: "center", gap: "1rem" }}>
                <button
                  onClick={() => setActive(Math.max(0, active - 1))}
                  disabled={active === 0}
                  style={{ width: "44px", height: "44px", border: "1px solid rgba(245,241,232,0.15)", background: "transparent", color: active === 0 ? "rgba(245,241,232,0.2)" : "#F5F1E8", cursor: active === 0 ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "border-color 0.2s" }}
                >
                  ←
                </button>
                <div style={{ flex: 1, height: "1px", background: "rgba(245,241,232,0.08)" }}>
                  <div style={{ height: "1px", background: "#C9A86A", width: `${((active + 1) / MILESTONES.length) * 100}%`, transition: "width 0.4s" }} />
                </div>
                <button
                  onClick={() => setActive(Math.min(MILESTONES.length - 1, active + 1))}
                  disabled={active === MILESTONES.length - 1}
                  style={{ width: "44px", height: "44px", border: "1px solid rgba(245,241,232,0.15)", background: "transparent", color: active === MILESTONES.length - 1 ? "rgba(245,241,232,0.2)" : "#F5F1E8", cursor: active === MILESTONES.length - 1 ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "border-color 0.2s" }}
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
