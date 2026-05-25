"use client";
import { useRef } from 'react';
import { gsap } from 'gsap';

/**
 * Wraps any children in a magnetic attraction field.
 * On mouse move: element follows cursor with a strength factor.
 * On mouse leave: snaps back with elastic overshoot (anti-gravity spring).
 */
export default function MagneticButton({ children, strength = 0.38, style, className }) {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    gsap.to(el, {
      x: dx * strength,
      y: dy * strength,
      duration: 0.35,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  };

  const onLeave = () => {
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.85,
      ease: 'elastic.out(1, 0.38)',
      overwrite: 'auto',
    });
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      style={{ display: 'inline-block', ...style }}
    >
      {children}
    </div>
  );
}
