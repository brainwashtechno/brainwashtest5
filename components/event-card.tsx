import type { BWEvent } from "@/data/events";
import { longDate, shortDate } from "@/data/events";

/** Flyer + details as one column, so several upcoming shows line up side by side. */
export default function EventCard({ event, delay = 0 }: { event: BWEvent; delay?: number }) {
  return (
    <article
      data-reveal
      style={{ display: "flex", flexDirection: "column", height: "100%", ["--reveal-delay" as string]: `${delay}ms` }}
    >
      <a
        href={event.ticketsHref}
        target="_blank"
        rel="noreferrer"
        className="media-hover"
        style={{ display: "block", aspectRatio: "4 / 5", border: "1px solid var(--line)" }}
      >
        <img src={event.flyerSrc} alt={`${event.title} flyer`} loading="lazy" />
      </a>

      <div className="mono red" style={{ marginTop: 28 }}>
        {shortDate(event.date)}
      </div>
      <h3 className="display" style={{ fontSize: "clamp(40px, 5vw, 64px)", marginTop: 12 }}>
        {event.headline}
      </h3>

      <dl className="mono" style={{ marginTop: 24, display: "grid", gridTemplateColumns: "auto 1fr", gap: "10px 20px", fontSize: 12 }}>
        <dt style={{ color: "var(--smoke-2)" }}>Date</dt>
        <dd style={{ margin: 0 }}>{longDate(event.date)}</dd>
        {event.hours ? (
          <>
            <dt style={{ color: "var(--smoke-2)" }}>Hours</dt>
            <dd style={{ margin: 0 }}>{event.hours}</dd>
          </>
        ) : null}
        <dt style={{ color: "var(--smoke-2)" }}>Where</dt>
        <dd style={{ margin: 0 }}>{event.venue}</dd>
        {event.lineup.length ? (
          <>
            <dt style={{ color: "var(--smoke-2)" }}>Lineup</dt>
            <dd style={{ margin: 0 }}>{event.lineup.join(" · ")}</dd>
          </>
        ) : null}
      </dl>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 24 }}>
        {event.tags.map((t) => (
          <span key={t} className="tag">
            {t}
          </span>
        ))}
      </div>

      {/* Pushed to the bottom so the buttons sit on one line across cards. */}
      <div style={{ marginTop: "auto", paddingTop: 32, display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
        <a href={event.ticketsHref} target="_blank" rel="noreferrer" className="btn btn-solid">
          Get tickets ↗
        </a>
        <span className="mono" style={{ color: "var(--smoke-2)", fontSize: 11 }}>
          18+ · Tickets on Shotgun
        </span>
      </div>
    </article>
  );
}
