'use client';

import React, { useRef, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Star,
  Check,
  LayoutGrid,
  Flame,
  Utensils,
  Sandwich,
  CupSoda,
} from 'lucide-react';
import { MENU_ITEMS } from '../data/akamData.js';

const SIDEBAR_CATS = [
  { id: 'all', label: 'All', icon: LayoutGrid },
  { id: 'small-chops', label: 'Small Chops', icon: Utensils },
  { id: 'grills', label: 'Peppered Grills', icon: Flame },
  { id: 'shawarma-pastries', label: 'Shawarma & Pies', icon: Sandwich },
  { id: 'naturals', label: 'Akam Naturals', icon: CupSoda },
];

export default function MenuShowcase({ selectedItems, onToggleItem }) {
  const [activeCat, setActiveCat] = useState('all');
  const [favorites, setFavorites] = useState([]);
  const trackRef = useRef(null);

  const visibleItems =
    activeCat === 'all'
      ? MENU_ITEMS
      : MENU_ITEMS.filter((item) => item.categoryId === activeCat);

  const scrollTrack = (direction) => {
    const el = trackRef.current;
    if (!el) return;
    const cardWidth = el.querySelector('.menu-photo-card')?.offsetWidth || 310;
    el.scrollBy({
      left: direction * (cardWidth + 20),
      behavior: 'smooth',
    });
  };

  const toggleFavorite = (name) => {
    setFavorites((prev) =>
      prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]
    );
  };

  const handleCategoryChange = (catId) => {
    setActiveCat(catId);
    if (trackRef.current) {
      trackRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  };

  return (
    <section id="menu" className="section menu-editorial-section">
      <div className="container">
        {/* Top Row: Eyebrow + Headline on Left, Carousel Arrows on Right */}
        <div className="menu-editorial-header" data-reveal="up">
          <div>
            <p className="menu-kicker">EXPLORE OUR MENU</p>
            <h2 className="display-lg">
              Tasty Chops You’ll <span className="accent-text">Love</span>
            </h2>
          </div>

          <div className="menu-carousel-arrows" aria-label="Scroll menu cards">
            <button
              type="button"
              className="menu-arrow-btn menu-arrow-prev"
              onClick={() => scrollTrack(-1)}
              aria-label="Previous menu items"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              className="menu-arrow-btn menu-arrow-next"
              onClick={() => scrollTrack(1)}
              aria-label="Next menu items"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Main 2-Column Body: Left Category Sidebar + Right Full-Bleed Image Cards */}
        <div className="menu-editorial-body">
          <aside className="menu-sidebar" role="tablist" aria-label="Menu Categories">
            {SIDEBAR_CATS.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCat === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`menu-sidebar-btn ${isActive ? 'is-active' : ''}`}
                  onClick={() => handleCategoryChange(cat.id)}
                >
                  <span className="menu-sidebar-icon">
                    <Icon size={18} />
                  </span>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </aside>

          <div ref={trackRef} className="menu-cards-track">
            {visibleItems.map((item) => {
              const isSelected = selectedItems.includes(item.name);
              const isFav = favorites.includes(item.name);

              return (
                <article key={item.name} className="menu-photo-card">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="menu-photo-bg"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="menu-photo-scrim" aria-hidden="true" />

                  {/* Top Badges Row */}
                  <div className="menu-photo-top">
                    <span className="menu-photo-badge">{item.tag}</span>
                    <button
                      type="button"
                      className={`menu-heart-btn ${isFav ? 'is-loved' : ''}`}
                      onClick={() => toggleFavorite(item.name)}
                      aria-label={`Save ${item.name}`}
                    >
                      <Heart size={16} fill={isFav ? 'currentColor' : 'none'} />
                    </button>
                  </div>

                  {/* Bottom Details + CTA Row */}
                  <div className="menu-photo-bottom">
                    <h3 className="menu-photo-title">{item.name}</h3>

                    <div className="menu-photo-rating">
                      <Star size={14} fill="currentColor" />
                      <strong>{item.rating}</strong>
                      <span>({item.reviews})</span>
                    </div>

                    <p className="menu-photo-summary">{item.summary}</p>

                    <div className="menu-photo-actions">
                      <button
                        type="button"
                        className={`menu-order-pill ${isSelected ? 'is-selected' : ''}`}
                        onClick={() => onToggleItem(item.name)}
                      >
                        {isSelected ? (
                          <>
                            <Check size={15} /> Added to Inquiry
                          </>
                        ) : (
                          'Add to Inquiry'
                        )}
                      </button>

                      <button
                        type="button"
                        className={`menu-heart-btn ${isFav ? 'is-loved' : ''}`}
                        onClick={() => toggleFavorite(item.name)}
                        aria-label={`Favorite ${item.name}`}
                      >
                        <Heart size={16} fill={isFav ? 'currentColor' : 'none'} />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
