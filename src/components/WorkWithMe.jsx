import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Workflow, Target, BrainCircuit } from 'lucide-react';
import SplitText from './SplitText';

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
  {
    icon: Workflow,
    title: 'GTM Workflow Automation',
    description:
      'Automate repetitive go-to-market processes with connected workflows that move data between systems, reduce manual work, and keep revenue operations running efficiently.'
  },
  {
    icon: Target,
    title: 'Lead Intelligence & Routing',
    description:
      'Build lead enrichment, qualification, and routing workflows that combine firmographic signals, deterministic scoring, and AI-assisted insights to help prioritize relevant opportunities.'
  },
  {
    icon: BrainCircuit,
    title: 'AI Agents & Revenue Systems',
    description:
      'Design AI-powered systems that connect specialized agents, application interfaces, persistent data, and business workflows—with validation and human approval where appropriate.'
  }
];

export default function WorkWithMe() {
  const linesRef = useRef([]);

  useEffect(() => {
    // Initial state: lines hidden
    linesRef.current.forEach((line) => {
      if (line) gsap.set(line, { scaleX: 0, transformOrigin: 'left center' });
    });

    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) {
      gsap.set('.work-card', { opacity: 1, yPercent: 0 });
      return;
    }

    const anim = gsap.fromTo(
      '.work-card',
      { opacity: 0, yPercent: 10 },
      {
        opacity: 1,
        yPercent: 0,
        stagger: 0.05,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '#work-with-me',
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

  const handleMouseEnter = (idx) => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const line = linesRef.current[idx];
    if (line) {
      gsap.killTweensOf(line);
      gsap.set(line, { transformOrigin: 'left center' });
      if (isReduced) {
        gsap.set(line, { scaleX: 1 });
      } else {
        gsap.to(line, { scaleX: 1, duration: 0.55, ease: 'power2.out' });
      }
    }
  };

  const handleMouseLeave = (idx) => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const line = linesRef.current[idx];
    if (line) {
      gsap.killTweensOf(line);
      gsap.set(line, { transformOrigin: 'right center' });
      if (isReduced) {
        gsap.set(line, { scaleX: 0 });
      } else {
        gsap.to(line, { scaleX: 0, duration: 0.55, ease: 'power2.out' });
      }
    }
  };

  return (
    <section
      className="relative w-screen bg-[#070707] text-white pt-[25vw] pb-[10vw] max-[1025px]:pt-[65vw]"
      id="work-with-me"
    >
      <div className="text-center mb-[5vw] max-md:mb-[10vw]">
        <SplitText stagger={0.015}>
          <h2 className="text-[5.5vw] max-[1025px]:text-[7vw] max-md:text-[9vw] font-normal">
            What I Build
          </h2>
        </SplitText>
        <SplitText splitBy="lines">
          <p className="text-[1.25vw] text-white mt-[1.5vw] max-[1025px]:text-[2.5vw] max-md:text-[4.5vw] max-md:mt-[2vw]">
            AI-powered systems that connect data, automation, and revenue workflows.
          </p>
        </SplitText>
      </div>

      <div className="grid grid-cols-3 max-[1025px]:grid-cols-1">
        {capabilities.map((f, idx) => {
          const Icon = f.icon;
          return (
            <div
              key={f.title}
              onMouseEnter={() => handleMouseEnter(idx)}
              onMouseLeave={() => handleMouseLeave(idx)}
              className="relative px-[4vw] pt-[2vw] pb-[3vw] h-[32vw] flex flex-col justify-between work-card max-[1025px]:h-auto max-[1025px]:py-[6vw] max-[1025px]:px-[5vw]"
            >
              <div>
                <Icon
                  size={50}
                  color="#E8620F"
                  strokeWidth={1.5}
                  className="mb-[2.5vw] max-[1025px]:mb-[4vw]"
                />
                <h3 className="text-[2vw] font-normal mb-[2.5vw] max-[1025px]:text-[4.2vw] max-md:text-[5.8vw] max-[1025px]:mb-[2vw]">
                  {f.title}
                </h3>
                <p className="text-[1.25vw] leading-normal text-white/80 max-[1025px]:text-[2.8vw] max-md:text-[4vw]">
                  {f.description}
                </p>
              </div>

              <div className="relative mt-[3vw] h-px w-full bg-white/20">
                <span
                  ref={(el) => (linesRef.current[idx] = el)}
                  className="absolute inset-0 h-px w-full will-change-transform"
                  style={{ backgroundColor: '#E8620F' }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
