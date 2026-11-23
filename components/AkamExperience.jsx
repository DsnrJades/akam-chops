'use client';

import React, { useState } from 'react';
import {
  ArrowRight,
  Sparkles,
  Flame,
  PackageCheck,
  Clock,
  Check,
  Plus,
  Star,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Utensils,
} from 'lucide-react';
import Navbar from './Navbar.jsx';
import HeroScrollVideo from './HeroScrollVideo.jsx';
import AboutAkam from './AboutAkam.jsx';
import MenuShowcase from './MenuShowcase.jsx';
import WhyChooseUsVideo from './WhyChooseUsVideo.jsx';
import TiltCard3D from './TiltCard3D.jsx';
import EventInquiryForm from './EventInquiryForm.jsx';
import { useScrollReveal, useSmoothScroll } from '../hooks/useScrollReveal.js';
import { BRAND, NAV_LINKS, EVENT_TIERS, REVIEWS } from '../data/akamData.js';

const SECTION_IDS = NAV_LINKS.map((l) => l.id);

const MARQUEE_WORDS = [
  'Small Chops',
  'Signature Shawarma',
  'Peppered Grills',
  'Akam Naturals',
  'Nationwide Catering',
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

      {/* =================================================================
          1. FULL-BLEED 1080P SCROLL-SCRUBBED VIDEO HERO
         ================================================================= */}
      <HeroScrollVideo onScrollTo={scrollToSection} />

      {/* =================================================================
          EDITORIAL BRAND MARQUEE
         ================================================================= */}
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

      {/* =================================================================
          2. ABOUT AKAM CHOPS (Editorial 3-Column Welcome Section)
         ================================================================= */}
      <AboutAkam onScrollTo={scrollToSection} />

      {/* =================================================================
          3. CURATED FULL-BLEED PHOTO MENU SHOWCASE
         ================================================================= */}
      <MenuShowcase selectedItems={selectedItems} onToggleItem={toggleSelectItem} />

      {/* =================================================================
          4. WHY CHOOSE AKAM CHOPS (Full-Width Scroll-Scrubbed Video + Glass Cards)
         ================================================================= */}
      <WhyChooseUsVideo />

      {/* =================================================================
          3. EVENT CATERING PACKAGES + REVIEWS
         ================================================================= */}
      <section id="events" className="section">
        <div className="container">
          <div className="section-header section-header-center" data-reveal="up">
            <span className="eyebrow">
              <span className="eyebrow-dot" />
              Nationwide Event Catering
            </span>
            <h2 className="display-lg">
              Built to <span className="accent-text">Elevate</span> Every Occasion.
            </h2>
            <p className="section-lead">
              Weddings, corporate summits, birthdays, and galas — we scale our signature craft to
              celebrations across Nigeria without losing an ounce of crunch.
            </p>
          </div>

          <div className="events-banner" data-reveal="scale">
            <div className="events-banner-img">
              <img
                src="/images/event-catering.jpg"
                alt="Akam Chops luxury event catering spread"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="events-banner-body">
              <span className="eyebrow" style={{ alignSelf: 'flex-start' }}>
                Full-Service Hospitality
              </span>
              <h3 className="display-md">
                From Tiered Cocktail Platters to Individual VIP Guest Boxes.
              </h3>
              <p style={{ color: 'var(--ink-secondary)', fontSize: '0.96rem' }}>
                Pair our signature small chops with chilled Akam Naturals Zobo &amp; Tiger Nut Milk
                for a complete, memorable refreshment experience anywhere in Nigeria.
              </p>
              <div>
                <a href="#contact" className="btn btn-primary" onClick={(e) => handleAnchor(e, 'contact')}>
                  Plan Your Event Menu
                  <ArrowRight size={17} />
                </a>
              </div>
            </div>
          </div>

          <div className="tiers-grid">
            {EVENT_TIERS.map((tier, idx) => (
              <div key={tier.name} data-reveal="up" data-reveal-delay={idx * 100}>
                <TiltCard3D maxTilt={4}>
                  <article className={`tier-card ${tier.featured ? 'is-featured' : ''}`}>
                    <div>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          gap: 8,
                          marginBottom: 14,
                        }}
                      >
                        <span className="menu-tag">{tier.guests}</span>
                        {tier.featured && (
                          <span
                            style={{
                              fontSize: '0.75rem',
                              fontWeight: 800,
                              color: 'var(--orange-primary)',
                            }}
                          >
                            ★ MOST BOOKED
                          </span>
                        )}
                      </div>
                      <h3 className="display-md" style={{ marginBottom: 8 }}>
                        {tier.name}
                      </h3>
                      <p style={{ color: 'var(--ink-secondary)', fontSize: '0.93rem' }}>
                        {tier.desc}
                      </p>

                      <ul className="tier-list">
                        {tier.perks.map((perk) => (
                          <li key={perk}>
                            <Check size={16} />
                            <span>{perk}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      type="button"
                      className={`btn ${tier.featured ? 'btn-primary' : 'btn-secondary'}`}
                      style={{ width: '100%' }}
                      onClick={() => selectPackageAndScroll(`${tier.name} (${tier.guests})`)}
                    >
                      Request {tier.name} Quote
                      <ArrowRight size={16} />
                    </button>
                  </article>
                </TiltCard3D>
              </div>
            ))}
          </div>

          {/* Authentic Abuja Social Proof */}
          <div className="reviews-grid">
            {REVIEWS.map((rev, idx) => (
              <article
                key={rev.author}
                className="review-card"
                data-reveal="up"
                data-reveal-delay={idx * 90}
              >
                <div className="review-stars" aria-label="5 out of 5 stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="review-quote">“{rev.quote}”</p>
                <div className="review-author">
                  {rev.author} · {rev.context}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================================
          4. CONTACT & ZERO-BACKEND EVENT INQUIRY
         ================================================================= */}
      <section id="contact" className="section section-warm">
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
                  Visit our flagship kitchen for fresh daily orders, or send your event details from
                  anywhere in Nigeria — no complicated checkout, just fast human hospitality.
                </p>
              </div>

              <div className="contact-info-card">
                <div className="contact-detail-row">
                  <div className="contact-icon-box">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <strong>Flagship Kitchen · Nationwide Catering</strong>
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

      {/* =================================================================
          FOOTER
         ================================================================= */}
      <footer className="footer">
        <div className="container">
          <div className="footer-inner">
            <a href="#experience" className="nav-logo" aria-label="Akam Chops top" onClick={(e) => handleAnchor(e, 'experience')}>
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
            <span>Nationwide Event Catering · Flagship Kitchen: Mab Global Plaza, Jabi, Abuja</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

