"use client";

export function Footer() {
  const columns = [
    {
      heading: "Houses",
      items: [
        { label: "Y'WANDELAG", href: "/houses/ywandelag" },
        { label: "Mokhueleigbe", href: "/houses/mokhueleigbe" },
      ],
    },
    {
      heading: "Shop",
      items: [
        { label: "The Collection", href: "/shop" },
        { label: "Ready-to-Wear", href: "/shop?category=ready-to-wear" },
        { label: "Occasionwear", href: "/shop?category=occasionwear" },
        { label: "Bridal", href: "/shop?occasion=bridal" },
        { label: "The Fitting", href: "/fitting" },
      ],
    },
    {
      heading: "Visit",
      items: [
        { label: "Journal", href: "/journal" },
        { label: "Contact", href: "/contact" },
        { label: "Policies", href: "/policies" },
      ],
    },
  ];

  return (
    <footer style={{ background: "#050505", borderTop: "1px solid rgba(201,168,106,0.1)", padding: "clamp(3rem, 6vw, 6rem) clamp(1rem, 4vw, 4rem) clamp(1.5rem, 3vw, 3rem)" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <div className="asa-footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "clamp(1.5rem, 3vw, 4rem)", paddingBottom: "3rem", borderBottom: "1px solid rgba(245,241,232,0.06)" }}>
          <div>
            <div style={{ marginBottom: "1.5rem" }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.75rem", fontWeight: 600, letterSpacing: "0.12em", color: "#F5F1E8", textTransform: "uppercase" }}>Balogun Market NYC</div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.5rem", letterSpacing: "0.2em", color: "#C9A86A", textTransform: "uppercase", marginTop: "2px" }}>African Fashion</div>
            </div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.78rem", lineHeight: 1.8, color: "rgba(245,241,232,0.35)", maxWidth: "280px", margin: 0 }}>
              A curated luxury marketplace bridging African creativity with global fashion culture — starting in New York City.
            </p>
            <a
              href="https://www.balogunmarketnyc.com"
              style={{
                display: "inline-block",
                marginTop: "1.1rem",
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.58rem",
                letterSpacing: "0.12em",
                color: "#C9A86A",
                textDecoration: "none",
              }}
            >
              www.balogunmarketnyc.com
            </a>
          </div>

          {columns.map((column) => (
            <div key={column.heading}>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.5rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#C9A86A", marginBottom: "1.5rem" }}>{column.heading}</div>
              {column.items.map((item) => (
                <div key={item.label} style={{ marginBottom: "0.65rem" }}>
                  <a
                    href={item.href}
                    style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "rgba(245,241,232,0.35)", textDecoration: "none", transition: "color 0.2s", display: "block" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#F5F1E8")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245,241,232,0.35)")}
                  >
                    {item.label}
                  </a>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "2rem", flexWrap: "wrap", gap: "1rem" }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", letterSpacing: "0.1em", color: "rgba(245,241,232,0.2)" }}>
            © 2026 Balogun Market NYC. All rights reserved.
          </span>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", letterSpacing: "0.1em", color: "rgba(245,241,232,0.2)" }}>
            Lagos. New York.
          </span>
        </div>
      </div>
    </footer>
  );
}
