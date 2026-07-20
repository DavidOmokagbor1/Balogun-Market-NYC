"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { ArrowUpRight } from "lucide-react";

const ARTICLES = [
  {
    id: 1,
    category: "Fashion",
    title: "The New Yoruba Avant-Garde: How Lagos Is Rewriting Luxury",
    excerpt: "Inside the studios of a generation of Nigerian designers dismantling the Western luxury blueprint and building something entirely their own.",
    author: "Dr. Funke Adeyemi",
    date: "June 2026",
    img: "https://images.unsplash.com/photo-1713845784497-fe3d7ed176d8?w=600&h=400&fit=crop&auto=format",
    readTime: "12 min",
    featured: true,
  },
  {
    id: 2,
    category: "Art",
    title: "Zeitz MOCAA at Ten: How Cape Town Became the Art World's Conscience",
    excerpt: "A decade since opening, the museum has transformed what African contemporary art means on the global stage.",
    author: "Marcus Sithole",
    date: "May 2026",
    img: "https://images.unsplash.com/photo-1771153847642-9204ec2ed92e?w=600&h=400&fit=crop&auto=format",
    readTime: "8 min",
    featured: false,
  },
  {
    id: 3,
    category: "Culture",
    title: "Kente Beyond the Cloth: Sacred Geometry in Digital Fashion",
    excerpt: "Ghanaian artisans and digital designers are collaborating to encode ancestral patterns into 3D-printed couture.",
    author: "Abena Owusu",
    date: "April 2026",
    img: "https://images.unsplash.com/photo-1578509566163-068acd11b8e7?w=600&h=400&fit=crop&auto=format",
    readTime: "10 min",
    featured: false,
  },
  {
    id: 4,
    category: "Interview",
    title: "Amara Diallo: 'I am not documenting Africa. I am conjuring it.'",
    excerpt: "An intimate conversation with the Dakar-born photographer on beauty, resistance, and what the camera cannot capture.",
    author: "Leila Ndiaye",
    date: "March 2026",
    img: "https://images.unsplash.com/photo-1539701938214-0d9736e1c16b?w=600&h=400&fit=crop&auto=format",
    readTime: "15 min",
    featured: false,
  },
];

const CATEGORIES = ["All", "Fashion", "Art", "Culture", "Interviews", "Exhibitions"];

export function Journal() {
  const [activeCategory, setActiveCategory] = useState("All");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const filtered = ARTICLES.filter(a => activeCategory === "All" || a.category === activeCategory);
  const featured = filtered.find(a => a.featured);
  const rest = filtered.filter(a => !a.featured);

  return (
    <section id="journal" style={{ background: "#0D0D0D", padding: "clamp(4rem, 8vw, 10rem) clamp(1rem, 4vw, 4rem)", borderTop: "1px solid rgba(201,168,106,0.08)" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }} ref={ref}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "4rem" }}>
          <div>
            <motion.div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }} initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.7 }}>
              <div style={{ width: "30px", height: "1px", background: "#C9A86A" }} />
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#C9A86A" }}>The Journal</span>
            </motion.div>
            <motion.h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 5vw, 5rem)", fontWeight: 300, color: "#F5F1E8", margin: 0, lineHeight: 1.0 }} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, delay: 0.1 }}>
              Culture. Fashion.<br /><em style={{ fontStyle: "italic", color: "#C9A86A" }}>In Deep Focus.</em>
            </motion.h2>
          </div>
          {/* Category filter */}
          <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", justifyContent: "flex-end" }}>
            {CATEGORIES.map(c => (
              <button key={c} onClick={() => setActiveCategory(c)} style={{ padding: "0.4rem 0.9rem", background: activeCategory === c ? "#C9A86A" : "transparent", color: activeCategory === c ? "#0A0A0A" : "rgba(245,241,232,0.35)", border: `1px solid ${activeCategory === c ? "#C9A86A" : "rgba(245,241,232,0.08)"}`, fontFamily: "'Inter', sans-serif", fontSize: "0.5rem", letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer", transition: "all 0.2s" }}>
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Featured + grid */}
        <div className="asa-journal-grid" style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "1.5rem" }}>
          {/* Featured article */}
          {featured && (
            <motion.article
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              style={{ position: "relative", overflow: "hidden", cursor: "pointer", gridRow: "span 2" }}
              data-cursor-hover
            >
              <FeaturedArticle article={featured} />
            </motion.article>
          )}

          {/* Secondary articles */}
          {rest.slice(0, 3).map((article, i) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1 + 0.2 }}
              style={{ cursor: "pointer" }}
              data-cursor-hover
            >
              <SecondaryArticle article={article} />
            </motion.article>
          ))}
        </div>

        {/* Newsletter strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="asa-newsletter-strip"
          style={{ marginTop: "5rem", display: "flex", alignItems: "center", gap: "2rem", flexWrap: "wrap", padding: "clamp(1.5rem, 4vw, 3rem)", border: "1px solid rgba(201,168,106,0.15)", background: "rgba(201,168,106,0.03)" }}
        >
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.75rem", fontWeight: 400, color: "#F5F1E8", marginBottom: "0.5rem" }}>The Monthly Edit</div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.78rem", color: "rgba(245,241,232,0.4)", lineHeight: 1.7, margin: 0 }}>Curated dispatches from Africa's fashion and art world. Collector previews, studio visits, and cultural dispatches — monthly.</p>
          </div>
          <div style={{ display: "flex", gap: "0", width: "100%", maxWidth: "380px" }}>
            <input type="email" placeholder="Your email" style={{ padding: "0.85rem 1.25rem", background: "#0A0A0A", border: "1px solid rgba(245,241,232,0.1)", borderRight: "none", color: "#F5F1E8", fontFamily: "'Inter', sans-serif", fontSize: "0.78rem", outline: "none", flex: 1, minWidth: 0 }} />
            <button style={{ padding: "0.85rem 1.5rem", background: "#C9A86A", color: "#0A0A0A", border: "none", fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer", whiteSpace: "nowrap" }}>
              Subscribe
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FeaturedArticle({ article }: { article: typeof ARTICLES[0] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div style={{ height: "100%" }} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div style={{ position: "relative", overflow: "hidden", height: "360px" }}>
        <motion.img src={article.img} alt={article.title} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.55)" }} animate={{ scale: hovered ? 1.04 : 1 }} transition={{ duration: 0.6 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(13,13,13,0.95) 0%, transparent 50%)" }} />
        <div style={{ position: "absolute", top: "1.5rem", left: "1.5rem" }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.5rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#C9A86A", background: "rgba(10,10,10,0.7)", backdropFilter: "blur(8px)", padding: "0.3rem 0.7rem", border: "1px solid rgba(201,168,106,0.2)" }}>{article.category}</span>
        </div>
      </div>
      <div style={{ padding: "2rem 0" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(245,241,232,0.3)" }}>{article.date} · {article.readTime} read</span>
          <ArrowUpRight size={14} color={hovered ? "#C9A86A" : "rgba(245,241,232,0.3)"} style={{ transition: "color 0.2s" }} />
        </div>
        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.75rem", fontWeight: 400, color: "#F5F1E8", margin: "0 0 1rem", lineHeight: 1.2 }}>{article.title}</h3>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.78rem", lineHeight: 1.75, color: "rgba(245,241,232,0.45)", margin: "0 0 1rem" }}>{article.excerpt}</p>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(245,241,232,0.3)" }}>{article.author}</span>
      </div>
    </div>
  );
}

function SecondaryArticle({ article }: { article: typeof ARTICLES[0] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: "1.5rem", padding: "1.5rem 0", borderBottom: "1px solid rgba(245,241,232,0.06)" }} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div style={{ overflow: "hidden", height: "90px" }}>
        <motion.img src={article.img} alt={article.title} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.65)" }} animate={{ scale: hovered ? 1.05 : 1 }} transition={{ duration: 0.5 }} />
      </div>
      <div>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.5rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9A86A", display: "block", marginBottom: "0.4rem" }}>{article.category}</span>
        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem", fontWeight: 400, color: "#F5F1E8", margin: "0 0 0.5rem", lineHeight: 1.3 }}>{article.title}</h3>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", letterSpacing: "0.1em", color: "rgba(245,241,232,0.3)" }}>{article.date} · {article.readTime}</span>
      </div>
    </div>
  );
}
