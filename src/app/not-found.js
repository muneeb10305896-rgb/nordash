'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--midnight)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', position: 'relative', overflow: 'hidden' }}>
      {/* Static background orb — one-shot fade-in */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.12 }} transition={{ duration: 2 }}
        style={{ position: 'absolute', inset: 0, width: '800px', height: '600px', borderRadius: '50%', background: 'radial-gradient(ellipse, #FF6B6B 0%, #FFB300 50%, transparent 70%)', filter: 'blur(100px)', pointerEvents: 'none', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ maxWidth: 600, textAlign: 'center', position: 'relative', zIndex: 1 }}
      >
        <div style={{ marginBottom: 32 }}>
          <div
            className="font-syne"
            style={{ fontSize: 128, fontWeight: 900, background: 'linear-gradient(135deg, #FF6B6B, #FFB300)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', margin: 0, lineHeight: 1 }}
          >
            404
          </div>
        </div>

        <h1 className="font-syne" style={{ fontSize: 40, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 16 }}>
          Page Not Found
        </h1>

        <p className="font-dm" style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 32 }}>
          Oops! The page you&apos;re looking for has wandered off into the digital void. Let&apos;s get you back on track.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <Link href="/">
            <motion.button
              className="btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ padding: '14px 36px', fontSize: 13, border: 'none', cursor: 'pointer' }}
            >
              <span>Back to Home</span>
            </motion.button>
          </Link>
          <Link href="/#services">
            <motion.button
              className="btn-ghost"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ padding: '14px 36px', fontSize: 13, border: 'none', cursor: 'pointer' }}
            >
              <span>Explore Services</span>
            </motion.button>
          </Link>
        </motion.div>

        {/* Decorative elements — CSS animations (compositor-thread) */}
        <div style={{ position: 'absolute', top: -40, left: -40, width: 80, height: 80, border: '1px solid rgba(255,107,107,0.1)', transform: 'rotate(45deg)', pointerEvents: 'none', animation: 'truckSpin 20s linear infinite' }} />
        <div style={{ position: 'absolute', bottom: -40, right: -40, width: 120, height: 120, border: '1px solid rgba(255,179,0,0.1)', transform: 'rotate(45deg)', pointerEvents: 'none', animation: 'truckSpin 30s linear infinite reverse' }} />
      </motion.div>
    </div>
  );
}
