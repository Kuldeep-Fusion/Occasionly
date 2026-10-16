'use client';

import { useState } from 'react';
import confetti from 'canvas-confetti';
import { triggerRosePetalBurst } from './RosePetalShower';

export default function IndianEnvelopeModal({ isOpen, onOpen, onPlayAudio }) {
  const [isOpening, setIsOpening] = useState(false);

  if (!isOpen) return null;

  const handleEnterClick = (e) => {
    if (isOpening) return;
    setIsOpening(true);

    const x = e?.clientX || (typeof window !== 'undefined' ? window.innerWidth / 2 : 200);
    const y = e?.clientY || (typeof window !== 'undefined' ? window.innerHeight / 2 : 300);

    // Trigger explosive pink rose petal burst
    triggerRosePetalBurst(x, y, 70);

    // Trigger golden and crimson Indian wedding confetti
    try {
      confetti({
        particleCount: 150,
        spread: 120,
        origin: { y: 0.6 },
        colors: ['#b20e00', '#d4af37', '#f3e5ab', '#ff80ab', '#e91e63'],
      });
    } catch (e) {}

    // Immediately trigger audio on direct user gesture
    if (onPlayAudio) {
      onPlayAudio();
    }

    // Allow the entrance animation to finish gracefully (850ms) before unmounting
    setTimeout(() => {
      onOpen();
    }, 850);
  };

  return (
    <div className={`entry-overlay ${isOpening ? 'fade-out' : ''}`}>
      <div className="entry-card indian-card-frame">
        {/* Background Mandala & Texture */}
        <div className="mandala-bg"></div>

        {/* Top Canopy Floral Garland */}
        <img
          src="/canva_assets/e5f0e052b9c2aeeea3beb94ccaa310fa.png"
          alt=""
          className="modal-top-garland"
          aria-hidden="true"
        />

        {/* Lord Ganesha blessing at the very top */}
        <div className="ganesha-wrapper">
          <img
            src="/canva_assets/6fe044cc9ab9669f60839f5daae6cae7.png"
            alt="Lord Ganesha"
            className="ganesha-img animate-float"
          />
        </div>

        <p className="auspicious-shloka font-shloka">
          ॥ श्री गणेशाय नमः ॥
        </p>

        {/* Big Wedding Hashtag Logo */}
        <div className="hashtag-box">
          <h1 className="hashtag-title font-hashtag">#SaAnj</h1>
          <div className="hashtag-glow"></div>
        </div>

        <h2 className="couple-names-header font-couple">
          Sahil <span className="amp">&amp;</span> Anjali
        </h2>

        <div className="wedding-date-tag font-cinzel">
          <span>12th &amp; 13th NOVEMBER 2026</span>
          <small>GREATER NOIDA WEST</small>
        </div>

        {/* Interactive Enter Button with Sound */}
        <button
          onClick={handleEnterClick}
          className="enter-btn animate-pulse-glow"
          aria-label="Tap to enter wedding invitation with music"
        >
          <span className="btn-music-icon">🎵</span>
          <div className="btn-text-content">
            <span className="btn-main-text font-cinzel">TAP TO ENTER</span>
            <span className="btn-sub-text">WITH MUSIC</span>
          </div>
        </button>

        <p className="enter-hint">Click anywhere or tap button to start music &amp; view card</p>
      </div>

      <style jsx>{`
        .entry-overlay {
          position: fixed;
          inset: 0;
          z-index: 99990;
          background: radial-gradient(circle at center, #6c2118 0%, #3e0e08 70%, #200502 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          transition: opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1), transform 0.85s cubic-bezier(0.16, 1, 0.3, 1), filter 0.85s ease;
        }
        .entry-overlay.fade-out {
          opacity: 0;
          transform: scale(1.08) translateY(-15px);
          filter: blur(4px);
          pointer-events: none;
        }
        .entry-card {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 480px;
          min-height: 560px;
          background: #fdfbf7;
          border-radius: 28px;
          padding: 3.2rem 2rem 2.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.4), 0 0 40px rgba(212, 175, 55, 0.3);
          overflow: hidden;
        }
        .modal-top-garland {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          width: 100%;
          height: auto;
          max-height: 85px;
          object-fit: cover;
          opacity: 0.85;
          pointer-events: none;
          border-top-left-radius: 28px;
          border-top-right-radius: 28px;
        }
        .mandala-bg {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(#d4af37 1px, transparent 1px);
          background-size: 24px 24px;
          opacity: 0.15;
          pointer-events: none;
        }
        .ganesha-wrapper {
          width: 80px;
          height: 80px;
          margin-bottom: 0.5rem;
          position: relative;
          z-index: 3;
        }
        .ganesha-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          filter: drop-shadow(0 4px 10px rgba(178, 14, 0, 0.25));
        }
        .auspicious-shloka {
          font-size: 1.15rem;
          color: #b20e00;
          margin-bottom: 1.2rem;
          letter-spacing: 0.05em;
        }
        .hashtag-box {
          position: relative;
          margin-bottom: 0.8rem;
        }
        .hashtag-title {
          font-size: 4.8rem;
          line-height: 1;
          color: #b20e00;
          letter-spacing: 0.02em;
          text-shadow: 2px 2px 0px #ffe5b4, 4px 4px 15px rgba(178, 14, 0, 0.3);
        }
        .couple-names-header {
          font-size: 2.2rem;
          color: #6c2118;
          font-weight: 700;
          margin-bottom: 1.2rem;
          line-height: 1.2;
        }
        .amp {
          font-family: var(--font-script);
          color: #d4af37;
          font-size: 2.4rem;
        }
        .wedding-date-tag {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          background: rgba(108, 33, 24, 0.06);
          border: 1px solid rgba(212, 175, 55, 0.4);
          padding: 0.6rem 1.4rem;
          border-radius: 9999px;
          margin-bottom: 2rem;
        }
        .wedding-date-tag span {
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          color: #6c2118;
        }
        .wedding-date-tag small {
          font-size: 0.7rem;
          letter-spacing: 0.1em;
          color: #8c6e67;
        }
        .enter-btn {
          display: inline-flex;
          align-items: center;
          gap: 1rem;
          background: linear-gradient(135deg, #b20e00 0%, #6c2118 100%);
          border: 2px solid #e6ca65;
          padding: 1rem 2.2rem;
          border-radius: 9999px;
          color: #ffffff;
          cursor: pointer;
          box-shadow: 0 8px 25px rgba(178, 14, 0, 0.45);
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .enter-btn:hover {
          transform: scale(1.06);
          box-shadow: 0 12px 35px rgba(178, 14, 0, 0.6);
        }
        .btn-music-icon {
          font-size: 1.8rem;
          animation: spinSlow 6s linear infinite;
        }
        .btn-text-content {
          text-align: left;
        }
        .btn-main-text {
          display: block;
          font-size: 1.1rem;
          font-weight: 800;
          letter-spacing: 0.1em;
        }
        .btn-sub-text {
          font-family: var(--font-sans);
          display: block;
          font-size: 0.65rem;
          letter-spacing: 0.15em;
          opacity: 0.9;
        }
        .enter-hint {
          font-size: 0.75rem;
          color: #8c6e67;
          margin-top: 1.5rem;
        }
        @media (max-width: 480px) {
          .hashtag-title {
            font-size: 3.8rem;
          }
          .couple-names-header {
            font-size: 1.8rem;
          }
          .entry-card {
            padding: 2.2rem 1.2rem;
          }
        }
      `}</style>
    </div>
  );
}
