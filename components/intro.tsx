"use client";

import { useEffect, useRef, useState } from "react";

/*
 * Opening sequence, played once per browser session (see the gate script in
 * app/layout.tsx). Raw and short: thin angular light lines crawl across the
 * black like failing tube lights, flare, and the black splits along the
 * main line and falls away to reveal the hero video underneath.
 * Any scroll, tap, click or key press skips it.
 */

// Timeline, in ms.
const T_LINE1 = 250;
const T_LINE2 = 650;
const T_DRAWN = 1700;
const T_FLARE = 1850;
const T_BREAK = 2050;
const BREAK_MS = 500;
const SKIP_FADE_MS = 220;

type Pt = { x: number; y: number };

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const rand = (a: number, b: number) => a + Math.random() * (b - a);

/** A diagonal line with square-ish notches, like the shapes in the hero loop. */
function zigzag(from: Pt, angle: number, length: number, S: number): Pt[] {
  const dir = { x: Math.cos(angle), y: Math.sin(angle) };
  const nrm = { x: -dir.y, y: dir.x };
  const pts: Pt[] = [from];
  let p = from;
  let travelled = 0;
  let side = Math.random() < 0.5 ? 1 : -1;
  while (travelled < length) {
    const run = rand(0.12, 0.3) * S;
    p = { x: p.x + dir.x * run, y: p.y + dir.y * run };
    pts.push(p);
    travelled += run;
    const jog = rand(0.015, 0.045) * S * side;
    const lean = rand(0.005, 0.02) * S;
    p = { x: p.x + nrm.x * jog + dir.x * lean, y: p.y + nrm.y * jog + dir.y * lean };
    pts.push(p);
    side = -side;
  }
  return pts;
}

/** Cumulative lengths, for drawing a polyline partially. */
function measure(pts: Pt[]) {
  const acc = [0];
  for (let i = 1; i < pts.length; i++) acc.push(acc[i - 1] + Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y));
  return acc;
}

function tracePartial(ctx: CanvasRenderingContext2D, pts: Pt[], acc: number[], k: number) {
  const target = acc[acc.length - 1] * clamp01(k);
  ctx.moveTo(pts[0].x, pts[0].y);
  for (let i = 1; i < pts.length; i++) {
    if (acc[i] <= target) {
      ctx.lineTo(pts[i].x, pts[i].y);
      continue;
    }
    const seg = (target - acc[i - 1]) / (acc[i] - acc[i - 1]);
    ctx.lineTo(pts[i - 1].x + (pts[i].x - pts[i - 1].x) * seg, pts[i - 1].y + (pts[i].y - pts[i - 1].y) * seg);
    break;
  }
}

/** Fluorescent-tube stutter: brief dropouts at random moments. */
function flickerSchedule(from: number, to: number, count: number) {
  return Array.from({ length: count }, () => {
    const at = rand(from, to);
    return [at, at + rand(30, 90), rand(0.05, 0.35)] as const;
  });
}

const flickerAt = (t: number, drops: ReturnType<typeof flickerSchedule>) => {
  for (const [a, b, level] of drops) if (t >= a && t < b) return level;
  return 1;
};

export default function Intro() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [state, setState] = useState<"idle" | "playing" | "breaking" | "skipping" | "done">("idle");

  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains("bw-intro")) {
      setState("done");
      return;
    }
    try {
      sessionStorage.setItem("bw-intro", "1");
    } catch {}

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = window.innerWidth;
    const H = window.innerHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;

    const cx = W / 2;
    const cy = H / 2;
    const S = Math.hypot(W, H) / 2;

    // Main line: crosses the whole screen near the centre, rising to the right.
    const angle = rand(-0.62, -0.42);
    const dir = { x: Math.cos(angle), y: Math.sin(angle) };
    const nrm = { x: -dir.y, y: dir.x };
    const off = rand(-0.06, 0.06) * S;
    const start1 = { x: cx - dir.x * S * 1.15 + nrm.x * off, y: cy - dir.y * S * 1.15 + nrm.y * off };
    const line1 = zigzag(start1, angle, S * 2.3, S);
    const acc1 = measure(line1);

    // Second, shorter line running roughly alongside it.
    const off2 = (Math.random() < 0.5 ? 1 : -1) * rand(0.18, 0.3) * S;
    const start2 = { x: cx - dir.x * S * 0.9 + nrm.x * off2, y: cy - dir.y * S * 0.9 + nrm.y * off2 };
    const line2 = zigzag(start2, angle + rand(-0.08, 0.08), S * rand(1.1, 1.5), S);
    const acc2 = measure(line2);

    // A few loose fragments that only blink.
    const frags = Array.from({ length: 4 }, () => {
      const at = { x: rand(0.1, 0.9) * W, y: rand(0.1, 0.9) * H };
      const pts = zigzag(at, angle + rand(-0.15, 0.15), S * rand(0.08, 0.2), S * 0.5);
      return { pts, on: rand(T_LINE2, T_DRAWN - 300), drops: flickerSchedule(T_LINE2, T_BREAK, 4) };
    });

    const drops1 = flickerSchedule(T_LINE1, T_FLARE, 5);
    const drops2 = flickerSchedule(T_LINE2, T_FLARE, 5);

    // The two halves of the black that split along the main line.
    const far = S * 3;
    const halfA = [...line1, { x: line1[line1.length - 1].x + nrm.x * far, y: line1[line1.length - 1].y + nrm.y * far }, { x: line1[0].x + nrm.x * far, y: line1[0].y + nrm.y * far }];
    const halfB = [...line1, { x: line1[line1.length - 1].x - nrm.x * far, y: line1[line1.length - 1].y - nrm.y * far }, { x: line1[0].x - nrm.x * far, y: line1[0].y - nrm.y * far }];
    const tilt = rand(0.015, 0.04);

    let raf = 0;
    let t0 = 0;
    let finished = false;
    let broke = false;

    const finish = (skipped: boolean) => {
      if (finished) return;
      finished = true;
      cancelAnimationFrame(raf);
      if (skipped) setState("skipping");
      window.setTimeout(
        () => {
          root.classList.remove("bw-intro");
          setState("done");
        },
        skipped ? SKIP_FADE_MS : 0
      );
    };

    const strokeLight = (draw: () => void, alpha: number, width: number, glow: number) => {
      ctx.save();
      ctx.lineJoin = "miter";
      ctx.lineCap = "square";
      ctx.shadowColor = `rgba(234,231,225,${alpha})`;
      ctx.shadowBlur = glow;
      ctx.strokeStyle = `rgba(234,231,225,${alpha})`;
      ctx.lineWidth = width;
      ctx.beginPath();
      draw();
      ctx.stroke();
      ctx.restore();
    };

    const fillHalf = (half: Pt[], sign: 1 | -1, k: number) => {
      const push = Math.pow(k, 2.2) * S * 0.8;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(sign * tilt * k);
      ctx.translate(-cx + nrm.x * push * sign, -cy + nrm.y * push * sign);
      ctx.beginPath();
      ctx.moveTo(half[0].x, half[0].y);
      for (let i = 1; i < half.length; i++) ctx.lineTo(half[i].x, half[i].y);
      ctx.closePath();
      ctx.fillStyle = "#000";
      ctx.fill();
      // The torn edge stays lit for a moment as it pulls away.
      strokeLight(() => tracePartial(ctx, line1, acc1, 1), 1 - k, 1.5, 14);
      ctx.restore();
    };

    const frame = (now: number) => {
      if (!t0) t0 = now;
      const t = now - t0;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      if (t < T_BREAK) {
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, W, H);

        const flare = clamp01((t - T_FLARE) / (T_BREAK - T_FLARE));
        const width = 1.2 + flare * 2;
        const glow = 10 + flare * 30;

        const k1 = (t - T_LINE1) / (T_DRAWN - T_LINE1);
        if (k1 > 0) strokeLight(() => tracePartial(ctx, line1, acc1, k1), 0.92 * flickerAt(t, drops1), width, glow);
        const k2 = (t - T_LINE2) / (T_DRAWN - T_LINE2);
        if (k2 > 0) strokeLight(() => tracePartial(ctx, line2, acc2, k2), 0.6 * flickerAt(t, drops2), width * 0.8, glow * 0.8);
        for (const f of frags) {
          if (t < f.on) continue;
          const fa = 0.35 * flickerAt(t, f.drops) * (Math.sin(t / 37 + f.on) > -0.6 ? 1 : 0.2);
          strokeLight(() => tracePartial(ctx, f.pts, measure(f.pts), 1), fa, 1, 8);
        }

        // Faint wash of light just before the break.
        if (flare > 0) {
          ctx.fillStyle = `rgba(234,231,225,${0.05 * flare})`;
          ctx.fillRect(0, 0, W, H);
        }
      } else {
        if (!broke) {
          broke = true;
          setState("breaking");
        }
        const k = clamp01((t - T_BREAK) / BREAK_MS);
        fillHalf(halfA, 1, k);
        fillHalf(halfB, -1, k);
        // One hard frame of light on the split.
        if (t - T_BREAK < 50) {
          ctx.fillStyle = "rgba(234,231,225,0.22)";
          ctx.fillRect(0, 0, W, H);
        }
        if (k >= 1) return finish(false);
      }
      raf = requestAnimationFrame(frame);
    };

    setState("playing");
    raf = requestAnimationFrame(frame);

    const skip = () => finish(true);
    const opts = { passive: true } as const;
    window.addEventListener("wheel", skip, opts);
    window.addEventListener("touchstart", skip, opts);
    window.addEventListener("pointerdown", skip, opts);
    window.addEventListener("keydown", skip);
    return () => {
      finished = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("wheel", skip);
      window.removeEventListener("touchstart", skip);
      window.removeEventListener("pointerdown", skip);
      window.removeEventListener("keydown", skip);
    };
  }, []);

  if (state === "done") return null;

  return (
    <div className="intro" data-state={state} aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
