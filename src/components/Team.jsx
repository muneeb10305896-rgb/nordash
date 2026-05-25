'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Team() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    try {
      const response = await fetch('/api/team');
      if (response.ok) {
        const data = await response.json();
        setMembers(data.members && data.members.length > 0 ? data.members : getDefaultMembers());
      }
    } catch (error) {
      console.error('Failed to fetch team:', error);
      setMembers(getDefaultMembers());
    } finally {
      setLoading(false);
    }
  };

  const getDefaultMembers = () => [
    {
      _id: 'muneeb-ahmed-butt',
      name: 'Muneeb Ahmed Butt',
      position: 'Founder & Digital Strategist',
      bio: 'IT student at University of Eastern Finland, blending Nordic precision with Asian energy to create digital solutions that convert.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      expertise: ['Video Editing', 'UI/UX Design', 'Web Development', 'Brand Strategy', 'Digital Marketing'],
      social: {
        linkedin: 'https://www.linkedin.com/in/muneeb-ahmed-butt/',
        github: 'https://github.com/muneeb10305896-rgb',
      }
    }
  ];

  return (
    <section id="team" style={{ background: 'var(--surface)', padding: '120px 24px', position: 'relative' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 60 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'center', marginBottom: 24 }}>
            <div style={{ width: 40, height: 1, background: 'var(--truck-saffron)' }} />
            <span className="section-label-truck" style={{ color: 'var(--truck-saffron)' }}>Our Team</span>
            <div style={{ width: 40, height: 1, background: 'var(--truck-saffron)' }} />
          </div>

          <h2 className="font-syne" style={{ fontSize: 'clamp(32px, 6vw, 64px)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 16 }}>
            Meet the Crew
          </h2>
          <p className="font-dm" style={{ fontSize: 16, color: 'var(--text-muted)', maxWidth: 600, margin: '0 auto' }}>
            Talented designers, developers, and strategists united by Nordic precision and Asian energy.
          </p>
        </motion.div>

        {/* Team Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <p className="font-dm" style={{ color: 'var(--text-muted)' }}>Loading team...</p>
          </div>
        ) : members.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <p className="font-dm" style={{ color: 'var(--text-muted)' }}>Team members coming soon!</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32 }}>
            {members.map((member, i) => (
              <motion.div
                key={member._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                style={{
                  background: 'var(--midnight)',
                  border: '1px solid var(--border)',
                  borderRadius: 12,
                  overflow: 'hidden',
                  textAlign: 'center',
                }}
                whileHover={{ y: -8 }}
              >
                {member.image && (
                  <div style={{
                    width: '100%',
                    height: 280,
                    background: 'var(--deep)',
                    backgroundImage: `url(${member.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }} />
                )}
                <div style={{ padding: 24 }}>
                  <h3 className="font-syne" style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 4px 0' }}>
                    {member.name}
                  </h3>
                  <p className="font-dm" style={{ fontSize: 13, color: 'var(--truck-saffron)', margin: '0 0 12px 0', fontWeight: 500 }}>
                    {member.position}
                  </p>
                  {member.bio && (
                    <p className="font-dm" style={{ fontSize: 13, color: 'var(--text-muted)', margin: '0 0 16px 0', lineHeight: 1.5 }}>
                      {member.bio}
                    </p>
                  )}
                  {member.expertise && (
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 16 }}>
                      {member.expertise.slice(0, 3).map(exp => (
                        <span key={exp} className="font-dm" style={{ fontSize: 10, background: 'rgba(255,179,0,0.1)', color: 'var(--truck-saffron)', padding: '4px 8px', borderRadius: 4 }}>
                          {exp}
                        </span>
                      ))}
                    </div>
                  )}
                  {member.social && (
                    <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                      {member.social.linkedin && (
                        <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.3s' }}
                          onMouseEnter={e => e.currentTarget.style.color = 'var(--aurora-cyan)'}
                          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                        >
                          LinkedIn
                        </a>
                      )}
                      {member.social.twitter && (
                        <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.3s' }}
                          onMouseEnter={e => e.currentTarget.style.color = 'var(--aurora-cyan)'}
                          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                        >
                          Twitter
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
