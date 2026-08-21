"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "motion/react";
import { Check } from "lucide-react";

const LANES = [
  {
    name: "The Collection",
    label: "Shop now",
    href: "/shop",
    featured: false,
    desc: "Pieces from Y'WANDELAG and Mokhueleigbe, as they are published.",
    benefits: [
      "Shop the Show",
      "Shopify-secured checkout",
      "Shipping calculated at payment",
    ],
  },
  {
    name: "Next Season",
    label: "Read the Journal",
    href: "/journal",
    featured: true,
    desc: "Dated collections, pop-ups, and brief notes — before they hit the shop.",
    benefits: [
      "Season calendar",
      "Pop-up announcements",
      "House spotlights",
      "African luxury briefs",
    ],
  },
  {
    name: "Private Client",
    label: "Write to the house",
    href: "/contact",
    featured: false,
    desc: "Press, partners, and collaborators shaping the next chapter.",
    benefits: [
      "Press and partnerships",
      "House introductions",
      "Pop-up collaboration",
    ],
  },
];

export function Membership() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="membership" style={{ background: "#0A0A0A", padding: "clamp(4rem, 8vw, 10rem) clamp(1rem, 4vw, 4rem)", borderTop: "1px solid rgba(201,168,106,0.08)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(201,168,106,0.03) 1px, transparent 1px)", backgroundSize: "48px 48px", pointerEvents: "none" }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto" }} ref={ref}>
        <motion.div style={{ textAlign: "center", marginBottom: "6rem" }} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginBottom: "1.5rem" }}>
            <div style={{ width: "30px", height: "1px", background: "#C9A86A" }} />
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#C9A86A" }}>How to enter</span>
            <div style={{ width: "30px", height: "1px", background: "#C9A86A" }} />
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 5vw, 5rem)", fontWeight: 300, color: "#F5F1E8", margin: "0 0 1.5rem", lineHeight: 1.0 }}>
            Shop. Watch.<br /><em style={{ fontStyle: "italic", color: "#C9A86A" }}>Write.</em>
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", lineHeight: 1.8, color: "rgba(245,241,232,0.45)", maxWidth: "440px", margin: "0 auto" }}>
            A cultural hub and a commercial engine — no membership fee, no collector programme, until we can deliver one.
          </p>
        </motion.div>

        <div className="asa-membership-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5px" }}>
          {LANES.map((lane, i) => (
            <motion.div
              key={lane.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.12 }}
              style={{ padding: "3rem 2.5rem", background: lane.featured ? "#111111" : "#0C0C0C", border: lane.featured ? "1px solid rgba(201,168,106,0.25)" : "1px solid rgba(245,241,232,0.04)", position: "relative", display: "flex", flexDirection: "column" }}
            >
              {lane.featured && (
                <div style={{ position: "absolute", top: "-1px", left: "2.5rem", right: "2.5rem", height: "2px", background: "linear-gradient(to right, transparent, #C9A86A, transparent)" }} />
              )}
              <div style={{ marginBottom: "2rem" }}>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#C9A86A", marginBottom: "0.75rem" }}>{lane.name}</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.15rem", fontWeight: 400, color: "#F5F1E8", margin: "0 0 1rem", lineHeight: 1.1 }}>{lane.label}</h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", lineHeight: 1.7, color: "rgba(245,241,232,0.4)" }}>{lane.desc}</p>
              </div>

              <div style={{ flex: 1, marginBottom: "2.5rem" }}>
                {lane.benefits.map((b) => (
                  <div key={b} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start", padding: "0.6rem 0", borderBottom: "1px solid rgba(245,241,232,0.04)" }}>
                    <Check size={12} color="#C9A86A" style={{ flexShrink: 0, marginTop: "2px" }} />
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.72rem", color: "rgba(245,241,232,0.55)", lineHeight: 1.5 }}>{b}</span>
                  </div>
                ))}
              </div>

              <Link
                href={lane.href}
                style={{ padding: "0.9rem 1.5rem", background: lane.featured ? "#C9A86A" : "transparent", color: lane.featured ? "#0A0A0A" : "#F5F1E8", border: lane.featured ? "none" : "1px solid rgba(201,168,106,0.4)", fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", textAlign: "center", textDecoration: "none" }}
              >
                {lane.label}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
