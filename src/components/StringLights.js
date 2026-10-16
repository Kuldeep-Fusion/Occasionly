'use client';

export default function StringLights() {
  return (
    <div className="string-lights-wrapper" aria-hidden="true">
      <svg
        viewBox="0 0 1000 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="string-lights-svg"
        preserveAspectRatio="none"
      >
        {/* Curved Main Wire */}
        <path
          d="M0,25 Q125,75 250,30 T500,35 T750,30 T1000,25"
          stroke="#4a3e3d"
          strokeWidth="1.8"
          fill="none"
        />

        {/* Hanging Bulbs */}
        {[
          { cx: 70, cy: 52, delay: '0s' },
          { cx: 140, cy: 68, delay: '0.4s' },
          { cx: 210, cy: 45, delay: '0.8s' },
          { cx: 320, cy: 42, delay: '0.2s' },
          { cx: 390, cy: 62, delay: '0.7s' },
          { cx: 460, cy: 48, delay: '0.3s' },
          { cx: 580, cy: 40, delay: '0.9s' },
          { cx: 650, cy: 60, delay: '0.1s' },
          { cx: 720, cy: 46, delay: '0.6s' },
          { cx: 830, cy: 38, delay: '0.4s' },
          { cx: 910, cy: 54, delay: '0.8s' },
        ].map((bulb, i) => (
          <g key={i} className="bulb-group" style={{ animationDelay: bulb.delay }}>
            {/* Socket */}
            <rect x={bulb.cx - 3} y={bulb.cy - 7} width="6" height="7" fill="#6e5d53" rx="1" />
            {/* Glow Aura */}
            <circle cx={bulb.cx} cy={bulb.cy + 10} r="18" fill="rgba(255, 230, 140, 0.3)" filter="blur(4px)" />
            {/* Glass Bulb */}
            <path
              d={`M${bulb.cx - 7},${bulb.cy} C${bulb.cx - 10},${bulb.cy + 12} ${bulb.cx + 10},${bulb.cy + 12} ${bulb.cx + 7},${bulb.cy} Z`}
              fill="#fff2b2"
              stroke="#e6ca65"
              strokeWidth="0.8"
            />
            {/* Filament Spark */}
            <circle cx={bulb.cx} cy={bulb.cy + 6} r="2.5" fill="#ffffff" />
          </g>
        ))}
      </svg>

      <style jsx>{`
        .string-lights-wrapper {
          width: 100%;
          max-width: 800px;
          margin: 1.5rem auto;
          overflow: hidden;
          opacity: 0.88;
        }
        .string-lights-svg {
          width: 100%;
          height: 60px;
          display: block;
        }
        .bulb-group {
          animation: fairyGlow 2.5s ease-in-out infinite alternate;
          transform-origin: center;
        }
        @keyframes fairyGlow {
          0% {
            opacity: 0.65;
            filter: drop-shadow(0 0 2px rgba(255, 220, 100, 0.4));
          }
          100% {
            opacity: 1;
            filter: drop-shadow(0 0 8px rgba(255, 225, 120, 0.9));
          }
        }
      `}</style>
    </div>
  );
}
