'use client';

export default function TimelineSection() {
  const events = [
    {
      time: '14:00',
      title: 'START',
      description: 'We look forward to welcoming everybody with a welcome drink',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="2" x2="12" y2="6" />
          <line x1="12" y1="18" x2="12" y2="22" />
          <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
          <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
          <line x1="2" y1="12" x2="6" y2="12" />
          <line x1="18" y1="12" x2="22" y2="12" />
          <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
          <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
        </svg>
      ),
    },
    {
      time: '15:00',
      title: 'LUNCH',
      description: 'Surprise lunch crafted by culinary masters',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 6l-6 6-6-6" />
          <path d="M12 12v9" />
          <path d="M8 21h8" />
          <circle cx="12" cy="5" r="3" />
        </svg>
      ),
    },
    {
      time: '17:00',
      title: 'PARTY',
      description: 'Let yourself go & celebrate the night away on the dance floor',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 22h8" />
          <path d="M12 15v7" />
          <path d="M12 15a5 5 0 0 0 5-5c0-2-.5-4-2-8H9c-1.5 4-2 6-2 8a5 5 0 0 0 5 5z" />
        </svg>
      ),
    },
    {
      time: '02:00',
      title: 'END',
      description: 'All good things come to an end! Safe travels home',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H8.5a1 1 0 0 0-.8.4L5 11l-5.16.86a1 1 0 0 0-.84.99V16h3" />
          <circle cx="6.5" cy="16.5" r="2.5" />
          <circle cx="16.5" cy="16.5" r="2.5" />
        </svg>
      ),
    },
  ];

  return (
    <section id="timeline" className="timeline-section" aria-label="Wedding Itinerary Timeline">
      <div className="section-header">
        <span className="section-badge font-cinzel">SCHEDULE</span>
        <h2 className="section-title font-pinyon">Timeline</h2>
        <p className="section-subtitle font-great-vibes">What we have planned for you</p>
      </div>

      <div className="timeline-container">
        <div className="timeline-line"></div>

        {events.map((item, index) => (
          <div key={index} className="timeline-item">
            <div className="timeline-icon-box">
              <div className="icon-glow">{item.icon}</div>
            </div>

            <div className="timeline-card">
              <span className="timeline-time font-cinzel">{item.time}</span>
              <h3 className="timeline-event-title font-cinzel">{item.title}</h3>
              <p className="timeline-desc">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .timeline-section {
          padding: 3.5rem 1.5rem;
          margin: 0 auto;
          max-width: 680px;
        }
        .section-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }
        .section-badge {
          font-size: 0.8rem;
          letter-spacing: 0.25em;
          color: #c59b27;
          display: block;
          margin-bottom: 0.2rem;
        }
        .section-title {
          font-size: 4rem;
          color: #750000;
          line-height: 1.1;
          margin: 0;
        }
        .section-subtitle {
          font-size: 1.8rem;
          color: #990303;
          margin-top: 0.2rem;
        }
        .timeline-container {
          position: relative;
          padding: 1.5rem 0;
        }
        .timeline-line {
          position: absolute;
          left: 32px;
          top: 20px;
          bottom: 20px;
          width: 2px;
          background: linear-gradient(180deg, #c59b27 0%, rgba(197, 155, 39, 0.2) 100%);
        }
        .timeline-item {
          position: relative;
          display: flex;
          align-items: flex-start;
          gap: 1.5rem;
          margin-bottom: 2.2rem;
        }
        .timeline-item:last-child {
          margin-bottom: 0;
        }
        .timeline-icon-box {
          position: relative;
          z-index: 2;
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: #ffffff;
          border: 2px solid #c59b27;
          color: #750000;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 14px rgba(197, 155, 39, 0.25);
          flex-shrink: 0;
        }
        .icon-glow {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .timeline-card {
          flex: 1;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(197, 155, 39, 0.3);
          border-radius: 18px;
          padding: 1.4rem 1.6rem;
          box-shadow: 0 6px 20px rgba(117, 0, 0, 0.05);
          transition: transform 0.2s ease, border-color 0.2s ease;
        }
        .timeline-card:hover {
          transform: translateX(4px);
          border-color: #750000;
        }
        .timeline-time {
          display: inline-block;
          font-size: 1.25rem;
          font-weight: 700;
          color: #750000;
          margin-bottom: 0.3rem;
          letter-spacing: 0.05em;
        }
        .timeline-event-title {
          font-size: 1.1rem;
          letter-spacing: 0.15em;
          color: #2c2523;
          margin-bottom: 0.4rem;
        }
        .timeline-desc {
          font-size: 0.95rem;
          color: #6e645e;
          line-height: 1.5;
        }
        @media (max-width: 520px) {
          .timeline-line {
            left: 24px;
          }
          .timeline-icon-box {
            width: 48px;
            height: 48px;
          }
          .timeline-icon-box :global(svg) {
            width: 20px;
            height: 20px;
          }
          .timeline-item {
            gap: 1rem;
          }
          .timeline-card {
            padding: 1.1rem 1.2rem;
          }
        }
      `}</style>
    </section>
  );
}
