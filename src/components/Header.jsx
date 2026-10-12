import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGetInTouchModal } from './GetInTouchModal';
import Button from './Button';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { openModal } = useGetInTouchModal();
  const headerRef = useRef(null);
  const lastScrollY = useRef(0);
  const isHidden = useRef(false);
  const prefersReduced = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    prefersReduced.current = mq.matches;
    const handler = (e) => {
      prefersReduced.current = e.matches;
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 0.4 * window.innerHeight);

      if (!prefersReduced.current && headerRef.current) {
        const delta = scrollY - lastScrollY.current;
        if (delta > 0 && scrollY > 0 && !isHidden.current) {
          isHidden.current = true;
          gsap.to(headerRef.current, { yPercent: -100, duration: 0.5, ease: 'power3.out' });
        } else if (delta < 0 && isHidden.current) {
          isHidden.current = false;
          gsap.to(headerRef.current, { yPercent: 0, duration: 0.5, ease: 'power3.out' });
        }
      }
      lastScrollY.current = scrollY;
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      ref={headerRef}
      id="header"
      className={`w-screen h-fit py-[1.5vw] flex items-center justify-between px-[4vw] fixed inset-0 z-99 opacity-0 transition-[backdrop-filter] duration-500 ease-out max-[1025px]:py-[3vw] max-[1025px]:px-[5vw] max-md:py-4 ${
        isScrolled ? 'backdrop-blur-lg' : 'backdrop-blur-none'
      }`}
    >
      <a href="/" className="block" id="header-logo">
        <img
          src="/_next/static/media/yatin-joshi.svg"
          alt="YATIN JOSHI"
          className="w-[12vw] max-[1025px]:w-[25vw] max-md:w-[34vw] h-auto object-contain"
        />
      </a>
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
    </header>
  );
}
