import type { Metadata } from "next";
import { Journal } from "@/components/Journal";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Next-season collections, pop-ups, and brief notes on African luxury fashion — from the houses at Balogun Market NYC.",
};

export default function JournalPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#0A0A0A", paddingTop: "2rem" }}>
      <Journal />
    </div>
  );
}
