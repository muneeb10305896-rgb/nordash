'use client';

import { useRef, useEffect, useState } from 'react';
import { useScroll, useAnimationFrame } from 'framer-motion';

export default function TruckAuroraBackground() {
  const canvasRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const [scale, setScale] = useState(1);
  const particlesRef = useRef([]);
  const starsRef = useRef([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Initialize stars once
  useEffect(() => {
    if (starsRef.current.length === 0) {
      const count = 180;
      for (let i = 0; i < count; i++) {
        starsRef.current.push({
          x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1280),
          y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 720),
          size: Math.random() * 1.5 + 0.5,
          baseOpacity: Math.random() * 0.5 + 0.3,
          seed: Math.random(),
        });
      }
    }
  }, []);

  // Drawing functions
  const drawStars = (ctx, time) => {
    starsRef.current.forEach(star => {
      const opacity = star.baseOpacity + Math.sin(time * 0.5 + star.seed * 100) * 0.3;
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fill();
    });
  };

  const drawTruck = (ctx, x, y, scale) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);

    // Glow effect
    ctx.shadowBlur = 25;
    ctx.shadowColor = '#FFB300';

    // Draw body (saffron)
    ctx.fillStyle = '#FFB300';
    ctx.strokeStyle = '#1A2B8C';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-40, -15);
    ctx.lineTo(20, -15);
    ctx.lineTo(20, 15);
    ctx.lineTo(-40, 15);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Draw cabin (cobalt)
    ctx.fillStyle = '#1A2B8C';
    ctx.beginPath();
    ctx.moveTo(-40, -15);
    ctx.lineTo(-20, -25);
    ctx.lineTo(-10, -25);
    ctx.lineTo(-10, 15);
    ctx.lineTo(-40, 15);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Cabin trim (emerald)
    ctx.strokeStyle = '#007A4C';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(-35, -10);
    ctx.lineTo(-35, 10);
    ctx.stroke();

    // Wheels (emerald)
    ctx.fillStyle = '#007A4C';
    ctx.beginPath();
    ctx.arc(-25, 18, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(5, 18, 8, 0, Math.PI * 2);
    ctx.fill();

    // Wheel hubs
    ctx.fillStyle = '#FFB300';
    ctx.beginPath();
    ctx.arc(-25, 18, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(5, 18, 4, 0, Math.PI * 2);
    ctx.fill();

    // Decorative diamonds on body
    ctx.fillStyle = '#007A4C';
    ctx.beginPath();
    ctx.moveTo(-20, 0);
    ctx.lineTo(-15, -5);
    ctx.lineTo(-10, 0);
    ctx.lineTo(-15, 5);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(5, -5);
    ctx.lineTo(10, 0);
    ctx.lineTo(5, 5);
    ctx.closePath();
    ctx.fill();

    // Headlights (cyan glow)
    const headlightGrad = ctx.createRadialGradient(-35, -15, 0, -35, -15, 6);
    headlightGrad.addColorStop(0, 'rgba(0, 229, 255, 0.8)');
    headlightGrad.addColorStop(1, 'rgba(0, 229, 255, 0)');
    ctx.fillStyle = headlightGrad;
    ctx.beginPath();
    ctx.arc(-35, -15, 6, 0, Math.PI * 2);
    ctx.fill();

    // Exhaust stack (for particle emission)
    ctx.strokeStyle = '#555';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-15, -30);
    ctx.lineTo(-15, -40);
    ctx.stroke();

    ctx.restore();
  };

  const drawAuroraRibbon = (ctx, x, y, length, color, phase, amplitude, time) => {
    const points = 60;
    const shimmer = 0.15 + 0.25 * Math.sin(time * 0.5 + phase);

    ctx.beginPath();
    for (let i = 0; i <= points; i++) {
      const px = x - (i / points) * length;
      const py = y + Math.sin(i * 0.18 + phase + time * 0.4) * amplitude * (1 - i / points);
      i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }

    const grad = ctx.createLinearGradient(x, y, x - length, y);
    grad.addColorStop(0, color + 'CC');
    grad.addColorStop(0.4, color + '66');
    grad.addColorStop(1, color + '00');

    ctx.strokeStyle = grad;
    ctx.lineWidth = 3 + Math.sin(time + phase) * 1.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.shadowBlur = 12;
    ctx.shadowColor = color;
    ctx.stroke();
  };

  const updateParticles = (x, y, time) => {
    const colors = ['#FFB300', '#00E5FF', '#7B61FF', '#00FF94'];

    // Emit new particles
    for (let i = 0; i < (isMobile ? 2 : 3); i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 1 + 0.5;
      particlesRef.current.push({
        x,
        y: y - 40,
        vx: Math.cos(angle) * speed - 2,
        vy: Math.sin(angle) * speed - 1.5,
        life: isMobile ? 60 : 100,
        maxLife: isMobile ? 60 : 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 2 + 1,
      });
    }

    // Update and draw particles
    particlesRef.current = particlesRef.current.filter(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.life--;
      p.vy -= 0.1; // gravity (upward)

      const alpha = (p.life / p.maxLife) * 0.8;
      ctx.fillStyle = p.color.replace(')', `, ${alpha})`).replace('rgb', 'rgba');
      ctx.shadowBlur = isMobile ? 4 : 8;
      ctx.shadowColor = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();

      return p.life > 0;
    });
  };

  let ctx = null;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    ctx = canvas.getContext('2d', { alpha: true, willReadFrequently: false });
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    return () => {
      particlesRef.current = [];
    };
  }, []);

  useAnimationFrame(time => {
    if (!canvasRef.current || !ctx) return;

    const canvas = canvasRef.current;
    const w = canvas.width / (typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1);
    const h = canvas.height / (typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1);

    // Clear canvas
    ctx.clearRect(0, 0, w, h);

    // Get scroll progress
    const progress = scrollYProgress.get();

    // Truck position
    const truckX = -200 + progress * (w + 400);
    const truckY = h * 0.28;
    const truckScale = isMobile ? 0.5 : 1;

    // Draw layers
    drawStars(ctx, time * 0.001);

    // Aurora ribbons
    if (!isMobile || progress > 0.2) {
      drawAuroraRibbon(ctx, truckX, truckY, progress * w * 1.2, '#00E5FF', 0, 60, time * 0.001);
      drawAuroraRibbon(ctx, truckX, truckY, progress * w * 1.2, '#7B61FF', 1.2, 90, time * 0.001);
      if (!isMobile) {
        drawAuroraRibbon(ctx, truckX, truckY, progress * w * 1.2, '#00FF94', 2.4, 45, time * 0.001);
      }
    }

    // Particles
    updateParticles(truckX, truckY, time * 0.001);

    // Truck
    drawTruck(ctx, truckX, truckY, truckScale);
  });

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
        opacity: 0.85,
        willChange: 'transform',
      }}
    />
  );
}
