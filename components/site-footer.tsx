import Link from "next/link";
import { nav, site } from "@/data/site";

const socials = [
  { label: "Instagram", href: site.socials.instagram },
  { label: "Telegram", href: site.socials.telegram },
  { label: "TikTok", href: site.socials.tiktok },
  { label: "YouTube", href: site.socials.youtube },
  { label: "Shotgun", href: site.socials.shotgun },
];

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ borderTop: "1px solid var(--line)", background: "var(--bg)" }}>
      <div className="container" style={{ padding: "72px 20px 32px" }}>
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="display" style={{ fontSize: "clamp(56px, 10vw, 120px)" }}>
              Brainwash
            </div>
            <p className="mono dim" style={{ marginTop: 16 }}>
              {site.tagline} — since {site.since}
            </p>
          </div>

          <div>
            <div className="mono" style={{ color: "var(--smoke-2)", marginBottom: 16 }}>
              Pages
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 10 }}>
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link-arrow" style={{ borderBottom: 0 }}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="mono" style={{ color: "var(--smoke-2)", marginBottom: 16 }}>
              Follow
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 10 }}>
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noreferrer" className="link-arrow" style={{ borderBottom: 0 }}>
                    {s.label} ↗
                  </a>
                </li>
              ))}
            </ul>
            <a href={`mailto:${site.email}`} className="mono dim" style={{ display: "inline-block", marginTop: 20, textTransform: "none", letterSpacing: "0.04em" }}>
              {site.email}
            </a>
          </div>
        </div>

        <div
          className="mono"
          style={{
            marginTop: 64,
            paddingTop: 20,
            borderTop: "1px solid var(--line)",
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            justifyContent: "space-between",
            color: "var(--smoke-2)",
            fontSize: 11,
          }}
        >
          <span>© {year} Brainwash. All rights reserved.</span>
          <span>18+ unless stated otherwise · Tickets non-refundable unless the organizer specifies</span>
        </div>
      </div>
    </footer>
  );
}
