'use client';

import { useState } from 'react';
import confetti from 'canvas-confetti';
import { triggerRosePetalBurst } from './RosePetalShower';

export default function RoyalEnvelopeEntrance({ isOpen, onOpen, onPlayAudio }) {
  const [isOpening, setIsOpening] = useState(false);
  const [isUnsealed, setIsUnsealed] = useState(false);

  if (!isOpen) return null;

  const handleEnvelopeClick = (e) => {
    if (isOpening) return;
    setIsOpening(true);

    const x = e?.clientX || (typeof window !== 'undefined' ? window.innerWidth / 2 : 200);
    const y = e?.clientY || (typeof window !== 'undefined' ? window.innerHeight / 2 : 300);

    // 1. Play soundtrack immediately on direct touch/click
    if (onPlayAudio) {
      onPlayAudio();
    }

    // 2. Unseal wax stamp after slight touch feedback
    setTimeout(() => {
      setIsUnsealed(true);
    }, 150);

    // 3. Trigger rose petals and golden confetti shower
    setTimeout(() => {
      triggerRosePetalBurst(x, y, 40);
      try {
        confetti({
          particleCount: 100,
          spread: 100,
          origin: { y: 0.55 },
          colors: ['#b20e00', '#d4af37', '#fdf3d0', '#ff80ab', '#e91e63'],
        });
      } catch (err) {}
    }, 350);

    // 4. Complete opening transition into the wedding card
    setTimeout(() => {
      onOpen();
    }, 1250);
  };

  return (
    <div
      className={`envelope-entrance-backdrop ${isOpening ? 'fade-out-screen' : ''}`}
      onClick={handleEnvelopeClick}
      role="button"
      tabIndex={0}
      aria-label="Tap to open wedding envelope invitation"
    >
      {/* Ambient background glow & sparkles */}
      <div className="ambient-radial-glow"></div>

      <div className="envelope-scene">
        {/* Envelope 3D Container */}
        <div className={`royal-envelope ${isOpening ? 'is-opening' : ''} ${isUnsealed ? 'is-unsealed' : ''}`}>
          {/* Back of Envelope */}
          <div className="envelope-back"></div>

          {/* Invitation Card tucked inside, slides up on click */}
          <div className="envelope-letter">
            <div className="letter-header">
              <img
                src="/canva_assets/6fe044cc9ab9669f60839f5daae6cae7.png"
                alt="Ganesha"
                className="letter-ganesha"
              />
              <span className="letter-shloka font-shloka">॥ श्री गणेशाय नमः ॥</span>
            </div>
            <div className="letter-title font-hashtag">#SaAnj</div>
            <div className="letter-names font-alex">Sahil &amp; Anjali</div>
            <div className="letter-date font-festive">12 &amp; 13 Nov 2026</div>
          </div>

          {/* Front triangular pocket folds */}
          <div className="envelope-pocket">
            <div className="pocket-fold-left"></div>
            <div className="pocket-fold-right"></div>
            <div className="pocket-fold-bottom"></div>
          </div>

          {/* Front decorative invitation typography on the envelope pocket */}
          <div className="envelope-front-content">
            <div className="envelope-monogram font-cinzel">WEDDING INVITATION</div>
            <div className="envelope-couple font-alex">Sahil &amp; Anjali</div>
            <div className="envelope-date font-cinzel">12th &amp; 13th November 2026</div>
            <div className="envelope-venue font-festive">Omnia by Tivoli • Greater Noida West</div>
          </div>

          {/* Top Flap (folds backwards in 3D when opened) */}
          <div className="envelope-flap">
            <div className="flap-inner-shadow"></div>
          </div>

          {/* Golden Royal Wax Seal */}
          <div className={`envelope-wax-seal ${isUnsealed ? 'seal-break' : ''}`}>
            <div className="wax-seal-crest">
              <span className="crest-symbol">ॐ</span>
              <span className="crest-text font-cinzel">#SaAnj</span>
            </div>
            <div className="wax-seal-ring"></div>
            <div className="wax-seal-shine"></div>
          </div>
        </div>

        {/* Tap Prompt with audio indicator */}
        <div className="tap-to-open-prompt">
          <div className="prompt-badge">
            <span className="prompt-music-icon animate-pulse">🎵</span>
            <span className="prompt-text font-cinzel">
              {isOpening ? 'OPENING INVITATION...' : 'TAP ENVELOPE TO OPEN WITH MUSIC'}
            </span>
          </div>
          <p className="prompt-hint">Experience Sahil &amp; Anjali&apos;s Royal Wedding</p>
        </div>
      </div>

      <style jsx>{`
        .envelope-entrance-backdrop {
          position: fixed;
          inset: 0;
          z-index: 999999;
          background: radial-gradient(circle at center, #421008 0%, #200401 70%, #100201 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          cursor: pointer;
          user-select: none;
          transition: opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.75s cubic-bezier(0.16, 1, 0.3, 1),
            filter 0.75s ease;
        }

        .envelope-entrance-backdrop.fade-out-screen {
          opacity: 0;
          transform: scale(1.08);
          filter: blur(8px);
          pointer-events: none;
        }

        .ambient-radial-glow {
          position: absolute;
          width: 520px;
          height: 520px;
          background: radial-gradient(circle, rgba(212, 175, 55, 0.18) 0%, transparent 70%);
          filter: blur(40px);
          pointer-events: none;
          animation: ambientPulse 4s ease-in-out infinite;
        }

        @keyframes ambientPulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.6;
          }
          50% {
            transform: scale(1.15);
            opacity: 0.9;
          }
        }

        .envelope-scene {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          perspective: 1200px;
        }

        /* 3D Envelope Body */
        .royal-envelope {
          position: relative;
          width: 360px;
          height: 240px;
          background: #7a0e05;
          border-radius: 12px;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6), 0 0 35px rgba(212, 175, 55, 0.25);
          transform-style: preserve-3d;
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }

        .royal-envelope:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 30px 70px rgba(0, 0, 0, 0.7), 0 0 45px rgba(212, 175, 55, 0.4);
        }

        /* Back plate of envelope */
        .envelope-back {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #630a03 0%, #4a0601 100%);
          border-radius: 12px;
          border: 1.5px solid #d4af37;
        }

        /* Letter inside envelope */
        .envelope-letter {
          position: absolute;
          top: 10px;
          left: 18px;
          right: 18px;
          height: 220px;
          background: #fdfaf3;
          border-radius: 8px;
          border: 1px solid #d4af37;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          text-align: center;
          z-index: 2;
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease;
        }

        .letter-header {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          margin-bottom: 0.3rem;
        }

        .letter-ganesha {
          width: 26px;
          height: 26px;
          object-fit: contain;
        }

        .letter-shloka {
          font-size: 0.75rem;
          color: #b20e00;
        }

        .letter-title {
          font-size: 2.2rem;
          line-height: 1;
          color: #b20e00;
          margin-bottom: 0.1rem;
        }

        .letter-names {
          font-size: 2.2rem;
          color: #6c2118;
          font-weight: 700;
          line-height: 1.1;
        }

        .letter-date {
          font-size: 0.95rem;
          color: #42221b;
          margin-top: 0.2rem;
          font-weight: 700;
        }

        /* Envelope pocket front */
        .envelope-pocket {
          position: absolute;
          inset: 0;
          border-radius: 12px;
          overflow: hidden;
          z-index: 4;
          pointer-events: none;
        }

        .pocket-fold-left {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 120px 0 120px 180px;
          border-color: transparent transparent transparent #871207;
          filter: drop-shadow(2px 0 3px rgba(0, 0, 0, 0.15));
        }

        .pocket-fold-right {
          position: absolute;
          top: 0;
          bottom: 0;
          right: 0;
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 120px 180px 120px 0;
          border-color: transparent #871207 transparent transparent;
          filter: drop-shadow(-2px 0 3px rgba(0, 0, 0, 0.15));
        }

        .pocket-fold-bottom {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 0 180px 130px 180px;
          border-color: transparent transparent #6e0c03 transparent;
          filter: drop-shadow(0 -3px 4px rgba(0, 0, 0, 0.2));
        }

        /* Front details on envelope */
        .envelope-front-content {
          position: absolute;
          bottom: 16px;
          left: 0;
          right: 0;
          z-index: 5;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          pointer-events: none;
        }

        .envelope-monogram {
          font-size: 0.65rem;
          letter-spacing: 0.25em;
          color: #e6ca65;
          margin-bottom: 0.2rem;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);
        }

        .envelope-couple {
          font-size: 2.2rem;
          color: #fff4d4;
          line-height: 1;
          letter-spacing: 0.03em;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
        }

        .envelope-date {
          font-size: 0.7rem;
          letter-spacing: 0.12em;
          color: #ffd777;
          margin-top: 0.2rem;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);
        }

        .envelope-venue {
          font-size: 0.75rem;
          color: #ffecd1;
          margin-top: 0.1rem;
          opacity: 0.9;
        }

        /* Top triangular flap */
        .envelope-flap {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 135px 180px 0 180px;
          border-color: #941509 transparent transparent transparent;
          transform-origin: top center;
          transition: transform 0.65s cubic-bezier(0.4, 0, 0.2, 1),
            border-color 0.4s ease;
          z-index: 6;
          filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.35));
        }

        /* Flap opening 3D state */
        .royal-envelope.is-opening .envelope-flap {
          transform: rotateX(180deg);
          border-color: #580a03 transparent transparent transparent;
          z-index: 1;
        }

        /* Letter sliding out */
        .royal-envelope.is-opening .envelope-letter {
          transform: translateY(-90px) scale(1.08);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
        }

        /* Golden Wax Seal */
        .envelope-wax-seal {
          position: absolute;
          top: 135px;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 68px;
          height: 68px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 35%, #ffd777 0%, #c59b27 60%, #8c6812 100%);
          border: 2px solid #fff2b8;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.5), inset 0 2px 4px rgba(255, 255, 255, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 7;
          transition: transform 0.35s ease, opacity 0.35s ease, filter 0.35s ease;
        }

        .wax-seal-crest {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: #3b2102;
          text-shadow: 0 1px 0 rgba(255, 255, 255, 0.4);
        }

        .crest-symbol {
          font-size: 1.35rem;
          line-height: 1;
          font-weight: 800;
        }

        .crest-text {
          font-size: 0.58rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          margin-top: 1px;
        }

        .wax-seal-ring {
          position: absolute;
          inset: 3px;
          border: 1px dashed rgba(60, 30, 0, 0.45);
          border-radius: 50%;
        }

        .wax-seal-shine {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          box-shadow: 0 0 20px rgba(255, 215, 119, 0.8);
          animation: sealGlow 2s ease-in-out infinite;
        }

        @keyframes sealGlow {
          0%, 100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 0.95;
            transform: scale(1.08);
          }
        }

        .envelope-wax-seal.seal-break {
          transform: translate(-50%, -50%) scale(1.3);
          opacity: 0;
          filter: brightness(2) blur(3px);
        }

        /* Tap to open prompt */
        .tap-to-open-prompt {
          margin-top: 2.2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }

        .prompt-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          background: rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(8px);
          border: 1.5px solid #d4af37;
          padding: 0.65rem 1.6rem;
          border-radius: 9999px;
          color: #fff4d4;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
          transition: transform 0.25s ease;
        }

        .prompt-badge:hover {
          transform: scale(1.05);
          background: rgba(255, 255, 255, 0.2);
          border-color: #ffd777;
        }

        .prompt-music-icon {
          font-size: 1.2rem;
        }

        .prompt-text {
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.12em;
        }

        .prompt-hint {
          font-size: 0.75rem;
          color: #d1b5a5;
          letter-spacing: 0.05em;
        }

        @media (max-width: 440px) {
          .royal-envelope {
            width: 320px;
            height: 215px;
          }
          .pocket-fold-left,
          .pocket-fold-right {
            border-width: 108px 0 108px 160px;
          }
          .pocket-fold-bottom {
            border-width: 0 160px 115px 160px;
          }
          .envelope-flap {
            border-width: 120px 160px 0 160px;
          }
          .envelope-wax-seal {
            top: 120px;
            width: 60px;
            height: 60px;
          }
          .envelope-couple {
            font-size: 1.9rem;
          }
          .prompt-text {
            font-size: 0.72rem;
            letter-spacing: 0.08em;
          }
        }
      `}</style>
    </div>
  );
}
