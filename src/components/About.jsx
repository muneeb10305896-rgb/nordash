"use client";
import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const stats = [
  { label: 'Founded', value: '2024', accent: '#00E5FF' },
  { label: 'Projects', value: '50+', accent: '#7B61FF' },
  { label: 'Countries', value: '25+', accent: '#FFB300' },
  { label: 'Team', value: '12', accent: '#00FF94' },
];

export default function About({ onStartProject }) {
  const ref = useRef(null);
  const headRef = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-100px' });
  const headInView = useInView(headRef, { once: false, margin: '-100px' });

  return (
    <section id="about" style={{ background: 'var(--midnight)', padding: '120px 24px', position: 'relative', overflow: 'hidden' }}>
      {/* Animated orbs */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.16, 0.08] }}
        transition={{ duration: 12, repeat: Infinity }}
        style={{
          position: 'absolute',
          top: '-30%',
          left: '5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, #00E5FF, transparent)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.06, 0.14, 0.06] }}
        transition={{ duration: 15, repeat: Infinity, delay: 2 }}
        style={{
          position: 'absolute',
          bottom: '-20%',
          right: '5%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, #7B61FF, transparent)',
          filter: 'blur(100px)',
          pointerEvents: 'none',
        }}
      />

      {/* Truck art pattern */}
      <div className="truck-pattern-dense" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          style={{ textAlign: 'center', marginBottom: 60 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'center', marginBottom: 24 }}>
            <div style={{ width: 40, height: 1, background: 'var(--aurora-cyan)' }} />
            <span className="section-label">About NORDASH</span>
            <div style={{ width: 40, height: 1, background: 'var(--aurora-cyan)' }} />
          </div>
          <h2 className="font-syne" style={{
            fontSize: 'clamp(40px, 7vw, 72px)',
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            marginBottom: 24,
          }}>
            <span style={{ color: 'var(--text-primary)' }}>Where </span>
            <span className="text-gradient-aurora">Nordic Precision</span>
            <br />
            <span style={{ color: 'var(--text-primary)' }}>Meets </span>
            <span style={{ color: '#FFB300', textShadow: '0 0 30px rgba(255,179,0,0.5)' }}>Asian Energy</span>
          </h2>
          <p className="font-dm" style={{
            fontSize: 16,
            color: 'var(--text-muted)',
            maxWidth: 620,
            margin: '0 auto',
            lineHeight: 1.8,
            fontWeight: 300,
          }}>
            We&apos;re a full-spectrum digital agency built on the belief that excellence comes from blending meticulous planning with unbridled creativity. Every project is a masterpiece in progress.
          </p>
        </motion.div>

        {/* Content Grid */}
        <div ref={ref} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32, marginBottom: 60 }}>
          {[
            {
              icon: '🎯',
              title: 'Our Mission',
              text: 'Build digital experiences that transcend the algorithm. Brands that matter. Systems that scale. Stories that stick.',
              accent: '#00E5FF',
            },
            {
              icon: '⚡',
              title: 'Our Approach',
              text: 'Nordic precision in every pixel. Asian energy in every idea. No shortcuts. No surprises. Just pure craft.',
              accent: '#7B61FF',
            },
            {
              icon: '🚀',
              title: 'Our Promise',
              text: '24h response time. NDA on request. Remote-first teams. Custom solutions. Your success is our metric.',
              accent: '#FFB300',
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
              className="glass"
              style={{
                padding: '32px',
                border: `1px solid ${item.accent}20`,
                borderRadius: 12,
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = `${item.accent}50`;
                e.currentTarget.style.boxShadow = `0 20px 50px rgba(0,0,0,0.3), 0 0 30px ${item.accent}10`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = `${item.accent}20`;
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Corner accent */}
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: 100,
                height: 100,
                background: `linear-gradient(225deg, ${item.accent}08, transparent)`,
              }} />

              <div style={{ fontSize: 32, marginBottom: 12 }}>{item.icon}</div>
              <h3 className="font-syne" style={{
                fontSize: 18,
                fontWeight: 700,
                color: 'var(--text-primary)',
                marginBottom: 12,
              }}>
                {item.title}
              </h3>
              <p className="font-dm" style={{
                fontSize: 13,
                color: 'var(--text-muted)',
                lineHeight: 1.7,
                fontWeight: 300,
              }}>
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: 24,
            marginBottom: 60,
            padding: '40px',
            background: 'rgba(13, 22, 38, 0.4)',
            border: '1px solid var(--border)',
            borderRadius: 12,
          }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
              style={{ textAlign: 'center' }}
            >
              <div className="font-syne" style={{
                fontSize: 'clamp(28px, 5vw, 48px)',
                fontWeight: 800,
                background: `linear-gradient(135deg, ${stat.accent}, ${stat.accent}80)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: 8,
              }}>
                {stat.value}
              </div>
              <p className="font-dm" style={{
                fontSize: 11,
                color: 'var(--text-faint)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Culture */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            textAlign: 'center',
            padding: '60px 40px',
            background: 'linear-gradient(135deg, rgba(0,229,255,0.06) 0%, rgba(123,97,255,0.06) 100%)',
            border: '1px solid var(--border)',
            borderRadius: 12,
            marginBottom: 60,
          }}
        >
          <h3 className="font-syne" style={{
            fontSize: 28,
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: 16,
          }}>
            We Don&apos;t Just Build—We Collaborate
          </h3>
          <p className="font-dm" style={{
            fontSize: 14,
            color: 'var(--text-muted)',
            maxWidth: 520,
            margin: '0 auto',
            lineHeight: 1.8,
            fontWeight: 300,
          }}>
            Your vision becomes our mission. Transparency at every stage. Regular updates, zero surprises. We&apos;re invested in your success before day one and long after launch.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          style={{ textAlign: 'center' }}
        >
          <p className="font-dm" style={{
            fontSize: 14,
            color: 'var(--text-muted)',
            marginBottom: 20,
          }}>
            Ready to build something extraordinary?
          </p>
          <button className="btn-primary" onClick={() => onStartProject?.()} style={{ padding: '16px 46px', fontSize: 12, border: 'none', cursor: 'pointer' }}>
            <span>Start a Project</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ position: 'relative', zIndex: 1 }}>
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
