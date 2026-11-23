'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Utensils, PackageCheck, Clock } from 'lucide-react';

const PILLARS = [
  {
    icon: Utensils,
    title: 'Crafted From Scratch Daily',
    desc: 'Hand-wrapped spring rolls, crisp golden samosas, airy puff-puff, and tender peppered proteins — never reheated, always made fresh.',
  },
  {
    icon: PackageCheck,
    title: 'Signature Premium Packaging',
    desc: 'Clean, heat-retaining Akam Chops kraft bags and event boxes — finished with our cutlery set and complimentary mint gum.',
  },
  {
    icon: Clock,
    title: 'Seamless Event Execution',
    desc: 'Whether hosting 40 executives or 1,000+ wedding guests, our team delivers right on schedule so you can enjoy every moment.',
  },
];

/**
 * Full-Width 1080p Scroll-Scrubbed Video "Why Choose Us" Section
 * - Untouched 1080p video scrubbed smoothly on scroll
 * - Staggered enter/exit animations on the headline & all 3 equal-sized glass cards
 */
export default function WhyChooseUsVideo() {
  const runwayRef = useRef(null);
  const videoRef = useRef(null);
  const [isEntered, setIsEntered] = useState(false);

  useEffect(() => {
    const runway = runwayRef.current;
    const video = videoRef.current;
    if (!runway || !video) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) setIsEntered(true);

    let duration = 0;
    let targetTime = 0;
    let currentTime = 0;
    let isInView = false;
    let rafId = null;
    let unlockedMobile = false;

    const handleLoadedMetadata = () => {
      duration = Number.isFinite(video.duration) && video.duration > 0 ? video.duration : 5;
      try {
        video.currentTime = 0.001;
      } catch {
        // ignore
      }
    };

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

      if (duration > 0 && !prefersReduced) {
        const progress = computeScrollProgress();
        targetTime = Math.min(duration - 0.04, Math.max(0.001, progress * (duration - 0.04)));
        currentTime += (targetTime - currentTime) * 0.14;

        if (!video.seeking && Math.abs(video.currentTime - currentTime) > 0.012) {
          try {
            video.currentTime = currentTime;
          } catch {
            // ignore
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
        setIsEntered(entry.isIntersecting);
        if (isInView) {
          startLoop();
        } else if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      },
      { threshold: 0.08 }
    );
    io.observe(runway);

    return () => {
      io.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      window.removeEventListener('touchstart', unlockVideoOnTouch);
    };
  }, []);

  return (
    <section ref={runwayRef} className={`why-video-runway ${isEntered ? 'is-entered' : ''}`}>
      <div className="why-sticky-stage">
        <video
          ref={videoRef}
          className="why-bg-video"
          src="/videos/why-choose-us.mp4#t=0.001"
          muted
          playsInline
          webkit-playsinline="true"
          preload="auto"
          disablePictureInPicture
          aria-hidden="true"
        />

        <div className="why-video-scrim" aria-hidden="true" />

        <div className="why-video-content container">
          <div className="why-header why-anim-item" style={{ '--why-delay': '40ms' }}>
            <span className="why-eyebrow">
              <span className="eyebrow-dot" />
              Why Choose Akam Chops
            </span>
            <h2 className="why-title">
              Bold Flavor. <span className="accent-text">Obsessive</span> Detail.
            </h2>
            <p className="why-lead">
              From intimate gatherings to grand reception halls, every platter is engineered to
              arrive crisp, aromatic, and camera-ready.
            </p>
          </div>

          <div className="why-glass-grid">
            {PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <article
                  key={pillar.title}
                  className="why-glass-card why-anim-item"
                  style={{ '--why-delay': `${160 + idx * 120}ms` }}
                >
                  <div className="why-glass-icon">
                    <Icon size={24} />
                  </div>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.desc}</p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
