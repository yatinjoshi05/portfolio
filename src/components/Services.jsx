import React, { useRef, useState, useEffect, useSyncExternalStore } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import SplitText from './SplitText';

gsap.registerPlugin(ScrollTrigger);

function subscribeReducedMotion(callback) {
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  mediaQuery.addEventListener('change', callback);
  return () => mediaQuery.removeEventListener('change', callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );
}

const servicesData = [
  {
    number: '01',
    category: 'GTM ARCHITECTURE',
    title: 'GTM Systems Engineering',
    description: 'Design the connected workflows behind a modern go-to-market engine.',
    items: [
      'Revenue Workflow Architecture',
      'Lead Lifecycle Orchestration',
      'GTM Stack Integration',
      'End-to-End System Design'
    ],
    href: '#'
  },
  {
    number: '02',
    category: 'ORCHESTRATION',
    title: 'Workflow Automation',
    description: 'Turn repetitive GTM processes into structured, event-driven workflows.',
    items: [
      'n8n Workflow Orchestration',
      'Webhook & Event Processing',
      'Automated Data Transformation',
      'Error Handling & Recovery'
    ],
    href: '#'
  },
  {
    number: '03',
    category: 'INTELLIGENCE',
    title: 'AI-Powered Lead Intelligence',
    description:
      'Apply AI selectively to qualify accounts, interpret signals, and support routing decisions.',
    items: [
      'Ideal Customer Profile (ICP) Scoring',
      'AI-Assisted Account Qualification',
      'Intent Signal Analysis',
      'Cost-Aware LLM Decisions'
    ],
    href: '#'
  },
  {
    number: '04',
    category: 'REVOPS & CRM',
    title: 'CRM & Revenue Operations',
    description:
      'Connect qualified signals to the CRM actions that help sales teams work efficiently.',
    items: [
      'HubSpot Workflow Integration',
      'Lead & Account Routing',
      'Automated CRM Task Creation',
      'Revenue Pipeline Visibility'
    ],
    href: '#'
  },
  {
    number: '05',
    category: 'OBSERVABILITY',
    title: 'Data & System Observability',
    description: 'Make automated systems traceable, inspectable, and easier to troubleshoot.',
    items: [
      'Supabase & PostgreSQL Data Layer',
      'Cache & Duplicate Protection',
      'Execution Telemetry & Error Logs',
      'Workflow Outcome Monitoring'
    ],
    href: '#'
  }
];

export default function Services() {
  const rowRef = useRef(null);
  const maskRefs = useRef([]);
  const revealValues = useRef(servicesData.map((_, idx) => ({ value: idx === 0 ? 100 : -40 })));
  const prefersReduced = usePrefersReducedMotion();
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    const handle = window.requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => window.cancelAnimationFrame(handle);
  }, [prefersReduced]);

  useEffect(() => {
    if (prefersReduced) {
      gsap.set(rowRef.current, { clearProps: 'transform' });
      return;
    }

    const mm = gsap.matchMedia();

    // Desktop
    mm.add('(min-width: 1026px)', () => {
      gsap.fromTo(
        rowRef.current,
        { xPercent: 70 },
        {
          xPercent: -33,
          ease: 'none',
          scrollTrigger: {
            trigger: '#services',
            start: 'top 20%',
            end: 'bottom bottom',
            scrub: true
          }
        }
      );
    });

    // Tablet
    mm.add('(min-width: 542px) and (max-width: 1025px)', () => {
      gsap.fromTo(
        rowRef.current,
        { xPercent: 50 },
        {
          xPercent: -65,
          ease: 'none',
          scrollTrigger: {
            trigger: '#services',
            start: 'top 20%',
            end: 'bottom bottom',
            scrub: true
          }
        }
      );
    });

    // Mobile
    mm.add('(max-width: 541px)', () => {
      gsap.fromTo(
        rowRef.current,
        { xPercent: 50 },
        {
          xPercent: -77,
          ease: 'none',
          scrollTrigger: {
            trigger: '#services',
            start: 'top 20%',
            end: 'bottom bottom',
            scrub: true
          }
        }
      );
    });

    return () => {
      mm.revert();
    };
  }, [prefersReduced]);

  const handleMouseEnter = (idx) => {
    if (idx === activeCard) return;

    const prevCard = activeCard;
    const dur = 0.45 * (prefersReduced ? 0 : 1);

    gsap.to(revealValues.current[prevCard], {
      value: -40,
      duration: dur,
      ease: 'power2.out',
      onUpdate: () => {
        maskRefs.current[prevCard]?.style.setProperty(
          '--reveal',
          `${revealValues.current[prevCard].value}%`
        );
      }
    });

    gsap.to(revealValues.current[idx], {
      value: 100,
      duration: dur,
      ease: 'power2.out',
      onUpdate: () => {
        maskRefs.current[idx]?.style.setProperty(
          '--reveal',
          `${revealValues.current[idx].value}%`
        );
      }
    });

    setActiveCard(idx);
  };

  return (
    <section
      className={`services-section relative w-screen bg-[#070707] text-white ${
        prefersReduced ? '' : 'h-[275vh]'
      }`}
      id="services"
    >
      <div className="relative pt-[6vw] px-[4vw] w-[65%] max-[1025px]:w-[85%] max-md:w-full max-[1025px]:px-[5vw] max-[1025px]:pt-[15vw]">
        <SplitText stagger={0.015}>
          <h2 className="text-[5.2vw] leading-[1.15] max-[1025px]:text-[7vw] max-md:text-[9vw] font-normal tracking-tight">
            I Build Systems That Move Revenue Forward
          </h2>
        </SplitText>
        <div className="w-[85%] max-[1025px]:w-full mt-[1.5vw] max-[1025px]:mt-[5vw]">
          <SplitText splitBy="lines">
            <p className="text-[1.25vw] max-[1025px]:text-[2.5vw] max-md:text-[4.5vw] text-white/80 leading-relaxed">
              From intent signals to intelligent routing, I connect data, automation, and AI into
              practical GTM systems built around how revenue teams work.
            </p>
          </SplitText>
        </div>
      </div>

      <div
        className={`services-sticky ${
          prefersReduced
            ? 'w-screen pb-[6vw]'
            : 'w-screen h-screen sticky top-0 overflow-hidden flex flex-col max-md:mt-[-30vw]'
        }`}
      >
        <div className={prefersReduced ? '' : 'relative flex-1 flex items-center'}>
          <div
            ref={rowRef}
            className={`services-row ${
              prefersReduced
                ? 'grid grid-cols-3 gap-[1.6vw] px-[4vw] pt-[5vw] max-[1025px]:grid-cols-2 max-md:grid-cols-1'
                : 'flex gap-[1.6vw] px-[4vw] will-change-transform max-[1025px]:gap-[2.5vw] max-md:gap-[6vw]'
            }`}
          >
            {servicesData.map((s, idx) => (
              <a
                key={s.title}
                href={s.href || '#'}
                onClick={(e) => e.preventDefault()}
                onMouseEnter={() => handleMouseEnter(idx)}
                className={`services-card gtm-card ${
                  prefersReduced
                    ? 'relative flex flex-col justify-between overflow-hidden min-h-[22vw] max-[1025px]:min-h-[32vw] max-md:min-h-0'
                    : 'relative w-[27vw] h-[30vw] shrink-0 flex flex-col justify-between overflow-hidden max-[1025px]:w-[55vw] max-[1025px]:h-[66vw] max-md:w-[78vw] max-md:h-[86vw] group'
                }`}
              >
                {/* Radial Mask Background Hover */}
                <div
                  ref={(el) => (maskRefs.current[idx] = el)}
                  className="absolute inset-0 bg-linear-to-r from-[#F16B0D] to-[#E61416] radial-mask-bg-fill pointer-events-none"
                  style={{ '--reveal': idx === 0 ? '100%' : '-40%' }}
                />

                {/* Top Bar: Card Number & Category + Arrow Button */}
                <div className="relative flex items-center justify-between z-1">
                  <div className="flex items-center gap-[0.7vw] max-[1025px]:gap-[1.5vw] max-md:gap-[2.5vw]">
                    <span className="font-mono text-[0.9vw] max-[1025px]:text-[2.2vw] max-md:text-[3.5vw] font-bold text-white/80 tracking-wider">
                      {s.number}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-white/30" />
                    <span className="font-mono text-[0.72vw] max-[1025px]:text-[1.6vw] max-md:text-[2.6vw] uppercase tracking-widest text-white/50">
                      {s.category}
                    </span>
                  </div>

                  <div
                    className={`w-[2.8vw] h-[2.8vw] rounded-full flex items-center justify-center border-white/20 border max-[1025px]:w-[6.5vw] max-[1025px]:h-[6.5vw] max-md:w-[9vw] max-md:h-[9vw] duration-300 ease-out overflow-hidden relative ${
                      activeCard === idx ? 'bg-white text-black' : 'text-white'
                    }`}
                  >
                    <div className="group-hover:translate-x-[150%] group-hover:translate-y-[-150%] duration-300 ease-out">
                      <ArrowUpRight size={18} strokeWidth={2} />
                    </div>
                    <div className="absolute translate-x-[-150%] translate-y-[150%] group-hover:translate-x-0 group-hover:translate-y-0 duration-300 ease-out">
                      <ArrowUpRight size={18} strokeWidth={2} />
                    </div>
                  </div>
                </div>

                {/* Middle: Title & Short Description */}
                <div className="relative z-1 my-[0.8vw] max-[1025px]:my-[1.6vw] max-md:my-[2.5vw]">
                  <h3 className="text-[1.75vw] max-[1025px]:text-[3.4vw] max-md:text-[5.2vw] font-medium leading-[1.22] text-white tracking-tight">
                    {s.title}
                  </h3>
                  <p className="text-[0.92vw] max-[1025px]:text-[1.9vw] max-md:text-[3.3vw] text-white/65 leading-relaxed mt-[0.5vw] max-[1025px]:mt-[1vw] max-md:mt-[1.8vw]">
                    {s.description}
                  </p>
                </div>

                {/* Bottom: Divider & Key Points */}
                <div className="relative z-1">
                  <div className="gtm-divider" />
                  <ul className="space-y-[0.5vw] max-[1025px]:space-y-[1.1vw] max-md:space-y-[1.8vw]">
                    {s.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start text-[0.92vw] max-[1025px]:text-[2vw] max-md:text-[3.4vw] text-white/90 leading-snug"
                      >
                        <span className="gtm-bullet" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
