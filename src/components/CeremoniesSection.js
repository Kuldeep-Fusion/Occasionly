'use client';

export default function CeremoniesSection() {
  const ceremonies = [
    {
      title: 'Haldi',
      date: 'Thursday 12th Nov 2026',
      time: '11:30am onwards',
      attire: 'Shades of Yellow',
      image: '/canva_assets/919c422c412436717aae086f1e997ee8.png',
      badge: 'AUSPICIOUS RITUAL',
      themeColor: '#e69500',
    },
    {
      title: 'Sagai & Sangeet',
      date: 'Thursday 12th Nov 2026',
      time: '5:00 pm onwards',
      attire: 'Western Glamour',
      image: '/canva_assets/417a9801ba54c67b87e8f43a718a6b8d.png',
      badge: 'MUSICAL NIGHT & RINGS',
      themeColor: '#9c27b0',
    },
    {
      title: 'Baarat',
      date: 'Friday, 13th Nov 2026',
      time: '10:30am onwards',
      attire: 'Traditional Indian Elegance',
      image: '/canva_assets/9c5cdc3dddd5c1b1830c6567170ea739.png',
      badge: 'ROYAL PROCESSION',
      themeColor: '#b20e00',
    },
    {
      title: 'Lunch',
      date: 'Friday, 13th Nov 2026',
      time: '1:30 pm onwards',
      attire: 'Royal Festive Feast',
      image: '/canva_assets/35a39f1a8a905fcd1e8aeaf385a26a71.png',
      badge: 'GRAND BANQUET',
      themeColor: '#d4af37',
    },
    {
      title: 'Phere',
      date: 'Friday, 13th Nov 2026',
      time: '5:00 pm onwards',
      attire: 'Sacred Wedding Vows',
      image: '/canva_assets/0b67623095b6b26f24385dd7986dccdd.png',
      badge: 'SACRED SEVEN VOWS',
      themeColor: '#b20e00',
    },
  ];

  return (
    <section id="ceremonies" className="ceremonies-section" aria-label="Wedding Ceremonies Schedule">
      <div className="section-header">
        <span className="section-badge font-cinzel">CELEBRATIONS</span>
        <h2 className="section-title font-couple">Wedding Itinerary</h2>
        <p className="section-subtitle font-script">Join us in every sacred moment</p>
      </div>

      <div className="ceremonies-stack">
        {ceremonies.map((item, idx) => (
          <div key={idx} className="ceremony-card indian-card-frame">
            {/* Corner Marigold Garland SVG */}
            <div className="garland-decor left">
              <img src="/canva_assets/706be0aedafbea783212467b5a6ceec0.svg" alt="" aria-hidden="true" />
            </div>
            <div className="garland-decor right">
              <img src="/canva_assets/706be0aedafbea783212467b5a6ceec0.svg" alt="" aria-hidden="true" />
            </div>

            <div className="card-inner">
              <div className="ceremony-image-wrapper">
                <img src={item.image} alt={item.title} className="ceremony-img" />
              </div>

              <div className="ceremony-text-content">
                <span className="ceremony-badge font-cinzel" style={{ borderColor: item.themeColor, color: item.themeColor }}>
                  {item.badge}
                </span>

                <h3 className="ceremony-name font-couple">{item.title}</h3>

                <div className="timing-box">
                  <div className="date-row font-cinzel">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    <span>{item.date}</span>
                  </div>

                  <div className="time-row">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    <span className="font-cinzel">{item.time}</span>
                  </div>
                </div>

                <div className="attire-pill">
                  <span className="attire-label">Attire :</span>
                  <span className="attire-val font-couple">{item.attire}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .ceremonies-section {
          padding: 4rem 1.5rem;
          margin: 0 auto;
          max-width: 760px;
        }
        .section-header {
          text-align: center;
          margin-bottom: 3rem;
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
          font-size: 2.2rem;
          color: #b20e00;
          margin-top: 0.2rem;
        }
        .ceremonies-stack {
          display: flex;
          flex-direction: column;
          gap: 2.2rem;
        }
        .ceremony-card {
          padding: 2.5rem 2rem;
          background: #ffffff;
          position: relative;
        }
        .garland-decor {
          position: absolute;
          width: 75px;
          height: 90px;
          opacity: 0.25;
          pointer-events: none;
        }
        .garland-decor.left {
          top: 10px;
          left: 10px;
        }
        .garland-decor.right {
          bottom: 10px;
          right: 10px;
          transform: rotate(180deg);
        }
        .garland-decor img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
        .card-inner {
          display: flex;
          align-items: center;
          gap: 2.5rem;
          position: relative;
          z-index: 2;
        }
        .ceremony-image-wrapper {
          flex: 0 0 240px;
          height: 240px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #fdfaf3;
          border-radius: 20px;
          border: 1px solid rgba(212, 175, 55, 0.35);
          padding: 1rem;
          box-shadow: 0 8px 24px rgba(108, 33, 24, 0.06);
        }
        .ceremony-img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          transition: transform 0.3s ease;
        }
        .ceremony-card:hover .ceremony-img {
          transform: scale(1.06);
        }
        .ceremony-text-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .ceremony-badge {
          font-size: 0.7rem;
          letter-spacing: 0.15em;
          border: 1px solid;
          padding: 0.25rem 0.8rem;
          border-radius: 9999px;
          font-weight: 700;
          margin-bottom: 0.6rem;
        }
        .ceremony-name {
          font-size: 2.8rem;
          color: #6c2118;
          font-weight: 700;
          line-height: 1.1;
          margin-bottom: 1rem;
        }
        .timing-box {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 1.2rem;
          color: #4a150e;
        }
        .date-row,
        .time-row {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.95rem;
          font-weight: 600;
        }
        .date-row svg,
        .time-row svg {
          color: #b20e00;
        }
        .attire-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: #fdf6ec;
          border: 1px dashed #d4af37;
          padding: 0.5rem 1.1rem;
          border-radius: 12px;
        }
        .attire-label {
          font-size: 0.8rem;
          font-weight: 700;
          color: #8c6e67;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .attire-val {
          font-size: 1.2rem;
          color: #6c2118;
          font-weight: 700;
        }
        @media (max-width: 650px) {
          .card-inner {
            flex-direction: column;
            text-align: center;
            gap: 1.5rem;
          }
          .ceremony-image-wrapper {
            flex: 0 0 190px;
            width: 100%;
            max-width: 200px;
          }
          .ceremony-text-content {
            align-items: center;
          }
          .ceremony-name {
            font-size: 2.2rem;
          }
          .timing-box {
            align-items: center;
          }
        }
      `}</style>
    </section>
  );
}
