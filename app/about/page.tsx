import type { Metadata } from "next";
import PageTitle from "@/components/page-title";
import Ticker from "@/components/ticker";

export const metadata: Metadata = { title: "About" };

const values = [
  {
    title: "Sound first",
    body: "We create spaces where sound comes first, where the dancefloor is not a backdrop but the main character. Music should be felt fully, without distraction, hierarchy, or separation.",
  },
  {
    title: "No VIP. No barriers.",
    body: "Just energy moving as one. Everyone on the floor is part of the same night.",
  },
  {
    title: "Respect, presence, connection",
    body: "We honor the foundations of rave culture. The dancefloor is a shared environment: a space for expression, awareness, and unity. Be mindful of one another, protect the atmosphere, stay in the moment.",
  },
  {
    title: "Stripped back",
    body: "Powerful sound systems, intentional production, raw warehouse energy, and a crowd that understands why they're there.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageTitle
        kicker="Atlanta underground techno collective"
        title="About"
        intro="Brainwash is an underground techno collective rooted in culture, intention, and experience."
      />

      <Ticker items={["This isn't nightlife", "This is participation"]} />

      <section className="section">
        <div className="container">
          <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {values.map((v, i) => (
              <li key={v.title} className="hairline grid gap-6 py-12 md:grid-cols-[120px_1fr_1.2fr] md:gap-12" data-reveal>
                <span className="mono red">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="display" style={{ fontSize: "clamp(36px, 5vw, 64px)" }}>
                  {v.title}
                </h2>
                <p className="dim" style={{ margin: 0, fontSize: 18 }}>
                  {v.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section hairline">
        <div className="container">
          <p className="display" data-reveal style={{ fontSize: "clamp(48px, 9vw, 140px)", maxWidth: 1100 }}>
            We don&apos;t just host events. <span style={{ color: "var(--red-hi)" }}>We cultivate experiences.</span>
          </p>
        </div>
      </section>
    </>
  );
}
