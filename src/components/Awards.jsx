import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitText from './SplitText';

gsap.registerPlugin(ScrollTrigger);

const principlesData = [
  {
    number: '01',
    title: '01 — Systems Thinking',
    badge: '01 // SYSTEMS THINKING',
    description:
      'Connecting intent signals, enrichment, qualification, and CRM actions into one coherent GTM workflow.',
    imgSrc: '/media/principles/principle-1-systems-thinking.webp',
    fallbackSrc: '/media/principles/principle-1-systems-thinking.jpg',
    alt: 'Systems Thinking - Revenue Lifecycle Orchestration Engine'
  },
  {
    number: '02',
    title: '02 — Deterministic Before AI',
    badge: '02 // DETERMINISTIC BEFORE AI',
    description:
      'Using validation, caching, and rule-based qualification before invoking an LLM where it adds value.',
    imgSrc: '/media/principles/principle-2-deterministic-before-ai.webp',
    fallbackSrc: '/media/principles/principle-2-deterministic-before-ai.jpg',
    alt: 'Deterministic Before AI - Selective AI Decision Gate'
  },
  {
    number: '03',
    title: '03 — Cost-Aware Intelligence',
    badge: '03 // COST-AWARE INTELLIGENCE',
    description:
      'Applying eligibility gates to avoid unnecessary AI processing and enrichment work.',
    imgSrc: '/media/principles/principle-3-cost-aware-intelligence.webp',
    fallbackSrc: '/media/principles/principle-3-cost-aware-intelligence.jpg',
    alt: 'Cost-Aware Intelligence - Efficient Compute Allocation Gateway'
  },
  {
    number: '04',
    title: '04 — Observable by Design',
    badge: '04 // OBSERVABLE BY DESIGN',
    description:
      'Tracking routing decisions, workflow activity, and errors to make system behavior easier to inspect.',
    imgSrc: '/media/principles/principle-4-observable-by-design.webp',
    fallbackSrc: '/media/principles/principle-4-observable-by-design.jpg',
    alt: 'Observable by Design - Real-time Execution Telemetry & Tracing'
  }
];

function GuitarString({ strokeColor = 'rgba(255, 255, 255, 0.25)', sound = true }) {
  const containerRef = useRef(null);
  const pathRef = useRef(null);
  const currentY = useRef(0);
  const animFrame = useRef(null);

  const audioCtxRef = useRef(null);
  const frequencies = [146.83, 164.81, 196, 220, 261.63, 293.66, 329.63, 392];
  const freqIndex = useRef(0);

  const playPluckSound = (offset) => {
    if (!sound) return;
    try {
      if (!audioCtxRef.current) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        audioCtxRef.current = new AudioContext();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      const intensity = Math.min(Math.abs(offset) / 50, 1);
      if (intensity < 0.05) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      freqIndex.current = (freqIndex.current + 1) % frequencies.length;
      const freq = frequencies[freqIndex.current];

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.12 * intensity, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.8);
    } catch {
      // Audio fallback
    }
  };

  const updatePath = (y) => {
    const path = pathRef.current;
    const container = containerRef.current;
    if (!path || !container) return;
    const width = container.offsetWidth;
    path.setAttributeNS(null, 'd', `M 0 50 Q ${0.5 * width} ${50 + y} ${width} 50`);
  };

  const handleMouseMove = (e) => {
    const box = e.currentTarget.getBoundingClientRect();
    const offsetY = e.clientY - (box.top + box.height / 2);
    currentY.current = offsetY;
    updatePath(offsetY);
  };

  const handleMouseLeave = () => {
    const startY = currentY.current;
    playPluckSound(startY);

    let progress = 0;
    const animateOscillation = () => {
      progress += 0.12;
      const decay = Math.exp(-progress * 0.4);
      const y = startY * Math.cos(progress * 8) * decay;
      updatePath(y);

      if (decay > 0.01) {
        animFrame.current = requestAnimationFrame(animateOscillation);
      } else {
        currentY.current = 0;
        updatePath(0);
      }
    };

    if (animFrame.current) cancelAnimationFrame(animFrame.current);
    animFrame.current = requestAnimationFrame(animateOscillation);
  };

  useEffect(() => {
    updatePath(0);
    const handleResize = () => updatePath(0);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrame.current) cancelAnimationFrame(animFrame.current);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full">
      <div className="string-line lineDraw">
        <span
          className="box"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        />
        <svg width="100%" height="100">
          <path
            ref={pathRef}
            strokeWidth="2"
            fill="none"
            style={{ stroke: strokeColor }}
          />
        </svg>
      </div>
    </div>
  );
}

export default function Awards() {
  const [activeAward, setActiveAward] = useState(0);
  const sectionRef = useRef(null);
  const imageContainerRef = useRef(null);
  const rowRefs = useRef([]);
  const isHoveringRef = useRef(false);

  const glideToRow = (idx) => {
    if (idx < 0 || !rowRefs.current[idx] || !imageContainerRef.current || !sectionRef.current) return;
    const rowEl = rowRefs.current[idx];
    const sectionEl = sectionRef.current;
    const rowRect = rowEl.getBoundingClientRect();
    const sectionRect = sectionEl.getBoundingClientRect();

    const rowCenterY = rowRect.top - sectionRect.top + rowRect.height / 2;
    const imgHeight = imageContainerRef.current.offsetHeight;
    const targetY = Math.max(0, rowCenterY - imgHeight / 2);

    gsap.to(imageContainerRef.current, {
      y: targetY,
      duration: 0.5,
      ease: 'power2.out',
      overwrite: 'auto'
    });
  };

  const handleMouseEnterRow = (idx) => {
    isHoveringRef.current = true;
    setActiveAward(idx);
    glideToRow(idx);
    if (imageContainerRef.current) {
      gsap.to(imageContainerRef.current, {
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out'
      });
    }
  };

  const handleMouseLeaveAll = () => {
    isHoveringRef.current = false;
    // Keep activeAward on the current principle so the visual doesn't disappear abruptly
  };

  // ScrollTrigger for desktop & scroll-driven sync
  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 1026px)', () => {
        // Initially show first principle when scrolled into view
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top 75%',
          end: 'bottom 25%',
          onEnter: () => {
            if (imageContainerRef.current) {
              gsap.to(imageContainerRef.current, {
                opacity: 1,
                duration: 0.5,
                ease: 'power2.out'
              });
            }
          },
          onLeave: () => {
            if (imageContainerRef.current) {
              gsap.to(imageContainerRef.current, {
                opacity: 0,
                duration: 0.4,
                ease: 'power2.in'
              });
            }
          },
          onEnterBack: () => {
            if (imageContainerRef.current) {
              gsap.to(imageContainerRef.current, {
                opacity: 1,
                duration: 0.5,
                ease: 'power2.out'
              });
            }
          },
          onLeaveBack: () => {
            if (imageContainerRef.current) {
              gsap.to(imageContainerRef.current, {
                opacity: 0,
                duration: 0.4,
                ease: 'power2.in'
              });
            }
          }
        });

        // Trigger each row during scroll
        principlesData.forEach((_, idx) => {
          const el = rowRefs.current[idx];
          if (!el) return;

          ScrollTrigger.create({
            trigger: el,
            start: 'top 60%',
            end: 'bottom 40%',
            onEnter: () => {
              if (!isHoveringRef.current) {
                setActiveAward(idx);
                glideToRow(idx);
              }
            },
            onEnterBack: () => {
              if (!isHoveringRef.current) {
                setActiveAward(idx);
                glideToRow(idx);
              }
            }
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-screen bg-[#070707] text-white py-[7vw]"
      id="awards"
    >
      <div className="w-screen flex items-start px-[4vw] gap-[4vw] max-[1025px]:px-[5vw]">
        <div className="w-full" onMouseLeave={handleMouseLeaveAll}>
          <SplitText>
            <h2 className="text-[5.5vw] leading-[1.2] mb-[4vw] max-[1025px]:text-[7vw] max-md:text-[9vw] font-normal">
              Engineering Principles
              <br />
              in Practice
            </h2>
          </SplitText>

          <div className="principles-list-col w-full">
            {principlesData.map((principle, idx) => (
              <React.Fragment key={principle.number}>
                <div
                  ref={(el) => (rowRefs.current[idx] = el)}
                  onMouseEnter={() => handleMouseEnterRow(idx)}
                  className={`relative py-8 awards-container cursor-pointer transition-colors duration-300 ${
                    activeAward === idx ? 'text-[#F06A0E]' : 'hover:text-[#F06A0E]'
                  }`}
                >
                  <SplitText>
                    <h3 className="text-[1.8vw] font-normal max-[1025px]:text-[3.4vw] max-md:text-[5.5vw]">
                      {principle.title}
                    </h3>
                  </SplitText>
                  <SplitText>
                    <p className="text-[1.2vw] leading-relaxed tracking-wide text-white/50 mt-3 max-[1025px]:text-[2.2vw] max-md:text-[3.8vw] w-full">
                      {principle.description}
                    </p>
                  </SplitText>

                  {/* Inline visual for Tablet & Mobile (screens <= 1025px) */}
                  <div className="principles-inline-visual">
                    <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16 / 9' }}>
                      <picture>
                        <source srcSet={principle.imgSrc} type="image/webp" />
                        <img
                          src={principle.fallbackSrc}
                          alt={principle.alt}
                          loading="lazy"
                          className="w-full h-full object-cover"
                        />
                      </picture>
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-[2.6vw] max-md:text-[3.2vw] font-mono text-[#F06A0E] tracking-wider uppercase">
                        {principle.badge}
                      </div>
                    </div>
                  </div>
                </div>
                <GuitarString />
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Floating Image Preview on Hover & Scroll (Desktop screens > 1025px) */}
        <div
          ref={imageContainerRef}
          className="principles-image-container image-container will-change-transform"
        >
          <div className="principles-image-card">
            {principlesData.map((principle, idx) => (
              <div
                key={principle.number}
                className="absolute inset-0 transition-all duration-500 ease-out"
                style={{
                  opacity: activeAward === idx ? 1 : 0,
                  transform: activeAward === idx ? 'scale(1)' : 'scale(1.04)',
                  visibility: activeAward === idx ? 'visible' : 'hidden'
                }}
              >
                <picture>
                  <source srcSet={principle.imgSrc} type="image/webp" />
                  <img
                    alt={principle.alt}
                    loading="eager"
                    width="1280"
                    height="720"
                    className="w-full h-full object-cover rounded-xl"
                    style={{ color: 'transparent' }}
                    src={principle.fallbackSrc}
                  />
                </picture>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-[0.75vw] font-mono text-[#F06A0E] tracking-wider uppercase">
                  {principle.badge}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
