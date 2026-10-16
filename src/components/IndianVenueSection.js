'use client';

export default function IndianVenueSection() {
  const mapsUrl = 'https://www.google.com/maps?q=place_id:ChIJC7MBl-bvDDkR0VMPtoOooSI';
  const directionsUrl = 'https://share.google/XMFVZJuQyDXDhpH7A';

  return (
    <section id="venue" className="venue-section" aria-label="Wedding Venue Omnia by Tivoli">
      <div className="section-header">
        <span className="section-badge font-cinzel">CELEBRATION DESTINATION</span>
        <h2 className="section-title font-couple">The Wedding Venue</h2>
        <p className="section-subtitle font-script">We can’t wait to celebrate this Special Occasion with you</p>
      </div>

      <div className="venue-card indian-card-frame">
        {/* Venue Illustration from Canva */}
        <div className="venue-image-box">
          <img
            src="/canva_assets/2812422f84aebe9a52a9f17c6085b2dd.png"
            alt="Omnia by Tivoli Venue"
            className="venue-illustration"
          />
        </div>

        <div className="venue-details">
          <span className="venue-tag font-cinzel">ROYAL BANQUET &amp; LAWNS</span>
          <h3 className="venue-name font-couple">Omnia by Tivoli</h3>
          <p className="venue-address font-cinzel">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#b20e00" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            Sector-2, Greater Noida West, Uttar Pradesh
          </p>

          <div className="action-buttons">
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-royal-primary"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
              className="btn-royal-gold"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="3 11 22 2 13 21 11 13 3 11" />
              </svg>
              Get Directions
            </a>
          </div>
        </div>

        {/* Embedded Interactive Google Map */}
        <div className="map-embed-wrapper">
          <iframe
            title="Omnia by Tivoli Map"
            src="https://maps.google.com/maps?q=Omnia%20by%20Tivoli,%20Sector-2,%20Greater%20Noida%20West&t=&z=15&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="290"
            style={{ border: 0, borderRadius: '16px' }}
            loading="lazy"
            allowFullScreen
          ></iframe>
        </div>

        {/* Family Blessings Signature */}
        <div className="family-blessing-box">
          <div className="blessing-ornament">
            <img src="/canva_assets/9ca67bcd0d33931c481394c7eea55211.png" alt="" className="ornament-img" />
          </div>
          <p className="awaiting-label font-script">Awaiting Your Presence</p>
          <h4 className="family-name font-couple">Jain &amp; Sharma Family</h4>
        </div>
      </div>

      <style jsx>{`
        .venue-section {
          padding: 4rem 1.5rem;
          margin: 0 auto;
          max-width: 760px;
        }
        .section-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }
        .section-badge {
          font-size: 0.85rem;
          letter-spacing: 0.25em;
          color: #d4af37;
          display: block;
          margin-bottom: 0.3rem;
        }
        .section-title {
          font-size: 3.6rem;
          color: #6c2118;
          line-height: 1.1;
          margin: 0;
          font-weight: 700;
        }
        .section-subtitle {
          font-size: 1.9rem;
          color: #b20e00;
          margin-top: 0.3rem;
        }
        .venue-card {
          padding: 3rem 2.2rem;
          background: #ffffff;
          text-align: center;
        }
        .venue-image-box {
          max-width: 420px;
          margin: 0 auto 1.5rem;
        }
        .venue-illustration {
          width: 100%;
          height: auto;
          object-fit: contain;
          filter: drop-shadow(0 10px 20px rgba(108, 33, 24, 0.15));
        }
        .venue-tag {
          display: inline-block;
          font-size: 0.75rem;
          letter-spacing: 0.2em;
          color: #d4af37;
          background: rgba(108, 33, 24, 0.05);
          padding: 0.3rem 1rem;
          border-radius: 9999px;
          margin-bottom: 0.6rem;
          font-weight: 700;
        }
        .venue-name {
          font-size: 3.2rem;
          color: #6c2118;
          font-weight: 700;
          margin-bottom: 0.4rem;
        }
        .venue-address {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.05rem;
          color: #5a443e;
          margin-bottom: 2rem;
        }
        .action-buttons {
          display: flex;
          justify-content: center;
          gap: 1.2rem;
          flex-wrap: wrap;
          margin-bottom: 2.2rem;
        }
        .map-embed-wrapper {
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(212, 175, 55, 0.4);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
          margin-bottom: 2.5rem;
        }
        .family-blessing-box {
          border-top: 1px solid rgba(212, 175, 55, 0.3);
          padding-top: 2rem;
        }
        .blessing-ornament {
          width: 140px;
          margin: 0 auto 0.8rem;
        }
        .ornament-img {
          width: 100%;
          height: auto;
          object-fit: contain;
        }
        .awaiting-label {
          font-size: 2.4rem;
          color: #b20e00;
          margin-bottom: 0.2rem;
        }
        .family-name {
          font-size: 2rem;
          color: #6c2118;
          font-weight: 700;
          letter-spacing: 0.05em;
        }
        @media (max-width: 600px) {
          .venue-name {
            font-size: 2.4rem;
          }
          .venue-card {
            padding: 2rem 1.2rem;
          }
          .action-buttons {
            flex-direction: column;
          }
          .btn-royal-primary, .btn-royal-gold {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
