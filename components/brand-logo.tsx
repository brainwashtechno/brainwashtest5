import Link from "next/link";

export default function BrandLogo({ onClick }: { onClick?: () => void }) {
  return (
    <Link href="/" onClick={onClick} aria-label="Brainwash home" className="inline-flex items-center">
      <img src="/brainwash-logo.png" alt="Brainwash" width={919} height={231} style={{ height: 26, width: "auto" }} />
    </Link>
  );
}
