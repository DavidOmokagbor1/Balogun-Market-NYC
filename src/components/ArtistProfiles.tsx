"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";

const ARTISTS = [
  {
    id: 1,
    name: "Amara Diallo",
    country: "Senegal",
    discipline: "Photography & Fashion",
    born: "1987, Dakar",
    signature: "Luminous portraiture that reclaims African femininity",
    exhibitions: ["Venice Biennale 2023", "LACMA 2024", "Lagos Art Week 2025"],
    works: 48,
    img: "https://images.unsplash.com/photo-1539701938214-0d9736e1c16b?w=600&h=800&fit=crop&auto=format",
    featured: "https://images.unsplash.com/photo-1595882669314-919b3d51f2c7?w=800&h=500&fit=crop&auto=format",
    quote: "Every photograph is an act of cultural preservation.",
    color: "#C9A86A",
  },
  {
    id: 2,
    name: "Kofi Mensah",
    country: "Ghana",
    discipline: "Textile & Sculpture",
    born: "1979, Kumasi",
    signature: "Sacred geometry woven into contemporary kente forms",
    exhibitions: ["Smithsonian 2022", "Zeitz MOCAA 2023", "British Museum 2024"],
    works: 127,
    img: "https://images.unsplash.com/photo-1571375814199-4072612351aa?w=600&h=800&fit=crop&auto=format",
    featured: "https://images.unsplash.com/photo-1578509566163-068acd11b8e7?w=800&h=500&fit=crop&auto=format",
    quote: "Kente speaks what words cannot. It is the language of our ancestors.",
    color: "#8B5E3C",
  },
  {
    id: 3,
    name: "Chidinma Obi",
    country: "Nigeria",
    discipline: "Fashion Design",
    born: "1993, Lagos",
    signature: "Afrofuturist couture fusing Igbo heritage with 3D sculpture",
    exhibitions: ["Lagos Fashion Week 2024", "Paris Fashion Week 2025", "Vogue Runway 2025"],
    works: 63,
    img: "https://images.unsplash.com/photo-1707914883484-03115dea98fb?w=600&h=800&fit=crop&auto=format",
    featured: "https://images.unsplash.com/photo-1713845784497-fe3d7ed176d8?w=800&h=500&fit=crop&auto=format",
    quote: "The future of fashion was always African. We're just making it visible.",
    color: "#0F5F4B",
  },
  {
    id: 4,
    name: "Yasmin El-Rashid",
    country: "Ethiopia",
    discipline: "Painting & Installation",
    born: "1990, Addis Ababa",
    signature: "Monumental oil paintings mapping diasporic memory",
    exhibitions: ["Documenta 2022", "Art Basel 2023 & 2024", "Saatchi Gallery 2025"],
    works: 89,
    img: "https://images.unsplash.com/photo-1708170236295-20ab8fbadcef?w=600&h=800&fit=crop&auto=format",
    featured: "https://images.unsplash.com/photo-1761641062457-bc8603350eb0?w=800&h=500&fit=crop&auto=format",
    quote: "I paint the spaces between memories — the silence that holds history.",
    color: "#C9A86A",
  },
];

export function ArtistProfiles() {
  const [active, setActive] = useState<typeof ARTISTS[0] | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="artists" style={{ background: "#0D0D0D", padding: "clamp(4rem, 8vw, 10rem) clamp(1rem, 4vw, 4rem)", borderTop: "1px solid rgba(201,168,106,0.08)" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }} ref={ref}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "5rem" }}>
          <div>
            <motion.div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }} initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.7 }}>
              <div style={{ width: "30px", height: "1px", background: "#C9A86A" }} />
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#C9A86A" }}>Featured Voices</span>
            </motion.div>
            <motion.h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 5vw, 5rem)", fontWeight: 300, color: "#F5F1E8", margin: 0, lineHeight: 1.0 }} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, delay: 0.1 }}>
              The Artists<br /><em style={{ fontStyle: "italic", color: "#C9A86A" }}>Defining Now.</em>
            </motion.h2>
          </div>
          <motion.p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", lineHeight: 1.8, color: "rgba(245,241,232,0.4)", maxWidth: "260px", textAlign: "right" }} initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.8, delay: 0.3 }}>
            340 artists across 54 nations. Each one a chapter in a story still being written.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="asa-artists-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.5px" }}>
          {ARTISTS.map((artist, i) => (
            <motion.div
              key={artist.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              onClick={() => setActive(artist)}
              style={{ position: "relative", overflow: "hidden", cursor: "pointer", height: "520px", background: "#111111" }}
              data-cursor-hover
            >
              <ArtistCard artist={artist} />
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
                ← Back to Artists
              </button>

              <div className="asa-artist-detail-grid" style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "3rem" }}>
                <div>
                  <img src={active.img} alt={active.name} style={{ width: "100%", height: "380px", objectFit: "cover", filter: "brightness(0.8)" }} />
                  <div style={{ marginTop: "1.5rem", borderTop: "1px solid rgba(201,168,106,0.15)", paddingTop: "1.5rem" }}>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: active.color, marginBottom: "0.5rem" }}>{active.discipline}</div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", color: "rgba(245,241,232,0.45)", marginBottom: "1rem" }}>Born {active.born}</div>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontStyle: "italic", color: "rgba(245,241,232,0.6)", lineHeight: 1.5 }}>"{active.quote}"</div>
                  </div>
                </div>
                <div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#C9A86A", marginBottom: "0.75rem" }}>{active.country}</div>
                  <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "3.5rem", fontWeight: 300, color: "#F5F1E8", margin: "0 0 1rem", lineHeight: 1.0 }}>{active.name}</h2>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", lineHeight: 1.8, color: "rgba(245,241,232,0.5)", margin: "0 0 2.5rem" }}>{active.signature}</p>

                  <img src={active.featured} alt="Featured work" style={{ width: "100%", height: "240px", objectFit: "cover", filter: "brightness(0.75)", marginBottom: "2rem" }} />

                  <div style={{ marginBottom: "2rem" }}>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(245,241,232,0.3)", marginBottom: "1rem" }}>Exhibition History</div>
                    {active.exhibitions.map(ex => (
                      <div key={ex} style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", color: "rgba(245,241,232,0.55)", padding: "0.6rem 0", borderBottom: "1px solid rgba(245,241,232,0.06)" }}>{ex}</div>
                    ))}
                  </div>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.25rem 0", borderTop: "1px solid rgba(201,168,106,0.15)" }}>
                    <div>
                      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", color: "#C9A86A" }}>{active.works}</div>
                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.5rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,241,232,0.3)" }}>Works in Archive</div>
                    </div>
                    <button style={{ padding: "0.85rem 2rem", background: "#C9A86A", color: "#0A0A0A", border: "none", fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer" }}>
                      View Full Portfolio
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

function ArtistCard({ artist }: { artist: typeof ARTISTS[0] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div style={{ height: "100%", width: "100%" }} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <motion.img
        src={artist.img}
        alt={artist.name}
        style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.5) saturate(0.8)", position: "absolute", inset: 0 }}
        animate={{ scale: hovered ? 1.06 : 1 }}
        transition={{ duration: 0.7 }}
      />
      <div style={{ position: "absolute", inset: 0, background: hovered ? "linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.2) 50%)" : "linear-gradient(to top, rgba(10,10,10,0.85) 0%, transparent 60%)", transition: "background 0.4s" }} />
      <div style={{ position: "absolute", top: "1.5rem", left: "1.5rem" }}>
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.5rem", letterSpacing: "0.25em", textTransform: "uppercase", color: artist.color, background: "rgba(10,10,10,0.6)", backdropFilter: "blur(8px)", padding: "0.3rem 0.7rem", border: `1px solid ${artist.color}30` }}>
          {artist.country}
        </div>
      </div>
      <div style={{ position: "absolute", bottom: "2rem", left: "1.5rem", right: "1.5rem" }}>
        <motion.div animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }} style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", lineHeight: 1.6, color: "rgba(245,241,232,0.5)", marginBottom: "0.75rem" }}>
          {artist.signature}
        </motion.div>
        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", fontWeight: 400, color: "#F5F1E8", margin: "0 0 0.25rem", lineHeight: 1.1 }}>{artist.name}</h3>
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(245,241,232,0.35)" }}>{artist.discipline}</div>
        <motion.div animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -10 }} style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "1rem" }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.5rem", letterSpacing: "0.2em", textTransform: "uppercase", color: artist.color }}>View Profile</span>
          <div style={{ width: "20px", height: "1px", background: artist.color }} />
        </motion.div>
      </div>
    </div>
  );
}
