'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Check, Sparkles } from 'lucide-react';
import { EVENT_TIERS } from '../data/akamData.js';

export default function EventsSection({ onSelectPackage }) {
  return (
    <section id="events" className="section events-editorial-section" data-section-fade>
      <div className="container">
        {/* Top Editorial Header */}
        <div className="events-editorial-header" data-reveal="up">
          <div>
            <p className="menu-kicker">EVENT CATERING</p>
            <h2 className="display-lg">
              Built to <span className="accent-text">Elevate</span> Every Occasion.
            </h2>
          </div>
          <p className="events-header-sub">
            Weddings, corporate summits, birthdays, and galas — we scale our signature craft to any
            guest count without losing an ounce of crunch.
          </p>
        </div>

        {/* Full-Width Split Editorial Banner */}
        <div className="events-feature-banner" data-reveal="scale">
          <div className="events-feature-photo">
            <img
              src="/images/event-catering.jpg"
              alt="Akam Chops luxury event catering spread"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="events-feature-copy">
            <span className="events-pill-tag">
              <Sparkles size={14} /> Full-Service Hospitality
            </span>
            <h3 className="display-md">
              From Tiered Cocktail Platters to Individual VIP Guest Boxes.
            </h3>
            <p>
              Pair our signature small chops with chilled Akam Naturals Zobo &amp; Tiger Nut Milk
              for a complete, memorable refreshment experience for every guest.
            </p>
            <div>
              <Link href="/contact" className="btn btn-primary">
                Plan Your Event Menu
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </div>

        {/* 3 Equal-Sized Nested Event Type Cards (inspired by A/B inset-header card system) */}
        <div className="events-equal-grid">
          {EVENT_TIERS.map((tier, idx) => (
            <article
              key={tier.name}
              className={`event-tier-shell ${tier.featured ? 'is-featured' : ''}`}
              data-reveal="up"
              data-reveal-delay={idx * 90}
            >
              {/* Top Inset Panel (soft warm neutral on standard, warm orange mesh gradient on featured) */}
              <div className={`event-tier-topbox ${tier.featured ? 'is-gradient' : ''}`}>
                <div className="event-tier-name-row">
                  <span className="event-tier-name">{tier.name}</span>
                  {tier.featured && <span className="event-tier-star">★ {tier.badge}</span>}
                </div>

                <div className="event-tier-metric">
                  <strong>{tier.guestNumber}</strong>
                  <span>{tier.guestUnit}</span>
                </div>

                <p className="event-tier-desc">{tier.desc}</p>

                <button
                  type="button"
                  className="event-tier-dark-btn"
                  onClick={() => onSelectPackage(`${tier.name} (${tier.guests})`)}
                >
                  Request Quote
                </button>
              </div>

              {/* Bottom Pure White Perks Checklist */}
              <ul className="event-tier-checklist">
                {tier.perks.map((perk) => (
                  <li key={perk}>
                    <span className="event-check-circle" aria-hidden="true">
                      <Check size={12} strokeWidth={2.6} />
                    </span>
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
