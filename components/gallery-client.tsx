"use client";

import { useCallback, useEffect, useState } from "react";
import { galleries, galleryImages } from "@/data/gallery";
import type { GalleryKey } from "@/data/events";

export default function GalleryClient({ initialEvent }: { initialEvent: GalleryKey }) {
  const [active, setActive] = useState<GalleryKey>(initialEvent);
  const [open, setOpen] = useState<number | null>(null);
  const images = galleryImages(active);

  const select = (key: GalleryKey) => {
    setActive(key);
    window.history.replaceState(null, "", `/gallery?event=${key}`);
  };

  const step = useCallback(
    (dir: 1 | -1) => setOpen((i) => (i === null ? i : (i + dir + images.length) % images.length)),
    [images.length]
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, step]);

  // Swipe on phones
  const [touchX, setTouchX] = useState<number | null>(null);

  return (
    <section className="container" style={{ paddingBottom: 120 }}>
      <div role="tablist" aria-label="Choose a night" style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
        {galleries.map((g) => (
          <button
            key={g.key}
            role="tab"
            aria-selected={active === g.key}
            onClick={() => select(g.key)}
            className="btn btn-sm"
            style={active === g.key ? { background: "var(--red)", borderColor: "var(--red)" } : { borderColor: "var(--line)" }}
          >
            {g.label} <span style={{ opacity: 0.6 }}>{g.date}</span>
          </button>
        ))}
      </div>

      <div className="columns-2 gap-3 md:columns-3 md:gap-4">
        {images.map((src, i) => (
          <button
            key={src}
            onClick={() => setOpen(i)}
            className="media-hover"
            style={{ display: "block", width: "100%", marginBottom: 12, padding: 0, border: 0, cursor: "zoom-in", breakInside: "avoid" }}
            aria-label={`Open photo ${i + 1}`}
          >
            <img src={src} alt="" loading="lazy" style={{ height: "auto" }} />
          </button>
        ))}
      </div>

      {open !== null ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          onClick={() => setOpen(null)}
          onTouchStart={(e) => setTouchX(e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX === null) return;
            const dx = e.changedTouches[0].clientX - touchX;
            if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
            setTouchX(null);
          }}
          style={{ position: "fixed", inset: 0, zIndex: 90, background: "rgba(10,10,10,0.96)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}
        >
          <img src={images[open]} alt="" style={{ maxHeight: "86vh", maxWidth: "100%", width: "auto", objectFit: "contain" }} onClick={(e) => e.stopPropagation()} />
          <div className="mono" style={{ position: "absolute", top: 20, left: 20, color: "var(--smoke-2)" }}>
            {open + 1} / {images.length}
          </div>
          <button className="btn btn-sm" style={{ position: "absolute", top: 16, right: 16 }} onClick={() => setOpen(null)}>
            Close
          </button>
          <button
            className="btn btn-sm hidden md:inline-flex"
            style={{ position: "absolute", left: 16, top: "50%" }}
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            aria-label="Previous photo"
          >
            ←
          </button>
          <button
            className="btn btn-sm hidden md:inline-flex"
            style={{ position: "absolute", right: 16, top: "50%" }}
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            aria-label="Next photo"
          >
            →
          </button>
        </div>
      ) : null}
    </section>
  );
}
