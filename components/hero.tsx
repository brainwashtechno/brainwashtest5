"use client";

import { useEffect, useRef } from "react";
import type { BWEvent } from "@/data/events";
import { shortDate } from "@/data/events";
import { site } from "@/data/site";

export default function Hero({ next }: { next?: BWEvent }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) v.pause();
    else v.play().catch(() => {});
  }, []);

  return (
    <section style={{ position: "relative", height: "100svh", minHeight: 560, overflow: "hidden", background: "var(--bg)" }}>
      <video
        ref={videoRef}
        src="/bg/bg2black.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(0.4) contrast(1.1) brightness(0.6)" }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.1) 35%, rgba(10,10,10,0.35) 70%, var(--bg) 100%), radial-gradient(ellipse at 50% 120%, rgba(139,10,10,0.35), transparent 60%)",
        }}
      />

      <div
        className="container"
        style={{ position: "relative", height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end", paddingBottom: 56 }}
      >
        <div className="mono fade-up" style={{ color: "var(--text-dim)", ["--d" as string]: "200ms" }}>
          {site.tagline} — since {site.since}
        </div>

        {/* The background video carries the wordmark, so it isn't repeated here. */}
        <h1 className="sr-only">Brainwash</h1>

        <div
          className="fade-up"
          style={{
            marginTop: 32,
            display: "flex",
            flexWrap: "wrap",
            gap: 20,
            alignItems: "center",
            justifyContent: "space-between",
            ["--d" as string]: "900ms",
          }}
        >
          <p style={{ maxWidth: 460, margin: 0, fontSize: 17 }}>
            The dancefloor is the main character. No VIP. No barriers. Just energy moving as one.
          </p>

          {next ? (
            <a href={next.ticketsHref} target="_blank" rel="noreferrer" className="btn">
              <span style={{ width: 8, height: 8, background: "var(--red-hi)", borderRadius: "50%", display: "inline-block" }} />
              Next: {next.headline} · {shortDate(next.date)}
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
