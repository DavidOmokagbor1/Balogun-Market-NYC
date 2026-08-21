"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import {
  JOURNAL_ARTICLES,
  JOURNAL_CATEGORIES,
  type JournalArticle,
} from "@/lib/journal";

export function Journal() {
  const [activeCategory, setActiveCategory] = useState<(typeof JOURNAL_CATEGORIES)[number]>("All");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const filtered = JOURNAL_ARTICLES.filter(
    (article) => activeCategory === "All" || article.category === activeCategory
  );
  const featured = filtered.find((article) => article.featured) ?? filtered[0];
  const rest = filtered.filter((article) => article.slug !== featured?.slug);

  return (
    <section id="journal" style={{ background: "#0D0D0D", padding: "clamp(4rem, 8vw, 10rem) clamp(1rem, 4vw, 4rem)", borderTop: "1px solid rgba(201,168,106,0.08)" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }} ref={ref}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "4rem", gap: "2rem", flexWrap: "wrap" }}>
          <div>
            <motion.div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }} initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.7 }}>
              <div style={{ width: "30px", height: "1px", background: "#C9A86A" }} />
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#C9A86A" }}>The Journal</span>
            </motion.div>
            <motion.h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 5vw, 5rem)", fontWeight: 300, color: "#F5F1E8", margin: 0, lineHeight: 1.0 }} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, delay: 0.1 }}>
              Next from the roster.<br /><em style={{ fontStyle: "italic", color: "#C9A86A" }}>Season. Pop-up. Brief.</em>
            </motion.h2>
          </div>
          <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", justifyContent: "flex-end" }}>
            {JOURNAL_CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                style={{ padding: "0.4rem 0.9rem", background: activeCategory === category ? "#C9A86A" : "transparent", color: activeCategory === category ? "#0A0A0A" : "rgba(245,241,232,0.35)", border: `1px solid ${activeCategory === category ? "#C9A86A" : "rgba(245,241,232,0.08)"}`, fontFamily: "'Inter', sans-serif", fontSize: "0.5rem", letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer", transition: "all 0.2s" }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", color: "rgba(245,241,232,0.4)", margin: 0 }}>
            Nothing in this lane yet. Watch Season for the next collection date.
          </p>
        ) : (
          <div className="asa-journal-grid" style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "1.5rem" }}>
            {featured && (
              <motion.article
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
                style={{ position: "relative", overflow: "hidden", gridRow: "span 2" }}
                data-cursor-hover
              >
                <FeaturedArticle article={featured} />
              </motion.article>
            )}

            {rest.slice(0, 4).map((article, i) => (
              <motion.article
                key={article.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.1 + 0.2 }}
                data-cursor-hover
              >
                <SecondaryArticle article={article} />
              </motion.article>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="asa-newsletter-strip"
          style={{ marginTop: "5rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "2rem", flexWrap: "wrap", padding: "clamp(1.5rem, 4vw, 3rem)", border: "1px solid rgba(201,168,106,0.15)", background: "rgba(201,168,106,0.03)" }}
        >
          <div style={{ flex: 1, minWidth: "240px" }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.75rem", fontWeight: 400, color: "#F5F1E8", marginBottom: "0.5rem" }}>Press, partners, collaborators</div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.78rem", color: "rgba(245,241,232,0.4)", lineHeight: 1.7, margin: 0 }}>
              Balogun Market NYC invites you to join us in shaping the future of African luxury. This is the beginning of a new fashion chapter.
            </p>
          </div>
          <Link
            href="/contact"
            style={{ padding: "0.85rem 1.5rem", background: "#C9A86A", color: "#0A0A0A", fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", textDecoration: "none", whiteSpace: "nowrap" }}
          >
            Write to the house
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function FeaturedArticle({ article }: { article: JournalArticle }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={`/journal/${article.slug}`}
      style={{ height: "100%", display: "block", color: "inherit", textDecoration: "none" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ position: "relative", overflow: "hidden", height: "360px" }}>
        <motion.img src={article.img} alt={article.title} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.55) saturate(1.1)" }} animate={{ scale: hovered ? 1.04 : 1 }} transition={{ duration: 0.6 }} />
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
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.78rem", lineHeight: 1.75, color: "rgba(245,241,232,0.45)", margin: 0 }}>{article.excerpt}</p>
      </div>
    </Link>
  );
}

function SecondaryArticle({ article }: { article: JournalArticle }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={`/journal/${article.slug}`}
      style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: "1.5rem", padding: "1.5rem 0", borderBottom: "1px solid rgba(245,241,232,0.06)", color: "inherit", textDecoration: "none" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ overflow: "hidden", height: "90px" }}>
        <motion.img src={article.img} alt={article.title} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.65) saturate(1.1)" }} animate={{ scale: hovered ? 1.05 : 1 }} transition={{ duration: 0.5 }} />
      </div>
      <div>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.5rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9A86A", display: "block", marginBottom: "0.4rem" }}>{article.category}</span>
        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem", fontWeight: 400, color: "#F5F1E8", margin: "0 0 0.5rem", lineHeight: 1.3 }}>{article.title}</h3>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", letterSpacing: "0.1em", color: "rgba(245,241,232,0.3)" }}>{article.date} · {article.readTime}</span>
      </div>
    </Link>
  );
}
