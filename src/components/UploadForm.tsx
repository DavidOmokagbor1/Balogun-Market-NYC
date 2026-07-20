"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(",")[1]); // strip the data: prefix
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function UploadForm() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [hint, setHint] = useState("");
  const [status, setStatus] = useState<"idle" | "uploading" | "cataloging">(
    "idle"
  );
  const [error, setError] = useState<string | null>(null);

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
    setError(null);
    if (preview) URL.revokeObjectURL(preview);
    setPreview(f ? URL.createObjectURL(f) : null);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return;
    setError(null);

    try {
      setStatus("uploading");
      const form = new FormData();
      form.append("file", file);
      const uploadRes = await fetch("/api/upload", { method: "POST", body: form });
      const uploadData = await uploadRes.json();
      if (!uploadRes.ok) throw new Error(uploadData.error ?? "Upload failed.");

      setStatus("cataloging");
      const imageBase64 = await fileToBase64(file);
      const catalogRes = await fetch("/api/catalog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64,
          mediaType: file.type,
          imageUrl: uploadData.imageUrl,
          hint: hint.trim() || undefined,
        }),
      });
      const catalogData = await catalogRes.json();
      if (!catalogRes.ok) throw new Error(catalogData.error ?? "Cataloging failed.");

      router.push(`/archive/${catalogData.artifactId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("idle");
    }
  }

  const busy = status !== "idle";

  return (
    <form onSubmit={onSubmit} className="max-w-xl">
      <label htmlFor="artifact-photo" className="catalog-label">
        Photograph
      </label>
      <div className="mt-3 border border-dashed border-(--color-indigo-line) bg-(--color-indigo) p-6">
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={preview}
            alt="Selected artifact"
            className="mx-auto max-h-80 object-contain"
          />
        ) : (
          <p className="text-center text-sm font-light text-(--color-ivory-dim)">
            Choose a JPEG, PNG, or WebP photograph of the piece.
          </p>
        )}
        <input
          id="artifact-photo"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={onFileChange}
          className="mt-4 w-full text-sm text-(--color-ivory-dim) file:mr-4 file:border file:border-(--color-brass) file:bg-transparent file:px-4 file:py-2 file:font-(family-name:--font-catalog) file:text-xs file:uppercase file:tracking-[0.18em] file:text-(--color-brass)"
        />
      </div>

      <label htmlFor="archivist-note" className="catalog-label mt-8 block">
        Archivist&rsquo;s note (optional)
      </label>
      <textarea
        id="archivist-note"
        value={hint}
        onChange={(e) => setHint(e.target.value)}
        rows={3}
        placeholder="Anything already known — where it was acquired, who made it, when…"
        className="mt-3 w-full border border-(--color-indigo-line) bg-(--color-indigo) px-4 py-3 font-light text-(--color-ivory) placeholder:text-(--color-ivory-dim)/60 focus:border-(--color-brass) focus:outline-none"
      />

      <button
        type="submit"
        disabled={!file || busy}
        className="mt-8 border border-(--color-brass) px-6 py-3 font-(family-name:--font-catalog) text-xs uppercase tracking-[0.18em] text-(--color-brass) transition-colors hover:bg-(--color-brass) hover:text-(--color-vat) disabled:opacity-50"
      >
        {status === "uploading" && "Uploading…"}
        {status === "cataloging" && "Drafting catalog entry…"}
        {status === "idle" && "Draft catalog entry"}
      </button>

      {error && <p className="mt-4 text-sm text-(--color-ivory-dim)">{error}</p>}

      <p className="mt-4 text-xs font-light text-(--color-ivory-dim)/70">
        Claude drafts the catalog entry from the photograph. An archivist must
        verify it before the provenance is trusted.
      </p>
    </form>
  );
}
