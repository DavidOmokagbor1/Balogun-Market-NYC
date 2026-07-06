import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { draftCatalogFromImage } from "@/lib/anthropic";
import { embed, artifactToEmbeddingText } from "@/lib/embeddings";

/**
 * POST /api/catalog
 * Body: {
 *   imageBase64: string,               // raw base64, no data: prefix
 *   mediaType: "image/jpeg" | "image/png" | "image/webp",
 *   imageUrl?: string,                 // Supabase Storage URL, if uploaded
 *   hint?: string                      // optional archivist note
 * }
 *
 * Pipeline: photograph → Claude vision drafts catalog entry →
 * embedded → inserted as an unverified draft for human review.
 */
export async function POST(req: NextRequest) {
  try {
    const { imageBase64, mediaType, imageUrl, hint } = await req.json();

    if (!imageBase64 || !mediaType) {
      return NextResponse.json(
        { error: "imageBase64 and mediaType are required." },
        { status: 400 }
      );
    }

    const draft = await draftCatalogFromImage(imageBase64, mediaType, hint);

    const embedding = await embed(
      artifactToEmbeddingText({
        title: draft.title,
        maker: draft.maker,
        origin: draft.origin,
        era: draft.era,
        medium: draft.medium,
        category: draft.category,
        provenance_story: draft.description,
      })
    );

    const admin = supabaseAdmin();
    const { data, error } = await admin
      .from("artifacts")
      .insert({
        title: draft.title,
        maker: draft.maker,
        origin: draft.origin,
        era: draft.era,
        medium: draft.medium,
        category: draft.category,
        provenance_story: null, // provenance is generated separately, from verified facts
        provenance_verified: false,
        image_url: imageUrl ?? null,
        image_alt: draft.description.slice(0, 200),
        embedding,
        metadata: { catalog_draft: draft, source: "ai_catalog_v1" },
      })
      .select("id")
      .single();

    if (error) {
      console.error("Insert failed:", error);
      return NextResponse.json({ error: "Insert failed." }, { status: 500 });
    }

    return NextResponse.json({ artifactId: data.id, draft });
  } catch (err) {
    console.error("Catalog route error:", err);
    return NextResponse.json({ error: "Cataloging failed." }, { status: 500 });
  }
}
