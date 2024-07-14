"use client";
import React, { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  radius: number;
  color: string;
  alpha: number;
  alphaDirection: number;
  velocity: {
    x: number;
    y: number;
  };
}

const StarsAnimation: React.FC = ({ amount = 80 }: { amount?: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const getPrimaryColor = (): string => {
      const primaryRgb = getComputedStyle(document.documentElement)
        .getPropertyValue("--primary")
        .trim();
      return primaryRgb || "0, 136, 187";
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const createStars = (numStars: number): void => {
      const primaryColor = getPrimaryColor();
      for (let i = 0; i < numStars; i++) {
        const alpha = Math.random();
        starsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: 1.3,
          alpha: alpha,
          alphaDirection: alpha > 0.5 ? 1 : -1,
          color: `rgba(${primaryColor}, ${alpha})`,
          velocity: {
            x: (Math.random() - 0.1) * 1.5 * (Math.random() > 0.5 ? 1 : -1),
            y: (Math.random() - 0.1) * 1.5 * (Math.random() > 0.5 ? 1 : -1),
          },
        });
      }
    };

    const animateStars = (): void => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const primaryColor = getPrimaryColor();
      starsRef.current.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.shadowBlur = star.alpha * 10 + 3 - Math.random() * 3;
        ctx.shadowColor = star.color;
        ctx.strokeStyle = star.color;
        ctx.fillStyle = star.color;
        ctx.fill();
        ctx.stroke();

        // Oscillate star opacity
        star.alpha += 0.01 * star.alphaDirection;
        if (star.alpha > 1 || star.alpha < 0) {
          star.alphaDirection *= -1;
        }
        star.color = `rgba(${primaryColor}, ${star.alpha})`;

        // Update position and handle boundary collision
        star.x += star.velocity.x;
        star.y += star.velocity.y;

        if (star.x + star.radius > canvas.width || star.x - star.radius < 0) {
          star.velocity.x = -star.velocity.x;
        }
        if (star.y + star.radius > canvas.height || star.y - star.radius < 0) {
          star.velocity.y = -star.velocity.y;
        }
      });
      animationRef.current = requestAnimationFrame(animateStars);
    };

    createStars(amount);
    animateStars();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return <canvas ref={canvasRef} className="stars-animation" />;
};

export default StarsAnimation;
