"use client";

import { useEffect, useRef } from "react";

type Spark = { x: number; y: number; vx: number; vy: number; life: number; max: number; hue: number; size: number };
type Rocket = { x: number; y: number; vx: number; vy: number; targetY: number; hue: number; trail: Array<[number, number]> };

const HUES = [320, 335, 280, 265, 300, 45];

/** Lightweight canvas fireworks with glowing, fading trails. */
export function Fireworks({ intensity = 1 }: { intensity?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let w = 0;
    let h = 0;
    let raf = 0;
    let last = performance.now();
    let nextLaunch = 0;
    const rockets: Rocket[] = [];
    const sparks: Spark[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const launch = () => {
      const x = w * (0.15 + Math.random() * 0.7);
      rockets.push({
        x,
        y: h + 10,
        vx: (Math.random() - 0.5) * 1.2,
        vy: -(h * 0.011 + Math.random() * 3),
        targetY: h * (0.12 + Math.random() * 0.35),
        hue: HUES[Math.floor(Math.random() * HUES.length)],
        trail: [],
      });
    };

    const explode = (r: Rocket) => {
      const count = 70 + Math.floor(Math.random() * 50);
      const ring = Math.random() > 0.6;
      for (let i = 0; i < count; i++) {
        const a = (Math.PI * 2 * i) / count + Math.random() * 0.1;
        const speed = ring ? 4.2 : Math.random() * 5 + 1;
        const max = 60 + Math.random() * 50;
        sparks.push({
          x: r.x,
          y: r.y,
          vx: Math.cos(a) * speed,
          vy: Math.sin(a) * speed,
          life: max,
          max,
          hue: Math.random() > 0.85 ? 45 : r.hue + (Math.random() - 0.5) * 30,
          size: Math.random() * 1.6 + 0.8,
        });
      }
    };

    const tick = (now: number) => {
      const dt = Math.min(2, (now - last) / 16.67);
      last = now;

      // fade previous frame -> trails, while keeping canvas transparent
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0,0,0,0.2)";
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";

      if (now > nextLaunch) {
        launch();
        if (Math.random() > 0.6) launch();
        nextLaunch = now + (700 + Math.random() * 900) / intensity;
      }

      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.x += r.vx * dt;
        r.y += r.vy * dt;
        r.vy *= 0.985;
        r.trail.push([r.x, r.y]);
        if (r.trail.length > 10) r.trail.shift();
        ctx.strokeStyle = `hsla(${r.hue},100%,80%,0.8)`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        r.trail.forEach(([tx, ty], k) => (k ? ctx.lineTo(tx, ty) : ctx.moveTo(tx, ty)));
        ctx.stroke();
        if (r.y <= r.targetY || r.vy > -1.2) {
          explode(r);
          rockets.splice(i, 1);
        }
      }

      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.vx *= 0.975;
        s.vy = s.vy * 0.975 + 0.045 * dt;
        s.x += s.vx * dt;
        s.y += s.vy * dt;
        s.life -= dt;
        const p = s.life / s.max;
        if (p <= 0) {
          sparks.splice(i, 1);
          continue;
        }
        ctx.fillStyle = `hsla(${s.hue},100%,${60 + p * 25}%,${p})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * (0.5 + p), 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [intensity]);

  return <canvas ref={ref} aria-hidden className="pointer-events-none absolute inset-0" />;
}
