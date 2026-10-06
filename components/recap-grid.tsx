"use client";

import Link from "next/link";
import RecapVideo from "@/components/recap-video";
import { useShuffled } from "@/components/use-shuffled";
import { shortDate, type BWEvent } from "@/data/events";

/** Three recap clips, picked at random from every past event on each visit. */
export default function RecapGrid({ events }: { events: BWEvent[] }) {
  const recaps = useShuffled(events, 3);

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {recaps.map((e, i) => (
        <article key={i} data-reveal style={{ ["--reveal-delay" as string]: `${i * 120}ms` }}>
          <div className="media-hover" style={{ aspectRatio: "4 / 5", border: "1px solid var(--line)" }}>
            <RecapVideo src={e.promoSrc!} label={`${e.headline} recap`} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: 16, gap: 12 }}>
            <h3 className="display" style={{ fontSize: 32 }}>
              {e.headline}
            </h3>
            <span className="mono" style={{ color: "var(--smoke-2)" }}>
              {shortDate(e.date)}
            </span>
          </div>
          {e.gallery ? (
            <Link href={`/gallery?event=${e.gallery}`} className="link-arrow" style={{ display: "inline-block", marginTop: 12 }}>
              Photos →
            </Link>
          ) : null}
        </article>
      ))}
    </div>
  );
}
