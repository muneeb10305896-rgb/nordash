'use client';
import { useMemo } from 'react';

const AURORA_COLORS = ['#00E5FF', '#7B61FF', '#FFB300', '#00E5FF', '#7B61FF'];
const EXHAUST_COLORS = ['#FFB300', '#FFD700', '#cccccc', '#FFB300'];

function sr(seed) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

export default function TruckParticles({ isMobile, truckW, truckH }) {
  const auroraCount = isMobile ? 16 : 32;
  const exhaustCount = isMobile ? 8 : 14;

  const auroraParticles = useMemo(() =>
    Array.from({ length: auroraCount }, (_, i) => ({
      id: i,
      left:     -(sr(i*17+1) * 0.62 * truckW + 36),
      top:      14 + sr(i*17+2) * (truckH - 28),
      size:     3 + sr(i*17+3) * (isMobile ? 6 : 11),
      color:    AURORA_COLORS[i % AURORA_COLORS.length],
      duration: 2.6 + sr(i*17+4) * 3.4,
      delay:    sr(i*17+5) * 4.8,
      driftX:   -(22 + sr(i*17+6) * 65),
      driftY:   -(10 + sr(i*17+7) * 55),
      opacity:  0.38 + sr(i*17+8) * 0.52,
    })),
  [auroraCount, isMobile, truckW, truckH]);

  /* Exhaust pipe in SVG is at x≈340/520, y≈4/230 of viewBox.
     In the truck div those map to ≈65% from left, ≈2% from top. */
  const exLeft = 0.645 * truckW;
  const exTop  = 0.020 * truckH;

  const exhaustParticles = useMemo(() =>
    Array.from({ length: exhaustCount }, (_, i) => ({
      id: i,
      left:     exLeft + (sr(i*23+1) - 0.5) * 16,
      top:      exTop  - sr(i*23+2) * 10,
      size:     4 + sr(i*23+3) * (isMobile ? 5 : 9),
      color:    EXHAUST_COLORS[i % EXHAUST_COLORS.length],
      duration: 1.6 + sr(i*23+4) * 2.4,
      delay:    sr(i*23+5) * 3.0,
      driftX:   (sr(i*23+6) - 0.5) * 22,
      driftY:   -(26 + sr(i*23+7) * 40),
      opacity:  0.48 + sr(i*23+8) * 0.42,
    })),
  [exhaustCount, isMobile, exLeft, exTop]);

  return (
    <div style={{ position:'absolute', inset:0, pointerEvents:'none', overflow:'visible' }}>

      {/* ── Broad aurora glow band behind truck ── */}
      <div style={{
        position: 'absolute',
        right: '96%',
        top: '8%',
        width:  isMobile ? '130px' : '260px',
        height: '84%',
        background: 'linear-gradient(to right, transparent, rgba(123,97,255,0.20) 38%, rgba(0,229,255,0.28) 78%, rgba(0,229,255,0.16))',
        filter: 'blur(20px)',
        borderRadius: '50%',
        transform: 'scaleY(1.5)',
      }}/>
      {/* Secondary saffron band */}
      <div style={{
        position: 'absolute',
        right: '90%',
        top: '28%',
        width:  isMobile ? '72px' : '150px',
        height: '44%',
        background: 'linear-gradient(to right, transparent, rgba(255,179,0,0.16) 55%, rgba(255,179,0,0.08))',
        filter: 'blur(14px)',
        borderRadius: '50%',
      }}/>

      {/* ── Aurora drift particles ── */}
      {auroraParticles.map(p => (
        <div
          key={`a${p.id}`}
          style={{
            position:        'absolute',
            left:            p.left,
            top:             p.top,
            width:           p.size,
            height:          p.size,
            borderRadius:    '50%',
            backgroundColor: p.color,
            boxShadow:       `0 0 ${p.size * 2.8}px ${p.color}`,
            opacity:         0,
            '--drift-x':     `${p.driftX}px`,
            '--drift-y':     `${p.driftY}px`,
            '--p-opacity':   p.opacity,
            animationName:           'auroraParticleDrift',
            animationDuration:       `${p.duration}s`,
            animationDelay:          `${p.delay}s`,
            animationTimingFunction: 'ease-out',
            animationIterationCount: 'infinite',
          }}
        />
      ))}

      {/* ── Exhaust smoke particles ── */}
      {exhaustParticles.map(p => (
        <div
          key={`e${p.id}`}
          style={{
            position:        'absolute',
            left:            p.left,
            top:             p.top,
            width:           p.size,
            height:          p.size,
            borderRadius:    '50%',
            backgroundColor: p.color,
            boxShadow:       `0 0 ${p.size * 2}px ${p.color}`,
            opacity:         0,
            '--drift-x':     `${p.driftX}px`,
            '--drift-y':     `${p.driftY}px`,
            '--p-opacity':   p.opacity,
            animationName:           'exhaustParticleRise',
            animationDuration:       `${p.duration}s`,
            animationDelay:          `${p.delay}s`,
            animationTimingFunction: 'ease-out',
            animationIterationCount: 'infinite',
          }}
        />
      ))}

      {/* ── Headlight beam cone (right side of truck) ── */}
      <div style={{
        position:        'absolute',
        left:            '91%',
        top:             '38%',
        width:           isMobile ? '55px' : '105px',
        height:          isMobile ? '36px' : '68px',
        background:      'radial-gradient(ellipse at left center, rgba(0,229,255,0.20) 0%, transparent 80%)',
        filter:          'blur(10px)',
        transform:       'scaleX(2)',
        transformOrigin: 'left center',
        borderRadius:    '0 50% 50% 0',
        animationName:           'headlightFlicker',
        animationDuration:       '3s',
        animationTimingFunction: 'ease-in-out',
        animationIterationCount: 'infinite',
      }}/>
    </div>
  );
}
