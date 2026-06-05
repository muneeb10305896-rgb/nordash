"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const footerLinks = {
  Services: [
    { label: 'Video Editing', href: '#services' },
    { label: 'Thumbnail Design', href: '#services' },
    { label: 'Social Media', href: '#services' },
    { label: 'Software Dev', href: '#services' },
    { label: 'Brand Strategy', href: '#services' },
    { label: 'UI/UX Design', href: '#services' },
  ],
  Company: [
    { label: 'About Us', href: '#about' },
    { label: 'Our Process', href: '#process' },
    { label: 'Case Studies', href: '#portfolio' },
    { label: 'Blog', href: '#' },
    { label: 'Contact', href: '#work' },
  ],
  Connect: [
    { label: 'hello@nordash.agency', href: 'mailto:hello@nordash.agency' },
    { label: 'Instagram', href: 'https://www.instagram.com/muneeb.ahmed.butt.fi/' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/muneeb-ahmed-butt-4a384438a/' },
    { label: 'Twitter / X', href: '#' },
    { label: 'Behance', href: '#' },
  ],
};

const socials = [
  {
    label: 'Instagram - Muneeb',
    href: 'https://www.instagram.com/muneeb.ahmed.butt.fi/',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="2" y="2" width="14" height="14" rx="4" stroke="currentColor" strokeWidth="1.4"/>
        <circle cx="9" cy="9" r="3" stroke="currentColor" strokeWidth="1.4"/>
        <circle cx="13.5" cy="4.5" r="0.75" fill="currentColor"/>
      </svg>
    ),
  },
  {
    label: 'Instagram - Farheen',
    href: 'https://www.instagram.com/farheen_butt/',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="2" y="2" width="14" height="14" rx="4" stroke="currentColor" strokeWidth="1.4"/>
        <circle cx="9" cy="9" r="3" stroke="currentColor" strokeWidth="1.4"/>
        <circle cx="13.5" cy="4.5" r="0.75" fill="currentColor"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn - Muneeb',
    href: 'https://www.linkedin.com/in/muneeb-ahmed-butt-4a384438a/',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="2" y="2" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M6 8v5M6 6v.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M9 13V9.5a2.5 2.5 0 015 0V13M9 9v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn - Farheen',
    href: 'https://www.linkedin.com/in/farheen-e-sehar-8b0868177/',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="2" y="2" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M6 8v5M6 6v.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M9 13V9.5a2.5 2.5 0 015 0V13M9 9v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSubscribeStatus({ type: 'success', message: 'Subscribed! Check your email.' });
        setEmail('');
        setTimeout(() => setSubscribeStatus(null), 3000);
      } else {
        setSubscribeStatus({ type: 'error', message: 'Failed to subscribe. Try again.' });
      }
    } catch (error) {
      setSubscribeStatus({ type: 'error', message: 'Something went wrong.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer style={{ background: 'var(--deep)', borderTop: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
      {/* Truck art top bar */}
      <div style={{ height: 3, background: 'linear-gradient(90deg, var(--truck-red), var(--truck-saffron), var(--aurora-cyan), var(--aurora-purple), var(--truck-emerald))' }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '72px 24px 0' }}>
        {/* Top section */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 48, marginBottom: 64, alignItems: 'start' }}
          className="footer-top">
          {/* Brand */}
          <div style={{ maxWidth: 380 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <Image
                src="/nordash-logo.png"
                alt="NORDASH Logo"
                width={40}
                height={40}
                style={{ flexShrink: 0 }}
              />
              <span className="font-syne" style={{ fontSize: 20, fontWeight: 800, letterSpacing: '0.12em', background: 'linear-gradient(135deg, #FFD700, #FFC93C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                NORDASH
              </span>
            </div>
            <p className="font-dm" style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.8, fontWeight: 300, marginBottom: 28 }}>
              Full-spectrum digital agency. We blend Nordic precision with Asian creative energy to build brands, systems, and stories that outlast the algorithm.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              {socials.map(s => (
                <a key={s.label} href={s.href} aria-label={s.label}
                  style={{ width: 36, height: 36, borderRadius: 8, border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', textDecoration: 'none', transition: 'all 0.3s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--aurora-cyan)'; e.currentTarget.style.color = 'var(--aurora-cyan)'; e.currentTarget.style.background = 'rgba(0,229,255,0.06)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.background = 'transparent'; }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 48 }} className="footer-links">
            {Object.entries(footerLinks).map(([cat, items]) => (
              <div key={cat}>
                <div className="font-syne" style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--aurora-cyan)', marginBottom: 20 }}>{cat}</div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {items.map(item => (
                    <li key={item.label}>
                      <a href={item.href} className="font-dm" style={{ fontSize: 13, color: 'var(--text-faint)', textDecoration: 'none', transition: 'color 0.3s', display: 'block' }}
                        onMouseEnter={e => e.target.style.color = 'var(--text-primary)'}
                        onMouseLeave={e => e.target.style.color = 'var(--text-faint)'}
                      >{item.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter strip */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '28px 32px', marginBottom: 40, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
          <div>
            <div className="font-syne" style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>Stay in the loop</div>
            <p className="font-dm" style={{ fontSize: 13, color: 'var(--text-muted)' }}>Monthly insights on brand, content, and digital growth.</p>
          </div>
          <div style={{ display: 'flex', gap: 0, flexShrink: 0, flexDirection: 'column' }}>
            {subscribeStatus && (
              <motion.p
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  fontSize: 11,
                  color: subscribeStatus.type === 'success' ? '#00FF94' : '#FF6B6B',
                  marginBottom: 8,
                }}
              >
                {subscribeStatus.message}
              </motion.p>
            )}
            <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: 0 }}>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="font-dm"
                style={{
                  padding: '12px 20px',
                  background: 'var(--midnight)',
                  border: '1px solid var(--border)',
                  borderRight: 'none',
                  color: 'var(--text-primary)',
                  fontSize: 13,
                  outline: 'none',
                  minWidth: 220,
                }}
              />
              <button
                type="submit"
                disabled={loading || !email}
                className="btn-primary"
                style={{ padding: '12px 24px', fontSize: 11, borderRadius: 0, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}
              >
                <span>{loading ? 'Subscribing...' : 'Subscribe'}</span>
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid var(--border)', padding: '24px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <p className="font-dm" style={{ fontSize: 12, color: 'var(--text-faint)' }}>
            © {new Date().getFullYear()} NORDASH Agency. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            <div className="truck-diamond" style={{ width: 5, height: 5 }} />
            <span className="font-dm" style={{ fontSize: 12, color: 'var(--text-faint)' }}>Nordic Precision. Asian Energy.</span>
            <div className="truck-diamond-cyan" style={{ width: 5, height: 5 }} />
          </div>
          <div style={{ display: 'flex', gap: 20 }}>
            {[
              { label: 'Privacy', href: '/privacy' },
              { label: 'Terms', href: '/terms' },
              { label: 'Cookies', href: '/cookies' },
            ].map(l => (
              <a key={l.label} href={l.href} className="font-dm" style={{ fontSize: 12, color: 'var(--text-faint)', textDecoration: 'none', transition: 'color 0.3s' }}
                onMouseEnter={e => e.target.style.color = 'var(--text-muted)'}
                onMouseLeave={e => e.target.style.color = 'var(--text-faint)'}
              >{l.label}</a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-top { grid-template-columns: 1fr !important; }
          .footer-links { grid-template-columns: repeat(2, 1fr) !important; gap: 32px !important; }
        }
        @media (max-width: 560px) {
          .footer-links { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
