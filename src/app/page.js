'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import Services from '@/components/Services';
import Process from '@/components/Process';
import About from '@/components/About';
import Portfolio from '@/components/Portfolio';
import Team from '@/components/Team';
import Testimonials from '@/components/Testimonials';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import ContactModal from '@/components/ContactModal';
import ErrorBoundary from '@/components/ErrorBoundary';

export default function Home() {
  const [modalType, setModalType] = useState(null);

  return (
    <>
      <ErrorBoundary fallback="Navbar" padding="0">
        <Navbar onStartProject={() => setModalType('book-call')} />
      </ErrorBoundary>
      <main>
        <ErrorBoundary fallback="Hero" message="The hero section couldn't load. Try refreshing.">
          <Hero onStartProject={() => setModalType('book-call')} />
        </ErrorBoundary>
        <ErrorBoundary fallback="Stats">
          <Stats />
        </ErrorBoundary>
        <ErrorBoundary fallback="Services">
          <Services />
        </ErrorBoundary>
        <ErrorBoundary fallback="Process">
          <Process />
        </ErrorBoundary>
        <ErrorBoundary fallback="About">
          <About onStartProject={() => setModalType('book-call')} />
        </ErrorBoundary>
        <ErrorBoundary fallback="Portfolio">
          <Portfolio />
        </ErrorBoundary>
        <ErrorBoundary fallback="Team">
          <Team />
        </ErrorBoundary>
        <ErrorBoundary fallback="Testimonials">
          <Testimonials />
        </ErrorBoundary>
        <ErrorBoundary fallback="CTA">
          <CTA modalType={modalType} setModalType={setModalType} />
        </ErrorBoundary>
      </main>
      <ErrorBoundary fallback="Footer" padding="0">
        <Footer />
      </ErrorBoundary>
      <ContactModal
        isOpen={modalType !== null}
        onClose={() => setModalType(null)}
        type={modalType}
      />
    </>
  );
}
