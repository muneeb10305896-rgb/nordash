'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const TABS = ['Dashboard', 'Services', 'Projects', 'Team', 'Testimonials', 'Leads'];

export default function AdminDashboard() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Dashboard');

  // Data states
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);
  const [team, setTeam] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [leads, setLeads] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);

  // Form states
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({});
  const [saveStatus, setSaveStatus] = useState(null);

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

  useEffect(() => {
    if (authenticated) fetchAllData();
  }, [authenticated, activeTab]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    if (!email || !password) { setLoginError('Please fill all fields'); return; }
    setLoading(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('admin_email', email);
        setAuthenticated(true);
      } else {
        setLoginError(data.error || 'Invalid credentials');
      }
    } catch {
      setLoginError('Login failed. Try again.');
    } finally { setLoading(false); }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_email');
    setAuthenticated(false);
    setEmail('');
    setPassword('');
  };

  const fetchAllData = async () => {
    setDataLoading(true);
    try {
      const [sRes, pRes, tRes, testRes, lRes] = await Promise.all([
        fetch('/api/services'), fetch('/api/projects'), fetch('/api/team'),
        fetch('/api/testimonials'), fetch('/api/leads'),
      ]);
      const [s, p, t, test, l] = await Promise.all([
        sRes.json(), pRes.json(), tRes.json(), testRes.json(), lRes.json(),
      ]);
      setServices(s.services || []);
      setProjects(p.projects || []);
      setTeam(t.members || []);
      setTestimonials(test.testimonials || []);
      setLeads(l.leads || []);
    } catch (err) { console.error('Failed to fetch data:', err); }
    finally { setDataLoading(false); }
  };

  // ── CRUD helpers ──
  const getApiPath = (tab) => {
    if (tab === 'Services') return '/api/services';
    if (tab === 'Projects') return '/api/projects';
    if (tab === 'Team') return '/api/team';
    if (tab === 'Testimonials') return '/api/testimonials';
    return '';
  };

  const getEmptyForm = (tab) => {
    if (tab === 'Services') return { name: '', slug: '', description: '', category: 'design', icon: '', order: 0, featured: false };
    if (tab === 'Projects') return { title: '', slug: '', description: '', category: '', client: '', imageUrl: '', technologies: '', status: 'completed', featured: false };
    if (tab === 'Team') return { name: '', position: '', bio: '', image: '', expertise: '', order: 0 };
    if (tab === 'Testimonials') return { quote: '', author: '', position: '', company: '', rating: 5, featured: false, approved: true };
    return {};
  };

  const handleAdd = () => {
    setFormData(getEmptyForm(activeTab));
    setEditing(null);
    setShowForm(true);
  };

  const handleEdit = (item) => {
    const d = { ...item };
    if (activeTab === 'Projects') d.technologies = (item.technologies || []).join(', ');
    if (activeTab === 'Team') d.expertise = (item.expertise || []).join(', ');
    setFormData(d);
    setEditing(item._id);
    setShowForm(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaveStatus({ type: 'loading', message: 'Saving...' });

    const apiPath = getApiPath(activeTab);
    const body = { ...formData };
    if (activeTab === 'Projects') body.technologies = (body.technologies || '').split(',').map(s => s.trim()).filter(Boolean);
    if (activeTab === 'Team') body.expertise = (body.expertise || '').split(',').map(s => s.trim()).filter(Boolean);

    try {
      const res = await fetch(editing ? `${apiPath}/${editing}` : apiPath, {
        method: editing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        setSaveStatus({ type: 'success', message: editing ? 'Updated!' : 'Created!' });
        setTimeout(() => { setShowForm(false); setSaveStatus(null); fetchAllData(); }, 800);
      } else {
        const err = await res.json();
        setSaveStatus({ type: 'error', message: err.error || 'Save failed' });
      }
    } catch {
      setSaveStatus({ type: 'error', message: 'Network error' });
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this item? This cannot be undone.')) return;
    try {
      await fetch(`${getApiPath(activeTab)}/${id}`, { method: 'DELETE' });
      fetchAllData();
    } catch (err) { console.error('Delete failed:', err); }
  };

  // ── Stats ──
  const stats = [
    { label: 'Services', value: services.length, color: '#00E5FF' },
    { label: 'Projects', value: projects.length, color: '#7B61FF' },
    { label: 'Team', value: team.length, color: '#FFB300' },
    { label: 'Testimonials', value: testimonials.length, color: '#00FF94' },
    { label: 'Leads', value: leads.length, color: '#FF6B6B' },
  ];

  // ── Login Screen ──
  if (!authenticated) {
    return (
      <div style={{ minHeight: '100vh', background: '#080C1A', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
        <div style={{ background: '#0F1D36', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20, padding: '44px 36px', maxWidth: 420, width: '100%' }}>
          <h1 className="font-syne" style={{ fontSize: 26, fontWeight: 800, color: '#EDF2FF', margin: '0 0 4px', textAlign: 'center' }}>NORDASH Admin</h1>
          <p className="font-dm" style={{ fontSize: 13, color: 'rgba(237,242,255,0.35)', textAlign: 'center', marginBottom: 32 }}>Sign in to manage your agency</p>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
              style={{ padding: '13px 16px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, color: '#EDF2FF', fontSize: 14, outline: 'none' }} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
              style={{ padding: '13px 16px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, color: '#EDF2FF', fontSize: 14, outline: 'none' }} />
            {loginError && <p style={{ color: '#FF6B6B', fontSize: 12, margin: 0 }}>{loginError}</p>}
            <button type="submit" disabled={loading}
              style={{ padding: '14px', background: 'linear-gradient(135deg, #00B8D4, #7B61FF)', border: 'none', borderRadius: 12, color: '#FFF', fontFamily: "'Syne',sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: '0.08em', cursor: 'pointer', marginTop: 4 }}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ── Main Dashboard ──
  return (
    <div style={{ minHeight: '100vh', background: '#080C1A', display: 'flex' }}>
      {/* Sidebar */}
      <div style={{ width: 220, background: '#0D1626', borderRight: '1px solid rgba(255,255,255,0.05)', padding: '24px 0', display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, bottom: 0, left: 0, zIndex: 10 }}>
        <div style={{ padding: '0 20px', marginBottom: 32 }}>
          <h2 className="font-syne" style={{ fontSize: 16, fontWeight: 800, color: '#EDF2FF', margin: 0, letterSpacing: '0.1em' }}>NORDASH</h2>
          <p className="font-dm" style={{ fontSize: 10, color: 'rgba(237,242,255,0.25)', margin: '2px 0 0' }}>Admin Panel</p>
        </div>
        {TABS.map(tab => (
          <button key={tab}
            onClick={() => { setActiveTab(tab); setShowForm(false); }}
            style={{
              padding: '12px 20px', textAlign: 'left', border: 'none',
              background: activeTab === tab ? 'rgba(0,229,255,0.06)' : 'transparent',
              borderLeft: activeTab === tab ? '3px solid #00E5FF' : '3px solid transparent',
              color: activeTab === tab ? '#EDF2FF' : 'rgba(237,242,255,0.4)',
              fontFamily: "'Syne',sans-serif", fontSize: 13, fontWeight: 600,
              cursor: 'pointer', transition: 'all 0.2s',
            }}
          >
            {tab}
          </button>
        ))}
        <div style={{ marginTop: 'auto', padding: '0 20px' }}>
          <button onClick={() => router.push('/admin/crm')} style={{ padding: '10px 16px', width: '100%', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, background: 'transparent', color: 'rgba(237,242,255,0.5)', fontFamily: "'Syne',sans-serif", fontSize: 11, cursor: 'pointer', marginBottom: 8 }}>📊 CRM View</button>
          <button onClick={handleLogout} style={{ padding: '10px 16px', width: '100%', border: '1px solid rgba(255,107,107,0.3)', borderRadius: 8, background: 'transparent', color: '#FF6B6B', fontFamily: "'Syne',sans-serif", fontSize: 11, cursor: 'pointer' }}>Logout</button>
        </div>
      </div>

      {/* Content */}
      <div style={{ marginLeft: 220, flex: 1, padding: '40px 36px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 36 }}>
          <h1 className="font-syne" style={{ fontSize: 28, fontWeight: 800, color: '#EDF2FF', margin: 0 }}>{activeTab}</h1>
          {['Services', 'Projects', 'Team', 'Testimonials'].includes(activeTab) && (
            <button onClick={handleAdd}
              style={{ padding: '12px 24px', background: 'linear-gradient(135deg, #00B8D4, #7B61FF)', border: 'none', borderRadius: 10, color: '#FFF', fontFamily: "'Syne',sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', cursor: 'pointer' }}>
              + Add {activeTab === 'Team' ? 'Member' : activeTab.slice(0, -1)}
            </button>
          )}
        </div>

        {/* Dashboard Stats */}
        {activeTab === 'Dashboard' && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 40 }}>
              {stats.map(s => (
                <div key={s.label} style={{ background: '#0F1D36', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, padding: '24px 20px' }}>
                  <p className="font-dm" style={{ fontSize: 11, color: 'rgba(237,242,255,0.35)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{s.label}</p>
                  <p className="font-syne" style={{ fontSize: 36, fontWeight: 800, color: s.color, margin: '8px 0 0' }}>{dataLoading ? '...' : s.value}</p>
                </div>
              ))}
            </div>
            <div style={{ background: '#0F1D36', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, padding: '32px' }}>
              <h3 className="font-syne" style={{ fontSize: 18, fontWeight: 700, color: '#EDF2FF', margin: '0 0 8px' }}>Welcome back 👋</h3>
              <p className="font-dm" style={{ fontSize: 14, color: 'rgba(237,242,255,0.4)', lineHeight: 1.7, margin: 0 }}>
                Use the sidebar to manage your services, projects, team members, and testimonials. View leads in the CRM section. All changes are instantly reflected on the public site.
              </p>
            </div>
          </>
        )}

        {/* Leads Tab */}
        {activeTab === 'Leads' && (
          <div style={{ background: '#0F1D36', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, padding: '32px' }}>
            <p className="font-dm" style={{ fontSize: 14, color: 'rgba(237,242,255,0.5)', marginBottom: 24 }}>
              {leads.length} lead{leads.length !== 1 ? 's' : ''} from contact form submissions.
            </p>
            {leads.length === 0 ? (
              <p className="font-dm" style={{ color: 'rgba(237,242,255,0.3)', textAlign: 'center', padding: 40 }}>No leads yet. They'll appear when someone submits the contact form.</p>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                      {['Name', 'Email', 'Phone', 'Country', 'Service', 'Status', 'Date'].map(h => (
                        <th key={h} className="font-syne" style={{ padding: '14px 16px', textAlign: 'left', fontSize: 10, color: 'rgba(237,242,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {leads.map((lead, i) => (
                      <tr key={lead._id} style={{ borderBottom: i !== leads.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                        <td className="font-dm" style={{ padding: '12px 16px', fontSize: 13, color: '#EDF2FF' }}>{lead.name}</td>
                        <td className="font-dm" style={{ padding: '12px 16px', fontSize: 12, color: '#00E5FF' }}>{lead.email}</td>
                        <td className="font-dm" style={{ padding: '12px 16px', fontSize: 12, color: 'rgba(237,242,255,0.5)' }}>{lead.phone || '-'}</td>
                        <td className="font-dm" style={{ padding: '12px 16px', fontSize: 12, color: 'rgba(237,242,255,0.5)' }}>{lead.country || '-'}</td>
                        <td className="font-dm" style={{ padding: '12px 16px', fontSize: 12, color: 'rgba(237,242,255,0.5)' }}>{lead.service || '-'}</td>
                        <td style={{ padding: '12px 16px' }}>
                          <span className="font-dm" style={{ fontSize: 10, padding: '4px 10px', borderRadius: 10, background: lead.status === 'new' ? 'rgba(0,229,255,0.15)' : 'rgba(0,255,148,0.15)', color: lead.status === 'new' ? '#00E5FF' : '#00FF94', textTransform: 'capitalize' }}>{lead.status || 'new'}</span>
                        </td>
                        <td className="font-dm" style={{ padding: '12px 16px', fontSize: 11, color: 'rgba(237,242,255,0.3)' }}>{lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* CRUD Tabs: Services, Projects, Team, Testimonials */}
        {['Services', 'Projects', 'Team', 'Testimonials'].includes(activeTab) && !showForm && (
          <div style={{ display: 'grid', gap: 12 }}>
            {dataLoading ? (
              <p className="font-dm" style={{ color: 'rgba(237,242,255,0.3)', textAlign: 'center', padding: 60 }}>Loading...</p>
            ) : activeTab === 'Services' && services.length === 0 ? (
              <EmptyState type="services" onAdd={handleAdd} />
            ) : activeTab === 'Projects' && projects.length === 0 ? (
              <EmptyState type="projects" onAdd={handleAdd} />
            ) : activeTab === 'Team' && team.length === 0 ? (
              <EmptyState type="team" onAdd={handleAdd} />
            ) : activeTab === 'Testimonials' && testimonials.length === 0 ? (
              <EmptyState type="testimonials" onAdd={handleAdd} />
            ) : (
              (activeTab === 'Services' ? services :
               activeTab === 'Projects' ? projects :
               activeTab === 'Team' ? team : testimonials).map((item, i) => (
                <div key={item._id} style={{ background: '#0F1D36', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 12, padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                      <span className="font-syne" style={{ fontSize: 14, fontWeight: 700, color: '#EDF2FF' }}>
                        {item.name || item.title || item.author}
                      </span>
                      {item.featured && <span style={{ fontSize: 9, padding: '2px 8px', borderRadius: 8, background: 'rgba(255,179,0,0.15)', color: '#FFB300', fontFamily: "'Syne',sans-serif", letterSpacing: '0.08em' }}>FEATURED</span>}
                      {item.status && <span className="font-dm" style={{ fontSize: 10, color: 'rgba(237,242,255,0.35)', textTransform: 'capitalize' }}>· {item.status}</span>}
                    </div>
                    <p className="font-dm" style={{ fontSize: 12, color: 'rgba(237,242,255,0.35)', margin: 0, maxWidth: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {item.description || item.bio || item.quote || item.position || ''}
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                    <button onClick={() => handleEdit(item)}
                      style={{ padding: '8px 16px', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8, background: 'transparent', color: 'rgba(237,242,255,0.6)', fontFamily: "'DM Sans',sans-serif", fontSize: 11, cursor: 'pointer' }}>Edit</button>
                    <button onClick={() => handleDelete(item._id)}
                      style={{ padding: '8px 16px', border: '1px solid rgba(255,107,107,0.25)', borderRadius: 8, background: 'transparent', color: '#FF6B6B', fontFamily: "'DM Sans',sans-serif", fontSize: 11, cursor: 'pointer' }}>Delete</button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Form Modal */}
        <AnimatePresence>
          {showForm && (
            <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', zIndex: 100, padding: '40px 20px', overflow: 'auto' }}
              onClick={() => setShowForm(false)}>
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 30, scale: 0.96 }}
                transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                style={{ background: '#0F1D36', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '36px 32px', width: '100%', maxWidth: 600, maxHeight: '85vh', overflow: 'auto' }}
                onClick={e => e.stopPropagation()}
              >
                <h2 className="font-syne" style={{ fontSize: 22, fontWeight: 800, color: '#EDF2FF', margin: '0 0 24px' }}>
                  {editing ? 'Edit' : 'Add'} {activeTab === 'Team' ? 'Member' : activeTab.slice(0, -1)}
                </h2>
                <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {Object.keys(formData).filter(k => k !== '_id' && k !== '__v' && k !== 'createdAt' && k !== 'updatedAt' && k !== 'results' && k !== 'images' && k !== 'social' && k !== 'pricing' && k !== 'deliverables' && k !== 'features' && k !== 'timeline').map(key => {
                    const isBool = typeof formData[key] === 'boolean';
                    const isTextArea = ['description', 'bio', 'quote', 'longDescription', 'message'].includes(key);
                    const isImage = ['image', 'imageUrl'].includes(key);
                    const isUrl = key === 'imageUrl';
                    const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase());
                    const imageUrl = isImage ? formData[key] : null;
                    return (
                      <div key={key}>
                        <label className="font-syne" style={{ fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(237,242,255,0.35)', display: 'block', marginBottom: 6 }}>{label === 'Image' && activeTab === 'Team' ? 'Profile Photo URL' : label === 'Image' ? 'Image URL' : label}{label === 'Image' || isUrl ? ' (paste image link)' : ''}</label>
                        {isImage && imageUrl ? (
                          <div style={{ marginBottom: 8 }}>
                            <div style={{ width: '100%', height: 180, borderRadius: 10, background: `url(${imageUrl}) center/cover no-repeat`, border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(0,0,0,0.3)' }} />
                            <span className="font-dm" style={{ fontSize: 10, color: 'rgba(237,242,255,0.25)', display: 'block', marginTop: 4 }}>Preview — update URL below to change</span>
                          </div>
                        ) : isImage && !imageUrl ? (
                          <div style={{ width: '100%', height: 100, borderRadius: 10, background: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 4 }}>
                            <span className="font-dm" style={{ fontSize: 12, color: 'rgba(237,242,255,0.2)' }}>🖼️ Paste image URL below to preview</span>
                          </div>
                        ) : null}
                        {isBool ? (
                          <select value={String(formData[key])} onChange={e => setFormData({ ...formData, [key]: e.target.value === 'true' })}
                            style={{ width: '100%', padding: '11px 14px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, color: '#EDF2FF', fontSize: 13, outline: 'none' }}>
                            <option value="true" style={{ background: '#0D1626' }}>Yes</option>
                            <option value="false" style={{ background: '#0D1626' }}>No</option>
                          </select>
                        ) : isTextArea ? (
                          <textarea value={formData[key] || ''} onChange={e => setFormData({ ...formData, [key]: e.target.value })}
                            rows="3" style={{ width: '100%', padding: '11px 14px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, color: '#EDF2FF', fontSize: 13, outline: 'none', resize: 'vertical', fontFamily: "'DM Sans',sans-serif" }} />
                        ) : key === 'category' && activeTab === 'Services' ? (
                          <select value={formData[key] || ''} onChange={e => setFormData({ ...formData, [key]: e.target.value })}
                            style={{ width: '100%', padding: '11px 14px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, color: '#EDF2FF', fontSize: 13, outline: 'none' }}>
                            {['development', 'marketing', 'design', 'strategy'].map(c =>
                              <option key={c} value={c} style={{ background: '#0D1626', textTransform: 'capitalize' }}>{c}</option>
                            )}
                          </select>
                        ) : key === 'status' ? (
                          <select value={formData[key] || ''} onChange={e => setFormData({ ...formData, [key]: e.target.value })}
                            style={{ width: '100%', padding: '11px 14px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, color: '#EDF2FF', fontSize: 13, outline: 'none' }}>
                            {['draft', 'in-progress', 'completed'].map(s =>
                              <option key={s} value={s} style={{ background: '#0D1626', textTransform: 'capitalize' }}>{s}</option>
                            )}
                          </select>
                        ) : key === 'rating' ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <input type="number" min="1" max="5" value={formData[key] || 5} onChange={e => setFormData({ ...formData, [key]: Number(e.target.value) })}
                              style={{ width: 70, padding: '11px 14px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, color: '#EDF2FF', fontSize: 13, outline: 'none' }} />
                            <span style={{ fontSize: 18 }}>
                              {['','⭐','⭐⭐','⭐⭐⭐','⭐⭐⭐⭐','⭐⭐⭐⭐⭐'][formData[key] || 5]}
                            </span>
                          </div>
                        ) : (
                          <input type="text" value={formData[key] || ''} onChange={e => setFormData({ ...formData, [key]: e.target.value })}
                            placeholder={isImage ? 'https://i.ibb.co/...' : key === 'slug' ? 'auto-generated-slug' : ''}
                            style={{ width: '100%', padding: '11px 14px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, color: '#EDF2FF', fontSize: 13, outline: 'none' }} />
                        )}
                      </div>
                    );
                  })}

                  {saveStatus && (
                    <p className="font-dm" style={{ fontSize: 12, color: saveStatus.type === 'error' ? '#FF6B6B' : '#00FF94', margin: 0 }}>
                      {saveStatus.message}
                    </p>
                  )}

                  <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
                    <button type="submit"
                      style={{ flex: 1, padding: '14px', background: 'linear-gradient(135deg, #00B8D4, #7B61FF)', border: 'none', borderRadius: 10, color: '#FFF', fontFamily: "'Syne',sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', cursor: 'pointer' }}>
                      {editing ? 'Update' : 'Create'}
                    </button>
                    <button type="button" onClick={() => setShowForm(false)}
                      style={{ padding: '14px 28px', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, background: 'transparent', color: 'rgba(237,242,255,0.5)', fontFamily: "'Syne',sans-serif", fontSize: 13, cursor: 'pointer' }}>
                      Cancel
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function EmptyState({ type, onAdd }) {
  return (
    <div style={{ background: '#0F1D36', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 14, padding: '60px 32px', textAlign: 'center' }}>
      <p className="font-syne" style={{ fontSize: 16, fontWeight: 700, color: 'rgba(237,242,255,0.4)', margin: '0 0 8px' }}>No {type} yet</p>
      <p className="font-dm" style={{ fontSize: 13, color: 'rgba(237,242,255,0.25)', margin: '0 0 20px' }}>Click the button below to add your first entry.</p>
      <button onClick={onAdd}
        style={{ padding: '12px 28px', background: 'linear-gradient(135deg, #00B8D4, #7B61FF)', border: 'none', borderRadius: 10, color: '#FFF', fontFamily: "'Syne',sans-serif", fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
        + Add {type === 'team' ? 'Member' : type.slice(0, -1)}
      </button>
    </div>
  );
}
