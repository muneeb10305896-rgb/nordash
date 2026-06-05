'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const cookieTypes = [
  {
    name: 'Essential',
    color: '#00FF94',
    description: 'Required for the site to function. Cannot be disabled.',
    cookies: [
      { cookie: 'admin_token', purpose: 'Admin authentication session', duration: 'Session' },
      { cookie: 'cookie_consent', purpose: 'Stores your cookie preference (accepted / declined)', duration: '1 year' },
    ],
  },
  {
    name: 'Analytics',
    color: '#00E5FF',
    description: 'Help us understand how visitors use the site so we can improve it.',
    cookies: [
      { cookie: '_vercel_insights', purpose: 'Vercel Analytics — anonymous page view and interaction tracking', duration: '1 year' },
    ],
  },
  {
    name: 'Functionality',
    color: '#7B61FF',
    description: 'Remember choices you make to personalise your experience.',
    cookies: [
      { cookie: 'localStorage (various)', purpose: 'Stores UI state such as cookie consent preference', duration: 'Persistent' },
    ],
  },
];

export default function CookiesPolicy() {
  const [reset, setReset] = useState(false);

  const handleResetPreferences = () => {
    localStorage.removeItem('cookie_consent');
    setReset(true);
    setTimeout(() => window.location.reload(), 800);
  };

  return (
    <>
      <Navbar />
      <main style={{ background: 'var(--midnight)', minHeight: '100vh', paddingTop: 100 }}>

        {/* Hero strip */}
        <div style={{ position: 'relative', overflow: 'hidden', borderBottom: '1px solid var(--border)', padding: '64px 24px 56px' }}>
          <div style={{ position: 'absolute', top: '-40%', left: '60%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(0,229,255,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <div style={{ width: 32, height: 1, background: 'var(--aurora-cyan)' }} />
                <span className="font-dm" style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--aurora-cyan)' }}>Legal</span>
              </div>
              <h1 className="font-syne" style={{ fontSize: 'clamp(36px, 6vw, 56px)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 16, lineHeight: 1.1 }}>
                Cookies Policy
              </h1>
              <p className="font-dm" style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 8 }}>
                Last updated: <strong style={{ color: 'var(--text-primary)' }}>June 2025</strong>
              </p>
              <p className="font-dm" style={{ fontSize: 14, color: 'var(--text-muted)', maxWidth: 560, lineHeight: 1.8 }}>
                We use a small number of cookies to keep the site working and to understand how it&apos;s used. Here&apos;s exactly what we set and why.
              </p>
            </motion.div>
          </div>
        </div>

        <div style={{ maxWidth: 900, margin: '0 auto', padding: '60px 24px 80px' }}>

          {/* Cookie table by type */}
          {cookieTypes.map((type, i) => (
            <motion.div
              key={type.name}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{ marginBottom: 40, border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}
            >
              {/* Type header */}
              <div style={{ padding: '20px 24px', background: 'var(--surface)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: type.color, boxShadow: `0 0 8px ${type.color}` }} />
                <span className="font-syne" style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>{type.name} Cookies</span>
                <span className="font-dm" style={{ fontSize: 12, color: 'var(--text-muted)', marginLeft: 4 }}>— {type.description}</span>
              </div>

              {/* Table */}
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border)' }}>
                      {['Cookie / Key', 'Purpose', 'Duration'].map(h => (
                        <th key={h} className="font-syne" style={{ padding: '12px 24px', textAlign: 'left', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-faint)', background: 'rgba(255,255,255,0.02)' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {type.cookies.map((row, j) => (
                      <tr key={j} style={{ borderBottom: j < type.cookies.length - 1 ? '1px solid var(--border)' : 'none' }}>
                        <td className="font-dm" style={{ padding: '16px 24px', fontSize: 13, color: type.color, fontFamily: 'monospace', whiteSpace: 'nowrap' }}>{row.cookie}</td>
                        <td className="font-dm" style={{ padding: '16px 24px', fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>{row.purpose}</td>
                        <td className="font-dm" style={{ padding: '16px 24px', fontSize: 12, color: 'var(--text-faint)', whiteSpace: 'nowrap' }}>{row.duration}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          ))}

          {/* Managing preferences */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            style={{ border: '1px solid var(--border)', borderRadius: 12, padding: '28px 28px', marginBottom: 40, background: 'var(--surface)' }}
          >
            <h2 className="font-syne" style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>Manage Your Preferences</h2>
            <p className="font-dm" style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 20 }}>
              You can withdraw or change your cookie consent at any time. Clicking the button below clears your saved preference and shows the consent banner again on the next page load.
            </p>
            <button
              onClick={handleResetPreferences}
              disabled={reset}
              className="font-syne"
              style={{
                padding: '12px 28px', border: '1px solid var(--aurora-cyan)', borderRadius: 8,
                background: reset ? 'rgba(0,229,255,0.15)' : 'transparent',
                color: 'var(--aurora-cyan)', fontSize: 12, fontWeight: 700,
                letterSpacing: '0.08em', cursor: reset ? 'default' : 'pointer',
                transition: 'all 0.3s',
              }}
            >
              {reset ? 'Preferences reset — reloading…' : 'Reset Cookie Preferences'}
            </button>
          </motion.div>

          {/* Third-party & contact */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}
            className="cookies-grid"
          >
            <div style={{ border: '1px solid var(--border)', borderRadius: 12, padding: '24px 24px', background: 'var(--surface)' }}>
              <h2 className="font-syne" style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 10 }}>Third-Party Services</h2>
              <p className="font-dm" style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.8 }}>
                We use <strong style={{ color: 'var(--text-primary)' }}>Vercel Analytics</strong> for anonymous usage insights. No personal data is shared with third parties for advertising purposes.
              </p>
            </div>
            <div style={{ border: '1px solid var(--border)', borderRadius: 12, padding: '24px 24px', background: 'var(--surface)' }}>
              <h2 className="font-syne" style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 10 }}>Questions?</h2>
              <p className="font-dm" style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.8 }}>
                Contact us at{' '}
                <a href="mailto:hello@nordash.agency" style={{ color: '#FFB300', textDecoration: 'none' }}>hello@nordash.agency</a>{' '}
                or read our{' '}
                <Link href="/privacy" style={{ color: 'var(--aurora-cyan)', textDecoration: 'none' }}>Privacy Policy</Link>.
              </p>
            </div>
          </motion.div>

        </div>
      </main>

      <style>{`
        @media (max-width: 600px) {
          .cookies-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <Footer />
    </>
  );
}
