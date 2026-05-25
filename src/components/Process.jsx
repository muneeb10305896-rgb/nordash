"use client";
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const steps = [
  {
    num: '01',
    title: 'Discovery & Diagnosis',
    desc: 'We dissect your brand, audience, competitors, and goals. No guesswork — pure signal.',
    detail: ['Brand audit', 'Competitor mapping', 'Audience persona', 'Goal alignment'],
    accent: '#00E5FF',
  },
  {
    num: '02',
    title: 'Strategy & Blueprint',
    desc: 'We architect a precise roadmap: content pillars, creative direction, tech stack, KPIs.',
    detail: ['Creative direction', 'Content strategy', 'Tech architecture', 'Timeline & KPIs'],
    accent: '#7B61FF',
  },
  {
    num: '03',
    title: 'Design & Build',
    desc: 'Pixels get placed. Code gets written. Stories get told. Every asset crafted to brief.',
    detail: ['UI/UX prototyping', 'Visual production', 'Development sprints', 'Quality review'],
    accent: '#FFB300',
  },
  {
    num: '04',
    title: 'Launch & Amplify',
    desc: 'We ship, monitor, optimize, and scale — turning launch day into a long-term growth engine.',
    detail: ['Staged rollout', 'Performance tracking', 'Paid amplification', 'Ongoing iteration'],
    accent: '#00FF94',
  },
];

function MobileStep({ step, index }) {
  const ref = useRef(null);
  const inV = useInView(ref, { once: false });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 24 }} animate={inV ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className="glass" style={{ padding: '28px 24px', borderLeft: `3px solid ${step.accent}` }}
    >
      <div className="font-syne" style={{ fontSize: 11, letterSpacing: '0.2em', color: step.accent, marginBottom: 8 }}>{step.num}</div>
      <h3 className="font-syne" style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 10 }}>{step.title}</h3>
      <p className="font-dm" style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.7 }}>{step.desc}</p>
    </motion.div>
  );
}

function Step({ step, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-80px' });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -40 : 40 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -40 : 40 }}
      transition={{ duration: 0.8, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'start',
        gap: '0 32px',
        position: 'relative',
      }}
    >
      {/* Left: content or spacer */}
      <div style={{ gridColumn: isEven ? 1 : 3, textAlign: isEven ? 'right' : 'left' }}>
        <div className="glass" style={{ padding: '32px 28px', border: `1px solid ${step.accent}20`, position: 'relative', overflow: 'hidden' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = `${step.accent}50`; e.currentTarget.style.boxShadow = `0 20px 50px rgba(0,0,0,0.4), 0 0 30px ${step.accent}10`; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = `${step.accent}20`; e.currentTarget.style.boxShadow = 'none'; }}
        >
          {/* Corner accent */}
          <div style={{ position: 'absolute', [isEven ? 'right' : 'left']: 0, top: 0, width: 60, height: 60, background: `linear-gradient(${isEven ? '225' : '315'}deg, ${step.accent}08 0%, transparent 70%)` }} />

          <div className="font-syne" style={{ fontSize: 11, letterSpacing: '0.2em', color: step.accent, marginBottom: 12 }}>{step.num}</div>
          <h3 className="font-syne" style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12, letterSpacing: '-0.01em' }}>{step.title}</h3>
          <p className="font-dm" style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7, fontWeight: 300, marginBottom: 20 }}>{step.desc}</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: isEven ? 'flex-end' : 'flex-start' }}>
            {step.detail.map(d => (
              <div key={d} style={{ display: 'flex', alignItems: 'center', gap: 8, flexDirection: isEven ? 'row-reverse' : 'row' }}>
                <div style={{ width: 4, height: 4, background: step.accent, transform: 'rotate(45deg)', flexShrink: 0 }} />
                <span className="font-dm" style={{ fontSize: 12, color: 'var(--text-faint)', letterSpacing: '0.05em' }}>{d}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Center: timeline node */}
      <div style={{ gridColumn: 2, gridRow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 32 }}>
        <motion.div
          animate={inView ? { scale: [0.8, 1.1, 1], boxShadow: [`0 0 0 0 ${step.accent}00`, `0 0 0 8px ${step.accent}20`, `0 0 0 4px ${step.accent}10`] } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ width: 48, height: 48, borderRadius: '50%', background: `${step.accent}15`, border: `2px solid ${step.accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, zIndex: 1, position: 'relative' }}
        >
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: step.accent, boxShadow: `0 0 12px ${step.accent}` }} />
        </motion.div>
        {index < steps.length - 1 && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
            style={{ width: 1, height: 80, background: `linear-gradient(to bottom, ${step.accent}60, ${steps[index + 1].accent}30)`, transformOrigin: 'top', marginTop: 4 }}
          />
        )}
      </div>

      {/* Right: spacer or content */}
      <div style={{ gridColumn: isEven ? 3 : 1 }} />
    </motion.div>
  );
}

export default function Process() {
  const headRef = useRef(null);
  const inView = useInView(headRef, { once: false, margin: '-80px' });

  return (
    <section id="process" style={{ background: 'var(--deep)', padding: '120px 24px', position: 'relative', overflow: 'hidden' }}>
      {/* Background orb */}
      <div style={{ position: 'absolute', top: '30%', right: '-200px', width: '500px', height: '500px', borderRadius: '50%', background: '#7B61FF', filter: 'blur(120px)', opacity: 0.06, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', left: '-150px', width: '400px', height: '400px', borderRadius: '50%', background: '#FFB300', filter: 'blur(100px)', opacity: 0.05, pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          style={{ textAlign: 'center', marginBottom: 80 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'center', marginBottom: 24 }}>
            <div style={{ width: 40, height: 1, background: 'var(--truck-saffron)' }} />
            <span className="section-label-truck">How We Work</span>
            <div style={{ width: 40, height: 1, background: 'var(--truck-saffron)' }} />
          </div>
          <h2 className="font-syne" style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: 20 }}>
            Precision in Every{' '}
            <span className="text-gradient-truck">Phase</span>
          </h2>
          <p className="font-dm" style={{ fontSize: 16, color: 'var(--text-muted)', maxWidth: 480, margin: '0 auto', lineHeight: 1.7, fontWeight: 300 }}>
            Four stages. No surprises. We run a tight ship from brief to launch — with full visibility throughout.
          </p>
        </motion.div>

        {/* Timeline — desktop */}
        <div className="process-desktop" style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {steps.map((s, i) => <Step key={s.num} step={s} index={i} />)}
        </div>

        {/* Timeline — mobile fallback */}
        <div className="process-mobile" style={{ display: 'none', flexDirection: 'column', gap: 24 }}>
          {steps.map((s, i) => (
            <MobileStep key={s.num} step={s} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .process-desktop { display: none !important; }
          .process-mobile { display: flex !important; }
        }
      `}</style>
    </section>
  );
}
