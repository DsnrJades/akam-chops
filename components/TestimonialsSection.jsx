'use client';

import React from 'react';
import { Star, Quote } from 'lucide-react';
import { REVIEWS } from '../data/akamData.js';

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="section testimonials-section" data-section-fade>
      <div className="container">
        <div className="testimonials-header" data-reveal="up">
          <p className="menu-kicker">CLIENT LOVE</p>
          <h2 className="display-lg">
            Words From Our <span className="accent-text">Guests.</span>
          </h2>
          <p className="section-lead">
            Real moments and feedback from hosts, event teams, and everyday small chops lovers.
          </p>
        </div>

        <div className="testimonials-equal-grid">
          {REVIEWS.map((rev, idx) => (
            <article
              key={rev.author}
              className="testimonial-card"
              data-reveal="up"
              data-reveal-delay={idx * 90}
            >
              <div className="testimonial-top">
                <div className="review-stars" aria-label="5 out of 5 stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <Quote size={24} className="testimonial-quote-icon" />
              </div>

              <p className="testimonial-quote">“{rev.quote}”</p>

              <div className="testimonial-footer">
                <div className="testimonial-avatar">{rev.initials}</div>
                <div>
                  <strong>{rev.author}</strong>
                  <span>{rev.role}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
