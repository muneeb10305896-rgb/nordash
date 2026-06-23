'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { track } from '@vercel/analytics';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const services = [
  'Video Editing', 'Thumbnail Design', 'Social Media Marketing',
  'Software Development', 'Brand Strategy', 'UI/UX Design',
  'SEO & Content Strategy', 'Mobile App Development',
];

const infoCards = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5z" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M2 5l8 6 8-6" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
      </svg>
    ),
    label: 'Email us',
    value: 'muneeb10305896@gmail.com',
    href: 'mailto:muneeb10305896@gmail.com',
    color: '#00E5FF',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="3" y="3" width="14" height="14" rx="4" stroke="currentColor" strokeWidth="1.4"/>
        <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.4"/>
        <circle cx="14.5" cy="5.5" r="0.8" fill="currentColor"/>
      </svg>
    ),
    label: 'Instagram',
    value: '@muneeb.ahmed.butt.fi',
    href: 'https://www.instagram.com/muneeb.ahmed.butt.fi/',
    color: '#FF4081',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="3" y="3" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M7 9v5M7 7v.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M10 14v-4a2.5 2.5 0 015 0v4M10 10v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    label: 'LinkedIn',
    value: 'Muneeb Ahmed Butt',
    href: 'https://www.linkedin.com/in/muneeb-ahmed-butt-4a384438a/',
    color: '#7B61FF',
  },
];

const expectations = [
  { step: '01', title: 'Reply within 24h', desc: 'We respond to every enquiry within one business day.' },
  { step: '02', title: 'Free strategy call', desc: 'A no-obligation 30-min call to understand your goals.' },
  { step: '03', title: 'Tailored proposal', desc: 'A custom scope, timeline, and pricing — no templates.' },
];

export default function ContactPage() {
  const [type, setType] = useState('book-call');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', country: '', service: '', message: '' });
  const [focusedField, setFocusedField] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const isBookCall = type === 'book-call';
  const accent  = isBookCall ? '#00E5FF' : '#FFB300';
  const accent2 = isBookCall ? '#7B61FF' : '#FF6B35';
  const grad    = isBookCall ? 'linear-gradient(135deg, #00B8D4, #7B61FF)' : 'linear-gradient(135deg, #E6A000, #FF6B35)';

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, ...formData }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus({ ok: false, msg: data.error || 'Something went wrong.' });
      } else {
        setStatus({ ok: true, msg: "Message sent! We'll be in touch within 24 hours." });
        track('contact_form_submitted', { type });
        setFormData({ name: '', email: '', phone: '', country: '', service: '', message: '' });
      }
    } catch {
      setStatus({ ok: false, msg: 'Failed to send. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = (field) => ({
    width: '100%', padding: '13px 16px',
    background: 'rgba(255,255,255,0.03)',
    border: `1px solid ${focusedField === field ? `${accent}55` : 'rgba(255,255,255,0.08)'}`,
    borderRadius: 12, color: '#EDF2FF', fontSize: 14, outline: 'none',
    transition: 'border-color 0.3s, box-shadow 0.3s',
    boxShadow: focusedField === field ? `0 0 0 3px ${accent}0D` : 'none',
    fontFamily: 'inherit',
  });

  const labelStyle = (field) => ({
    fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase',
    color: focusedField === field ? accent : 'rgba(237,242,255,0.32)',
    display: 'block', marginBottom: 8, fontWeight: 600, transition: 'color 0.3s',
  });

  return (
    <>
      <Navbar />
      <main style={{ background: 'var(--midnight)', minHeight: '100vh', paddingTop: 100 }}>

        {/* Hero strip */}
        <div style={{ position: 'relative', overflow: 'hidden', borderBottom: '1px solid var(--border)', padding: '64px 24px 56px' }}>
          <div style={{ position: 'absolute', top: '-30%', right: '10%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(0,229,255,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '-20%', left: '5%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(123,97,255,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <div style={{ width: 32, height: 1, background: 'var(--aurora-cyan)' }} />
                <span className="font-dm" style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--aurora-cyan)' }}>Get in Touch</span>
              </div>
              <h1 className="font-syne" style={{ fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: 800, lineHeight: 1.05, marginBottom: 16 }}>
                <span style={{ color: 'var(--text-primary)' }}>Let&apos;s build something</span>
                <br />
                <span style={{ background: 'linear-gradient(135deg, #00E5FF, #7B61FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>great together.</span>
              </h1>
              <p className="font-dm" style={{ fontSize: 16, color: 'var(--text-muted)', maxWidth: 520, lineHeight: 1.8 }}>
                Whether you have a project in mind or just want to explore what&apos;s possible — we&apos;re here. No hard sell, just an honest conversation.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Main two-column layout */}
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '72px 24px 100px', display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 80, alignItems: 'start' }} className="contact-grid">

          {/* LEFT — info */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>

            {/* Contact cards */}
            <div style={{ marginBottom: 48 }}>
              <p className="font-syne" style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-faint)', marginBottom: 20 }}>Reach us directly</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {infoCards.map(card => (
                  <a key={card.label} href={card.href} target={card.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
                    style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 20px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, textDecoration: 'none', transition: 'border-color 0.3s, background 0.3s' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = card.color; e.currentTarget.style.background = `${card.color}08`; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--surface)'; }}
                  >
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: `${card.color}12`, border: `1px solid ${card.color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: card.color, flexShrink: 0 }}>
                      {card.icon}
                    </div>
                    <div>
                      <p className="font-syne" style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-faint)', margin: '0 0 3px' }}>{card.label}</p>
                      <p className="font-dm" style={{ fontSize: 13, color: 'var(--text-primary)', margin: 0 }}>{card.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* What to expect */}
            <div>
              <p className="font-syne" style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-faint)', marginBottom: 20 }}>What to expect</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {expectations.map((item, i) => (
                  <div key={item.step} style={{ display: 'flex', gap: 16, paddingBottom: i < expectations.length - 1 ? 28 : 0 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                      <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span className="font-syne" style={{ fontSize: 10, fontWeight: 700, color: 'var(--aurora-cyan)' }}>{item.step}</span>
                      </div>
                      {i < expectations.length - 1 && <div style={{ width: 1, flex: 1, background: 'var(--border)', marginTop: 8 }} />}
                    </div>
                    <div style={{ paddingTop: 6 }}>
                      <p className="font-syne" style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 4px' }}>{item.title}</p>
                      <p className="font-dm" style={{ fontSize: 13, color: 'var(--text-muted)', margin: 0, lineHeight: 1.6 }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>

          {/* RIGHT — form */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <div style={{ background: 'linear-gradient(180deg, #0F1D36 0%, #0A1326 100%)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20, overflow: 'hidden' }}>

              {/* Top accent bar */}
              <div style={{ height: 3, background: grad, transition: 'background 0.4s' }} />

              <div style={{ padding: '36px 36px 40px' }}>

                {/* Type toggle */}
                <div style={{ display: 'flex', gap: 8, marginBottom: 32, background: 'rgba(255,255,255,0.03)', borderRadius: 12, padding: 4, border: '1px solid rgba(255,255,255,0.06)' }}>
                  {[
                    { value: 'book-call', label: 'Book a Free Call', accent: '#00E5FF' },
                    { value: 'get-quote', label: 'Get a Quote', accent: '#FFB300' },
                  ].map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => { setType(opt.value); setStatus(null); }}
                      className="font-syne"
                      style={{
                        flex: 1, padding: '11px 16px', borderRadius: 9, border: 'none', cursor: 'pointer',
                        fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', transition: 'all 0.3s',
                        background: type === opt.value ? `${opt.accent}15` : 'transparent',
                        color: type === opt.value ? opt.accent : 'rgba(237,242,255,0.35)',
                        boxShadow: type === opt.value ? `inset 0 0 0 1px ${opt.accent}30` : 'none',
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>

                {/* Heading */}
                <div style={{ marginBottom: 28 }}>
                  <h2 className="font-syne" style={{ fontSize: 24, fontWeight: 800, color: '#EDF2FF', margin: '0 0 8px' }}>
                    {isBookCall ? "Let's talk about your project" : "Tell us about your vision"}
                  </h2>
                  <p className="font-dm" style={{ fontSize: 13, color: 'rgba(237,242,255,0.38)', margin: 0, lineHeight: 1.6 }}>
                    {isBookCall
                      ? "Share a few details and we'll schedule your free 30-min strategy call."
                      : "Describe your needs and we'll send a tailored proposal within 24 hours."}
                  </p>
                </div>

                {/* Status */}
                <AnimatePresence>
                  {status && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                      animate={{ opacity: 1, height: 'auto', marginBottom: 20 }}
                      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{
                        padding: '14px 18px', borderRadius: 12,
                        background: status.ok ? 'rgba(0,255,148,0.08)' : 'rgba(255,107,107,0.08)',
                        border: `1px solid ${status.ok ? 'rgba(0,255,148,0.25)' : 'rgba(255,107,107,0.25)'}`,
                        display: 'flex', alignItems: 'center', gap: 10,
                      }}>
                        <span style={{ fontSize: 16 }}>{status.ok ? '✓' : '!'}</span>
                        <span className="font-dm" style={{ fontSize: 13, color: status.ok ? '#00FF94' : '#FF6B6B' }}>{status.msg}</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Form */}
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }} className="contact-form-2col">
                    {[
                      { name: 'name',  label: 'Full Name', type: 'text',  ph: 'John Doe',           req: true },
                      { name: 'email', label: 'Email',     type: 'email', ph: 'john@company.com',   req: true },
                    ].map(f => (
                      <div key={f.name}>
                        <label className="font-syne" style={labelStyle(f.name)}>{f.label} *</label>
                        <input type={f.type} name={f.name} value={formData[f.name]} onChange={handleChange}
                          onFocus={() => setFocusedField(f.name)} onBlur={() => setFocusedField(null)}
                          required placeholder={f.ph} className="font-dm" style={inputStyle(f.name)} />
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }} className="contact-form-2col">
                    {[
                      { name: 'phone',   label: 'Phone',   type: 'tel',  ph: '+1 234 567 8900', req: true },
                      { name: 'country', label: 'Country', type: 'text', ph: 'United States',   req: true },
                    ].map(f => (
                      <div key={f.name}>
                        <label className="font-syne" style={labelStyle(f.name)}>{f.label} *</label>
                        <input type={f.type} name={f.name} value={formData[f.name]} onChange={handleChange}
                          onFocus={() => setFocusedField(f.name)} onBlur={() => setFocusedField(null)}
                          required placeholder={f.ph} className="font-dm" style={inputStyle(f.name)} />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="font-syne" style={labelStyle('service')}>Service of Interest</label>
                    <select name="service" value={formData.service} onChange={handleChange}
                      onFocus={() => setFocusedField('service')} onBlur={() => setFocusedField(null)}
                      className="font-dm" style={{ ...inputStyle('service'), cursor: 'pointer' }}>
                      <option value="" style={{ background: '#0A1326' }}>Select a service...</option>
                      {services.map(s => <option key={s} value={s} style={{ background: '#0A1326' }}>{s}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="font-syne" style={labelStyle('message')}>
                      {isBookCall ? 'Anything you want to cover on the call?' : 'Project Brief'}
                    </label>
                    <textarea name="message" value={formData.message} onChange={handleChange}
                      onFocus={() => setFocusedField('message')} onBlur={() => setFocusedField(null)}
                      placeholder={isBookCall ? 'Goals, current challenges, questions...' : 'Project scope, timeline, budget range...'}
                      rows="4" className="font-dm" style={{ ...inputStyle('message'), resize: 'none' }} />
                  </div>

                  <motion.button
                    type="submit" disabled={loading}
                    whileHover={!loading ? { y: -2 } : {}}
                    whileTap={!loading ? { scale: 0.98 } : {}}
                    style={{
                      width: '100%', padding: '16px 24px', marginTop: 6,
                      background: loading ? 'rgba(255,255,255,0.05)' : grad,
                      border: 'none', borderRadius: 14,
                      color: loading ? 'rgba(237,242,255,0.3)' : '#fff',
                      fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700,
                      letterSpacing: '0.12em', textTransform: 'uppercase',
                      cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.4s',
                      boxShadow: loading ? 'none' : `0 8px 32px ${accent}28`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                    }}
                  >
                    {loading ? 'Sending...' : isBookCall ? 'Book My Free Call →' : 'Send Request →'}
                  </motion.button>

                  <p className="font-dm" style={{ fontSize: 11, color: 'rgba(237,242,255,0.18)', textAlign: 'center', margin: 0 }}>
                    Free, no obligation · Reply within 24h
                  </p>
                </form>
              </div>
            </div>
          </motion.div>

        </div>
      </main>

      <style>{`
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
        @media (max-width: 520px) {
          .contact-form-2col { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <Footer />
    </>
  );
}
