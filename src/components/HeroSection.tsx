"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { FOUNDING_HERO, houseHref, type CampaignSlide } from "@/lib/houses";

const STILL_MS = 8500;
const VIDEO_CAP_MS = 16000;
const FADE_MS = 1400;

export function HeroSection() {
  const { scrollY } = useScroll();
  const imgY = useTransform(scrollY, [0, 600], ["0%", "12%"]);
  const [index, setIndex] = useState(0);
  const [reduced, setReduced] = useState(false);
  const videoRefs = useRef<Record<number, HTMLVideoElement | null>>({});

  const slides = reduced
    ? FOUNDING_HERO.filter((slide) => slide.kind === "image").slice(0, 1)
    : FOUNDING_HERO;
  const active = slides[index] ?? slides[0];

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (index >= slides.length) setIndex(0);
  }, [index, slides.length]);

  useEffect(() => {
    const activeNode = videoRefs.current[index];
    if (activeNode && slides[index]?.kind === "video") {
      activeNode.currentTime = 0;
    }
  }, [index, slides]);

  useEffect(() => {
    Object.entries(videoRefs.current).forEach(([key, node]) => {
      if (!node) return;
      if (Number(key) === index && !reduced) {
        void node.play().catch(() => undefined);
      } else {
        node.pause();
      }
    });
  }, [index, reduced]);

  useEffect(() => {
    if (reduced || !active) return;

    let advanced = false;
    const next = () => {
      if (advanced) return;
      advanced = true;
      setIndex((current) => (current + 1) % slides.length);
    };

    if (active.kind === "image") {
      const timer = window.setTimeout(next, STILL_MS);
      return () => window.clearTimeout(timer);
    }

    const video = videoRefs.current[index];
    video?.addEventListener("ended", next);
    const cap = window.setTimeout(next, VIDEO_CAP_MS);
    return () => {
      video?.removeEventListener("ended", next);
      window.clearTimeout(cap);
    };
  }, [active, index, reduced, slides.length]);

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        height: "100svh",
        minHeight: "640px",
        overflow: "hidden",
        display: "flex",
        alignItems: "flex-end",
      }}
    >
      <motion.div style={{ position: "absolute", inset: "-8%", y: imgY }}>
        {slides.map((slide, i) => (
          <SlideMedia
            key={slide.src}
            slide={slide}
            active={i === index}
            setVideoRef={(node) => {
              videoRefs.current[i] = node;
            }}
          />
        ))}
      </motion.div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(10,10,10,0.82) 0%, rgba(10,10,10,0.15) 42%, rgba(10,10,10,0.08) 100%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 clamp(1.25rem, 5vw, 5rem) clamp(2.5rem, 5vw, 3.5rem)",
        }}
      >
        <motion.div
          style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div style={{ width: "30px", height: "1px", background: "#C9A86A" }} />
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.62rem",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "#C9A86A",
            }}
          >
            The Founding Houses
          </span>
        </motion.div>

        <motion.h1
          key={active.house}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(3rem, 7vw, 5.5rem)",
            fontWeight: 300,
            color: "#F5F1E8",
            lineHeight: 1.0,
            margin: "0 0 0.85rem",
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          {active.house}
        </motion.h1>

        <motion.p
          key={active.line}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.82rem",
            lineHeight: 1.7,
            color: "rgba(245,241,232,0.7)",
            maxWidth: "420px",
            margin: "0 0 1.5rem",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {active.line}
        </motion.p>

        <motion.a
          href={houseHref(active.houseSlug)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "0.85rem 1.6rem",
            background: "#C9A86A",
            color: "#0A0A0A",
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.62rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            textDecoration: "none",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#F5F1E8")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#C9A86A")}
        >
          Enter the House
        </motion.a>

        {!reduced && slides.length > 1 && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.45rem",
              marginTop: "2rem",
            }}
          >
            {slides.map((slide, i) => (
              <button
                key={slide.src}
                type="button"
                aria-label={`Look ${String(i + 1).padStart(2, "0")}`}
                onClick={() => setIndex(i)}
                style={{
                  width: i === index ? "28px" : "8px",
                  height: "2px",
                  padding: 0,
                  border: "none",
                  background: i === index ? "#C9A86A" : "rgba(245,241,232,0.22)",
                  cursor: "pointer",
                  transition: "width 0.4s ease, background 0.4s ease",
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function SlideMedia({
  slide,
  active,
  setVideoRef,
}: {
  slide: CampaignSlide;
  active: boolean;
  setVideoRef: (node: HTMLVideoElement | null) => void;
}) {
  const mediaStyle = {
    width: "100%",
    height: "115%",
    objectFit: "cover" as const,
    filter: "brightness(0.72) saturate(1.08)",
  };

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: active ? 1 : 0,
        transition: `opacity ${FADE_MS}ms ease`,
        pointerEvents: "none",
      }}
    >
      {slide.kind === "video" ? (
        <video
          ref={setVideoRef}
          src={slide.src}
          poster={slide.poster}
          muted
          playsInline
          preload={active ? "auto" : "metadata"}
          aria-label={slide.alt}
          style={mediaStyle}
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={slide.src} alt={slide.alt} style={mediaStyle} />
      )}
    </div>
  );
}
