import FlyerImg from "@/components/flyer-img";
import { SectionHeader, Btn } from "@/components/ui";
import { newsPost } from "@/data/news";

export default function NewsPage() {
  return (
    <div className="container">
      <div className="section">
        <SectionHeader
          kicker=""
          title="News"
          subtitle="Updates, announcements, and the next chapter."
        />
      </div>

      <div className="panel" style={{ padding: 18 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
          {/* LEFT = flyer MUST show */}
          <div style={{ minHeight: 520 }}>
            <FlyerImg src={newsPost.flyerSrc} alt="Per Pleks flyer" />
          </div>

          {/* RIGHT = video BIG and not cut */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ position: "relative", aspectRatio: "16 / 9", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.10)" }}>
            <video
  src="/news/tsanews.mp4"
  autoPlay
  muted
  loop
  playsInline
  preload="metadata"
  controls={false}
  style={{
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
    borderRadius: 16,
  }}
/>

            </div>

            <div style={{ fontSize: 18, fontWeight: 900 }}>{newsPost.title}</div>

            <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 13, whiteSpace: "pre-wrap", lineHeight: 1.55 }}>
              {newsPost.body}
            </div>

            <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
              <Btn href={newsPost.ticketsHref} variant="primary" target="_blank">Tickets</Btn>
              <Btn href={newsPost.ticketsHref} variant="ghost" target="_blank">Brainwash on Shotgun</Btn>
            </div>
          </div>
        </div>
      </div>

      <div style={{ height: 70 }} />
    </div>
  );
}
