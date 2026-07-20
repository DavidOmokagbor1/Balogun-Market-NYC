"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "motion/react";
import { Sparkles, X, ArrowRight } from "lucide-react";
import type { DiscoverResponse } from "@/types/artifact";

/** Selling-point prompts — ideation + heritage, not dry keywords. */
const SUGGESTIONS = [
  "Afrofuturist couture with kente heritage and metallic architecture",
  "Lagos night luxury — adire indigo meeting liquid gold hardware",
  "Sahara minimalism: bogolan geometry as architectural eveningwear",
  "Benin bronze power translated into sculptural shoulder armor",
  "Horn of Africa liturgy — processional cross light in black silk",
  "Makonde spirit forms as kinetic runway silhouettes",
  "Kuba raffia tessellation for boardroom-to-gala luxury",
  "Gelede carnival intelligence for next-decade show spectacle",
];

const THINKING_LINES = [
  "Reading desire against continental craft…",
  "Tracing heritage lineage in the archive…",
  "Forecasting the next luxury signal…",
  "Composing silhouette, metal, and meaning…",
];

export function AIDiscovery() {
  const [query, setQuery] = useState("");
  const [thinking, setThinking] = useState(false);
  const [thinkLine, setThinkLine] = useState(0);
  const [result, setResult] = useState<DiscoverResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const handleDiscover = async (q?: string) => {
    const term = (q ?? query).trim();
    if (!term) return;
    setQuery(term);
    setThinking(true);
    setResult(null);
    setError(null);
    setThinkLine(0);

    const tick = window.setInterval(() => {
      setThinkLine((n) => (n + 1) % THINKING_LINES.length);
    }, 2200);

    try {
      const res = await fetch("/api/discover", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: term }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Discovery failed.");
      setResult(data as DiscoverResponse);
    } catch {
      setError("The Native AI Brain could not compose. Try again in a moment.");
    } finally {
      window.clearInterval(tick);
      setThinking(false);
    }
  };

  const clear = () => {
    setQuery("");
    setResult(null);
    setError(null);
  };

  const brief = result?.brief;

  return (
    <section
      id="discovery"
      style={{
        background: "#080808",
        padding: "clamp(4rem, 8vw, 10rem) clamp(1rem, 4vw, 4rem)",
        borderTop: "1px solid rgba(201,168,106,0.08)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Emerald ambient — sanctioned exception, AIDiscovery only */}
      <div
        style={{
          position: "absolute",
          bottom: "-20%",
          left: "-10%",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(15,95,75,0.1) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "-15%",
          right: "-8%",
          width: "420px",
          height: "420px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(201,168,106,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "920px", margin: "0 auto" }} ref={ref}>
        <motion.div
          style={{ textAlign: "center", marginBottom: "3.5rem" }}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.75rem",
              marginBottom: "1.25rem",
            }}
          >
            <Sparkles size={14} color="#C9A86A" />
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.55rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#C9A86A",
              }}
            >
              Native AI Brain
            </span>
          </div>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2.5rem, 5vw, 5rem)",
              fontWeight: 300,
              color: "#F5F1E8",
              margin: "0 0 1.25rem",
              lineHeight: 1.0,
            }}
          >
            Describe What
            <br />
            <em style={{ fontStyle: "italic", color: "#C9A86A" }}>Moves You.</em>
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.875rem",
              lineHeight: 1.8,
              color: "rgba(245,241,232,0.45)",
              maxWidth: "540px",
              margin: "0 auto",
            }}
          >
            Not keyword search — cultural intelligence. The brain invents African high-fashion
            and big-wave luxury concepts, forecasts the next signal, and grounds every idea in
            archive heritage.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <div style={{ position: "relative", marginBottom: "1.75rem" }}>
            <div
              style={{
                display: "flex",
                border: "1px solid rgba(201,168,106,0.28)",
                background: "rgba(245,241,232,0.02)",
              }}
            >
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleDiscover()}
                placeholder="e.g. — 'Afrofuturist couture with kente heritage and metallic architecture'"
                disabled={thinking}
                style={{
                  flex: 1,
                  padding: "1.25rem 1.5rem",
                  background: "transparent",
                  border: "none",
                  color: "#F5F1E8",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.85rem",
                  outline: "none",
                }}
              />
              {query && !thinking && (
                <button
                  onClick={clear}
                  style={{
                    background: "none",
                    border: "none",
                    padding: "0 1rem",
                    color: "rgba(245,241,232,0.3)",
                    cursor: "pointer",
                  }}
                >
                  <X size={16} />
                </button>
              )}
              <button
                onClick={() => handleDiscover()}
                disabled={thinking}
                style={{
                  padding: "1.25rem 2rem",
                  background: thinking ? "rgba(201,168,106,0.5)" : "#C9A86A",
                  border: "none",
                  color: "#0A0A0A",
                  cursor: thinking ? "wait" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.6rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  flexShrink: 0,
                }}
              >
                <Sparkles size={14} />
                {thinking ? "Thinking" : "Compose"}
              </button>
            </div>
          </div>

          {!result && !thinking && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => handleDiscover(s)}
                  style={{
                    padding: "0.5rem 1rem",
                    background: "transparent",
                    border: "1px solid rgba(245,241,232,0.08)",
                    color: "rgba(245,241,232,0.42)",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.55rem",
                    letterSpacing: "0.06em",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    textAlign: "left",
                    lineHeight: 1.45,
                    maxWidth: "100%",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(201,168,106,0.35)";
                    e.currentTarget.style.color = "#C9A86A";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(245,241,232,0.08)";
                    e.currentTarget.style.color = "rgba(245,241,232,0.42)";
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </motion.div>

        <AnimatePresence>
          {thinking && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ textAlign: "center", padding: "3.5rem 0 2rem" }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "6px",
                  marginBottom: "1.5rem",
                }}
              >
                {[0, 1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    style={{
                      width: "4px",
                      height: "4px",
                      borderRadius: "50%",
                      background: i % 2 === 0 ? "#C9A86A" : "#0F5F4B",
                    }}
                    animate={{ scaleY: [1, 2.5, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                  />
                ))}
              </div>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.7rem",
                  letterSpacing: "0.14em",
                  color: "rgba(245,241,232,0.4)",
                  textTransform: "uppercase",
                }}
              >
                {THINKING_LINES[thinkLine]}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {error && !thinking && (
          <p
            style={{
              textAlign: "center",
              padding: "2.5rem 0 0",
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.7rem",
              letterSpacing: "0.12em",
              color: "rgba(245,241,232,0.4)",
              textTransform: "uppercase",
            }}
          >
            {error}
          </p>
        )}

        <AnimatePresence>
          {brief && result && !thinking && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55 }}
              style={{ marginTop: "3rem" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "1.75rem",
                  gap: "1rem",
                  flexWrap: "wrap",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.55rem",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "rgba(15,95,75,0.95)",
                  }}
                >
                  Brain output ·{" "}
                  {result.meta.mode === "creative_grounded"
                    ? "Heritage-grounded"
                    : "Open invention"}
                </div>
                <button
                  onClick={clear}
                  style={{
                    background: "none",
                    border: "none",
                    color: "rgba(245,241,232,0.35)",
                    cursor: "pointer",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.55rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                  }}
                >
                  Clear ×
                </button>
              </div>

              {/* Concept */}
              <div
                style={{
                  borderTop: "1px solid rgba(201,168,106,0.2)",
                  paddingTop: "2rem",
                  marginBottom: "2.5rem",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.5rem",
                    letterSpacing: "0.28em",
                    textTransform: "uppercase",
                    color: "#C9A86A",
                    marginBottom: "0.85rem",
                  }}
                >
                  Concept
                </div>
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(1.85rem, 3.5vw, 2.75rem)",
                    fontWeight: 300,
                    color: "#F5F1E8",
                    margin: "0 0 1.25rem",
                    lineHeight: 1.15,
                  }}
                >
                  {brief.concept_title}
                </h3>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.9rem",
                    lineHeight: 1.85,
                    color: "rgba(245,241,232,0.62)",
                    margin: 0,
                    whiteSpace: "pre-line",
                  }}
                >
                  {brief.vision}
                </p>
                {brief.mood_words?.length > 0 && (
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "0.45rem",
                      marginTop: "1.5rem",
                    }}
                  >
                    {brief.mood_words.map((w) => (
                      <span
                        key={w}
                        style={{
                          fontFamily: "'DM Mono', 'Inter', monospace",
                          fontSize: "0.55rem",
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: "rgba(201,168,106,0.75)",
                          border: "1px solid rgba(201,168,106,0.2)",
                          padding: "0.35rem 0.7rem",
                        }}
                      >
                        {w}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Future + Runway */}
              <div
                className="asa-brain-split"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1.5rem",
                  marginBottom: "2.5rem",
                }}
              >
                <div
                  style={{
                    border: "1px solid rgba(15,95,75,0.35)",
                    background: "rgba(15,95,75,0.08)",
                    padding: "1.5rem 1.35rem",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.5rem",
                      letterSpacing: "0.28em",
                      textTransform: "uppercase",
                      color: "rgba(245,241,232,0.45)",
                      marginBottom: "0.75rem",
                    }}
                  >
                    Future signal
                  </div>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.8rem",
                      lineHeight: 1.75,
                      color: "rgba(245,241,232,0.7)",
                      margin: 0,
                    }}
                  >
                    {brief.future_signal}
                  </p>
                </div>
                <div
                  style={{
                    border: "1px solid rgba(201,168,106,0.22)",
                    padding: "1.5rem 1.35rem",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.5rem",
                      letterSpacing: "0.28em",
                      textTransform: "uppercase",
                      color: "#C9A86A",
                      marginBottom: "0.75rem",
                    }}
                  >
                    Runway moment
                  </div>
                  <p
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "1.25rem",
                      fontStyle: "italic",
                      lineHeight: 1.45,
                      color: "#F5F1E8",
                      margin: 0,
                    }}
                  >
                    {brief.runway_moment}
                  </p>
                </div>
              </div>

              {/* Design moves */}
              <div style={{ marginBottom: "2.75rem" }}>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.5rem",
                    letterSpacing: "0.28em",
                    textTransform: "uppercase",
                    color: "#C9A86A",
                    marginBottom: "1rem",
                  }}
                >
                  Design moves
                </div>
                <ol style={{ margin: 0, padding: 0, listStyle: "none" }}>
                  {brief.design_moves.map((move, i) => (
                    <li
                      key={i}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "2.5rem 1fr",
                        gap: "0.75rem",
                        padding: "0.85rem 0",
                        borderTop: "1px solid rgba(245,241,232,0.06)",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'DM Mono', monospace",
                          fontSize: "0.65rem",
                          color: "rgba(201,168,106,0.55)",
                        }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "0.85rem",
                          lineHeight: 1.6,
                          color: "rgba(245,241,232,0.72)",
                        }}
                      >
                        {move}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Heritage lineage */}
              <div
                style={{
                  marginBottom: "2.75rem",
                  paddingBottom: "2rem",
                  borderBottom: "1px solid rgba(201,168,106,0.12)",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.5rem",
                    letterSpacing: "0.28em",
                    textTransform: "uppercase",
                    color: "rgba(245,241,232,0.4)",
                    marginBottom: "0.85rem",
                  }}
                >
                  Heritage lineage
                </div>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.85rem",
                    lineHeight: 1.8,
                    color: "rgba(245,241,232,0.55)",
                    margin: 0,
                  }}
                >
                  {brief.heritage_lineage}
                </p>
              </div>

              {/* Archive anchors */}
              {result.heritage.length > 0 && (
                <>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      justifyContent: "space-between",
                      marginBottom: "1.25rem",
                      gap: "1rem",
                      flexWrap: "wrap",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.55rem",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "rgba(245,241,232,0.4)",
                      }}
                    >
                      {result.heritage.length} Archive anchors · Open to study
                    </div>
                  </div>
                  <div
                    className="asa-ai-results-grid"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gap: "1rem",
                    }}
                  >
                    {result.heritage.map((r, i) => (
                      <motion.div
                        key={r.id}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.07 }}
                      >
                        <Link
                          href={`/archive/${r.id}`}
                          style={{
                            position: "relative",
                            overflow: "hidden",
                            cursor: "pointer",
                            display: "block",
                            textDecoration: "none",
                            color: "inherit",
                          }}
                        >
                          {r.image_url ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={r.image_url}
                              alt={r.image_alt ?? r.title}
                              style={{
                                width: "100%",
                                height: "220px",
                                objectFit: "cover",
                                filter: "brightness(0.72)",
                                display: "block",
                              }}
                            />
                          ) : (
                            <div
                              style={{
                                width: "100%",
                                height: "220px",
                                background: "rgba(245,241,232,0.04)",
                              }}
                            />
                          )}
                          <div
                            style={{
                              position: "absolute",
                              top: "0.75rem",
                              right: "0.75rem",
                              background: "rgba(15,95,75,0.85)",
                              backdropFilter: "blur(8px)",
                              padding: "0.25rem 0.6rem",
                            }}
                          >
                            <span
                              style={{
                                fontFamily: "'Inter', sans-serif",
                                fontSize: "0.5rem",
                                letterSpacing: "0.1em",
                                color: "#F5F1E8",
                              }}
                            >
                              {Math.round(r.similarity * 100)}% lineage
                            </span>
                          </div>
                          <div style={{ padding: "0.85rem 0" }}>
                            <div
                              style={{
                                fontFamily: "'Cormorant Garamond', serif",
                                fontSize: "1.05rem",
                                color: "#F5F1E8",
                              }}
                            >
                              {r.title}
                            </div>
                            <div
                              style={{
                                fontFamily: "'Inter', sans-serif",
                                fontSize: "0.6rem",
                                color: "rgba(245,241,232,0.4)",
                                marginTop: "3px",
                              }}
                            >
                              {[r.origin, r.medium].filter(Boolean).join(" · ")}
                            </div>
                            <div
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "0.35rem",
                                marginTop: "0.55rem",
                                fontFamily: "'Inter', sans-serif",
                                fontSize: "0.5rem",
                                letterSpacing: "0.14em",
                                textTransform: "uppercase",
                                color: "#C9A86A",
                              }}
                            >
                              Study <ArrowRight size={10} />
                            </div>
                          </div>
                        </Link>
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
