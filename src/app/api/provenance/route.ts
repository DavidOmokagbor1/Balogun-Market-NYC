import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { generateProvenance } from "@/lib/anthropic";
import { embed, artifactToEmbeddingText } from "@/lib/embeddings";

/**
 * POST /api/provenance
 * Body: { artifactId: string, known_history?: string }
 *
 * Pipeline:
 *   1. Load the artifact's verified facts from Supabase
 *   2. Claude writes the provenance narrative (facts only, no invention)
 *   3. Save the story + refresh the embedding so search reflects it
 */
export async function POST(req: NextRequest) {
  try {
    const { artifactId, known_history } = await req.json();

    if (!artifactId) {
      return NextResponse.json(
        { error: "artifactId is required." },
        { status: 400 }
      );
    }

    const admin = supabaseAdmin();

    const { data: artifact, error: loadError } = await admin
      .from("artifacts")
      .select("*")
      .eq("id", artifactId)
      .single();

    if (loadError || !artifact) {
      return NextResponse.json({ error: "Artifact not found." }, { status: 404 });
    }

    const story = await generateProvenance({
      title: artifact.title,
      maker: artifact.maker,
      origin: artifact.origin,
      era: artifact.era,
      medium: artifact.medium,
      acquisition_note: artifact.acquisition_note,
      known_history,
    });

    const embedding = await embed(
      artifactToEmbeddingText({ ...artifact, provenance_story: story })
    );

    const { error: saveError } = await admin
      .from("artifacts")
      .update({ provenance_story: story, embedding })
      .eq("id", artifactId);

    if (saveError) {
      console.error("Failed to save provenance:", saveError);
      return NextResponse.json({ error: "Save failed." }, { status: 500 });
    }

    return NextResponse.json({ artifactId, provenance_story: story });
  } catch (err) {
    console.error("Provenance route error:", err);
    return NextResponse.json(
      { error: "Provenance generation failed." },
      { status: 500 }
    );
  }
}
