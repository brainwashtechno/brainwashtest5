import type { BWEvent } from "@/data/events";
import { longDate, shortDate } from "@/data/events";

/** Big flyer + details block for the next show. */
export default function EventFeature({ event }: { event: BWEvent }) {
  return (
    <div className="grid gap-10 md:grid-cols-2 md:gap-16" style={{ alignItems: "center" }}>
      <a
        href={event.ticketsHref}
        target="_blank"
        rel="noreferrer"
        className="media-hover"
        data-reveal
        style={{ display: "block", border: "1px solid var(--line)" }}
      >
        <img src={event.flyerSrc} alt={`${event.title} flyer`} loading="lazy" style={{ height: "auto" }} />
      </a>

      <div data-reveal style={{ ["--reveal-delay" as string]: "120ms" }}>
        <div className="mono red">{shortDate(event.date)}</div>
        <h3 className="display" style={{ fontSize: "clamp(48px, 7vw, 96px)", marginTop: 16 }}>
          {event.headline}
        </h3>

        <dl className="mono" style={{ marginTop: 32, display: "grid", gridTemplateColumns: "auto 1fr", gap: "12px 24px", fontSize: 12 }}>
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

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 28 }}>
          {event.tags.map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>

        <div style={{ marginTop: 40, display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
          <a href={event.ticketsHref} target="_blank" rel="noreferrer" className="btn btn-solid">
            Get tickets ↗
          </a>
          <span className="mono" style={{ color: "var(--smoke-2)", fontSize: 11 }}>
            18+ · Tickets on Shotgun
          </span>
        </div>
      </div>
    </div>
  );
}
