"use client";
import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => (t === 1 ? 1 : 1 - Math.pow(1 - t, 3)),
      smoothWheel: true,
      wheelMultiplier: 1.4,
      touchMultiplier: 1.8,
      syncTouch: true,
      gestureOrientation: 'vertical',
    });

    // Wire Lenis into GSAP ticker AND broadcast scroll progress
    // as a custom window event so PakistaniTruckScroll can sync to it.
    lenis.on('scroll', (e) => {
      ScrollTrigger.update(e);
      window.dispatchEvent(
        new CustomEvent('lenis:scroll', { detail: { progress: e.progress } })
      );
    });

    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  return children;
}
