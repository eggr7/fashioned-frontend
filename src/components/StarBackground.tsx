"use client";
import { useRef, useEffect } from "react";
import { useTheme } from "next-themes";

export default function StarBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrame: number;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    const stars = Array.from({ length: 100 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5,
      s: Math.random() * 0.5 + 0.2,
    }));
    const draw = () => {
      if (!ctx) return;
      ctx.fillStyle = resolvedTheme === "dark" ? "#000" : "#f5faff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = resolvedTheme === "dark" ? "#fff" : "#94a3b8";
      stars.forEach((star) => {
        star.y += star.s;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fill();
      });
      animationFrame = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrame);
    };
  }, [resolvedTheme]);

  return (
    <canvas ref={canvasRef} className="fixed inset-0 -z-10" />
  );
}
