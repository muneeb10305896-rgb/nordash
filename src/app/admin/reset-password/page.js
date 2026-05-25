'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function ResetPassword() {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [verified, setVerified] = useState(false);
  const [verifying, setVerifying] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tokenFromUrl = params.get('token');
      setToken(tokenFromUrl);
      verifyToken(tokenFromUrl);
    }
  }, []);

  const verifyToken = async (token) => {
    if (!token) {
      setStatus({ type: 'error', message: 'No reset token provided' });
      setVerifying(false);
      return;
    }

    try {
      const response = await fetch(`/api/admin/forgot-password?token=${token}`);
      if (response.ok) {
        setVerified(true);
      } else {
        const data = await response.json();
        setStatus({ type: 'error', message: data.error });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to verify token' });
    } finally {
      setVerifying(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      setStatus({ type: 'error', message: 'Please fill all fields' });
      return;
    }

    if (newPassword.length < 6) {
      setStatus({ type: 'error', message: 'Password must be at least 6 characters' });
      return;
    }

    if (newPassword !== confirmPassword) {
      setStatus({ type: 'error', message: 'Passwords do not match' });
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch('/api/admin/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', message: 'Password reset successfully! Redirecting to login...' });
        setTimeout(() => {
          router.push('/admin');
        }, 2000);
      } else {
        setStatus({ type: 'error', message: data.error });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to reset password' });
    } finally {
      setLoading(false);
    }
  };

  if (verifying) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--midnight)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p className="font-dm" style={{ color: 'var(--text-muted)' }}>Verifying your reset link...</p>
      </div>
    );
  }

  if (!verified) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--midnight)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ maxWidth: 400, width: '100%', textAlign: 'center' }}
        >
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: '40px' }}>
            <h1 className="font-syne" style={{ fontSize: 28, fontWeight: 800, color: '#FF6B6B', marginBottom: 16 }}>
              Invalid Link
            </h1>
            <p className="font-dm" style={{ fontSize: 13, color: 'var(--text-muted)', margin: '0 0 20px 0' }}>
              {status?.message || 'This reset link is invalid or has expired.'}
            </p>
            <a href="/admin/forgot-password" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block', padding: '12px 24px', fontSize: 13 }}>
              Request New Link
            </a>
          </div>
        </motion.div>
      </div>
    );
  }

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
            Set New Password
          </h1>
          <p className="font-dm" style={{ fontSize: 13, color: 'var(--text-muted)', textAlign: 'center', margin: '0 0 24px 0' }}>
            Create a strong password for your admin account
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
                New Password *
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="At least 6 characters"
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

            <div>
              <label className="font-dm" style={{ fontSize: 12, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>
                Confirm Password *
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter your password"
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

            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
              style={{
                padding: '12px 24px',
                fontSize: 13,
                marginTop: 8,
                opacity: loading ? 0.7 : 1,
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
