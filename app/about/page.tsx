import { SectionHeader } from "@/components/ui";

export default function AboutPage() {
  return (
    <div className="container">
      <div className="section">
        <SectionHeader kicker="" title="About" subtitle="Who we are and what we build." />
      </div>

      <div className="panel" style={{ padding: 22, maxWidth: 920 }}>
        <p style={{ color: "rgba(255,255,255,0.80)", lineHeight: 1.7, margin: 0 }}>
        Brainwash is an underground techno collective rooted in culture, intention, and experience.

We create spaces where sound comes first — where the dancefloor is not a backdrop, but the main character. Our events are built on the belief that music should be felt fully, without distraction, hierarchy, or separation. No VIP. No barriers. Just energy moving as one.


We honor the foundations of rave culture: respect, presence, and connection.
The dancefloor is a shared environment — a space for expression, awareness, and unity. We encourage our community to be mindful of one another, to protect the atmosphere, and to stay immersed in the moment.

Brainwash is about stripping things back to what matters:
powerful sound systems, intentional production, raw warehouse energy, and a crowd that understands why they’re there.

This isn’t nightlife.
This is participation.

We don’t just host events —
we cultivate experiences.
        </p>
      </div>

      <div style={{ height: 80 }} />
    </div>
  );
}
