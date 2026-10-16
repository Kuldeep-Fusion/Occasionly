'use client';

export default function MenuSection() {
  const courses = [
    {
      course: 'MAIN',
      title: 'Miso-Glazed Beef Tenderloin',
      description: 'Prime cut beef tenderloin, pan-seared and served over a silky parsnip purée with roasted seasonal baby root vegetables.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c59b27" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
          <path d="M2 12h20" />
        </svg>
      ),
    },
    {
      course: 'DESSERT',
      title: 'Velvet White Chocolate & Raspberry Mousse',
      description: 'A light-as-air white chocolate dome with a vibrant tart raspberry center, edible 24k gold leaf, and delicate spun sugar garnish.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c59b27" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="menu" className="menu-section" aria-label="Wedding Menu">
      <div className="section-header">
        <span className="section-badge font-cinzel">CULINARY EXPERIENCE</span>
        <h2 className="section-title font-pinyon">Menu</h2>
        <p className="section-subtitle font-great-vibes">Carefully curated for our guests</p>
      </div>

      <div className="menu-card">
        <div className="menu-border-corner top-left"></div>
        <div className="menu-border-corner top-right"></div>
        <div className="menu-border-corner bottom-left"></div>
        <div className="menu-border-corner bottom-right"></div>

        <div className="menu-inner">
          {courses.map((c, idx) => (
            <div key={idx} className="menu-course-item">
              <span className="course-label font-cinzel">{c.course}</span>
              <h3 className="course-title font-cormorant">{c.title}</h3>
              <p className="course-desc">{c.description}</p>
              {idx < courses.length - 1 && <div className="course-divider font-great-vibes">❦</div>}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .menu-section {
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
        .menu-card {
          position: relative;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(197, 155, 39, 0.45);
          border-radius: 20px;
          padding: 3rem 2.2rem;
          box-shadow: 0 12px 35px rgba(117, 0, 0, 0.07);
          text-align: center;
        }
        .menu-border-corner {
          position: absolute;
          width: 24px;
          height: 24px;
          border-color: #c59b27;
          border-style: solid;
        }
        .top-left {
          top: 8px;
          left: 8px;
          border-width: 2px 0 0 2px;
        }
        .top-right {
          top: 8px;
          right: 8px;
          border-width: 2px 2px 0 0;
        }
        .bottom-left {
          bottom: 8px;
          left: 8px;
          border-width: 0 0 2px 2px;
        }
        .bottom-right {
          bottom: 8px;
          right: 8px;
          border-width: 0 2px 2px 0;
        }
        .menu-inner {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .course-label {
          display: inline-block;
          font-size: 0.85rem;
          letter-spacing: 0.25em;
          color: #c59b27;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }
        .course-title {
          font-size: 2.2rem;
          color: #750000;
          font-weight: 600;
          line-height: 1.2;
          margin-bottom: 0.8rem;
        }
        .course-desc {
          font-size: 0.95rem;
          color: #6e645e;
          line-height: 1.6;
          max-width: 520px;
          margin: 0 auto;
        }
        .course-divider {
          color: #c59b27;
          font-size: 1.8rem;
          margin-top: 1.8rem;
          opacity: 0.8;
        }
      `}</style>
    </section>
  );
}
