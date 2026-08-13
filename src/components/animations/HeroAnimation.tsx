'use client';

import { useEffect, useRef } from 'react';

type Blob = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  time: number;
  fallStart: number;
};

export default function HeroAnimation() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const blobsRef = useRef<Blob[]>([]);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    const LIFETIME = 3000;
    const SPAWN_SPACING = 20;
    const MAX_BLOBS = 1000;
    const HOLD_TIME_MIN = 500;
    const HOLD_TIME_MAX = 800;
    const GRAVITY = 0.02;

    const resizeCanvas = () => {
      const rect = parent.getBoundingClientRect();
      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    // Masks any element marked data-no-trail so the trail can never show
    // through it — covers both "never spawn here" AND "never drift/fall
    // in here" cases, since this runs every frame after blobs are drawn.
    const maskExcludedAreas = () => {
      const canvasRect = canvas.getBoundingClientRect();
      const excluded = document.querySelectorAll('[data-no-trail]');

      ctx.fillStyle = '#000000';
      excluded.forEach((el) => {
        const r = el.getBoundingClientRect();
        ctx.fillRect(
          r.left - canvasRect.left,
          r.top - canvasRect.top,
          r.width,
          r.height,
        );
      });
    };

    const render = () => {
      const width = parent.clientWidth;
      const height = parent.clientHeight;

      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      const now = performance.now();
      const blobs = blobsRef.current.filter((b) => now - b.time < LIFETIME);
      blobsRef.current = blobs;

      for (const blob of blobs) {
        if (now > blob.fallStart) {
          blob.vy += GRAVITY;
          blob.x += blob.vx;
          blob.y += blob.vy;
        }

        const age = now - blob.time;
        const lifeRatio = 1 - age / LIFETIME;
        const r = blob.radius * Math.max(0, Math.pow(lifeRatio, 1.6));

        ctx.beginPath();
        ctx.arc(blob.x, blob.y, r, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
      }

      maskExcludedAreas();

      rafRef.current = window.requestAnimationFrame(render);
    };

    const spawnAt = (x: number, y: number, speed: number) => {
      const wobble = Math.sin(performance.now() * 0.006 + x * 0.01) * 6;
      const radius = Math.max(24, 54 - speed * 6 + wobble) + Math.random() * 4;
      const now = performance.now();

      blobsRef.current.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 0.4,
        vy: 0,
        radius,
        time: now,
        fallStart: now + HOLD_TIME_MIN + Math.random() * (HOLD_TIME_MAX - HOLD_TIME_MIN),
      });

      if (Math.random() < 0.22) {
        blobsRef.current.push({
          x: x + (Math.random() - 0.5) * 10,
          y: y + Math.random() * 6,
          vx: (Math.random() - 0.5) * 0.6,
          vy: 0.1,
          radius: 4 + Math.random() * 8,
          time: now,
          fallStart: now + Math.random() * 60,
        });
      }

      if (blobsRef.current.length > MAX_BLOBS) {
        blobsRef.current.shift();
      }
    };

    const handlePointerMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
        lastPointRef.current = null;
        return;
      }

      const target = event.target as HTMLElement | null;
      if (target?.closest('[data-no-trail]')) {
        lastPointRef.current = null;
        return;
      }

      const prev = lastPointRef.current;
      if (prev) {
        const dx = x - prev.x;
        const dy = y - prev.y;
        const dist = Math.hypot(dx, dy);
        const speed = dist;

        const steps = Math.max(1, Math.floor(dist / SPAWN_SPACING));
        for (let i = 1; i <= steps; i += 1) {
          const t = i / steps;
          spawnAt(prev.x + dx * t, prev.y + dy * t, speed);
        }
      } else {
        spawnAt(x, y, 0);
      }

      lastPointRef.current = { x, y };
    };

    resizeCanvas();
    render();

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('resize', resizeCanvas);

    return () => {
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-20 h-full w-full"
      style={{ mixBlendMode: 'difference' }}
    >
      <canvas
        ref={canvasRef}
        className="h-full w-full"
        style={{
          filter: 'blur(7px) contrast(45) brightness(1.05)',
        }}
      />
    </div>
  );
}