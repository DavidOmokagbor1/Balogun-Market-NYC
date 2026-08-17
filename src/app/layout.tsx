import type { Metadata } from "next";
import "./globals.css";
import { CustomCursor } from "@/components/CustomCursor";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartProvider } from "@/components/shop/CartProvider";
import { CartDrawer } from "@/components/shop/CartDrawer";

export const metadata: Metadata = {
  title: {
    default: "Balogun Market NYC",
    template: "%s | Balogun Market NYC",
  },
  description:
    "A curated luxury marketplace bridging African creativity with global fashion culture. Y'WANDELAG and Mokhueleigbe — shown in New York.",
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
