"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/components/shop/CartProvider";

const NAV_LINKS = [
  { label: "Designers", href: "/#designers" },
  { label: "Lookbook", href: "/#lookbook" },
  { label: "Shop", href: "/shop" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { cart, openCart } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 500,
          padding: "0 clamp(1rem, 4vw, 3rem)",
          height: "72px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "background 0.5s, backdrop-filter 0.5s, border-color 0.5s",
          background: scrolled ? "rgba(10,10,10,0.9)" : "transparent",
          backdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
          borderBottom: scrolled ? "1px solid rgba(201,168,106,0.12)" : "1px solid transparent",
        }}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
      >
        {/* Logo */}
        <a href="/" style={{ textDecoration: "none", flexShrink: 0 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.95rem", fontWeight: 600, letterSpacing: "0.18em", color: "#F5F1E8", textTransform: "uppercase", lineHeight: 1 }}>
              Balogun Market
            </span>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.45rem", letterSpacing: "0.2em", color: "#C9A86A", textTransform: "uppercase" }}>
              NYC · African Fashion
            </span>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="asa-desktop-nav" style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          {NAV_LINKS.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(245,241,232,0.55)", textDecoration: "none" }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.08, duration: 0.5 }}
              whileHover={{ color: "#C9A86A" }}
            >
              {link.label}
            </motion.a>
          ))}
          <motion.a
            href="/shop"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.58rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#0A0A0A", background: "#C9A86A", padding: "0.55rem 1.1rem", textDecoration: "none", whiteSpace: "nowrap" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            whileHover={{ background: "#F5F1E8" }}
          >
            Shop the Show
          </motion.a>
          <button
            type="button"
            onClick={openCart}
            aria-label={`Open shopping bag with ${cart?.totalQuantity ?? 0} items`}
            style={{
              position: "relative",
              width: 34,
              height: 34,
              padding: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid rgba(245,241,232,0.12)",
              background: "transparent",
              color: "#F5F1E8",
              cursor: "pointer",
            }}
          >
            <ShoppingBag size={14} />
            {(cart?.totalQuantity ?? 0) > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: -6,
                  right: -6,
                  minWidth: 16,
                  height: 16,
                  padding: "0 3px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#C9A86A",
                  color: "#0A0A0A",
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.48rem",
                }}
              >
                {cart?.totalQuantity}
              </span>
            )}
          </button>
        </nav>

        {/* Hamburger — mobile only */}
        <div
          className="asa-mobile-actions"
          style={{ display: "none", alignItems: "center", gap: "0.8rem" }}
        >
          <button
            type="button"
            onClick={openCart}
            aria-label={`Open shopping bag with ${cart?.totalQuantity ?? 0} items`}
            style={{
              position: "relative",
              border: "none",
              background: "none",
              color: "#F5F1E8",
              padding: "0.25rem",
              cursor: "pointer",
            }}
          >
            <ShoppingBag size={20} />
            {(cart?.totalQuantity ?? 0) > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: -5,
                  right: -7,
                  color: "#C9A86A",
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.5rem",
                }}
              >
                {cart?.totalQuantity}
              </span>
            )}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="asa-hamburger"
            aria-label="Open menu"
            style={{ background: "none", border: "none", cursor: "pointer", color: "#F5F1E8", padding: "0.25rem" }}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: "fixed", top: 0, right: 0, bottom: 0, width: "min(340px, 100vw)", background: "#0A0A0A", borderLeft: "1px solid rgba(201,168,106,0.15)", zIndex: 600, display: "flex", flexDirection: "column", justifyContent: "center", padding: "2rem", gap: "2rem" }}
          >
            <button onClick={() => setMenuOpen(false)} style={{ position: "absolute", top: "1.5rem", right: "1.5rem", background: "none", border: "none", cursor: "pointer", color: "#F5F1E8" }}>
              <X size={22} />
            </button>
            {NAV_LINKS.map((link) => (
              <a key={link.label} href={link.href} onClick={() => setMenuOpen(false)}
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 300, color: "#F5F1E8", textDecoration: "none", letterSpacing: "0.05em" }}>
                {link.label}
              </a>
            ))}
            <a href="/shop" onClick={() => setMenuOpen(false)}
              style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9A86A", textDecoration: "none", marginTop: "1rem" }}>
              Shop the Show →
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
