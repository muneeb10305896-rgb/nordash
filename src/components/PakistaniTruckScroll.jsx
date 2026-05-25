'use client';
import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import TruckArtwork from './TruckArtwork';
import TruckParticles from './TruckParticles';

export default function PakistaniTruckScroll() {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Map scroll (0-1) to truck X position (-20vw to +20vw)
  const truckX = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  // Truck bobs up/down at 50% scroll (midpoint)
  const truckY = useTransform(scrollYProgress, [0, 0.5, 1], [0, -3, 0]);

  // Aurora intensity based on scroll
  const particleOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 1, 0.4]);

  return (
    <motion.div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        background: 'linear-gradient(180deg, #0D1626 0%, #1A2B4A 50%, #0D1626 100%)',
        overflow: 'hidden'
      }}
    >
      {/* Background aurora orbs */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <div className="aurora-orb aurora-orb-1" />
        <div className="aurora-orb aurora-orb-2" />
      </div>

      {/* Main truck container - scroll-responsive */}
      <motion.div
        style={{
          x: truckX,
          y: truckY,
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: isMobile ? '200px' : '280px',
          height: isMobile ? '120px' : '160px'
        }}
      >
        {/* Truck SVG */}
        <TruckArtwork scrollProgress={scrollYProgress} isMobile={isMobile} />

        {/* Particles trailing behind truck */}
        <motion.div style={{ opacity: particleOpacity }}>
          <TruckParticles scrollProgress={scrollYProgress} isMobile={isMobile} />
        </motion.div>
      </motion.div>

      {/* Stars/ambient background */}
      <div className="truck-scroll-stars" />
    </motion.div>
  );
}
