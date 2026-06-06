'use client';
import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { SkeletonGrid } from '@/components/Skeleton';

export default function Team() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const getDefaultMembers = () => [
    {
      _id: 'muneeb-ahmed-butt',
      name: 'Muneeb Ahmed Butt',
      position: 'Full Stack Developer',
      bio: 'IT student at University of Eastern Finland, blending Nordic precision with Asian energy to create digital solutions that convert.',
      image: 'https://i.ibb.co/mr8TRzwZ/PROFILE.jpg',
      expertise: ['Video Editing', 'UI/UX Design', 'Web Development', 'Brand Strategy', 'Digital Marketing'],
      social: {
        linkedin: 'https://www.linkedin.com/in/muneeb-ahmed-butt-4a384438a/',
        github: 'https://github.com/muneeb10305896-rgb',
      }
    },
    {
      _id: 'farheen-e-sehar',
      name: 'Farheen E Sehar',
      position: 'Marketing Manager',
      bio: 'Versatile marketing professional with rich experience in social media strategy, content creation, and digital campaign management across B2C and B2B sectors. Dedicated to driving brand growth and fostering strong audience connections through data-driven insights.',
      image: 'https://i.ibb.co/Z6hKMn6B/1762450046043.jpg',
      expertise: ['Social Media Marketing', 'Content Creation', 'Digital Marketing', 'Brand Strategy', 'Campaign Management'],
      social: {
        linkedin: 'https://www.linkedin.com/in/farheen-e-sehar-8b0868177/',
      }
    }
  ];

  const fetchTeam = useCallback(async () => {
    try {
      const response = await fetch('/api/team');
      if (response.ok) {
        const data = await response.json();
        setMembers(data.members && data.members.length > 0 ? data.members : getDefaultMembers());
      } else {
        setMembers(getDefaultMembers());
      }
    } catch (error) {
      console.error('Failed to fetch team:', error);
      setMembers(getDefaultMembers());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Mount fetch from the API — external sync, not derived render state.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchTeam();
  }, [fetchTeam]);

  return (
    <section id="team" style={{ background: 'var(--midnight)', padding: '120px 24px', position: 'relative', overflow: 'hidden' }}>
      {/* ── Blurry background orbs ── */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.10, 0.20, 0.10] }}
        transition={{ duration: 12, repeat: Infinity }}
        style={{
          position: 'absolute', top: '-25%', left: '5%',
          width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(ellipse, #00E5FF, transparent)',
          filter: 'blur(80px)', pointerEvents: 'none',
        }}
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.18, 0.08] }}
        transition={{ duration: 15, repeat: Infinity, delay: 2 }}
        style={{
          position: 'absolute', bottom: '-20%', right: '5%',
          width: 600, height: 600, borderRadius: '50%',
          background: 'radial-gradient(ellipse, #7B61FF, transparent)',
          filter: 'blur(100px)', pointerEvents: 'none',
        }}
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.06, 0.14, 0.06] }}
        transition={{ duration: 18, repeat: Infinity, delay: 5 }}
        style={{
          position: 'absolute', top: '40%', right: '15%',
          width: 350, height: 350, borderRadius: '50%',
          background: 'radial-gradient(ellipse, #FFD700, transparent)',
          filter: 'blur(90px)', pointerEvents: 'none',
        }}
      />

      {/* ── Diamond grid overlay ── */}
      <div className="truck-pattern-dense" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
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
          <SkeletonGrid count={2} columns={2} cardHeight={340} />
        ) : members.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <p className="font-dm" style={{ color: 'var(--text-muted)' }}>Team members coming soon!</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 40 }}>
            {members.map((member, i) => (
              <motion.div
                key={member._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass"
                style={{
                  borderRadius: 12,
                  padding: 24,
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
                whileHover={{ y: -8 }}
              >
                {member.image && (
                  <div style={{
                    width: 140,
                    height: 140,
                    borderRadius: '50%',
                    background: 'var(--deep)',
                    backgroundImage: `url(${member.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    marginBottom: 16,
                    border: '2px solid var(--truck-saffron)',
                  }} />
                )}
                <h3 className="font-syne" style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 4px 0' }}>
                  {member.name}
                </h3>
                <p className="font-dm" style={{ fontSize: 12, color: 'var(--truck-saffron)', margin: '0 0 12px 0', fontWeight: 500 }}>
                  {member.position}
                </p>
                {member.bio && (
                  <p className="font-dm" style={{ fontSize: 12, color: 'var(--text-muted)', margin: '0 0 12px 0', lineHeight: 1.5 }}>
                    {member.bio}
                  </p>
                )}
                {member.expertise && (
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 12 }}>
                    {member.expertise.slice(0, 3).map(exp => (
                      <span key={exp} className="font-dm" style={{ fontSize: 9, background: 'rgba(255,179,0,0.1)', color: 'var(--truck-saffron)', padding: '3px 6px', borderRadius: 3 }}>
                        {exp}
                      </span>
                    ))}
                  </div>
                )}
                {member.social && (
                  <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 'auto' }}>
                    {member.social.linkedin && (
                      <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.3s' }}
                        onMouseEnter={e => e.currentTarget.style.color = 'var(--aurora-cyan)'}
                        onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                      >
                        LinkedIn
                      </a>
                    )}
                    {member.social.twitter && (
                      <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.3s' }}
                        onMouseEnter={e => e.currentTarget.style.color = 'var(--aurora-cyan)'}
                        onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                      >
                        Twitter
                      </a>
                    )}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
