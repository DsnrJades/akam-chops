'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Star, Instagram, MessageCircle, ChevronDown } from 'lucide-react';
import { BRAND } from '../data/akamData.js';

/**
 * Full-Bleed 1080p Scroll-Scrubbed Video Hero
 * - Plays original untouched 1080p video (`/videos/hero-samosa.mp4`) scrubbed smoothly by scroll
 * - Editorial poster layout inspired by bold full-width centered display typography
 * - Auto-pauses rAF loop when scrolled past the hero so the rest of the page stays 120fps
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

    const handleLoadedMetadata = () => {
      duration = Number.isFinite(video.duration) && video.duration > 0 ? video.duration : 4;
      // Decode and paint the very first frame immediately
      try {
        video.currentTime = 0.001;
      } catch {
        // ignore if not seekable yet
      }
    };

    if (video.readyState >= 1) {
      handleLoadedMetadata();
    } else {
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
    }

    // Trigger warm decode so mobile/Safari & Chromium keep frames ready to scrub
    video.load();

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

      // Update subtle bottom micro-progress bar directly on GPU
      if (progressFillRef.current) {
        progressFillRef.current.style.transform = `scaleX(${progress})`;
      }

      // Fade out scroll hint once user starts scrubbing deep into the platter reveal
      const shouldHideHint = progress > 0.22;
      if (shouldHideHint !== hintHidden) {
        hintHidden = shouldHideHint;
        setScrollHintHidden(shouldHideHint);
      }

      // Subtle editorial parallax lift on the giant display headline
      if (headlineRef.current && !prefersReduced) {
        const yLift = progress * -26;
        const scale = 1 - progress * 0.04;
        headlineRef.current.style.transform = `translate3d(0, ${yLift.toFixed(1)}px, 0) scale(${scale.toFixed(4)})`;
      }

      if (duration > 0 && !prefersReduced) {
        // Clamp slightly shy of exact end so final steaming platter frame stays crisp
        targetTime = Math.min(duration - 0.04, Math.max(0.001, progress * (duration - 0.04)));
        currentTime += (targetTime - currentTime) * 0.14;

        if (!video.seeking && Math.abs(video.currentTime - currentTime) > 0.012) {
          try {
            video.currentTime = currentTime;
          } catch {
            // ignore transient seek errors while buffering
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
          src="/videos/hero-samosa.mp4"
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          aria-hidden="true"
        />

        {/* Subtle radial & edge vignette so white poster typography stays razor-sharp */}
        <div className="hero-video-scrim" aria-hidden="true" />

        {/* Editorial Poster Overlay matching inspiration layout */}
        <div className="hero-poster-content container">
          {/* Top Centered Stacked Display Headline */}
          <div ref={headlineRef} className="hero-poster-header">
            <p className="hero-poster-kicker">THE TASTE YOU</p>
            <h1 className="hero-poster-title">DESERVE.</h1>
          </div>

          {/* Middle Left & Right Trust / Social Proof Anchors */}
          <div className="hero-poster-sides">
            <div className="hero-side-stat hero-side-left">
              <div className="hero-rating-num">4.9</div>
              <div className="hero-rating-stars" aria-label="4.9 out of 5 stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} fill="currentColor" />
                ))}
              </div>
              <span className="hero-stat-label">Customer Rating</span>
            </div>

            <div className="hero-side-stat hero-side-right">
              <div className="hero-rating-num">5K+</div>
              <div className="hero-avatar-stack" aria-hidden="true">
                <span>AC</span>
                <span>NG</span>
                <span>★</span>
              </div>
              <span className="hero-stat-label">Happy Guests Nationwide</span>
            </div>
          </div>

          {/* Bottom Bar: Left Social Quick-Links, Center Scroll Cue, Right White Pill CTA */}
          <div className="hero-poster-footer">
            <div className="hero-social-block">
              <span className="hero-social-label">Get in Touch · Nationwide</span>
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

            <div className={`hero-scroll-cue ${scrollHintHidden ? 'is-hidden' : ''}`}>
              <span>Scroll to experience</span>
              <ChevronDown size={15} />
              <div className="hero-scrub-track">
                <div ref={progressFillRef} className="hero-scrub-fill" />
              </div>
            </div>

            <div className="hero-footer-cta">
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
