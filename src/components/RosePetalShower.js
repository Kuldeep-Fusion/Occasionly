'use client';

import { useEffect, useState, useRef } from 'react';

/**
 * RosePetalShower Component
 *
 * Implements a continuous, ultra-smooth falling rose petal shower across the entire site
 * ("flower show on hall site rose pink") with gentle breeze sway, 3D tumbling rotation,
 * and celebratory petal bursts on entrance or actions.
 */
export default function RosePetalShower({ isEnabled = true }) {
  const [petals, setPetals] = useState([]);
  const [bursts, setBursts] = useState([]);

  useEffect(() => {
    // Generate realistic, organic rose petals in shades of pink ("rose pink")
    const petalColors = [
      '#e91e63', // Rose Pink
      '#f06292', // Light Rose Pink
      '#ff4081', // Vivid Rose
      '#ec407a', // Deep Rose
      '#f48fb1', // Soft Blush Pink
      '#ff80ab', // Pastel Rose
      '#ff6699', // Bright Floral Pink
      '#d81b60', // Rich Fuchsia Rose
    ];

    const count = 34; // Generous flower show on the whole site while maintaining 60fps
    const initialPetals = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100, // percentage across screen width
      size: 15 + Math.random() * 20, // 15px to 35px
      color: petalColors[Math.floor(Math.random() * petalColors.length)],
      delay: -(Math.random() * 15), // start at random heights immediately
      duration: 6.5 + Math.random() * 7, // 6.5s to 13.5s fall time
      swayDuration: 2.2 + Math.random() * 3, // sway cycle
      rotateStart: Math.random() * 360,
      opacity: 0.7 + Math.random() * 0.3,
      shapeVariant: Math.floor(Math.random() * 3), // different petal silhouettes
    }));

    setPetals(initialPetals);

    // Listen for custom rose burst events
    const handleBurst = (e) => {
      const burstCount = e.detail?.count || 35;
      const x = e.detail?.x || window.innerWidth / 2;
      const y = e.detail?.y || window.innerHeight / 3;

      const newBurst = Array.from({ length: burstCount }, (_, i) => {
        const angle = Math.random() * Math.PI * 2;
        const velocity = 80 + Math.random() * 260;
        return {
          id: `burst-${Date.now()}-${i}`,
          x,
          y,
          dx: Math.cos(angle) * velocity,
          dy: Math.sin(angle) * velocity - 100,
          color: petalColors[Math.floor(Math.random() * petalColors.length)],
          size: 12 + Math.random() * 18,
          rotation: Math.random() * 360,
        };
      });

      setBursts((prev) => [...prev, ...newBurst]);

      setTimeout(() => {
        setBursts((prev) => prev.filter((p) => !newBurst.includes(p)));
      }, 2500);
    };

    window.addEventListener('triggerRoseBurst', handleBurst);
    return () => window.removeEventListener('triggerRoseBurst', handleBurst);
  }, []);

  if (!isEnabled) return null;

  return (
    <div className="rose-shower-container" aria-hidden="true">
      {/* 1. Continuous Falling Rose Petals */}
      {petals.map((p) => (
        <div
          key={p.id}
          className="rose-petal"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size * 1.3}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s, ${p.swayDuration}s`,
            opacity: p.opacity,
          }}
        >
          <svg
            viewBox="0 0 30 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="petal-svg"
            style={{ transform: `rotate(${p.rotateStart}deg)` }}
          >
            <defs>
              <radialGradient
                id={`grad-${p.id}`}
                cx="40%"
                cy="35%"
                r="65%"
                fx="35%"
                fy="30%"
              >
                <stop offset="0%" stopColor="#ffc1e3" />
                <stop offset="45%" stopColor={p.color} />
                <stop offset="100%" stopColor="#880e4f" />
              </radialGradient>
              <filter id={`shadow-${p.id}`} x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="1" dy="2" stdDeviation="1.5" floodColor="rgba(108, 33, 24, 0.25)" />
              </filter>
            </defs>

            {/* Natural curved curved rose petal outline */}
            {p.shapeVariant === 0 && (
              <path
                d="M15 3 C25 8, 30 22, 22 34 C16 41, 14 41, 8 34 C0 22, 5 8, 15 3 Z"
                fill={`url(#grad-${p.id})`}
                filter={`url(#shadow-${p.id})`}
              />
            )}
            {p.shapeVariant === 1 && (
              <path
                d="M14 2 C26 5, 29 20, 20 33 C14 40, 10 38, 5 31 C-1 20, 2 5, 14 2 Z"
                fill={`url(#grad-${p.id})`}
                filter={`url(#shadow-${p.id})`}
              />
            )}
            {p.shapeVariant === 2 && (
              <path
                d="M16 4 C27 10, 27 25, 21 35 C15 42, 11 39, 7 33 C1 24, 5 9, 16 4 Z"
                fill={`url(#grad-${p.id})`}
                filter={`url(#shadow-${p.id})`}
              />
            )}

            {/* Subtle inner petal vein highlight */}
            <path
              d="M15 8 Q15 22 14 34"
              stroke="rgba(255, 255, 255, 0.4)"
              strokeWidth="0.8"
              strokeLinecap="round"
            />
          </svg>
        </div>
      ))}

      {/* 2. Interactive Explosion Bursts */}
      {bursts.map((b) => (
        <div
          key={b.id}
          className="rose-burst-petal"
          style={{
            left: `${b.x}px`,
            top: `${b.y}px`,
            width: `${b.size}px`,
            height: `${b.size * 1.3}px`,
            '--dx': `${b.dx}px`,
            '--dy': `${b.dy}px`,
            '--rot': `${b.rotation}deg`,
          }}
        >
          <svg viewBox="0 0 30 40" fill="none" className="petal-svg">
            <path
              d="M15 3 C25 8, 30 22, 22 34 C16 41, 14 41, 8 34 C0 22, 5 8, 15 3 Z"
              fill={b.color}
            />
          </svg>
        </div>
      ))}

      <style jsx>{`
        .rose-shower-container {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100vw;
          height: 100vh;
          pointer-events: none;
          z-index: 100000;
          overflow: hidden;
        }

        .rose-petal {
          position: absolute;
          top: -60px;
          animation-name: fallDown, swayBreeze;
          animation-timing-function: linear, ease-in-out;
          animation-iteration-count: infinite, infinite;
          will-change: transform, top;
        }

        .petal-svg {
          width: 100%;
          height: 100%;
          display: block;
          filter: drop-shadow(0 2px 4px rgba(136, 14, 79, 0.25));
        }

        @keyframes fallDown {
          0% {
            top: -60px;
          }
          100% {
            top: 108vh;
          }
        }

        @keyframes swayBreeze {
          0%, 100% {
            transform: translateX(0px) rotate(0deg) rotateY(0deg);
          }
          25% {
            transform: translateX(35px) rotate(35deg) rotateY(60deg);
          }
          50% {
            transform: translateX(-20px) rotate(90deg) rotateY(180deg);
          }
          75% {
            transform: translateX(45px) rotate(45deg) rotateY(270deg);
          }
        }

        .rose-burst-petal {
          position: absolute;
          animation: burstAnim 2.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          will-change: transform, opacity;
        }

        @keyframes burstAnim {
          0% {
            transform: translate(0, 0) rotate(0deg) scale(0.6);
            opacity: 1;
          }
          60% {
            transform: translate(var(--dx), var(--dy)) rotate(var(--rot)) scale(1.1);
            opacity: 0.9;
          }
          100% {
            transform: translate(var(--dx), calc(var(--dy) + 200px)) rotate(calc(var(--rot) + 180deg)) scale(0.8);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

/**
 * Utility helper to fire celebratory rose bursts anywhere in the application
 */
export function triggerRosePetalBurst(x, y, count = 35) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('triggerRoseBurst', {
        detail: { x, y, count },
      })
    );
  }
}
