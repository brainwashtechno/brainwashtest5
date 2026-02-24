import FlyerImg from "@/components/flyer-img";
import { SectionHeader, Pill, Btn } from "@/components/ui";
import { upcomingEvent, pastEvents } from "@/data/events";

export default function EventsPage() {
  return (
    <div className="container">
      <div className="section">
        <SectionHeader
          kicker=""
          title="Events"
          subtitle="Upcoming + past events. Tickets are hosted on Shotgun."
        />
      </div>

      {/* UPCOMING pinned */}
      <div className="panel" style={{ padding: 18 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, minHeight: 520 }}>
          <div style={{ minHeight: 480 }}>
            <FlyerImg src={upcomingEvent.flyerSrc} alt={`${upcomingEvent.title} flyer`} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", padding: 6 }}>
            <div>
              <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 13, fontWeight: 700 }}>
                {upcomingEvent.dateLabel}
              </div>
              <div style={{ fontSize: 28, fontWeight: 900, marginTop: 10 }}>
                {upcomingEvent.title}
              </div>
              <div style={{ marginTop: 10, color: "rgba(255,255,255,0.70)" }}>{upcomingEvent.city}</div>

              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 16 }}>
                {upcomingEvent.tags.map((t) => (
                  <Pill key={t}>{t}</Pill>
                ))}
              </div>
            </div>

            <div style={{ marginTop: "auto" }}>
              <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 16 }}>
                <Btn href={upcomingEvent.ticketsHref} variant="primary" target="_blank">Tickets</Btn>
                <Btn href="/news" variant="ghost">News</Btn>
              </div>
              <div style={{ textAlign: "center", marginTop: 10, color: "rgba(255,255,255,0.60)", fontSize: 12 }}>
                Ticketing hosted on Shotgun.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PAST */}
      <div className="section">
        <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 14 }}>Past events</div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {pastEvents.map((e) => (
            <div key={e.id} className="panel" style={{ padding: 14 }}>
              <div style={{ position: "relative", aspectRatio: "16 / 10", borderRadius: 16, overflow: "hidden" }}>
                <FlyerImg src={e.flyerSrc} alt={`${e.title} flyer`} />
              </div>

              <div style={{ marginTop: 10, color: "rgba(255,255,255,0.70)", fontSize: 12 }}>{e.dateLabel}</div>
              <div style={{ marginTop: 6, fontWeight: 900 }}>{e.title}</div>
              <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 13, marginTop: 4 }}>{e.city}</div>

              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 10 }}>
                {e.tags.map((t) => (
                  <Pill key={t}>{t}</Pill>
                ))}
              </div>

              <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
                <Btn href={e.ticketsHref} variant="primary" target="_blank">Tickets</Btn>
                {e.recapHref ? <Btn href={e.recapHref} variant="ghost">Recap</Btn> : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
