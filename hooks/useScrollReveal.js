'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';

/**
 * Viewport Scroll Reveal System (IntersectionObserver)
 * Releases `will-change` after reveal to keep GPU memory low and scroll silky smooth.
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
 * Zero-Re-Render Smooth Scroll Engine (Lenis + rAF GPU progress bar)
 * - Uses Lenis for buttery inertial scrolling on mouse wheel & trackpad
 * - Updates the top scroll progress bar directly via DOM `transform: scaleX()` (0 React re-renders!)
 * - Caches section offsets and only updates `isScrolled` / `activeSection` when they actually change
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

    let sectionOffsets = [];
    let maxScroll = 1;

    const measureLayout = () => {
      maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      sectionOffsets = sectionIds
        .map((id) => {
          const el = document.getElementById(id);
          return el ? { id, top: el.offsetTop } : null;
        })
        .filter(Boolean);
    };

    const updateOnScroll = (y) => {
      // 1. Direct GPU-composited progress bar update (no React re-render)
      if (progressBarRef.current) {
        const ratio = Math.min(1, Math.max(0, y / maxScroll));
        progressBarRef.current.style.transform = `scaleX(${ratio})`;
      }

      // 2. Glass navbar toggle only on threshold crossing
      const scrolledNow = y > 24;
      if (scrolledNow !== isScrolledRef.current) {
        isScrolledRef.current = scrolledNow;
        setIsScrolled(scrolledNow);
      }

      // 3. Active nav link update only when section changes
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

    if (!prefersReduced) {
      lenis = new Lenis({
        lerp: 0.095,
        duration: 1.05,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
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
      return () => window.removeEventListener('scroll', onNativeScroll);
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
      lenisRef.current.scrollTo(el, { offset: -84, duration: 1.1 });
    } else {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return { isScrolled, activeSection, progressBarRef, scrollToSection };
}
