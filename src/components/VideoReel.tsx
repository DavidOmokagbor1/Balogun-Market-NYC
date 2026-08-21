"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "motion/react";

const REELS = [
  {
    src: "/designers/ywande-featured.jpg",
    house: "Y'WANDELAG",
    title: "Lagos Fashion Week 2024",
    href: "/journal/ywande-lag-studio-lagos",
  },
  {
    src: "/designers/ywande-shop.jpg",
    house: "Y'WANDELAG",
    title: "Mallia — studio, Lagos",
    href: "/shop",
  },
  {
    src: "/designers/mokhueleigbe-portrait.jpg",
    house: "Mokhueleigbe",
    title: "Élan — the 2025 rebrand",
    href: "/journal/mokhueleigbe-oath-and-elan",
  },
  {
    src: "/designers/mokhueleigbe-featured.jpg",
    house: "Mokhueleigbe",
    title: "Oath & Bloom — bridal",
    href: "/shop",
  },
];

function ReelCard({
  reel,
  delay,
}: {
  reel: (typeof REELS)[0];
  delay: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link href={reel.href} style={{ flexShrink: 0, color: "inherit", textDecoration: "none" }}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        style={{ position: "relative", overflow: "hidden", background: "#111111", width: "clamp(220px, 75vw, 340px)" }}
        data-cursor-hover
      >
        <motion.img
          src={reel.src}
          alt={`${reel.house} — ${reel.title}`}
          style={{
            width: "100%",
            height: "480px",
            objectFit: "cover",
            display: "block",
          }}
          animate={{ scale: hovered ? 1.05 : 1, filter: hovered ? "brightness(0.72) saturate(1.1)" : "brightness(0.5) saturate(1.1)" }}
          transition={{ duration: 0.5 }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,10,0.95) 0%, transparent 55%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1.5rem" }}>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.5rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(201,168,106,0.6)", marginBottom: "0.35rem" }}>
            {reel.house}
          </div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontWeight: 400, color: "#F5F1E8", lineHeight: 1.2 }}>
            {reel.title}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export function VideoReel() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="videos"
      style={{ background: "#080808", padding: "10rem 0", borderTop: "1px solid rgba(201,168,106,0.08)", overflow: "hidden" }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 4rem" }} ref={ref}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "4rem", gap: "2rem", flexWrap: "wrap" }}>
          <div>
            <motion.div
              style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7 }}
            >
              <div style={{ width: "30px", height: "1px", background: "#C9A86A" }} />
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#C9A86A" }}>
                The Reel
              </span>
            </motion.div>
            <motion.h2
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 5vw, 5rem)", fontWeight: 300, color: "#F5F1E8", margin: 0, lineHeight: 1.0 }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.1 }}
            >
              Motion.<br /><em style={{ fontStyle: "italic", color: "#C9A86A" }}>The houses.</em>
            </motion.h2>
          </div>
          <motion.p
            style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.78rem", lineHeight: 1.8, color: "rgba(245,241,232,0.35)", maxWidth: "260px", textAlign: "right" }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Stills from Y&apos;WANDELAG and Mokhueleigbe. Runway film will replace this strip when we have house footage.
          </motion.p>
        </div>
      </div>

      <div
        style={{ display: "flex", gap: "1.5px", overflowX: "auto", paddingLeft: "clamp(1rem, 4vw, 4rem)", paddingBottom: "0.5rem", scrollbarWidth: "none" }}
      >
        {REELS.map((reel, i) => (
          <ReelCard key={reel.title} reel={reel} delay={i * 0.08} />
        ))}
        <div style={{ flexShrink: 0, width: "4rem" }} />
      </div>
    </section>
  );
}
