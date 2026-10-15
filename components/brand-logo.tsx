import Link from "next/link";

export default function BrandLogo({ onClick }: { onClick?: () => void }) {
  return (
    <Link href="/" onClick={onClick} aria-label="Brainwash home" className="inline-flex items-center">
      <img src="/brainwash-echo.svg" alt="Brainwash" width={524} height={194} style={{ height: 36, width: "auto" }} />
    </Link>
  );
}
