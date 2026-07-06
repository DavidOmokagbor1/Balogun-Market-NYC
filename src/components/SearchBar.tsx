"use client";

import { useState } from "react";
import type { ArtifactMatch } from "@/types/artifact";

interface SearchBarProps {
  onResults: (results: ArtifactMatch[], query: string) => void;
}

export default function SearchBar({ onResults }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function runSearch() {
    const q = query.trim();
    if (q.length < 2) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: q }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Search failed.");
      onResults(data.results, q);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Search failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <label htmlFor="collection-search" className="catalog-label">
        Ask the collection
      </label>
      <div className="mt-3 flex gap-3">
        <input
          id="collection-search"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && runSearch()}
          placeholder="indigo resist-dyed cloth from the 1970s…"
          className="w-full border border-(--color-indigo-line) bg-(--color-indigo) px-4 py-3 font-light text-(--color-ivory) placeholder:text-(--color-ivory-dim)/60 focus:border-(--color-brass) focus:outline-none"
        />
        <button
          onClick={runSearch}
          disabled={loading}
          className="shrink-0 border border-(--color-brass) px-6 font-(family-name:--font-catalog) text-xs uppercase tracking-[0.18em] text-(--color-brass) transition-colors hover:bg-(--color-brass) hover:text-(--color-vat) disabled:opacity-50"
        >
          {loading ? "Searching…" : "Search"}
        </button>
      </div>
      {error && (
        <p className="mt-3 text-sm text-(--color-ivory-dim)">{error}</p>
      )}
    </div>
  );
}
