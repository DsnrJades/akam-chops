'use client';

import React, { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { NAV_LINKS } from '../data/akamData.js';

/**
 * Sticky Glass Navigation Bar:
 * - Genuine Akam Chops transparent logo
 * - Four smooth-scroll links with active section highlighting
 * - Subtle frosted glass morphism effect on scroll + orange scroll progress bar
 */
export default function Navbar({ isScrolled, scrollProgress, activeSection }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <div
        className="scroll-progress-bar"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      <header className={`nav-wrapper ${isScrolled ? 'is-scrolled' : ''}`}>
        <div className="container">
          <nav className="nav-inner" aria-label="Primary navigation">
            <a
              href="#experience"
              className="nav-logo"
              onClick={(e) => handleNavClick(e, 'experience')}
              aria-label="Akam Chops Home"
            >
              <img src="/images/akam-logo.png" alt="Akam Chops" />
            </a>

            <ul className="nav-links">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className={`nav-link ${activeSection === link.id ? 'is-active' : ''}`}
                    onClick={(e) => handleNavClick(e, link.id)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="nav-actions">
              <a
                href="#contact"
                className="btn btn-primary btn-sm nav-desktop-cta"
                onClick={(e) => handleNavClick(e, 'contact')}
              >
                Book an Event
                <ArrowUpRight size={16} />
              </a>

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
        <div className="mobile-drawer" role="dialog" aria-label="Mobile Navigation">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`nav-link ${activeSection === link.id ? 'is-active' : ''}`}
              onClick={(e) => handleNavClick(e, link.id)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="btn btn-primary"
            style={{ marginTop: 8 }}
            onClick={(e) => handleNavClick(e, 'contact')}
          >
            Book an Event
            <ArrowUpRight size={16} />
          </a>
        </div>
      )}
    </>
  );
}

