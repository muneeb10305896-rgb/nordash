"use client";
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function CTA({ modalType, setModalType }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-100px' });

  return (
    <section id="work" style={{ background: 'var(--midnight)', padding: '120px 24px', position: 'relative', overflow: 'hidden' }}>
      {/* Aurora background */}
      <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.14, 0.08] }} transition={{ duration: 10, repeat: Infinity }}
        style={{ position: 'absolute', top: '-30%', left: '50%', transform: 'translateX(-50%)', width: '800px', height: '600px', borderRadius: '50%', background: 'radial-gradient(ellipse, #00E5FF 0%, #7B61FF 50%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />

      {/* Truck art pattern */}
      <div className="truck-pattern" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />

      {/* Rotating truck art diamond border */}
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        style={{ position: 'absolute', top: '10%', left: '5%', width: 120, height: 120, border: '1px solid rgba(255,179,0,0.1)', transform: 'rotate(45deg)', pointerEvents: 'none' }} />
      <motion.div animate={{ rotate: -360 }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        style={{ position: 'absolute', bottom: '10%', right: '5%', width: 80, height: 80, border: '1px solid rgba(0,229,255,0.1)', transform: 'rotate(45deg)', pointerEvents: 'none' }} />

      <div ref={ref} style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'center', marginBottom: 32 }}
        >
          <div style={{ width: 40, height: 1, background: 'var(--truck-red)' }} />
          <span className="section-label-truck" style={{ color: 'var(--truck-red)' }}>Ready to Start?</span>
          <div style={{ width: 40, height: 1, background: 'var(--truck-red)' }} />
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
          className="font-syne"
          style={{ fontSize: 'clamp(40px, 7vw, 88px)', fontWeight: 800, lineHeight: 1.0, letterSpacing: '-0.03em', marginBottom: 24 }}
        >
          <span style={{ color: 'var(--text-primary)' }}>Let&apos;s Build Something</span>
          <br />
          <span className="text-gradient-aurora">Extraordinary.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          className="font-dm"
          style={{ fontSize: 17, color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: 560, margin: '0 auto 52px', fontWeight: 300 }}
        >
          Tell us what you&apos;re building. We&apos;ll tell you how to make it world-class.
          First consultation is always free.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
          style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 56 }}
        >
          <motion.button
            className="btn-primary"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setModalType('book-call')}
            style={{ padding: '16px 40px', fontSize: 13 }}
          >
            <span>Book a Free Call</span>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ position: 'relative', zIndex: 1 }}>
              <path d="M3.5 9h11M10 4l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.button>
          <motion.button
            className="btn-ghost"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setModalType('quote')}
            style={{ padding: '16px 40px', fontSize: 13, textDecoration: 'none' }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 3h12v10H2V3zm1 7h10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 3v7M8 10l-2 2h4l-2-2z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Request a Quote Online</span>
          </motion.button>
        </motion.div>

        {/* Trust row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 32, flexWrap: 'wrap' }}
        >
          {[
            { icon: '⚡', text: '24h response time' },
            { icon: '🔒', text: 'NDA on request' },
            { icon: '🌍', text: 'Remote-first, global' },
          ].map(({ icon, text }) => (
            <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 14 }}>{icon}</span>
              <span className="font-dm" style={{ fontSize: 12, color: 'var(--text-faint)', letterSpacing: '0.05em' }}>{text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
