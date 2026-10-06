import type { Metadata } from "next";
import PageTitle from "@/components/page-title";
import GalleryClient from "@/components/gallery-client";
import { galleries } from "@/data/gallery";
import type { GalleryKey } from "@/data/events";

export const metadata: Metadata = { title: "Gallery" };

export default async function GalleryPage({ searchParams }: { searchParams: Promise<{ event?: string }> }) {
  const { event } = await searchParams;
  const valid = galleries.some((g) => g.key === event);
  const initial = (valid ? event : galleries[0].key) as GalleryKey;

  return (
    <>
      <PageTitle kicker="Captured on the floor" title="Gallery" intro="Photos from Brainwash nights. Pick a night below; tap any photo to view it full screen." />
      <GalleryClient initialEvent={initial} />
    </>
  );
}
