"use client";
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { track } from '@vercel/analytics';

const services = [
  'Video Editing', 'Thumbnail Design', 'Social Media Marketing',
  'Software Development', 'Brand Strategy', 'UI/UX Design',
  'SEO & Content Strategy', 'Mobile App Development',
];

export default function ContactModal({ isOpen, onClose, type = 'book-call' }) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', country: '', service: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [focusedField, setFocusedField] = useState(null);
  const modalRef = useRef(null);
  const isBookCall = type === 'book-call';

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, ...formData }),
      });
      const data = await response.json();
      if (!response.ok) {
        setStatus({ type: 'error', message: data.error || 'Something went wrong' });
      } else {
        setStatus({ type: 'success', message: "Request sent! We'll be in touch within 24 hours." });
        track('contact_form_submitted', { type });
        setFormData({ name: '', email: '', phone: '', country: '', service: '', message: '' });
        setTimeout(() => { onClose(); setTimeout(() => setStatus(null), 400); }, 2200);
      }
    } catch {
      setStatus({ type: 'error', message: 'Failed to send. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  if (typeof document === 'undefined') return null;

  const accent = isBookCall ? '#00E5FF' : '#FFB300';
  const accent2 = isBookCall ? '#7B61FF' : '#FF6B35';
  const grad = isBookCall
    ? 'linear-gradient(135deg, #00B8D4, #7B61FF)'
    : 'linear-gradient(135deg, #E6A000, #FF6B35)';

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          style={{
            position: 'fixed', inset: 0, zIndex: 99999,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '16px',
          }}
        >
          {/* Backdrop */}
          <div
            onClick={onClose}
            style={{
              position: 'absolute', inset: 0,
              background: 'rgba(2,6,16,0.78)',
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
            }}
          />

          {/* Modal card — scrollable */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, y: 50, scale: 0.93 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.42, ease: [0.23, 1, 0.32, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="modal-scroll-area"
            data-lenis-prevent
            style={{
              position: 'relative',
              width: '100%', maxWidth: 500, maxHeight: 'calc(100vh - 32px)',
              overflowY: 'auto',
              overscrollBehavior: 'contain',
              WebkitOverflowScrolling: 'touch',
              background: 'linear-gradient(180deg, #0F1D36 0%, #0A1326 100%)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 20,
              boxShadow: `0 40px 100px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.03), 0 0 120px ${accent}0A`,
              padding: 0,
              scrollbarWidth: 'thin',
              scrollbarColor: `${accent}33 transparent`,
            }}
          >
            {/* Top gradient bar */}
            <div style={{
              position: 'sticky', top: 0, zIndex: 2,
              height: 3, background: `linear-gradient(90deg, ${accent}, ${accent2}, ${accent})`,
              borderRadius: '20px 20px 0 0',
            }} />

            <div style={{ padding: '36px 32px 32px' }}>
              {/* Header row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <div>
                  <motion.span
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 }}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 7,
                      background: `${accent}12`, border: `1px solid ${accent}25`,
                      padding: '6px 14px', borderRadius: 20,
                      fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase',
                      color: accent, fontWeight: 600, marginBottom: 16,
                    }}
                  >
                    <span style={{ width: 7, height: 7, borderRadius: '50%', background: accent, boxShadow: `0 0 10px ${accent}` }} />
                    {isBookCall ? 'Free Consultation' : 'Project Quote'}
                  </motion.span>
                  <h2 className="font-syne" style={{ fontSize: 26, fontWeight: 800, color: '#EDF2FF', margin: 0, lineHeight: 1.15 }}>
                    {isBookCall ? "Let's talk about" : "Tell us about"}
                    <br />
                    <span style={{
                      background: `linear-gradient(135deg, ${accent}, ${accent2})`,
                      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}>
                      {isBookCall ? 'your project' : 'your vision'}
                    </span>
                  </h2>
                </div>

                <motion.button
                  whileHover={{ scale: 1.08, background: 'rgba(255,255,255,0.08)' }}
                  whileTap={{ scale: 0.92 }}
                  onClick={onClose}
                  style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                    color: 'rgba(237,242,255,0.45)', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 16, flexShrink: 0,
                  }}
                >
                  ✕
                </motion.button>
              </div>

              <p className="font-dm" style={{ fontSize: 13, color: 'rgba(237,242,255,0.38)', margin: '0 0 26px', fontWeight: 300, lineHeight: 1.6 }}>
                {isBookCall
                  ? "Share a few details and we'll schedule your free strategy call."
                  : "Describe your needs and we'll send a tailored proposal within 24 hours."}
              </p>

              {/* Status message */}
              <AnimatePresence>
                {status && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginBottom: 18 }}
                    exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{
                      padding: '14px 18px', borderRadius: 12,
                      background: status.type === 'success' ? 'rgba(0,255,148,0.08)' : 'rgba(255,107,107,0.08)',
                      border: `1px solid ${status.type === 'success' ? 'rgba(0,255,148,0.25)' : 'rgba(255,107,107,0.25)'}`,
                      display: 'flex', alignItems: 'center', gap: 10,
                    }}>
                      <div style={{
                        width: 24, height: 24, borderRadius: '50%',
                        background: status.type === 'success' ? 'rgba(0,255,148,0.2)' : 'rgba(255,107,107,0.2)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 13, color: status.type === 'success' ? '#00FF94' : '#FF6B6B',
                        flexShrink: 0,
                      }}>
                        {status.type === 'success' ? '✓' : '!'}
                      </div>
                      <span className="font-dm" style={{ fontSize: 12.5, color: status.type === 'success' ? '#00FF94' : '#FF6B6B' }}>
                        {status.message}
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form */}
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
                {/* Name + Email */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 13 }} className="modal-grid-2">
                  {[
                    { name: 'name', label: 'Full Name', type: 'text', req: true, ph: 'John Doe' },
                    { name: 'email', label: 'Email', type: 'email', req: true, ph: 'john@company.com' },
                  ].map(f => (
                    <div key={f.name}>
                      <label className="font-syne" style={{
                        fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase',
                        color: focusedField === f.name ? accent : 'rgba(237,242,255,0.32)',
                        display: 'block', marginBottom: 7, fontWeight: 600,
                        transition: 'color 0.3s',
                      }}>{f.label}{f.req && ' *'}</label>
                      <input
                        type={f.type} name={f.name} value={formData[f.name]} onChange={handleChange}
                        onFocus={() => setFocusedField(f.name)} onBlur={() => setFocusedField(null)}
                        required={f.req} placeholder={f.ph} className="font-dm"
                        style={{
                          width: '100%', padding: '12px 15px', background: 'rgba(255,255,255,0.03)',
                          border: `1px solid ${focusedField === f.name ? `${accent}44` : 'rgba(255,255,255,0.08)'}`,
                          borderRadius: 12, color: '#EDF2FF', fontSize: 13.5, outline: 'none',
                          transition: 'border-color 0.3s, box-shadow 0.3s',
                          boxShadow: focusedField === f.name ? `0 0 0 3px ${accent}0A` : 'none',
                        }}
                      />
                    </div>
                  ))}
                </div>

                {/* Phone + Country */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 13 }} className="modal-grid-2">
                  {[
                    { name: 'phone', label: 'Phone', type: 'tel', req: true, ph: '+1 234 567 8900' },
                    { name: 'country', label: 'Country', type: 'text', req: true, ph: 'United States' },
                  ].map(f => (
                    <div key={f.name}>
                      <label className="font-syne" style={{
                        fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase',
                        color: focusedField === f.name ? accent : 'rgba(237,242,255,0.32)',
                        display: 'block', marginBottom: 7, fontWeight: 600,
                        transition: 'color 0.3s',
                      }}>{f.label}{f.req && ' *'}</label>
                      <input
                        type={f.type} name={f.name} value={formData[f.name]} onChange={handleChange}
                        onFocus={() => setFocusedField(f.name)} onBlur={() => setFocusedField(null)}
                        required={f.req} placeholder={f.ph} className="font-dm"
                        style={{
                          width: '100%', padding: '12px 15px', background: 'rgba(255,255,255,0.03)',
                          border: `1px solid ${focusedField === f.name ? `${accent}44` : 'rgba(255,255,255,0.08)'}`,
                          borderRadius: 12, color: '#EDF2FF', fontSize: 13.5, outline: 'none',
                          transition: 'border-color 0.3s, box-shadow 0.3s',
                          boxShadow: focusedField === f.name ? `0 0 0 3px ${accent}0A` : 'none',
                        }}
                      />
                    </div>
                  ))}
                </div>

                {/* Service + Message (quote only) */}
                {!isBookCall && (
                  <>
                    <div>
                      <label className="font-syne" style={{
                        fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase',
                        color: focusedField === 'service' ? accent : 'rgba(237,242,255,0.32)',
                        display: 'block', marginBottom: 7, fontWeight: 600, transition: 'color 0.3s',
                      }}>Service of Interest</label>
                      <select
                        name="service" value={formData.service} onChange={handleChange}
                        onFocus={() => setFocusedField('service')} onBlur={() => setFocusedField(null)}
                        className="font-dm"
                        style={{
                          width: '100%', padding: '12px 15px', background: 'rgba(255,255,255,0.03)',
                          border: `1px solid ${focusedField === 'service' ? `${accent}44` : 'rgba(255,255,255,0.08)'}`,
                          borderRadius: 12, color: '#EDF2FF', fontSize: 13.5, outline: 'none', cursor: 'pointer',
                          transition: 'border-color 0.3s',
                        }}
                      >
                        <option value="" style={{ background: '#0A1326', color: '#EDF2FF' }}>Select a service...</option>
                        {services.map(s => (
                          <option key={s} value={s} style={{ background: '#0A1326', color: '#EDF2FF' }}>{s}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="font-syne" style={{
                        fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase',
                        color: focusedField === 'message' ? accent : 'rgba(237,242,255,0.32)',
                        display: 'block', marginBottom: 7, fontWeight: 600, transition: 'color 0.3s',
                      }}>Project Brief</label>
                      <textarea
                        name="message" value={formData.message} onChange={handleChange}
                        onFocus={() => setFocusedField('message')} onBlur={() => setFocusedField(null)}
                        placeholder="Tell us about your project, goals, and timeline..."
                        rows="4" className="font-dm"
                        style={{
                          width: '100%', padding: '12px 15px', background: 'rgba(255,255,255,0.03)',
                          border: `1px solid ${focusedField === 'message' ? `${accent}44` : 'rgba(255,255,255,0.08)'}`,
                          borderRadius: 12, color: '#EDF2FF', fontSize: 13.5, outline: 'none', resize: 'none',
                          fontFamily: 'inherit', transition: 'border-color 0.3s',
                        }}
                      />
                    </div>
                  </>
                )}

                {/* Submit button */}
                <motion.button
                  type="submit" disabled={loading}
                  whileHover={!loading ? { scale: 1.01, y: -2 } : {}}
                  whileTap={!loading ? { scale: 0.98 } : {}}
                  style={{
                    width: '100%', padding: '16px 24px', marginTop: 10,
                    background: loading ? 'rgba(255,255,255,0.05)' : grad,
                    border: 'none', borderRadius: 14,
                    color: loading ? 'rgba(237,242,255,0.3)' : '#FFFFFF',
                    fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700,
                    letterSpacing: '0.12em', textTransform: 'uppercase',
                    cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.3s',
                    boxShadow: loading ? 'none' : `0 8px 32px ${accent}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                  }}
                >
                  {loading ? (
                    <>
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                        style={{ display: 'inline-block', fontSize: 15 }}
                      >⏳</motion.span>
                      Sending...
                    </>
                  ) : (
                    <>
                      {isBookCall ? '📞 Book My Free Call' : '📋 Send Request'}
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </>
                  )}
                </motion.button>

                <p className="font-dm" style={{ fontSize: 11, color: 'rgba(237,242,255,0.18)', textAlign: 'center', marginTop: 2, fontWeight: 300 }}>
                  Free, no obligation · Reply within 24h
                </p>
              </form>
            </div>
          </motion.div>

          {/* Custom scrollbar for the modal */}
          <style>{`
            .modal-scroll-area::-webkit-scrollbar { width: 4px; }
            .modal-scroll-area::-webkit-scrollbar-track { background: transparent; }
            .modal-scroll-area::-webkit-scrollbar-thumb { background: ${accent}33; border-radius: 2px; }
            @media (max-width: 520px) { .modal-grid-2 { grid-template-columns: 1fr !important; } }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
