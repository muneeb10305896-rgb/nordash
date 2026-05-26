'use client';
import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import TruckArtwork from './TruckArtwork';
import TruckParticles from './TruckParticles';

export default function PakistaniTruckScroll() {
  const [isMobile, setIsMobile] = useState(false);

  /* Raw 0-1 scroll progress from native scroll event.
     Reads window.scrollY directly — fully compatible with Lenis
     because Lenis still updates the real scroll position. */
  const rawProgress = useMotionValue(0);

  /* Spring on top of Lenis smoothing = extra silky feel */
  const progress = useSpring(rawProgress, {
    stiffness: 55,
    damping: 22,
    mass: 0.6,
  });

  /* Pixel X position — recomputed on every progress change so it
     reacts to window resize without remounting. */
  const truckXPx = useMotionValue(0);

  /* Slight vertical bob: highest at 50% scroll */
  const truckY = useTransform(
    progress,
    [0, 0.25, 0.5, 0.75, 1],
    [6, -2, -8, -2, 6]
  );

  /* Aurora intensity: dim at edges, peak at 50% scroll */
  const auroraOpacity = useTransform(
    progress,
    [0, 0.25, 0.5, 0.75, 1],
    [0.22, 0.65, 1.0, 0.65, 0.22]
  );

  /* Mobile breakpoint */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  /* Native scroll → rawProgress (works with Lenis) */
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0) rawProgress.set(window.scrollY / max);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [rawProgress]);

  /* progress → pixel X: truck travels from left viewport edge to right edge */
  useEffect(() => {
    const computeX = (p) => {
      const vw = window.innerWidth;
      const truckW = vw < 768 ? 260 : 460;
      const margin = vw < 768 ? 10 : 20;
      const halfRange = (vw - truckW) / 2 - margin;
      truckXPx.set(-halfRange + p * halfRange * 2);
    };
    const unsub = progress.on('change', computeX);
    computeX(progress.get());
    return unsub;
  }, [progress, truckXPx]);

  const truckW = isMobile ? 260 : 460;
  const truckH = isMobile ? 132 : 234;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {/* Twinkling starfield */}
      <div className="truck-scroll-stars" />

      {/* Ambient aurora background orbs — brighten with scroll */}
      <motion.div
        style={{
          opacity: auroraOpacity,
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
        }}
      >
        <div className="truck-aurora-orb truck-aurora-1" />
        <div className="truck-aurora-orb truck-aurora-2" />
        <div className="truck-aurora-orb truck-aurora-3" />
      </motion.div>

      {/* Truck container — moves horizontally with scroll */}
      <motion.div
        style={{
          position: 'absolute',
          top: '57%',          /* slightly below centre = sits on visual "road" */
          left: '50%',
          translateX: '-50%',
          translateY: '-50%',
          x: truckXPx,
          y: truckY,
          width: truckW,
          height: truckH,
          willChange: 'transform',
        }}
      >
        {/* CSS-animated particles: aurora trail + exhaust smoke */}
        <motion.div
          style={{ opacity: auroraOpacity, position: 'absolute', inset: 0 }}
        >
          <TruckParticles
            isMobile={isMobile}
            truckW={truckW}
            truckH={truckH}
          />
        </motion.div>

        {/* The truck SVG — aurora halo baked into SVG via overflow:visible */}
        <TruckArtwork isMobile={isMobile} />
      </motion.div>
    </div>
  );
}
