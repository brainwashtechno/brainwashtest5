import GalleryClient from "@/components/gallery-client";

type GalleryKey = "aiden" | "drakk" | "gioh";

export default function GalleryPage({
  searchParams,
}: {
  searchParams: { event?: GalleryKey };
}) {
  const event = (searchParams?.event as GalleryKey) || "aiden";

  return <GalleryClient initialEvent={event} />;
}