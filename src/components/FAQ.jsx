import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitText from './SplitText';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: 'What is the Revenue Lifecycle Orchestration Engine (RLOE)?',
    answer: [
      'RLOE is a portfolio project designed to demonstrate how inbound intent signals, product-usage patterns, data enrichment, lead qualification, AI-assisted analysis, and CRM actions can work together in a single automated workflow.',
      'Built with n8n and Supabase, the system follows a structured process: validate incoming signals, check for existing records, enrich eligible new accounts, apply deterministic qualification rules, invoke an LLM when appropriate, and route the resulting decisions toward CRM actions.',
      'The goal is to demonstrate a practical approach to revenue lifecycle automation—not just a collection of disconnected integrations.'
    ]
  },
  {
    question: 'What business problem is RLOE designed to solve?',
    answer: [
      'Revenue teams can lose time and resources when inbound signals are incomplete, duplicate accounts trigger repeated enrichment, and sales representatives must manually decide which accounts deserve attention.',
      'RLOE is designed to address these challenges through signal validation, cache-first duplicate handling, enrichment workflows, qualification logic, and automated routing.',
      'Instead of treating every incoming signal equally, it creates a structured process for identifying potentially valuable accounts and directing them toward an appropriate next action.'
    ]
  },
  {
    question: 'Why use deterministic rules before AI?',
    answer: [
      'Not every decision requires an LLM. RLOE uses deterministic checks for data validation, duplicate handling, firmographic eligibility, and initial scoring before deciding whether an account should proceed to AI-assisted analysis.',
      'This approach makes routine decisions more predictable and helps avoid unnecessary model calls.',
      'AI is reserved for the parts of the workflow where contextual reasoning can add value, such as interpreting potential account pain points. The principle is simple: use rules for decisions that can be made reliably with rules, and use AI where additional interpretation is useful.'
    ]
  },
  {
    question: 'How does RLOE handle duplicate accounts and unnecessary enrichment?',
    answer: [
      'The workflow uses a cache-first approach to check whether an incoming account has already been processed. Existing records can follow a separate handling path, while eligible new accounts proceed toward enrichment.',
      'The design also includes a pending-record step intended to help prevent duplicate processing when multiple signals concern the same account.',
      'This matters because enrichment services and LLM calls can introduce additional costs. Checking existing data and applying eligibility gates before expensive operations helps make the overall workflow more cost-aware.'
    ]
  },
  {
    question: 'Why did you choose n8n, Supabase, Clay, HubSpot, and an LLM?',
    answer: [
      'Each tool serves a different role in the architecture.',
      'n8n: Orchestrates the workflow, branching logic, webhooks, and integrations.',
      'Supabase: Provides the PostgreSQL-backed data layer for intent records, processing state, telemetry, and error logs.',
      'Clay: Supports the enrichment stage for eligible new accounts.',
      'HubSpot: Serves as the CRM destination for relevant lead updates and sales-task actions.',
      'NVIDIA-hosted LLM: Supports AI-assisted account interpretation and routing decisions when the workflow\'s eligibility rules allow it.',
      'The objective is to connect specialized tools into a coherent revenue workflow rather than relying on a single tool to handle every stage.'
    ]
  },
  {
    question: 'How does the system decide which accounts should receive sales attention?',
    answer: [
      'RLOE combines deterministic pre-filtering with scoring and, for eligible accounts, AI-assisted interpretation.',
      'The initial checks evaluate whether an account meets configured criteria such as company characteristics and target-industry fit. Accounts that pass the relevant gates can proceed to deeper analysis, after which validated routing decisions determine the next workflow action.',
      'This design separates basic eligibility from contextual reasoning and helps make the routing process easier to inspect and refine.'
    ]
  },
  {
    question: 'How do you approach reliability, debugging, and observability?',
    answer: [
      'An automation workflow is only useful when its behavior can be understood and problems can be investigated.',
      'RLOE includes telemetry and error-logging paths intended to record workflow activity, routing decisions, and failures. Structured validation also helps prevent unexpected model output from moving directly into downstream actions without checks.',
      'My approach is to make important decisions visible, validate data at system boundaries, and create clear paths for investigating errors instead of treating automation as a black box.'
    ]
  },
  {
    question: 'What was your contribution, and what does this project demonstrate about you?',
    answer: [
      'I designed and assembled RLOE as a hands-on portfolio project, connecting workflow orchestration, database-backed processing, enrichment, qualification logic, LLM integration, CRM actions, and observability into one architecture.',
      'My focus is on understanding the business problem first, selecting an appropriate technical approach, and connecting the individual components into a coherent system.',
      'As a business graduate pursuing GTM Engineering, I am developing the ability to bridge revenue operations and technical implementation—turning business requirements into structured workflows that can be inspected, tested, and improved.'
    ]
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);
  const itemsRef = useRef([]);

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    itemsRef.current.forEach((el) => {
      if (!el) return;
      if (isReduced) {
        gsap.set(el, { opacity: 1, y: 0 });
        return;
      }
      gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    });
  }, []);

  const toggleAccordion = (idx) => {
    setOpenIndex((prev) => (prev === idx ? -1 : idx));
  };

  return (
    <section className="w-screen py-[6vw] px-[10vw] relative bg-[#070707] text-white max-[1025px]:px-[5vw]">
      <SplitText>
        <h2 className="text-[5.5vw] text-center mb-[6vw] max-[1025px]:text-[7vw] max-md:text-[9vw] font-normal">
          Frequently Asked Questions
        </h2>
      </SplitText>

      <div className="w-full mx-auto">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={faq.question}
              ref={(el) => (itemsRef.current[idx] = el)}
              className="opacity-0"
            >
              <div
                className="cursor-pointer border-b border-white/10 py-8 group max-md:py-5"
                role="button"
                tabIndex={0}
                aria-expanded={isOpen}
                onClick={() => toggleAccordion(idx)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleAccordion(idx);
                  }
                }}
              >
                <div className="flex w-full items-center justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-6 w-full max-md:gap-4">
                      <span className="text-[1.5vw] font-normal max-[1025px]:text-[2.6vw] max-md:text-[4.2vw]">
                        {faq.question}
                      </span>
                      <div className="relative shrink-0 size-14 rounded-full overflow-hidden flex items-center justify-center transition-colors duration-300 ease-out border border-white/20 max-[1025px]:size-11 max-md:size-9">
                        <span className="absolute h-[2px] z-2 w-4 rounded-full bg-white max-md:w-3" />
                        <span
                          className={`absolute h-[2px] z-2 w-4 rounded-full bg-white transition-transform duration-300 ease-out max-md:w-3 ${
                            isOpen ? 'rotate-0' : 'rotate-90'
                          }`}
                        />
                        <div
                          className={`absolute inset-0 w-full h-full bg-linear-to-r from-[#F16B0D] to-[#E61416] group-hover:scale-100 ease-in-out origin-center rounded-full duration-300 ${
                            isOpen ? 'scale-100' : 'scale-0'
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    maxHeight: isOpen ? '900px' : '0px',
                    opacity: isOpen ? 1 : 0,
                    overflow: 'hidden',
                    transition: 'max-height 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease'
                  }}
                >
                  <div className="pt-4 pr-[3vw] w-[80%] max-[1025px]:w-full max-[1025px]:pr-0 max-md:w-full max-md:pr-0 space-y-3">
                    {Array.isArray(faq.answer) ? (
                      faq.answer.map((para, pIdx) => {
                        const isToolItem =
                          para.includes(': ') &&
                          ['n8n:', 'Supabase:', 'Clay:', 'HubSpot:', 'NVIDIA-hosted LLM:'].some((t) =>
                            para.startsWith(t)
                          );

                        if (isToolItem) {
                          const colonIdx = para.indexOf(':');
                          const tool = para.slice(0, colonIdx + 1);
                          const desc = para.slice(colonIdx + 1);
                          return (
                            <p
                              key={pIdx}
                              className="text-[1.25vw] leading-[1.6] text-white/80 max-[1025px]:text-[2.2vw] max-md:text-[3.8vw] pl-3 border-l border-white/15"
                            >
                              <span className="text-white font-medium">{tool}</span>
                              {desc}
                            </p>
                          );
                        }

                        return (
                          <p
                            key={pIdx}
                            className="text-[1.25vw] leading-[1.6] text-white/80 max-[1025px]:text-[2.2vw] max-md:text-[3.8vw]"
                          >
                            {para}
                          </p>
                        );
                      })
                    ) : (
                      <p className="text-[1.25vw] leading-[1.6] text-white/80 max-[1025px]:text-[2.2vw] max-md:text-[3.8vw]">
                        {faq.answer}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
