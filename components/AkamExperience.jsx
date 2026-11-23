'use client';

import React, { useState } from 'react';
import { MapPin, Phone, Mail, Instagram } from 'lucide-react';
import Navbar from './Navbar.jsx';
import HeroScrollVideo from './HeroScrollVideo.jsx';
import AboutAkam from './AboutAkam.jsx';
import MenuShowcase from './MenuShowcase.jsx';
import WhyChooseUsVideo from './WhyChooseUsVideo.jsx';
import EventsSection from './EventsSection.jsx';
import TestimonialsSection from './TestimonialsSection.jsx';
import EventInquiryForm from './EventInquiryForm.jsx';
import { useScrollReveal, useSmoothScroll } from '../hooks/useScrollReveal.js';
import { BRAND, NAV_LINKS } from '../data/akamData.js';

const SECTION_IDS = NAV_LINKS.map((l) => l.id);

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
  const [selectedItems, setSelectedItems] = useState([]);

  const { isScrolled, activeSection, progressBarRef, scrollToSection } = useSmoothScroll(SECTION_IDS);
  useScrollReveal([]);

  const toggleSelectItem = (itemName) => {
    setSelectedItems((prev) =>
      prev.includes(itemName) ? prev.filter((i) => i !== itemName) : [...prev, itemName]
    );
  };

  const selectPackageAndScroll = (packageName) => {
    setSelectedItems((prev) => (prev.includes(packageName) ? prev : [...prev, packageName]));
    scrollToSection('contact');
  };

  const handleAnchor = (e, id) => {
    e.preventDefault();
    scrollToSection(id);
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
      <AboutAkam onScrollTo={scrollToSection} />

      {/* 3. CURATED FULL-BLEED PHOTO MENU SHOWCASE */}
      <MenuShowcase selectedItems={selectedItems} onToggleItem={toggleSelectItem} />

      {/* 4. WHY CHOOSE AKAM CHOPS (Full-Width Scroll-Scrubbed Video + Animated Glass Cards) */}
      <WhyChooseUsVideo />

      {/* 5. REDESIGNED EVENTS CATERING SECTION (Equal-Sized Cards) */}
      <EventsSection onSelectPackage={selectPackageAndScroll} onScrollTo={scrollToSection} />

      {/* 6. STANDALONE TESTIMONIALS SECTION */}
      <TestimonialsSection />

      {/* 7. CONTACT & ZERO-BACKEND EVENT INQUIRY */}
      <section id="contact" className="section section-warm" data-section-fade>
        <div className="container">
          <div className="contact-grid">
            <div data-reveal="right">
              <div className="section-header" style={{ marginBottom: 28 }}>
                <span className="eyebrow">
                  <span className="eyebrow-dot" />
                  Visit or Book Us
                </span>
                <h2 className="display-lg">
                  Let’s Feed Your <span className="accent-text">Next Event.</span>
                </h2>
                <p className="section-lead">
                  Visit our flagship kitchen for fresh daily orders, or send your event details
                  below — no complicated checkout, just fast human hospitality.
                </p>
              </div>

              <div className="contact-info-card">
                <div className="contact-detail-row">
                  <div className="contact-icon-box">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <strong>Flagship Kitchen · Event Catering</strong>
                    <span>{BRAND.address}</span>
                  </div>
                </div>

                <div className="contact-detail-row">
                  <div className="contact-icon-box">
                    <Phone size={20} />
                  </div>
                  <div>
                    <strong>Call or WhatsApp</strong>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      {BRAND.phones.map((phone) => (
                        <a key={phone} href={`tel:${phone.replace(/\s+/g, '')}`}>
                          {phone}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="contact-detail-row">
                  <div className="contact-icon-box">
                    <Mail size={20} />
                  </div>
                  <div>
                    <strong>Email Inquiries</strong>
                    <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
                  </div>
                </div>

                <div className="contact-detail-row">
                  <div className="contact-icon-box">
                    <Instagram size={20} />
                  </div>
                  <div>
                    <strong>Follow the Crunch</strong>
                    <a href={BRAND.instagramUrl} target="_blank" rel="noreferrer">
                      {BRAND.handle} on Instagram · {BRAND.tiktok} on TikTok
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <EventInquiryForm
              selectedItems={selectedItems}
              onRemoveItem={(item) =>
                setSelectedItems((prev) => prev.filter((existing) => existing !== item))
              }
              onClearItems={() => setSelectedItems([])}
            />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="footer-inner">
            <a
              href="#experience"
              className="nav-logo"
              aria-label="Akam Chops top"
              onClick={(e) => handleAnchor(e, 'experience')}
            >
              <img src="/images/akam-logo.png" alt="Akam Chops" />
            </a>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, fontWeight: 600 }}>
              {NAV_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  style={{ color: 'var(--ink-secondary)' }}
                  onClick={(e) => handleAnchor(e, link.id)}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="footer-bottom">
            <span>
              © {new Date().getFullYear()} {BRAND.name} — {BRAND.tagline}.
            </span>
            <span>Premium Small Chops, Shawarma &amp; Bespoke Event Catering</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
