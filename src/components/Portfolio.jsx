import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Maximize2, X, CheckCircle2 } from 'lucide-react';
import SplitText from './SplitText';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 'rloe-engine',
    name: 'Revenue Lifecycle Orchestration Engine',
    shortName: 'Revenue Lifecycle Orchestration',
    subtitle: 'Event-Driven GTM Automation  •  n8n',
    description:
      'An event-driven GTM automation system that combines intent ingestion, cache-first deduplication, enrichment, deterministic qualification, AI-assisted routing, CRM synchronization, and telemetry.',
    imgSrc: '/media/projects/rloe-workflow.webp',
    highResSrc: '/media/projects/rloe-workflow.webp',
    badge: 'Production Engine',
    badgeColor: '#10B981',
    windowLabel: 'n8n Workflow • RLOE Canvas',
    tags: ['n8n Event Stream', 'Supabase Cache', 'Clay Waterfall', 'HubSpot Sync']
  },
  {
    id: 'gtm-dashboard',
    name: 'GTM Account Intelligence Dashboard',
    shortName: 'GTM Account Intelligence',
    subtitle: 'CRM Coverage  •  Pipeline Visibility',
    description:
      'A CRM interface for account coverage, pipeline visibility, relationship health, and operational gaps, designed to work alongside the RLOE automation system.',
    imgSrc: '/media/projects/gtm-crm-dashboard.webp',
    highResSrc: '/media/projects/gtm-crm-dashboard.webp',
    badge: 'CRM Interface',
    badgeColor: '#3B82F6',
    windowLabel: 'GTM CRM • Accounts Health',
    tags: ['Account Coverage', 'Pipeline Health Audit', 'Operational Gaps']
  },
  {
    id: 'jarvis-os',
    name: 'JARVIS OS — Personal AI Operating System',
    shortName: 'JARVIS OS — AI System',
    subtitle: 'AI Agent Workspaces  •  HUD Interface',
    description:
      'A personal AI operating-system concept combining an assistant interface, quick actions, workspace organization, memory, coding tools, and task management.',
    imgSrc: '/media/projects/jarvis-os.webp',
    highResSrc: '/media/projects/jarvis-os.webp',
    badge: 'AI System Concept',
    badgeColor: '#EC4899',
    windowLabel: 'JARVIS OS v1.0.0 • Command HUD',
    tags: ['Agent Interface', 'Particle HUD', 'Memory & Coding Tools']
  },
  {
    id: 'rloe-architecture',
    name: 'RLOE — End-to-End Revenue Architecture',
    shortName: 'RLOE Architecture Flow',
    subtitle: 'System Architecture  •  Data Flow',
    description:
      'An architecture overview of how inbound intent signals move through deduplication, enrichment, qualification, AI-assisted routing, CRM actions, and operational telemetry.',
    imgSrc: '/media/projects/rloe-architecture.webp',
    highResSrc: '/media/projects/rloe-architecture.svg',
    badge: 'System Architecture',
    badgeColor: '#F59E0B',
    windowLabel: 'RLOE Architecture • 8-Stage Pipeline',
    tags: ['Signal Ingestion', 'Cache-First Dedupe', 'Deterministic Gate', 'Telemetry']
  }
];

export default function Portfolio() {
  const dotsRef = useRef([]);
  const progressLineRef = useRef(null);
  const cardsRef = useRef([]);
  const circleClipRef = useRef(null);
  const tlRef = useRef(null);
  const textItemsRef = useRef([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [modalProject, setModalProject] = useState(null);

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const totalSteps = projects.length - 1;

    // Circle clip entrance
    if (!isReduced) {
      if (window.innerWidth > 1024) {
        gsap.to('.circle-clip', {
          yPercent: -70,
          ease: 'none',
          scrollTrigger: {
            trigger: '#portfolio',
            start: 'top bottom',
            end: '30% bottom',
            scrub: true
          }
        });
      } else {
        gsap.to('.circle-clip', {
          yPercent: -50,
          ease: 'none',
          scrollTrigger: {
            trigger: '#portfolio',
            start: 'top bottom',
            end: '30% bottom',
            scrub: true
          }
        });
      }

      if (circleClipRef.current) {
        gsap.set(circleClipRef.current, {
          clipPath: 'ellipse(150% 100% at 50% 100%)'
        });
        gsap.to(circleClipRef.current, {
          clipPath: 'ellipse(60% 100% at 50% 100%)',
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '#portfolio',
            start: 'top bottom',
            end: '30% bottom',
            scrub: true
          }
        });
      }
    }

    // Main portfolio pinned timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#portfolio',
        start: '10% top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          const step = Math.min(
            totalSteps,
            Math.max(0, Math.round(self.progress * totalSteps))
          );
          setActiveIdx(step);
        },
        ...(isReduced
          ? {}
          : {
              snap: {
                snapTo: 1 / totalSteps,
                duration: { min: 0.15, max: 0.45 },
                ease: 'power1.out',
                delay: 0.1
              }
            })
      }
    });
    tlRef.current = tl;

    // Initial states
    if (progressLineRef.current) {
      gsap.set(progressLineRef.current, { scaleY: 0 });
    }

    if (dotsRef.current[0]) {
      gsap.set(dotsRef.current[0], { backgroundColor: '#ffffff', borderColor: '#ffffff', scale: 1.25 });
    }
    dotsRef.current.slice(1).forEach((dot) => {
      if (dot) gsap.set(dot, { backgroundColor: '#F06A0E', borderColor: 'rgba(255,255,255,0.5)', scale: 1 });
    });

    if (textItemsRef.current[0]) {
      gsap.set(textItemsRef.current[0], { opacity: 1 });
    }
    textItemsRef.current.slice(1).forEach((item) => {
      if (item) gsap.set(item, { opacity: 0.5 });
    });

    if (cardsRef.current.length) {
      gsap.set(cardsRef.current, { filter: 'brightness(1)' });
      cardsRef.current.slice(1).forEach((card) => {
        if (card) gsap.set(card, isReduced ? { opacity: 0 } : { yPercent: 100 });
      });
    }

    // Line fills
    if (progressLineRef.current) {
      tl.to(progressLineRef.current, { scaleY: 1, ease: 'none', duration: totalSteps }, 0);
    }

    // Steps
    for (let i = 0; i < totalSteps; i++) {
      if (cardsRef.current[i + 1]) {
        if (isReduced) {
          tl.to(cardsRef.current[i + 1], { opacity: 1, ease: 'none', duration: 1 }, i);
        } else {
          tl.to(cardsRef.current[i + 1], { yPercent: 0, ease: 'power2.inOut', duration: 1 }, i);
        }
      }
      if (cardsRef.current[i]) {
        tl.to(cardsRef.current[i], { filter: 'brightness(0.2)', ease: 'power2.inOut', duration: 1 }, i);
      }
      if (textItemsRef.current[i]) {
        tl.to(textItemsRef.current[i], { opacity: 0.5, ease: 'power2.inOut', duration: 0.5 }, i);
      }
      if (textItemsRef.current[i + 1]) {
        tl.to(textItemsRef.current[i + 1], { opacity: 1, ease: 'power2.inOut', duration: 0.5 }, i + 0.5);
      }
      if (dotsRef.current[i]) {
        tl.to(dotsRef.current[i], { scale: 1, backgroundColor: 'rgba(255,255,255,0.7)', borderColor: 'rgba(255,255,255,0.7)', duration: 0.3 }, i + 0.5);
      }
      if (dotsRef.current[i + 1]) {
        tl.set(dotsRef.current[i + 1], { backgroundColor: '#ffffff', borderColor: '#ffffff', scale: 1.25 }, i + 1);
      }
    }

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (modalProject && e.key === 'Escape') {
        setModalProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalProject]);

  const scrollToProject = (idx) => {
    const st = tlRef.current?.scrollTrigger;
    if (st) {
      const totalSteps = projects.length - 1;
      const target = st.start + (st.end - st.start) * (idx / totalSteps);
      window.__lenis?.scrollTo(target, { duration: 0.8 });
    }
  };

  return (
    <section
      className="relative w-screen text-white pt-[6vw] max-[1025px]:pt-[24vw]"
      style={{ height: '360vh' }}
      id="portfolio"
      aria-label="Systems I've Built Portfolio Section"
    >
      {/* Circle Clip Mask */}
      <div
        ref={circleClipRef}
        className="w-full h-[50vh] absolute top-0 left-0 z-2 bg-linear-to-r from-[#F16B0D] to-[#E61416] circle-clip will-change-[clip-path]"
      />

      {/* Sticky Main Viewport */}
      <div className="w-screen h-screen sticky top-0 z-3 flex flex-col items-center justify-center px-[4vw] gap-[2.5vw] overflow-hidden bg-linear-to-r from-[#F16B0D] to-[#E61416] max-md:gap-[4vw] max-[1025px]:gap-6 max-[1025px]:px-[5vw]">
        
        {/* Section Heading & Subtitle */}
        <div className="flex flex-col items-center text-center max-w-[85vw]">
          <SplitText>
            <h2 className="text-[4.8vw] text-center max-[1025px]:text-[6.2vw] max-md:text-[8vw] font-normal tracking-tight">
              Systems I’ve Built
            </h2>
          </SplitText>
          <p className="text-[1.05vw] max-[1025px]:text-[2vw] max-md:text-[3vw] text-white/90 font-light mt-1 max-w-[56vw] max-[1025px]:max-w-[85vw] leading-relaxed">
            Production software, event-driven automation, and AI systems engineered for verifiable scale and operational clarity.
          </p>
        </div>

        {/* Showcase Columns */}
        <div className="w-full flex items-center gap-[4vw] max-[1025px]:flex-col max-md:gap-[4vw] max-[1025px]:items-start max-[1025px]:gap-6">
          
          {/* Left Column: Timeline items */}
          <div className="w-[32%] relative max-md:w-full max-[1025px]:w-full">
            {/* Background line */}
            <div className="absolute left-1 bg-white/20 top-[2.5vw] max-[1025px]:top-[1vw] h-[21vw] max-[1025px]:h-[30vw] max-md:h-[46vw] w-px" />
            {/* Progress line */}
            <div
              ref={progressLineRef}
              className="absolute left-1 bg-white origin-top top-[2.5vw] max-[1025px]:top-[1vw] h-[21vw] max-[1025px]:h-[30vw] max-md:h-[46vw] w-px"
            />

            {/* Timeline List */}
            <div className="flex flex-col max-[1025px]:gap-[1.5vw] max-md:gap-[2.5vw]">
              {projects.map((p, idx) => (
                <div
                  key={p.id}
                  ref={(el) => (textItemsRef.current[idx] = el)}
                  onClick={() => scrollToProject(idx)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      scrollToProject(idx);
                    }
                  }}
                  className="relative flex items-center gap-[1.2vw] max-md:gap-[3.5vw] cursor-pointer transition-opacity duration-300"
                  style={{ minHeight: '5.2vw' }}
                >
                  <span
                    ref={(el) => (dotsRef.current[idx] = el)}
                    className="w-[10px] h-[10px] mt-[-0.8vw] max-md:mt-[-1.5vw] bg-[#F06A0E] rounded-full border border-white/50 shrink-0 transition-all duration-300"
                  />
                  <div>
                    <h3 className="text-[1.3vw] max-[1025px]:text-[2.6vw] max-md:text-[3.8vw] font-medium leading-snug">
                      {p.name}
                    </h3>
                    <p className="text-[0.9vw] max-[1025px]:text-[1.8vw] max-md:text-[2.8vw] text-white/85 mt-0.5 leading-snug">
                      {p.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Stacked Mockup Cards */}
          <div className="w-full h-[38vw] relative rounded-xl overflow-hidden max-[1025px]:w-full max-[1025px]:h-[50vw] max-md:h-[62vw] max-[1025px]:rounded-lg shadow-2xl border border-white/20">
            {projects.map((p, idx) => (
              <div
                key={p.id}
                ref={(el) => (cardsRef.current[idx] = el)}
                className="mockup-card absolute inset-0 flex flex-col rounded-xl overflow-hidden max-[1025px]:rounded-lg will-change-transform shadow-2xl"
                style={{ zIndex: idx + 1 }}
              >
                {/* Mockup Top Window Bar with Solid Opaque Background */}
                <div className="mockup-header">
                  {/* Window Controls & Label */}
                  <div className="flex items-center gap-2 min-w-0 flex-1 overflow-hidden">
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] shrink-0" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] shrink-0" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] shrink-0" />
                    </div>
                    <span className="text-[0.72vw] max-[1025px]:text-[1.8vw] max-md:text-[2.6vw] text-white/70 font-mono ml-2 truncate whitespace-nowrap">
                      {p.windowLabel}
                    </span>
                  </div>

                  {/* Window Actions */}
                  <div className="flex items-center gap-2 shrink-0 ml-2">
                    <span
                      className="mockup-badge text-[0.68vw] max-[1025px]:text-[1.6vw] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider text-white whitespace-nowrap"
                      style={{ backgroundColor: `${p.badgeColor}33`, color: p.badgeColor }}
                    >
                      {p.badge}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setModalProject(p);
                      }}
                      aria-label={`Inspect ${p.name} in high resolution`}
                      className="flex items-center gap-1 text-[0.72vw] max-[1025px]:text-[1.8vw] max-md:text-[2.6vw] px-2 py-1 rounded-md bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer shrink-0"
                    >
                      <Maximize2 className="w-3 h-3 max-md:w-3.5 max-md:h-3.5" />
                      <span className="max-md:hidden">Inspect</span>
                    </button>
                  </div>
                </div>

                {/* Mockup Canvas Image Frame */}
                <div
                  className="mockup-canvas relative flex-1 w-full flex items-center justify-center overflow-hidden cursor-zoom-in group"
                  onClick={() => setModalProject(p)}
                >
                  <img
                    alt={p.name}
                    loading="lazy"
                    width="1920"
                    height="1080"
                    className="w-full h-full object-contain p-1 transition-transform duration-500 group-hover:scale-[1.01]"
                    src={p.imgSrc}
                  />

                  {/* Hover Inspect Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                    <div className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[0.85vw] max-md:text-[2.8vw] flex items-center gap-2 shadow-xl">
                      <Maximize2 className="w-4 h-4" />
                      <span>Click to Inspect High-Resolution View</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Glow */}
      <div className="absolute w-screen h-[60vh] bottom-[-10%] left-0 overflow-hidden max-[1025px]:bottom-[-13%] pointer-events-none">
        <div className="w-[115%] h-[40vh] absolute bottom-[35%] left-[-7.5%] z-2 bg-linear-to-r from-[#F16B0D] to-[#E61416] blur-2xl max-[1025px]:bottom-[50%] max-[1025px]:w-[120%] max-[1025px]:left-[-10%] max-[1025px]:blur-lg" />
      </div>

      {/* High-Resolution Inspection Lightbox Modal */}
      {modalProject && (
        <div
          className="fixed inset-0 z-9999 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setModalProject(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
        >
          <div
            className="relative w-full max-w-6xl max-h-[92vh] border border-white/20 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            style={{ backgroundColor: '#101015' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              className="flex items-center justify-between px-5 py-3.5 border-b border-white/10"
              style={{ backgroundColor: '#15161E' }}
            >
              <div>
                <div className="flex items-center gap-3">
                  <span
                    className="text-xs px-2.5 py-0.5 rounded-full font-semibold uppercase tracking-wider"
                    style={{ backgroundColor: `${modalProject.badgeColor}33`, color: modalProject.badgeColor }}
                  >
                    {modalProject.badge}
                  </span>
                  <h3 id="modal-project-title" className="text-base sm:text-lg md:text-xl font-medium text-white">
                    {modalProject.name}
                  </h3>
                </div>
                <p className="text-xs md:text-sm text-white/70 mt-1 max-w-3xl leading-relaxed">
                  {modalProject.description}
                </p>
              </div>

              <button
                onClick={() => setModalProject(null)}
                aria-label="Close modal"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer shrink-0 ml-4"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Modal Image Viewer */}
            <div
              className="relative flex-1 min-h-[40vh] max-h-[66vh] overflow-auto flex items-center justify-center p-3"
              style={{ backgroundColor: '#070709' }}
            >
              <img
                src={modalProject.highResSrc}
                alt={modalProject.name}
                className="max-w-full max-h-[62vh] object-contain rounded-lg shadow-lg"
              />
            </div>

            {/* Modal Technical Highlights Footer */}
            <div
              className="px-5 py-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs md:text-sm"
              style={{ backgroundColor: '#12131A' }}
            >
              <div className="flex flex-wrap items-center gap-2" style={{ gap: '8px' }}>
                <span className="text-white/50 text-xs mr-1">System Architecture Tags:</span>
                {modalProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-md bg-white/10 text-white font-mono text-[11px] sm:text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-1.5 text-white/50 text-xs">
                <span>Production Architecture</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
