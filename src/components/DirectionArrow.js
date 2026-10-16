'use client';

import { motion } from 'framer-motion';

/**
 * DirectionArrow Component
 *
 * Smooth, elegant dotted path with directional arrowhead guiding guests
 * seamlessly between ceremony cards. Symmetrically centered around x=130.
 */
export default function DirectionArrow({
  direction = 'haldi-to-sangeet',
  className = '',
}) {
  const configs = {
    // Under Haldi -> heads down-right towards Sangeet (balanced around center 130)
    'haldi-to-sangeet': {
      viewBox: '0 0 260 90',
      path: 'M 90,12 C 75,45 105,75 170,78',
      arrowTip: { x: 170, y: 78, angle: 10 },
    },

    // Under Sangeet -> heads down-left towards Baarat (balanced around center 130)
    'sangeet-to-baarat': {
      viewBox: '0 0 260 90',
      path: 'M 170,12 C 185,45 155,75 90,78',
      arrowTip: { x: 90, y: 78, angle: 170 },
    },

    // Under Baarat -> heads down-right towards Lunch (balanced around center 130)
    'baarat-to-lunch': {
      viewBox: '0 0 260 90',
      path: 'M 90,12 C 75,45 105,75 170,78',
      arrowTip: { x: 170, y: 78, angle: 10 },
    },

    // Under Lunch -> heads down-left towards Phere (balanced around center 130)
    'lunch-to-phere': {
      viewBox: '0 0 260 90',
      path: 'M 170,12 C 185,45 155,75 90,78',
      arrowTip: { x: 90, y: 78, angle: 170 },
    },

    // Under Phere -> heads straight down towards Couple Portrait (dead center 130)
    'phere-to-couple': {
      viewBox: '0 0 260 85',
      path: 'M 130,10 C 130,35 130,55 130,75',
      arrowTip: { x: 130, y: 75, angle: 90 },
    },
  };

  const active = configs[direction] || configs['haldi-to-sangeet'];

  return (
    <div className={`direction-arrow-wrapper ${className}`} aria-hidden="true">
      <svg
        viewBox={active.viewBox}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="direction-svg"
      >
        <defs>
          <filter id="soft-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="rgba(108, 33, 24, 0.25)" />
          </filter>
        </defs>

        {/* Ambient Warm Golden Trail */}
        <path
          d={active.path}
          stroke="rgba(212, 175, 55, 0.4)"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Smooth Dotted Guide Path */}
        <path
          d={active.path}
          stroke="#5c382f"
          strokeWidth="2.4"
          strokeDasharray="4 6"
          strokeLinecap="round"
          className="arrow-dash-flow"
        />

        {/* Directional Arrowhead with smooth gentle glide along trajectory */}
        <g
          transform={`translate(${active.arrowTip.x}, ${active.arrowTip.y}) rotate(${active.arrowTip.angle})`}
          filter="url(#soft-glow)"
        >
          <motion.path
            d="M 0,0 L -10,-5 L -7,0 L -10,5 Z"
            fill="#5c382f"
            animate={{
              x: [0, 3, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.8,
              ease: 'easeInOut',
            }}
          />
        </g>
      </svg>

      <style jsx>{`
        .direction-arrow-wrapper {
          width: 100%;
          max-width: 260px;
          height: 65px;
          margin: 0.5rem auto 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
          position: relative;
          z-index: 4;
        }

        .direction-svg {
          width: 100%;
          height: 100%;
          display: block;
          overflow: visible;
        }

        .arrow-dash-flow {
          animation: dashMove 2.2s linear infinite;
        }

        @keyframes dashMove {
          from {
            stroke-dashoffset: 20;
          }
          to {
            stroke-dashoffset: 0;
          }
        }

        @media (max-width: 480px) {
          .direction-arrow-wrapper {
            height: 55px;
            max-width: 220px;
            margin: 0.3rem auto 0.8rem;
          }
        }
      `}</style>
    </div>
  );
}
