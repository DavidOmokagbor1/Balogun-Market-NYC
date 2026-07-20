import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

/**
 * GET /api/collection
 * Public read of the archive for homepage / browsing.
 * Query: ?limit=12&category=textile
 */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = Math.min(Number(searchParams.get("limit") ?? 24), 48);
    const category = searchParams.get("category");

    let q = supabase
      .from("artifacts")
      .select(
        "id, title, maker, origin, era, medium, category, provenance_story, image_url, image_alt, provenance_verified, created_at"
      )
      .order("created_at", { ascending: false })
      .limit(limit);

    if (category) q = q.eq("category", category);

    const { data, error } = await q;
    if (error) {
      console.error("collection list failed:", error);
      return NextResponse.json({ error: "Failed to load collection." }, { status: 500 });
    }

    return NextResponse.json({ results: data ?? [] });
  } catch (err) {
    console.error("collection route error:", err);
    return NextResponse.json({ error: "Failed to load collection." }, { status: 500 });
  }
}
