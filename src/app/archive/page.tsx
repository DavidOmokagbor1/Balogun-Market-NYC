"use client";

import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import ArtifactCard from "@/components/ArtifactCard";
import type { ArtifactMatch } from "@/types/artifact";

export default function ArchivePage() {
  const [results, setResults] = useState<ArtifactMatch[] | null>(null);
  const [lastQuery, setLastQuery] = useState("");

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <p className="catalog-label mb-4">The Collection</p>
      <h1 className="font-(family-name:--font-display) text-4xl md:text-5xl">
        Search by meaning, not keyword
      </h1>
      <p className="mt-4 max-w-xl font-light text-(--color-ivory-dim)">
        The archive understands technique, era, and intent. Describe what you
        are looking for the way you would say it aloud.
      </p>

      <div className="mt-10">
        <SearchBar
          onResults={(r, q) => {
            setResults(r);
            setLastQuery(q);
          }}
        />
      </div>

      {results !== null && (
        <section className="mt-14">
          <p className="catalog-label mb-6">
            {results.length > 0
              ? `${results.length} pieces answer “${lastQuery}”`
              : `Nothing in the collection answers “${lastQuery}” yet`}
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((a) => (
              <ArtifactCard key={a.id} artifact={a} />
            ))}
          </div>
          {results.length === 0 && (
            <p className="max-w-md font-light text-(--color-ivory-dim)">
              The archive is young. Try a broader phrase — or add the first
              piece that fits.
            </p>
          )}
        </section>
      )}
    </div>
  );
}
