"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Volume2, VolumeX, Play } from "lucide-react";
import { usePexelsVideos } from "@/hooks/usePexelsVideos";
import type { PexelsVideo } from "@/services/pexelsApi";

const VIDEO_QUERIES = [
  "african fashion model",
  "african culture traditional",
  "fashion runway show",
];

function VideoCard({ video, delay }: { video: PexelsVideo; delay: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
    if (videoRef.current) {
      videoRef.current.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setPlaying(false);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !muted;
      setMuted(!muted);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ position: "relative", overflow: "hidden", cursor: "pointer", background: "#111111", flexShrink: 0, width: "clamp(220px, 75vw, 340px)" }}
      data-cursor-hover
    >
      {/* Video element */}
      <video
        ref={videoRef}
        src={video.videoUrl}
        poster={video.thumbnail}
        muted={muted}
        loop
        playsInline
        preload="metadata"
        style={{
          width: "100%",
          height: "480px",
          objectFit: "cover",
          display: "block",
          filter: hovered ? "brightness(0.75)" : "brightness(0.5) saturate(0.7)",
          transition: "filter 0.5s",
        }}
      />

      {/* Gradient overlay */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,10,0.95) 0%, transparent 55%)", pointerEvents: "none" }} />

      {/* Play pulse — visible when not hovering */}
      {!playing && (
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: "56px", height: "56px", borderRadius: "50%", border: "1px solid rgba(201,168,106,0.5)", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(10,10,10,0.4)", backdropFilter: "blur(8px)" }}
          >
            <Play size={18} color="#C9A86A" fill="#C9A86A" />
          </motion.div>
        </div>
      )}

      {/* Mute toggle — visible on hover */}
      <motion.button
        animate={{ opacity: hovered ? 1 : 0 }}
        onClick={toggleMute}
        style={{ position: "absolute", top: "1rem", right: "1rem", width: "36px", height: "36px", borderRadius: "50%", border: "1px solid rgba(245,241,232,0.2)", background: "rgba(10,10,10,0.6)", backdropFilter: "blur(8px)", color: "#F5F1E8", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
      </motion.button>

      {/* Pexels badge */}
      <div style={{ position: "absolute", top: "1rem", left: "1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.45rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,241,232,0.4)", background: "rgba(10,10,10,0.5)", backdropFilter: "blur(6px)", padding: "0.25rem 0.6rem", border: "1px solid rgba(245,241,232,0.08)" }}>
        Pexels · Live
      </div>

      {/* Info */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1.5rem" }}>
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.5rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(201,168,106,0.6)", marginBottom: "0.35rem" }}>
          {video.photographer}
        </div>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontWeight: 400, color: "#F5F1E8", lineHeight: 1.2 }}>
          {video.width >= 1920 ? "4K · Ultra HD" : video.width >= 1280 ? "Full HD" : "HD"} · {Math.round(video.width / 16 * 9 / 100) * 100}p
        </div>
      </div>

      {/* Playing indicator */}
      {playing && (
        <div style={{ position: "absolute", bottom: "1.5rem", right: "1.5rem", display: "flex", gap: "2px", alignItems: "flex-end" }}>
          {[1, 2, 3, 4].map(i => (
            <motion.div
              key={i}
              style={{ width: "2px", background: "#C9A86A", borderRadius: "1px" }}
              animate={{ height: ["6px", `${8 + i * 4}px`, "6px"] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1, ease: "easeInOut" }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}

function SkeletonCard({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
      style={{ flexShrink: 0, width: "clamp(220px, 75vw, 340px)", height: "clamp(300px, 60vh, 480px)", background: "#111111", position: "relative", overflow: "hidden" }}
    >
      <motion.div
        style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, transparent 0%, rgba(201,168,106,0.05) 50%, transparent 100%)" }}
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      />
      <div style={{ position: "absolute", bottom: "1.5rem", left: "1.5rem", right: "1.5rem" }}>
        <div style={{ height: "8px", width: "60px", background: "rgba(245,241,232,0.05)", marginBottom: "0.5rem" }} />
        <div style={{ height: "14px", width: "140px", background: "rgba(245,241,232,0.05)" }} />
      </div>
    </motion.div>
  );
}

export function VideoReel() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const scrollRef = useRef<HTMLDivElement>(null);

  // Fetch from multiple queries for variety
  const { videos: v1, loading: l1 } = usePexelsVideos("african fashion model", 3);
  const { videos: v2, loading: l2 } = usePexelsVideos("african culture traditional dance", 3);
  const allVideos = [...v1, ...v2];
  const loading = l1 || l2;

  return (
    <section
      id="videos"
      style={{ background: "#080808", padding: "10rem 0", borderTop: "1px solid rgba(201,168,106,0.08)", overflow: "hidden" }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 4rem" }} ref={ref}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "4rem" }}>
          <div>
            <motion.div
              style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7 }}
            >
              <div style={{ width: "30px", height: "1px", background: "#C9A86A" }} />
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#C9A86A" }}>
                Live Video Archive
              </span>
              {!loading && allVideos.length > 0 && (
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.45rem", letterSpacing: "0.15em", color: "rgba(201,168,106,0.5)", background: "rgba(201,168,106,0.08)", padding: "0.2rem 0.5rem", border: "1px solid rgba(201,168,106,0.15)" }}>
                  Pexels API · {allVideos.length} Videos
                </span>
              )}
            </motion.div>
            <motion.h2
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 5vw, 5rem)", fontWeight: 300, color: "#F5F1E8", margin: 0, lineHeight: 1.0 }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.1 }}
            >
              Motion.<br /><em style={{ fontStyle: "italic", color: "#C9A86A" }}>Culture. Story.</em>
            </motion.h2>
          </div>
          <motion.p
            style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.78rem", lineHeight: 1.8, color: "rgba(245,241,232,0.35)", maxWidth: "260px", textAlign: "right" }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Hover to play. Cinematic footage sourced live from the Pexels creative archive.
          </motion.p>
        </div>
      </div>

      {/* Horizontal video strip */}
      <div
        ref={scrollRef}
        style={{ display: "flex", gap: "1.5px", overflowX: "auto", paddingLeft: "clamp(1rem, 4vw, 4rem)", paddingBottom: "0.5rem", scrollbarWidth: "none" }}
      >
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} delay={i * 0.08} />)
          : allVideos.map((video, i) => (
              <VideoCard key={video.id} video={video} delay={i * 0.08} />
            ))
        }
        {/* Trailing spacer */}
        <div style={{ flexShrink: 0, width: "4rem" }} />
      </div>

      {/* Instruction hint */}
      <div style={{ maxWidth: "1400px", margin: "2rem auto 0", padding: "0 4rem" }}>
        <motion.p
          style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,241,232,0.2)" }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          Hover a card to play · Click the speaker icon to unmute · Scroll to see more
        </motion.p>
      </div>
    </section>
  );
}
