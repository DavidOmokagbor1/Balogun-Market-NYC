"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { usePexelsPhotos } from "@/hooks/usePexelsPhotos";

// useScroll without target uses window scroll — avoids static-position container warning
const WORDS = ["Fashion", "Art", "Culture", "Heritage", "Identity"];
const FALLBACK_IMG = "https://images.unsplash.com/photo-1595882669314-919b3d51f2c7?w=1800&h=1200&fit=crop&auto=format";

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const imgY = useTransform(scrollY, [0, 800], ["0%", "30%"]);
  const textY = useTransform(scrollY, [0, 800], ["0%", "50%"]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);

  const [wordIndex, setWordIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [bgIndex, setBgIndex] = useState(0);
  const [stats, setStats] = useState<{
    works: number;
    origins: number;
    named_makers: number;
    categories: number;
  } | null>(null);

  // Live Pexels photos — cycle through them as hero background
  const { photos } = usePexelsPhotos("african fashion editorial model", 5);
  const heroSrc = photos.length > 0 ? photos[bgIndex % photos.length].url : FALLBACK_IMG;

  useEffect(() => {
    fetch("/api/stats")
      .then((r) => r.json())
      .then((d) => {
        if (typeof d.works === "number") setStats(d);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setWordIndex((i) => (i + 1) % WORDS.length);
        setVisible(true);
      }, 400);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  // Cycle hero background every 6 s once photos arrive
  useEffect(() => {
    if (photos.length < 2) return;
    const t = setInterval(() => setBgIndex((i) => i + 1), 6000);
    return () => clearInterval(t);
  }, [photos.length]);

  return (
    <section
      ref={ref}
      id="hero"
      style={{ position: "relative", height: "100vh", minHeight: "700px", overflow: "hidden", display: "flex", alignItems: "center" }}
    >
      {/* Parallax background — live Pexels photo, cycles every 6 s */}
      <motion.div style={{ position: "absolute", inset: "-15%", y: imgY }}>
        <motion.img
          key={heroSrc}
          src={heroSrc}
          alt="African fashion editorial"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          style={{ width: "100%", height: "115%", objectFit: "cover", filter: "brightness(0.35) saturate(1.1)" }}
        />
      </motion.div>

      {/* Gradient overlays */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0.4) 50%, rgba(15,95,75,0.15) 100%)" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "40%", background: "linear-gradient(to top, #0A0A0A, transparent)" }} />

      {/* Gold line accent */}
      <motion.div
        style={{ position: "absolute", left: "3rem", top: 0, bottom: 0, width: "1px", background: "linear-gradient(to bottom, transparent 0%, #C9A86A 30%, #C9A86A 70%, transparent 100%)", opacity: 0.3 }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.5, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Content */}
      <motion.div
        style={{ position: "relative", zIndex: 10, maxWidth: "1400px", margin: "0 auto", padding: "0 clamp(1.25rem, 5vw, 5rem)", y: textY, opacity }}
      >
        {/* Overline */}
        <motion.div
          style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2.5rem" }}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div style={{ width: "40px", height: "1px", background: "#C9A86A" }} />
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "#C9A86A" }}>
            The Digital Louvre of African Fashion & Art
          </span>
        </motion.div>

        {/* Main headline */}
        <div style={{ overflow: "hidden", marginBottom: "0.5rem" }}>
          <motion.h1
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(3.5rem, 8vw, 9rem)", fontWeight: 300, color: "#F5F1E8", lineHeight: 0.95, margin: 0, letterSpacing: "-0.02em" }}
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            Collecting
          </motion.h1>
        </div>
        <div style={{ overflow: "hidden", marginBottom: "0.5rem" }}>
          <motion.h1
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(3.5rem, 8vw, 9rem)", fontWeight: 300, color: "#F5F1E8", lineHeight: 0.95, margin: 0, letterSpacing: "-0.02em", display: "flex", alignItems: "baseline", gap: "0.3em", flexWrap: "wrap" }}
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            Africa's{" "}
            <em
              style={{
                fontStyle: "italic",
                color: "#C9A86A",
                display: "inline-block",
                transition: "opacity 0.35s, transform 0.35s",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(12px)",
              }}
            >
              {WORDS[wordIndex]}
            </em>
          </motion.h1>
        </div>
        <div style={{ overflow: "hidden", marginBottom: "3.5rem" }}>
          <motion.h1
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(3.5rem, 8vw, 9rem)", fontWeight: 300, color: "#F5F1E8", lineHeight: 0.95, margin: 0, letterSpacing: "-0.02em" }}
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.1, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
          >
            Future.
          </motion.h1>
        </div>

        {/* Sub + CTA row */}
        <motion.div
          style={{ display: "flex", alignItems: "flex-end", gap: "4rem", flexWrap: "wrap" }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.2 }}
        >
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", lineHeight: 1.8, color: "rgba(245,241,232,0.55)", maxWidth: "380px", margin: 0 }}>
            A living archive and discovery platform for Africa's most visionary designers, artists, and cultural makers — from 1960 to now.
          </p>
          <div style={{ display: "flex", gap: "1rem" }}>
            <a href="#collections" style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", padding: "1rem 2rem", background: "#C9A86A", color: "#0A0A0A", fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none", transition: "background 0.25s" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#F5F1E8")}
              onMouseLeave={e => (e.currentTarget.style.background = "#C9A86A")}
            >
              Explore Collection
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </a>
            <a href="#artists" style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", padding: "1rem 2rem", background: "transparent", color: "#F5F1E8", border: "1px solid rgba(245,241,232,0.2)", fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none", transition: "border-color 0.25s" }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(201,168,106,0.5)")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(245,241,232,0.2)")}
            >
              Meet the Artists
            </a>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom stats bar — live counts from the archive, never fictional */}
      <motion.div
        style={{ position: "absolute", bottom: 0, left: 0, right: 0, borderTop: "1px solid rgba(201,168,106,0.12)", padding: "1.25rem clamp(1.25rem, 5vw, 5rem)", display: "flex", gap: "clamp(1.5rem, 4vw, 4rem)", flexWrap: "wrap", zIndex: 10 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5 }}
      >
        {[
          { n: stats ? String(stats.works) : "—", l: "Works Archived" },
          { n: stats ? String(stats.named_makers) : "—", l: "Named Makers" },
          { n: stats ? String(stats.origins) : "—", l: "Places of Origin" },
          { n: stats ? String(stats.categories) : "—", l: "Categories" },
        ].map(({ n, l }) => (
          <div key={l}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", fontWeight: 400, color: "#C9A86A" }}>{n}</div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,241,232,0.35)", marginTop: "2px" }}>{l}</div>
          </div>
        ))}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        style={{ position: "absolute", right: "3rem", bottom: "2rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", zIndex: 10 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.5rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(245,241,232,0.35)", writingMode: "vertical-rl" }}>Scroll to explore</span>
        <motion.div
          style={{ width: "1px", height: "48px", background: "linear-gradient(to bottom, rgba(201,168,106,0.6), transparent)" }}
          animate={{ scaleY: [1, 0.3, 1], originY: 0 }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
