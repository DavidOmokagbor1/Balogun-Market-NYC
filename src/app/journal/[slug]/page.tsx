import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getJournalArticle, JOURNAL_ARTICLES } from "@/lib/journal";

export const dynamic = "force-static";

export function generateStaticParams() {
  return JOURNAL_ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getJournalArticle(slug);
  if (!article) return { title: "Journal" };
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: { images: [{ url: article.img }] },
  };
}

export default async function JournalArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getJournalArticle(slug);
  if (!article) notFound();

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "7rem clamp(1.25rem, 5vw, 5rem) 8rem",
        background: "#0A0A0A",
      }}
    >
      <article style={{ maxWidth: 760, margin: "0 auto" }}>
        <Link href="/journal" className="catalog-label" style={{ textDecoration: "none" }}>
          ← The Journal
        </Link>

        <p className="catalog-label" style={{ margin: "2.5rem 0 1rem" }}>
          {article.category} · {article.date}
        </p>
        <h1
          style={{
            margin: 0,
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(2.4rem, 5vw, 4rem)",
            fontWeight: 300,
            lineHeight: 1.05,
            color: "#F5F1E8",
          }}
        >
          {article.title}
        </h1>
        <p
          style={{
            margin: "1.25rem 0 0",
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.88rem",
            fontWeight: 300,
            lineHeight: 1.85,
            color: "rgba(245,241,232,0.5)",
          }}
        >
          {article.excerpt}
        </p>

        <div
          style={{
            margin: "2.5rem 0",
            aspectRatio: "16 / 9",
            overflow: "hidden",
            background: "#111111",
            border: "1px solid rgba(245,241,232,0.06)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={article.img}
            alt={article.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "brightness(0.78) saturate(1.1)",
              display: "block",
            }}
          />
        </div>

        {article.body.map((paragraph) => (
          <p
            key={paragraph.slice(0, 32)}
            style={{
              margin: "0 0 1.4rem",
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.92rem",
              fontWeight: 300,
              lineHeight: 1.9,
              color: "rgba(245,241,232,0.72)",
            }}
          >
            {paragraph}
          </p>
        ))}

        <div
          style={{
            marginTop: "3rem",
            paddingTop: "2rem",
            borderTop: "1px solid rgba(245,241,232,0.08)",
            display: "flex",
            gap: "2rem",
            flexWrap: "wrap",
          }}
        >
          <Link
            href="/shop"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.62rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#C9A86A",
              textDecoration: "none",
            }}
          >
            Shop the Show →
          </Link>
          <Link
            href="/#designers"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.62rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(245,241,232,0.45)",
              textDecoration: "none",
            }}
          >
            The Roster →
          </Link>
        </div>
      </article>
    </div>
  );
}
