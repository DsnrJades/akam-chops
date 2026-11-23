'use client';

import React, { useRef } from 'react';

/**
 * Interactive 3D Spatial Tilt Card
 * Adds smooth CSS 3D perspective rotation + warm specular light sheen on hover.
 */
export default function TiltCard3D({ children, className = '', maxTilt = 7 }) {
  const cardRef = useRef(null);
  const sheenRef = useRef(null);

  const handleMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const rotY = (x - 0.5) * (maxTilt * 2);
    const rotX = (0.5 - y) * (maxTilt * 2);

    el.style.transform = `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateZ(6px)`;

    if (sheenRef.current) {
      sheenRef.current.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255, 255, 255, 0.42), transparent 60%)`;
    }
  };

  const handleLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
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

