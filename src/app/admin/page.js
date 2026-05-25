'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const adminEmail = localStorage.getItem('admin_email');
      if (adminEmail) {
        setAuthenticated(true);
        setEmail(adminEmail);
      }
      setLoading(false);
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
        localStorage.setItem('admin_email', email);
        setAuthenticated(true);
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
    setLoginError('');
  };

  if (!authenticated) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--midnight)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: '40px', maxWidth: 400, width: '100%' }}>
          <h1 className="font-syne" style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 32px 0' }}>Admin Login</h1>

          <form onSubmit={handleAuthenticate} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                background: 'var(--midnight)',
                border: '1px solid var(--border)',
                borderRadius: 8,
                padding: '12px 16px',
                color: 'var(--text-primary)',
                fontSize: 14,
              }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                background: 'var(--midnight)',
                border: '1px solid var(--border)',
                borderRadius: 8,
                padding: '12px 16px',
                color: 'var(--text-primary)',
                fontSize: 14,
              }}
            />
            {loginError && (
              <p style={{ color: '#ff4444', fontSize: 12, margin: 0 }}>{loginError}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
              style={{ padding: '12px 24px', fontSize: 14 }}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--midnight)', padding: '40px 20px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
          <h1 className="font-syne" style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>Admin Dashboard</h1>
          <div style={{ display: 'flex', gap: 12 }}>
            <button
              onClick={() => router.push('/admin/crm')}
              className="btn-primary"
              style={{ padding: '10px 20px', fontSize: 12 }}
            >
              📊 View Leads & CRM
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

        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 12,
          padding: '40px',
          textAlign: 'center',
        }}>
          <p className="font-dm" style={{ fontSize: 16, color: 'var(--text-muted)', margin: 0 }}>
            Welcome to the admin dashboard. Click "View Leads & CRM" to manage business inquiries.
          </p>
        </div>
      </div>
    </div>
  );
}
