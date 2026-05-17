import { useEffect, useRef } from "react";

export function ParticleField({ density = 60, className = "" }: { density?: number; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0, h = 0, raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    type P = { x: number; y: number; vx: number; vy: number; r: number };
    let parts: P[] = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      parts = Array.from({ length: density }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.6 + 0.4,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      // links
      for (let i = 0; i < parts.length; i++) {
        const a = parts[i];
        a.x += a.vx; a.y += a.vy;
        if (a.x < 0 || a.x > w) a.vx *= -1;
        if (a.y < 0 || a.y > h) a.vy *= -1;
        for (let j = i + 1; j < parts.length; j++) {
          const b = parts[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < 130) {
            ctx.strokeStyle = `rgba(140, 120, 255, ${0.15 * (1 - d / 130)})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      for (const p of parts) {
        ctx.fillStyle = "rgba(180, 200, 255, 0.7)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, [density]);

  return <canvas ref={ref} className={`absolute inset-0 w-full h-full pointer-events-none ${className}`} />;
}
