'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Countdown({ targetDate = '2026-11-12T11:30:00' }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isMounted, setIsMounted] = useState(false);

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
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <motion.div
      className="save-moment-container"
      initial={{ opacity: 0, y: 35, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.25 }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
    >
      <h3 className="save-moment-title font-festive">Save this Moment</h3>

      {/* Golden Ornate Plaque for Dates */}
      <div className="date-plaque">
        <span className="date-plaque-text font-festive">12th &amp; 13th Nov 2026</span>
      </div>

      {/* Golden Countdown Banner */}
      <div className="golden-timer-banner">
        <div className="timer-unit">
          <span className="unit-number font-festive">{isMounted ? timeLeft.days : '0'}</span>
          <span className="unit-label font-cinzel">Days</span>
        </div>
        <span className="unit-sep">:</span>
        <div className="timer-unit">
          <span className="unit-number font-festive">
            {isMounted ? String(timeLeft.hours).padStart(2, '0') : '00'}
          </span>
          <span className="unit-label font-cinzel">Hours</span>
        </div>
        <span className="unit-sep">:</span>
        <div className="timer-unit">
          <span className="unit-number font-festive">
            {isMounted ? String(timeLeft.minutes).padStart(2, '0') : '00'}
          </span>
          <span className="unit-label font-cinzel">Mins</span>
        </div>
        <span className="unit-sep">:</span>
        <div className="timer-unit">
          <span className="unit-number font-festive">
            {isMounted ? String(timeLeft.seconds).padStart(2, '0') : '00'}
          </span>
          <span className="unit-label font-cinzel">Secs</span>
        </div>
      </div>

      <style jsx>{`
        .save-moment-container {
          text-align: center;
          margin: 1.8rem auto 1rem;
          width: 100%;
          max-width: 440px;
        }
        .save-moment-title {
          font-size: 2.2rem;
          color: #b20e00;
          font-weight: 700;
          letter-spacing: 0.02em;
          margin-bottom: 1rem;
        }
        .date-plaque {
          position: relative;
          background: #fdf6ec;
          border: 1.5px solid #d4af37;
          border-radius: 14px;
          padding: 0.8rem 1.8rem;
          margin: 0 auto 1.2rem;
          display: inline-block;
          box-shadow: 0 4px 15px rgba(212, 175, 55, 0.25);
        }
        .date-plaque-text {
          font-size: 1.6rem;
          color: #6c2118;
          font-weight: 700;
          letter-spacing: 0.04em;
        }
        .golden-timer-banner {
          background: linear-gradient(135deg, #e5b842 0%, #d4af37 50%, #c19b26 100%);
          border: 1.5px solid #f9e29a;
          border-radius: 12px;
          padding: 0.75rem 1rem;
          display: flex;
          align-items: center;
          justify-content: space-around;
          box-shadow: 0 6px 18px rgba(193, 155, 38, 0.35);
          max-width: 360px;
          margin: 0 auto;
        }
        .timer-unit {
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: 48px;
        }
        .unit-number {
          font-size: 1.8rem;
          font-weight: 700;
          line-height: 1;
          color: #3e1b12;
        }
        .unit-label {
          font-size: 0.65rem;
          color: #58331d;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-top: 2px;
        }
        .unit-sep {
          font-size: 1.5rem;
          color: #58331d;
          font-weight: 700;
          margin-top: -8px;
        }
      `}</style>
    </motion.div>
  );
}
