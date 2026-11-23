'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sprout, Heart, Sparkles } from 'lucide-react';

const CTA_PERKS = [
  { icon: Sprout, line1: 'Freshly crafted', line2: 'ingredients' },
  { icon: Heart, line1: 'Zero', line2: 'shortcuts' },
  { icon: Sparkles, line1: 'Event-ready', line2: 'packaging' },
];

export default function PreFooterCta() {
  return (
    <section className="section prefooter-cta-section" data-section-fade>
      <div className="container">
        <div className="prefooter-banner" data-reveal="scale">
          {/* Left Copy + Dark Pill Button */}
          <div className="prefooter-left">
            <p className="prefooter-kicker">GOOD CHOPS. REAL ENERGY.</p>
            <h2 className="prefooter-title">
              CHOP HAPPY <span className="prefooter-heart" aria-hidden="true">♡</span>
            </h2>
            <p className="prefooter-sub">
              Real ingredients. Bold flavors. Every celebration elevated.
            </p>
            <Link href="/contact" className="prefooter-dark-btn">
              Book your event
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Center Appetizing Chops Feature Photo */}
          <div className="prefooter-center">
            <div className="prefooter-photo-frame">
              <img
                src="/images/menu-puff-puff.jpg"
                alt="Golden Akam Chops puff-puff and samosas"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

          {/* Right 3 Minimalist Stacked Perks */}
          <div className="prefooter-right">
            {CTA_PERKS.map((perk) => {
              const Icon = perk.icon;
              return (
                <div key={perk.line1} className="prefooter-perk">
                  <span className="prefooter-perk-icon">
                    <Icon size={20} strokeWidth={1.9} />
                  </span>
                  <div className="prefooter-perk-text">
                    <span>{perk.line1}</span>
                    <span>{perk.line2}</span>
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
