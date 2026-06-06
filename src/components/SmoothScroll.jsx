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

    // Detect touch-capable device to tune scroll feel per platform.
    // Checking at mount is fine — device capabilities don't change during a session.
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
    // Re-enable GSAP lag smoothing (was set to 0 — disabled) so frame spikes on
    // mobile don't translate to sudden scroll jumps.
    gsap.ticker.lagSmoothing(500, 16);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickerCallback);
    };
  }, [isAdmin]);

  return children;
}
