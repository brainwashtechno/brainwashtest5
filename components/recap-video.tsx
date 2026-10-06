"use client";

import { useEffect, useRef } from "react";

/** Muted looping clip that only loads and plays while it's on screen. */
export default function RecapVideo({ src, label }: { src: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !reduce) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.35 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={label}
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
  );
}
