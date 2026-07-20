import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

/**
 * GET /api/stats
 * Honest counts from the live collection — never fictional marketing numbers.
 */
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("artifacts")
      .select("id, origin, category, maker");

    if (error) {
      console.error("stats failed:", error);
      return NextResponse.json({ error: "Failed to load stats." }, { status: 500 });
    }

    const rows = data ?? [];
    const origins = new Set(
      rows
        .map((r) => r.origin)
        .filter(Boolean)
        .map((o: string) => o.split(",")[0].trim())
    );
    const makers = new Set(
      rows
        .map((r) => r.maker)
        .filter(
          (m): m is string =>
            !!m &&
            !/^unknown/i.test(m) &&
            !/name unrecorded/i.test(m)
        )
    );
    const categories = new Set(rows.map((r) => r.category).filter(Boolean));

    return NextResponse.json({
      works: rows.length,
      origins: origins.size,
      named_makers: makers.size,
      categories: categories.size,
    });
  } catch (err) {
    console.error("stats route error:", err);
    return NextResponse.json({ error: "Failed to load stats." }, { status: 500 });
  }
}
