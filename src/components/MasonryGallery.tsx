"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { X, ZoomIn, Heart } from "lucide-react";
import { usePexelsPhotos } from "@/hooks/usePexelsPhotos";

const FILTERS = ["All", "Nigeria", "Ghana", "Kenya", "Senegal", "Ethiopia", "South Africa"];
const MEDIA_FILTERS = ["All Media", "Fashion", "Photography", "Textile", "Sculpture", "Painting"];

const WORK_META = [
  { id: 1, title: "Golden Hour", artist: "Amara Diallo", country: "Senegal", medium: "Photography", year: "2024", col: 1, h: "420px", fallback: "https://images.unsplash.com/photo-1571375814199-4072612351aa?w=500&h=700&fit=crop&auto=format" },
  { id: 2, title: "Kente Dreams", artist: "Kofi Mensah", country: "Ghana", medium: "Textile", year: "2023", col: 2, h: "280px", fallback: "https://images.unsplash.com/photo-1578509566163-068acd11b8e7?w=500&h=360&fit=crop&auto=format" },
  { id: 3, title: "Lagos Noir", artist: "Chidinma Obi", country: "Nigeria", medium: "Fashion", year: "2025", col: 3, h: "380px", fallback: "https://images.unsplash.com/photo-1707914883484-03115dea98fb?w=500&h=620&fit=crop&auto=format" },
  { id: 4, title: "Saharan Light", artist: "Farida Toure", country: "Ethiopia", medium: "Photography", year: "2024", col: 1, h: "300px", fallback: "https://images.unsplash.com/photo-1760715752598-eac7633b472d?w=500&h=340&fit=crop&auto=format" },
  { id: 5, title: "Wax & Silk", artist: "Nadia Kamara", country: "Kenya", medium: "Textile", year: "2026", col: 2, h: "340px", fallback: "https://images.unsplash.com/photo-1552710307-537199cd41c0?w=500&h=460&fit=crop&auto=format" },
  { id: 6, title: "Emergence", artist: "Lola Adeyemi", country: "Nigeria", medium: "Fashion", year: "2025", col: 3, h: "420px", fallback: "https://images.unsplash.com/photo-1664662566408-ef40c502a66b?w=500&h=580&fit=crop&auto=format" },
  { id: 7, title: "Gallery Walk", artist: "Sipho Nkosi", country: "South Africa", medium: "Photography", year: "2023", col: 1, h: "350px", fallback: "https://images.unsplash.com/photo-1761641062457-bc8603350eb0?w=500&h=320&fit=crop&auto=format" },
  { id: 8, title: "Desert Queen", artist: "Yasmin El-Rashid", country: "Ethiopia", medium: "Fashion", year: "2026", col: 2, h: "400px", fallback: "https://images.unsplash.com/photo-1659522761084-79196b64abe4?w=500&h=680&fit=crop&auto=format" },
  { id: 9, title: "Nairobi Streets", artist: "Wanjiku Mwangi", country: "Kenya", medium: "Photography", year: "2024", col: 3, h: "340px", fallback: "https://images.unsplash.com/photo-1761403794164-65897bc570a6?w=500&h=380&fit=crop&auto=format" },
];

type Work = (typeof WORK_META)[number] & { img: string; photographer?: string };

export function MasonryGallery() {
  const [countryFilter, setCountryFilter] = useState("All");
  const [mediaFilter, setMediaFilter] = useState("All Media");
  const [saved, setSaved] = useState<number[]>([]);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  // Live Pexels photos — merged with static metadata
  const { photos, loading: photosLoading } = usePexelsPhotos("african fashion art culture portrait", 9);
  const WORKS = WORK_META.map((m, i) => ({
    ...m,
    img: photos[i]?.url || m.fallback,
    photographer: photos[i]?.photographer,
  }));

  const [lightbox, setLightbox] = useState<typeof WORKS[0] | null>(null);

  const filtered = WORKS.filter(w =>
    (countryFilter === "All" || w.country === countryFilter) &&
    (mediaFilter === "All Media" || w.medium === mediaFilter)
  );

  const col1 = filtered.filter(w => w.col === 1);
  const col2 = filtered.filter(w => w.col === 2);
  const col3 = filtered.filter(w => w.col === 3);

  return (
    <section id="gallery" style={{ background: "#0A0A0A", padding: "clamp(4rem, 8vw, 10rem) clamp(1rem, 4vw, 4rem)", borderTop: "1px solid rgba(201,168,106,0.08)" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }} ref={ref}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "4rem" }}>
          <div>
            <motion.div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }} initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.7 }}>
              <div style={{ width: "30px", height: "1px", background: "#C9A86A" }} />
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#C9A86A" }}>Collector's Gallery</span>
            </motion.div>
            <motion.h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 5vw, 5rem)", fontWeight: 300, color: "#F5F1E8", margin: 0, lineHeight: 1.0 }} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, delay: 0.1 }}>
              Rare Works.<br /><em style={{ fontStyle: "italic", color: "#C9A86A" }}>Living Tradition.</em>
            </motion.h2>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            {photosLoading && (
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.5rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9A86A", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.2, repeat: Infinity }}>●</motion.span>
                Loading live photos
              </span>
            )}
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,241,232,0.3)" }}>
              {filtered.length} Works
            </div>
          </div>
        </div>

        {/* Filters */}
        <div style={{ marginBottom: "3rem", display: "flex", gap: "3rem", flexWrap: "wrap" }}>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {FILTERS.map(f => (
              <button key={f} onClick={() => setCountryFilter(f)} style={{ padding: "0.45rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", letterSpacing: "0.15em", textTransform: "uppercase", background: countryFilter === f ? "#C9A86A" : "transparent", color: countryFilter === f ? "#0A0A0A" : "rgba(245,241,232,0.45)", border: `1px solid ${countryFilter === f ? "#C9A86A" : "rgba(245,241,232,0.1)"}`, cursor: "pointer", transition: "all 0.2s" }}>
                {f}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {MEDIA_FILTERS.map(f => (
              <button key={f} onClick={() => setMediaFilter(f)} style={{ padding: "0.45rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", letterSpacing: "0.15em", textTransform: "uppercase", background: mediaFilter === f ? "rgba(139,94,60,0.3)" : "transparent", color: mediaFilter === f ? "#8B5E3C" : "rgba(245,241,232,0.35)", border: `1px solid ${mediaFilter === f ? "#8B5E3C" : "rgba(245,241,232,0.08)"}`, cursor: "pointer", transition: "all 0.2s" }}>
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry grid */}
        <div className="asa-masonry-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", alignItems: "start" }}>
          {[col1, col2, col3].map((col, ci) => (
            <div key={ci} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <AnimatePresence>
                {col.map((work, i) => (
                  <GalleryCard key={work.id} work={work} delay={i * 0.05} onOpen={() => setLightbox(work)} saved={saved.includes(work.id)} onSave={() => setSaved(s => s.includes(work.id) ? s.filter(x => x !== work.id) : [...s, work.id])} />
                ))}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
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
              onClick={e => e.stopPropagation()}
              className="asa-lightbox-inner"
              style={{ display: "flex", gap: "3rem", maxWidth: "1000px", width: "100%", alignItems: "center" }}
            >
              <img src={lightbox.img.replace(/w=\d+&h=\d+/, "w=800&h=1000")} alt={lightbox.title} className="asa-lightbox-img" style={{ maxHeight: "80vh", maxWidth: "55%", objectFit: "contain" }} />
              <div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.5rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#C9A86A", marginBottom: "1rem" }}>{lightbox.medium} · {lightbox.year}</div>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.5rem", fontWeight: 400, color: "#F5F1E8", margin: "0 0 0.5rem", lineHeight: 1.1 }}>{lightbox.title}</h2>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", color: "rgba(245,241,232,0.5)", margin: "0 0 0.25rem" }}>{lightbox.artist}</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(245,241,232,0.3)", margin: "0 0 2.5rem" }}>{lightbox.country}</p>
                <div style={{ display: "flex", gap: "1rem" }}>
                  <button style={{ padding: "0.85rem 1.75rem", background: "#C9A86A", color: "#0A0A0A", border: "none", fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer" }}>Enquire to Acquire</button>
                  <button onClick={() => setSaved(s => s.includes(lightbox.id) ? s.filter(x => x !== lightbox.id) : [...s, lightbox.id])} style={{ width: "44px", height: "44px", border: "1px solid rgba(245,241,232,0.15)", background: "transparent", color: saved.includes(lightbox.id) ? "#C9A86A" : "#F5F1E8", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Heart size={16} fill={saved.includes(lightbox.id) ? "#C9A86A" : "none"} />
                  </button>
                </div>
              </div>
            </motion.div>
            <button onClick={() => setLightbox(null)} style={{ position: "absolute", top: "2rem", right: "2rem", background: "none", border: "none", cursor: "pointer", color: "#F5F1E8", opacity: 0.6 }}>
              <X size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function GalleryCard({ work, delay, onOpen, saved, onSave }: { work: Work; delay: number; onOpen: () => void; saved: boolean; onSave: () => void }) {
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
    >
      <motion.img
        src={work.img}
        alt={work.title}
        style={{ width: "100%", height: work.h, objectFit: "cover", filter: "brightness(0.7) saturate(0.85)", display: "block" }}
        animate={{ scale: hovered ? 1.05 : 1 }}
        transition={{ duration: 0.6 }}
      />
      {/* Overlay */}
      <motion.div
        style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,10,0.9) 0%, transparent 55%)" }}
        animate={{ opacity: hovered ? 1 : 0.6 }}
      />
      {/* Actions */}
      <motion.div
        style={{ position: "absolute", top: "1rem", right: "1rem", display: "flex", gap: "0.5rem" }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <button onClick={e => { e.stopPropagation(); onSave(); }} style={{ width: "32px", height: "32px", background: "rgba(10,10,10,0.7)", backdropFilter: "blur(8px)", border: "1px solid rgba(245,241,232,0.15)", color: saved ? "#C9A86A" : "#F5F1E8", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Heart size={13} fill={saved ? "#C9A86A" : "none"} />
        </button>
        <button onClick={e => { e.stopPropagation(); onOpen(); }} style={{ width: "32px", height: "32px", background: "rgba(10,10,10,0.7)", backdropFilter: "blur(8px)", border: "1px solid rgba(245,241,232,0.15)", color: "#F5F1E8", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <ZoomIn size={13} />
        </button>
      </motion.div>
      {/* Info */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1.25rem" }}>
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.5rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(201,168,106,0.6)", marginBottom: "0.35rem" }}>{work.medium} · {work.country}</div>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontWeight: 400, color: "#F5F1E8" }}>{work.title}</div>
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", color: "rgba(245,241,232,0.4)", marginTop: "0.2rem" }}>{work.artist}, {work.year}</div>
      </div>
    </motion.div>
  );
}
