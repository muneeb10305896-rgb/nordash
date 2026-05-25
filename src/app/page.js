'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import Services from '@/components/Services';
import Process from '@/components/Process';
import About from '@/components/About';
import Portfolio from '@/components/Portfolio';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import ContactModal from '@/components/ContactModal';

export default function Home() {
  const [modalType, setModalType] = useState(null);

  return (
    <>
      <Navbar onStartProject={() => setModalType('book-call')} />
      <main>
        <Hero />
        <Stats />
        <Services />
        <Process />
        <About />
        <Portfolio />
        <CTA modalType={modalType} setModalType={setModalType} />
      </main>
      <Footer />
      <ContactModal
        isOpen={modalType !== null}
        onClose={() => setModalType(null)}
        type={modalType}
      />
    </>
  );
}
