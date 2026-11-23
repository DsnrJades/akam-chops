'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';

/**
 * Bi-Directional Scroll Reveal + Section-to-Section Cross-Fade Engine
 * - `[data-reveal]` elements animate smoothly as they enter the viewport (and reverse cleanly if tagged `data-reveal-repeat`)
 * - `[data-section-fade]` sections smoothly cross-fade out as they exit and fade in as the next enters —
 *   and smoothly reverse when scrolling back up!
 */
export function useScrollReveal(deps = []) {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealEls = Array.from(document.querySelectorAll('[data-reveal]'));
    const fadeSections = Array.from(document.querySelectorAll('[data-section-fade]'));

    if (prefersReduced || typeof IntersectionObserver === 'undefined') {
      revealEls.forEach((el) => el.classList.add('is-visible'));
      fadeSections.forEach((sec) => {
        sec.style.opacity = '1';
        sec.style.transform = 'none';
      });
      return;
    }

    // 1. Element-level reveal observer (supports repeat on sections like Why Choose Us)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target;
          const repeat = el.hasAttribute('data-reveal-repeat');
          if (entry.isIntersecting) {
            const delay = el.getAttribute('data-reveal-delay');
            if (delay) {
              el.style.setProperty('--reveal-delay', `${delay}ms`);
            }
            el.classList.add('is-visible');
            if (!repeat) observer.unobserve(el);
          } else if (repeat) {
            el.classList.remove('is-visible');
          }
        });
      },
      {
        threshold: 0.04,
        rootMargin: '40px 0px 40px 0px',
      }
    );

    revealEls.forEach((el) => observer.observe(el));

    // 2. Continuous bi-directional section-to-section cross-fade (GPU opacity + transform)
    let rafId = null;

    const updateSectionFades = () => {
      rafId = null;
      const vh = window.innerHeight || 800;

      for (let i = 0; i < fadeSections.length; i++) {
        const sec = fadeSections[i];
        const rect = sec.getBoundingClientRect();

        // Entering from bottom: rect.top moves from vh -> vh * 0.62
        let enterFactor = 1;
        if (rect.top > vh * 0.58) {
          const t = (vh - rect.top) / (vh * 0.42);
          enterFactor = Math.min(1, Math.max(0, t));
        }

        // Exiting out top: rect.bottom moves from vh * 0.42 -> 0
        let exitFactor = 1;
        if (rect.bottom < vh * 0.42) {
          const t = rect.bottom / (vh * 0.42);
          exitFactor = Math.min(1, Math.max(0, t));
        }

        const visibility = Math.min(enterFactor, exitFactor);
        // Smooth ease curve so fade feels cinematic in both directions
        const eased = visibility * visibility * (3 - 2 * visibility);
        const opacity = 0.14 + eased * 0.86;
        const yOffset =
          enterFactor < 1
            ? (1 - eased) * 28
            : exitFactor < 1
              ? -(1 - eased) * 20
              : 0;
        const scale = 0.985 + eased * 0.015;

        sec.style.opacity = opacity.toFixed(3);
        sec.style.transform = `translate3d(0, ${yOffset.toFixed(1)}px, 0) scale(${scale.toFixed(4)})`;
      }
    };

    const scheduleFade = () => {
      if (!rafId) {
        rafId = requestAnimationFrame(updateSectionFades);
      }
    };

    updateSectionFades();
    window.addEventListener('scroll', scheduleFade, { passive: true });
    window.addEventListener('resize', scheduleFade, { passive: true });

    return () => {
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', scheduleFade);
      window.removeEventListener('resize', scheduleFade);
    };
  }, deps);
}

/**
 * Zero-Re-Render Smooth Scroll Engine:
 * - Navbar stays in hero glass mode until COMPLETELY scrolled past `#experience`
 * - Uses Lenis on desktop wheel/trackpad, native smooth scrolling on touch devices
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

      const resizeObserver =
        typeof ResizeObserver !== 'undefined' ? new ResizeObserver(() => measureLayout()) : null;
      if (resizeObserver) resizeObserver.observe(document.body);
      window.addEventListener('resize', measureLayout, { passive: true });

      return () => {
        window.removeEventListener('scroll', onNativeScroll);
        if (resizeObserver) resizeObserver.disconnect();
        window.removeEventListener('resize', measureLayout);
      };
    }

    const resizeObserver =
      typeof ResizeObserver !== 'undefined' ? new ResizeObserver(() => measureLayout()) : null;
    if (resizeObserver) resizeObserver.observe(document.body);
    window.addEventListener('resize', measureLayout, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (lenis) lenis.destroy();
      lenisRef.current = null;
      if (resizeObserver) resizeObserver.disconnect();
      window.removeEventListener('resize', measureLayout);
    };
  }, [sectionIds]);

  const scrollToSection = useCallback((id) => {
    const el = document.getElementById(id);
    if (!el) return;

    if (lenisRef.current) {
      lenisRef.current.scrollTo(el, { offset: -16, duration: 1.05 });
    } else {
      const top = el.getBoundingClientRect().top + window.scrollY - 16;
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    }
  }, []);

  return { isScrolled, activeSection, progressBarRef, scrollToSection };
}
