'use client';

import { useRef, useEffect } from 'react';
import { useScroll } from 'framer-motion';

export default function TruckAuroraBackground() {
  const canvasRef = useRef(null);
  const animationIdRef = useRef(null);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const canvas = canvasRef.current;
    console.log('Canvas ref:', canvas);
    if (!canvas) {
      console.error('Canvas element not found in DOM!');
      return;
    }

    const ctx = canvas.getContext('2d', { alpha: true });
    console.log('Canvas context:', ctx);
    if (!ctx) {
      console.error('Failed to get canvas context!');
      return;
    }

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    console.log('Canvas size set to:', canvas.width, 'x', canvas.height);
    window.addEventListener('resize', setCanvasSize);

    let animationTime = 0;
    let debugLoggedOnce = false;

    const animate = () => {
      const w = canvas.width;
      const h = canvas.height;
      animationTime += 0.016; // ~60fps

      // Get scroll progress
      const scrollProgress = scrollYProgress.get ? scrollYProgress.get() : 0;

      // Debug: log once to verify scroll tracking
      if (!debugLoggedOnce) {
        console.log('Canvas initialized:', { w, h, scrollProgress });
        debugLoggedOnce = true;
      }

      // ========== BACKGROUND ==========
      const gradient = ctx.createLinearGradient(0, 0, 0, h);
      gradient.addColorStop(0, '#050A14');
      gradient.addColorStop(0.5, '#0D1626');
      gradient.addColorStop(1, '#050A14');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);

      // ========== STARFIELD ==========
      ctx.fillStyle = '#FFFFFF';
      ctx.globalAlpha = 0.7;
      for (let i = 0; i < 150; i++) {
        const x = (i * 79 + animationTime * 5) % w;
        const y = (i * 41 + Math.sin(i) * 100) % h;
        const size = 0.5 + (i % 3) * 0.5;
        ctx.fillRect(x, y, size, size);
      }
      ctx.globalAlpha = 1;

      // ========== TRUCK POSITION ==========
      const truckX = 50 + scrollProgress * (w - 100);
      const truckY = h * 0.35;

      // Debug: draw position indicator
      ctx.fillStyle = '#00FF00';
      ctx.globalAlpha = 0.7;
      ctx.fillRect(truckX - 30, truckY - 30, 60, 60);
      ctx.globalAlpha = 1;

      // ========== AURORA RIBBONS ==========
      const ribbonColors = ['#00E5FF', '#7B61FF', '#00FF94'];
      ribbonColors.forEach((color, idx) => {
        ctx.strokeStyle = color;
        ctx.globalAlpha = 0.5;
        ctx.lineWidth = 8;
        ctx.beginPath();

        const amplitude = 30 + idx * 20;
        const phase = idx * 2;

        for (let i = 0; i < 100; i++) {
          const x = truckX - (i / 100) * (scrollProgress * w + 200);
          const y = truckY + Math.sin(i * 0.1 + phase + animationTime * 0.5) * amplitude;
          i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }

        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
      });
      ctx.globalAlpha = 1;

      // ========== TRUCK BODY - SIMPLE & BIG ==========
      // Debug test rectangle - should be bright red and visible
      ctx.fillStyle = '#FF0000';
      ctx.globalAlpha = 0.9;
      ctx.fillRect(100, 100, 80, 50);
      ctx.globalAlpha = 1;

      // Main body (SAFFRON - BRIGHT YELLOW)
      ctx.fillStyle = '#FFB300';
      ctx.fillRect(truckX - 50, truckY - 30, 120, 60);

      // Cabin (COBALT)
      ctx.fillStyle = '#1A2B8C';
      ctx.fillRect(truckX + 50, truckY - 50, 50, 80);

      // Roof (EMERALD)
      ctx.fillStyle = '#007A4C';
      ctx.fillRect(truckX + 40, truckY - 65, 70, 20);

      // Wheels
      ctx.fillStyle = '#222222';
      ctx.beginPath();
      ctx.arc(truckX - 20, truckY + 30, 20, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(truckX + 80, truckY + 30, 20, 0, Math.PI * 2);
      ctx.fill();

      // Wheel hubs
      ctx.fillStyle = '#FFB300';
      ctx.beginPath();
      ctx.arc(truckX - 20, truckY + 30, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(truckX + 80, truckY + 30, 10, 0, Math.PI * 2);
      ctx.fill();

      // Headlights
      ctx.fillStyle = '#00E5FF';
      ctx.globalAlpha = 0.8;
      ctx.beginPath();
      ctx.arc(truckX + 100, truckY - 10, 15, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;

      // ========== EXHAUST PARTICLES ==========
      ctx.globalAlpha = 0.6;
      for (let i = 0; i < 80; i++) {
        const baseX = truckX + 50;
        const baseY = truckY - 40;
        const angle = (i / 80) * Math.PI * 2;
        const distance = 30 + Math.sin(animationTime * 2 + i) * 20;
        const x = baseX + Math.cos(angle) * distance;
        const y = baseY + Math.sin(angle) * distance;

        const colors = ['#FFB300', '#00E5FF', '#7B61FF'];
        ctx.fillStyle = colors[i % 3];
        ctx.shadowColor = colors[i % 3];
        ctx.shadowBlur = 20;

        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;

      // Continue animation
      animationIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [scrollYProgress]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        display: 'block',
      }}
    />
  );
}
