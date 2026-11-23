'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, X, MessageCircle, Mail, Loader2 } from 'lucide-react';
import { BRAND } from '../data/akamData.js';

const INITIAL_FORM = {
  fullName: '',
  phone: '',
  email: '',
  eventType: 'Wedding / Engagement',
  eventDate: '',
  guestCount: '100 - 250 Guests',
  venue: '',
  notes: '',
};

export default function EventInquiryForm({ selectedItems, onRemoveItem, onClearItems }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [feedback, setFeedback] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const buildSummaryText = () => {
    const itemsText = selectedItems.length ? selectedItems.join(', ') : 'Custom recommendation needed';
    return [
      `Hello Akam Chops! I'd like to request an event quote:`,
      `• Name: ${form.fullName}`,
      `• Phone: ${form.phone}`,
      `• Email: ${form.email}`,
      `• Event Type: ${form.eventType}`,
      `• Event Date: ${form.eventDate || 'TBD'}`,
      `• Guest Count: ${form.guestCount}`,
      `• Event Venue & City: ${form.venue || 'Nigeria'}`,
      `• Interested Menu/Packages: ${itemsText}`,
      form.notes ? `• Notes: ${form.notes}` : null,
    ]
      .filter(Boolean)
      .join('\n');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setFeedback('');

    const payload = {
      ...form,
      selectedItems: selectedItems.length ? selectedItems.join(', ') : 'None selected',
      submittedAt: new Date().toISOString(),
      source: 'Akam Chops Website',
    };

    try {
      if (BRAND.googleAppsScriptUrl) {
        await fetch(BRAND.googleAppsScriptUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        setStatus('success');
        setFeedback(
          'Your event request has been logged to our catering sheet and emailed directly to the Akam Chops team. Expect a response within 2 hours!'
        );
      } else {
        // Graceful live preview mode before the Google Apps Script URL is pasted into .env
        await new Promise((r) => setTimeout(r, 650));
        setStatus('success');
        setFeedback(
          'Request prepared! Connect your Google Apps Script Web App URL in `.env` (NEXT_PUBLIC_GOOGLE_SCRIPT_URL) to auto-save to Google Sheets & email Akamchopsabuja@gmail.com â€” or send instantly via WhatsApp / Email below.'
        );
      }
      setForm(INITIAL_FORM);
      onClearItems();
    } catch {
      setStatus('error');
      setFeedback(
        'We could not reach the submission sheet right now. Please tap WhatsApp or Email below to send your event details directly.'
      );
    }
  };

  const whatsappUrl = `https://wa.me/${BRAND.whatsappNumber}?text=${encodeURIComponent(
    buildSummaryText()
  )}`;
  const mailtoUrl = `mailto:${BRAND.email}?subject=${encodeURIComponent(
    `Event Catering Inquiry — ${form.eventType || 'Akam Chops'}`
  )}&body=${encodeURIComponent(buildSummaryText())}`;

  return (
    <div className="inquiry-form-card" data-reveal="left">
      <div style={{ marginBottom: 24 }}>
        <span className="eyebrow" style={{ marginBottom: 12 }}>
          <span className="eyebrow-dot" />
          Zero-Hassle Event Booking
        </span>
        <h3 className="display-md" style={{ marginBottom: 8 }}>
          Request an Event Quote
        </h3>
        <p style={{ color: 'var(--ink-secondary)', fontSize: '0.94rem' }}>
          No cart or checkout stress. Tell us about your event anywhere in Nigeria — your inquiry
          goes straight to our catering sheet &amp; inbox at <strong>{BRAND.email}</strong>.
        </p>
      </div>

      {selectedItems.length > 0 && (
        <div className="selected-items-box" aria-label="Selected menu items for event quote">
          <span
            style={{
              width: '100%',
              fontSize: '0.76rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--orange-deep)',
            }}
          >
            Selected for your quote ({selectedItems.length})
          </span>
          {selectedItems.map((item) => (
            <span key={item} className="selected-pill">
              {item}
              <button
                type="button"
                onClick={() => onRemoveItem(item)}
                aria-label={`Remove ${item}`}
              >
                <X size={13} />
              </button>
            </span>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-grid-2">
          <div className="form-group">
            <label htmlFor="fullName">Full Name *</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              required
              placeholder="e.g. Amina Bello"
              className="form-input"
              value={form.fullName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone / WhatsApp *</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              placeholder="e.g. 0803 000 0000"
              className="form-input"
              value={form.phone}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-grid-2">
          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="form-input"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="eventType">Event Type *</label>
            <select
              id="eventType"
              name="eventType"
              className="form-input"
              value={form.eventType}
              onChange={handleChange}
            >
              <option>Wedding / Engagement</option>
              <option>Corporate / Conference</option>
              <option>Birthday / Private Party</option>
              <option>Pageant / Gala / Launch</option>
              <option>Bulk Office / Family Packs</option>
            </select>
          </div>
        </div>

        <div className="form-grid-2">
          <div className="form-group">
            <label htmlFor="eventDate">Event Date *</label>
            <input
              id="eventDate"
              name="eventDate"
              type="date"
              required
              className="form-input"
              value={form.eventDate}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="guestCount">Estimated Guests *</label>
            <select
              id="guestCount"
              name="guestCount"
              className="form-input"
              value={form.guestCount}
              onChange={handleChange}
            >
              <option>30 - 80 Guests</option>
              <option>80 - 150 Guests</option>
              <option>150 - 300 Guests</option>
              <option>300 - 600 Guests</option>
              <option>600+ Guests</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="venue">Event Venue &amp; City / State *</label>
          <input
            id="venue"
            name="venue"
            type="text"
            required
            placeholder="e.g. Abuja, Lagos, Port Harcourt, Enugu, Kano..."
            className="form-input"
            value={form.venue}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="notes">Menu Preferences &amp; Special Notes</label>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            placeholder="Tell us preferred packs, spice level, Akam Naturals drinks, or delivery time..."
            className="form-input"
            value={form.notes}
            onChange={handleChange}
          />
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 8 }}>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ flex: '1 1 220px' }}
            disabled={status === 'submitting'}
          >
            {status === 'submitting' ? (
              <>
                <Loader2 size={18} className="spin" />
                Sending Request...
              </>
            ) : (
              <>
                Submit Event Request
                <Send size={17} />
              </>
            )}
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-secondary"
            style={{ flex: '0 1 auto' }}
          >
            <MessageCircle size={17} />
            WhatsApp
          </a>
        </div>
      </form>

      {status === 'success' && (
        <div className="form-status-box form-status-success" role="status">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <CheckCircle2 size={18} />
            <strong>Event Request Received!</strong>
          </div>
          <span>{feedback}</span>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 4 }}>
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="btn btn-secondary btn-sm">
              <MessageCircle size={15} /> Open in WhatsApp
            </a>
            <a href={mailtoUrl} className="btn btn-secondary btn-sm">
              <Mail size={15} /> Open in Email
            </a>
          </div>
        </div>
      )}

      {status === 'error' && (
        <div className="form-status-box form-status-error" role="alert">
          <span>{feedback}</span>
        </div>
      )}
    </div>
  );
}

