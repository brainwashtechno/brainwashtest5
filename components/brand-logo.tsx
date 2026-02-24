// components/brand-logo.tsx
import Link from "next/link";
import Image from "next/image";

export default function BrandLogo() {
  return (
    <Link href="/" className="inline-flex items-center gap-3 select-none">
      <Image
        src="/brainwash.png" // MUST start with /
        alt="Brainwash"
        width={180}
        height={48}
        priority
        unoptimized // IMPORTANT for StackBlitz/WebContainer reliability
        className="h-[44px] w-auto object-contain"
      />
    </Link>
  );
}
