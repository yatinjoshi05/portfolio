import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitText from './SplitText';

gsap.registerPlugin(ScrollTrigger);

const clientLogos = [
  { src: '/media/gtm-stack/n8n.svg', alt: 'n8n logo' },
  { src: '/media/gtm-stack/supabase.svg', alt: 'Supabase logo' },
  { src: '/media/gtm-stack/hubspot.svg', alt: 'HubSpot logo' },
  { src: '/media/gtm-stack/clay.png', alt: 'Clay logo' },
  { src: '/media/gtm-stack/nvidia.svg', alt: 'NVIDIA logo' }
];

const allLogos = [...clientLogos, ...clientLogos];

export default function ClientBlur() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    const section = sectionRef.current;
    const grid = gridRef.current;
    if (!section || !grid) return;

    const items = Array.from(grid.querySelectorAll('.grid__item'));
    if (!items.length) return;

    const isDesktop = window.innerWidth > 1024;
    const durationIn = isDesktop ? 1.5 : 4;
    const durationOut = isDesktop ? 1.5 : 3.5;
    const staggerGroup = durationIn + 0.4;
    const itemDelay = isDesktop ? 0.4 : 0.5;

    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: section,
        start: 'top 20%',
        end: 'bottom center',
        scrub: true
      }
    });

    const groups = [];
    for (let i = 0; i < items.length; ) {
      const size = Math.min(items.length - i, gsap.utils.random(2, 3, 1));
      groups.push(Array.from({ length: size }, (_, r) => i + r));
      i += size;
    }

    groups.forEach((group, gIdx) => {
      const gOffset = gIdx * staggerGroup;
      group.forEach((itemIdx, iIdx) => {
        const item = items[itemIdx];
        const offset = gOffset + iIdx * itemDelay;

        gsap.set(item, {
          transformOrigin: '0% 0%',
          opacity: 0,
          x: isDesktop ? gsap.utils.random(-180, 180) : 0,
          y: gsap.utils.random(-180, 180),
          filter: 'blur(10px)',
          z: isDesktop ? gsap.utils.random(-2200, -1600) : gsap.utils.random(-550, -400)
        });

        tl.to(
          item,
          {
            z: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: durationIn
          },
          offset
        ).to(
          item,
          {
            filter: 'blur(10px)',
            opacity: 0,
            z: isDesktop ? gsap.utils.random(1400, 1800) : gsap.utils.random(500, 700),
            duration: durationOut
          },
          offset + durationIn
        );
      });
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="clientblur"
      className="relative w-screen h-[240vh] text-center z-2 bg-[#070707]"
    >
      <div className="sticky w-full top-0 h-screen flex items-center justify-center">
        <div className="w-3/5 max-lg:w-4/5">
          <SplitText>
            <h3 className="text-[5.5vw] text-white leading-[1.2] max-lg:text-[7vw] max-md:text-[8vw] font-normal">
              Powered by the Tools Behind Modern GTM Engineering
            </h3>
          </SplitText>
        </div>
      </div>

      <div className="left-0 sticky mt-[-100vh] top-0 z-20 h-screen w-screen overflow-hidden flex items-center justify-center pointer-events-none">
        <div
          ref={gridRef}
          className="grid grid-cols-5 gap-[3vw] perspective-[350vw] max-md:grid-cols-3 max-md:gap-[6vw]"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {allLogos.map((logo, idx) => (
            <div
              key={idx}
              className="grid__item flex h-[8vw] w-[14vw] items-center justify-center max-md:h-[22vw] max-md:w-[26vw] will-change-[transform,opacity,filter]"
              style={{ transformStyle: 'preserve-3d', contain: 'layout style' }}
            >
              <img
                src={logo.src}
                alt={logo.alt}
                loading="lazy"
                width="157"
                height="53"
                className="h-[4vw] w-full object-contain max-md:h-[11vw]"
                style={{ color: 'transparent' }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
