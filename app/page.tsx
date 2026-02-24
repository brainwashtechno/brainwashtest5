import Link from "next/link";
import FlyerImg from "@/components/flyer-img";
import PromoCard from "@/components/promo-card";
import HomeRandomStrip from "@/components/home-random-strip";
import { SectionHeader, Pill, Btn } from "@/components/ui";
import { upcomingEvent, pastEvents } from "@/data/events";

export default function Page() {
  const kloud = pastEvents.find((e) => e.id === "kloud");
  const aiden = pastEvents.find((e) => e.id === "aiden");

  return (
    <div className="container">
      <div className="section">
        <div className="panel" style={{ padding: 28 }}>
          <SectionHeader
            kicker=""
            title=""
            subtitle="We are a collective dedicated to shaping immersive rave experiences through music, passion, and culture. Rooted in community and driven by evolution, we continuously refine our craft — delivering uncompromising sound, striking visuals, and an atmosphere that resonates long after the final track."
          
          />
        </div>
      </div>

      {/* NEXT UP */}
      <div className="section" style={{ paddingTop: 8 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <div>
            <div style={{ letterSpacing: "0.25em", fontSize: 11, color: "rgba(255,255,255,0.65)" }}></div>
            <div style={{ fontSize: 36, fontWeight: 900, marginTop: 6 }}>Next up</div>
          </div>
          <Btn href="/events" variant="ghost">Events →</Btn>
        </div>

        <div className="panel" style={{ padding: 18 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, minHeight: 520 }}>
            {/* left flyer MUST show */}
            <div style={{ minHeight: 480 }}>
              <FlyerImg src={upcomingEvent.flyerSrc} alt={`${upcomingEvent.title} flyer`} />
            </div>

            {/* right text + buttons bottom */}
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

              {/* bottom controls */}
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
      </div>

      {/* RECAPS */}
      <div className="section" style={{ paddingTop: 22 }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 14 }}>
          <div>
            <div style={{ letterSpacing: "0.25em", fontSize: 11, color: "rgba(255,255,255,0.65)" }}>PAST EVENTS</div>
            <div style={{ fontSize: 36, fontWeight: 900, marginTop: 6 }}>Recaps</div>
          </div>
          <Link href="/events" style={{ color: "rgba(255,255,255,0.75)", fontWeight: 700 }}>More →</Link>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {kloud ? (
            <PromoCard
              title={kloud.title}
              city={kloud.city}
              tags={kloud.tags}
              videoSrc="/promos/kloudpromo.mp4"
              showRecap={false}
              eventsHref="/events"
            />
          ) : null}

          {aiden ? (
            <PromoCard
              title={aiden.title}
              city={aiden.city}
              tags={aiden.tags}
              videoSrc="/promos/aidenpromo.mp4"
              recapHref="/gallery?event=aiden"
              eventsHref="/events"
            />
          ) : null}
        </div>
      </div>

      {/* MOMENTS (ONLY ONCE) */}
      <div className="section" style={{ paddingTop: 22, paddingBottom: 70 }}>
        <HomeRandomStrip />
      </div>
    </div>
  );
}
