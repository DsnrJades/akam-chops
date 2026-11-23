'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Star, Instagram, MessageCircle, ChevronDown } from 'lucide-react';
import { BRAND } from '../data/akamData.js';

/**
 * Full-Bleed 1080p Scroll-Scrubbed Video Hero
 * - Leaves upper/center frame open for the untouched 1080p exploding samosa -> steaming platter video
 * - Positions "THE TASTE YOU DESERVE." directly above the bottom buttons
 * - Floats two equal-sized metrics glass cards symmetrically on both sides of the headline
 * - Staggered entrance animations for all hero elements on landing
 */
export default function HeroScrollVideo({ onScrollTo }) {
  const runwayRef = useRef(null);
  const videoRef = useRef(null);
  const headlineRef = useRef(null);
  const progressFillRef = useRef(null);
  const [scrollHintHidden, setScrollHintHidden] = useState(false);

  useEffect(() => {
    const runway = runwayRef.current;
    const video = videoRef.current;
    if (!runway || !video) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let duration = 0;
    let targetTime = 0;
    let currentTime = 0;
    let isInView = true;
    let rafId = null;
    let hintHidden = false;
    let unlockedMobile = false;

    const handleLoadedMetadata = () => {
      duration = Number.isFinite(video.duration) && video.duration > 0 ? video.duration : 4;
      try {
        video.currentTime = 0.001;
      } catch {
        // ignore if not yet seekable
      }
    };

    // Mobile iOS/Android decoder warm-up on first touch so scrubbing works smoothly on phones
    const unlockVideoOnTouch = () => {
      if (unlockedMobile) return;
      unlockedMobile = true;
      const playPromise = video.play();
      if (playPromise && typeof playPromise.then === 'function') {
        playPromise
          .then(() => {
            video.pause();
          })
          .catch(() => {});
      }
    };

    if (video.readyState >= 1) {
      handleLoadedMetadata();
    } else {
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
    }

    video.load();
    window.addEventListener('touchstart', unlockVideoOnTouch, { passive: true, once: true });

    const computeScrollProgress = () => {
      const rect = runway.getBoundingClientRect();
      const scrollable = Math.max(1, runway.offsetHeight - window.innerHeight);
      const scrolled = Math.min(scrollable, Math.max(0, -rect.top));
      return scrolled / scrollable;
    };

    const tick = () => {
      if (!isInView) {
        rafId = null;
        return;
      }
      rafId = requestAnimationFrame(tick);

      const progress = computeScrollProgress();

      if (progressFillRef.current) {
        progressFillRef.current.style.transform = `scaleX(${progress})`;
      }

      const shouldHideHint = progress > 0.22;
      if (shouldHideHint !== hintHidden) {
        hintHidden = shouldHideHint;
        setScrollHintHidden(shouldHideHint);
      }

      if (headlineRef.current && !prefersReduced) {
        const yLift = progress * -18;
        headlineRef.current.style.transform = `translate3d(0, ${yLift.toFixed(1)}px, 0)`;
      }

      if (duration > 0 && !prefersReduced) {
        targetTime = Math.min(duration - 0.04, Math.max(0.001, progress * (duration - 0.04)));
        currentTime += (targetTime - currentTime) * 0.14;

        if (!video.seeking && Math.abs(video.currentTime - currentTime) > 0.012) {
          try {
            video.currentTime = currentTime;
          } catch {
            // ignore transient seek error
          }
        }
      }
    };

    const startLoop = () => {
      if (!rafId && isInView) {
        rafId = requestAnimationFrame(tick);
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        isInView = entry.isIntersecting;
        if (isInView) {
          startLoop();
        } else if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      },
      { threshold: 0.01 }
    );
    io.observe(runway);
    startLoop();

    return () => {
      io.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      window.removeEventListener('touchstart', unlockVideoOnTouch);
    };
  }, []);

  const handleCtaClick = (e, id) => {
    e.preventDefault();
    if (onScrollTo) onScrollTo(id);
  };

  const whatsappUrl = `https://wa.me/${BRAND.whatsappNumber}?text=${encodeURIComponent(
    'Hello Akam Chops! I would like to inquire about event catering.'
  )}`;

  return (
    <section id="experience" ref={runwayRef} className="hero-scroll-runway">
      <div className="hero-sticky-stage">
        {/* Untouched 1080p Scroll-Scrubbed Video Layer */}
        <video
          ref={videoRef}
          className="hero-bg-video"
          src="/videos/hero-samosa.mp4#t=0.001"
          muted
          playsInline
          webkit-playsinline="true"
          preload="auto"
          disablePictureInPicture
          aria-hidden="true"
        />

        <div className="hero-video-scrim" aria-hidden="true" />

        {/* Lower-Anchored Editorial Poster Overlay */}
        <div className="hero-poster-content container">
          {/* Symmetrical Lower Centerpiece: [Left Metric] [THE TASTE YOU DESERVE.] [Right Metric] */}
          <div className="hero-centerpiece">
            <div className="hero-side-stat hero-appear" style={{ '--appear-delay': '260ms' }}>
              <div className="hero-rating-num">4.9</div>
              <div className="hero-rating-stars" aria-label="4.9 out of 5 stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>
              <span className="hero-stat-label">Customer Rating</span>
            </div>

            <div
              ref={headlineRef}
              className="hero-poster-header hero-appear"
              style={{ '--appear-delay': '100ms' }}
            >
              <p className="hero-poster-kicker">THE TASTE YOU</p>
              <h1 className="hero-poster-title">DESERVE.</h1>
            </div>

            <div className="hero-side-stat hero-appear" style={{ '--appear-delay': '260ms' }}>
              <div className="hero-rating-num">5K+</div>
              <div className="hero-avatar-stack" aria-hidden="true">
                <span>AC</span>
                <span>VIP</span>
                <span>★</span>
              </div>
              <span className="hero-stat-label">Happy Guests</span>
            </div>
          </div>

          {/* Bottom Bar directly beneath the headline */}
          <div className="hero-poster-footer">
            <div className="hero-social-block hero-appear" style={{ '--appear-delay': '380ms' }}>
              <span className="hero-social-label">Get in Touch</span>
              <div className="hero-social-pills">
                <a
                  href={BRAND.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hero-icon-pill"
                  aria-label="Akam Chops Instagram"
                >
                  <Instagram size={17} />
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hero-icon-pill"
                  aria-label="Chat on WhatsApp"
                >
                  <MessageCircle size={17} />
                </a>
              </div>
            </div>

            <div
              className={`hero-scroll-cue hero-appear ${scrollHintHidden ? 'is-hidden' : ''}`}
              style={{ '--appear-delay': '460ms' }}
            >
              <span>Scroll to experience</span>
              <ChevronDown size={15} />
              <div className="hero-scrub-track">
                <div ref={progressFillRef} className="hero-scrub-fill" />
              </div>
            </div>

            <div className="hero-footer-cta hero-appear" style={{ '--appear-delay': '380ms' }}>
              <a
                href="#contact"
                className="hero-white-cta"
                onClick={(e) => handleCtaClick(e, 'contact')}
              >
                Request Event Quote
                <span className="hero-white-cta-icon">
                  <ArrowRight size={16} />
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
