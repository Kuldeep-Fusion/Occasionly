'use client';

export default function ActivitiesSection() {
  const activities = [
    {
      name: 'Walk by the lake',
      category: 'nature',
      badge: 'NATURE & VIEWS',
      description:
        'The gentle rhythm of water lapping against the shore creates a serene soundtrack for a peaceful stroll along the winding path.',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
        </svg>
      ),
    },
    {
      name: 'Restaurant & Dining',
      category: 'restaurant',
      badge: 'CULINARY EXCELLENCE',
      description:
        'When it comes to a truly elite dining scene, the Moboli area stands in a league of its own, boasting a vibrant mix of Michelin-starred excellence and hidden culinary gems.',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
          <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
          <line x1="6" y1="1" x2="6" y2="4" />
          <line x1="10" y1="1" x2="10" y2="4" />
          <line x1="14" y1="1" x2="14" y2="4" />
        </svg>
      ),
    },
  ];

  return (
    <section id="activities" className="activities-section" aria-label="Nearby Activities">
      <div className="section-header">
        <span className="section-badge font-cinzel">EXPLORE</span>
        <h2 className="section-title font-pinyon">Things to Do</h2>
        <p className="section-subtitle font-great-vibes">Some of our favourite things to do nearby</p>
      </div>

      <div className="activities-grid">
        {activities.map((item, idx) => (
          <div key={idx} className="activity-card">
            <div className="card-top">
              <span className="activity-badge font-cinzel">{item.badge}</span>
              <div className="activity-icon-pill">{item.icon}</div>
            </div>
            <h3 className="activity-name font-cinzel">{item.name}</h3>
            <p className="activity-desc">{item.description}</p>
          </div>
        ))}
      </div>

      <style jsx>{`
        .activities-section {
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
        .activities-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
        }
        .activity-card {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(197, 155, 39, 0.3);
          border-radius: 20px;
          padding: 1.8rem;
          box-shadow: 0 8px 24px rgba(117, 0, 0, 0.05);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          display: flex;
          flex-direction: column;
        }
        .activity-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(197, 155, 39, 0.15);
          border-color: #c59b27;
        }
        .card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.2rem;
        }
        .activity-badge {
          font-size: 0.7rem;
          letter-spacing: 0.12em;
          color: #750000;
          background: rgba(117, 0, 0, 0.08);
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-weight: 600;
        }
        .activity-icon-pill {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #faf6f0;
          color: #c59b27;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(197, 155, 39, 0.3);
        }
        .activity-name {
          font-size: 1.3rem;
          color: #2c2523;
          margin-bottom: 0.8rem;
          letter-spacing: 0.04em;
        }
        .activity-desc {
          font-size: 0.95rem;
          color: #6e645e;
          line-height: 1.6;
        }
      `}</style>
    </section>
  );
}
