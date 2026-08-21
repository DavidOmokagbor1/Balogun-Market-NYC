import type { Metadata } from "next";
import "./globals.css";
import { CustomCursor } from "@/components/CustomCursor";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartProvider } from "@/components/shop/CartProvider";
import { CartDrawer } from "@/components/shop/CartDrawer";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://balogun-market-nyc.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Balogun Market NYC",
    template: "%s | Balogun Market NYC",
  },
  description:
    "A curated luxury marketplace bridging African creativity with global fashion culture. Y'WANDELAG and Mokhueleigbe — shown in New York.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Balogun Market NYC",
    description:
      "A curated luxury marketplace bridging African creativity with global fashion culture.",
    siteName: "Balogun Market NYC",
    url: siteUrl,
    images: [{ url: "/designers/ywande-featured.jpg" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Balogun Market NYC",
    description:
      "A curated luxury marketplace bridging African creativity with global fashion culture.",
    images: ["/designers/ywande-featured.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen" style={{ overflowX: "hidden" }}>
        <CartProvider>
          <CustomCursor />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
