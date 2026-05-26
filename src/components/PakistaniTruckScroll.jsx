'use client';
import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import TruckArtwork from './TruckArtwork';
import TruckParticles from './TruckParticles';

export default function PakistaniTruckScroll() {
  const [isMobile, setIsMobile] = useState(false);

  const rawProgress = useMotionValue(0);

  /* Spring smoothing on top of Lenis easing */
  const progress = useSpring(rawProgress, { stiffness: 60, damping: 24, mass: 0.5 });

  /* Truck X and Y pixel positions — computed reactively */
  const truckXPx = useMotionValue(0);
  const truckYPx = useMotionValue(0);

  /* Aurora intensity: dim → full → dim */
  const auroraOpacity = useTransform(
    progress,
    [0, 0.25, 0.5, 0.75, 1],
    [0.25, 0.70, 1.0, 0.70, 0.25]
  );

  /* Mobile breakpoint */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  /* PRIMARY: Lenis broadcasts scroll progress via custom event.
     FALLBACK: native window scroll event for non-Lenis environments. */
  useEffect(() => {
    const onLenis = (e) => rawProgress.set(e.detail.progress);
    window.addEventListener('lenis:scroll', onLenis);

    const onNative = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0) rawProgress.set(window.scrollY / max);
    };
    window.addEventListener('scroll', onNative, { passive: true });
    onNative();

    return () => {
      window.removeEventListener('lenis:scroll', onLenis);
      window.removeEventListener('scroll', onNative);
    };
  }, [rawProgress]);

  /* Diagonal path: starts top-right → ends bottom-left.
     Truck is flipped (scaleX:-1) so it faces LEFT — driving in the direction it moves. */
  useEffect(() => {
    const calc = (p) => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const tw = vw < 768 ? 300 : 540;
      const th = vw < 768 ? 168 : 300;
      const marginX = vw < 768 ? 10 : 24;
      const marginY = vw < 768 ? 20 : 40;

      /* X: +halfX (right) at p=0 → -halfX (left) at p=1 */
      const halfX = (vw - tw) / 2 - marginX;
      truckXPx.set(halfX - p * halfX * 2);

      /* Y: near top at p=0 → near bottom at p=1 */
      const topStart = marginY;
      const topEnd = vh - th - marginY;
      truckYPx.set(topStart + p * (topEnd - topStart));
    };

    const unsub = progress.on('change', calc);
    calc(progress.get());
    return unsub;
  }, [progress, truckXPx, truckYPx]);

  const truckW = isMobile ? 300 : 540;
  const truckH = isMobile ? 168 : 300;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        /* z=1: below <main> and <footer> (z=2) and Navbar (z=50).
           pointerEvents:none keeps every button/link clickable. */
        zIndex: 1,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {/* Twinkling starfield */}
      <div className="truck-scroll-stars" />

      {/* Ambient aurora orbs — intensity driven by scroll */}
      <motion.div
        style={{ opacity: auroraOpacity, position: 'absolute', inset: 0, pointerEvents: 'none' }}
      >
        <div className="truck-aurora-orb truck-aurora-1" />
        <div className="truck-aurora-orb truck-aurora-2" />
        <div className="truck-aurora-orb truck-aurora-3" />
      </motion.div>

      {/* Truck — diagonal path: top-right → bottom-left.
          scaleX:-1 flips truck to face LEFT so it drives in the direction it moves. */}
      <motion.div
        style={{
          position: 'absolute',
          top: truckYPx,
          left: '50%',
          translateX: '-50%',
          x: truckXPx,
          width: truckW,
          height: truckH,
          willChange: 'transform',
          /* Flip horizontally — truck now faces left (driving direction) */
          scaleX: -1,
        }}
      >
        {/* Aurora trail + exhaust particles */}
        <motion.div style={{ opacity: auroraOpacity, position: 'absolute', inset: 0 }}>
          <TruckParticles isMobile={isMobile} truckW={truckW} truckH={truckH} />
        </motion.div>

        {/* Truck SVG artwork */}
        <TruckArtwork isMobile={isMobile} />
      </motion.div>
    </div>
  );
}
