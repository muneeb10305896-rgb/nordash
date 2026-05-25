"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

export default function ApplicationModal({ isOpen, onClose, position }) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', linkedin: '' });
  const [files, setFiles] = useState({ cv: null, coverLetter: null });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files: fileList } = e.target;
    if (fileList[0]) {
      setFiles(prev => ({ ...prev, [name]: fileList[0] }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !files.cv) {
      setStatus({ type: 'error', message: 'Please fill all required fields and upload your CV' });
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      const form = new FormData();
      form.append('position', position.title);
      form.append('positionId', position.id);
      form.append('name', formData.name);
      form.append('email', formData.email);
      form.append('phone', formData.phone);
      form.append('linkedin', formData.linkedin);
      form.append('cv', files.cv);
      if (files.coverLetter) form.append('coverLetter', files.coverLetter);

      const response = await fetch('/api/apply', {
        method: 'POST',
        body: form,
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus({ type: 'error', message: data.error || 'Failed to submit application' });
      } else {
        setStatus({ type: 'success', message: 'Application sent! We\'ll review it soon.' });
        setFormData({ name: '', email: '', phone: '', linkedin: '' });
        setFiles({ cv: null, coverLetter: null });
        setTimeout(() => {
          onClose();
          setStatus(null);
        }, 2000);
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to submit. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  if (typeof document === 'undefined' || !position) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
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

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 16,
              padding: '40px',
              maxWidth: 500,
              width: '90%',
              maxHeight: '90vh',
              overflow: 'auto',
              zIndex: 1000,
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
              margin: 0,
              willChange: 'transform',
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <div>
                <h2 className="font-syne" style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                  {position.title}
                </h2>
                <p className="font-dm" style={{ fontSize: 12, color: 'var(--text-faint)', margin: '4px 0 0 0' }}>
                  {position.department} • {position.level}
                </p>
              </div>
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
              Tell us about yourself and why you'd be a great fit.
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
                  onFocus={e => e.target.style.borderColor = '#FFB300'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'}
                />
              </div>

              {/* Email */}
              <div>
                <label className="font-dm" style={{ fontSize: 12, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>
                  Email *
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
                  onFocus={e => e.target.style.borderColor = '#FFB300'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'}
                />
              </div>

              {/* Phone */}
              <div>
                <label className="font-dm" style={{ fontSize: 12, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>
                  Phone *
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
                  onFocus={e => e.target.style.borderColor = '#FFB300'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'}
                />
              </div>

              {/* LinkedIn */}
              <div>
                <label className="font-dm" style={{ fontSize: 12, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>
                  LinkedIn Profile
                </label>
                <input
                  type="url"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/in/..."
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
                  onFocus={e => e.target.style.borderColor = '#FFB300'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'}
                />
              </div>

              {/* CV Upload */}
              <div>
                <label className="font-dm" style={{ fontSize: 12, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>
                  Upload CV (PDF, DOC) *
                </label>
                <input
                  type="file"
                  name="cv"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    background: 'var(--deep)',
                    border: '1px solid var(--border)',
                    borderRadius: 8,
                    color: 'var(--text-primary)',
                    fontSize: 13,
                  }}
                />
                {files.cv && <p className="font-dm" style={{ fontSize: 11, color: '#00FF94', margin: '4px 0 0 0' }}>✓ {files.cv.name}</p>}
              </div>

              {/* Cover Letter Upload */}
              <div>
                <label className="font-dm" style={{ fontSize: 12, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>
                  Cover Letter (Optional)
                </label>
                <input
                  type="file"
                  name="coverLetter"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    background: 'var(--deep)',
                    border: '1px solid var(--border)',
                    borderRadius: 8,
                    color: 'var(--text-primary)',
                    fontSize: 13,
                  }}
                />
                {files.coverLetter && <p className="font-dm" style={{ fontSize: 11, color: '#00FF94', margin: '4px 0 0 0' }}>✓ {files.coverLetter.name}</p>}
              </div>

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
                <span>{loading ? 'Submitting...' : 'Submit Application'}</span>
              </button>

              <p className="font-dm" style={{ fontSize: 11, color: 'var(--text-faint)', textAlign: 'center', marginTop: 12 }}>
                We'll review your application and get back to you soon.
              </p>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
