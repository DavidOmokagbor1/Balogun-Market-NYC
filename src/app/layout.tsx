import type { Metadata } from "next";
import { Marcellus, Spectral, IBM_Plex_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const marcellus = Marcellus({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-marcellus",
});

const spectral = Spectral({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-spectral",
});

const plexMono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-plex-mono",
});

export const metadata: Metadata = {
  title: "Àṣà Archive",
  description:
    "A living archive of African fashion, textiles, and art — where every piece carries its provenance.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${marcellus.variable} ${spectral.variable} ${plexMono.variable} min-h-screen`}
      >
        <header className="border-b border-(--color-indigo-line)">
          <div className="mx-auto flex max-w-6xl items-baseline justify-between px-6 py-5">
            <Link
              href="/"
              className="font-(family-name:--font-display) text-xl tracking-wide"
            >
              Àṣà <span className="text-(--color-brass)">Archive</span>
            </Link>
            <nav className="flex gap-8">
              <Link
                href="/archive"
                className="catalog-label hover:text-(--color-ivory) transition-colors"
              >
                The Collection
              </Link>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="mt-24 border-t border-(--color-indigo-line)">
          <div className="mx-auto max-w-6xl px-6 py-8">
            <p className="catalog-label">
              Àṣà — Yoruba: custom, culture, tradition
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
