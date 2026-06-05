'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SkeletonGrid } from '@/components/Skeleton';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const getDefaultTestimonials = () => [
    {
      _id: '1',
      quote: 'NORDASH transformed our digital presence completely. The video content and social strategy they delivered exceeded every expectation.',
      author: 'Ahmed Khan',
      position: 'CEO',
      company: 'Oktopus Group',
      rating: 5,
    },
    {
      _id: '2',
      quote: 'Professional, creative, and incredibly responsive. The team understood our vision from day one and delivered results that actually moved the needle.',
      author: 'Sarah Lindström',
      position: 'Marketing Director',
      company: 'Nordic Brands',
      rating: 5,
    },
    {
      _id: '3',
      quote: 'The thumbnail designs they created boosted our CTR by over 40%. Technical skill combined with genuine creative insight — rare to find both.',
      author: 'Marcus Virtanen',
      position: 'Content Creator',
      company: 'Independent',
      rating: 5,
    },
  ];

  const fetchTestimonials = async () => {
    try {
      const response = await fetch('/api/testimonials');
      if (response.ok) {
        const data = await response.json();
        setTestimonials(data.testimonials?.length > 0 ? data.testimonials : getDefaultTestimonials());
      } else {
        setTestimonials(getDefaultTestimonials());
      }
    } catch {
      setTestimonials(getDefaultTestimonials());
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="testimonials" style={{ background: 'var(--deep)', padding: '120px 24px', position: 'relative', overflow: 'hidden' }}>
      {/* Background */}
      <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(0,229,255,0.06) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none' }} />
      <div className="truck-pattern-dense" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 60 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'center', marginBottom: 24 }}>
            <div style={{ width: 40, height: 1, background: 'var(--aurora-cyan)' }} />
            <span className="section-label" style={{ color: 'var(--aurora-cyan)' }}>Testimonials</span>
            <div style={{ width: 40, height: 1, background: 'var(--aurora-cyan)' }} />
          </div>
          <h2 className="font-syne" style={{ fontSize: 'clamp(32px, 6vw, 64px)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 16 }}>
            What Our <span className="text-gradient-aurora">Clients Say</span>
          </h2>
          <p className="font-dm" style={{ fontSize: 16, color: 'var(--text-muted)', maxWidth: 600, margin: '0 auto' }}>
            Real feedback from real clients who trusted us with their vision.
          </p>
        </motion.div>

        {loading ? (
          <SkeletonGrid count={3} columns={3} cardHeight={240} />
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
            {testimonials.map((t, i) => (
              <motion.div
                key={t._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass"
                style={{
                  padding: '36px 28px',
                  borderRadius: 12,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Stars */}
                <div style={{ display: 'flex', gap: 4, marginBottom: 20 }}>
                  {Array.from({ length: t.rating || 5 }).map((_, s) => (
                    <span key={s} style={{ color: '#FFB300', fontSize: 16 }}>★</span>
                  ))}
                </div>

                {/* Quote */}
                <p className="font-dm" style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.8, fontWeight: 300, flex: 1, marginBottom: 24, fontStyle: 'italic' }}>
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Author */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, borderTop: '1px solid var(--border)', paddingTop: 20 }}>
                  {t.image && (
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: `url(${t.image}) center/cover no-repeat`, flexShrink: 0 }} />
                  )}
                  <div>
                    <p className="font-syne" style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                      {t.author}
                    </p>
                    <p className="font-dm" style={{ fontSize: 11, color: 'var(--text-faint)', margin: '2px 0 0' }}>
                      {t.position}{t.company ? `, ${t.company}` : ''}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
