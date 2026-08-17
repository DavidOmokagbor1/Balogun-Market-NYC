import { HeroSection } from "@/components/HeroSection";
import { CollectionsGrid } from "@/components/CollectionsGrid";
import { Timeline } from "@/components/Timeline";
import { MasonryGallery } from "@/components/MasonryGallery";
import { Designers } from "@/components/Designers";
import { Lookbook } from "@/components/Lookbook";
import { VideoReel } from "@/components/VideoReel";
import { Membership } from "@/components/Membership";
import { Journal } from "@/components/Journal";

/* Section order is fixed by the design reference — do not reorder.
   Navbar and Footer render from the root layout. */
export default function Home() {
  return (
    <>
      <HeroSection />
      <CollectionsGrid />
      <Timeline />
      <MasonryGallery />
      <Designers />
      <Lookbook />
      <VideoReel />
      <Membership />
      <Journal />
    </>
  );
}
