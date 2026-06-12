"use client";
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';

export default function SmoothScroll({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');
  const lenisRef = useRef(null);

  useEffect(() => {
    if (isAdmin) return;

    const isTouchDevice = typeof window !== 'undefined'
      && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

    const lenis = new Lenis({
      duration: isTouchDevice ? 1.2 : 1.0,
      easing: (t) => (t === 1 ? 1 : 1 - Math.pow(1 - t, 3)),
      smoothWheel: !isTouchDevice,
      wheelMultiplier: 1.2,
      touchMultiplier: 1.0,
      syncTouch: true,
      gestureOrientation: 'vertical',
      prevent: (node) => node.closest?.('[data-lenis-prevent]') != null,
    });

    lenisRef.current = lenis;

    // Standalone RAF loop — no GSAP dependency
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [isAdmin]);

  return children;
}
