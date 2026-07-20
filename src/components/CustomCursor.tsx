"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const down = () => setClicked(true);
    const up = () => setClicked(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);

    const trackHover = () => {
      const els = document.querySelectorAll("a, button, [data-cursor-hover]");
      els.forEach((el) => {
        el.addEventListener("mouseenter", () => setHovered(true));
        el.addEventListener("mouseleave", () => setHovered(false));
      });
    };
    trackHover();
    const observer = new MutationObserver(trackHover);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      observer.disconnect();
    };
  }, []);

  // Smooth trail
  useEffect(() => {
    let raf: number;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    let tx = pos.x, ty = pos.y;
    const animate = () => {
      tx = lerp(tx, pos.x, 0.12);
      ty = lerp(ty, pos.y, 0.12);
      setTrail({ x: tx, y: ty });
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [pos]);

  return (
    <>
      {/* Inner dot */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x: pos.x - 4,
          y: pos.y - 4,
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "#C9A86A",
          zIndex: 9999,
          pointerEvents: "none",
          mixBlendMode: "normal",
        }}
        animate={{ scale: clicked ? 0.5 : 1 }}
        transition={{ duration: 0.1 }}
      />
      {/* Outer ring */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x: trail.x - (hovered ? 24 : 16),
          y: trail.y - (hovered ? 24 : 16),
          width: hovered ? 48 : 32,
          height: hovered ? 48 : 32,
          borderRadius: "50%",
          border: `1px solid ${hovered ? "rgba(201,168,106,0.6)" : "rgba(201,168,106,0.3)"}`,
          zIndex: 9998,
          pointerEvents: "none",
          transition: "width 0.2s, height 0.2s, border-color 0.2s",
        }}
        animate={{ scale: clicked ? 0.8 : 1 }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
}
