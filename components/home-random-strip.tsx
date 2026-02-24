"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

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

export default function HomeRandomStrip() {
  const randomTen = useMemo(() => {
    const all = buildAllImages();
    return shuffle(all).slice(0, 10);
  }, []);

  return (
    <div style={{ padding: "60px 20px" }}>
      <h2 style={{ fontSize: 32, marginBottom: 30 }}>Recaps</h2>

      <div
        style={{
          display: "flex",
          gap: 20,
          overflowX: "auto",
          scrollSnapType: "x mandatory",
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
              scrollSnapAlign: "start",
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