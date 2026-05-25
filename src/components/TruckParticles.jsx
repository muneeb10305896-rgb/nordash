'use client';
import { useEffect, useRef, useState } from 'react';

export default function TruckParticles({ scrollProgress, isMobile }) {
  const containerRef = useRef(null);
  const particlesRef = useRef([]);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const particleCount = isMobile ? 40 : 120;
    const colors = ['#00E5FF', '#7B61FF', '#FFB300'];

    // Initialize particles
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 60 - 30,
      y: Math.random() * 40 - 20,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 1.5,
      age: 0,
      lifetime: 3000 + Math.random() * 2000,
      color: colors[i % colors.length],
      size: Math.random() * 3 + 1,
      opacity: 1
    }));

    particlesRef.current = newParticles;
    setParticles(newParticles);

    // Animation loop
    const animationInterval = setInterval(() => {
      const updatedParticles = particlesRef.current.map((p) => {
        const newAge = p.age + 16;
        const progress = newAge / p.lifetime;

        if (progress > 1) {
          // Reset particle
          return {
            ...p,
            x: Math.random() * 60 - 30,
            y: Math.random() * 40 - 20,
            age: 0,
            opacity: 1
          };
        }

        return {
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy - 0.5, // Upward drift
          age: newAge,
          opacity: Math.max(0, 1 - progress * 1.5)
        };
      });

      particlesRef.current = updatedParticles;
      setParticles(updatedParticles);
    }, 16);

    return () => clearInterval(animationInterval);
  }, [isMobile]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none'
      }}
    >
      {/* Aurora trail particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          style={{
            position: 'absolute',
            left: `calc(50% + ${particle.x}px)`,
            top: `calc(50% + ${particle.y}px)`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            borderRadius: '50%',
            backgroundColor: particle.color,
            opacity: particle.opacity * 0.6,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
            filter: 'blur(0.5px)',
            transform: 'translate(-50%, -50%)',
            transition: 'none'
          }}
        />
      ))}

      {/* Exhaust particles - rise from pipe */}
      {particles.slice(0, Math.floor(particles.length * 0.3)).map((particle, i) => {
        const exhaustColors = ['#FFB300', '#FFD700', '#F5DEB3'];
        return (
          <div
            key={`exhaust-${i}`}
            style={{
              position: 'absolute',
              right: `${20 + Math.sin(i) * 10}px`,
              bottom: `${40 - particle.age / 50}px`,
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              backgroundColor: exhaustColors[i % exhaustColors.length],
              opacity: particle.opacity * 0.5,
              filter: 'blur(0.5px)',
              animation: `particleRise ${particle.lifetime}ms ease-out forwards`
            }}
          />
        );
      })}

      {/* Glow halo around truck */}
      <div
        style={{
          position: 'absolute',
          inset: '-20px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,229,255,0.2), transparent)',
          filter: 'blur(20px)',
          pointerEvents: 'none'
        }}
      />
    </div>
  );
}
