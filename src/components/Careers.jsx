"use client";
import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import ApplicationModal from './ApplicationModal';

const positions = [
  {
    id: 'designer',
    title: 'UI/UX Designer',
    department: 'Design',
    level: 'Mid-Senior',
    description: 'Shape digital experiences that matter. We\'re looking for a designer who believes in Nordic precision and Asian creativity.',
    requirements: ['3+ years experience', 'Figma expert', 'Design systems', 'User research'],
    type: 'Full-time',
  },
  {
    id: 'developer',
    title: 'Full Stack Developer',
    department: 'Engineering',
    level: 'Mid-Senior',
    description: 'Build scalable systems and experiences. Join us in creating digital solutions that transcend the algorithm.',
    requirements: ['3+ years experience', 'React/Next.js', 'Node.js', 'PostgreSQL'],
    type: 'Full-time',
  },
  {
    id: 'content',
    title: 'Content Creator',
    department: 'Marketing',
    level: 'Mid',
    description: 'Create stories that stick. Produce video content, social media campaigns, and brand narratives.',
    requirements: ['2+ years experience', 'Video editing', 'Social media', 'Storytelling'],
    type: 'Full-time',
  },
  {
    id: 'strategist',
    title: 'Brand Strategist',
    department: 'Strategy',
    level: 'Senior',
    description: 'Shape brand futures. Work with clients to build strategies that matter and systems that scale.',
    requirements: ['5+ years experience', 'Brand strategy', 'Market research', 'Client management'],
    type: 'Full-time',
  },
];

export default function Careers() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-100px' });
  const [selectedPosition, setSelectedPosition] = useState(null);

  return (
    <section id="careers" style={{ background: 'var(--midnight)', padding: '120px 24px', position: 'relative', overflow: 'hidden' }}>
      {/* Background orbs */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.14, 0.08] }}
        transition={{ duration: 12, repeat: Infinity }}
        style={{
          position: 'absolute',
          top: '-30%',
          right: '10%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, #FFB300, transparent)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      <div ref={ref} style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          style={{ textAlign: 'center', marginBottom: 80 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'center', marginBottom: 24 }}>
            <div style={{ width: 40, height: 1, background: '#FFB300' }} />
            <span className="section-label" style={{ color: '#FFB300' }}>Join Our Team</span>
            <div style={{ width: 40, height: 1, background: '#FFB300' }} />
          </div>
          <h2 className="font-syne" style={{
            fontSize: 'clamp(40px, 7vw, 72px)',
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            marginBottom: 24,
          }}>
            <span style={{ color: 'var(--text-primary)' }}>Build Something </span>
            <span style={{ color: '#FFB300', textShadow: '0 0 30px rgba(255,179,0,0.3)' }}>Extraordinary</span>
            <br />
            <span style={{ color: 'var(--text-primary)' }}>With Us</span>
          </h2>
          <p className="font-dm" style={{
            fontSize: 16,
            color: 'var(--text-muted)',
            maxWidth: 600,
            margin: '0 auto',
            lineHeight: 1.8,
            fontWeight: 300,
          }}>
            We're a team of designers, developers, and strategists obsessed with precision and creativity. If you share our values, let's build together.
          </p>
        </motion.div>

        {/* Positions Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, marginBottom: 60 }}>
          {positions.map((position, i) => (
            <motion.div
              key={position.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
              className="glass"
              style={{
                padding: '32px',
                border: '1px solid rgba(255,179,0,0.2)',
                borderRadius: 12,
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(255,179,0,0.5)';
                e.currentTarget.style.boxShadow = '0 20px 50px rgba(0,0,0,0.3), 0 0 30px rgba(255,179,0,0.1)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,179,0,0.2)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              onClick={() => setSelectedPosition(position)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 16 }}>
                <div>
                  <h3 className="font-syne" style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    margin: '0 0 4px 0',
                  }}>
                    {position.title}
                  </h3>
                  <p className="font-dm" style={{
                    fontSize: 12,
                    color: 'var(--text-faint)',
                    margin: 0,
                    letterSpacing: '0.05em',
                  }}>
                    {position.department} • {position.level}
                  </p>
                </div>
                <span className="font-dm" style={{
                  fontSize: 10,
                  background: 'rgba(255,179,0,0.1)',
                  color: '#FFB300',
                  padding: '4px 12px',
                  borderRadius: 4,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  fontWeight: 600,
                }}>
                  {position.type}
                </span>
              </div>

              <p className="font-dm" style={{
                fontSize: 13,
                color: 'var(--text-muted)',
                lineHeight: 1.6,
                marginBottom: 20,
                fontWeight: 300,
              }}>
                {position.description}
              </p>

              <div style={{ marginBottom: 20 }}>
                <p className="font-dm" style={{
                  fontSize: 10,
                  color: 'var(--text-faint)',
                  margin: '0 0 8px 0',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}>
                  Requirements
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {position.requirements.map(req => (
                    <span key={req} className="font-dm" style={{
                      fontSize: 11,
                      background: 'rgba(123,97,255,0.1)',
                      color: '#7B61FF',
                      padding: '6px 12px',
                      borderRadius: 4,
                    }}>
                      {req}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPosition(position);
                }}
                className="btn-primary"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  fontSize: 12,
                  marginTop: 'auto',
                }}
              >
                <span>Apply Now</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ marginLeft: 6 }}>
                  <path d="M2.5 7h9M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
          style={{
            textAlign: 'center',
            padding: '60px 40px',
            background: 'linear-gradient(135deg, rgba(255,179,0,0.06) 0%, rgba(255,179,0,0.03) 100%)',
            border: '1px solid var(--border)',
            borderRadius: 12,
          }}
        >
          <h3 className="font-syne" style={{
            fontSize: 24,
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: 16,
          }}>
            Don't see a fit?
          </h3>
          <p className="font-dm" style={{
            fontSize: 14,
            color: 'var(--text-muted)',
            maxWidth: 500,
            margin: '0 auto 24px',
            lineHeight: 1.8,
          }}>
            We're always looking for talented people. Send us your portfolio and let's talk about how you can contribute to NORDASH.
          </p>
          <button className="btn-ghost" style={{ padding: '12px 32px', fontSize: 12 }}>
            Send Your Portfolio
          </button>
        </motion.div>
      </div>

      {/* Application Modal */}
      <ApplicationModal
        isOpen={selectedPosition !== null}
        onClose={() => setSelectedPosition(null)}
        position={selectedPosition}
      />

      <style>{`
        @media (max-width: 900px) {
          .careers-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
