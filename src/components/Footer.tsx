"use client";

import { Globe } from "lucide-react";

/* Brand icons were removed from lucide-react; these inline SVGs
   reproduce the original lucide instagram/twitter/youtube glyphs. */
type IconProps = { size?: number };

function Instagram({ size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function Twitter({ size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

function Youtube({ size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  );
}

export function Footer() {
  const LINKS = {
    Houses: ["Y'WANDELAG", "Mokhueleigbe"],
    Shop: ["The Collection", "Lookbook", "Cart"],
    Visit: ["New York", "Press", "Partners"],
    Legal: ["Privacy Policy", "Terms of Use", "Cookie Policy", "Accessibility"],
  };

  return (
    <footer style={{ background: "#050505", borderTop: "1px solid rgba(201,168,106,0.1)", padding: "clamp(3rem, 6vw, 6rem) clamp(1rem, 4vw, 4rem) clamp(1.5rem, 3vw, 3rem)" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Top: brand + links */}
        <div className="asa-footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", gap: "clamp(1.5rem, 3vw, 4rem)", paddingBottom: "3rem", borderBottom: "1px solid rgba(245,241,232,0.06)" }}>
          {/* Brand */}
          <div>
            <div style={{ marginBottom: "1.5rem" }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.75rem", fontWeight: 600, letterSpacing: "0.12em", color: "#F5F1E8", textTransform: "uppercase" }}>Balogun Market NYC</div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.5rem", letterSpacing: "0.2em", color: "#C9A86A", textTransform: "uppercase", marginTop: "2px" }}>African Fashion</div>
            </div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.78rem", lineHeight: 1.8, color: "rgba(245,241,232,0.35)", maxWidth: "280px", margin: "0 0 2rem" }}>
              A multi-brand luxury retailer championing African designers, with a cultural footprint that rivals Dover Street Market, Browns, and The Folklore.
            </p>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              {[Instagram, Twitter, Youtube, Globe].map((Icon, i) => (
                <a key={i} href="#" style={{ width: "36px", height: "36px", border: "1px solid rgba(245,241,232,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(245,241,232,0.35)", textDecoration: "none", transition: "all 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(201,168,106,0.4)"; e.currentTarget.style.color = "#C9A86A"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(245,241,232,0.1)"; e.currentTarget.style.color = "rgba(245,241,232,0.35)"; }}
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([heading, items]) => (
            <div key={heading}>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.5rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#C9A86A", marginBottom: "1.5rem" }}>{heading}</div>
              {items.map(item => (
                <div key={item} style={{ marginBottom: "0.65rem" }}>
                  <a href="#" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "rgba(245,241,232,0.35)", textDecoration: "none", transition: "color 0.2s", display: "block" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#F5F1E8")}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(245,241,232,0.35)")}
                  >
                    {item}
                  </a>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "2rem", flexWrap: "wrap", gap: "1rem" }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", letterSpacing: "0.1em", color: "rgba(245,241,232,0.2)" }}>
            © 2026 Balogun Market NYC. All rights reserved.
          </span>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", letterSpacing: "0.1em", color: "rgba(245,241,232,0.2)" }}>
            Rooted in Africa. Present everywhere.
          </span>
        </div>
      </div>
    </footer>
  );
}
