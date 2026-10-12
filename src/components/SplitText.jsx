import React, { useRef, useEffect, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SplitText({
  children,
  stagger = 0.015,
  className = '',
  splitBy = 'chars',
  animateOnScroll = true,
  start = true,
  delay = 0,
  duration = 0.5
}) {
  const containerRef = useRef(null);
  const charsRef = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !start) return;

    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const chars = charsRef.current.filter(Boolean);

    if (isReduced || !chars.length) {
      gsap.set(container, { opacity: 1 });
      gsap.set(chars, { yPercent: 0, opacity: 1 });
      return;
    }

    gsap.set(container, { opacity: 1 });
    gsap.set(chars, { yPercent: 100, opacity: 0 });

    const animConfig = {
      yPercent: 0,
      opacity: 1,
      duration: duration,
      stagger: splitBy === 'lines' ? 0.1 : stagger,
      ease: 'power3.out',
      delay: delay
    };

    let anim;
    if (animateOnScroll) {
      anim = gsap.to(chars, {
        ...animConfig,
        scrollTrigger: {
          trigger: container,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    } else {
      anim = gsap.to(chars, animConfig);
    }

    return () => {
      anim?.scrollTrigger?.kill();
      anim?.kill();
    };
  }, [start, splitBy, stagger, delay, duration, animateOnScroll]);

  charsRef.current = [];

  const content = useMemo(() => {
    const renderSplits = (node, keyPrefix = '') => {
      if (typeof node === 'string') {
        if (splitBy === 'lines') {
          const lines = node.split('\n');
          return lines.map((line, lIdx) => (
            <span key={`${keyPrefix}-l-${lIdx}`} className="block overflow-hidden">
              <span
                ref={(el) => {
                  if (el) charsRef.current.push(el);
                }}
                className="inline-block will-change-transform"
              >
                {line}
              </span>
            </span>
          ));
        }

        const words = node.split(' ');
        return words.map((word, wIdx) => (
          <span key={`${keyPrefix}-w-${wIdx}`} className="inline-block whitespace-nowrap">
            {[...word].map((char, cIdx) => (
              <span
                key={`${keyPrefix}-c-${wIdx}-${cIdx}`}
                className="inline-block overflow-hidden"
                style={{ verticalAlign: 'top' }}
              >
                <span
                  ref={(el) => {
                    if (el) charsRef.current.push(el);
                  }}
                  className="inline-block will-change-transform"
                >
                  {char}
                </span>
              </span>
            ))}
            {wIdx < words.length - 1 && <span className="inline-block">&nbsp;</span>}
          </span>
        ));
      }

      if (React.isValidElement(node)) {
        if (node.type === 'br') {
          return <br key={keyPrefix} />;
        }
        const processedChildren = React.Children.map(node.props.children, (child, cIdx) =>
          renderSplits(child, `${keyPrefix}-${cIdx}`)
        );
        return React.cloneElement(node, { key: keyPrefix }, processedChildren);
      }

      return node;
    };

    return React.Children.map(children, (child, idx) => renderSplits(child, `root-${idx}`));
  }, [children, splitBy]);

  return (
    <div
      ref={containerRef}
      data-copy-wrapper="true"
      className={`opacity-0 ${className}`}
      style={{ willChange: 'transform, opacity' }}
    >
      {content}
    </div>
  );
}
