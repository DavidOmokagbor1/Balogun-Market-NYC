"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Check } from "lucide-react";

const TIERS = [
  {
    name: "Associate",
    price: "120",
    period: "/ year",
    color: "#8B5E3C",
    desc: "For the curious collector beginning their African art and fashion journey.",
    benefits: [
      "Digital archive access",
      "Monthly collector's newsletter",
      "Online exhibition invitations",
      "1 artist studio visit / year",
      "Community forum access",
    ],
  },
  {
    name: "Collector",
    price: "480",
    period: "/ year",
    color: "#C9A86A",
    featured: true,
    desc: "The full cultural experience, designed for serious collectors and patrons.",
    benefits: [
      "Everything in Associate",
      "Private exhibition previews",
      "Direct artist introductions",
      "Acquisition advisory services",
      "Physical catalogue mailings",
      "Annual collector's dinner",
      "Early access to new releases",
    ],
  },
  {
    name: "Patron",
    price: "2,400",
    period: "/ year",
    color: "#0F5F4B",
    desc: "For institutions and visionary collectors shaping the future of African culture.",
    benefits: [
      "Everything in Collector",
      "Dedicated cultural curator",
      "Commission facilitation",
      "Institutional partnerships",
      "Archive naming rights",
      "Board advisory seat",
    ],
  },
];

export function Membership() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="membership" style={{ background: "#0A0A0A", padding: "clamp(4rem, 8vw, 10rem) clamp(1rem, 4vw, 4rem)", borderTop: "1px solid rgba(201,168,106,0.08)", position: "relative", overflow: "hidden" }}>
      {/* Texture */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(201,168,106,0.03) 1px, transparent 1px)", backgroundSize: "48px 48px", pointerEvents: "none" }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto" }} ref={ref}>
        {/* Header */}
        <motion.div style={{ textAlign: "center", marginBottom: "6rem" }} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginBottom: "1.5rem" }}>
            <div style={{ width: "30px", height: "1px", background: "#C9A86A" }} />
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#C9A86A" }}>Collector Membership</span>
            <div style={{ width: "30px", height: "1px", background: "#C9A86A" }} />
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 5vw, 5rem)", fontWeight: 300, color: "#F5F1E8", margin: "0 0 1.5rem", lineHeight: 1.0 }}>
            Become Part of<br /><em style={{ fontStyle: "italic", color: "#C9A86A" }}>the Living Archive.</em>
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", lineHeight: 1.8, color: "rgba(245,241,232,0.45)", maxWidth: "440px", margin: "0 auto" }}>
            Join a community of collectors, curators, and cultural patrons committed to preserving and amplifying Africa's creative legacy.
          </p>
        </motion.div>

        {/* Tiers */}
        <div className="asa-membership-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5px" }}>
          {TIERS.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.12 }}
              style={{ padding: "3rem 2.5rem", background: tier.featured ? "#111111" : "#0C0C0C", border: tier.featured ? `1px solid rgba(201,168,106,0.25)` : "1px solid rgba(245,241,232,0.04)", position: "relative", display: "flex", flexDirection: "column" }}
            >
              {tier.featured && (
                <div style={{ position: "absolute", top: "-1px", left: "2.5rem", right: "2.5rem", height: "2px", background: "linear-gradient(to right, transparent, #C9A86A, transparent)" }} />
              )}
              {tier.featured && (
                <div style={{ position: "absolute", top: "1.5rem", right: "1.5rem", background: "rgba(201,168,106,0.1)", border: "1px solid rgba(201,168,106,0.2)", padding: "0.25rem 0.75rem" }}>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.45rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9A86A" }}>Most Popular</span>
                </div>
              )}
              <div style={{ marginBottom: "2rem" }}>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", letterSpacing: "0.25em", textTransform: "uppercase", color: tier.color, marginBottom: "0.75rem" }}>{tier.name}</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: "0.25rem", marginBottom: "1rem" }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.9rem", color: "rgba(245,241,232,0.5)" }}>$</span>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "3.5rem", fontWeight: 400, color: "#F5F1E8", lineHeight: 1 }}>{tier.price}</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", color: "rgba(245,241,232,0.35)" }}>{tier.period}</span>
                </div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", lineHeight: 1.7, color: "rgba(245,241,232,0.4)" }}>{tier.desc}</p>
              </div>

              <div style={{ flex: 1, marginBottom: "2.5rem" }}>
                {tier.benefits.map(b => (
                  <div key={b} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start", padding: "0.6rem 0", borderBottom: "1px solid rgba(245,241,232,0.04)" }}>
                    <Check size={12} color={tier.color} style={{ flexShrink: 0, marginTop: "2px" }} />
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.72rem", color: "rgba(245,241,232,0.55)", lineHeight: 1.5 }}>{b}</span>
                  </div>
                ))}
              </div>

              <button style={{ padding: "0.9rem 1.5rem", background: tier.featured ? "#C9A86A" : "transparent", color: tier.featured ? "#0A0A0A" : "#F5F1E8", border: tier.featured ? "none" : `1px solid ${tier.color}40`, fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer", transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.background = tier.color; e.currentTarget.style.color = "#0A0A0A"; }}
                onMouseLeave={e => { e.currentTarget.style.background = tier.featured ? "#C9A86A" : "transparent"; e.currentTarget.style.color = tier.featured ? "#0A0A0A" : "#F5F1E8"; }}
              >
                Join as {tier.name}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
