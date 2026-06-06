"use client";
import { useRef, useSyncExternalStore } from 'react';
import Marquee from 'react-fast-marquee';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import MagneticButton from './MagneticButton';

const marqueeItems = [
  { label: 'Video Editing',         accent: false },
  { label: '✦',                     accent: true  },
  { label: 'Thumbnail Design',      accent: false },
  { label: '✦',                     accent: true  },
  { label: 'Social Media Marketing',accent: false },
  { label: '✦',                     accent: true  },
  { label: 'Software Development',  accent: false },
  { label: '✦',                     accent: true  },
  { label: 'Brand Strategy',        accent: false },
  { label: '✦',                     accent: true  },
  { label: 'UI / UX Design',        accent: false },
  { label: '✦',                     accent: true  },
];

export default function Hero({ onStartProject }) {
  const ref = useRef(null);
  const isLowEnd = useSyncExternalStore(
    (callback) => {
      const mql = window.matchMedia('(max-width: 767px)');
      mql.addEventListener('change', callback);
      return () => mql.removeEventListener('change', callback);
    },
    () => window.innerWidth < 768,
    () => false
  );
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const contentY       = useTransform(scrollYProgress, [0, 1],    ['0%',  isLowEnd ? '0%' : '2%']);
  const contentOpacity = useTransform(scrollYProgress, [0.93, 1], [1,     0.15]);

  return (
    <section ref={ref} style={{
      position: 'relative', minHeight: '100vh',
      display: 'flex', flexDirection: 'column',
      overflow: 'hidden', background: '#050A14',
    }}>

      {/* ── CSS aurora orbs (compositor thread) ── */}
      <div className="aurora-orb aurora-orb-1" />
      <div className="aurora-orb aurora-orb-2" />
      <div className="aurora-orb aurora-orb-3" />
      <div className="aurora-orb aurora-orb-4" />

      {/* ── Subtle diamond grid ── */}
      <div className="truck-pattern-dense" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, opacity: 0.4 }} />

      {/* ── Subtle gradient overlay for text readability above 3D scene ── */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2,
        background: 'radial-gradient(ellipse at center, transparent 40%, rgba(5,10,20,0.55) 100%)',
      }} />

      {/* ── Rotating geometric frames (CSS only) ── */}
      <div style={{ position: 'absolute', top: '7%', right: '5%', width: 220, height: 220, pointerEvents: 'none', zIndex: 1 }}>
        <div style={{ position: 'absolute', inset: 0, border: '1px solid rgba(255,179,0,0.16)', willChange: 'transform', animation: 'cssRotate 80s linear infinite' }} />
        <div style={{ position: 'absolute', inset: '18%', border: '1px solid rgba(0,229,255,0.12)', willChange: 'transform', animation: 'cssRotateRev 55s linear infinite' }} />
        <div style={{ position: 'absolute', top: '50%', left: '50%', width: 10, height: 10, transform: 'translate(-50%,-50%) rotate(45deg)', background: 'rgba(255,179,0,0.5)', boxShadow: '0 0 16px rgba(255,179,0,0.6)' }} />
      </div>
      <div style={{ position: 'absolute', bottom: '22%', left: '3%', width: 100, height: 100, pointerEvents: 'none', zIndex: 1, opacity: 0.55 }}>
        <div style={{ position: 'absolute', inset: 0, border: '1px solid rgba(0,229,255,0.18)', willChange: 'transform', animation: 'cssRotate 45s linear infinite' }} />
        <div style={{ position: 'absolute', inset: '25%', border: '1px solid rgba(123,97,255,0.16)', willChange: 'transform', animation: 'cssRotateRev 30s linear infinite' }} />
      </div>

      {/* ── Anti-gravity neon diamonds (CSS + different timing for organic feel) ── */}
      {[
        { t: '28%', l: '4%',  size: 12, color: '#00E5FF', glow: 'rgba(0,229,255,0.4)',  dur: '5s',   delay: '0s'   },
        { t: '55%', l: '7%',  size: 7,  color: '#7B61FF', glow: 'rgba(123,97,255,0.5)', dur: '7.2s', delay: '1.5s' },
        ...(isLowEnd ? [] : [
          { t: '20%', l: '16%', size: 8,  color: '#FFB300', glow: 'rgba(255,179,0,0.5)',  dur: '8.5s', delay: '3.1s' },
          { t: '40%', r: '4%',  size: 10, color: '#00FF94', glow: 'rgba(0,255,148,0.4)',  dur: '6.3s', delay: '0.6s' },
          { t: '65%', r: '8%',  size: 6,  color: '#FF4081', glow: 'rgba(255,64,129,0.5)', dur: '9.1s', delay: '2.2s' },
          { t: '15%', l: '46%', size: 5,  color: '#00E5FF', glow: 'rgba(0,229,255,0.4)',  dur: '11s',  delay: '4.5s' },
        ]),
      ].map((d, i) => (
        <div key={i} style={{ position: 'absolute', top: d.t, left: d.l, right: d.r, zIndex: 2, pointerEvents: 'none' }}>
          <div style={{
            width: d.size, height: d.size,
            background: d.color,
            boxShadow: `0 0 ${d.size * 2}px ${d.color}, 0 0 ${d.size * 4}px ${d.glow}`,
            willChange: prefersReducedMotion ? 'auto' : 'transform, opacity',
            animation: prefersReducedMotion ? undefined : `diamondFloat ${d.dur} ease-in-out infinite ${d.delay}`,
          }} />
        </div>
      ))}

      {/* ── Main content ── */}
      <motion.div style={{
        y: contentY, opacity: contentOpacity, willChange: 'transform, opacity',
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '120px 24px 80px', textAlign: 'center',
        position: 'relative', zIndex: 3,
      }}>

        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
          style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 44 }}
        >
          <div style={{ width: 48, height: 1, background: 'linear-gradient(to right, transparent, #00E5FF)' }} />
          <span className="section-label" style={{ fontSize: 10, letterSpacing: '0.35em' }}>Full-Spectrum Digital Agency</span>
          <div style={{ width: 48, height: 1, background: 'linear-gradient(to left, transparent, #00E5FF)' }} />
        </motion.div>

        {/* Headline — overflow:hidden clips the slide-up for a reveal effect */}
        {[
          { text: 'We Build',       plain: true,    delay: 0.10 },
          { text: 'Digital Worlds', gradient: true,  delay: 0.23 },
          { text: null,             mixed: true,     delay: 0.36 },
        ].map(({ text, plain, gradient, mixed, delay }) => (
          <div key={delay} style={{ overflow: 'hidden' }}>
            <motion.h1
              className="font-syne"
              initial={{ y: 90, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.1, delay, ease: [0.23, 1, 0.32, 1] }}
              style={{
                fontSize: 'clamp(52px, 9.5vw, 124px)', fontWeight: 800,
                lineHeight: 0.92, letterSpacing: '-0.04em', display: 'block', marginBottom: 4,
                ...(gradient ? {
                  background: 'linear-gradient(135deg, #00E5FF 0%, #7B61FF 45%, #00FF94 100%)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  filter: 'drop-shadow(0 0 30px rgba(0,229,255,0.38))',
                } : {}),
                ...(plain ? { color: '#EDF2FF' } : {}),
              }}
            >
              {mixed ? (
                <>
                  <span style={{ color: '#EDF2FF' }}>That </span>
                  <span style={{ color: '#FFB300', textShadow: '0 0 55px rgba(255,179,0,0.7), 0 0 110px rgba(255,179,0,0.28)' }}>Convert.</span>
                </>
              ) : text}
            </motion.h1>
          </div>
        ))}

        {/* Sub */}
        <motion.p
          className="font-dm"
          initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.52, ease: [0.23, 1, 0.32, 1] }}
          style={{ fontSize: 'clamp(15px, 1.8vw, 18px)', color: 'rgba(237,242,255,0.5)', maxWidth: 520, margin: '32px auto 52px', lineHeight: 1.78, fontWeight: 300 }}
        >
          Nordic precision meets Asian energy. Video, brand, code — crafted to perfection under one roof.
        </motion.p>

        {/* CTAs — magnetic attraction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.66, ease: [0.23, 1, 0.32, 1] }}
          style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <MagneticButton strength={0.35}>
            <button className="btn-primary" style={{ padding: '16px 46px', fontSize: 12 }} onClick={() => onStartProject?.()}>
              <span>Start a Project</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ position: 'relative', zIndex: 1 }}>
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </MagneticButton>

          <MagneticButton strength={0.28}>
            <button
              className="btn-ghost"
              style={{ padding: '16px 46px', fontSize: 12 }}
              onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span>See Our Work</span>
            </button>
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}
        style={{ position: 'absolute', bottom: 60, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, zIndex: 4, pointerEvents: 'none' }}
      >
        <span style={{ fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(237,242,255,0.28)' }}>Scroll</span>
        <div style={{ width: 1, height: 28, background: 'linear-gradient(to bottom, #00E5FF, transparent)', willChange: 'transform', animation: 'scrollBounce 1.6s ease-in-out infinite' }} />
      </motion.div>

      {/* ── react-fast-marquee (better perf than CSS + pause on hover) ── */}
      <div style={{ position: 'relative', zIndex: 4, borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(5,10,20,0.84)' }}>
        <Marquee speed={36} gradient={false} pauseOnHover style={{ padding: '13px 0' }}>
          {marqueeItems.map((item, i) => (
            <span key={i} className="font-syne" style={{
              fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase',
              color: item.accent ? '#FFB300' : 'rgba(237,242,255,0.33)',
              textShadow: item.accent ? '0 0 10px rgba(255,179,0,0.5)' : 'none',
              marginRight: 48,
            }}>
              {item.label}
            </span>
          ))}
        </Marquee>
      </div>

    </section>
  );
}
