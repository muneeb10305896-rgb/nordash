"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MagneticButton from './MagneticButton';

const links = ['Services', 'Process', 'Work', 'About', 'Careers'];

export default function Navbar({ onStartProject }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        transition: 'background 0.5s, border-color 0.5s',
        background: scrolled ? 'rgba(8,16,31,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', height: 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" style={{ flexShrink: 0, filter: 'drop-shadow(0 0 6px rgba(255,179,0,0))', transition: 'filter 0.3s' }}
            onMouseEnter={e => e.currentTarget.style.filter = 'drop-shadow(0 0 6px #FFB300)'}
            onMouseLeave={e => e.currentTarget.style.filter = 'drop-shadow(0 0 6px rgba(255,179,0,0))'}
          >
            {/* Truck art border hexagon */}
            <path d="M 10 6 L 26 6 L 30 18 L 26 30 L 10 30 L 6 18 Z" stroke="#FFB300" strokeWidth="1.5" fill="none" />

            {/* Truck body */}
            <rect x="7" y="14" width="14" height="8" fill="#FFB300" rx="1" />

            {/* Truck cabin */}
            <polygon points="22,14 26,12 26,22 22,22" fill="#1A2B8C" />

            {/* Cabin trim */}
            <line x1="24" y1="14" x2="24" y2="22" stroke="#007A4C" strokeWidth="1" />

            {/* Wheels */}
            <circle cx="11" cy="23" r="2.5" fill="#007A4C" />
            <circle cx="20" cy="23" r="2.5" fill="#007A4C" />

            {/* Wheel hubs */}
            <circle cx="11" cy="23" r="1.2" fill="#FFB300" />
            <circle cx="20" cy="23" r="1.2" fill="#FFB300" />

            {/* Decorative diamonds */}
            <polygon points="14,16 15,15 16,16 15,17" fill="#007A4C" />
            <polygon points="20,16 21,15 22,16 21,17" fill="#007A4C" />
          </svg>
          <span className="font-syne" style={{ fontSize: 20, fontWeight: 800, letterSpacing: '0.12em', color: '#EDF2FF' }}>
            NORDASH
          </span>
        </a>

        {/* Desktop nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 36 }} className="hidden-mobile">
          {links.map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="underline-aurora" style={{ fontSize: 13, fontWeight: 500, color: 'rgba(237,242,255,0.55)', textDecoration: 'none', letterSpacing: '0.04em', transition: 'color 0.3s' }}
              onMouseEnter={e => e.target.style.color = '#EDF2FF'}
              onMouseLeave={e => e.target.style.color = 'rgba(237,242,255,0.55)'}
            >{l}</a>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <MagneticButton strength={0.32} className="hidden-mobile">
            <button className="btn-primary" style={{ padding: '10px 24px', fontSize: 11 }} onClick={onStartProject}>
              <span>Start Project</span>
            </button>
          </MagneticButton>

          {/* Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            style={{ display: 'none', flexDirection: 'column', gap: 5, padding: 6, background: 'none', border: 'none', cursor: 'pointer' }}
            className="show-mobile"
            aria-label="Menu"
          >
            {[0, 1, 2].map(i => (
              <motion.span key={i} animate={{
                rotate: open ? (i === 0 ? 45 : i === 2 ? -45 : 0) : 0,
                y: open ? (i === 0 ? 7 : i === 2 ? -7 : 0) : 0,
                opacity: open && i === 1 ? 0 : 1,
              }} style={{ display: 'block', width: 24, height: 2, background: '#EDF2FF', borderRadius: 2, transformOrigin: 'center' }} />
            ))}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ background: 'rgba(8,16,31,0.95)', backdropFilter: 'blur(20px)', borderTop: '1px solid rgba(255,255,255,0.07)', overflow: 'hidden' }}
          >
            <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 20 }}>
              {links.map((l, i) => (
                <motion.a key={l} href={`#${l.toLowerCase()}`}
                  initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                  onClick={() => setOpen(false)}
                  className="font-syne" style={{ fontSize: 18, fontWeight: 600, color: 'rgba(237,242,255,0.7)', textDecoration: 'none' }}
                >
                  {l}
                </motion.a>
              ))}
              <button className="btn-primary" style={{ marginTop: 8 }} onClick={() => { setOpen(false); onStartProject(); }}><span>Start Project</span></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) { .hidden-mobile { display: none !important; } .show-mobile { display: flex !important; } }
        @media (min-width: 769px) { .show-mobile { display: none !important; } }
      `}</style>
    </motion.nav>
  );
}
