import React, { useState, useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitText from './SplitText';

gsap.registerPlugin(ScrollTrigger);

const toolsData = [
  {
    name: 'ChatGPT',
    role: 'AI Assistant & Problem-Solving Partner',
    logo: '/media/tools/chatgpt.svg',
    description:
      'Support for exploring ideas, reasoning through problems, refining project requirements, and developing clearer implementation plans.',
    highlights: ['Research & Ideation', 'Problem-Solving Support', 'Documentation & Refinement'],
    priority: true
  },
  {
    name: 'Claude',
    role: 'AI Reasoning & Coding Assistance',
    logo: '/media/tools/claude.svg',
    description:
      'Assistance with understanding complex requirements, reviewing code, reasoning about architecture, and refining implementation approaches.',
    highlights: ['Code & Logic Review', 'Architecture Discussions', 'Structured Problem-Solving'],
    priority: true
  },
  {
    name: 'Google Gemini',
    role: 'Multimodal AI & Research Assistance',
    logo: '/media/tools/gemini.svg',
    description:
      'Support for research, interpreting supported visual inputs, exploring technical concepts, and developing ideas across different information formats.',
    highlights: ['Multimodal Assistance', 'Research & Exploration', 'Visual Input Analysis'],
    priority: false
  },
  {
    name: 'Antigravity',
    role: 'AI-Assisted Development Environment',
    logo: '/media/tools/antigravity_icon.svg',
    description:
      'An AI-powered development environment used to assist with project implementation, code changes, and iterative website development.',
    highlights: ['AI-Assisted Coding', 'Project Implementation', 'Iterative Refinement'],
    priority: true
  },
  {
    name: 'n8n',
    role: 'Workflow Automation & Orchestration',
    logo: '/media/tools/n8n.svg',
    description:
      'Connect APIs, webhooks, data sources, and business applications into automated workflows.',
    highlights: ['Workflow Orchestration', 'Webhook Integrations', 'Event-Driven Automation'],
    priority: false
  },
  {
    name: 'Visual Studio Code',
    role: 'Code Editing & Development',
    logo: '/media/tools/vscode.svg',
    description:
      'A development environment for working with project files, editing code, inspecting implementation details, and managing changes.',
    highlights: ['Code Editing', 'Project File Management', 'Debugging & Inspection'],
    priority: false
  },
  {
    name: 'Supabase',
    role: 'Database & Backend Infrastructure',
    logo: '/media/tools/supabase.svg',
    description:
      'Support structured application data, persistent records, and backend integrations using a PostgreSQL-based data platform.',
    highlights: ['PostgreSQL Database', 'Persistent Data Storage', 'Backend Integration'],
    priority: false
  },
  {
    name: 'GitHub',
    role: 'Version Control & Code Collaboration',
    logo: '/media/tools/github.svg',
    description:
      'Track code changes, organize repositories, and support version history and collaborative development workflows.',
    highlights: ['Git Repositories', 'Change History', 'Code Collaboration'],
    priority: false
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef(null);
  const count = toolsData.length;

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const elements = gsap.utils.toArray('.testimonial-fade');

    if (isReduced) {
      gsap.set(elements, { opacity: 1, y: 0 });
      return;
    }

    const anim = gsap.fromTo(
      elements,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          once: true
        }
      }
    );

    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % count);
  }, [count]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + count) % count);
  }, [count]);

  // Keyboard accessibility
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext]);

  const activeItem = toolsData[currentIndex];

  return (
    <section
      ref={sectionRef}
      className="w-screen bg-[#070707] py-[7vw] px-[4vw] max-[1025px]:px-[5vw] max-[1025px]:py-[12vw]"
      id="testimonials"
    >
      <div className="w-full flex flex-col gap-[6vw] max-[1025px]:gap-[12vw]">
        <div className="w-[65%] mx-auto max-[1025px]:w-full">
          <SplitText>
            <h2 className="text-[5.2vw] leading-[1.2]! text-center max-[1025px]:text-[7vw] max-md:text-[9vw] font-normal">
              Built With AI. Engineered With Intent.
            </h2>
          </SplitText>
        </div>

        <div className="relative max-md:mt-10">
          {/* Main Tool Card */}
          <div className="testimonial-fade opacity-0 relative w-3/5 mx-auto rounded-[2vw] border border-white/10 bg-white/5 overflow-hidden max-[1025px]:w-full max-[1025px]:rounded-[5vw] h-[30vw] max-[1025px]:h-[52vw] max-md:h-auto max-md:min-h-[95vw]">
            <div
              key={activeItem.name}
              className="pt-[8vw] pb-[4vw] px-[6vw] w-full h-full flex flex-col items-center justify-center gap-[1.2vw] text-center max-[1025px]:pt-[14vw] max-[1025px]:px-[8vw] max-[1025px]:gap-[2vw] max-md:pt-[17vw] max-md:px-[6vw] max-md:pb-[7vw] max-md:gap-[3vw] transition-all duration-500 ease-out"
            >
              <div className="flex flex-col items-center gap-[0.4vw] max-md:gap-1.5">
                <div className="flex flex-wrap items-center justify-center gap-2 max-md:gap-1.5">
                  <h3 className="text-[2.2vw] text-white font-medium max-[1025px]:text-[3.5vw] max-md:text-[5vw]">
                    {activeItem.name}
                  </h3>
                  {activeItem.priority && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[0.68vw] font-mono rounded-full bg-white/[0.05] text-white/80 border border-white/10 tracking-wider uppercase max-[1025px]:text-[1.2vw] max-md:text-[2.4vw] shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ff6b00]" />
                      Primary Core
                    </span>
                  )}
                </div>
                <p className="text-[1.05vw] text-[#ff6b00] font-mono tracking-wide max-[1025px]:text-[1.8vw] max-md:text-[3vw]">
                  {activeItem.role}
                </p>
              </div>

              <p className="text-[1.05vw] leading-[1.6] text-white/75 w-[85%] max-[1025px]:text-[2vw] max-[1025px]:w-full max-md:text-[3.2vw]">
                {activeItem.description}
              </p>

              {/* Three brief highlights */}
              <div className="tool-highlights-container mt-0.5">
                {activeItem.highlights.map((h, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[0.8vw] text-white/90 max-[1025px]:text-[1.5vw] max-md:text-[2.6vw] max-md:px-2.5 max-md:py-0.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff6b00] shrink-0" />
                    {h}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Tool Logo Selector Row */}
          <div className="testimonial-fade opacity-0 tool-selector-row flex w-full justify-center items-center absolute left-0 right-0 z-30 pointer-events-auto">
            {toolsData.map((item, idx) => {
              const diff = (idx - currentIndex + count) % count;
              // Symmetrically map diff: 0 is center, 1..3 is right (+1..+3), 5..7 is left (-3..-1), 4 is opposite (hidden to maintain 3-left / 3-right perfect symmetry)
              let order = 0;
              if (diff === 0) {
                order = 0;
              } else if (diff <= 3) {
                order = diff;
              } else if (diff >= 5) {
                order = diff - count;
              } else {
                return null;
              }

              const isCurrent = order === 0;

              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Select ${item.name}`}
                  aria-current={isCurrent}
                  style={{
                    order: order,
                    zIndex: isCurrent ? 25 : count - Math.abs(order),
                    marginLeft: !isCurrent && order > 0 ? '-0.8vw' : undefined,
                    marginRight: !isCurrent && order < 0 ? '-0.8vw' : undefined
                  }}
                  className={`tool-avatar-btn ${isCurrent ? 'is-active' : ''}`}
                >
                  <img
                    alt={item.name}
                    loading="lazy"
                    width="48"
                    height="48"
                    className="w-full h-full object-contain"
                    style={{ color: 'transparent' }}
                    src={item.logo}
                  />
                </button>
              );
            })}
          </div>

          {/* Previous / Next Controls */}
          <div className="testimonial-fade opacity-0 flex justify-center gap-3 mt-[3vw] max-md:mt-[8vw]">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous tool"
              className="size-12 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer relative group overflow-hidden max-md:size-10"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="relative z-2">
                <path
                  d="M19 12H5M5 12L12 19M5 12L12 5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="absolute inset-0 w-full h-full bg-linear-to-r from-[#F16B0D] to-[#E61416] group-hover:scale-100 scale-0 ease-in-out origin-center rounded-full duration-300" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next tool"
              className="size-12 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer relative group overflow-hidden max-md:size-10"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="relative z-2">
                <path
                  d="M5 12H19M19 12L12 5M19 12L12 19"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="absolute inset-0 w-full h-full bg-linear-to-r from-[#F16B0D] to-[#E61416] group-hover:scale-100 scale-0 ease-in-out origin-center rounded-full duration-300" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
