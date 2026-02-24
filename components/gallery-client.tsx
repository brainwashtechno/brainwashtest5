"use client";

import Image from "next/image";
import { useState } from "react";

type GalleryKey = "aiden" | "drakk" | "gioh";

function buildImages(key: GalleryKey) {
  const images: string[] = [];

  for (let i = 1; i <= 20; i++) {
    if (key === "aiden") {
      images.push(`/media/aiden/AIDEN-${i}.jpg`);
    }

    if (key === "drakk") {
      images.push(`/media/drakk/drakk-${i}.jpeg`);
    }

    if (key === "gioh") {
      images.push(`/media/gioh/BWTGC-${i}.jpg`);
    }
  }

  return images;
}

export default function GalleryClient({ initialEvent }: { initialEvent: GalleryKey }) {
  const [active, setActive] = useState<GalleryKey>(initialEvent);

  const images = buildImages(active);

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 20px" }}>
      {/* Tabs */}
      <div style={{ display: "flex", gap: 12, marginBottom: 40 }}>
        {(["aiden", "drakk", "gioh"] as GalleryKey[]).map((key) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            style={{
              padding: "10px 18px",
              borderRadius: 999,
              border: "1px solid #444",
              background: active === key ? "#fff" : "transparent",
              color: active === key ? "#000" : "#fff",
              cursor: "pointer",
            }}
          >
            {key}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 20,
        }}
      >
        {images.map((src) => (
          <div
            key={src}
            style={{
              position: "relative",
              width: "100%",
              height: 360,
              overflow: "hidden",
              borderRadius: 18,
            }}
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              style={{ objectFit: "cover" }}
              loading="lazy"
              unoptimized
            />
          </div>
        ))}
      </div>
    </div>
  );
}