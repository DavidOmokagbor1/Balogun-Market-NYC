"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "motion/react";
import { X, ZoomIn } from "lucide-react";

type ArchiveWork = {
  id: string;
  title: string;
  maker: string | null;
  origin: string | null;
  era: string | null;
  medium: string | null;
  category: string;
  image_url: string | null;
  image_alt: string | null;
  provenance_story: string | null;
};

const HEIGHTS = ["420px", "280px", "380px", "300px", "340px", "400px", "350px", "320px", "360px"];

function countryOf(origin: string | null) {
  if (!origin) return "Other";
  const parts = origin.split(",").map((s) => s.trim());
  return parts[parts.length - 1] || parts[0] || "Other";
}

export function MasonryGallery() {
  const [works, setWorks] = useState<ArchiveWork[]>([]);
  const [loading, setLoading] = useState(true);
  const [countryFilter, setCountryFilter] = useState("All");
  const [mediaFilter, setMediaFilter] = useState("All");
  const [lightbox, setLightbox] = useState<ArchiveWork | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    let cancelled = false;
    fetch("/api/collection?limit=24")
      .then((r) => r.json())
      .then((d) => {
        if (!cancelled) setWorks(d.results ?? []);
      })
      .catch(() => {
        if (!cancelled) setWorks([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const countries = useMemo(() => {
    const set = new Set(works.map((w) => countryOf(w.origin)));
    return ["All", ...Array.from(set).sort()];
  }, [works]);

  const mediaTypes = useMemo(() => {
    const set = new Set(works.map((w) => w.category));
    return ["All", ...Array.from(set).sort()];
  }, [works]);

  const filtered = works.filter((w) => {
    const countryOk = countryFilter === "All" || countryOf(w.origin) === countryFilter;
    const mediaOk = mediaFilter === "All" || w.category === mediaFilter;
    return countryOk && mediaOk;
  });

  const columns: ArchiveWork[][] = [[], [], []];
  filtered.forEach((w, i) => columns[i % 3].push(w));

  return (
    <section id="gallery" style={{ background: "#0A0A0A", padding: "clamp(4rem, 8vw, 10rem) clamp(1rem, 4vw, 4rem)", borderTop: "1px solid rgba(201,168,106,0.08)" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }} ref={ref}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "4rem", flexWrap: "wrap", gap: "1.5rem" }}>
          <div>
            <motion.div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }} initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.7 }}>
              <div style={{ width: "30px", height: "1px", background: "#C9A86A" }} />
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#C9A86A" }}>The Collection</span>
            </motion.div>
            <motion.h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 5vw, 5rem)", fontWeight: 300, color: "#F5F1E8", margin: 0, lineHeight: 1.0 }} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, delay: 0.1 }}>
              Rare Works.<br /><em style={{ fontStyle: "italic", color: "#C9A86A" }}>Living Tradition.</em>
            </motion.h2>
          </div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,241,232,0.3)" }}>
            {loading ? "Loading…" : `${filtered.length} Works in archive`}
          </div>
        </div>

        <div style={{ marginBottom: "3rem", display: "flex", gap: "3rem", flexWrap: "wrap" }}>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {countries.map((f) => (
              <button key={f} onClick={() => setCountryFilter(f)} style={{ padding: "0.45rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", letterSpacing: "0.15em", textTransform: "uppercase", background: countryFilter === f ? "#C9A86A" : "transparent", color: countryFilter === f ? "#0A0A0A" : "rgba(245,241,232,0.45)", border: `1px solid ${countryFilter === f ? "#C9A86A" : "rgba(245,241,232,0.1)"}`, cursor: "pointer", transition: "all 0.2s" }}>
                {f}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {mediaTypes.map((f) => (
              <button key={f} onClick={() => setMediaFilter(f)} style={{ padding: "0.45rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", letterSpacing: "0.15em", textTransform: "uppercase", background: mediaFilter === f ? "rgba(201,168,106,0.2)" : "transparent", color: mediaFilter === f ? "#C9A86A" : "rgba(245,241,232,0.35)", border: `1px solid ${mediaFilter === f ? "rgba(201,168,106,0.45)" : "rgba(245,241,232,0.08)"}`, cursor: "pointer", transition: "all 0.2s" }}>
                {f}
              </button>
            ))}
          </div>
        </div>

        {!loading && filtered.length === 0 && (
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "rgba(245,241,232,0.35)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            No works match these filters yet.
          </p>
        )}

        <div className="asa-masonry-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", alignItems: "start" }}>
          {columns.map((col, ci) => (
            <div key={ci} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <AnimatePresence>
                {col.map((work, i) => (
                  <GalleryCard
                    key={work.id}
                    work={work}
                    height={HEIGHTS[(ci * 3 + i) % HEIGHTS.length]}
                    delay={i * 0.05}
                    onOpen={() => setLightbox(work)}
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
              {lightbox.image_url && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={lightbox.image_url} alt={lightbox.image_alt ?? lightbox.title} className="asa-lightbox-img" style={{ maxHeight: "80vh", maxWidth: "55%", objectFit: "contain" }} />
              )}
              <div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.5rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#C9A86A", marginBottom: "1rem" }}>
                  {[lightbox.category, lightbox.era].filter(Boolean).join(" · ")}
                </div>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.5rem", fontWeight: 400, color: "#F5F1E8", margin: "0 0 0.5rem", lineHeight: 1.1 }}>{lightbox.title}</h2>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", color: "rgba(245,241,232,0.5)", margin: "0 0 0.25rem" }}>{lightbox.maker}</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(245,241,232,0.3)", margin: "0 0 1.5rem" }}>{lightbox.origin}</p>
                {lightbox.provenance_story && (
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", lineHeight: 1.7, color: "rgba(245,241,232,0.55)", margin: "0 0 2rem", maxWidth: "360px" }}>
                    {lightbox.provenance_story.slice(0, 280)}
                    {lightbox.provenance_story.length > 280 ? "…" : ""}
                  </p>
                )}
                <Link
                  href={`/archive/${lightbox.id}`}
                  style={{ display: "inline-block", padding: "0.85rem 1.75rem", background: "#C9A86A", color: "#0A0A0A", fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none" }}
                >
                  View full provenance
                </Link>
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

function GalleryCard({
  work,
  height,
  delay,
  onOpen,
}: {
  work: ArchiveWork;
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
      {work.image_url ? (
        <motion.img
          src={work.image_url}
          alt={work.image_alt ?? work.title}
          style={{ width: "100%", height, objectFit: "cover", filter: "brightness(0.7) saturate(0.85)", display: "block" }}
          animate={{ scale: hovered ? 1.05 : 1 }}
          transition={{ duration: 0.6 }}
        />
      ) : (
        <div style={{ width: "100%", height, background: "rgba(245,241,232,0.04)" }} />
      )}
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
          {[work.category, countryOf(work.origin)].filter(Boolean).join(" · ")}
        </div>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontWeight: 400, color: "#F5F1E8" }}>{work.title}</div>
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", color: "rgba(245,241,232,0.4)", marginTop: "0.2rem" }}>
          {[work.maker, work.era].filter(Boolean).join(" · ")}
        </div>
      </div>
    </motion.div>
  );
}
