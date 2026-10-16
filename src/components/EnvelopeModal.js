'use client';

import { useState, useRef } from 'react';
import confetti from 'canvas-confetti';

export default function EnvelopeModal({ onOpen, isOpen }) {
  const [isOpening, setIsOpening] = useState(false);
  const videoRef = useRef(null);

  if (!isOpen) return null;

  const handleOpenClick = () => {
    setIsOpening(true);

    // Try playing envelope video animation if loaded
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }

    // Trigger romantic confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#750000', '#d4af37', '#f3e5ab', '#e8cfc0', '#ffffff'],
      });
    } catch (e) {
      // fallback if confetti fails
    }

    // Transition smoothly after short opening delay
    setTimeout(() => {
      onOpen();
    }, 1200);
  };

  return (
    <div className={`envelope-overlay ${isOpening ? 'fade-out' : ''}`}>
      <div className="envelope-container">
        {/* Ambient Video or Envelope Background */}
        <div className="media-wrapper">
          <video
            ref={videoRef}
            src="/assets/ivory-glow-envelope.mp4"
            playsInline
            muted
            className="envelope-video"
            poster="/assets/background.avif"
          />
          <div className="video-scrim"></div>
        </div>

        {/* Content Overlay */}
        <div className="envelope-card-content">
          <div className="monogram">G & A</div>
          
          <p className="salutation">
            Dear Maria,
            <br />
            <span>You&apos;re invited to our wedding</span>
          </p>

          <h1 className="couple-names">
            gregory luce
            <span className="ampersand">&amp;</span>
            anna prito
          </h1>

          <p className="event-date">Friday, December 25, 2026</p>

          {/* Interactive Wax Seal Button */}
          <button
            onClick={handleOpenClick}
            disabled={isOpening}
            className={`wax-seal-btn ${isOpening ? 'unsealing' : ''}`}
            aria-label="Open Invitation"
          >
            <div className="wax-seal-inner">
              <span className="seal-crest">G & A</span>
              <span className="seal-label">{isOpening ? 'Opening...' : 'Tap to Open'}</span>
            </div>
          </button>
        </div>
      </div>

      <style jsx>{`
        .envelope-overlay {
          position: fixed;
          inset: 0;
          z-index: 99999;
          background-color: #f7f3ec;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .envelope-overlay.fade-out {
          opacity: 0;
          transform: scale(1.04);
          pointer-events: none;
        }
        .envelope-container {
          position: relative;
          width: 92%;
          max-width: 520px;
          min-height: 580px;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 25px 60px rgba(74, 0, 0, 0.2), 0 10px 25px rgba(0, 0, 0, 0.08);
          border: 1px solid rgba(197, 155, 39, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          background: #faf7f2;
        }
        .media-wrapper {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }
        .envelope-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(0.97) contrast(1.02);
        }
        .video-scrim {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at center,
            rgba(255, 255, 255, 0.45) 0%,
            rgba(250, 247, 242, 0.82) 100%
          );
        }
        .envelope-card-content {
          position: relative;
          z-index: 2;
          padding: 3rem 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          max-width: 440px;
        }
        .monogram {
          font-family: var(--font-cinzel);
          font-size: 1.1rem;
          font-weight: 600;
          letter-spacing: 0.3em;
          color: #c59b27;
          border-bottom: 1px solid rgba(197, 155, 39, 0.4);
          padding-bottom: 0.3rem;
          margin-bottom: 0.5rem;
        }
        .salutation {
          font-family: var(--font-great-vibes);
          font-size: 2rem;
          line-height: 1.3;
          color: #750000;
          margin: 0;
        }
        .salutation span {
          font-family: var(--font-cormorant);
          font-size: 1.1rem;
          font-style: italic;
          color: #6e645e;
          display: block;
          margin-top: 0.2rem;
        }
        .couple-names {
          font-family: var(--font-pinyon);
          font-size: 3.4rem;
          line-height: 1.1;
          color: #750000;
          font-weight: 400;
          text-transform: lowercase;
          margin: 0.5rem 0;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .ampersand {
          font-family: var(--font-cormorant);
          font-size: 1.8rem;
          color: #c59b27;
          margin: -0.2rem 0;
        }
        .event-date {
          font-family: var(--font-cinzel);
          font-size: 0.95rem;
          letter-spacing: 0.15em;
          color: #750000;
          text-transform: uppercase;
          margin-bottom: 1.5rem;
        }
        .wax-seal-btn {
          position: relative;
          width: 90px;
          height: 90px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 35%, #990303 0%, #750000 60%, #4a0000 100%);
          border: 3px solid #e6ca65;
          box-shadow: 0 8px 25px rgba(117, 0, 0, 0.45), inset 0 2px 4px rgba(255, 255, 255, 0.35);
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          animation: pulseGlow 2.5s infinite;
        }
        .wax-seal-btn:hover {
          transform: scale(1.08);
          box-shadow: 0 12px 30px rgba(117, 0, 0, 0.6), inset 0 2px 6px rgba(255, 255, 255, 0.5);
        }
        .wax-seal-btn.unsealing {
          transform: scale(0.92) rotate(15deg);
          filter: brightness(1.2);
        }
        .wax-seal-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          color: #f7e7b4;
        }
        .seal-crest {
          font-family: var(--font-cinzel);
          font-size: 1.1rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
        }
        .seal-label {
          font-family: var(--font-sans);
          font-size: 0.55rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          opacity: 0.9;
          margin-top: 2px;
        }
      `}</style>
    </div>
  );
}
