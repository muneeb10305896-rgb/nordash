'use client';
import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CRMDashboard() {
  const [allLeads, setAllLeads] = useState([]);
  const [selectedLead, setSelectedLead] = useState(null);
  const [filter, setFilter] = useState('new');
  const [loading, setLoading] = useState(true);
  const [editingStatus, setEditingStatus] = useState(null);

  const leads = filter === 'all' ? allLeads : allLeads.filter(l => l.status === filter);

  const fetchLeads = useCallback(async () => {
    try {
      const response = await fetch('/api/leads');
      if (response.ok) {
        const data = await response.json();
        setAllLeads(data.leads || []);
      }
    } catch (error) {
      console.error('Failed to fetch leads:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let intervalId;
    let cancelled = false;

    (async () => {
      try {
        const r = await fetch('/api/admin/session');
        if (cancelled) return;
        if (!r.ok) { window.location.href = '/admin'; return; }
        fetchLeads();
        intervalId = setInterval(fetchLeads, 15000);
      } catch {
        if (!cancelled) window.location.href = '/admin';
      }
    })();

    return () => {
      cancelled = true;
      if (intervalId) clearInterval(intervalId);
    };
  }, [fetchLeads]);

  const updateLeadStatus = async (leadId, newStatus) => {
    try {
      const response = await fetch(`/api/leads/${leadId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        fetchLeads();
        setEditingStatus(null);
      }
    } catch (error) {
      console.error('Failed to update lead:', error);
    }
  };

  const statuses = ['all', 'new', 'contacted', 'qualified', 'proposal-sent', 'negotiating', 'won', 'lost'];
  const statusColors = {
    all: 'rgba(237,242,255,0.4)',
    new: '#00E5FF',
    contacted: '#FFB300',
    qualified: '#7B61FF',
    'proposal-sent': '#00FF94',
    negotiating: '#FF6B6B',
    won: '#00FF94',
    lost: '#FF6B6B',
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--midnight)', padding: '40px 20px' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
          <div>
            <h1 className="font-syne" style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              CRM Dashboard
            </h1>
            <p className="font-dm" style={{ fontSize: 13, color: 'var(--text-muted)', margin: '8px 0 0 0' }}>
              Manage leads, inquiries, and business growth
            </p>
          </div>
          <Link href="/admin">
            <motion.button className="btn-ghost" style={{ padding: '10px 20px', fontSize: 12 }}>
              Back to Admin
            </motion.button>
          </Link>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 40 }}>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: 20, borderRadius: 12 }}>
            <p className="font-dm" style={{ fontSize: 12, color: 'var(--text-muted)', margin: 0 }}>Total Leads</p>
            <h3 className="font-syne" style={{ fontSize: 28, fontWeight: 800, color: 'var(--aurora-cyan)', margin: '8px 0 0 0' }}>
              {allLeads.length}
            </h3>
          </div>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: 20, borderRadius: 12 }}>
            <p className="font-dm" style={{ fontSize: 12, color: 'var(--text-muted)', margin: 0 }}>Won Deals</p>
            <h3 className="font-syne" style={{ fontSize: 28, fontWeight: 800, color: '#00FF94', margin: '8px 0 0 0' }}>
              {allLeads.filter(l => l.status === 'won').length}
            </h3>
          </div>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: 20, borderRadius: 12 }}>
            <p className="font-dm" style={{ fontSize: 12, color: 'var(--text-muted)', margin: 0 }}>Conversion Rate</p>
            <h3 className="font-syne" style={{ fontSize: 28, fontWeight: 800, color: '#FFB300', margin: '8px 0 0 0' }}>
              {allLeads.length > 0 ? Math.round((allLeads.filter(l => l.status === 'won').length / allLeads.length) * 100) : 0}%
            </h3>
          </div>
        </div>

        {/* Leads Section */}
        <div style={{ marginBottom: 60 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <h2 className="font-syne" style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
              Sales Leads
            </h2>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {statuses.map(status => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className="font-dm"
                  style={{
                    padding: '8px 16px',
                    fontSize: 11,
                    border: filter === status ? `1px solid ${statusColors[status]}` : '1px solid var(--border)',
                    background: filter === status ? `${statusColors[status]}15` : 'transparent',
                    color: filter === status ? statusColors[status] : 'var(--text-muted)',
                    borderRadius: 6,
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    textTransform: 'capitalize',
                  }}
                >
                  {status.replace(/-/g, ' ')}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <p className="font-dm" style={{ color: 'var(--text-muted)' }}>Loading leads...</p>
            </div>
          ) : leads.length === 0 ? (
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '40px', borderRadius: 12, textAlign: 'center' }}>
              <p className="font-dm" style={{ color: 'var(--text-muted)' }}>No leads in this category yet</p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'rgba(0,0,0,0.2)', borderBottom: '1px solid var(--border)' }}>
                    <th className="font-dm" style={{ padding: '16px 20px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Name</th>
                    <th className="font-dm" style={{ padding: '16px 20px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Email</th>
                    <th className="font-dm" style={{ padding: '16px 20px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Service</th>
                    <th className="font-dm" style={{ padding: '16px 20px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Status</th>
                    <th className="font-dm" style={{ padding: '16px 20px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead, i) => (
                    <tr key={lead._id} style={{ borderBottom: i !== leads.length - 1 ? '1px solid var(--border)' : 'none', cursor: 'pointer' }}
                      onClick={() => setSelectedLead(lead)}>
                      <td className="font-dm" style={{ padding: '16px 20px', fontSize: 13, color: 'var(--text-primary)' }}>{lead.name}</td>
                      <td className="font-dm" style={{ padding: '16px 20px', fontSize: 12, color: '#00E5FF' }}>{lead.email}</td>
                      <td className="font-dm" style={{ padding: '16px 20px', fontSize: 12, color: 'var(--text-muted)', textTransform: 'capitalize' }}>{lead.serviceInterested || '-'}</td>
                      <td className="font-dm" style={{ padding: '16px 20px' }}>
                        <select
                          value={lead.status}
                          onClick={e => e.stopPropagation()}
                          onChange={e => updateLeadStatus(lead._id, e.target.value)}
                          style={{
                            background: `${statusColors[lead.status]}20`,
                            color: statusColors[lead.status],
                            border: `1px solid ${statusColors[lead.status]}`,
                            padding: '6px 10px',
                            borderRadius: 4,
                            fontSize: 11,
                            fontWeight: 600,
                            cursor: 'pointer',
                            textTransform: 'capitalize',
                          }}
                        >
                          {statuses.filter(s => s !== 'all').map(s => <option key={s} value={s}>{s.replace(/-/g, ' ')}</option>)}
                        </select>
                      </td>
                      <td className="font-dm" style={{ padding: '16px 20px', fontSize: 12, color: 'var(--text-faint)' }}>
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Lead Details Modal */}
        {selectedLead && (
          <div style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px'
          }} onClick={() => setSelectedLead(null)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                background: 'var(--surface)', borderRadius: 12, padding: '40px', maxWidth: 600, width: '100%', maxHeight: '90vh', overflowY: 'auto'
              }}
              data-lenis-prevent
              onClick={e => e.stopPropagation()}
            >
              <h2 className="font-syne" style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 24px 0' }}>
                {selectedLead.name}
              </h2>
              <div className="font-dm" style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.8 }}>
                <p><strong>Email:</strong> {selectedLead.email}</p>
                <p><strong>Phone:</strong> {selectedLead.phone || 'N/A'}</p>
                <p><strong>Company:</strong> {selectedLead.company || 'N/A'}</p>
                <p><strong>Service Interested:</strong> {selectedLead.serviceInterested || 'N/A'}</p>
                <p><strong>Budget:</strong> {selectedLead.budget || 'N/A'}</p>
                <p><strong>Timeline:</strong> {selectedLead.timeline || 'N/A'}</p>
                <p><strong>Message:</strong></p>
                <p style={{ background: 'var(--deep)', padding: 12, borderRadius: 6, whiteSpace: 'pre-wrap' }}>
                  {selectedLead.message || 'No message'}
                </p>
              </div>
              <motion.button
                className="btn-ghost"
                onClick={() => setSelectedLead(null)}
                style={{ marginTop: 24, width: '100%' }}
              >
                Close
              </motion.button>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
