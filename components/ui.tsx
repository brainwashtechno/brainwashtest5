import Link from "next/link";

export function SectionHeader({
  kicker,
  title,
  subtitle,
  right,
}: {
  kicker?: string;
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
      <div>
        {kicker ? (
          <div style={{ letterSpacing: "0.25em", fontSize: 11, color: "rgba(255,255,255,0.65)", marginBottom: 8 }}>
            {kicker.toUpperCase()}
          </div>
        ) : null}
        <h1 style={{ fontSize: 44, lineHeight: 1.05, margin: 0 }}>{title}</h1>
        {subtitle ? <p style={{ marginTop: 10, color: "rgba(255,255,255,0.70)" }}>{subtitle}</p> : null}
      </div>
      {right ? <div>{right}</div> : null}
    </div>
  );
}

export function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "6px 10px",
        borderRadius: 999,
        fontSize: 12,
        border: "1px solid rgba(255,255,255,0.18)",
        color: "rgba(255,255,255,0.86)",
      }}
    >
      {children}
    </span>
  );
}

export function Btn({
  children,
  href,
  variant = "ghost",
  target,
}: {
  children: React.ReactNode;
  href: string;
  variant?: "primary" | "ghost";
  target?: string;
}) {
  const style: React.CSSProperties =
    variant === "primary"
      ? {
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "10px 16px",
          borderRadius: 999,
          background: "rgba(255,255,255,0.92)",
          color: "#000",
          fontSize: 13,
          fontWeight: 600,
        }
      : {
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "10px 16px",
          borderRadius: 999,
          background: "transparent",
          color: "rgba(255,255,255,0.88)",
          fontSize: 13,
          fontWeight: 600,
          border: "1px solid rgba(255,255,255,0.22)",
        };

  return (
    <Link href={href} target={target} style={style}>
      {children}
    </Link>
  );
}
