"use client";
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }) {
  const pathname = usePathname();
  // The admin panel is a utility UI with its own scrollable modals — Lenis
  // hijacks the wheel globally and breaks scrolling inside those popups, so we
  // skip smooth-scroll entirely on admin routes.
  const isAdmin = pathname?.startsWith('/admin');

  useEffect(() => {
    if (isAdmin) return;

    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => (t === 1 ? 1 : 1 - Math.pow(1 - t, 3)),
      smoothWheel: true,
      wheelMultiplier: 1.4,
      touchMultiplier: 1.8,
      syncTouch: true,
      gestureOrientation: 'vertical',
      // Let any element marked data-lenis-prevent (e.g. modal scroll areas)
      // scroll natively instead of being captured by Lenis.
      prevent: (node) => node.closest?.('[data-lenis-prevent]') != null,
    });

    // Wire Lenis into GSAP ticker
    lenis.on('scroll', () => {
      ScrollTrigger.update();
    });

    const tickerCallback = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickerCallback);
    };
  }, [isAdmin]);

  return children;
}
