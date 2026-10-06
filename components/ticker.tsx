import { site } from "@/data/site";

export default function Ticker({ items = site.genres }: { items?: string[] }) {
  // The list is rendered twice so the loop is seamless at -50%.
  const row = [...items, ...items];
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">
        {[0, 1].map((copy) => (
          <div key={copy} style={{ display: "inline-flex" }}>
            {row.map((g, i) => (
              <span key={`${copy}-${i}`} className="ticker-item">
                {g}
                <span className="ticker-sep">/</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
