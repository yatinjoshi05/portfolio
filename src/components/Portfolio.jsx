import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Maximize2,
  X,
  CheckCircle2,
  Github,
  ExternalLink,
  Layers,
  ArrowRight,
  ShieldCheck,
  Cpu
} from 'lucide-react';
import SplitText from './SplitText';
import { projectsData } from '../data/projectsData';

gsap.registerPlugin(ScrollTrigger);

export default function Portfolio() {
  const dotsRef = useRef([]);
  const progressLineRef = useRef(null);
  const cardsRef = useRef([]);
  const circleClipRef = useRef(null);
  const tlRef = useRef(null);
  const textItemsRef = useRef([]);

  const [activeIdx, setActiveIdx] = useState(0);
  const [selectedMedia, setSelectedMedia] = useState({});
  const [modalProject, setModalProject] = useState(null);
  const [modalMediaIdx, setModalMediaIdx] = useState(0);

  // GSAP ScrollTrigger Pinned Timeline & Circle Mask Setup
  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const totalSteps = projectsData.length - 1;

    // Circle clip mask entrance animation
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

    // Main pinned portfolio scroll timeline
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

    // Initial styles
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
      if (item) gsap.set(item, { opacity: 0.45 });
    });

    if (cardsRef.current.length) {
      gsap.set(cardsRef.current, { filter: 'brightness(1)' });
      cardsRef.current.slice(1).forEach((card) => {
        if (card) gsap.set(card, isReduced ? { opacity: 0 } : { yPercent: 100 });
      });
    }

    // Progress line fills progressively
    if (progressLineRef.current) {
      tl.to(progressLineRef.current, { scaleY: 1, ease: 'none', duration: totalSteps }, 0);
    }

    // Card slide-up and dimming choreography
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
        tl.to(textItemsRef.current[i], { opacity: 0.45, ease: 'power2.inOut', duration: 0.5 }, i);
      }
      if (textItemsRef.current[i + 1]) {
        tl.to(textItemsRef.current[i + 1], { opacity: 1, ease: 'power2.inOut', duration: 0.5 }, i + 0.5);
      }
      if (dotsRef.current[i]) {
        tl.to(
          dotsRef.current[i],
          { scale: 1, backgroundColor: 'rgba(255,255,255,0.6)', borderColor: 'rgba(255,255,255,0.6)', duration: 0.3 },
          i + 0.5
        );
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

  // Close modal helper with browser history synchronization
  const closeModal = (fromPopState = false) => {
    setModalProject(null);
    if (!fromPopState && window.history.state?.modalOpen) {
      window.history.back();
    }
  };

  const openModal = (project, mediaIdx = 0) => {
    setModalProject(project);
    setModalMediaIdx(mediaIdx);
    try {
      window.history.pushState(
        { modalOpen: true, projectId: project.id, mediaIdx },
        '',
        `${window.location.pathname}${window.location.search}#inspect-${project.id}`
      );
    } catch {
      // safe fallback if history manipulation is restricted
    }
  };

  const scrollToProject = (idx) => {
    const st = tlRef.current?.scrollTrigger;
    if (st) {
      const totalSteps = projectsData.length - 1;
      const target = st.start + (st.end - st.start) * (idx / totalSteps);
      window.__lenis?.scrollTo(target, { duration: 0.8 });
    }
  };

  const handleSelectMedia = (projectId, mediaIdx, e) => {
    e?.stopPropagation();
    setSelectedMedia((prev) => ({
      ...prev,
      [projectId]: mediaIdx
    }));
  };

  // Synchronize modal state with Browser Back/Forward navigation
  useEffect(() => {
    const handlePopState = (e) => {
      if (e.state?.modalOpen && e.state.projectId) {
        const found = projectsData.find((item) => item.id === e.state.projectId);
        if (found) {
          setModalProject(found);
          setModalMediaIdx(e.state.mediaIdx || 0);
          return;
        }
      }
      setModalProject(null);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (modalProject && e.key === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalProject]);

  return (
    <section
      className="relative w-screen text-white pt-[6vw] max-[1025px]:pt-[24vw]"
      style={{ height: '400vh' }}
      id="portfolio"
      aria-label="Systems I've Built Portfolio Section"
    >
      {/* Circle Clip Mask */}
      <div
        ref={circleClipRef}
        className="w-full h-[50vh] absolute top-0 left-0 z-2 bg-linear-to-r from-[#F16B0D] to-[#E61416] circle-clip will-change-[clip-path]"
      />

      {/* Sticky Main Viewport */}
      <div className="w-screen h-screen sticky top-0 z-3 flex flex-col items-center justify-center px-[4vw] gap-4 overflow-hidden bg-linear-to-r from-[#F16B0D] to-[#E61416]">
        {/* Section Heading & Subtitle */}
        <div className="portfolio-header-container">
          <SplitText>
            <h2 className="portfolio-header-title">
              Systems I’ve Built
            </h2>
          </SplitText>
          <p className="portfolio-header-sub">
            Autonomous revenue intelligence, event-driven GTM workflows, and AI desktop architecture engineered for verifiable scale and operational clarity.
          </p>
        </div>

        {/* Showcase Columns */}
        <div className="portfolio-showcase-container">
          {/* Left Column: Clean 4-Project Navigation Timeline */}
          <div className="portfolio-timeline-col">
            {/* Background line */}
            <div className="absolute left-1 bg-white/20 top-4 bottom-4 w-px" />
            {/* Progress line */}
            <div
              ref={progressLineRef}
              className="absolute left-1 bg-white origin-top top-4 bottom-4 w-px"
            />

            {/* Timeline List */}
            <div className="flex flex-col gap-2">
              {projectsData.map((p, idx) => {
                const isActive = activeIdx === idx;
                return (
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
                    className={`portfolio-timeline-item ${isActive ? 'active' : ''}`}
                  >
                    <span
                      ref={(el) => (dotsRef.current[idx] = el)}
                      className="w-[10px] h-[10px] bg-[#F06A0E] rounded-full border border-white/50 shrink-0 transition-all duration-300"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="portfolio-item-number">
                          {p.number}
                        </span>
                        <h3 className="portfolio-item-title truncate">
                          {p.name}
                        </h3>
                      </div>
                      <p className="portfolio-item-sub truncate">
                        {p.navSubtitle}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Stacked Mockup Cards */}
          <div className="portfolio-cards-col">
            {projectsData.map((p, idx) => {
              const currentMediaIdx = selectedMedia[p.id] || 0;
              const currentMedia = p.mediaViews[currentMediaIdx] || p.mediaViews[0];

              return (
                <div
                  key={p.id}
                  ref={(el) => (cardsRef.current[idx] = el)}
                  className="mockup-card absolute inset-0 flex flex-col rounded-xl overflow-hidden will-change-transform shadow-2xl"
                  style={{ zIndex: idx + 1 }}
                >
                  {/* Mockup Top Window Bar */}
                  <div className="mockup-header shrink-0">
                    {/* Window Controls & Clean Project Title / Status */}
                    <div className="mockup-header-left">
                      <div className="flex items-center gap-1.5 shrink-0" aria-hidden="true">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] shrink-0" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] shrink-0" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] shrink-0" />
                      </div>
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="mockup-project-title font-medium text-white text-[13px] tracking-tight truncate">
                          {p.name}
                        </span>
                        <span
                          className="mockup-badge text-[10px] px-2 py-0.5 rounded-full font-mono uppercase tracking-wider shrink-0"
                          style={{
                            backgroundColor: `${p.badgeColor}22`,
                            color: p.badgeColor,
                            border: `1px solid ${p.badgeColor}44`
                          }}
                        >
                          {p.badge}
                        </span>
                      </div>
                    </div>

                    {/* Window Action Badges & Links */}
                    <div className="mockup-header-right">
                      {p.archifyUrl && (
                        <a
                          href={p.archifyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          aria-label={`Open interactive architecture for ${p.name}`}
                          className="mockup-btn mockup-btn-archify"
                        >
                          <Layers className="w-3 h-3" />
                          <span>Architecture</span>
                        </a>
                      )}
                      {p.liveUrl && (
                        <a
                          href={p.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          aria-label={`Open live demo for ${p.name}`}
                          className="mockup-btn mockup-btn-primary"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>Live Demo</span>
                        </a>
                      )}
                      {p.repoUrl && (
                        <a
                          href={p.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          aria-label={`View ${p.name} on GitHub`}
                          className="mockup-btn"
                        >
                          <Github className="w-3 h-3" />
                          <span>GitHub</span>
                        </a>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openModal(p, currentMediaIdx);
                        }}
                        aria-label={`Inspect ${p.name} in high resolution`}
                        className="mockup-btn mockup-btn-inspect"
                      >
                        <Maximize2 className="w-3 h-3" />
                        <span>Inspect</span>
                      </button>
                    </div>
                  </div>

                  {/* Multi-Artifact Tab Switcher (Consolidates views into single project) */}
                  {p.mediaViews.length > 1 && (
                    <div className="artifact-tabs-bar">
                      <span className="text-[11px] font-mono text-white/40 uppercase tracking-wider mr-1">
                        Artifacts:
                      </span>
                      {p.mediaViews.map((view, vIdx) => {
                        const isSelected = vIdx === currentMediaIdx;
                        return (
                          <button
                            key={view.id}
                            onClick={(e) => handleSelectMedia(p.id, vIdx, e)}
                            className={`artifact-tab-btn ${isSelected ? 'active' : ''}`}
                          >
                            <span>{view.label}</span>
                            {isSelected && (
                              <span
                                className="w-1.5 h-1.5 rounded-full"
                                style={{ backgroundColor: p.badgeColor }}
                              />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Mockup Canvas Image Frame (Unobstructed View) */}
                  <div
                    className="mockup-canvas relative flex-1 min-h-0 w-full flex items-center justify-center overflow-hidden cursor-zoom-in group"
                    onClick={() => openModal(p, currentMediaIdx)}
                  >
                    <img
                      key={currentMedia.imgSrc}
                      alt={`${p.name} - ${currentMedia.label}`}
                      loading="lazy"
                      width="1920"
                      height="1080"
                      className="w-full h-full object-contain p-2 transition-transform duration-500 group-hover:scale-[1.01]"
                      src={currentMedia.imgSrc}
                    />

                    {/* Hover Inspect Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                      <div className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs flex items-center gap-2 shadow-xl">
                        <Maximize2 className="w-4 h-4" />
                        <span>Click to Inspect High-Resolution View</span>
                      </div>
                    </div>
                  </div>

                  {/* Dedicated Description Bar (Outside the visual, completely unobstructed) */}
                  <div className="card-description-bar">
                    <span
                      className="card-description-indicator"
                      style={{ backgroundColor: p.badgeColor }}
                    />
                    <p className="card-description-text truncate">
                      {currentMedia.caption || p.oneLiner}
                    </p>
                  </div>

                  {/* Live Workflow Pipeline Simulation Strip */}
                  <div className="pipeline-footer-bar">
                    {/* 5-Stage Live Pipeline Stream */}
                    <div className="pipeline-nodes-wrapper">
                      {/* Pulse Packet Flow Animation */}
                      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-white/10 pointer-events-none">
                        <div className="pipeline-pulse-dot" style={{ backgroundColor: p.badgeColor }} />
                      </div>

                      {p.workflowSteps.map((step, sIdx) => (
                        <React.Fragment key={sIdx}>
                          <div className="pipeline-node-chip">
                            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: p.badgeColor }} />
                            <span className="truncate max-w-[120px]">{step.label}</span>
                          </div>
                          {sIdx < p.workflowSteps.length - 1 && (
                            <ArrowRight className="w-3 h-3 text-white/30 shrink-0" />
                          )}
                        </React.Fragment>
                      ))}
                    </div>

                    {/* Trace Indicator Tag */}
                    <div className="hidden lg:flex items-center gap-1.5 text-[11px] text-white/50 font-mono shrink-0">
                      <Cpu className="w-3.5 h-3.5 text-sky-400" />
                      <span>SIMULATED WORKFLOW TRACE</span>
                    </div>
                  </div>
                </div>
              );
            })}
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
          onClick={() => closeModal()}
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
              <div className="min-w-0 flex-1 pr-4">
                <div className="flex items-center gap-3">
                  <span
                    className="text-xs px-2.5 py-0.5 rounded-full font-semibold uppercase tracking-wider shrink-0"
                    style={{ backgroundColor: `${modalProject.badgeColor}33`, color: modalProject.badgeColor }}
                  >
                    {modalProject.badge}
                  </span>
                  <h3 id="modal-project-title" className="text-base sm:text-lg md:text-xl font-medium text-white truncate">
                    {modalProject.fullName || modalProject.name}
                  </h3>
                </div>
                <p className="text-xs md:text-sm text-white/70 mt-1 max-w-3xl leading-relaxed">
                  {modalProject.oneLiner}
                </p>
              </div>

              <button
                onClick={() => closeModal()}
                aria-label="Close modal"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer shrink-0 ml-4"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Modal View Selector Tabs (when multiple views available) */}
            {modalProject.mediaViews.length > 1 && (
              <div
                className="px-5 py-2 flex items-center gap-2 border-b border-white/10 overflow-x-auto"
                style={{ backgroundColor: '#0d0e14' }}
              >
                <span className="text-xs text-white/50 font-mono mr-2">Available Artifacts:</span>
                {modalProject.mediaViews.map((view, vIdx) => {
                  const isCurrent = vIdx === modalMediaIdx;
                  return (
                    <button
                      key={view.id}
                      onClick={() => setModalMediaIdx(vIdx)}
                      className={`px-3 py-1 rounded-md text-xs font-mono transition-colors cursor-pointer flex items-center gap-1.5 ${
                        isCurrent
                          ? 'bg-white/20 text-white font-medium border border-white/30'
                          : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border border-transparent'
                      }`}
                    >
                      <span>{view.label}</span>
                      <span className="text-[10px] text-white/40">({view.badge})</span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Modal Image Viewer */}
            <div
              className="relative flex-1 min-h-[40vh] max-h-[62vh] overflow-auto flex flex-col items-center justify-center p-3"
              style={{ backgroundColor: '#070709' }}
            >
              <img
                src={modalProject.mediaViews[modalMediaIdx]?.highResSrc || modalProject.mediaViews[0]?.highResSrc}
                alt={`${modalProject.name} High Resolution Artifact`}
                className="max-w-full max-h-[58vh] object-contain rounded-lg shadow-lg"
              />
              <p className="text-xs text-white/60 mt-2 text-center max-w-2xl font-mono">
                {modalProject.mediaViews[modalMediaIdx]?.caption}
              </p>
            </div>

            {/* Modal Technical Highlights Footer */}
            <div
              className="px-5 py-3.5 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs md:text-sm"
              style={{ backgroundColor: '#12131A' }}
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-white/50 text-xs mr-1">Verified Technologies:</span>
                {modalProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-md bg-white/10 text-white font-mono text-[11px] sm:text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2">
                {modalProject.archifyUrl && (
                  <a
                    href={modalProject.archifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/30 text-xs font-mono transition-colors"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Archify Suite</span>
                    <ExternalLink className="w-3 h-3 text-sky-300/60 ml-0.5" />
                  </a>
                )}
                {modalProject.liveUrl && (
                  <a
                    href={modalProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 text-xs font-mono transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Live Demo</span>
                  </a>
                )}
                {modalProject.repoUrl && (
                  <a
                    href={modalProject.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-mono transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GitHub Repo</span>
                    <ExternalLink className="w-3 h-3 text-white/60 ml-0.5" />
                  </a>
                )}
                <div className="flex items-center gap-1.5 text-white/50 text-xs font-mono">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Verified Architecture</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
