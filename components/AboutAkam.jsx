'use client';

import React from 'react';
import Link from 'next/link';
import { Sprout, ChefHat, Globe, Users, ChevronRight } from 'lucide-react';

const HIGHLIGHTS = [
  { icon: Sprout, line1: 'Fresh', line2: 'Ingredients' },
  { icon: ChefHat, line1: 'Skilled', line2: 'Chefs' },
  { icon: Globe, line1: 'Bespoke', line2: 'Catering' },
];

export default function AboutAkam() {
  return (
    <section id="about" className="section about-akam-section" data-section-fade>
      <div className="container">
        <div className="about-akam-grid">
          {/* Left: Rounded Editorial Image + Overlapping Orange Experience Badge */}
          <div className="about-media-wrap" data-reveal="right">
            <div className="about-photo-frame">
              <img
                src="/images/event-catering.jpg"
                alt="Akam Chops luxury small chops and catering presentation"
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className="about-orange-badge">
              <Users size={26} strokeWidth={2} />
              <strong>4+</strong>
              <span>
                Years of
                <br />
                Excellence
              </span>
            </div>
          </div>

          {/* Center: Editorial Story Copy + CTA (logo removed as requested) */}
          <div className="about-story-col" data-reveal="up" data-reveal-delay="80">
            <p className="about-kicker">WELCOME TO AKAM CHOPS</p>

            <h2 className="about-headline">
              Great Chops,
              <br />
              Good <span className="about-accent-word">Moments</span>
            </h2>

            <p className="about-body">
              At Akam Chops, we believe unforgettable gatherings start with bold flavor and fresh
              craft. From crispy samosas and airy puff-puff to loaded shawarma and chilled Akam
              Naturals, every platter is crafted from scratch to elevate every celebration.
            </p>

            <div style={{ marginTop: 6 }}>
              <Link href="/contact" className="about-dark-cta">
                BOOK AN EVENT
                <ChevronRight size={16} />
              </Link>
            </div>
          </div>

          {/* Right: 3 Stacked Circular Icon Highlights */}
          <div className="about-highlights-col" data-reveal="left" data-reveal-delay="140">
            {HIGHLIGHTS.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.line1} className="about-highlight-row">
                  <div className="about-highlight-circle">
                    <Icon size={24} strokeWidth={1.8} />
                  </div>
                  <div className="about-highlight-text">
                    <span>{item.line1}</span>
                    <span>{item.line2}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
