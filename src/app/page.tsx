import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-6">
      {/* Hero: a dictionary entry, set like museum wall text */}
      <section className="py-28 md:py-40">
        <p className="catalog-label mb-6">Entry No. 001</p>
        <h1 className="font-(family-name:--font-display) text-6xl leading-none md:text-8xl">
          Àṣà
        </h1>
        <p className="mt-4 font-(family-name:--font-catalog) text-sm text-(--color-ivory-dim)">
          /à·ṣà/ · noun · Yoruba
        </p>
        <p className="mt-8 max-w-xl text-lg font-light leading-relaxed text-(--color-ivory-dim)">
          Custom; culture; that which is selected and practiced until it
          becomes tradition. An archive of African fashion, textiles, and
          art — where every piece carries its story of origin, making, and
          passage through hands.
        </p>
        <div className="mt-12 flex items-center gap-6">
          <Link
            href="/archive"
            className="border border-(--color-brass) px-6 py-3 font-(family-name:--font-catalog) text-xs uppercase tracking-[0.18em] text-(--color-brass) transition-colors hover:bg-(--color-brass) hover:text-(--color-vat)"
          >
            Enter the Collection
          </Link>
        </div>
      </section>

      {/* The thesis: provenance as the core interaction */}
      <section className="grid gap-12 border-t border-(--color-indigo-line) py-20 md:grid-cols-3">
        <div>
          <p className="catalog-label mb-4">Provenance First</p>
          <p className="font-light leading-relaxed text-(--color-ivory-dim)">
            Every artifact leads with its lineage — maker, origin, era,
            technique — narrated as a story, not a spec sheet. Gaps in the
            record are stated honestly.
          </p>
        </div>
        <div>
          <p className="catalog-label mb-4">Search by Meaning</p>
          <p className="font-light leading-relaxed text-(--color-ivory-dim)">
            Ask the collection questions in plain language — &ldquo;indigo
            resist-dyed cloth&rdquo; or &ldquo;garments woven for
            ceremony&rdquo; — and semantic search finds the pieces, not just
            the keywords.
          </p>
        </div>
        <div>
          <p className="catalog-label mb-4">Cataloged by Sight</p>
          <p className="font-light leading-relaxed text-(--color-ivory-dim)">
            Photograph a piece and the archive drafts its catalog entry —
            technique, era, medium — for the archivist to verify. The record
            grows at the speed of the collection.
          </p>
        </div>
      </section>
    </div>
  );
}
