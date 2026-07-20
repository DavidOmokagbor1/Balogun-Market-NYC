import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import type { Artifact } from "@/types/artifact";

export default async function ArtifactDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: artifact } = await supabase
    .from("artifacts")
    .select("*")
    .eq("id", id)
    .single<Artifact>();

  if (!artifact) notFound();

  const lineage = [artifact.origin, artifact.era]
    .filter(Boolean)
    .join(" · ");

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <Link href="/archive" className="catalog-label hover:text-(--color-ivory)">
        ← The Collection
      </Link>

      <div className="mt-8 grid gap-10 md:grid-cols-2">
        <div className="relative aspect-4/5 w-full border border-(--color-indigo-line) bg-(--color-indigo)">
          {artifact.image_url && (
            <Image
              src={artifact.image_url}
              alt={artifact.image_alt ?? artifact.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          )}
        </div>

        <div>
          {lineage && <p className="catalog-label">{lineage}</p>}
          <h1 className="mt-2 font-(family-name:--font-display) text-3xl md:text-4xl">
            {artifact.title}
          </h1>
          {artifact.maker && (
            <p className="mt-2 text-(--color-ivory-dim)">{artifact.maker}</p>
          )}

          <dl className="mt-6 space-y-2 border-t border-(--color-indigo-line) pt-6">
            {artifact.medium && (
              <div className="flex gap-4 text-sm">
                <dt className="catalog-label shrink-0">Medium</dt>
                <dd className="font-light text-(--color-ivory-dim)">
                  {artifact.medium}
                </dd>
              </div>
            )}
            <div className="flex gap-4 text-sm">
              <dt className="catalog-label shrink-0">Category</dt>
              <dd className="font-light text-(--color-ivory-dim)">
                {artifact.category}
              </dd>
            </div>
          </dl>

          {!artifact.provenance_verified && (
            <p className="catalog-label mt-6 text-(--color-ivory-dim)/70">
              Draft — pending archivist verification
            </p>
          )}
        </div>
      </div>

      <section className="mt-14 max-w-2xl border-t border-(--color-indigo-line) pt-10">
        <p className="catalog-label mb-4">Provenance</p>
        {artifact.provenance_story ? (
          <p className="whitespace-pre-line font-light leading-relaxed text-(--color-ivory)">
            {artifact.provenance_story}
          </p>
        ) : (
          <p className="font-light leading-relaxed text-(--color-ivory-dim)">
            This piece&rsquo;s provenance narrative has not been written yet.
          </p>
        )}
      </section>
    </div>
  );
}
