"use client";
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const marqueeItems = [
  'Video Editing', '✦', 'Thumbnail Design', '✦', 'Social Media Marketing', '✦',
  'Software Development', '✦', 'Brand Strategy', '✦', 'UI/UX Design', '✦',
  'Video Editing', '✦', 'Thumbnail Design', '✦', 'Social Media Marketing', '✦',
  'Software Development', '✦', 'Brand Strategy', '✦', 'UI/UX Design', '✦',
];

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  // useTransform is GPU-composited — no JS per frame
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section ref={ref} style={{
      position: 'relative', minHeight: '100vh',
      display: 'flex', flexDirection: 'column',
      overflow: 'hidden', background: '#050A14',
    }}>

      {/* ── CSS-animated aurora orbs (compositor thread, zero JS cost) ── */}
      <div className="aurora-orb aurora-orb-1" />
      <div className="aurora-orb aurora-orb-2" />
      <div className="aurora-orb aurora-orb-3" />
      <div className="aurora-orb aurora-orb-4" />

      {/* ── Truck-art diamond grid (static, no animation cost) ── */}
      <div className="truck-pattern-dense" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }} />

      {/* ── Rotating geometric frame — CSS only, 2 divs ── */}
      <div style={{ position: 'absolute', top: '7%', right: '5%', width: 220, height: 220, pointerEvents: 'none', zIndex: 1 }}>
        {/* Outer square rotating clockwise */}
        <div style={{
          position: 'absolute', inset: 0,
          border: '1px solid rgba(255,179,0,0.18)',
          willChange: 'transform',
          animation: 'cssRotate 80s linear infinite',
        }} />
        {/* Inner diamond rotating counter */}
        <div style={{
          position: 'absolute', inset: '18%',
          border: '1px solid rgba(0,229,255,0.14)',
          willChange: 'transform',
          animation: 'cssRotateRev 55s linear infinite',
        }} />
        {/* Neon center dot */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          width: 10, height: 10,
          transform: 'translate(-50%, -50%) rotate(45deg)',
          background: 'rgba(255,179,0,0.5)',
          boxShadow: '0 0 16px rgba(255,179,0,0.6)',
        }} />
      </div>

      {/* ── Small frame bottom-left ── */}
      <div style={{ position: 'absolute', bottom: '22%', left: '3%', width: 100, height: 100, pointerEvents: 'none', zIndex: 1, opacity: 0.6 }}>
        <div style={{ position: 'absolute', inset: 0, border: '1px solid rgba(0,229,255,0.2)', willChange: 'transform', animation: 'cssRotate 45s linear infinite' }} />
        <div style={{ position: 'absolute', inset: '25%', border: '1px solid rgba(123,97,255,0.18)', willChange: 'transform', animation: 'cssRotateRev 30s linear infinite' }} />
      </div>

      {/* ── CSS-animated neon floating diamonds ── */}
      <div style={{ position: 'absolute', top: '28%', left: '4%', zIndex: 2, pointerEvents: 'none' }}>
        <div style={{ width: 12, height: 12, background: '#00E5FF', boxShadow: '0 0 20px #00E5FF, 0 0 40px rgba(0,229,255,0.4)', animation: 'diamondFloat 5s ease-in-out infinite', willChange: 'transform, opacity' }} />
      </div>
      <div style={{ position: 'absolute', top: '55%', left: '7%', zIndex: 2, pointerEvents: 'none' }}>
        <div style={{ width: 7, height: 7, background: '#7B61FF', boxShadow: '0 0 14px #7B61FF', animation: 'diamondFloat 7s ease-in-out infinite 1.5s', willChange: 'transform, opacity' }} />
      </div>
      <div style={{ position: 'absolute', top: '20%', left: '16%', zIndex: 2, pointerEvents: 'none' }}>
        <div style={{ width: 8, height: 8, background: '#FFB300', boxShadow: '0 0 14px rgba(255,179,0,0.8)', animation: 'diamondFloat 8s ease-in-out infinite 3s', willChange: 'transform, opacity' }} />
      </div>
      <div style={{ position: 'absolute', top: '40%', right: '4%', zIndex: 2, pointerEvents: 'none' }}>
        <div style={{ width: 10, height: 10, background: '#00FF94', boxShadow: '0 0 16px rgba(0,255,148,0.7)', animation: 'diamondFloat 6s ease-in-out infinite 0.5s', willChange: 'transform, opacity' }} />
      </div>

      {/* ── Main content — Framer Motion ONLY for one-shot entry animations ── */}
      <motion.div style={{
        y: contentY, opacity: contentOpacity,
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '120px 24px 80px', textAlign: 'center',
        position: 'relative', zIndex: 3,
        willChange: 'transform, opacity',
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

        {/* Headline lines — staggered, one-shot */}
        {[
          { text: 'We Build',       color: '#EDF2FF',  delay: 0.10 },
          { text: 'Digital Worlds', gradient: true,    delay: 0.22 },
          { text: null,             mixed: true,       delay: 0.34 },
        ].map(({ text, color, gradient, mixed, delay }) => (
          <div key={delay} style={{ overflow: 'hidden' }}>
            <motion.h1
              className="font-syne"
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.05, delay, ease: [0.23, 1, 0.32, 1] }}
              style={{
                fontSize: 'clamp(52px, 9.5vw, 124px)', fontWeight: 800,
                lineHeight: 0.93, letterSpacing: '-0.04em', display: 'block', marginBottom: 4,
                ...(gradient ? {
                  background: 'linear-gradient(135deg, #00E5FF 0%, #7B61FF 45%, #00FF94 100%)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  filter: 'drop-shadow(0 0 28px rgba(0,229,255,0.35))',
                } : {}),
                ...(color && !gradient ? { color } : {}),
              }}
            >
              {mixed ? (
                <>
                  <span style={{ color: '#EDF2FF' }}>That </span>
                  <span style={{ color: '#FFB300', textShadow: '0 0 50px rgba(255,179,0,0.65), 0 0 100px rgba(255,179,0,0.25)' }}>Convert.</span>
                </>
              ) : text}
            </motion.h1>
          </div>
        ))}

        {/* Subtext */}
        <motion.p
          className="font-dm"
          initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.50, ease: [0.23, 1, 0.32, 1] }}
          style={{ fontSize: 'clamp(15px, 1.8vw, 19px)', color: 'rgba(237,242,255,0.52)', maxWidth: 520, margin: '32px auto 52px', lineHeight: 1.76, fontWeight: 300 }}
        >
          Nordic precision meets Asian energy. Video, brand, code — crafted to perfection under one roof.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.64, ease: [0.23, 1, 0.32, 1] }}
          style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <button className="btn-primary" style={{ padding: '15px 44px', fontSize: 12 }}>
            <span>Start a Project</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ position: 'relative', zIndex: 1 }}>
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className="btn-ghost" style={{ padding: '15px 44px', fontSize: 12 }}>
            <span>See Our Work</span>
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}
        style={{ position: 'absolute', bottom: 60, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, zIndex: 4, pointerEvents: 'none' }}
      >
        <span style={{ fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(237,242,255,0.28)' }}>Scroll</span>
        {/* CSS bounce instead of framer-motion */}
        <div style={{ width: 1, height: 28, background: 'linear-gradient(to bottom, #00E5FF, transparent)', animation: 'scrollBounce 1.6s ease-in-out infinite', willChange: 'transform' }} />
      </motion.div>

      {/* Marquee — fully contained, backdrop-filter-light */}
      <div style={{
        position: 'relative', zIndex: 4,
        borderTop: '1px solid rgba(255,255,255,0.06)',
        overflow: 'hidden', padding: '13px 0',
        background: 'rgba(5,10,20,0.82)',
      }}>
        <div style={{
          display: 'flex', gap: 52, whiteSpace: 'nowrap',
          animation: 'marquee 32s linear infinite',
          width: 'max-content',
          willChange: 'transform',
        }}>
          {marqueeItems.map((item, i) => (
            <span key={i} className="font-syne" style={{
              fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase',
              color: item === '✦' ? '#FFB300' : 'rgba(237,242,255,0.33)',
              textShadow: item === '✦' ? '0 0 10px rgba(255,179,0,0.5)' : 'none',
            }}>{item}</span>
          ))}
        </div>
      </div>

      <style>{`@keyframes scrollBounce { 0%,100%{transform:translateY(0)}50%{transform:translateY(8px)} }`}</style>
    </section>
  );
}
