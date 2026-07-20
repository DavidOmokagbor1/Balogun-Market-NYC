import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { embed } from "@/lib/embeddings";
import type { ArtifactMatch } from "@/types/artifact";

/**
 * POST /api/search
 * Body: { query: string }
 *
 * Hybrid search:
 *   1) semantic pgvector match (threshold filters weak near-misses)
 *   2) keyword ILIKE on catalog fields (so "ankara" hits an Ankara title
 *      even when the embedding score is borderline)
 */
export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json();

    if (!query || typeof query !== "string" || query.trim().length < 2) {
      return NextResponse.json(
        { error: "Provide a search query of at least 2 characters." },
        { status: 400 }
      );
    }

    const q = query.trim();
    const safe = q.replace(/[%_,]/g, " ").trim();
    const queryEmbedding = await embed(q);

    const [{ data: semantic, error: semErr }, { data: keyword, error: keyErr }] =
      await Promise.all([
        supabase.rpc("match_artifacts", {
          query_embedding: queryEmbedding,
          match_threshold: 0.35,
          match_count: 12,
        }),
        safe.length >= 2
          ? supabase
              .from("artifacts")
              .select(
                "id, title, maker, origin, era, medium, category, provenance_story, image_url, image_alt"
              )
              .or(
                [
                  `title.ilike.%${safe}%`,
                  `maker.ilike.%${safe}%`,
                  `origin.ilike.%${safe}%`,
                  `medium.ilike.%${safe}%`,
                  `provenance_story.ilike.%${safe}%`,
                ].join(",")
              )
              .limit(12)
          : Promise.resolve({ data: [], error: null }),
      ]);

    if (semErr) {
      console.error("match_artifacts RPC failed:", semErr);
      return NextResponse.json({ error: "Search failed." }, { status: 500 });
    }
    if (keyErr) {
      console.error("keyword search failed:", keyErr);
      return NextResponse.json({ error: "Search failed." }, { status: 500 });
    }

    const byId = new Map<string, ArtifactMatch>();

    for (const row of (semantic as ArtifactMatch[]) ?? []) {
      byId.set(row.id, row);
    }

    // Keyword hits that semantic missed — assign a solid floor score so they rank
    for (const row of keyword ?? []) {
      if (byId.has(row.id)) continue;
      byId.set(row.id, {
        ...row,
        similarity: 0.72,
      });
    }

    const results = Array.from(byId.values()).sort(
      (a, b) => b.similarity - a.similarity
    );

    return NextResponse.json({
      query: q,
      results,
      meta: {
        count: results.length,
        semantic_threshold: 0.35,
        empty_reason:
          results.length === 0
            ? "No works in the archive matched this query closely enough."
            : null,
      },
    });
  } catch (err) {
    console.error("Search route error:", err);
    return NextResponse.json({ error: "Search failed." }, { status: 500 });
  }
}
