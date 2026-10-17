'use client';

import { useState, useEffect } from 'react';

/**
 * Countdown Card Component
 * 
 * Clean, direct live countdown timer showing Days, Hours, Mins, and Secs.
 */
export default function GoldenScratchCard({ targetDate = '2026-11-12T11:30:00' }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
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
    setIsMounted(true);
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="countdown-card-wrapper">
      <div className="countdown-card-box">
        <div className="countdown-timer">
          <div className="timer-block">
            <span className="timer-num font-festive">{isMounted ? timeLeft.days : '0'}</span>
            <span className="timer-lbl font-cinzel">Days</span>
          </div>
          <span className="timer-sep">:</span>
          <div className="timer-block">
            <span className="timer-num font-festive">
              {isMounted ? String(timeLeft.hours).padStart(2, '0') : '00'}
            </span>
            <span className="timer-lbl font-cinzel">Hours</span>
          </div>
          <span className="timer-sep">:</span>
          <div className="timer-block">
            <span className="timer-num font-festive">
              {isMounted ? String(timeLeft.minutes).padStart(2, '0') : '00'}
            </span>
            <span className="timer-lbl font-cinzel">Mins</span>
          </div>
          <span className="timer-sep">:</span>
          <div className="timer-block">
            <span className="timer-num font-festive">
              {isMounted ? String(timeLeft.seconds).padStart(2, '0') : '00'}
            </span>
            <span className="timer-lbl font-cinzel">Secs</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .countdown-card-wrapper {
          width: 100%;
          max-width: 320px;
          margin: 0.8rem auto 1rem;
          display: flex;
          justify-content: center;
        }

        .countdown-card-box {
          position: relative;
          width: 300px;
          height: 85px;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(108, 33, 24, 0.12), 0 0 15px rgba(212, 175, 55, 0.2);
          border: 1.5px solid #d4af37;
          background: linear-gradient(135deg, #fffaf3 0%, #fef5e7 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          user-select: none;
          padding: 0.5rem 0.8rem;
        }

        .countdown-timer {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .timer-block {
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: 44px;
        }

        .timer-num {
          font-size: 1.7rem;
          line-height: 1;
          color: #b20e00;
          font-weight: 700;
        }

        .timer-lbl {
          font-size: 0.65rem;
          color: #6c2118;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-top: 3px;
          font-weight: 700;
        }

        .timer-sep {
          font-size: 1.5rem;
          line-height: 1;
          color: #c59b27;
          font-weight: 700;
          margin-bottom: 0.8rem;
        }
      `}</style>
    </div>
  );
}
