"use client";

import { useEffect, useRef, useCallback, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * A grid that warps towards the pointer and ripples on click, drawn on a
 * canvas behind whatever you nest inside it.
 *
 * SCOPED TO ITS CONTAINER, NOT THE VIEWPORT. The version this is adapted from
 * sized itself to window.innerWidth/innerHeight, fixed the canvas to the
 * viewport and listened on window — correct for a full-page hero, wrong for a
 * band in the middle of a page, where it would have painted over every
 * section and reacted to a cursor nowhere near it. Here the canvas is
 * absolutely positioned inside the container, measured with a ResizeObserver,
 * and the pointer is read relative to the container's own box.
 *
 * Three other things it needs to survive on a real page:
 * - the loop stops when the band scrolls out of view or the tab is hidden, so
 *   a marketing page is not running requestAnimationFrame forever;
 * - the canvas is scaled by devicePixelRatio, or the lines are soft on retina;
 * - prefers-reduced-motion gets one static frame and no loop at all.
 *
 * The background is left transparent: the container owns its own colour, so
 * the band's ink tone stays defined in one place.
 */

interface Point {
  x: number;
  y: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  born: number;
}

const CELL_SIZE = 55;
const INFLUENCE_RADIUS = 260;
const MAX_WARP = 24;
const DOT_SPACING = 28;
const LERP_SPEED = 0.08;

const LINE_BASE = { r: 255, g: 255, b: 255, a: 0.13 };
const NODE_BASE = { r: 255, g: 255, b: 255, a: 0.2 };
const NODE_BASE_RADIUS = 1.8;
const NODE_ACTIVE_RADIUS = 3.2;

/** Far enough off-canvas that nothing is warped until the pointer arrives. */
const OFFSCREEN: Point = { x: -9999, y: -9999 };

/* The one accent, not the blue the original shipped with — this site keeps a
   single accent colour and mint (#0ffcbe) is it. */
const THEMES = {
  default: {
    lineActive: { r: 15, g: 252, b: 190, a: 0.9 },
    nodeActive: { r: 15, g: 252, b: 190, a: 1 },
    glow: "15,252,190",
    ripple: "15,252,190",
  },
  monochrome: {
    lineActive: { r: 255, g: 255, b: 255, a: 0.9 },
    nodeActive: { r: 255, g: 255, b: 255, a: 1 },
    glow: "255,255,255",
    ripple: "255,255,255",
  },
} as const;

function lerpN(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function lerpColor(
  base: { r: number; g: number; b: number; a: number },
  active: { r: number; g: number; b: number; a: number },
  t: number,
): string {
  const r = Math.round(lerpN(base.r, active.r, t));
  const g = Math.round(lerpN(base.g, active.g, t));
  const b = Math.round(lerpN(base.b, active.b, t));
  const a = lerpN(base.a, active.a, t);
  return `rgba(${r},${g},${b},${a.toFixed(3)})`;
}

export default function KineticGrid({
  children,
  className,
  globalColor = "default",
}: {
  children?: ReactNode;
  className?: string;
  globalColor?: "default" | "monochrome";
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const mouseRef = useRef<Point>({ ...OFFSCREEN });
  const targetMouseRef = useRef<Point>({ ...OFFSCREEN });
  const ripplesRef = useRef<Ripple[]>([]);
  const rafRef = useRef<number>(0);
  const sizeRef = useRef<{ w: number; h: number }>({ w: 0, h: 0 });

  const getWarpedPoint = useCallback(
    (
      gx: number,
      gy: number,
      col: number,
      row: number,
      mouse: Point,
      ripples: Ripple[],
      cols: number,
      rows: number,
    ): { pt: Point; proximity: number } => {
      /* Edge pin — smoothly locks the boundary rows and columns in place, so
         the grid never peels away from the container's corners. */
      const edgeMargin = 1.5;
      const colPin = Math.min(col / edgeMargin, (cols - 1 - col) / edgeMargin, 1);
      const rowPin = Math.min(row / edgeMargin, (rows - 1 - row) / edgeMargin, 1);
      const pinFactor = colPin * colPin * rowPin * rowPin;

      const dx = gx - mouse.x;
      const dy = gy - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      const proximity = Math.max(0, 1 - dist / INFLUENCE_RADIUS) * pinFactor;

      let rx = 0;
      let ry = 0;
      for (const r of ripples) {
        const rdx = gx - r.x;
        const rdy = gy - r.y;
        const rdist = Math.sqrt(rdx * rdx + rdy * rdy);
        const waveWidth = 55;
        const diff = rdist - r.radius;
        if (Math.abs(diff) < waveWidth) {
          const strength = (1 - Math.abs(diff) / waveWidth) * r.opacity * 18 * pinFactor;
          const angle = Math.atan2(rdy, rdx);
          const sign = diff < 0 ? -1 : 1;
          rx += Math.cos(angle) * strength * sign * -1;
          ry += Math.sin(angle) * strength * sign * -1;
        }
      }

      if (dist < INFLUENCE_RADIUS && dist > 0 && pinFactor > 0) {
        const t = dist / INFLUENCE_RADIUS;
        const eased = t < 0.01 ? 0 : (1 - t) * (1 - t) * Math.min(1, dist / 60);
        const warpAmt = eased * MAX_WARP * pinFactor;
        const angle = Math.atan2(dy, dx);
        return {
          pt: {
            x: gx - Math.cos(angle) * warpAmt + rx,
            y: gy - Math.sin(angle) * warpAmt + ry,
          },
          proximity,
        };
      }

      return { pt: { x: gx + rx, y: gy + ry }, proximity };
    },
    [],
  );

  const draw = useCallback(
    (now: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const { w: W, h: H } = sizeRef.current;
      if (W === 0 || H === 0) return;

      const mouse = mouseRef.current;
      const ripples = ripplesRef.current;
      const theme = THEMES[globalColor];

      /* Transparent, not filled: the container's own background shows through. */
      ctx.clearRect(0, 0, W, H);

      ctx.fillStyle = "rgba(255,255,255,0.05)";
      for (let x = DOT_SPACING / 2; x < W; x += DOT_SPACING) {
        for (let y = DOT_SPACING / 2; y < H; y += DOT_SPACING) {
          ctx.beginPath();
          ctx.arc(x, y, 0.7, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        const age = (now - r.born) / 1000;
        r.radius = Math.max(0, age * 400);
        r.opacity = Math.max(0, 1 - age * 1.2);
        if (r.opacity <= 0) ripples.splice(i, 1);
      }

      const cols = Math.max(2, Math.ceil(W / CELL_SIZE)) + 1;
      const rows = Math.max(2, Math.ceil(H / CELL_SIZE)) + 1;
      const cellW = W / (cols - 1);
      const cellH = H / (rows - 1);

      const pts: Point[][] = [];
      const prox: number[][] = [];

      for (let row = 0; row < rows; row++) {
        pts[row] = [];
        prox[row] = [];
        for (let col = 0; col < cols; col++) {
          const { pt, proximity } = getWarpedPoint(
            col * cellW,
            row * cellH,
            col,
            row,
            mouse,
            ripples,
            cols,
            rows,
          );
          pts[row][col] = pt;
          prox[row][col] = proximity;
        }
      }

      const drawSeg = (p1: Point, p2: Point, pr1: number, pr2: number) => {
        const avg = (pr1 + pr2) / 2;
        const t = avg * avg * (3 - 2 * avg); // smoothstep
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = lerpColor(LINE_BASE, theme.lineActive, t);
        ctx.lineWidth = lerpN(0.8, 1.5, t);
        ctx.stroke();
      };

      ctx.lineCap = "butt";

      for (let row = 0; row < rows; row++)
        for (let col = 0; col < cols - 1; col++)
          drawSeg(pts[row][col], pts[row][col + 1], prox[row][col], prox[row][col + 1]);

      for (let col = 0; col < cols; col++)
        for (let row = 0; row < rows - 1; row++)
          drawSeg(pts[row][col], pts[row + 1][col], prox[row][col], prox[row + 1][col]);

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const p = pts[row][col];
          const pr = prox[row][col];
          const t = pr * pr * (3 - 2 * pr); // smoothstep
          const r = lerpN(NODE_BASE_RADIUS, NODE_ACTIVE_RADIUS, t);

          if (t > 0.3) {
            const glowR = r + lerpN(0, 6, (t - 0.3) / 0.7);
            const grd = ctx.createRadialGradient(p.x, p.y, r * 0.5, p.x, p.y, glowR);
            grd.addColorStop(0, `rgba(${theme.glow},${(t * 0.3).toFixed(3)})`);
            grd.addColorStop(1, `rgba(${theme.glow},0)`);
            ctx.beginPath();
            ctx.arc(p.x, p.y, glowR, 0, Math.PI * 2);
            ctx.fillStyle = grd;
            ctx.fill();
          }

          ctx.beginPath();
          ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
          ctx.fillStyle = lerpColor(NODE_BASE, theme.nodeActive, t);
          ctx.fill();
        }
      }

      for (const r of ripples) {
        ctx.beginPath();
        ctx.arc(r.x, r.y, Math.max(0, r.radius), 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${theme.ripple},${(r.opacity * 0.28).toFixed(3)})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
    },
    [getWarpedPoint, globalColor],
  );

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const setSize = () => {
      const rect = host.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.round(rect.width);
      const h = Math.round(rect.height);
      if (w === 0 || h === 0) return;

      /* Backing store in device pixels, drawing in CSS pixels. Resizing the
         canvas resets the transform, so it is reapplied here every time. */
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      canvas.getContext("2d")?.setTransform(dpr, 0, 0, dpr, 0, 0);
      sizeRef.current = { w, h };

      if (reduced) draw(performance.now());
    };

    setSize();

    const ro = new ResizeObserver(setSize);
    ro.observe(host);

    /* Reduced motion: one static frame, no loop, no pointer reaction. */
    if (reduced) {
      return () => ro.disconnect();
    }

    const animate = (now: number) => {
      const m = mouseRef.current;
      const t = targetMouseRef.current;
      m.x = lerpN(m.x, t.x, LERP_SPEED);
      m.y = lerpN(m.y, t.y, LERP_SPEED);
      draw(now);
      rafRef.current = requestAnimationFrame(animate);
    };

    const start = () => {
      if (!rafRef.current) rafRef.current = requestAnimationFrame(animate);
    };

    const stop = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = 0;
      }
    };

    /* Only run while the band is on screen and the tab is in front. */
    let onScreen = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        if (onScreen && !document.hidden) start();
        else stop();
      },
      { rootMargin: "120px" },
    );
    io.observe(host);

    const onVisibility = () => {
      if (document.hidden) stop();
      else if (onScreen) start();
    };
    document.addEventListener("visibilitychange", onVisibility);

    /* Pointer position relative to the container, not the viewport. */
    const onPointerMove = (e: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      targetMouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const onPointerLeave = () => {
      targetMouseRef.current = { ...OFFSCREEN };
    };

    const onPointerDown = (e: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      ripplesRef.current.push({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        radius: 0,
        opacity: 1,
        born: performance.now(),
      });
    };

    host.addEventListener("pointermove", onPointerMove);
    host.addEventListener("pointerleave", onPointerLeave);
    host.addEventListener("pointerdown", onPointerDown);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      host.removeEventListener("pointermove", onPointerMove);
      host.removeEventListener("pointerleave", onPointerLeave);
      host.removeEventListener("pointerdown", onPointerDown);
    };
  }, [draw]);

  return (
    <div ref={hostRef} className={cn("relative isolate overflow-hidden", className)}>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      />
      <div className="relative">{children}</div>
    </div>
  );
}
