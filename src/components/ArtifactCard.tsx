import Image from "next/image";
import type { ArtifactMatch } from "@/types/artifact";

export default function ArtifactCard({
  artifact,
}: {
  artifact: ArtifactMatch;
}) {
  const lineage = [artifact.origin, artifact.era].filter(Boolean).join(" · ");

  return (
    <article className="border border-(--color-indigo-line) bg-(--color-indigo)">
      {artifact.image_url && (
        <div className="relative aspect-4/5 w-full">
          <Image
            src={artifact.image_url}
            alt={artifact.image_alt ?? artifact.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      )}
      <div className="p-5">
        {/* Provenance line leads — the card's signature */}
        {lineage && <p className="catalog-label">{lineage}</p>}
        <h3 className="mt-2 font-(family-name:--font-display) text-xl">
          {artifact.title}
        </h3>
        {artifact.maker && (
          <p className="mt-1 text-sm text-(--color-ivory-dim)">
            {artifact.maker}
          </p>
        )}
        {artifact.provenance_story && (
          <p className="mt-4 line-clamp-3 text-sm font-light leading-relaxed text-(--color-ivory-dim)">
            {artifact.provenance_story}
          </p>
        )}
        <p className="mt-4 font-(family-name:--font-catalog) text-[0.625rem] text-(--color-ivory-dim)/70">
          match {(artifact.similarity * 100).toFixed(0)}%
        </p>
      </div>
    </article>
  );
}
