"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import { HOUSES, houseHref, type House } from "@/lib/houses";

export function Designers() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="designers"
      style={{
        background: "#0D0D0D",
        padding: "clamp(3rem, 6vw, 6rem) clamp(1rem, 4vw, 4rem)",
        borderTop: "1px solid rgba(201,168,106,0.08)",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }} ref={ref}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: "2.5rem",
          }}
        >
          <div>
            <motion.div
              style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7 }}
            >
              <div style={{ width: "30px", height: "1px", background: "#C9A86A" }} />
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.55rem",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "#C9A86A",
                }}
              >
                The Roster
              </span>
            </motion.div>
            <motion.h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(1.85rem, 3.4vw, 3rem)",
                fontWeight: 300,
                color: "#F5F1E8",
                margin: 0,
                lineHeight: 1.05,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.1 }}
            >
              Two houses.
            </motion.h2>
          </div>
        </div>

        <div
          className="asa-designers-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.5px" }}
        >
          {HOUSES.map((house, i) => (
            <motion.a
              key={house.slug}
              href={houseHref(house.slug)}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              style={{
                position: "relative",
                overflow: "hidden",
                height: "520px",
                background: "#111111",
                textDecoration: "none",
                color: "inherit",
                display: "block",
              }}
              data-cursor-hover
            >
              <HouseCard house={house} />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

function HouseCard({ house }: { house: House }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{ height: "100%", width: "100%" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.img
        src={house.img}
        alt={house.name}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "brightness(0.62) saturate(1.05)",
          position: "absolute",
          inset: 0,
        }}
        animate={{ scale: hovered ? 1.06 : 1 }}
        transition={{ duration: 0.7 }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: hovered
            ? "linear-gradient(to top, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.15) 50%)"
            : "linear-gradient(to top, rgba(10,10,10,0.78) 0%, transparent 55%)",
          transition: "background 0.4s",
        }}
      />
      <div style={{ position: "absolute", top: "1.5rem", left: "1.5rem" }}>
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.5rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "#C9A86A",
          }}
        >
          {house.category}
        </div>
      </div>
      <div style={{ position: "absolute", bottom: "2rem", left: "1.5rem", right: "1.5rem" }}>
        <h3
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.85rem",
            fontWeight: 400,
            color: "#F5F1E8",
            margin: "0 0 0.25rem",
            lineHeight: 1.1,
          }}
        >
          {house.name}
        </h3>
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.55rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "rgba(245,241,232,0.4)",
          }}
        >
          {house.city}
        </div>
        <motion.div
          animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -10 }}
          style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "1rem" }}
        >
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.5rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#C9A86A",
            }}
          >
            Enter the House
          </span>
          <div style={{ width: "20px", height: "1px", background: "#C9A86A" }} />
        </motion.div>
      </div>
    </div>
  );
}
