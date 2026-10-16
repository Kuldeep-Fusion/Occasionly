'use client';

export default function AccommodationSection() {
  const hotels = [
    {
      name: 'Lova',
      price: '$410 / night',
      image: '/assets/hotel-lova.png',
      description: 'You can book directly with the link below for special wedding discounted rates.',
      url: 'https://www.booking.com',
    },
    {
      name: 'Hotel Subtile',
      price: '$300 / night',
      image: '/assets/hotel-subtile.png',
      description: 'You can book directly with the link below for special wedding discounted rates.',
      url: 'https://www.booking.com',
    },
  ];

  return (
    <section id="accommodation" className="accommodation-section" aria-label="Guest Accommodation">
      <div className="section-header">
        <span className="section-badge font-cinzel">STAY</span>
        <h2 className="section-title font-pinyon">Accommodation</h2>
        <p className="section-subtitle font-great-vibes">Recommended hotels for our guests</p>
      </div>

      <div className="hotels-grid">
        {hotels.map((hotel, idx) => (
          <div key={idx} className="hotel-card">
            <div className="hotel-image-box">
              <img src={hotel.image} alt={hotel.name} className="hotel-img" />
              <div className="price-tag font-cinzel">{hotel.price}</div>
            </div>

            <div className="hotel-info">
              <h3 className="hotel-name font-cinzel">{hotel.name}</h3>
              <p className="hotel-desc">{hotel.description}</p>

              <a
                href={hotel.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{ width: '100%', marginTop: 'auto' }}
              >
                <span>View Details &amp; Book</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .accommodation-section {
          padding: 3.5rem 1.5rem;
          margin: 0 auto;
          max-width: 680px;
        }
        .section-header {
          text-align: center;
          margin-bottom: 2.2rem;
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
        .hotels-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.6rem;
        }
        .hotel-card {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(197, 155, 39, 0.35);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 25px rgba(117, 0, 0, 0.06);
          display: flex;
          flex-direction: column;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .hotel-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 14px 32px rgba(197, 155, 39, 0.18);
          border-color: #c59b27;
        }
        .hotel-image-box {
          position: relative;
          width: 100%;
          height: 190px;
          background: #faf6f0;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .hotel-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }
        .hotel-card:hover .hotel-img {
          transform: scale(1.05);
        }
        .price-tag {
          position: absolute;
          top: 12px;
          right: 12px;
          background: rgba(117, 0, 0, 0.9);
          color: #ffffff;
          padding: 0.35rem 0.8rem;
          border-radius: 9999px;
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        }
        .hotel-info {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .hotel-name {
          font-size: 1.4rem;
          color: #750000;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }
        .hotel-desc {
          font-size: 0.9rem;
          color: #6e645e;
          line-height: 1.5;
          margin-bottom: 1.5rem;
        }
      `}</style>
    </section>
  );
}
