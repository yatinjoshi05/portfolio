import React, { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GetInTouchModalProvider } from './components/GetInTouchModal';
import Header from './components/Header';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import WorkWithMe from './components/WorkWithMe';
import Services from './components/Services';
import Awards from './components/Awards';
import ClientBlur from './components/ClientBlur';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false
    });

    window.__lenis = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const onTick = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onTick);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  return (
    <GetInTouchModalProvider>
      <div className="elenavoss-body min-h-screen bg-[#070707] text-white overflow-x-hidden">
        <Header />
        <main>
          <Hero />
          <Portfolio />
          <WorkWithMe />
          <Services />
          <Awards />
          <ClientBlur />
          <Testimonials />
          <FAQ />
        </main>
        <Footer />
      </div>
    </GetInTouchModalProvider>
  );
}
