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

  const lineage = [artifact.origin, artifact.era].filter(Boolean).join(" · ");
  const sourceUrl =
    artifact.metadata &&
    typeof artifact.metadata === "object" &&
    "cma_url" in artifact.metadata
      ? String((artifact.metadata as { cma_url?: string }).cma_url ?? "")
      : "";

  return (
    <div style={{ background: "#0A0A0A", minHeight: "100vh" }}>
      <div className="mx-auto max-w-6xl px-6 pb-24 pt-28">
        <Link
          href="/#gallery"
          className="catalog-label transition-colors hover:text-(--color-foreground)"
        >
          ← The Collection
        </Link>

        <div className="mt-10 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div
              className="relative w-full overflow-hidden"
              style={{
                aspectRatio: "4 / 5",
                background: "#111111",
                border: "1px solid rgba(245,241,232,0.08)",
              }}
            >
              {artifact.image_url ? (
                <Image
                  src={artifact.image_url}
                  alt={artifact.image_alt ?? artifact.title}
                  fill
                  className="object-cover"
                  style={{ filter: "brightness(0.92) saturate(1.05)" }}
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  priority
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <p className="catalog-label">No image</p>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-5 lg:pt-4">
            {lineage && (
              <p className="catalog-label mb-4">{lineage}</p>
            )}
            <h1
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2.25rem, 4vw, 3.5rem)",
                fontWeight: 400,
                lineHeight: 1.05,
                color: "#F5F1E8",
                margin: 0,
              }}
            >
              {artifact.title}
            </h1>
            {artifact.maker && (
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.95rem",
                  color: "rgba(245,241,232,0.55)",
                  marginTop: "0.85rem",
                }}
              >
                {artifact.maker}
              </p>
            )}

            <dl
              className="mt-10 space-y-4 border-t pt-8"
              style={{ borderColor: "rgba(245,241,232,0.08)" }}
            >
              {(
                [
                  ["Origin", artifact.origin],
                  ["Era", artifact.era],
                  ["Medium", artifact.medium],
                  ["Category", artifact.category],
                ] as const
              ).map(([label, value]) =>
                value ? (
                  <div key={label} className="grid grid-cols-[7rem_1fr] gap-3 text-sm">
                    <dt className="catalog-label">{label}</dt>
                    <dd
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 300,
                        color: "rgba(245,241,232,0.65)",
                        margin: 0,
                      }}
                    >
                      {value}
                    </dd>
                  </div>
                ) : null
              )}
            </dl>

            {!artifact.provenance_verified && (
              <p
                className="catalog-label mt-8"
                style={{ color: "rgba(245,241,232,0.35)" }}
              >
                Draft — pending archivist verification
              </p>
            )}

            {sourceUrl && (
              <p
                style={{
                  marginTop: "1.5rem",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.65rem",
                  letterSpacing: "0.08em",
                  color: "rgba(245,241,232,0.3)",
                }}
              >
                Open-access source:{" "}
                <a
                  href={sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "#C9A86A", textDecoration: "none" }}
                >
                  Cleveland Museum of Art ↗
                </a>
              </p>
            )}
          </div>
        </div>

        <section
          className="mt-20 max-w-3xl border-t pt-12"
          style={{ borderColor: "rgba(245,241,232,0.08)" }}
        >
          <p className="catalog-label mb-6">Provenance</p>
          {artifact.provenance_story ? (
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 300,
                fontSize: "1.05rem",
                lineHeight: 1.85,
                color: "#F5F1E8",
                whiteSpace: "pre-line",
              }}
            >
              {artifact.provenance_story}
            </div>
          ) : (
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 300,
                color: "rgba(245,241,232,0.45)",
              }}
            >
              This piece&rsquo;s provenance narrative has not been written yet.
            </p>
          )}

          {artifact.acquisition_note && (
            <div className="mt-12">
              <p className="catalog-label mb-3">Acquisition</p>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 300,
                  fontSize: "0.9rem",
                  lineHeight: 1.7,
                  color: "rgba(245,241,232,0.5)",
                }}
              >
                {artifact.acquisition_note}
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
