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

  /* Truck pixel X — computed reactively so it handles resize */
  const truckXPx = useMotionValue(0);

  /* Subtle vertical bob at midpoint */
  const truckY = useTransform(progress, [0, 0.5, 1], [0, -10, 0]);

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

  /* PRIMARY: Lenis broadcasts its own scroll progress via custom event
     (emitted from SmoothScroll.jsx on every Lenis RAF tick).
     FALLBACK: native window scroll event for non-Lenis environments. */
  useEffect(() => {
    const onLenis = (e) => rawProgress.set(e.detail.progress);
    window.addEventListener('lenis:scroll', onLenis);

    /* Fallback — fires if Lenis isn't active */
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

  /* Map progress 0→1 to pixels: left viewport edge → right viewport edge */
  useEffect(() => {
    const calc = (p) => {
      const vw = window.innerWidth;
      const tw = vw < 768 ? 260 : 460;
      const margin = vw < 768 ? 10 : 24;
      const half = (vw - tw) / 2 - margin;
      truckXPx.set(-half + p * half * 2);
    };
    const unsub = progress.on('change', calc);
    calc(progress.get());
    return unsub;
  }, [progress, truckXPx]);

  const truckW = isMobile ? 260 : 460;
  const truckH = isMobile ? 132 : 234;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        /* zIndex 2: above all opaque section backgrounds (z=auto),
           below section text children (z=3+) and Navbar (z=50).
           pointerEvents:none keeps every button and link clickable. */
        zIndex: 2,
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

      {/* Truck — pinned to the bottom of the viewport (road position),
          moves left → right as the user scrolls down the page */}
      <motion.div
        style={{
          position: 'absolute',
          /* Road position: truck sits in the bottom strip of the screen */
          bottom: isMobile ? '2%' : '4%',
          left: '50%',
          translateX: '-50%',
          x: truckXPx,
          y: truckY,
          width: truckW,
          height: truckH,
          willChange: 'transform',
        }}
      >
        {/* Aurora trail + exhaust particles */}
        <motion.div style={{ opacity: auroraOpacity, position: 'absolute', inset: 0 }}>
          <TruckParticles isMobile={isMobile} truckW={truckW} truckH={truckH} />
        </motion.div>

        {/* Truck SVG — aurora halo baked in via SVG overflow:visible */}
        <TruckArtwork isMobile={isMobile} />
      </motion.div>
    </div>
  );
}
