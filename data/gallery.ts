import type { GalleryKey } from "./events";

export const galleries: { key: GalleryKey; label: string; date: string }[] = [
  { key: "aiden", label: "Aiden", date: "12.26.25" },
  { key: "gioh", label: "Gioh Cecato", date: "10.17.25" },
  { key: "drakk", label: "Drakk", date: "08.08.25" },
];

const PHOTOS_PER_SET = 20;

export function galleryImages(key: GalleryKey) {
  return Array.from({ length: PHOTOS_PER_SET }, (_, i) => {
    const n = i + 1;
    if (key === "aiden") return `/media/aiden/AIDEN-${n}.jpg`;
    if (key === "drakk") return `/media/drakk/drakk-${n}.jpeg`;
    return `/media/gioh/BWTGC-${n}.jpg`;
  });
}

/** A fixed mix of photos from every set, for the homepage strip. */
export function featuredPhotos(count = 8) {
  const sets = galleries.map((g) => ({ key: g.key, images: galleryImages(g.key) }));
  const picks: { src: string; key: GalleryKey }[] = [];
  for (let i = 0; picks.length < count; i++) {
    const set = sets[i % sets.length];
    const src = set.images[(Math.floor(i / sets.length) * 3 + 2) % set.images.length];
    picks.push({ src, key: set.key });
  }
  return picks;
}
