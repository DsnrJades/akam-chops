'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';

/**
 * Viewport Scroll Reveal System (IntersectionObserver)
 */
export function useScrollReveal(deps = []) {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('[data-reveal]'));
    if (!elements.length) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || typeof IntersectionObserver === 'undefined') {
      elements.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const delay = el.getAttribute('data-reveal-delay');
            if (delay) {
              el.style.setProperty('--reveal-delay', `${delay}ms`);
            }
            el.classList.add('is-visible');
            observer.unobserve(el);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -36px 0px',
      }
    );

    elements.forEach((el) => {
      if (!el.classList.contains('is-visible')) {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, deps);
}

/**
 * Zero-Re-Render Smooth Scroll Engine:
 * - Navbar stays in hero glass mode until COMPLETELY scrolled past `#experience`
 * - Uses Lenis on desktop wheel/trackpad, and native buttery touch scrolling on mobile phones
 * - Reliable cross-device `scrollToSection(id)` for desktop & mobile browsers
 */
export function useSmoothScroll(sectionIds) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState(sectionIds[0] || '');

  const progressBarRef = useRef(null);
  const lenisRef = useRef(null);
  const isScrolledRef = useRef(false);
  const activeSectionRef = useRef(sectionIds[0] || '');

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchDevice =
      window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;

    let sectionOffsets = [];
    let maxScroll = 1;
    let heroExitY = window.innerHeight;

    const measureLayout = () => {
      maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const heroEl = document.getElementById('experience');
      if (heroEl) {
        // Only switch navbar after completely scrolling out of the hero runway
        heroExitY = Math.max(120, heroEl.offsetTop + heroEl.offsetHeight - 88);
      } else {
        heroExitY = window.innerHeight;
      }

      sectionOffsets = sectionIds
        .map((id) => {
          const el = document.getElementById(id);
          return el ? { id, top: el.offsetTop } : null;
        })
        .filter(Boolean);
    };

    const updateOnScroll = (y) => {
      if (progressBarRef.current) {
        const ratio = Math.min(1, Math.max(0, y / maxScroll));
        progressBarRef.current.style.transform = `scaleX(${ratio})`;
      }

      const scrolledPastHero = y >= heroExitY;
      if (scrolledPastHero !== isScrolledRef.current) {
        isScrolledRef.current = scrolledPastHero;
        setIsScrolled(scrolledPastHero);
      }

      const probe = y + 180;
      let current = sectionIds[0];
      for (let i = 0; i < sectionOffsets.length; i++) {
        if (sectionOffsets[i].top <= probe) {
          current = sectionOffsets[i].id;
        }
      }
      if (current !== activeSectionRef.current) {
        activeSectionRef.current = current;
        setActiveSection(current);
      }
    };

    measureLayout();
    updateOnScroll(window.scrollY);

    let rafId = null;
    let lenis = null;

    if (!prefersReduced && !isTouchDevice) {
      lenis = new Lenis({
        lerp: 0.095,
        duration: 1.05,
        smoothWheel: true,
        wheelMultiplier: 1,
      });
      lenisRef.current = lenis;

      lenis.on('scroll', ({ scroll }) => {
        updateOnScroll(scroll);
      });

      const raf = (time) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    } else {
      const onNativeScroll = () => updateOnScroll(window.scrollY);
      window.addEventListener('scroll', onNativeScroll, { passive: true });

      const resizeObserver = new ResizeObserver(() => measureLayout());
      resizeObserver.observe(document.body);
      window.addEventListener('resize', measureLayout, { passive: true });

      return () => {
        window.removeEventListener('scroll', onNativeScroll);
        resizeObserver.disconnect();
        window.removeEventListener('resize', measureLayout);
      };
    }

    const resizeObserver = new ResizeObserver(() => measureLayout());
    resizeObserver.observe(document.body);
    window.addEventListener('resize', measureLayout, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (lenis) lenis.destroy();
      lenisRef.current = null;
      resizeObserver.disconnect();
      window.removeEventListener('resize', measureLayout);
    };
  }, [sectionIds]);

  const scrollToSection = useCallback((id) => {
    const el = document.getElementById(id);
    if (!el) return;

    if (lenisRef.current) {
      lenisRef.current.scrollTo(el, { offset: -84, duration: 1.05 });
    } else {
      // Rock-solid smooth scroll for mobile Safari / Chrome
      const top = el.getBoundingClientRect().top + window.scrollY - 78;
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    }
  }, []);

  return { isScrolled, activeSection, progressBarRef, scrollToSection };
}
