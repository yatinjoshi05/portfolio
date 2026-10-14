import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGetInTouchModal } from './GetInTouchModal';
import Button from './Button';

import { SOCIAL_LINKS } from '../data/socialLinks';

gsap.registerPlugin(ScrollTrigger);

const footerSocials = [
  SOCIAL_LINKS.github,
  SOCIAL_LINKS.linkedin,
  SOCIAL_LINKS.instagram,
  SOCIAL_LINKS.whatsapp,
];

export default function Footer() {
  const footerRef = useRef(null);
  const cardRef = useRef(null);
  const { openModal } = useGetInTouchModal();

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (cardRef.current) gsap.set(cardRef.current, { opacity: 1, yPercent: 0 });
      return;
    }

    if (window.innerWidth <= 1025) return;

    const anim = gsap.fromTo(
      cardRef.current,
      { yPercent: 20 },
      {
        yPercent: 0,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 60%',
          end: 'bottom bottom',
          scrub: true
        }
      }
    );

    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden px-[4vw] pt-[10vw] max-[1025px]:px-[5vw] max-md:pt-[20vw]"
      id="footer"
    >
      <img
        alt="Footer Background"
        loading="lazy"
        width="1920"
        height="900"
        className="absolute -bottom-20 left-0 right-0 w-full max-md:scale-[5] max-md:bottom-0 pointer-events-none"
        style={{ color: 'transparent' }}
        src="/_next/static/media/footer-bg.2y6ggh6bp2suk.svg"
      />

      <div className="relative z-[1]">
        <div
          ref={cardRef}
          className="rounded-4xl bg-black/5 border border-white/30 backdrop-blur-2xl px-12 py-12 flex flex-col gap-20 justify-between max-[1025px]:flex-col max-[1025px]:items-center max-[1025px]:gap-10 max-[1025px]:px-8 max-[1025px]:py-15 max-md:px-6 max-md:gap-8"
        >
          {/* Top Row: Logo & CTA */}
          <div className="flex justify-between items-start gap-24 footer-content max-[1025px]:gap-10 max-md:gap-16 max-[1025px]:flex-col-reverse max-[1025px]:items-center w-full">
            <img
              alt="YATIN JOSHI"
              loading="lazy"
              width="445"
              height="77"
              className="w-[22vw] max-[1025px]:w-[34vw] max-md:w-[46vw] h-auto object-contain"
              style={{ color: 'transparent' }}
              src="/_next/static/media/yatin-joshi.svg"
            />
            <div className="flex flex-col gap-[2vw] items-end max-[1025px]:items-center max-[1025px]:text-center max-md:gap-[7vw]">
              <p className="text-[3.4vw] text-end w-[75%] leading-[1.15] max-[1025px]:text-[5vw] max-[1025px]:w-full max-[1025px]:text-center max-md:text-[7.5vw] font-normal">
                Let’s Build Smarter Revenue Systems.
              </p>
              <Button
                btnText="Get in Touch"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  openModal();
                }}
                className="border border-white/20!"
                textClassName="font-normal text-[1.15vw] max-[1025px]:text-[3vw] max-md:text-[4.2vw]"
                bgColor="#ffffff"
                dotColor="#070707"
                hoverTextColor="#ffffff"
                textColor="#111111"
              />
            </div>
          </div>

          {/* Bottom Row: Contact & Socials */}
          <div className="flex w-full items-end justify-between gap-36 h-auto footer-content max-[1025px]:w-full max-[1025px]:items-center max-[1025px]:text-center max-[1025px]:gap-10 max-md:gap-10 max-[1025px]:flex-col">
            <div className="w-fit text-foreground">
              <h6 className="uppercase mb-5 text-[1.25vw] max-[1025px]:text-[2.4vw] max-md:text-[4vw] tracking-wider text-white/70">
                Reach Out
              </h6>
              <ul className="space-y-2 text-[1.25vw] max-[1025px]:text-[2.4vw] max-md:text-[4vw]">
                <li className="under-multi-parent">
                  <a href="tel:+916397634393" className="under-multi content-p">
                    +91 63976 34393
                  </a>
                </li>
                <li className="under-multi-parent">
                  <a href="mailto:yatinjoshi972@gmail.com" className="under-multi content-p">
                    yatinjoshi972@gmail.com
                  </a>
                </li>
              </ul>
            </div>

            <div className="flex flex-col justify-between h-fit">
              <ul className="flex gap-4">
                {footerSocials.map((s) => (
                  <li key={s.name} className="group">
                    <a
                      aria-label={s.ariaLabel}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full relative block p-2.5 border border-white/20 overflow-hidden bg-white/5 transition-all duration-300 ease-in-out group-hover:scale-[0.95] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    >
                      <div className="w-5 h-5 flex items-center justify-center">
                        <img
                          alt={s.name}
                          loading="lazy"
                          width="20"
                          height="20"
                          className="w-full h-full object-contain group-hover:invert transition-all duration-300 ease-in-out"
                          style={{ color: 'transparent' }}
                          src={s.icon}
                        />
                      </div>
                      <div className="w-full h-full absolute inset-0 origin-center scale-0 group-hover:scale-100 bg-white rounded-full duration-300 ease-in-out -z-1" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex justify-between py-8 pt-12 text-lg text-white/70 max-md:flex-col max-md:gap-2 max-md:text-sm max-md:text-center max-md:py-6 max-md:pt-8">
          <p>© 2026 Yatin Joshi. All rights reserved.</p>
          <p className="text-white/50 text-sm">GTM Engineering • Revenue Automation • AI Workflows</p>
        </div>
      </div>
    </footer>
  );
}
