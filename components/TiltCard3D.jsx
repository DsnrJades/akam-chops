'use client';

import React, { useRef } from 'react';

/**
 * Lightweight 3D Spatial Tilt Card (rAF-throttled for 120fps scroll & hover)
 */
export default function TiltCard3D({ children, className = '', maxTilt = 6 }) {
  const cardRef = useRef(null);
  const sheenRef = useRef(null);
  const rafRef = useRef(null);

  const handleMove = (e) => {
    const el = cardRef.current;
    if (!el || rafRef.current) return;

    const clientX = e.clientX;
    const clientY = e.clientY;

    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const rect = el.getBoundingClientRect();
      const x = (clientX - rect.left) / rect.width;
      const y = (clientY - rect.top) / rect.height;

      const rotY = (x - 0.5) * (maxTilt * 2);
      const rotX = (0.5 - y) * (maxTilt * 2);

      el.style.transform = `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translate3d(0,0,4px)`;

      if (sheenRef.current) {
        sheenRef.current.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255, 255, 255, 0.36), transparent 60%)`;
      }
    });
  };

  const handleLeave = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translate3d(0,0,0)';
  };

  return (
    <div
      ref={cardRef}
      className={`tilt-card-3d ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <div ref={sheenRef} className="tilt-sheen" aria-hidden="true" />
      {children}
    </div>
  );
}
