"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export default function BackgroundVideo() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [ready, setReady] = useState(false);

  // Update these only if your filenames differ
  const src = useMemo(() => {
    // dark for home, white for all others
    return isHome ? "/bg/bg2black.mp4" : "/bg/bg1white.mp4";
  }, [isHome]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const freeze = async () => {
      try {
        // ensure we show a frame but do NOT animate
        v.muted = true;
        v.playsInline = true;
        v.loop = false;
        v.controls = false;

        // load, then pause on first frame
        await v.play().catch(() => {});
        v.pause();
        v.currentTime = 0;
        setReady(true);
      } catch {
        setReady(false);
      }
    };

    freeze();
  }, [src]);

  // If video is missing, we still show a solid fallback (NOT half-black panels)
  const fallbackColor = isHome ? "#000" : "#f5f5f5";

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        background: fallbackColor,
        overflow: "hidden",
      }}
    >
      <video
        ref={videoRef}
        src={src}
        preload="auto"
        muted
        playsInline
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: isHome ? "contrast(1.05) brightness(0.55)" : "contrast(1.02) brightness(1.05)",
          opacity: ready ? 1 : 0,
          transition: "opacity 250ms ease",
        }}
        onLoadedData={() => {
          const v = videoRef.current;
          if (!v) return;
          v.pause();
          v.currentTime = 0;
          setReady(true);
        }}
      />

      {/* overlay to match your “glass” look */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: isHome ? "rgba(0,0,0,0.35)" : "rgba(255,255,255,0.28)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
