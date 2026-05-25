'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch('/api/admin/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', message: data.message });
        setEmail('');
      } else {
        setStatus({ type: 'error', message: data.error });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Something went wrong. Try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--midnight)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{ maxWidth: 400, width: '100%' }}
      >
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: '40px' }}>
          <h1 className="font-syne" style={{ fontSize: 28, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 8, textAlign: 'center' }}>
            Reset Password
          </h1>
          <p className="font-dm" style={{ fontSize: 13, color: 'var(--text-muted)', textAlign: 'center', margin: '0 0 24px 0' }}>
            Enter your admin email to receive a reset link
          </p>

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

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label className="font-dm" style={{ fontSize: 12, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>
                Admin Email *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
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
                autoFocus
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
              style={{
                padding: '12px 24px',
                fontSize: 13,
                opacity: loading ? 0.7 : 1,
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>

          <p className="font-dm" style={{ fontSize: 11, color: 'var(--text-faint)', textAlign: 'center', marginTop: 20 }}>
            <Link href="/admin" style={{ color: '#FFB300', textDecoration: 'none' }}>
              Back to Login
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
