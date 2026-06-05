"use client";
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

const services = [
  'Video Editing',
  'Thumbnail Design',
  'Social Media Marketing',
  'Software Development',
  'Brand Strategy',
  'UI/UX Design',
  'SEO & Content Strategy',
  'Mobile App Development',
];

export default function ContactModal({ isOpen, onClose, type = 'book-call' }) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', country: '', service: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [focusedField, setFocusedField] = useState(null);
  const formRef = useRef(null);

  const isBookCall = type === 'book-call';

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
        setFormData({ name: '', email: '', phone: '', country: '', service: '', message: '' });
        setTimeout(() => {
          onClose();
          setTimeout(() => setStatus(null), 400);
        }, 2200);
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to send. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={onClose}
            style={{
              position: 'absolute', inset: 0,
              background: 'rgba(0,0,0,0.7)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
            }}
          />

          {/* Modal card */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.96 }}
            transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
            style={{
              position: 'relative',
              width: '92%',
              maxWidth: 520,
              maxHeight: '88vh',
              overflow: 'auto',
              background: 'linear-gradient(180deg, #0F1D36 0%, #0D1626 100%)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 20,
              boxShadow: '0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04), 0 0 100px rgba(0,229,255,0.06)',
              padding: '36px 32px 32px',
            }}
          >
            {/* Top accent bar */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: 3,
              background: isBookCall
                ? 'linear-gradient(90deg, #00E5FF, #7B61FF, #00E5FF)'
                : 'linear-gradient(90deg, #FFB300, #FF6B35, #FFB300)',
              borderRadius: '20px 20px 0 0',
            }} />

            {/* Decorative orb */}
            <div style={{
              position: 'absolute', top: -80, right: -40,
              width: 200, height: 200, borderRadius: '50%',
              background: `radial-gradient(circle, ${isBookCall ? 'rgba(0,229,255,0.06)' : 'rgba(255,179,0,0.06)'} 0%, transparent 70%)`,
              pointerEvents: 'none',
            }} />

            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    background: isBookCall ? 'rgba(0,229,255,0.1)' : 'rgba(255,179,0,0.1)',
                    border: `1px solid ${isBookCall ? 'rgba(0,229,255,0.2)' : 'rgba(255,179,0,0.2)'}`,
                    padding: '5px 12px', borderRadius: 20,
                    fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase',
                    color: isBookCall ? '#00E5FF' : '#FFB300',
                    fontWeight: 600,
                    marginBottom: 16,
                  }}
                >
                  <span style={{
                    width: 6, height: 6, borderRadius: '50%',
                    background: isBookCall ? '#00E5FF' : '#FFB300',
                    boxShadow: `0 0 8px ${isBookCall ? '#00E5FF' : '#FFB300'}`,
                  }} />
                  {isBookCall ? 'Free Consultation' : 'Project Quote'}
                </motion.div>
                <h2 className="font-syne" style={{ fontSize: 26, fontWeight: 800, color: '#EDF2FF', margin: 0, lineHeight: 1.15 }}>
                  {isBookCall ? "Let's talk about" : "Tell us about"}
                  <br />
                  <span style={{
                    background: isBookCall
                      ? 'linear-gradient(135deg, #00E5FF, #7B61FF)'
                      : 'linear-gradient(135deg, #FFB300, #FF6B35)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  }}>
                    {isBookCall ? 'your project' : 'your vision'}
                  </span>
                </h2>
              </div>

              {/* Close button */}
              <motion.button
                whileHover={{ scale: 1.08, background: 'rgba(255,255,255,0.08)' }}
                whileTap={{ scale: 0.92 }}
                onClick={onClose}
                style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: 'rgba(237,242,255,0.5)', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 16, flexShrink: 0, marginTop: 4,
                }}
              >
                ✕
              </motion.button>
            </div>

            <p className="font-dm" style={{ fontSize: 13, color: 'rgba(237,242,255,0.4)', marginBottom: 28, fontWeight: 300, lineHeight: 1.6 }}>
              {isBookCall
                ? 'Share a few details and we\'ll schedule your free strategy call.'
                : 'Describe your needs and we\'ll send a tailored proposal.'}
            </p>

            {/* Status */}
            <AnimatePresence>
              {status && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginBottom: 20 }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ overflow: 'hidden' }}
                >
                  <div style={{
                    padding: '14px 18px', borderRadius: 12,
                    background: status.type === 'success' ? 'rgba(0,255,148,0.08)' : 'rgba(255,107,107,0.08)',
                    border: `1px solid ${status.type === 'success' ? 'rgba(0,255,148,0.25)' : 'rgba(255,107,107,0.25)'}`,
                    display: 'flex', alignItems: 'center', gap: 10,
                  }}>
                    <span style={{ fontSize: 18 }}>
                      {status.type === 'success' ? '✓' : '!'}
                    </span>
                    <span className="font-dm" style={{
                      fontSize: 12.5, fontWeight: 400,
                      color: status.type === 'success' ? '#00FF94' : '#FF6B6B',
                    }}>
                      {status.message}
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form */}
            <form ref={formRef} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {/* Name + Email row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                {[
                  { name: 'name', label: 'Full Name', type: 'text', required: true, placeholder: 'John Doe' },
                  { name: 'email', label: 'Email', type: 'email', required: true, placeholder: 'john@company.com' },
                ].map(field => (
                  <div key={field.name}>
                    <label className="font-syne" style={{
                      fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase',
                      color: focusedField === field.name ? (isBookCall ? '#00E5FF' : '#FFB300') : 'rgba(237,242,255,0.35)',
                      display: 'block', marginBottom: 8, fontWeight: 600,
                      transition: 'color 0.3s',
                    }}>
                      {field.label}{field.required && ' *'}
                    </label>
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      onFocus={() => setFocusedField(field.name)}
                      onBlur={() => setFocusedField(null)}
                      required={field.required}
                      placeholder={field.placeholder}
                      className="font-dm"
                      style={{
                        width: '100%', padding: '13px 16px',
                        background: 'rgba(255,255,255,0.03)',
                        border: `1px solid ${focusedField === field.name ? (isBookCall ? 'rgba(0,229,255,0.4)' : 'rgba(255,179,0,0.4)') : 'rgba(255,255,255,0.08)'}`,
                        borderRadius: 12, color: '#EDF2FF', fontSize: 13.5,
                        outline: 'none', transition: 'border-color 0.3s, box-shadow 0.3s',
                        boxShadow: focusedField === field.name ? `0 0 0 3px ${isBookCall ? 'rgba(0,229,255,0.06)' : 'rgba(255,179,0,0.06)'}` : 'none',
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Phone + Country row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                {[
                  { name: 'phone', label: 'Phone', type: 'tel', required: true, placeholder: '+1 234 567 8900' },
                  { name: 'country', label: 'Country', type: 'text', required: true, placeholder: 'United States' },
                ].map(field => (
                  <div key={field.name}>
                    <label className="font-syne" style={{
                      fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase',
                      color: focusedField === field.name ? (isBookCall ? '#00E5FF' : '#FFB300') : 'rgba(237,242,255,0.35)',
                      display: 'block', marginBottom: 8, fontWeight: 600,
                      transition: 'color 0.3s',
                    }}>
                      {field.label}{field.required && ' *'}
                    </label>
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      onFocus={() => setFocusedField(field.name)}
                      onBlur={() => setFocusedField(null)}
                      required={field.required}
                      placeholder={field.placeholder}
                      className="font-dm"
                      style={{
                        width: '100%', padding: '13px 16px',
                        background: 'rgba(255,255,255,0.03)',
                        border: `1px solid ${focusedField === field.name ? (isBookCall ? 'rgba(0,229,255,0.4)' : 'rgba(255,179,0,0.4)') : 'rgba(255,255,255,0.08)'}`,
                        borderRadius: 12, color: '#EDF2FF', fontSize: 13.5,
                        outline: 'none', transition: 'border-color 0.3s, box-shadow 0.3s',
                        boxShadow: focusedField === field.name ? `0 0 0 3px ${isBookCall ? 'rgba(0,229,255,0.06)' : 'rgba(255,179,0,0.06)'}` : 'none',
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Service + Message (Quote only) */}
              {!isBookCall && (
                <>
                  <div>
                    <label className="font-syne" style={{
                      fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase',
                      color: focusedField === 'service' ? '#FFB300' : 'rgba(237,242,255,0.35)',
                      display: 'block', marginBottom: 8, fontWeight: 600,
                      transition: 'color 0.3s',
                    }}>
                      Service of Interest
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('service')}
                      onBlur={() => setFocusedField(null)}
                      className="font-dm"
                      style={{
                        width: '100%', padding: '13px 16px',
                        background: 'rgba(255,255,255,0.03)',
                        border: `1px solid ${focusedField === 'service' ? 'rgba(255,179,0,0.4)' : 'rgba(255,255,255,0.08)'}`,
                        borderRadius: 12, color: '#EDF2FF', fontSize: 13.5,
                        outline: 'none', cursor: 'pointer',
                        transition: 'border-color 0.3s, box-shadow 0.3s',
                      }}
                    >
                      <option value="" style={{ background: '#0D1626', color: '#EDF2FF' }}>Select a service...</option>
                      {services.map(s => (
                        <option key={s} value={s} style={{ background: '#0D1626', color: '#EDF2FF' }}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="font-syne" style={{
                      fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase',
                      color: focusedField === 'message' ? '#FFB300' : 'rgba(237,242,255,0.35)',
                      display: 'block', marginBottom: 8, fontWeight: 600,
                      transition: 'color 0.3s',
                    }}>
                      Project Brief
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Tell us about your project, goals, and timeline..."
                      rows="4"
                      className="font-dm"
                      style={{
                        width: '100%', padding: '13px 16px',
                        background: 'rgba(255,255,255,0.03)',
                        border: `1px solid ${focusedField === 'message' ? 'rgba(255,179,0,0.4)' : 'rgba(255,255,255,0.08)'}`,
                        borderRadius: 12, color: '#EDF2FF', fontSize: 13.5,
                        outline: 'none', resize: 'none',
                        fontFamily: 'inherit',
                        transition: 'border-color 0.3s, box-shadow 0.3s',
                      }}
                    />
                  </div>
                </>
              )}

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={!loading ? { scale: 1.01, y: -2 } : {}}
                whileTap={!loading ? { scale: 0.98 } : {}}
                style={{
                  width: '100%', padding: '16px 24px', marginTop: 8,
                  background: loading
                    ? 'rgba(255,255,255,0.05)'
                    : isBookCall
                      ? 'linear-gradient(135deg, #00B8D4, #7B61FF)'
                      : 'linear-gradient(135deg, #E6A000, #FF6B35)',
                  border: 'none', borderRadius: 14,
                  color: loading ? 'rgba(237,242,255,0.3)' : '#FFFFFF',
                  fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700,
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s',
                  boxShadow: loading ? 'none' : isBookCall
                    ? '0 8px 32px rgba(0,229,255,0.2)'
                    : '0 8px 32px rgba(255,179,0,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                }}
              >
                {loading ? (
                  <>
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                      style={{ display: 'inline-block', fontSize: 16 }}
                    >
                      ⏳
                    </motion.span>
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

              <p className="font-dm" style={{
                fontSize: 11, color: 'rgba(237,242,255,0.2)', textAlign: 'center',
                marginTop: 4, fontWeight: 300,
              }}>
                We'll respond within 24 hours · Free, no obligation
              </p>
            </form>
          </motion.div>

          {/* Responsive styles */}
          <style>{`
            @media (max-width: 500px) {
              .modal-field-row { grid-template-columns: 1fr !important; }
            }
          `}</style>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
