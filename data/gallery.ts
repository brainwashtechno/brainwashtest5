import type { GalleryKey } from "./events";

/**
 * Photo sets, newest first. Each set lives in public/media/<key>/ as
 * <key>-1.jpg, <key>-2.jpg, … up to `count`.
 */
export const galleries: { key: GalleryKey; label: string; date: string; count: number }[] = [
  { key: "obi", label: "O.B.I. + Per Pleks", date: "09.25.26", count: 15 },
  { key: "raw", label: "Raw 10 Years", date: "04.25.26", count: 15 },
  { key: "perpleks", label: "Per Pleks", date: "03.14.26", count: 15 },
  { key: "aiden", label: "Aiden", date: "12.26.25", count: 20 },
  { key: "gioh", label: "Gioh Cecato", date: "10.17.25", count: 20 },
  { key: "drakk", label: "Drakk", date: "08.08.25", count: 20 },
];

export function galleryImages(key: GalleryKey) {
  const set = galleries.find((g) => g.key === key);
  return Array.from({ length: set?.count ?? 0 }, (_, i) => `/media/${key}/${key}-${i + 1}.jpg`);
}

/**
 * Every photo from every set, interleaved so the first few span all nights.
 * The homepage strip shows a random handful of these on each visit.
 */
export function allPhotos() {
  const sets = galleries.map((g) => ({ key: g.key, images: galleryImages(g.key) }));
  const longest = Math.max(...sets.map((s) => s.images.length));
  const photos: { src: string; key: GalleryKey }[] = [];
  for (let i = 0; i < longest; i++) {
    for (const s of sets) if (s.images[i]) photos.push({ src: s.images[i], key: s.key });
  }
  return photos;
}
