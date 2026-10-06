"use client";

import Link from "next/link";
import { useShuffled } from "@/components/use-shuffled";
import type { GalleryKey } from "@/data/events";

/** Eight photos, picked at random from every gallery set on each visit. */
export default function PhotoStrip({ photos }: { photos: { src: string; key: GalleryKey }[] }) {
  const picked = useShuffled(photos, 8);

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
      {picked.map((p, i) => (
        <Link
          key={i}
          href={`/gallery?event=${p.key}`}
          className="media-hover"
          data-reveal
          style={{
            aspectRatio: "4 / 5",
            ["--reveal-delay" as string]: `${(i % 4) * 80}ms`,
          }}
        >
          <img src={p.src} alt="Brainwash crowd and DJ" loading="lazy" />
        </Link>
      ))}
    </div>
  );
}
