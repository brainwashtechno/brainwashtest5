import Link from "next/link";

function Icon({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        width: 34,
        height: 34,
        borderRadius: 999,
        border: "1px solid rgba(255,255,255,0.18)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        color: "rgba(255,255,255,0.90)",
      }}
    >
      {children}
    </span>
  );
}

export default function SiteFooter() {
  // Replace these with your real links
  const links = {
    telegram: "https://t.me/brainwashtechno",
    instagram: "https://www.instagram.com/brainwashtechno/",
    tiktok: "https://www.tiktok.com/@brainwash.techno",
    youtube: "https://www.youtube.com/@brainwashtechno",
  };

  return (
    <footer style={{ borderTop: "1px solid rgba(255,255,255,0.08)", background: "rgba(0,0,0,0.55)", backdropFilter: "blur(16px)" }}>
      <div className="container" style={{ padding: "36px 20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 1.3fr", gap: 26 }}>
          <div>
            <div style={{ fontWeight: 800, letterSpacing: "0.08em" }}>BRAINWASH</div>
            <div style={{ marginTop: 10, color: "rgba(255,255,255,0.70)", fontSize: 13 }}>
              Operating since 2024.
              <br />
              © 2026 Brainwash. All rights reserved.
            </div>

            <div style={{ marginTop: 14, display: "flex", gap: 10 }}>
              <a href={links.telegram} target="_blank" rel="noreferrer">
                <Icon>
                  {/* Telegram */}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M22 2L2 11.5l7 2.5 2.5 7L22 2z" stroke="currentColor" strokeWidth="1.6" />
                    <path d="M9 14l10-8" stroke="currentColor" strokeWidth="1.6" />
                  </svg>
                </Icon>
              </a>
              <a href={links.instagram} target="_blank" rel="noreferrer">
                <Icon>
                  {/* Instagram */}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <rect x="7" y="7" width="10" height="10" rx="3" stroke="currentColor" strokeWidth="1.6" />
                    <path d="M16.5 7.5h.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    <path d="M12 10.2a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6z" stroke="currentColor" strokeWidth="1.6" />
                  </svg>
                </Icon>
              </a>
              <a href={links.tiktok} target="_blank" rel="noreferrer">
                <Icon>
                  {/* TikTok (simple) */}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M14 3v10.2a3.8 3.8 0 1 1-3-3.7" stroke="currentColor" strokeWidth="1.6" />
                    <path d="M14 6c1.1 2.1 2.9 3.2 5 3.5" stroke="currentColor" strokeWidth="1.6" />
                  </svg>
                </Icon>
              </a>
              <a href={links.youtube} target="_blank" rel="noreferrer">
                <Icon>
                  {/* YouTube */}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M21 12s0-3.3-.4-4.8a3 3 0 0 0-2.1-2.1C17 4.7 12 4.7 12 4.7s-5 0-6.5.4A3 3 0 0 0 3.4 7.2C3 8.7 3 12 3 12s0 3.3.4 4.8a3 3 0 0 0 2.1 2.1c1.5.4 6.5.4 6.5.4s5 0 6.5-.4a3 3 0 0 0 2.1-2.1c.4-1.5.4-4.8.4-4.8z"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    />
                    <path d="M10 9.7v4.6l4-2.3-4-2.3z" fill="currentColor" />
                  </svg>
                </Icon>
              </a>
            </div>
          </div>

          <div>
            <div style={{ fontWeight: 800, letterSpacing: "0.08em" }}>SITEMAP</div>
            <div style={{ display: "grid", gap: 8, marginTop: 12, fontSize: 13 }}>
              <Link href="/events" style={{ color: "rgba(255,255,255,0.75)" }}>Events</Link>
              <Link href="/gallery" style={{ color: "rgba(255,255,255,0.75)" }}>Gallery</Link>
              <Link href="/about" style={{ color: "rgba(255,255,255,0.75)" }}>About</Link>
              <Link href="/news" style={{ color: "rgba(255,255,255,0.75)" }}>News</Link>
              <Link href="/contact" style={{ color: "rgba(255,255,255,0.75)" }}>Contact</Link>
            </div>
          </div>

          <div>
            <div style={{ fontWeight: 800, letterSpacing: "0.08em" }}>LEGAL</div>
            <div style={{ marginTop: 12, color: "rgba(255,255,255,0.70)", fontSize: 13, display: "grid", gap: 8 }}>
              <div>18+ events unless stated otherwise.</div>
              <div>Tickets non-refundable unless the organizer specifies.</div>
              <div>By attending, you may be filmed/photographed.</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}