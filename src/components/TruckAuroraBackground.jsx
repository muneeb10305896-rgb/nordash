'use client';

import { useRef, useEffect, useState } from 'react';
import { useScroll, useAnimationFrame } from 'framer-motion';

export default function TruckAuroraBackground() {
  const canvasRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const scrollRef = useRef(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useAnimationFrame(() => {
    scrollRef.current = scrollYProgress.get();
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const animate = () => {
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      const progress = scrollRef.current;
      const time = Date.now() / 1000;

      // Clear canvas
      ctx.fillStyle = 'rgba(5, 10, 20, 0.1)';
      ctx.fillRect(0, 0, w, h);

      // Draw stars
      ctx.fillStyle = '#FFFFFF';
      for (let i = 0; i < 100; i++) {
        const x = (i * 73 + time * 10) % w;
        const y = (i * 41) % h;
        const size = (i % 3) * 0.5 + 0.5;
        ctx.fillRect(x, y, size, size);
      }

      // Truck position
      const truckX = -100 + progress * (w + 200);
      const truckY = h * 0.3;

      // Draw aurora ribbons
      for (let ribbon = 0; ribbon < 3; ribbon++) {
        const colors = ['#00E5FF', '#7B61FF', '#00FF94'];
        ctx.strokeStyle = colors[ribbon];
        ctx.globalAlpha = 0.4;
        ctx.lineWidth = 3;
        ctx.beginPath();

        for (let i = 0; i < 50; i++) {
          const x = truckX - (i / 50) * (progress * w);
          const y = truckY + Math.sin(i * 0.1 + ribbon + time) * 20;
          i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      ctx.globalAlpha = 1;

      // Draw truck - SIMPLE AND BIG
      ctx.save();
      ctx.translate(truckX, truckY);

      // Body (saffron)
      ctx.fillStyle = '#FFB300';
      ctx.fillRect(0, 0, 80, 40);

      // Cabin (cobalt)
      ctx.fillStyle = '#1A2B8C';
      ctx.fillRect(60, -15, 30, 50);

      // Roof (emerald)
      ctx.fillStyle = '#007A4C';
      ctx.fillRect(55, -20, 40, 8);

      // Wheels
      ctx.fillStyle = '#333333';
      ctx.beginPath();
      ctx.arc(15, 40, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(65, 40, 12, 0, Math.PI * 2);
      ctx.fill();

      // Wheel hubs
      ctx.fillStyle = '#FFB300';
      ctx.beginPath();
      ctx.arc(15, 40, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(65, 40, 6, 0, Math.PI * 2);
      ctx.fill();

      // Headlights
      ctx.fillStyle = '#00E5FF';
      ctx.globalAlpha = 0.8;
      ctx.beginPath();
      ctx.arc(80, 8, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(80, 32, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;

      // Decorations
      ctx.fillStyle = '#007A4C';
      ctx.fillRect(25, 12, 10, 10);
      ctx.fillRect(45, 12, 10, 10);

      ctx.restore();

      // Draw particles
      for (let i = 0; i < 50; i++) {
        const x = truckX + 40 + Math.sin(i + time) * 30;
        const y = truckY - 20 + (i / 50) * 60 + Math.cos(i + time * 2) * 20;
        const colors = ['#FFB300', '#00E5FF', '#7B61FF'];
        ctx.fillStyle = colors[i % 3];
        ctx.globalAlpha = 0.6;
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      requestAnimationFrame(animate);
    };

    animate();
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        background: 'linear-gradient(180deg, #050A14 0%, #0D1626 100%)',
      }}
    />
  );
}
