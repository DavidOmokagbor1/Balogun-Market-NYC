import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { embed } from "@/lib/embeddings";
import { generateFashionBrain } from "@/lib/anthropic";
import type { ArtifactMatch, DiscoverResponse } from "@/types/artifact";

/**
 * POST /api/discover
 * Body: { query: string }
 *
 * Native AI Brain — creative African high-fashion intelligence:
 *   1) pull heritage anchors from the archive (hybrid search)
 *   2) Claude invents concept, forecast, design moves, runway moment
 */
export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json();

    if (!query || typeof query !== "string" || query.trim().length < 3) {
      return NextResponse.json(
        { error: "Describe what you want in at least a few words." },
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
          match_threshold: 0.32,
          match_count: 8,
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
              .limit(8)
          : Promise.resolve({ data: [], error: null }),
      ]);

    if (semErr) {
      console.error("discover semantic failed:", semErr);
      return NextResponse.json(
        { error: "The Native AI Brain could not reach the archive." },
        { status: 500 }
      );
    }
    if (keyErr) {
      console.error("discover keyword failed:", keyErr);
      return NextResponse.json(
        { error: "The Native AI Brain could not reach the archive." },
        { status: 500 }
      );
    }

    const byId = new Map<string, ArtifactMatch>();
    for (const row of (semantic as ArtifactMatch[]) ?? []) {
      byId.set(row.id, row);
    }
    for (const row of keyword ?? []) {
      if (byId.has(row.id)) continue;
      byId.set(row.id, { ...row, similarity: 0.68 });
    }

    const heritage = Array.from(byId.values())
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 6);

    const brief = await generateFashionBrain(
      q,
      heritage.map((h) => ({
        title: h.title,
        maker: h.maker,
        origin: h.origin,
        era: h.era,
        medium: h.medium,
        category: h.category,
      }))
    );

    const body: DiscoverResponse = {
      query: q,
      brief,
      heritage,
      meta: {
        heritage_count: heritage.length,
        mode: heritage.length > 0 ? "creative_grounded" : "creative_open",
      },
    };

    return NextResponse.json(body);
  } catch (err) {
    console.error("Discover route error:", err);
    return NextResponse.json(
      { error: "The Native AI Brain could not compose a response." },
      { status: 500 }
    );
  }
}
