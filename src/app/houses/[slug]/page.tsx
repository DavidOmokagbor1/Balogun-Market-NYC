import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HOUSES, getHouse } from "@/lib/houses";
import { shopHref } from "@/lib/shop-taxonomy";

export function generateStaticParams() {
  return HOUSES.map((house) => ({ slug: house.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const house = getHouse((await params).slug);
  if (!house) return { title: "House" };
  return {
    title: house.name,
    description: house.signature,
    openGraph: { images: [{ url: house.featured }] },
  };
}

export default async function HousePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const house = getHouse((await params).slug);
  if (!house) notFound();

  const other = HOUSES.find((entry) => entry.slug !== house.slug);

  return (
    <div style={{ minHeight: "100vh", background: "#0A0A0A" }}>
      <section
        style={{
          position: "relative",
          height: "72vh",
          minHeight: 520,
          overflow: "hidden",
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={house.featured}
          alt={house.name}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.68) saturate(1.05)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(10,10,10,0.88) 0%, rgba(10,10,10,0.2) 55%, transparent 100%)",
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 1,
            width: "100%",
            maxWidth: 1400,
            margin: "0 auto",
            padding: "0 clamp(1.25rem, 5vw, 5rem) clamp(2.5rem, 5vw, 3.5rem)",
          }}
        >
          <p className="catalog-label" style={{ margin: "0 0 1rem" }}>
            {house.city} · {house.category}
          </p>
          <h1
            style={{
              margin: 0,
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(3rem, 7vw, 5.5rem)",
              fontWeight: 300,
              lineHeight: 0.95,
              color: "#F5F1E8",
            }}
          >
            {house.name}
          </h1>
          <p
            style={{
              maxWidth: 480,
              margin: "1.25rem 0 0",
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.88rem",
              lineHeight: 1.8,
              color: "rgba(245,241,232,0.62)",
            }}
          >
            {house.signature}
          </p>
        </div>
      </section>

      <section
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: "clamp(3rem, 6vw, 5rem) clamp(1.25rem, 5vw, 5rem) 8rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1.5rem",
            alignItems: "center",
            marginBottom: "3.5rem",
          }}
        >
          <Link
            href={shopHref({ house: house.slug })}
            className="btn-gold"
            style={{
              padding: "0.85rem 1.75rem",
              background: "#C9A86A",
              color: "#0A0A0A",
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.62rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            Shop the House
          </Link>
          <Link
            href="/fitting"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.62rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(245,241,232,0.5)",
              textDecoration: "none",
            }}
          >
            The Fitting
          </Link>
        </div>

        <p
          style={{
            margin: "0 0 2.5rem",
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.25rem",
            fontStyle: "italic",
            lineHeight: 1.5,
            color: "rgba(245,241,232,0.55)",
            maxWidth: 640,
          }}
        >
          “{house.quote}”
        </p>
        <p
          style={{
            margin: "0 0 3.5rem",
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.72rem",
            letterSpacing: "0.06em",
            color: "rgba(245,241,232,0.38)",
          }}
        >
          Founded {house.founded}
        </p>

        <p className="catalog-label" style={{ margin: "0 0 1.5rem" }}>
          Collections
        </p>
        <div style={{ maxWidth: 560, marginBottom: "4rem" }}>
          {house.collections.map((collection) => (
            <div
              key={collection}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.85rem",
                color: "rgba(245,241,232,0.62)",
                padding: "0.85rem 0",
                borderBottom: "1px solid rgba(245,241,232,0.08)",
              }}
            >
              {collection}
            </div>
          ))}
        </div>

        {house.films && house.films.length > 0 && (
          <div style={{ marginBottom: "4rem" }}>
            <p className="catalog-label" style={{ margin: "0 0 1.5rem" }}>
              The show
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "1px",
                background: "rgba(245,241,232,0.06)",
              }}
            >
              {house.films.map((film, i) => (
                <video
                  key={film.src}
                  src={film.src}
                  poster={film.poster}
                  controls
                  playsInline
                  preload={i === 0 ? "metadata" : "none"}
                  aria-label={film.alt}
                  style={{
                    width: "100%",
                    aspectRatio: "16 / 9",
                    objectFit: "cover",
                    display: "block",
                    background: "#0A0A0A",
                  }}
                />
              ))}
            </div>
          </div>
        )}

        <p className="catalog-label" style={{ margin: "0 0 1.5rem" }}>
          The collection, as seen
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1px",
            background: "rgba(245,241,232,0.06)",
            marginBottom: "4rem",
          }}
        >
          {house.looks.map((look) => (
            <div key={look.title} style={{ background: "#0A0A0A" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={look.img}
                alt={`${house.name} — ${look.title}`}
                style={{
                  width: "100%",
                  aspectRatio: "3 / 4",
                  objectFit: "cover",
                  display: "block",
                  filter: "brightness(0.88) saturate(1.05)",
                }}
              />
              <div style={{ padding: "1rem 0 1.5rem" }}>
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.2rem",
                    color: "#F5F1E8",
                  }}
                >
                  {look.title}
                </div>
                <div
                  style={{
                    marginTop: "0.3rem",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.55rem",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "rgba(245,241,232,0.35)",
                  }}
                >
                  {look.note}
                </div>
              </div>
            </div>
          ))}
        </div>

        {other && (
          <Link
            href={`/houses/${other.slug}`}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.62rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#C9A86A",
              textDecoration: "none",
            }}
          >
            {other.name} →
          </Link>
        )}
      </section>
    </div>
  );
}
