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
  }, []);

  return children;
}
