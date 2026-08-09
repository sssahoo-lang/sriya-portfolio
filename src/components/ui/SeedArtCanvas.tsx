"use client";

import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import { ART_BG, drawSegments, generateSeedArt, type SeedArt } from "@/lib/seedArt";

export type SeedArtCanvasHandle = {
  /** Finishes any in-flight animation, then exports the completed piece. */
  getDataUrl: () => string | null;
};

const HEIGHT = 220;
const DRAW_DURATION_MS = 1100;

export const SeedArtCanvas = forwardRef<
  SeedArtCanvasHandle,
  { seed: string; onFamilyChange?: (family: string) => void }
>(function SeedArtCanvas({ seed, onFamilyChange }, ref) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const artRef = useRef<SeedArt | null>(null);
  const drawnRef = useRef(0);
  const frameRef = useRef<number | null>(null);
  const sizeRef = useRef({ width: 0, height: HEIGHT });

  const [ready, setReady] = useState(false);

  const resetCanvas = useCallback((ctx: CanvasRenderingContext2D) => {
    const { width, height } = sizeRef.current;
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = ART_BG;
    ctx.fillRect(0, 0, width, height);
  }, []);

  /**
   * Repaints the whole piece in a single pass.
   *
   * The progressive draw splits strokes at frame boundaries, and those splits add
   * extra round caps and double-blended alpha wherever they land, which varies with
   * frame timing. Redrawing once at the end keeps the finished (and exported) image
   * identical for a given word, every time.
   */
  const renderFinal = useCallback(() => {
    const canvas = canvasRef.current;
    const art = artRef.current;
    if (!canvas || !art) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    resetCanvas(ctx);
    drawSegments(ctx, art, 0, art.segmentCount);
    drawnRef.current = art.segmentCount;
  }, [resetCanvas]);

  const render = useCallback(
    (word: string) => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      const width = container.clientWidth;
      if (width === 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = HEIGHT * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${HEIGHT}px`;
      sizeRef.current = { width, height: HEIGHT };

      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }

      const art = generateSeedArt(word, width, HEIGHT);
      artRef.current = art;
      drawnRef.current = 0;
      onFamilyChange?.(art.family);
      resetCanvas(ctx);

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) {
        drawSegments(ctx, art, 0, art.segmentCount);
        drawnRef.current = art.segmentCount;
        setReady(true);
        return;
      }

      const startedAt = performance.now();
      const step = (now: number) => {
        const progress = Math.min(1, (now - startedAt) / DRAW_DURATION_MS);
        const target = Math.floor(art.segmentCount * progress);
        if (target > drawnRef.current) {
          drawSegments(ctx, art, drawnRef.current, target);
          drawnRef.current = target;
        }
        if (progress < 1) {
          frameRef.current = requestAnimationFrame(step);
        } else {
          frameRef.current = null;
          renderFinal();
        }
      };
      frameRef.current = requestAnimationFrame(step);
      setReady(true);
    },
    [onFamilyChange, resetCanvas, renderFinal],
  );

  // Debounced so typing settles before a new piece is generated.
  useEffect(() => {
    const timer = window.setTimeout(() => render(seed), 320);
    return () => window.clearTimeout(timer);
  }, [seed, render]);

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  useImperativeHandle(ref, () => ({
    getDataUrl: () => {
      const canvas = canvasRef.current;
      const art = artRef.current;
      if (!canvas || !art || art.segmentCount === 0) return null;

      // Always repaint in one pass first: the visitor may submit mid-animation, and
      // a partially-animated canvas is neither complete nor reproducible.
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
      renderFinal();
      return canvas.toDataURL("image/png");
    },
  }));

  return (
    <div ref={containerRef} className="overflow-hidden rounded-xl border border-line bg-cream">
      <canvas ref={canvasRef} className="block w-full" style={{ height: HEIGHT }} />
      {!ready && <div style={{ height: HEIGHT }} />}
    </div>
  );
});
