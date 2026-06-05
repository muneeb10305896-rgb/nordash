'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--midnight)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', position: 'relative', overflow: 'hidden' }}>
      {/* Aurora background */}
      <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.12, 0.05] }} transition={{ duration: 12, repeat: Infinity }}
        style={{ position: 'absolute', inset: 0, width: '800px', height: '600px', borderRadius: '50%', background: 'radial-gradient(ellipse, #FF6B6B 0%, #FFB300 50%, transparent 70%)', filter: 'blur(100px)', pointerEvents: 'none', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ maxWidth: 600, textAlign: 'center', position: 'relative', zIndex: 1 }}
      >
        <div style={{ marginBottom: 32 }}>
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="font-syne"
            style={{ fontSize: 128, fontWeight: 900, background: 'linear-gradient(135deg, #FF6B6B, #FFB300)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', margin: 0, lineHeight: 1 }}
          >
            500
          </motion.div>
        </div>

        <h1 className="font-syne" style={{ fontSize: 40, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 16 }}>
          Something Went Wrong
        </h1>

        <p className="font-dm" style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 32 }}>
          We encountered an unexpected error. Our team has been notified and we&apos;re working to fix it.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <motion.button
            className="btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => reset()}
            style={{ padding: '14px 36px', fontSize: 13, border: 'none', cursor: 'pointer' }}
          >
            <span>Try Again</span>
          </motion.button>
          <Link href="/">
            <motion.button
              className="btn-ghost"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ padding: '14px 36px', fontSize: 13, border: 'none', cursor: 'pointer' }}
            >
              <span>Back to Home</span>
            </motion.button>
          </Link>
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{ position: 'absolute', top: -40, left: -40, width: 80, height: 80, border: '1px solid rgba(255,107,107,0.1)', transform: 'rotate(45deg)', pointerEvents: 'none' }}
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          style={{ position: 'absolute', bottom: -40, right: -40, width: 120, height: 120, border: '1px solid rgba(255,179,0,0.1)', transform: 'rotate(45deg)', pointerEvents: 'none' }}
        />
      </motion.div>
    </div>
  );
}
