"use client";

import { useEffect, useRef } from "react";

const AMOUNT_X = 44;
const AMOUNT_Y = 60;
const SEPARATION = 26;

export function DottedSurface({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      const { clientWidth, clientHeight } = canvas!;
      canvas!.width = clientWidth * dpr;
      canvas!.height = clientHeight * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    let count = 0;
    let frameId: number;

    function frame() {
      const width = canvas!.clientWidth;
      const height = canvas!.clientHeight;
      const centerX = width / 2;
      const centerY = height * 0.62;

      ctx!.clearRect(0, 0, width, height);

      for (let ix = 0; ix < AMOUNT_X; ix++) {
        for (let iy = 0; iy < AMOUNT_Y; iy++) {
          const x = (ix - AMOUNT_X / 2) * SEPARATION;
          const z = (iy - AMOUNT_Y / 2) * SEPARATION;

          const waveY =
            Math.sin((ix + count) * 0.3) * 35 + Math.sin((iy + count) * 0.5) * 35;

          const perspective = 420 / (420 + z);
          const screenX = centerX + x * perspective;
          const screenY = centerY + (waveY + 100) * perspective;

          if (screenX < -10 || screenX > width + 10 || screenY < -10 || screenY > height + 10) {
            continue;
          }

          const size = Math.max(0.5, 2.1 * perspective);
          ctx!.beginPath();
          ctx!.arc(screenX, screenY, size, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(214, 219, 232, ${Math.min(0.75, perspective * 0.85)})`;
          ctx!.fill();
        }
      }

      if (!prefersReducedMotion) count += 0.045;
      frameId = requestAnimationFrame(frame);
    }
    frameId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} />;
}
