"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

export default function ContactModal({ isOpen, onClose, type = 'book-call' }) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', country: '', service: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const isBookCall = type === 'book-call';
  const title = isBookCall ? 'Book a Free Call' : 'Request a Quote';

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
        setStatus({ type: 'success', message: 'Request sent! We\'ll be in touch within 24 hours.' });
        setFormData({ name: '', email: '', phone: '', country: '', service: '', message: '' });
        setTimeout(() => {
          onClose();
          setStatus(null);
        }, 2000);
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to send request. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.6)',
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
              zIndex: 999,
            }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              transform: 'translate(-50%, -50%)',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 16,
              padding: '40px',
              maxWidth: 500,
              width: '90%',
              maxHeight: '90vh',
              overflow: 'auto',
              zIndex: 1001,
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h2 className="font-syne" style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                {title}
              </h2>
              <button
                onClick={onClose}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  fontSize: 24,
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                ✕
              </button>
            </div>

            <p className="font-dm" style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 24, fontWeight: 300 }}>
              {isBookCall ? 'Tell us about your project and we\'ll schedule a consultation.' : 'Share your vision and let\'s discuss how we can help.'}
            </p>

            {/* Status Messages */}
            {status && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  padding: 12,
                  marginBottom: 20,
                  borderRadius: 8,
                  background: status.type === 'success' ? 'rgba(0, 255, 148, 0.1)' : 'rgba(215, 43, 43, 0.1)',
                  border: `1px solid ${status.type === 'success' ? 'rgba(0, 255, 148, 0.3)' : 'rgba(215, 43, 43, 0.3)'}`,
                  color: status.type === 'success' ? '#00FF94' : '#FF6B6B',
                  fontSize: 12,
                }}
              >
                {status.message}
              </motion.div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Name */}
              <div>
                <label className="font-dm" style={{ fontSize: 12, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    background: 'var(--deep)',
                    border: '1px solid var(--border)',
                    borderRadius: 8,
                    color: 'var(--text-primary)',
                    fontSize: 13,
                    outline: 'none',
                    transition: 'border-color 0.3s',
                  }}
                  onFocus={e => e.target.style.borderColor = 'var(--aurora-cyan)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'}
                />
              </div>

              {/* Email */}
              <div>
                <label className="font-dm" style={{ fontSize: 12, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    background: 'var(--deep)',
                    border: '1px solid var(--border)',
                    borderRadius: 8,
                    color: 'var(--text-primary)',
                    fontSize: 13,
                    outline: 'none',
                    transition: 'border-color 0.3s',
                  }}
                  onFocus={e => e.target.style.borderColor = 'var(--aurora-cyan)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'}
                />
              </div>

              {/* Phone */}
              <div>
                <label className="font-dm" style={{ fontSize: 12, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    background: 'var(--deep)',
                    border: '1px solid var(--border)',
                    borderRadius: 8,
                    color: 'var(--text-primary)',
                    fontSize: 13,
                    outline: 'none',
                    transition: 'border-color 0.3s',
                  }}
                  onFocus={e => e.target.style.borderColor = 'var(--aurora-cyan)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'}
                />
              </div>

              {/* Country */}
              <div>
                <label className="font-dm" style={{ fontSize: 12, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>
                  Country *
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    background: 'var(--deep)',
                    border: '1px solid var(--border)',
                    borderRadius: 8,
                    color: 'var(--text-primary)',
                    fontSize: 13,
                    outline: 'none',
                    transition: 'border-color 0.3s',
                  }}
                  onFocus={e => e.target.style.borderColor = 'var(--aurora-cyan)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'}
                />
              </div>

              {/* Service (Quote only) */}
              {!isBookCall && (
                <div>
                  <label className="font-dm" style={{ fontSize: 12, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>
                    Service of Interest
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      background: 'var(--deep)',
                      border: '1px solid var(--border)',
                      borderRadius: 8,
                      color: 'var(--text-primary)',
                      fontSize: 13,
                      outline: 'none',
                      transition: 'border-color 0.3s',
                    }}
                  >
                    <option value="">Select a service...</option>
                    <option value="Video Editing">Video Editing</option>
                    <option value="Thumbnail Design">Thumbnail Design</option>
                    <option value="Social Media Marketing">Social Media Marketing</option>
                    <option value="Software Development">Software Development</option>
                    <option value="Brand Strategy">Brand Strategy</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                  </select>
                </div>
              )}

              {/* Message (Quote only) */}
              {!isBookCall && (
                <div>
                  <label className="font-dm" style={{ fontSize: 12, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>
                    Project Brief
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project..."
                    rows="4"
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      background: 'var(--deep)',
                      border: '1px solid var(--border)',
                      borderRadius: 8,
                      color: 'var(--text-primary)',
                      fontSize: 13,
                      outline: 'none',
                      fontFamily: 'DM Sans, sans-serif',
                      resize: 'none',
                      transition: 'border-color 0.3s',
                    }}
                    onFocus={e => e.target.style.borderColor = 'var(--aurora-cyan)'}
                    onBlur={e => e.target.style.borderColor = 'var(--border)'}
                  />
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="btn-primary"
                style={{
                  padding: '14px 24px',
                  fontSize: 12,
                  marginTop: 8,
                  opacity: loading ? 0.7 : 1,
                  cursor: loading ? 'not-allowed' : 'pointer',
                }}
              >
                <span>{loading ? 'Sending...' : 'Send Request'}</span>
              </button>

              <p className="font-dm" style={{ fontSize: 11, color: 'var(--text-faint)', textAlign: 'center', marginTop: 12 }}>
                We'll respond within 24 hours
              </p>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
