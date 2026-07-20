import UploadForm from "@/components/UploadForm";

export default function UploadPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <p className="catalog-label mb-4">Contribute</p>
      <h1 className="font-(family-name:--font-display) text-4xl md:text-5xl">
        Add a piece to the archive
      </h1>
      <p className="mt-4 max-w-xl font-light text-(--color-ivory-dim)">
        Photograph the piece. Claude drafts a catalog entry from what it sees
        — maker, origin, era, technique — for an archivist to verify before
        it joins the collection.
      </p>

      <div className="mt-10">
        <UploadForm />
      </div>
    </div>
  );
}
