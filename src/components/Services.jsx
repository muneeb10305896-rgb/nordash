"use client";
import { useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';

const services = [
  {
    id: '01', title: 'Video Editing',
    desc: 'Cinematic cuts, colour grading, motion graphics and reels that stop the scroll and demand a second watch.',
    icon: (<svg width="30" height="30" viewBox="0 0 30 30" fill="none"><rect x="2" y="6" width="19" height="18" rx="2.5" stroke="currentColor" strokeWidth="1.6"/><path d="M21 11l7-4v16l-7-4V11z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/><path d="M8 13l6 3.5-6 3.5V13z" fill="currentColor"/></svg>),
    accent: '#00E5FF', tag: 'Creative',
  },
  {
    id: '02', title: 'Thumbnail Design',
    desc: 'High-CTR thumbnails engineered with visual psychology, contrast and hierarchy that compel the click.',
    icon: (<svg width="30" height="30" viewBox="0 0 30 30" fill="none"><rect x="2" y="4" width="26" height="22" rx="2.5" stroke="currentColor" strokeWidth="1.6"/><circle cx="9" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.6"/><path d="M2 22l8-7 6 6 4-4 10 9" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>),
    accent: '#FFB300', tag: 'Design',
  },
  {
    id: '03', title: 'Social Media Marketing',
    desc: 'Strategy, content, paid campaigns and growth systems that turn followers into customers at scale.',
    icon: (<svg width="30" height="30" viewBox="0 0 30 30" fill="none"><path d="M4 22l7-9 5 6 5-7 6 10" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/><circle cx="24" cy="6" r="3.5" stroke="currentColor" strokeWidth="1.6"/><circle cx="6" cy="24" r="2.5" stroke="currentColor" strokeWidth="1.6"/></svg>),
    accent: '#7B61FF', tag: 'Growth',
  },
  {
    id: '04', title: 'Software Development',
    desc: 'Web apps, SaaS platforms and mobile solutions built with modern stacks — performant, scalable, beautiful.',
    icon: (<svg width="30" height="30" viewBox="0 0 30 30" fill="none"><rect x="2" y="4" width="26" height="22" rx="2.5" stroke="currentColor" strokeWidth="1.6"/><path d="M9 11l-5 4.5 5 4.5M21 11l5 4.5-5 4.5M17 8l-4 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>),
    accent: '#00FF94', tag: 'Technology',
  },
  {
    id: '05', title: 'Brand Strategy',
    desc: 'Identity systems, positioning, messaging frameworks and visual languages that make your brand unforgettable.',
    icon: (<svg width="30" height="30" viewBox="0 0 30 30" fill="none"><circle cx="15" cy="15" r="11" stroke="currentColor" strokeWidth="1.6"/><circle cx="15" cy="15" r="5" stroke="currentColor" strokeWidth="1.6"/><path d="M15 2v5M15 23v5M2 15h5M23 15h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>),
    accent: '#D72B2B', tag: 'Strategy',
  },
  {
    id: '06', title: 'UI / UX Design',
    desc: 'Pixel-perfect interfaces and frictionless experiences grounded in research, logic, and delight.',
    icon: (<svg width="30" height="30" viewBox="0 0 30 30" fill="none"><rect x="2" y="2" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.6"/><rect x="17" y="2" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.6"/><rect x="2" y="17" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.6"/><circle cx="22.5" cy="22.5" r="5.5" stroke="currentColor" strokeWidth="1.6"/><path d="M22.5 20v5M20 22.5h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>),
    accent: '#FF4081', tag: 'Design',
  },
  {
    id: '07', title: 'SEO & Content Strategy',
    desc: 'Search optimization, keyword research, content calendars and growth systems that drive organic traffic and rankings.',
    icon: (<svg width="30" height="30" viewBox="0 0 30 30" fill="none"><circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.6"/><path d="M18.5 18.5l7.07 7.07" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/><path d="M9 12h6M12 9v6M15 12a3 3 0 11-6 0 3 3 0 016 0z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>),
    accent: '#00D084', tag: 'Growth',
  },
  {
    id: '08', title: 'Mobile App Development',
    desc: 'Native and cross-platform apps for iOS and Android. Fast, beautiful, and built to convert users into loyal customers.',
    icon: (<svg width="30" height="30" viewBox="0 0 30 30" fill="none"><rect x="5" y="2" width="20" height="26" rx="2.5" stroke="currentColor" strokeWidth="1.6"/><circle cx="15" cy="25" r="1.5" fill="currentColor"/><line x1="8" y1="5" x2="22" y2="5" stroke="currentColor" strokeWidth="1.6"/><path d="M10 10l3 4 5-8 2 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>),
    accent: '#E65100', tag: 'Technology',
  },
];

function Card3D({ service, index }) {
  const wrapRef = useRef(null);
  const glowRef = useRef(null);
  const inViewRef = useRef(null);
  const inView = useInView(inViewRef, { once: false, margin: '-60px' });

  // useMotionValue.set() never causes a React re-render
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springCfg = { stiffness: 180, damping: 18, restDelta: 0.001 };
  const sx = useSpring(mx, springCfg);
  const sy = useSpring(my, springCfg);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-12, 12]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [12, -12]);

  const onMove = (e) => {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mx.set(x - 0.5);
    my.set(y - 0.5);
    // Direct DOM — no React re-render
    if (glowRef.current) {
      glowRef.current.style.backgroundImage =
        `radial-gradient(circle at ${x * 100}% ${y * 100}%, ${service.accent}16 0%, transparent 56%)`;
    }
  };

  const onEnter = () => {
    if (wrapRef.current) {
      wrapRef.current.style.borderColor = `${service.accent}48`;
      wrapRef.current.style.boxShadow =
        `0 28px 60px rgba(0,0,0,0.5), 0 0 0 1px ${service.accent}18, 0 0 50px ${service.accent}0e`;
    }
    if (glowRef.current) glowRef.current.style.opacity = '1';
  };

  const onLeave = () => {
    mx.set(0); my.set(0);
    if (wrapRef.current) {
      wrapRef.current.style.borderColor = 'rgba(255,255,255,0.07)';
      wrapRef.current.style.boxShadow = 'none';
    }
    if (glowRef.current) glowRef.current.style.opacity = '0';
  };

  return (
    // Outer ref for inView detection (no transforms on this element)
    <div ref={inViewRef}>
      <motion.div
        ref={wrapRef}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.7, delay: (index % 3) * 0.08, ease: [0.23, 1, 0.32, 1] }}
        style={{
          rotateX, rotateY,
          transformPerspective: 1100,
          transformStyle: 'preserve-3d',
          willChange: 'transform',
          padding: '36px 30px',
          position: 'relative', overflow: 'hidden',
          background: 'rgba(13,22,38,0.85)',
          border: '1px solid rgba(255,255,255,0.07)',
          transition: 'border-color 0.4s, box-shadow 0.4s',
          cursor: 'default',
        }}
        onMouseMove={onMove}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      >
        {/* Cursor-follow glow — DOM-updated, opacity toggled */}
        <div ref={glowRef} style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'none', opacity: 0,
          transition: 'opacity 0.3s',
        }} />

        {/* Truck-art corner accent */}
        <div style={{ position: 'absolute', top: 0, right: 0, width: 90, height: 90, background: `linear-gradient(225deg, ${service.accent}10 0%, transparent 65%)`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 14, right: 14, width: 7, height: 7, background: service.accent, transform: 'rotate(45deg)', opacity: 0.35 }} />

        {/* ID */}
        <div className="font-syne" style={{ fontSize: 10, letterSpacing: '0.25em', color: service.accent, opacity: 0.65, marginBottom: 18 }}>{service.id}</div>

        {/* Icon */}
        <div style={{
          width: 56, height: 56, borderRadius: 10,
          background: `${service.accent}12`, border: `1px solid ${service.accent}25`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 24, color: service.accent,
          transform: 'translateZ(18px)',
        }}>
          {service.icon}
        </div>

        {/* Text */}
        <h3 className="font-syne" style={{ fontSize: 20, fontWeight: 700, color: '#EDF2FF', marginBottom: 10, letterSpacing: '-0.01em', transform: 'translateZ(12px)' }}>
          {service.title}
        </h3>
        <p className="font-dm" style={{ fontSize: 13.5, color: 'rgba(237,242,255,0.48)', lineHeight: 1.75, marginBottom: 28, fontWeight: 300 }}>
          {service.desc}
        </p>

        {/* Footer */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span className="font-syne" style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: service.accent }}>{service.tag}</span>
          <div style={{ width: 30, height: 30, borderRadius: '50%', border: `1px solid ${service.accent}35`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: service.accent }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Services() {
  const headRef = useRef(null);
  const inView = useInView(headRef, { once: false, margin: '-80px' });

  return (
    <section id="services" style={{ background: '#08101F', padding: '120px 24px', position: 'relative', overflow: 'hidden' }}>
      {/* Static background accent — no animation cost */}
      <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: '50%', height: '60%', background: 'radial-gradient(ellipse at center, rgba(123,97,255,0.07) 0%, transparent 70%)', filter: 'blur(70px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-10%', right: '-5%', width: '45%', height: '50%', background: 'radial-gradient(ellipse at center, rgba(255,179,0,0.05) 0%, transparent 70%)', filter: 'blur(70px)', pointerEvents: 'none' }} />
      <div className="truck-pattern-dense" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 36 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
          transition={{ duration: 0.85, ease: [0.23, 1, 0.32, 1] }}
          style={{ marginBottom: 72, maxWidth: 660 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 22 }}>
            <div style={{ width: 6, height: 6, background: '#FFB300', transform: 'rotate(45deg)', boxShadow: '0 0 12px #FFB300' }} />
            <span className="section-label-truck">What We Do</span>
          </div>
          <h2 className="font-syne" style={{ fontSize: 'clamp(34px, 5vw, 58px)', fontWeight: 800, lineHeight: 1.04, letterSpacing: '-0.02em', marginBottom: 20 }}>
            Every Discipline.{' '}
            <span style={{
              background: 'linear-gradient(135deg, #00E5FF, #7B61FF)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              filter: 'drop-shadow(0 0 18px rgba(0,229,255,0.28))',
            }}>One Vision.</span>
          </h2>
          <p className="font-dm" style={{ fontSize: 16, color: 'rgba(237,242,255,0.48)', lineHeight: 1.75, fontWeight: 300 }}>
            From single assets to full-stack transformations — zero compromise on quality, one studio for everything.
          </p>
        </motion.div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 0,
          background: 'transparent',
          border: 'none',
        }}
        className="responsive-grid">
          {services.map((s, i) => (
            <div key={s.id} style={{ background: '#08101F' }}>
              <Card3D service={s} index={i} />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .responsive-grid {
          grid-template-columns: repeat(4, 1fr);
        }
        @media (max-width: 1200px) {
          .responsive-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
        @media (max-width: 800px) {
          .responsive-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 500px) {
          .responsive-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
