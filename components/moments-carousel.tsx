"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef } from "react";

type Item = {
  src: string;
  key: "aiden" | "drakk" | "gioh";
};

function shuffle<T>(array: T[]) {
  return [...array].sort(() => Math.random() - 0.5);
}

function buildAllImages(): Item[] {
  const items: Item[] = [];

  for (let i = 1; i <= 20; i++) {
    items.push({
      src: `/media/aiden/AIDEN-${i}.jpg`,
      key: "aiden",
    });

    items.push({
      src: `/media/drakk/drakk-${i}.jpeg`,
      key: "drakk",
    });

    items.push({
      src: `/media/gioh/BWTGC-${i}.jpg`,
      key: "gioh",
    });
  }

  return items;
}

export default function HomeMomentsCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);

  const randomTen = useMemo(() => {
    const all = buildAllImages();
    return shuffle(all).slice(0, 10);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!containerRef.current) return;

    const scrollAmount = 400;
    containerRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div style={{ padding: "60px 20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 30,
        }}
      >
        <h2 style={{ fontSize: 32 }}>Moments</h2>

        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={() => scroll("left")}>←</button>
          <button onClick={() => scroll("right")}>→</button>
        </div>
      </div>

      <div
        ref={containerRef}
        style={{
          display: "flex",
          gap: 20,
          overflowX: "auto",
          scrollBehavior: "smooth",
        }}
      >
        {randomTen.map((item, index) => (
          <Link
            key={index}
            href={`/gallery?event=${item.key}`}
            style={{
              minWidth: 320,
              height: 420,
              position: "relative",
              borderRadius: 20,
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            <Image
              src={item.src}
              alt=""
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, 33vw"
              unoptimized
            />
          </Link>
        ))}
      </div>
    </div>
  );
}