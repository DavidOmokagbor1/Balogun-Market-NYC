import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { embed } from "@/lib/embeddings";

/**
 * POST /api/search
 * Body: { query: string }
 *
 * Semantic search over the collection:
 *   query → OpenAI embedding → pgvector cosine match → ranked artifacts
 *
 * Try: "indigo resist-dyed cloth" or "garments about royalty and status"
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

    const queryEmbedding = await embed(query.trim());

    const { data, error } = await supabase.rpc("match_artifacts", {
      query_embedding: queryEmbedding,
      match_threshold: 0.25,
      match_count: 12,
    });

    if (error) {
      console.error("match_artifacts RPC failed:", error);
      return NextResponse.json({ error: "Search failed." }, { status: 500 });
    }

    return NextResponse.json({ query, results: data ?? [] });
  } catch (err) {
    console.error("Search route error:", err);
    return NextResponse.json({ error: "Search failed." }, { status: 500 });
  }
}
