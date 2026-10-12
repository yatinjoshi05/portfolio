import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
  useRef
} from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';

import { SOCIAL_LINKS, RESUME_DATA } from '../data/socialLinks';

const GetInTouchContext = createContext(null);

export function useGetInTouchModal() {
  const ctx = useContext(GetInTouchContext);
  if (!ctx) {
    throw new Error('useGetInTouchModal must be used within GetInTouchModalProvider');
  }
  return ctx;
}

const socialOptions = [
  {
    name: SOCIAL_LINKS.github.name,
    url: SOCIAL_LINKS.github.url,
    ariaLabel: SOCIAL_LINKS.github.ariaLabel,
    boxClass: 'git-icon-github',
    renderIcon: () => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" fill="#FFFFFF"/>
      </svg>
    )
  },
  {
    name: SOCIAL_LINKS.linkedin.name,
    url: SOCIAL_LINKS.linkedin.url,
    ariaLabel: SOCIAL_LINKS.linkedin.ariaLabel,
    boxClass: 'git-icon-linkedin',
    renderIcon: () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6C1.13 6 0.02 4.88 0.02 3.5C0.02 2.12 1.13 1 2.5 1C3.87 1 4.98 2.12 4.98 3.5ZM0.5 8H4.5V23H0.5V8ZM18.25 7.8C15.81 7.8 14.39 9.14 13.72 10.42H13.66V8.2H9.84V23H13.84V16.63C13.84 14.95 14.16 13.32 16.24 13.32C18.29 13.32 18.32 15.24 18.32 16.74V23H22.32V15.82C22.32 12.3 21.56 7.8 18.25 7.8Z" fill="#FFFFFF"/>
      </svg>
    )
  },
  {
    name: SOCIAL_LINKS.instagram.name,
    url: SOCIAL_LINKS.instagram.url,
    ariaLabel: SOCIAL_LINKS.instagram.ariaLabel,
    boxClass: 'git-icon-instagram',
    renderIcon: () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="20" height="20" rx="5.5" stroke="#FFFFFF" strokeWidth="2"/>
        <circle cx="12" cy="12" r="4.2" stroke="#FFFFFF" strokeWidth="2"/>
        <circle cx="18" cy="6" r="1.3" fill="#FFFFFF"/>
      </svg>
    )
  },
  {
    name: SOCIAL_LINKS.whatsapp.name,
    url: SOCIAL_LINKS.whatsapp.url,
    ariaLabel: SOCIAL_LINKS.whatsapp.ariaLabel,
    boxClass: 'git-icon-whatsapp',
    renderIcon: () => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.87 9.87 0 0 0 12.04 2zm5.79 14.28c-.24.69-1.22 1.28-1.76 1.35-.49.07-1.12.1-3.27-.79-2.75-1.14-4.52-3.92-4.66-4.1-.13-.19-1.12-1.49-1.12-2.84 0-1.35.71-2.02.96-2.29.25-.27.55-.34.73-.34.18 0 .37 0 .53.01.17.01.4.06.62.54.24.52.82 2.01.89 2.16.07.15.12.33.02.53-.1.19-.15.31-.3.49-.15.17-.31.39-.45.52-.15.14-.3.3-.13.6.17.29.76 1.25 1.63 2.02 1.12.99 2.06 1.3 2.35 1.45.29.14.46.12.63-.07.17-.2.74-.86.94-1.16.2-.29.4-.24.67-.14.27.1 1.73.82 2.03.97.29.15.49.22.56.34.07.12.07.72-.17 1.41z" fill="#FFFFFF"/>
      </svg>
    )
  }
];

export function GetInTouchModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isRendered, setIsRendered] = useState(false);

  const dialogRef = useRef(null);
  const backdropRef = useRef(null);
  const contentWrapperRef = useRef(null);
  const timelineRef = useRef(null);
  const previousFocusRef = useRef(null);

  const openModal = useCallback(() => {
    previousFocusRef.current = document.activeElement;
    setIsRendered(true);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  // GSAP animation matching reference with smooth scale & backdrop fade
  useEffect(() => {
    if (!isRendered) return;

    const backdrop = backdropRef.current;
    const content = contentWrapperRef.current;
    if (!backdrop || !content) return;

    timelineRef.current?.kill();
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const duration = isReduced ? 0.2 : isOpen ? 0.6 : 0.4;
    const ease = isReduced ? 'none' : isOpen ? 'power3.out' : 'power2.in';

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.__lenis?.stop();

      const tl = gsap.timeline();
      timelineRef.current = tl;

      tl.fromTo(backdrop, { opacity: 0 }, { opacity: 1, duration, ease }, 0).fromTo(
        content,
        { opacity: 0, scale: isReduced ? 1 : 0.88, y: isReduced ? 0 : 20 },
        { opacity: 1, scale: 1, y: 0, duration, ease },
        0
      );
    } else {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsRendered(false);
          document.body.style.overflow = '';
          window.__lenis?.start();
          previousFocusRef.current?.focus?.();
        }
      });
      timelineRef.current = tl;

      tl.to(backdrop, { opacity: 0, duration, ease }, 0).to(
        content,
        { opacity: 0, scale: isReduced ? 1 : 0.9, y: isReduced ? 0 : 15, duration, ease },
        0
      );
    }

    return () => {
      timelineRef.current?.kill();
    };
  }, [isOpen, isRendered]);

  // Auto-focus on open
  useEffect(() => {
    if (!isOpen || !isRendered) return;
    const timer = setTimeout(() => {
      const dialog = dialogRef.current;
      if (!dialog) return;
      const closeBtn = dialog.querySelector('.git-close-btn');
      if (closeBtn) {
        closeBtn.focus();
      } else {
        const first = dialog.querySelector('a[href], button:not([disabled])');
        first?.focus();
      }
    }, 80);
    return () => clearTimeout(timer);
  }, [isOpen, isRendered]);

  // Handle ESC and Tab trap
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeModal();
        return;
      }

      if (e.key === 'Tab') {
        const dialog = dialogRef.current;
        if (!dialog) return;
        const focusable = dialog.querySelectorAll(
          'button.git-close-btn, a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        const focusableArr = Array.from(focusable).filter(
          (el) => el.offsetParent !== null || el === document.activeElement
        );
        if (focusableArr.length === 0) {
          e.preventDefault();
          return;
        }

        const first = focusableArr[0];
        const last = focusableArr[focusableArr.length - 1];

        if (!dialog.contains(document.activeElement)) {
          e.preventDefault();
          first.focus();
          return;
        }

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeModal]);

  const value = useMemo(() => ({ openModal, closeModal, isOpen }), [openModal, closeModal, isOpen]);

  return (
    <GetInTouchContext.Provider value={value}>
      {children}
      {isRendered &&
        createPortal(
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="get-in-touch-modal-title"
            tabIndex={-1}
            data-lenis-prevent="true"
            className="git-modal-overlay"
          >
            {/* Backdrop: Clicking outside closes modal */}
            <div
              ref={backdropRef}
              aria-hidden="true"
              onClick={closeModal}
              className="git-modal-backdrop"
              style={{ opacity: 0 }}
            />

            {/* Modal Dialog Content */}
            <div
              ref={contentWrapperRef}
              className="git-modal-wrapper"
              style={{ opacity: 0, transform: 'scale(0.88)' }}
              onClick={(e) => {
                if (e.target === e.currentTarget) closeModal();
              }}
            >
              <div
                className="git-modal-card"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button with Signature Gradient & Rotating Cross */}
                <button
                  type="button"
                  onClick={closeModal}
                  aria-label="Close"
                  className="git-close-btn"
                >
                  <span className="git-close-cross-1" />
                  <span className="git-close-cross-2" />
                </button>

                {/* Two-Column Responsive Grid */}
                <div className="git-modal-grid">
                  {/* Left Column: Heading & Supporting Text */}
                  <div className="git-modal-left">
                    <div>
                      <h2
                        id="get-in-touch-modal-title"
                        className="git-modal-title"
                      >
                        Get in Touch
                      </h2>
                      <p className="git-modal-subtitle">
                        Let’s connect and talk about GTM engineering, AI automation, and smarter revenue systems.
                      </p>
                    </div>

                    {/* Subtle GTM availability badge */}
                    <div className="git-modal-status">
                      <span className="git-modal-status-dot" />
                      <span>Open for collaboration</span>
                    </div>
                  </div>

                  {/* Right Column: Connection Options & Resume */}
                  <div className="git-modal-right">
                    {/* 4 Social Connection Options in Exact Order */}
                    {socialOptions.map((item) => (
                      <a
                        key={item.name}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={item.ariaLabel}
                        className="git-social-card group"
                      >
                        <div className="git-card-left">
                          <div className={`git-social-icon-box ${item.boxClass}`}>
                            {item.renderIcon()}
                          </div>
                          <span className="git-social-label">
                            {item.name}
                          </span>
                        </div>

                        {/* Subtle interactive arrow indicator */}
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white/40 group-hover:text-white group-hover:bg-white/10 transition-all duration-300">
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          >
                            <path
                              d="M3 11L11 3M11 3H5M11 3V9"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </a>
                    ))}

                    {/* 5th Option: Resume (clearly distinguishable, uncluttered) */}
                    <a
                      href={RESUME_DATA.url}
                      download={RESUME_DATA.downloadFilename}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={RESUME_DATA.ariaLabel}
                      className="git-resume-card group mt-1"
                    >
                      <div className="git-card-left">
                        <div className="git-resume-icon-box">
                          {/* Authentic Document Icon */}
                          <svg
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="text-white"
                          >
                            <path
                              d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M14 2V8H20"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M16 13H8"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M16 17H8"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M10 9H9H8"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div className="flex flex-col min-w-0 pr-2">
                          <span className="text-base sm:text-lg font-semibold text-white tracking-wide">
                            Resume
                          </span>
                          <span className="text-xs sm:text-sm text-white/65 font-light mt-0.5">
                            View my professional experience and projects.
                          </span>
                        </div>
                      </div>

                      {/* Download indicator */}
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white/50 group-hover:text-white group-hover:bg-white/10 shrink-0 transition-all duration-300">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="transition-transform duration-300 group-hover:translate-y-0.5"
                        >
                          <path
                            d="M12 15V3M12 15L7 10M12 15L17 10M21 15V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V15"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </GetInTouchContext.Provider>
  );
}
