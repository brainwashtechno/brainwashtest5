import { Pill, Btn } from "@/components/ui";

export default function PromoCard({
  title,
  city,
  tags,
  videoSrc,
  recapHref,
  eventsHref = "/events",
  showRecap = true,
}: {
  title: string;
  city: string;
  tags: string[];
  videoSrc: string;
  recapHref?: string;
  eventsHref?: string;
  showRecap?: boolean;
}) {
  return (
    <div className="panel" style={{ overflow: "hidden" }}>
      <div style={{ position: "relative", aspectRatio: "16 / 9" }}>
        <video
          src={videoSrc}
          muted
          playsInline
          loop
          autoPlay
          controls={false}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.75), rgba(0,0,0,0.0))",
          }}
        />
      </div>

      <div style={{ padding: 16 }}>
        <div style={{ fontWeight: 700 }}>{title}</div>
        <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 13, marginTop: 4 }}>{city}</div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12 }}>
          {tags.map((t) => (
            <Pill key={t}>{t}</Pill>
          ))}
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
          <Btn href={eventsHref} variant="ghost">Events</Btn>
          {showRecap && recapHref ? <Btn href={recapHref} variant="ghost">Recap</Btn> : null}
        </div>
      </div>
    </div>
  );
}
