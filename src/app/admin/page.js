'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    // Check if user is already authenticated
    if (typeof window !== 'undefined') {
      const adminEmail = localStorage.getItem('admin_email');
      if (adminEmail) {
        setAuthenticated(true);
        setEmail(adminEmail);
        fetchApplications();

        // Auto-refresh applications every 10 seconds
        const interval = setInterval(() => {
          fetchApplications();
        }, 10000);

        return () => clearInterval(interval);
      } else {
        setLoading(false);
      }
    }
  }, []);

  const handleAuthenticate = async (e) => {
    e.preventDefault();
    setLoginError('');

    if (!email || !password) {
      setLoginError('Please fill all fields');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Save session to localStorage
        localStorage.setItem('admin_email', email);
        setAuthenticated(true);
        await fetchApplications();
      } else {
        setLoginError(data.error || 'Invalid email or password');
      }
    } catch (error) {
      setLoginError('Login failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_email');
    setAuthenticated(false);
    setEmail('');
    setPassword('');
    setApplications([]);
    setLoginError('');
  };

  const fetchApplications = async () => {
    try {
      const response = await fetch('/api/admin/applications');
      if (response.ok) {
        const data = await response.json();
        setApplications(data.applications || []);
      } else {
        console.error('Failed to fetch applications');
      }
    } catch (error) {
      console.error('Failed to fetch applications:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!authenticated) {
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
              NORDASH
            </h1>
            <p className="font-dm" style={{ fontSize: 13, color: 'var(--text-muted)', textAlign: 'center', margin: '0 0 24px 0' }}>
              Admin Access
            </p>

            {loginError && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  padding: 12,
                  marginBottom: 20,
                  borderRadius: 8,
                  background: 'rgba(215, 43, 43, 0.1)',
                  border: '1px solid rgba(215, 43, 43, 0.3)',
                  color: '#FF6B6B',
                  fontSize: 12,
                }}
              >
                {loginError}
              </motion.div>
            )}

            <form onSubmit={handleAuthenticate} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label className="font-dm" style={{ fontSize: 12, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>
                  Admin Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
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
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
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
                  opacity: loading ? 0.7 : 1,
                  cursor: loading ? 'not-allowed' : 'pointer',
                }}
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            <p className="font-dm" style={{ fontSize: 11, color: 'var(--text-faint)', textAlign: 'center', marginTop: 20 }}>
              <Link href="/admin/forgot-password" style={{ color: '#FFB300', textDecoration: 'none' }}>
                Forgot your password?
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--midnight)', padding: '40px 20px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
          <div>
            <h1 className="font-syne" style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              Job Applications
            </h1>
            <p className="font-dm" style={{ fontSize: 13, color: 'var(--text-muted)', margin: '8px 0 0 0' }}>
              {applications.length} application{applications.length !== 1 ? 's' : ''} received
            </p>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button
              onClick={() => fetchApplications()}
              className="btn-ghost"
              style={{ padding: '10px 20px', fontSize: 12 }}
              title="Refresh applications list"
            >
              ↻ Refresh
            </button>
            <button
              onClick={() => window.location.href = '/'}
              className="btn-ghost"
              style={{ padding: '10px 20px', fontSize: 12 }}
            >
              Back to Site
            </button>
            <button
              onClick={handleLogout}
              className="btn-ghost"
              style={{ padding: '10px 20px', fontSize: 12 }}
            >
              Logout
            </button>
          </div>
        </div>

        {/* Applications Table */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <p className="font-dm" style={{ color: 'var(--text-muted)' }}>Loading applications...</p>
          </div>
        ) : applications.length === 0 ? (
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 12,
            padding: '60px 40px',
            textAlign: 'center',
          }}>
            <p className="font-dm" style={{ fontSize: 16, color: 'var(--text-muted)', margin: 0 }}>
              No applications yet. Applications will appear here.
            </p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 12,
              overflow: 'hidden',
            }}>
              <thead>
                <tr style={{ background: 'rgba(0,0,0,0.2)', borderBottom: '1px solid var(--border)' }}>
                  <th className="font-dm" style={{ padding: '16px 20px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Name</th>
                  <th className="font-dm" style={{ padding: '16px 20px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email</th>
                  <th className="font-dm" style={{ padding: '16px 20px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Position</th>
                  <th className="font-dm" style={{ padding: '16px 20px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Phone</th>
                  <th className="font-dm" style={{ padding: '16px 20px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Applied</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app, i) => (
                  <tr key={i} style={{ borderBottom: i !== applications.length - 1 ? '1px solid var(--border)' : 'none', hover: { background: 'rgba(0,229,255,0.05)' } }}>
                    <td className="font-dm" style={{ padding: '16px 20px', fontSize: 13, color: 'var(--text-primary)' }}>
                      {app.name}
                      {app.linkedin && <div style={{ fontSize: 11, color: 'var(--text-faint)', marginTop: 4 }}><a href={app.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: '#00E5FF', textDecoration: 'none' }}>LinkedIn ↗</a></div>}
                    </td>
                    <td className="font-dm" style={{ padding: '16px 20px', fontSize: 13, color: 'var(--text-primary)' }}>
                      <a href={`mailto:${app.email}`} style={{ color: '#00E5FF', textDecoration: 'none' }}>{app.email}</a>
                    </td>
                    <td className="font-dm" style={{ padding: '16px 20px', fontSize: 13, color: 'var(--text-primary)' }}>
                      <span style={{ background: 'rgba(255,179,0,0.1)', color: '#FFB300', padding: '4px 12px', borderRadius: 4, fontSize: 11, fontWeight: 600 }}>
                        {app.position}
                      </span>
                    </td>
                    <td className="font-dm" style={{ padding: '16px 20px', fontSize: 13, color: 'var(--text-primary)' }}>
                      <a href={`tel:${app.phone}`} style={{ color: '#00E5FF', textDecoration: 'none' }}>{app.phone}</a>
                    </td>
                    <td className="font-dm" style={{ padding: '16px 20px', fontSize: 13, color: 'var(--text-faint)' }}>
                      {new Date(app.date).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Info Box */}
        <div style={{
          background: 'rgba(255,179,0,0.05)',
          border: '1px solid rgba(255,179,0,0.2)',
          borderRadius: 12,
          padding: '20px',
          marginTop: 40,
        }}>
          <p className="font-dm" style={{ fontSize: 12, color: 'var(--text-muted)', margin: 0 }}>
            <strong style={{ color: '#FFB300' }}>📧 Note:</strong> Each application is sent to your email with CV and cover letter attachments. This dashboard shows recent applications.
          </p>
        </div>
      </div>
    </div>
  );
}
