'use client';

import Image from 'next/image';

export default function VenueSection() {
  const mapsUrl = 'https://maps.google.com/?q=4%20Pennsylvania%20Plaza%2C%20New%20York%2C%20NY%2010001';
  const directionsUrl = 'https://www.google.com/maps/dir/?api=1&destination=4%20Pennsylvania%20Plaza%2C%20New%20York%2C%20NY%2010001';

  return (
    <section id="venue" className="venue-section" aria-label="Wedding Venue & Location">
      <div className="section-header">
        <span className="section-badge font-cinzel">VENUE</span>
        <h2 className="section-title font-pinyon">Location</h2>
      </div>

      <div className="venue-card">
        {/* Barn / Venue Illustration */}
        <div className="venue-image-wrapper">
          <img
            src="/assets/venue-barn.png"
            alt="Venue Barn Illustration"
            className="venue-image"
          />
        </div>

        <div className="venue-content">
          <span className="day-tag font-cinzel">Day 1</span>
          <h3 className="venue-name font-cormorant">Madison Square Garden</h3>
          <p className="hall-name font-great-vibes">the grand room</p>
          
          <p className="venue-address">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c59b27" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            4 Pennsylvania Plaza, New York, NY 10001
          </p>

          <div className="timing-pills">
            <div className="pill">
              <span className="pill-label font-cinzel">Ceremony</span>
              <span className="pill-time">14:08</span>
            </div>
            <div className="pill">
              <span className="pill-label font-cinzel">Reception</span>
              <span className="pill-time">13:11</span>
            </div>
          </div>

          <div className="venue-actions">
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              Open in Google Maps
            </a>

            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="3 11 22 2 13 21 11 13 3 11" />
              </svg>
              Get Directions
            </a>
          </div>
        </div>

        {/* Embedded Map */}
        <div className="map-frame">
          <iframe
            title="Venue Location Map"
            width="100%"
            height="260"
            style={{ border: 0, borderRadius: '16px' }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src="https://maps.google.com/maps?q=4+Pennsylvania+Plaza,+New+York,+NY+10001&t=&z=15&ie=UTF8&iwloc=&output=embed"
          ></iframe>
        </div>
      </div>

      <style jsx>{`
        .venue-section {
          padding: 3.5rem 1.5rem;
          margin: 0 auto;
          max-width: 680px;
        }
        .section-header {
          text-align: center;
          margin-bottom: 2rem;
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
        .venue-card {
          background: rgba(255, 255, 255, 0.88);
          backdrop-filter: blur(8px);
          border-radius: 24px;
          border: 1px solid rgba(197, 155, 39, 0.35);
          box-shadow: 0 12px 35px rgba(117, 0, 0, 0.08);
          overflow: hidden;
          padding: 2.2rem;
          text-align: center;
        }
        .venue-image-wrapper {
          max-width: 340px;
          margin: 0 auto 1.5rem;
        }
        .venue-image {
          width: 100%;
          height: auto;
          object-fit: contain;
          filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.08));
        }
        .day-tag {
          display: inline-block;
          font-size: 0.75rem;
          letter-spacing: 0.15em;
          background: rgba(117, 0, 0, 0.08);
          color: #750000;
          padding: 0.3rem 0.9rem;
          border-radius: 9999px;
          margin-bottom: 0.8rem;
          font-weight: 600;
        }
        .venue-name {
          font-size: 2.2rem;
          color: #750000;
          font-weight: 600;
          margin-bottom: 0.2rem;
        }
        .hall-name {
          font-size: 1.8rem;
          color: #990303;
          margin-bottom: 1.2rem;
        }
        .venue-address {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.95rem;
          color: #554d48;
          margin-bottom: 1.5rem;
          max-width: 90%;
        }
        .timing-pills {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }
        .pill {
          background: #faf6f0;
          border: 1px solid rgba(197, 155, 39, 0.3);
          border-radius: 12px;
          padding: 0.6rem 1.2rem;
          min-width: 110px;
        }
        .pill-label {
          display: block;
          font-size: 0.7rem;
          letter-spacing: 0.12em;
          color: #8c827a;
          margin-bottom: 0.2rem;
        }
        .pill-time {
          font-family: var(--font-cormorant);
          font-size: 1.3rem;
          font-weight: 600;
          color: #750000;
        }
        .venue-actions {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 2rem;
        }
        .map-frame {
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
          border: 1px solid rgba(197, 155, 39, 0.25);
        }
        @media (max-width: 600px) {
          .section-title {
            font-size: 3.2rem;
          }
          .venue-card {
            padding: 1.5rem 1rem;
          }
          .venue-name {
            font-size: 1.8rem;
          }
          .venue-actions {
            flex-direction: column;
          }
          .btn-primary, .btn-secondary {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
