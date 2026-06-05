"use client";
import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

function useCountUp(target, duration, active) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCount(0); // reset count when element leaves viewport (driven by useInView, not derivable in render)
      return;
    }
    let raf;
    let startTime = null;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(eased * target));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);
  return count;
}

const stats = [
  { value: 150, suffix: '+', label: 'Projects Delivered', sub: 'Across 12 industries', accent: '#00E5FF' },
  { value: 40,  suffix: '+', label: 'Happy Clients',      sub: 'In 8 countries',      accent: '#7B61FF' },
  { value: 3,   suffix: 'M+',label: 'Views Generated',    sub: 'Combined reach',       accent: '#FFB300' },
  { value: 98,  suffix: '%', label: 'Client Retention',   sub: 'They always come back',accent: '#00FF94' },
];

function StatItem({ stat, index, active }) {
  const count = useCountUp(stat.value, 2, active);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
      style={{ textAlign: 'center', padding: '48px 24px', position: 'relative' }}
    >
      {/* Neon diamond */}
      <div style={{
        width: 7, height: 7, background: stat.accent, transform: 'rotate(45deg)',
        margin: '0 auto 20px',
        boxShadow: `0 0 14px ${stat.accent}, 0 0 28px ${stat.accent}60`,
      }} />

      <div className="font-syne" style={{
        fontSize: 'clamp(54px, 7vw, 82px)', fontWeight: 800,
        lineHeight: 1, letterSpacing: '-0.04em', color: stat.accent,
        textShadow: `0 0 40px ${stat.accent}70, 0 0 80px ${stat.accent}30`,
        marginBottom: 6,
      }}>
        {count}{stat.suffix}
      </div>
      <div className="font-syne" style={{ fontSize: 15, fontWeight: 600, color: '#EDF2FF', marginBottom: 6 }}>
        {stat.label}
      </div>
      <div className="font-dm" style={{ fontSize: 12, color: 'rgba(237,242,255,0.3)', letterSpacing: '0.06em' }}>
        {stat.sub}
      </div>

      {index < stats.length - 1 && (
        <div style={{ position: 'absolute', right: 0, top: '20%', height: '60%', width: 1, background: 'rgba(255,255,255,0.06)' }} className="stat-divider" />
      )}
    </motion.div>
  );
}

export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-100px' });

  return (
    <section ref={ref} style={{ background: '#0D1626', position: 'relative', overflow: 'hidden' }}>
      {/* Aurora gradient lines */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent 0%, rgba(0,229,255,0.5) 40%, rgba(123,97,255,0.5) 60%, transparent 100%)' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent 0%, rgba(255,179,0,0.4) 40%, rgba(0,229,255,0.4) 60%, transparent 100%)' }} />

      {/* Truck art corner glows */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: 220, height: 220, background: 'radial-gradient(circle at top left, rgba(255,179,0,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: 0, right: 0, width: 220, height: 220, background: 'radial-gradient(circle at bottom right, rgba(215,43,43,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
          {stats.map((s, i) => <StatItem key={s.label} stat={s} index={i} active={inView} />)}
        </div>
      </div>
      <style>{`@media (max-width: 640px) { .stat-divider { display: none; } }`}</style>
    </section>
  );
}
