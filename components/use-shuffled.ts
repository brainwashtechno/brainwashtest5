"use client";

import { useEffect, useState } from "react";

function shuffle<T>(items: T[]): T[] {
  const a = items.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * The first `count` items on the server, then a fresh random pick on every
 * page load in the browser. Callers should key rendered items by position so
 * the DOM nodes (and their scroll-reveal state) survive the swap.
 */
export function useShuffled<T>(items: T[], count: number): T[] {
  const [picked, setPicked] = useState(() => items.slice(0, count));
  useEffect(() => {
    setPicked(shuffle(items).slice(0, count));
    // Shuffle once per mount; `items` comes from static data.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return picked;
}
