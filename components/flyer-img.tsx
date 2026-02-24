// components/flyer-img.tsx
import React from "react";

type Props = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean; // kept for compatibility with old calls (ignored)
};

/**
 * Flyers live in /public, so they MUST be referenced like "/flyers/xxx.png"
 * Never "public/..." and never without a leading "/".
 */
export default function FlyerImg({ src, alt, className }: Props) {
  // Normalize common bad inputs just in case something passes "public/..."
  let fixedSrc = src?.trim() || "";
  if (fixedSrc.startsWith("public/")) fixedSrc = fixedSrc.replace(/^public\//, "/");
  if (!fixedSrc.startsWith("/")) fixedSrc = "/" + fixedSrc;

  return (
    <img
      src={fixedSrc}
      alt={alt}
      loading="lazy"
      className={
        [
          "block h-full w-full object-cover object-center select-none",
          className || "",
        ].join(" ")
      }
      draggable={false}
    />
  );
}
