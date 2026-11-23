'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from './Navbar.jsx';
import HeroScrollVideo from './HeroScrollVideo.jsx';
import AboutAkam from './AboutAkam.jsx';
import MenuShowcase from './MenuShowcase.jsx';
import WhyChooseUsVideo from './WhyChooseUsVideo.jsx';
import EventsSection from './EventsSection.jsx';
import TestimonialsSection from './TestimonialsSection.jsx';
import PreFooterCta from './PreFooterCta.jsx';
import Footer from './Footer.jsx';
import { useScrollReveal, useSmoothScroll } from '../hooks/useScrollReveal.js';

const HOME_SECTION_IDS = ['experience', 'menu', 'events'];

const MARQUEE_WORDS = [
  'Small Chops',
  'Signature Shawarma',
  'Peppered Grills',
  'Akam Naturals',
  'Bespoke Event Catering',
  'Crafted Fresh Daily',
  'The Taste You Deserve',
];

export default function AkamExperience() {
  const router = useRouter();
  const [selectedItems, setSelectedItems] = useState([]);

  const { isScrolled, activeSection, progressBarRef, scrollToSection } =
    useSmoothScroll(HOME_SECTION_IDS);
  useScrollReveal([]);

  useEffect(() => {
    try {
      const saved = window.sessionStorage.getItem('akam_selected_items');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setSelectedItems(parsed);
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  const persistItems = (items) => {
    try {
      window.sessionStorage.setItem('akam_selected_items', JSON.stringify(items));
    } catch {
      // ignore
    }
  };

  const toggleSelectItem = (itemName) => {
    setSelectedItems((prev) => {
      const next = prev.includes(itemName)
        ? prev.filter((i) => i !== itemName)
        : [...prev, itemName];
      persistItems(next);
      return next;
    });
  };

  const selectPackageAndGoToContact = (packageName) => {
    setSelectedItems((prev) => {
      const next = prev.includes(packageName) ? prev : [...prev, packageName];
      persistItems(next);
      return next;
    });
    router.push('/contact');
  };

  return (
    <div className="akam-app">
      <Navbar
        isScrolled={isScrolled}
        activeSection={activeSection}
        progressBarRef={progressBarRef}
        onScrollTo={scrollToSection}
      />

      {/* 1. FULL-BLEED 1080P SCROLL-SCRUBBED VIDEO HERO */}
      <HeroScrollVideo onScrollTo={scrollToSection} />

      {/* EDITORIAL BRAND MARQUEE */}
      <div className="marquee-strip" aria-hidden="true">
        <div className="marquee-track">
          {[...MARQUEE_WORDS, ...MARQUEE_WORDS].map((word, idx) => (
            <span key={idx} className="marquee-item">
              {word}
              <span className="marquee-sep" />
            </span>
          ))}
        </div>
      </div>

      {/* 2. ABOUT AKAM CHOPS */}
      <AboutAkam />

      {/* 3. CURATED FULL-BLEED PHOTO MENU SHOWCASE */}
      <MenuShowcase selectedItems={selectedItems} onToggleItem={toggleSelectItem} />

      {/* 4. WHY CHOOSE AKAM CHOPS (Full-Width Scroll-Scrubbed Video + Animated Glass Cards) */}
      <WhyChooseUsVideo />

      {/* 5. REDESIGNED EVENTS CATERING SECTION (Equal-Sized Cards) */}
      <EventsSection onSelectPackage={selectPackageAndGoToContact} />

      {/* 6. STANDALONE TESTIMONIALS SECTION */}
      <TestimonialsSection />

      {/* 7. PRE-FOOTER CTA BANNER */}
      <PreFooterCta />

      {/* 8. SHARED DARK ESPRESSO FOOTER */}
      <Footer />
    </div>
  );
}
