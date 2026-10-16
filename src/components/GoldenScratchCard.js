'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { triggerRosePetalBurst } from './RosePetalShower';

export default function GoldenScratchCard({ targetDate = '2026-11-12T11:30:00' }) {
  const [isScratched, setIsScratched] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isMounted, setIsMounted] = useState(false);
  const canvasRef = useRef(null);
  const isDrawingRef = useRef(false);

  useEffect(() => {
    setIsMounted(true);
    const target = new Date(targetDate).getTime();
    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = target - now;
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };
    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  // Initialize Canvas Gold Foil Layer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || isScratched) return;
    const ctx = canvas.getContext('2d');

    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    canvas.width = width * 2;
    canvas.height = height * 2;
    ctx.scale(2, 2);

    // Rich gold metallic gradient matching Canva
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#f9e29a');
    grad.addColorStop(0.25, '#d4af37');
    grad.addColorStop(0.5, '#c59b27');
    grad.addColorStop(0.75, '#e5b842');
    grad.addColorStop(1, '#b0821c');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Gold sparkle noise & texture
    for (let i = 0; i < 600; i++) {
      ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255, 255, 255, 0.25)' : 'rgba(108, 33, 24, 0.12)';
      ctx.fillRect(Math.random() * width, Math.random() * height, 1.5, 1.5);
    }

    // "Scratch" script text matching Screenshot 2
    ctx.font = 'italic 26px "Great Vibes", "Alex Brush", cursive';
    ctx.fillStyle = 'rgba(108, 33, 24, 0.75)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Scratch', width / 2, height / 2);
  }, [isScratched]);

  const handleReveal = (e) => {
    if (isScratched) return;
    setIsScratched(true);
    const rect = e?.currentTarget?.getBoundingClientRect();
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
    const y = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;
    triggerRosePetalBurst(x, y, 40);
  };

  const scratchAt = (clientX, clientY) => {
    const canvas = canvasRef.current;
    if (!canvas || isScratched) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();

    // Check scratch percentage
    try {
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let transparentPixels = 0;
      for (let i = 3; i < imgData.data.length; i += 16) {
        if (imgData.data[i] === 0) transparentPixels++;
      }
      const totalSampled = imgData.data.length / 16;
      if (transparentPixels / totalSampled > 0.35) {
        setIsScratched(true);
        triggerRosePetalBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 45);
      }
    } catch (err) {}
  };

  const handlePointerDown = (e) => {
    isDrawingRef.current = true;
    scratchAt(e.clientX, e.clientY);
  };

  const handlePointerMove = (e) => {
    if (!isDrawingRef.current) return;
    scratchAt(e.clientX, e.clientY);
  };

  const handlePointerUp = () => {
    isDrawingRef.current = false;
  };

  return (
    <div className="scratch-card-wrapper">
      <div className="card-outer-box" onClick={!isScratched ? handleReveal : undefined}>
        {/* Revealed Content: Countdown Timer & Blessing */}
        <div className="revealed-countdown-content">
          <p className="countdown-headline font-cinzel">Counting Down to the Big Day</p>
          <div className="countdown-grid">
            <div className="countdown-pill">
              <span className="pill-num font-festive">{isMounted ? timeLeft.days : '0'}</span>
              <span className="pill-lbl font-cinzel">Days</span>
            </div>
            <span className="pill-colon">:</span>
            <div className="countdown-pill">
              <span className="pill-num font-festive">
                {isMounted ? String(timeLeft.hours).padStart(2, '0') : '00'}
              </span>
              <span className="pill-lbl font-cinzel">Hours</span>
            </div>
            <span className="pill-colon">:</span>
            <div className="countdown-pill">
              <span className="pill-num font-festive">
                {isMounted ? String(timeLeft.minutes).padStart(2, '0') : '00'}
              </span>
              <span className="pill-lbl font-cinzel">Mins</span>
            </div>
            <span className="pill-colon">:</span>
            <div className="countdown-pill">
              <span className="pill-num font-festive">
                {isMounted ? String(timeLeft.seconds).padStart(2, '0') : '00'}
              </span>
              <span className="pill-lbl font-cinzel">Secs</span>
            </div>
          </div>
          <p className="countdown-blessing font-script">Shubh Vivah • Save The Date ✨</p>
        </div>

        {/* Scratchable Gold Foil Surface matching Screenshot 2 */}
        <AnimatePresence>
          {!isScratched && (
            <motion.div
              className="gold-foil-overlay"
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.6 }}
            >
              <canvas
                ref={canvasRef}
                className="scratch-canvas"
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerUp}
              />
              <div className="tap-hint font-cinzel">Tap or Scratch to Reveal ✨</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style jsx>{`
        .scratch-card-wrapper {
          width: 100%;
          max-width: 380px;
          margin: 0.6rem auto 1.2rem;
          display: flex;
          justify-content: center;
        }

        .card-outer-box {
          position: relative;
          width: 290px;
          height: 105px;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 8px 24px rgba(178, 14, 0, 0.15), 0 2px 8px rgba(0, 0, 0, 0.1);
          border: 1.5px solid #d4af37;
          cursor: pointer;
          background: linear-gradient(135deg, #fff9f0 0%, #fdf5e6 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          user-select: none;
        }

        .revealed-countdown-content {
          width: 100%;
          padding: 0.6rem 0.8rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .countdown-headline {
          font-size: 0.68rem;
          letter-spacing: 0.12em;
          color: #8c6e67;
          text-transform: uppercase;
          font-weight: 700;
          margin-bottom: 0.25rem;
        }

        .countdown-grid {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.35rem;
        }

        .countdown-pill {
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: 44px;
        }

        .pill-num {
          font-size: 1.55rem;
          line-height: 1;
          color: #b20e00;
          font-weight: 700;
        }

        .pill-lbl {
          font-size: 0.6rem;
          color: #6c2118;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-top: 2px;
          font-weight: 700;
        }

        .pill-colon {
          font-size: 1.2rem;
          color: #d4af37;
          font-weight: 700;
          margin-top: -6px;
        }

        .countdown-blessing {
          font-size: 1.15rem;
          color: #b20e00;
          margin-top: 0.2rem;
        }

        .gold-foil-overlay {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 10;
        }

        .scratch-canvas {
          width: 100%;
          height: 100%;
          display: block;
        }

        .tap-hint {
          position: absolute;
          bottom: 6px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 0.62rem;
          color: rgba(108, 33, 24, 0.85);
          letter-spacing: 0.08em;
          font-weight: 700;
          text-transform: uppercase;
          pointer-events: none;
          background: rgba(255, 255, 255, 0.4);
          padding: 1px 8px;
          border-radius: 9999px;
        }
      `}</style>
    </div>
  );
}
