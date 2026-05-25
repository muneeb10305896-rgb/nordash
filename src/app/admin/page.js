'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function AdminDashboard() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [authenticated, setAuthenticated] = useState(false);
  const [inputToken, setInputToken] = useState('');
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);

  const correctToken = process.env.NEXT_PUBLIC_ADMIN_TOKEN || 'nordash2025';

  useEffect(() => {
    if (token === correctToken) {
      setAuthenticated(true);
      fetchApplications();
    }
  }, [token]);

  const handleAuthenticate = (e) => {
    e.preventDefault();
    if (inputToken === correctToken) {
      setAuthenticated(true);
      fetchApplications();
    } else {
      alert('Invalid token');
    }
  };

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/applications');
      if (response.ok) {
        const data = await response.json();
        setApplications(data.applications || []);
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
        <div style={{ maxWidth: 400, width: '100%' }}>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: '40px' }}>
            <h1 className="font-syne" style={{ fontSize: 28, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 24, textAlign: 'center' }}>
              NORDASH
              <br />
              <span style={{ fontSize: 16, color: '#FFB300' }}>Admin Access</span>
            </h1>

            <form onSubmit={handleAuthenticate} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label className="font-dm" style={{ fontSize: 12, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>
                  Admin Token
                </label>
                <input
                  type="password"
                  value={inputToken}
                  onChange={(e) => setInputToken(e.target.value)}
                  placeholder="Enter admin token"
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    background: 'var(--deep)',
                    border: '1px solid var(--border)',
                    borderRadius: 8,
                    color: 'var(--text-primary)',
                    fontSize: 13,
                    outline: 'none',
                  }}
                  autoFocus
                />
              </div>
              <button
                type="submit"
                className="btn-primary"
                style={{ padding: '12px 24px', fontSize: 13 }}
              >
                Access Dashboard
              </button>
            </form>

            <p className="font-dm" style={{ fontSize: 11, color: 'var(--text-faint)', textAlign: 'center', marginTop: 20 }}>
              Contact Muneeb for the admin token
            </p>
          </div>
        </div>
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
          <button
            onClick={() => window.location.href = '/'}
            className="btn-ghost"
            style={{ padding: '10px 20px', fontSize: 12 }}
          >
            Back to Site
          </button>
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
