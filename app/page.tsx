import Link from "next/link";
import Hero from "@/components/hero";
import EventFeature from "@/components/event-feature";
import RecapVideo from "@/components/recap-video";
import { getPastEvents, getUpcomingEvents, shortDate, uniqueArtistCount, SHOTGUN_PAGE } from "@/data/events";
import { featuredPhotos } from "@/data/gallery";
import { site } from "@/data/site";

// Re-check once a day which show is "next".
export const revalidate = 86400;

export default function HomePage() {
  const upcoming = getUpcomingEvents();
  const next = upcoming[0];
  const recaps = getPastEvents().filter((e) => e.promoSrc).slice(0, 3);
  const photos = featuredPhotos(8);

  const stats = [
    { value: "20+", label: "Events thrown" },
    { value: `${uniqueArtistCount()}+`, label: "Artists booked" },
    { value: `${site.since}`, label: "Underground since" },
  ];

  return (
    <>
      <Hero next={next} />

      {/* NEXT UP */}
      <section className="section">
        <div className="container">
          <div className="section-head" data-reveal>
            <div>
              <div className="mono red">Next up</div>
              <h2 className="display section-title" style={{ marginTop: 12 }}>
                On the floor
              </h2>
            </div>
            <Link href="/events" className="link-arrow">
              All events →
            </Link>
          </div>

          {next ? (
            <EventFeature event={next} />
          ) : (
            <div data-reveal style={{ border: "1px solid var(--line)", padding: "56px 28px", textAlign: "center" }}>
              <div className="display" style={{ fontSize: "clamp(40px, 6vw, 72px)" }}>
                New dates soon
              </div>
              <p className="dim" style={{ marginTop: 12 }}>
                Follow us on Instagram or Telegram to hear first.
              </p>
              <a href={SHOTGUN_PAGE} target="_blank" rel="noreferrer" className="btn" style={{ marginTop: 24 }}>
                Follow on Shotgun ↗
              </a>
            </div>
          )}

          {upcoming.length > 1 ? (
            <ul style={{ listStyle: "none", padding: 0, margin: "56px 0 0" }}>
              {upcoming.slice(1).map((e) => (
                <li key={e.id} className="hairline" style={{ padding: "20px 0", display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
                  <span className="mono">{shortDate(e.date)}</span>
                  <span className="display" style={{ fontSize: 28 }}>
                    {e.headline}
                  </span>
                  <a href={e.ticketsHref} target="_blank" rel="noreferrer" className="link-arrow">
                    Tickets ↗
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </section>

      {/* RECAPS */}
      {recaps.length ? (
        <section className="section hairline">
          <div className="container">
            <div className="section-head" data-reveal>
              <div>
                <div className="mono red">Recaps</div>
                <h2 className="display section-title" style={{ marginTop: 12 }}>
                  Nights that were
                </h2>
              </div>
              <Link href="/events#past" className="link-arrow">
                Past events →
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {recaps.map((e, i) => (
                <article key={e.id} data-reveal style={{ ["--reveal-delay" as string]: `${i * 120}ms` }}>
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
          </div>
        </section>
      ) : null}

      {/* STATEMENT */}
      <section className="section hairline">
        <div className="container">
          <div className="mono red" data-reveal>
            Why we do this
          </div>
          <p className="display" data-reveal style={{ fontSize: "clamp(48px, 9vw, 140px)", marginTop: 24, maxWidth: 1100 }}>
            This isn&apos;t nightlife. <span style={{ color: "var(--red-hi)" }}>This is participation.</span>
          </p>
          <div className="grid gap-10 md:grid-cols-[1fr_1.4fr]" style={{ marginTop: 56 }}>
            <p className="dim" data-reveal style={{ fontSize: 18, maxWidth: 480, margin: 0 }}>
              Powerful sound systems, intentional production, raw warehouse energy, and a crowd that understands why
              they&apos;re there.
            </p>
            <dl className="grid grid-cols-3 gap-6" style={{ margin: 0 }}>
              {stats.map((s, i) => (
                <div key={s.label} data-reveal style={{ borderTop: "1px solid var(--line)", paddingTop: 16, ["--reveal-delay" as string]: `${i * 100}ms` }}>
                  <dd className="display" style={{ fontSize: "clamp(40px, 6vw, 80px)", margin: 0 }}>
                    {s.value}
                  </dd>
                  <dt className="mono" style={{ color: "var(--smoke-2)", marginTop: 8, fontSize: 11 }}>
                    {s.label}
                  </dt>
                </div>
              ))}
            </dl>
          </div>
          <Link href="/about" className="link-arrow" data-reveal style={{ display: "inline-block", marginTop: 48 }}>
            Read our manifesto →
          </Link>
        </div>
      </section>

      {/* FROM THE FLOOR */}
      <section className="section hairline">
        <div className="container">
          <div className="section-head" data-reveal>
            <div>
              <div className="mono red">Gallery</div>
              <h2 className="display section-title" style={{ marginTop: 12 }}>
                From the floor
              </h2>
            </div>
            <Link href="/gallery" className="link-arrow">
              All photos →
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {photos.map((p, i) => (
              <Link
                key={p.src}
                href={`/gallery?event=${p.key}`}
                className="media-hover"
                data-reveal
                style={{
                  aspectRatio: "4 / 5",
                  ["--reveal-delay" as string]: `${(i % 4) * 80}ms`,
                }}
              >
                <img src={p.src} alt="Brainwash crowd and DJ" loading="lazy" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* JOIN */}
      <section className="section hairline" style={{ background: "linear-gradient(to bottom, var(--bg), #140405)" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <div className="mono red" data-reveal>
            Join the movement
          </div>
          <h2 className="display" data-reveal style={{ fontSize: "clamp(56px, 11vw, 160px)", marginTop: 16 }}>
            Hear it first
          </h2>
          <p className="dim" data-reveal style={{ maxWidth: 520, margin: "20px auto 0", fontSize: 17 }}>
            Follow along for lineups, locations and ticket drops.
          </p>
          <div data-reveal style={{ marginTop: 36, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href={site.socials.telegram} target="_blank" rel="noreferrer" className="btn btn-solid">
              Telegram ↗
            </a>
            <a href={site.socials.instagram} target="_blank" rel="noreferrer" className="btn">
              Instagram ↗
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
