import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitText from './SplitText';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const textContainerRef = useRef(null);
  const heroAvRef = useRef(null);
  const heroImgInnerRef = useRef(null);
  const marqueeContainerRef = useRef(null);

  const [headlineStart, setHeadlineStart] = useState(false);
  const [subtextStart, setSubtextStart] = useState(false);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  // Intro reveal timeline
  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    // Lock scrolling during intro
    window.__lenis?.stop();

    const heroAv = heroAvRef.current;
    const revealState = { reveal: -40 };
    const tl = gsap.timeline();

    tl.to(
      revealState,
      {
        reveal: 125,
        duration: 3.5,
        ease: 'power2.out',
        onUpdate: () => {
          if (heroAv) {
            heroAv.style.setProperty('--reveal', `${revealState.reveal}%`);
          }
        }
      },
      0
    )
      .fromTo(
        heroAv,
        { opacity: 0 },
        { opacity: 1, duration: 1.5, ease: 'power2.out' },
        0
      )
      .call(() => setHeadlineStart(true), null, 1)
      .call(() => setSubtextStart(true), null, 1.5)
      .call(
        () => {
          const header = document.getElementById('header');
          const headerLogo = document.getElementById('header-logo');
          if (header) {
            gsap.fromTo(
              [header, headerLogo].filter(Boolean),
              { yPercent: -50, opacity: 0 },
              {
                yPercent: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power3.out',
                onComplete: () => {
                  window.__lenis?.start();
                }
              }
            );
          } else {
            window.__lenis?.start();
          }
        },
        null,
        1.8
      );

    return () => {
      tl.kill();
      hasAnimated.current = false;
    };
  }, []);

  // Scroll scale and marquee blur transition
  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    const marquee = marqueeContainerRef.current;
    if (!section || !container) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        invalidateOnRefresh: true
      }
    });

    tl.to(container, { scale: 0.5, ease: 'power2.inOut', duration: 1 }, 0);

    if (marquee) {
      gsap.set(marquee, { filter: 'blur(24px)', opacity: 0.35 });
      tl.to(
        marquee,
        { filter: 'blur(0px)', opacity: 1, ease: 'power2.out', duration: 0.18 },
        0.32
      );
    }

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  // Optimized Mousemove Parallax (Sleeping RAF when idle, viewport-checked)
  useEffect(() => {
    if (
      window.innerWidth <= 1024 ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const state = {
      targetImgX: 0,
      currentImgX: 0,
      targetTextX: 0,
      currentTextX: 0,
      targetImgY: 0,
      currentImgY: 0,
      targetTextY: 0,
      currentTextY: 0,
      isTicking: false
    };

    let rafId = null;

    const updateMotion = () => {
      // Check if hero is still in view
      if (window.scrollY > window.innerHeight * 1.5) {
        state.isTicking = false;
        return;
      }

      state.currentImgX += (state.targetImgX - state.currentImgX) * 0.08;
      state.currentTextX += (state.targetTextX - state.currentTextX) * 0.08;
      state.currentImgY += (state.targetImgY - state.currentImgY) * 0.08;
      state.currentTextY += (state.targetTextY - state.currentTextY) * 0.08;

      if (heroImgInnerRef.current) {
        gsap.set(heroImgInnerRef.current, { x: state.currentImgX, y: state.currentImgY });
      }
      if (textContainerRef.current) {
        gsap.set(textContainerRef.current, { x: state.currentTextX, y: state.currentTextY });
      }

      const delta =
        Math.abs(state.targetImgX - state.currentImgX) +
        Math.abs(state.targetImgY - state.currentImgY) +
        Math.abs(state.targetTextX - state.currentTextX) +
        Math.abs(state.targetTextY - state.currentTextY);

      if (delta > 0.05) {
        rafId = requestAnimationFrame(updateMotion);
      } else {
        state.isTicking = false;
      }
    };

    const handleMouseMove = (e) => {
      if (window.scrollY > window.innerHeight * 1.5) return;

      const rx = (e.clientX / window.innerWidth) * 2 - 1;
      const ry = (e.clientY / window.innerHeight) * 2 - 1;
      state.targetImgX = -(30 * rx);
      state.targetTextX = -(12 * rx);
      state.targetImgY = -(30 * ry);
      state.targetTextY = -(12 * ry);

      if (!state.isTicking) {
        state.isTicking = true;
        rafId = requestAnimationFrame(updateMotion);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative w-screen h-[300vh]" id="hero">
      {/* Sticky Hero Container */}
      <div
        ref={containerRef}
        className="w-screen h-screen sticky top-0 flex justify-between items-center hero-container px-[4vw] z-2 max-[1025px]:px-[5vw] max-[1025px]:items-start max-[1025px]:pt-[30vw] overflow-hidden will-change-transform"
        style={{
          backgroundColor: '#180d08',
          backgroundImage: `
            radial-gradient(65% 55% at 92% 6%, #F0640D 0%, rgba(240,100,13,0) 65%),
            radial-gradient(60% 55% at 4% 82%, #EC690F 0%, rgba(236,105,15,0) 65%),
            radial-gradient(75% 80% at 48% 42%, #B01205 0%, rgba(176,18,5,0) 70%),
            linear-gradient(180deg, #D8470A 0%, #C0300A 28%, #B01205 46%, #7A1C08 68%, #2A1108 88%, #180D08 100%)
          `
        }}
      >
        <div
          ref={textContainerRef}
          className="w-full h-fit flex justify-between max-[1025px]:flex-col max-[1025px]:gap-8 pointer-events-none will-change-transform"
        >
          <div className="relative z-1 w-[40%] max-[1025px]:w-[65%] max-md:w-full pointer-events-auto">
            <SplitText animateOnScroll={false} start={headlineStart} stagger={0.015}>
              <h1 className="text-[5.2vw] text-white max-[1025px]:text-[8.5vw] max-md:text-[11vw] leading-[1.08]! font-normal">
                I Build<br />AI-Powered<br />Revenue<br />Systems
              </h1>
            </SplitText>
          </div>
          <div className="relative z-10 w-[12%] flex flex-col justify-between text-end text-[1.25vw] leading-[1.15] py-[2vw] max-[1025px]:w-[40%] max-[1025px]:text-[3.5vw] max-[1025px]:text-start max-[1025px]:flex-col-reverse max-md:text-[4.5vw] max-md:gap-[7vw] max-[1025px]:gap-20 max-md:py-0 pointer-events-auto">
            <SplitText animateOnScroll={false} start={subtextStart}>
              <p className="text-white">AI • AUTOMATION • GTM</p>
            </SplitText>
            <SplitText animateOnScroll={false} start={subtextStart}>
              <p className="text-white">GTM Engineer</p>
            </SplitText>
          </div>
        </div>

        {/* Hero Character Image */}
        <div
          ref={heroAvRef}
          className="absolute z-2 bottom-[-15%] left-1/2 -translate-x-1/2 h-[105%] w-auto max-[1025px]:h-[80%] max-[1025px]:bottom-[-10%] max-md:h-[62%] max-md:bottom-[-5%] hero-av-img hero-mask-reveal opacity-0 will-change-transform pointer-events-none flex items-end justify-center"
        >
          <div ref={heroImgInnerRef} className="h-full w-auto will-change-transform flex items-end">
            <img
              alt="Yatin Joshi — Entry-Level GTM Engineer"
              draggable="false"
              loading="eager"
              width="1142"
              height="1378"
              className="h-full w-auto max-w-none object-contain object-bottom select-none pointer-events-none"
              style={{ color: 'transparent' }}
              src="/images/yatin-joshi-professional.webp"
            />
          </div>
        </div>
      </div>

      {/* Marquee Background behind Hero */}
      <div
        ref={marqueeContainerRef}
        className="absolute inset-0 w-full h-full bg-[#070707] will-change-[filter,opacity]"
      >
        <div className="w-full h-screen sticky top-0 px-[4vw] flex gap-[2.5vw] overflow-hidden">
          {/* Column 1: Staggered sequence containing all 5 distinct visuals */}
          <div className="w-[50%] h-fit flex flex-col marquee-1">
            {/* Track 1: First iteration */}
            <div className="w-full flex flex-col gap-[2.5vw] pb-[2.5vw]">
              {/* Visual 1: RLOE n8n Workflow Automation Canvas (Genuine Screenshot) */}
              <div className="w-full h-[26vw] max-[1025px]:h-[44vw] max-md:h-[54vw] overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.85)] bg-[#0C0D12] relative group">
                <img
                  alt="RLOE n8n Autonomous Workflow Canvas"
                  loading="lazy"
                  width="1400"
                  height="1000"
                  className="w-full h-full object-cover object-center"
                  style={{ color: 'transparent' }}
                  src="/media/hero/hero-rloe-workflow.webp"
                />
              </div>

              {/* Visual 4: AI Revenue Intelligence Dashboard (New Visual) */}
              <div className="w-full h-[29vw] max-[1025px]:h-[48vw] max-md:h-[58vw] overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl border border-emerald-500/25 shadow-[0_25px_60px_rgba(0,0,0,0.85)] bg-[#090A0E] relative group">
                <img
                  alt="AI Revenue Intelligence Dashboard"
                  loading="lazy"
                  width="1600"
                  height="1100"
                  className="w-full h-full object-cover object-left-top"
                  style={{ color: 'transparent' }}
                  src="/media/hero/hero-ai-revenue-intelligence.webp"
                />
              </div>

              {/* Visual 5: Revenue Automation Architecture (New Visual) */}
              <div className="w-full h-[28vw] max-[1025px]:h-[46vw] max-md:h-[56vw] overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl border border-[#F16B0D]/30 shadow-[0_25px_60px_rgba(0,0,0,0.85)] bg-[#07080B] relative group">
                <img
                  alt="Revenue Automation Technical Architecture"
                  loading="lazy"
                  width="1600"
                  height="1100"
                  className="w-full h-full object-contain p-2 bg-[#07080B]"
                  style={{ color: 'transparent' }}
                  src="/media/hero/hero-revenue-automation-architecture.webp"
                />
              </div>

              {/* Visual 2: GTM / Opportunities CRM Dashboard (Genuine Screenshot) */}
              <div className="w-full h-[27vw] max-[1025px]:h-[45vw] max-md:h-[55vw] overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.85)] bg-[#0F1015] relative group">
                <img
                  alt="GTM Account Management & Opportunities CRM Console"
                  loading="lazy"
                  width="1400"
                  height="1000"
                  className="w-full h-full object-cover object-left-top"
                  style={{ color: 'transparent' }}
                  src="/media/hero/hero-gtm-crm.webp"
                />
              </div>

              {/* Visual 3: JARVIS OS Neural Command HUD (Genuine Screenshot) */}
              <div className="w-full h-[25vw] max-[1025px]:h-[42vw] max-md:h-[52vw] overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl border border-cyan-500/25 shadow-[0_25px_60px_rgba(0,0,0,0.85)] bg-[#050608] relative group">
                <img
                  alt="JARVIS OS Neural Operations Command HUD"
                  loading="lazy"
                  width="1400"
                  height="1000"
                  className="w-full h-full object-cover object-center"
                  style={{ color: 'transparent' }}
                  src="/media/hero/hero-jarvis-os.webp"
                />
              </div>
            </div>

            {/* Track 2: Duplicate for seamless loop */}
            <div className="w-full flex flex-col gap-[2.5vw] pb-[2.5vw]">
              {/* Visual 1: RLOE n8n Workflow Automation Canvas (Genuine Screenshot) */}
              <div className="w-full h-[26vw] max-[1025px]:h-[44vw] max-md:h-[54vw] overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.85)] bg-[#0C0D12] relative group">
                <img
                  alt="RLOE n8n Autonomous Workflow Canvas"
                  loading="lazy"
                  width="1400"
                  height="1000"
                  className="w-full h-full object-cover object-center"
                  style={{ color: 'transparent' }}
                  src="/media/hero/hero-rloe-workflow.webp"
                />
              </div>

              {/* Visual 4: AI Revenue Intelligence Dashboard (New Visual) */}
              <div className="w-full h-[29vw] max-[1025px]:h-[48vw] max-md:h-[58vw] overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl border border-emerald-500/25 shadow-[0_25px_60px_rgba(0,0,0,0.85)] bg-[#090A0E] relative group">
                <img
                  alt="AI Revenue Intelligence Dashboard"
                  loading="lazy"
                  width="1600"
                  height="1100"
                  className="w-full h-full object-cover object-left-top"
                  style={{ color: 'transparent' }}
                  src="/media/hero/hero-ai-revenue-intelligence.webp"
                />
              </div>

              {/* Visual 5: Revenue Automation Architecture (New Visual) */}
              <div className="w-full h-[28vw] max-[1025px]:h-[46vw] max-md:h-[56vw] overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl border border-[#F16B0D]/30 shadow-[0_25px_60px_rgba(0,0,0,0.85)] bg-[#07080B] relative group">
                <img
                  alt="Revenue Automation Technical Architecture"
                  loading="lazy"
                  width="1600"
                  height="1100"
                  className="w-full h-full object-contain p-2 bg-[#07080B]"
                  style={{ color: 'transparent' }}
                  src="/media/hero/hero-revenue-automation-architecture.webp"
                />
              </div>

              {/* Visual 2: GTM / Opportunities CRM Dashboard (Genuine Screenshot) */}
              <div className="w-full h-[27vw] max-[1025px]:h-[45vw] max-md:h-[55vw] overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.85)] bg-[#0F1015] relative group">
                <img
                  alt="GTM Account Management & Opportunities CRM Console"
                  loading="lazy"
                  width="1400"
                  height="1000"
                  className="w-full h-full object-cover object-left-top"
                  style={{ color: 'transparent' }}
                  src="/media/hero/hero-gtm-crm.webp"
                />
              </div>

              {/* Visual 3: JARVIS OS Neural Command HUD (Genuine Screenshot) */}
              <div className="w-full h-[25vw] max-[1025px]:h-[42vw] max-md:h-[52vw] overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl border border-cyan-500/25 shadow-[0_25px_60px_rgba(0,0,0,0.85)] bg-[#050608] relative group">
                <img
                  alt="JARVIS OS Neural Operations Command HUD"
                  loading="lazy"
                  width="1400"
                  height="1000"
                  className="w-full h-full object-cover object-center"
                  style={{ color: 'transparent' }}
                  src="/media/hero/hero-jarvis-os.webp"
                />
              </div>
            </div>
          </div>

          {/* Column 2: Alternating staggered sequence containing all 5 distinct visuals */}
          <div className="w-[50%] h-fit flex flex-col marquee-2">
            {/* Track 1: First iteration */}
            <div className="w-full flex flex-col gap-[2.5vw] pb-[2.5vw]">
              {/* Visual 5: Revenue Automation Architecture (New Visual) */}
              <div className="w-full h-[28vw] max-[1025px]:h-[46vw] max-md:h-[56vw] overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl border border-[#F16B0D]/30 shadow-[0_25px_60px_rgba(0,0,0,0.85)] bg-[#07080B] relative group">
                <img
                  alt="Revenue Automation Technical Architecture"
                  loading="lazy"
                  width="1600"
                  height="1100"
                  className="w-full h-full object-contain p-2 bg-[#07080B]"
                  style={{ color: 'transparent' }}
                  src="/media/hero/hero-revenue-automation-architecture.webp"
                />
              </div>

              {/* Visual 3: JARVIS OS Neural Command HUD (Genuine Screenshot) */}
              <div className="w-full h-[25vw] max-[1025px]:h-[42vw] max-md:h-[52vw] overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl border border-cyan-500/25 shadow-[0_25px_60px_rgba(0,0,0,0.85)] bg-[#050608] relative group">
                <img
                  alt="JARVIS OS Neural Operations Command HUD"
                  loading="lazy"
                  width="1400"
                  height="1000"
                  className="w-full h-full object-cover object-center"
                  style={{ color: 'transparent' }}
                  src="/media/hero/hero-jarvis-os.webp"
                />
              </div>

              {/* Visual 1: RLOE n8n Workflow Automation Canvas (Genuine Screenshot) */}
              <div className="w-full h-[26vw] max-[1025px]:h-[44vw] max-md:h-[54vw] overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.85)] bg-[#0C0D12] relative group">
                <img
                  alt="RLOE n8n Autonomous Workflow Canvas"
                  loading="lazy"
                  width="1400"
                  height="1000"
                  className="w-full h-full object-cover object-center"
                  style={{ color: 'transparent' }}
                  src="/media/hero/hero-rloe-workflow.webp"
                />
              </div>

              {/* Visual 4: AI Revenue Intelligence Dashboard (New Visual) */}
              <div className="w-full h-[29vw] max-[1025px]:h-[48vw] max-md:h-[58vw] overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl border border-emerald-500/25 shadow-[0_25px_60px_rgba(0,0,0,0.85)] bg-[#090A0E] relative group">
                <img
                  alt="AI Revenue Intelligence Dashboard"
                  loading="lazy"
                  width="1600"
                  height="1100"
                  className="w-full h-full object-cover object-left-top"
                  style={{ color: 'transparent' }}
                  src="/media/hero/hero-ai-revenue-intelligence.webp"
                />
              </div>

              {/* Visual 2: GTM / Opportunities CRM Dashboard (Genuine Screenshot) */}
              <div className="w-full h-[27vw] max-[1025px]:h-[45vw] max-md:h-[55vw] overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.85)] bg-[#0F1015] relative group">
                <img
                  alt="GTM Account Management & Opportunities CRM Console"
                  loading="lazy"
                  width="1400"
                  height="1000"
                  className="w-full h-full object-cover object-left-top"
                  style={{ color: 'transparent' }}
                  src="/media/hero/hero-gtm-crm.webp"
                />
              </div>
            </div>

            {/* Track 2: Duplicate for seamless loop */}
            <div className="w-full flex flex-col gap-[2.5vw] pb-[2.5vw]">
              {/* Visual 5: Revenue Automation Architecture (New Visual) */}
              <div className="w-full h-[28vw] max-[1025px]:h-[46vw] max-md:h-[56vw] overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl border border-[#F16B0D]/30 shadow-[0_25px_60px_rgba(0,0,0,0.85)] bg-[#07080B] relative group">
                <img
                  alt="Revenue Automation Technical Architecture"
                  loading="lazy"
                  width="1600"
                  height="1100"
                  className="w-full h-full object-contain p-2 bg-[#07080B]"
                  style={{ color: 'transparent' }}
                  src="/media/hero/hero-revenue-automation-architecture.webp"
                />
              </div>

              {/* Visual 3: JARVIS OS Neural Command HUD (Genuine Screenshot) */}
              <div className="w-full h-[25vw] max-[1025px]:h-[42vw] max-md:h-[52vw] overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl border border-cyan-500/25 shadow-[0_25px_60px_rgba(0,0,0,0.85)] bg-[#050608] relative group">
                <img
                  alt="JARVIS OS Neural Operations Command HUD"
                  loading="lazy"
                  width="1400"
                  height="1000"
                  className="w-full h-full object-cover object-center"
                  style={{ color: 'transparent' }}
                  src="/media/hero/hero-jarvis-os.webp"
                />
              </div>

              {/* Visual 1: RLOE n8n Workflow Automation Canvas (Genuine Screenshot) */}
              <div className="w-full h-[26vw] max-[1025px]:h-[44vw] max-md:h-[54vw] overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.85)] bg-[#0C0D12] relative group">
                <img
                  alt="RLOE n8n Autonomous Workflow Canvas"
                  loading="lazy"
                  width="1400"
                  height="1000"
                  className="w-full h-full object-cover object-center"
                  style={{ color: 'transparent' }}
                  src="/media/hero/hero-rloe-workflow.webp"
                />
              </div>

              {/* Visual 4: AI Revenue Intelligence Dashboard (New Visual) */}
              <div className="w-full h-[29vw] max-[1025px]:h-[48vw] max-md:h-[58vw] overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl border border-emerald-500/25 shadow-[0_25px_60px_rgba(0,0,0,0.85)] bg-[#090A0E] relative group">
                <img
                  alt="AI Revenue Intelligence Dashboard"
                  loading="lazy"
                  width="1600"
                  height="1100"
                  className="w-full h-full object-cover object-left-top"
                  style={{ color: 'transparent' }}
                  src="/media/hero/hero-ai-revenue-intelligence.webp"
                />
              </div>

              {/* Visual 2: GTM / Opportunities CRM Dashboard (Genuine Screenshot) */}
              <div className="w-full h-[27vw] max-[1025px]:h-[45vw] max-md:h-[55vw] overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.85)] bg-[#0F1015] relative group">
                <img
                  alt="GTM Account Management & Opportunities CRM Console"
                  loading="lazy"
                  width="1400"
                  height="1000"
                  className="w-full h-full object-cover object-left-top"
                  style={{ color: 'transparent' }}
                  src="/media/hero/hero-gtm-crm.webp"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
