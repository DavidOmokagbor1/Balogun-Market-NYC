"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/components/shop/CartProvider";
import { MobileShopDirectory, ShopPanel } from "@/components/shop/ShopMenu";

const PRIMARY_LINKS = [
  { label: "Houses", href: "/#designers" },
  { label: "Journal", href: "/journal" },
];

const MOBILE_LINKS = [
  { label: "Houses", href: "/#designers" },
  { label: "Journal", href: "/journal" },
  { label: "The Fitting", href: "/fitting" },
];

const NAV_LINK: CSSProperties = {
  fontFamily: "'Inter', sans-serif",
  fontSize: "0.62rem",
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  background: "none",
  border: "none",
  padding: "0 0 2px",
  textDecoration: "none",
};

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [panel, setPanel] = useState<"shop" | null>(null);
  const closeTimer = useRef<number | null>(null);
  const { cart, openCart } = useCart();

  const openPanel = (next: "shop" | null) => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setPanel(next);
  };

  const scheduleClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setPanel(null), 140);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!panel) return;
    const onScroll = () => setPanel(null);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPanel(null);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
    };
  }, [panel]);

  return (
    <>
      <div style={{ position: "relative", zIndex: 500 }}>
        <motion.header
          onMouseEnter={() => {
            if (panel) openPanel(panel);
          }}
          onMouseLeave={scheduleClose}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 500,
            padding: "0 clamp(1rem, 4vw, 3rem)",
            height: "88px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            transition: "background 0.5s, backdrop-filter 0.5s, border-color 0.5s",
            background: scrolled || panel ? "rgba(10,10,10,0.97)" : "rgba(10,10,10,0.62)",
            backdropFilter: "blur(20px) saturate(180%)",
            borderBottom:
              scrolled || panel
                ? "1px solid rgba(201,168,106,0.18)"
                : "1px solid rgba(201,168,106,0.1)",
          }}
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        >
          <a href="/" style={{ textDecoration: "none", flexShrink: 0 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.45rem", fontWeight: 600, letterSpacing: "0.14em", color: "#F5F1E8", textTransform: "uppercase", lineHeight: 1 }}>
                Balogun Market
              </span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.62rem", letterSpacing: "0.28em", color: "#C9A86A", textTransform: "uppercase" }}>
                NYC
              </span>
            </div>
          </a>

          <nav className="asa-desktop-nav" style={{ display: "flex", gap: "2.25rem", alignItems: "center", height: "100%" }}>
            <a
              href="/shop"
              aria-expanded={panel === "shop"}
              aria-haspopup="true"
              onMouseEnter={() => openPanel("shop")}
              onFocus={() => openPanel("shop")}
              style={{
                ...NAV_LINK,
                color: panel === "shop" ? "#C9A86A" : "rgba(245,241,232,0.55)",
                borderBottom: panel === "shop" ? "1px solid #C9A86A" : "1px solid transparent",
              }}
            >
              Shop
            </a>
            {PRIMARY_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={{
                  ...NAV_LINK,
                  color: "rgba(245,241,232,0.55)",
                }}
                onMouseEnter={(event) => {
                  event.currentTarget.style.color = "#C9A86A";
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.color = "rgba(245,241,232,0.55)";
                }}
              >
                {link.label}
              </a>
            ))}
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
              style={{ background: "none", border: "none", color: "#F5F1E8", padding: "0.25rem" }}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </motion.header>

        <AnimatePresence>
          {panel && (
            <motion.div
              key="nav-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              style={{
                position: "fixed",
                inset: 0,
                top: "88px",
                zIndex: 498,
              }}
            >
              <div
                onClick={() => setPanel(null)}
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(10,10,10,0.55)",
                }}
              />
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={() => openPanel(panel)}
                onMouseLeave={scheduleClose}
                style={{
                  position: "relative",
                  background: "#0A0A0A",
                  borderBottom: "1px solid rgba(201,168,106,0.18)",
                }}
              >
                {panel === "shop" && <ShopPanel onNavigate={() => setPanel(null)} />}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: "fixed", inset: 0, background: "#0A0A0A", zIndex: 600, overflowY: "auto", padding: "1.25rem 1.4rem 3rem" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "1.75rem",
                paddingBottom: "1rem",
                borderBottom: "1px solid rgba(201,168,106,0.15)",
              }}
            >
              <a
                href="/"
                onClick={() => setMenuOpen(false)}
                style={{ textDecoration: "none" }}
              >
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.15rem",
                    fontWeight: 600,
                    letterSpacing: "0.14em",
                    color: "#F5F1E8",
                    textTransform: "uppercase",
                  }}
                >
                  Balogun Market
                </span>
              </a>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                style={{ background: "none", border: "none", color: "#F5F1E8", padding: "0.25rem" }}
              >
                <X size={22} />
              </button>
            </div>
            <MobileShopDirectory onNavigate={() => setMenuOpen(false)} />
            <div style={{ marginTop: "1.25rem", paddingTop: "0.35rem", borderTop: "1px solid rgba(201,168,106,0.15)" }}>
              {MOBILE_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: "block",
                    padding: "1rem 0 0.85rem",
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.85rem",
                    fontWeight: 300,
                    color: "#F5F1E8",
                    textDecoration: "none",
                    letterSpacing: "0.04em",
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
