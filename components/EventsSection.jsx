'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Check, Sparkles } from 'lucide-react';
import { EVENT_TIERS } from '../data/akamData.js';

export default function EventsSection({ onSelectPackage }) {
  return (
    <section id="events" className="section events-editorial-section" data-section-fade>
      <div className="container">
        {/* Top Editorial Header matching Menu & About typography */}
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

        {/* 3 Equal-Width, Equal-Height Editorial Catering Cards */}
        <div className="events-equal-grid">
          {EVENT_TIERS.map((tier, idx) => (
            <article
              key={tier.name}
              className={`events-equal-card ${tier.featured ? 'is-featured' : ''}`}
              data-reveal="up"
              data-reveal-delay={idx * 90}
            >
              <div className="events-card-body">
                <div className="events-card-top">
                  <span className="events-guests-pill">{tier.guests}</span>
                  <span className={`events-badge-label ${tier.featured ? 'is-featured' : ''}`}>
                    {tier.featured ? '★ ' : ''}
                    {tier.badge}
                  </span>
                </div>

                <h3 className="events-card-title">{tier.name}</h3>
                <p className="events-card-desc">{tier.desc}</p>

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
                className={`btn ${tier.featured ? 'btn-primary' : 'btn-secondary'} events-card-cta`}
                onClick={() => onSelectPackage(`${tier.name} (${tier.guests})`)}
              >
                Request {tier.name} Quote
                <ArrowRight size={16} />
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
