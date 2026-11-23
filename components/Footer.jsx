'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail } from 'lucide-react';
import { BRAND } from '../data/akamData.js';

export default function Footer() {
  return (
    <footer className="site-footer-dark">
      <div className="container">
        <div className="footer-dark-grid">
          {/* Brand Column */}
          <div className="footer-dark-brand">
            <Link href="/#experience" className="nav-logo" aria-label="Akam Chops Home">
              <img src="/images/akam-logo.png" alt="Akam Chops" width={104} height={50} />
            </Link>
            <p>
              The Taste You Deserve. Crafted fresh daily — small chops, signature shawarma,
              peppered grills, Akam Naturals, and bespoke event catering.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-dark-col">
            <h4>Explore</h4>
            <ul>
              <li><Link href="/#experience">Experience</Link></li>
              <li><Link href="/#about">About Us</Link></li>
              <li><Link href="/#menu">Our Menu</Link></li>
              <li><Link href="/#events">Events</Link></li>
            </ul>
          </div>

          {/* More Links */}
          <div className="footer-dark-col">
            <h4>Connect</h4>
            <ul>
              <li><Link href="/contact">Contact Us</Link></li>
              <li><Link href="/#testimonials">Testimonials</Link></li>
              <li>
                <a href={BRAND.instagramUrl} target="_blank" rel="noreferrer">
                  Instagram ({BRAND.handle})
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${BRAND.whatsappNumber}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  WhatsApp Chat
                </a>
              </li>
            </ul>
          </div>

          {/* Get In Touch */}
          <div className="footer-dark-col">
            <h4>Get In Touch</h4>
            <ul className="footer-contact-list">
              <li>
                <MapPin size={15} />
                <span>{BRAND.address}</span>
              </li>
              <li>
                <Phone size={15} />
                <a href={`tel:${BRAND.phones[0].replace(/\s+/g, '')}`}>
                  {BRAND.phones.join(' · ')}
                </a>
              </li>
              <li>
                <Mail size={15} />
                <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-dark-bottom">
          <span>
            Copyright © {new Date().getFullYear()} {BRAND.name} · {BRAND.tagline}
          </span>
        </div>
      </div>
    </footer>
  );
}
