import type { Metadata } from "next";
import Link from "next/link";
import PageTitle from "@/components/page-title";
import EventFeature from "@/components/event-feature";
import { getPastEvents, getUpcomingEvents, shortDate, SHOTGUN_PAGE } from "@/data/events";

export const metadata: Metadata = { title: "Events" };
export const revalidate = 86400;

export default function EventsPage() {
  const upcoming = getUpcomingEvents();
  const past = getPastEvents();

  return (
    <>
      <PageTitle kicker="Atlanta · Warehouse · 18+" title="Events" intro="Every Brainwash night, from the next one back to the first. Tickets are sold on Shotgun." />

      <section className="container" style={{ paddingBottom: 96 }}>
        <div className="mono red" style={{ marginBottom: 32 }}>
          Upcoming
        </div>
        {upcoming.length ? (
          <div style={{ display: "grid", gap: 96 }}>
            {upcoming.map((e) => (
              <EventFeature key={e.id} event={e} />
            ))}
          </div>
        ) : (
          <div style={{ border: "1px solid var(--line)", padding: "48px 28px" }}>
            <div className="display" style={{ fontSize: 48 }}>
              New dates soon
            </div>
            <a href={SHOTGUN_PAGE} target="_blank" rel="noreferrer" className="btn" style={{ marginTop: 24 }}>
              Follow on Shotgun ↗
            </a>
          </div>
        )}
      </section>

      <section id="past" className="section hairline" style={{ scrollMarginTop: "var(--header-h)" }}>
        <div className="container">
          <div className="section-head" data-reveal>
            <div>
              <div className="mono red">Archive</div>
              <h2 className="display section-title" style={{ marginTop: 12 }}>
                Past events
              </h2>
            </div>
            <span className="mono" style={{ color: "var(--smoke-2)" }}>
              {past.length} nights
            </span>
          </div>

          <ul style={{ listStyle: "none", padding: 0, margin: 0, borderBottom: "1px solid var(--line)" }}>
            {past.map((e) => (
              <li key={e.id} className="hairline" data-reveal>
                <div className="grid items-center gap-4 py-6 grid-cols-[72px_1fr] md:grid-cols-[96px_140px_1fr_auto] md:gap-8">
                  <a href={e.ticketsHref} target="_blank" rel="noreferrer" className="media-hover" style={{ aspectRatio: "1 / 1" }}>
                    <img src={e.flyerSrc} alt={`${e.title} flyer`} loading="lazy" />
                  </a>
                  <span className="mono hidden md:block" style={{ color: "var(--smoke-2)" }}>
                    {shortDate(e.date)}
                  </span>
                  <div>
                    <span className="mono md:hidden" style={{ color: "var(--smoke-2)", fontSize: 11 }}>
                      {shortDate(e.date)}
                    </span>
                    <h3 className="display" style={{ fontSize: "clamp(26px, 4vw, 44px)" }}>
                      {e.headline}
                    </h3>
                    <div className="mono" style={{ color: "var(--smoke-2)", fontSize: 11, marginTop: 6 }}>
                      {[e.venue, ...e.tags].join(" · ")}
                    </div>
                  </div>
                  <div className="col-span-2 md:col-span-1" style={{ display: "flex", gap: 20 }}>
                    {e.gallery ? (
                      <Link href={`/gallery?event=${e.gallery}`} className="link-arrow">
                        Photos →
                      </Link>
                    ) : null}
                    <a href={e.ticketsHref} target="_blank" rel="noreferrer" className="link-arrow">
                      Shotgun ↗
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
