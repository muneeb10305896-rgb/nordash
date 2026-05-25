"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MagneticButton from './MagneticButton';

const links = ['Services', 'Process', 'Work', 'About', 'Careers'];

export default function Navbar() {
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
          <div style={{
            width: 32, height: 32,
            background: 'linear-gradient(135deg, #00E5FF, #7B61FF)',
            transform: 'rotate(45deg)',
            borderRadius: 4,
            flexShrink: 0,
          }} />
          <span className="font-syne" style={{ fontSize: 20, fontWeight: 800, letterSpacing: '0.12em', background: 'linear-gradient(135deg, #00E5FF, #7B61FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
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
            <button className="btn-primary" style={{ padding: '10px 24px', fontSize: 11 }}>
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
              <button className="btn-primary" style={{ marginTop: 8 }}><span>Start Project</span></button>
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
