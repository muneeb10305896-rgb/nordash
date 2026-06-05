"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // One-time mount read from localStorage (browser-only, can't run during SSR/render).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!localStorage.getItem('cookie_consent')) setVisible(true);
  }, []);

  const respond = (choice) => {
    localStorage.setItem('cookie_consent', choice);
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          style={{
            position: 'fixed', bottom: 20, left: '50%', transform: 'translateX(-50%)',
            zIndex: 99990,
            width: 'calc(100% - 40px)', maxWidth: 720,
            background: 'linear-gradient(135deg, #0F1D36 0%, #0A1326 100%)',
            border: '1px solid rgba(0,229,255,0.18)',
            borderRadius: 16,
            padding: '18px 24px',
            display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap',
            boxShadow: '0 24px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.03)',
          }}
        >
          <div style={{ flex: 1, minWidth: 180 }}>
            <p className="font-syne" style={{ fontSize: 13, fontWeight: 700, color: '#EDF2FF', margin: '0 0 3px' }}>
              We use cookies
            </p>
            <p className="font-dm" style={{ fontSize: 12, color: 'rgba(237,242,255,0.42)', margin: 0, lineHeight: 1.6 }}>
              Essential cookies for functionality and analytics.{' '}
              <Link href="/cookies" style={{ color: 'var(--aurora-cyan)', textDecoration: 'none' }}>
                Learn more
              </Link>
            </p>
          </div>
          <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
            <button
              onClick={() => respond('declined')}
              className="font-dm"
              style={{
                padding: '8px 16px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8,
                background: 'transparent', color: 'rgba(237,242,255,0.42)', fontSize: 12, cursor: 'pointer',
              }}
            >
              Decline
            </button>
            <button
              onClick={() => respond('accepted')}
              className="font-syne"
              style={{
                padding: '8px 20px', border: 'none', borderRadius: 8,
                background: 'linear-gradient(135deg, #00B8D4, #7B61FF)',
                color: '#fff', fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', cursor: 'pointer',
              }}
            >
              Accept All
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
