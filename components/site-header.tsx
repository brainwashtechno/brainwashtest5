import Link from "next/link";
import BrandLogo from "@/components/brand-logo";

const nav = [
  { href: "/events", label: "Events" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact" },
];

export default function SiteHeader() {
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 50 }}>
      <div
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          background: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(16px)",
        }}
      >
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
          <BrandLogo />
          <nav style={{ display: "flex", gap: 18, fontSize: 14 }}>
            {nav.map((i) => (
              <Link key={i.href} href={i.href} style={{ color: "rgba(255,255,255,0.88)" }}>
                {i.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}