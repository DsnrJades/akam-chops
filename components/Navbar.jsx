'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { NAV_LINKS } from '../data/akamData.js';

/**
 * Sticky Glass Navigation Bar:
 * - Works seamlessly on both Home (`/`) and dedicated Contact (`/contact`) page
 * - Four links: Experience, Menu, Events (smooth scroll on home / route from contact) + Contact (`/contact`)
 * - Stays in hero glass mode until completely scrolled past hero on home page
 */
export default function Navbar({
  isScrolled,
  activeSection,
  progressBarRef,
  onScrollTo,
  isContactPage = false,
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleHomeSectionClick = (e, id) => {
    setMobileOpen(false);
    if (!isContactPage && onScrollTo) {
      e.preventDefault();
      requestAnimationFrame(() => {
        onScrollTo(id);
      });
    }
  };

  return (
    <>
      {progressBarRef && (
        <div ref={progressBarRef} className="scroll-progress-bar" aria-hidden="true" />
      )}

      <header className={`nav-wrapper ${isScrolled ? 'is-scrolled' : ''}`}>
        <div className="container">
          <nav className="nav-inner" aria-label="Primary navigation">
            <Link
              href="/#experience"
              className="nav-logo"
              onClick={(e) => handleHomeSectionClick(e, 'experience')}
              aria-label="Akam Chops Home"
            >
              <img src="/images/akam-logo.png" alt="Akam Chops" width={92} height={44} />
            </Link>

            <ul className="nav-links">
              {NAV_LINKS.map((link) => {
                const isContactLink = link.id === 'contact';
                const href = isContactLink ? '/contact' : `/#${link.id}`;
                return (
                  <li key={link.id}>
                    <Link
                      href={href}
                      className={`nav-link ${activeSection === link.id ? 'is-active' : ''}`}
                      onClick={(e) => {
                        if (isContactLink) {
                          setMobileOpen(false);
                        } else {
                          handleHomeSectionClick(e, link.id);
                        }
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="nav-actions">
              <Link
                href="/contact"
                className="btn btn-primary btn-sm nav-desktop-cta"
                onClick={() => setMobileOpen(false)}
              >
                Book an Event
                <ArrowUpRight size={16} />
              </Link>

              <button
                type="button"
                className="nav-mobile-toggle"
                onClick={() => setMobileOpen((prev) => !prev)}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {mobileOpen && (
        <div
          className={`mobile-drawer ${isScrolled ? 'is-scrolled' : 'is-hero'}`}
          role="dialog"
          aria-label="Mobile Navigation"
        >
          {NAV_LINKS.map((link) => {
            const isContactLink = link.id === 'contact';
            const href = isContactLink ? '/contact' : `/#${link.id}`;
            return (
              <Link
                key={link.id}
                href={href}
                className={`nav-link ${activeSection === link.id ? 'is-active' : ''}`}
                onClick={(e) => {
                  if (isContactLink) {
                    setMobileOpen(false);
                  } else {
                    handleHomeSectionClick(e, link.id);
                  }
                }}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            className="btn btn-primary"
            style={{ marginTop: 8 }}
            onClick={() => setMobileOpen(false)}
          >
            Book an Event
            <ArrowUpRight size={16} />
          </Link>
        </div>
      )}
    </>
  );
}
