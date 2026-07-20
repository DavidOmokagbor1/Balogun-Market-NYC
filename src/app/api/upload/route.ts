import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

/**
 * POST /api/upload
 * Body: multipart/form-data with a "file" field.
 *
 * Uploads the image to the "artifacts" Supabase Storage bucket via the
 * service-role client (writes never happen from the browser) and returns
 * its public URL for use with /api/catalog.
 */
export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const file = form.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "file is required." }, { status: 400 });
    }

    const ext = ALLOWED_TYPES[file.type];
    if (!ext) {
      return NextResponse.json(
        { error: "Unsupported image type. Use JPEG, PNG, or WebP." },
        { status: 400 }
      );
    }

    const bytes = new Uint8Array(await file.arrayBuffer());
    const path = `${crypto.randomUUID()}.${ext}`;

    const admin = supabaseAdmin();
    const { error: uploadError } = await admin.storage
      .from("artifacts")
      .upload(path, bytes, { contentType: file.type });

    if (uploadError) {
      console.error("Storage upload failed:", uploadError);
      return NextResponse.json({ error: "Upload failed." }, { status: 500 });
    }

    const {
      data: { publicUrl },
    } = admin.storage.from("artifacts").getPublicUrl(path);

    return NextResponse.json({ imageUrl: publicUrl });
  } catch (err) {
    console.error("Upload route error:", err);
    return NextResponse.json({ error: "Upload failed." }, { status: 500 });
  }
}
