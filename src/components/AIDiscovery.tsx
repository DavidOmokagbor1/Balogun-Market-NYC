"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { Search, Sparkles, X } from "lucide-react";
import type { ArtifactMatch } from "@/types/artifact";

const SUGGESTIONS = [
  "Afrofuturist fashion with traditional kente",
  "Lagos street photography 1990s",
  "Contemporary Senegalese sculpture",
  "Ethiopian wedding textiles",
  "Emerging South African painters",
  "Couture influenced by Yoruba traditions",
];

export function AIDiscovery() {
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState<ArtifactMatch[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const handleSearch = async (q?: string) => {
    const term = (q ?? query).trim();
    if (!term) return;
    setQuery(term);
    setSearching(true);
    setResults(null);
    setError(null);
    try {
      const res = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: term }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Search failed.");
      setResults(data.results as ArtifactMatch[]);
    } catch {
      setError("The archive could not be searched. Please try again.");
    } finally {
      setSearching(false);
    }
  };

  return (
    <section id="discovery" style={{ background: "#080808", padding: "clamp(4rem, 8vw, 10rem) clamp(1rem, 4vw, 4rem)", borderTop: "1px solid rgba(201,168,106,0.08)", position: "relative", overflow: "hidden" }}>
      {/* Emerald ambient — sanctioned exception, AIDiscovery only */}
      <div style={{ position: "absolute", bottom: "-20%", left: "-10%", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(15,95,75,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: "900px", margin: "0 auto" }} ref={ref}>
        {/* Header */}
        <motion.div style={{ textAlign: "center", marginBottom: "4rem" }} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
            <Sparkles size={14} color="#C9A86A" />
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#C9A86A" }}>AI-Powered Discovery</span>
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 5vw, 5rem)", fontWeight: 300, color: "#F5F1E8", margin: "0 0 1.25rem", lineHeight: 1.0 }}>
            Describe What<br /><em style={{ fontStyle: "italic", color: "#C9A86A" }}>Moves You.</em>
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", lineHeight: 1.8, color: "rgba(245,241,232,0.4)", maxWidth: "480px", margin: "0 auto" }}>
            Our cultural AI searches the archive by aesthetics, meaning, movement, and emotion — not just keywords.
          </p>
        </motion.div>

        {/* Search input */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }}>
          <div style={{ position: "relative", marginBottom: "2rem" }}>
            <div style={{ display: "flex", border: "1px solid rgba(201,168,106,0.25)", background: "rgba(245,241,232,0.02)" }}>
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSearch()}
                placeholder="e.g. — 'Afrofuturist couture with kente heritage and metallic architecture'"
                style={{ flex: 1, padding: "1.25rem 1.5rem", background: "transparent", border: "none", color: "#F5F1E8", fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", outline: "none" }}
              />
              {query && (
                <button onClick={() => { setQuery(""); setResults(null); setError(null); }} style={{ background: "none", border: "none", padding: "0 1rem", color: "rgba(245,241,232,0.3)", cursor: "pointer" }}>
                  <X size={16} />
                </button>
              )}
              <button onClick={() => handleSearch()} style={{ padding: "1.25rem 2rem", background: "#C9A86A", border: "none", color: "#0A0A0A", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", flexShrink: 0 }}>
                <Search size={14} />
                Discover
              </button>
            </div>
          </div>

          {/* Suggestions */}
          {!results && !searching && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {SUGGESTIONS.map(s => (
                <button key={s} onClick={() => handleSearch(s)} style={{ padding: "0.45rem 1rem", background: "transparent", border: "1px solid rgba(245,241,232,0.08)", color: "rgba(245,241,232,0.4)", fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", letterSpacing: "0.1em", cursor: "pointer", transition: "all 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(201,168,106,0.3)"; e.currentTarget.style.color = "#C9A86A"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(245,241,232,0.08)"; e.currentTarget.style.color = "rgba(245,241,232,0.4)"; }}
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Searching animation */}
        <AnimatePresence>
          {searching && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ textAlign: "center", padding: "4rem 0" }}>
              <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginBottom: "1.5rem" }}>
                {[0, 1, 2, 3].map(i => (
                  <motion.div key={i} style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#C9A86A" }} animate={{ scaleY: [1, 2.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }} />
                ))}
              </div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", letterSpacing: "0.15em", color: "rgba(245,241,232,0.35)", textTransform: "uppercase" }}>Searching the archive…</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error */}
        {error && !searching && (
          <p style={{ textAlign: "center", padding: "3rem 0 0", fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", letterSpacing: "0.15em", color: "rgba(245,241,232,0.35)", textTransform: "uppercase" }}>
            {error}
          </p>
        )}

        {/* Results */}
        <AnimatePresence>
          {results && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              {results.length === 0 ? (
                <p style={{ textAlign: "center", padding: "3rem 0 0", fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", letterSpacing: "0.15em", color: "rgba(245,241,232,0.35)", textTransform: "uppercase" }}>
                  No works matched — try different words.
                </p>
              ) : (
                <>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "2.5rem 0 1.5rem" }}>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,241,232,0.4)" }}>
                      {results.length} Works matched · Curated for your taste
                    </div>
                    <button onClick={() => setResults(null)} style={{ background: "none", border: "none", color: "rgba(245,241,232,0.35)", cursor: "pointer", fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                      Clear ×
                    </button>
                  </div>
                  <div className="asa-ai-results-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem" }}>
                    {results.map((r, i) => (
                      <motion.div key={r.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.08 }} style={{ position: "relative", overflow: "hidden", cursor: "pointer" }}>
                        {r.image_url ? (
                          // eslint-disable-next-line @next/next/no-img-element -- remote archive imagery, dimensions fixed by design
                          <img src={r.image_url} alt={r.image_alt ?? r.title} style={{ width: "100%", height: "240px", objectFit: "cover", filter: "brightness(0.7)", display: "block" }} />
                        ) : (
                          <div style={{ width: "100%", height: "240px", background: "rgba(245,241,232,0.04)" }} />
                        )}
                        <div style={{ position: "absolute", top: "0.75rem", right: "0.75rem", background: "rgba(15,95,75,0.85)", backdropFilter: "blur(8px)", padding: "0.25rem 0.6rem" }}>
                          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.5rem", letterSpacing: "0.1em", color: "#F5F1E8" }}>{Math.round(r.similarity * 100)}% match</span>
                        </div>
                        <div style={{ padding: "0.85rem 0" }}>
                          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", color: "#F5F1E8" }}>{r.title}</div>
                          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", color: "rgba(245,241,232,0.4)", marginTop: "2px" }}>
                            {[r.maker ?? "Unknown maker", r.era].filter(Boolean).join(" · ")}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
