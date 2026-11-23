'use client';

import React, { useEffect, useState } from 'react';
import { Phone, MessageCircle, Mail, Store } from 'lucide-react';
import Navbar from '../../components/Navbar.jsx';
import EventInquiryForm from '../../components/EventInquiryForm.jsx';
import Footer from '../../components/Footer.jsx';
import { BRAND } from '../../data/akamData.js';

export default function ContactPage() {
  const [selectedItems, setSelectedItems] = useState([]);

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

  const removeItem = (item) => {
    setSelectedItems((prev) => {
      const next = prev.filter((existing) => existing !== item);
      try {
        window.sessionStorage.setItem('akam_selected_items', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const clearItems = () => {
    setSelectedItems([]);
    try {
      window.sessionStorage.removeItem('akam_selected_items');
    } catch {
      // ignore
    }
  };

  const whatsappUrl = `https://wa.me/${BRAND.whatsappNumber}?text=${encodeURIComponent(
    'Hello Akam Chops! I would like to inquire about event catering.'
  )}`;

  return (
    <div className="contact-page-shell">
      <Navbar isScrolled={true} activeSection="contact" isContactPage={true} />

      {/* Top Editorial Centered Hero Header (matching Contact Us inspiration) */}
      <section className="contact-hero-banner">
        <div className="container contact-hero-inner">
          <h1 className="contact-hero-title">Contact Us</h1>
          <p className="contact-hero-sub">
            Planning a wedding, corporate summit, birthday, or private gathering? Send us your
            event details and our catering team will respond promptly.
          </p>
        </div>

        {/* Appetizing Food Strip along the bottom edge of the header */}
        <div className="contact-hero-strip" aria-hidden="true">
          <img src="/images/hero-platter.jpg" alt="" />
          <img src="/images/menu-puff-puff.jpg" alt="" />
          <img src="/images/grills-shawarma.jpg" alt="" />
          <img src="/images/menu-meat-pie.jpg" alt="" />
          <img src="/images/akam-naturals.jpg" alt="" />
        </div>
      </section>

      {/* Main 2-Column Body: Left 2x2 Contact Cards + Map | Right Get In Touch Form */}
      <main className="contact-page-main">
        <div className="container">
          <div className="contact-page-grid">
            {/* Left Column: 2x2 Square Cards + Map */}
            <div className="contact-left-col">
              <div className="contact-cards-2x2">
                <a href={`tel:${BRAND.phones[0].replace(/\s+/g, '')}`} className="contact-mini-card">
                  <div className="contact-mini-icon">
                    <Phone size={24} />
                  </div>
                  <h3>Phone</h3>
                  <p>{BRAND.phones[0]}</p>
                  <p>{BRAND.phones[1]}</p>
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="contact-mini-card"
                >
                  <div className="contact-mini-icon">
                    <MessageCircle size={24} />
                  </div>
                  <h3>WhatsApp</h3>
                  <p>{BRAND.phones[0]}</p>
                  <p>Tap to chat directly</p>
                </a>

                <a href={`mailto:${BRAND.email}`} className="contact-mini-card">
                  <div className="contact-mini-icon">
                    <Mail size={24} />
                  </div>
                  <h3>Email</h3>
                  <p className="contact-mini-email">{BRAND.email}</p>
                </a>

                <div className="contact-mini-card">
                  <div className="contact-mini-icon">
                    <Store size={24} />
                  </div>
                  <h3>Our Kitchen</h3>
                  <p>Suite C203, Mab Global Plaza</p>
                </div>
              </div>

              {/* Clean Rounded Map Card */}
              <div className="contact-map-card">
                <iframe
                  title="Akam Chops Kitchen Location"
                  src="https://maps.google.com/maps?q=Mab%20Global%20Plaza%20Jabi&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Right Column: Get In Touch Form */}
            <div className="contact-right-col">
              <EventInquiryForm
                selectedItems={selectedItems}
                onRemoveItem={removeItem}
                onClearItems={clearItems}
                variant="contact-page"
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
