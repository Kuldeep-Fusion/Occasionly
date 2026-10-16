'use client';

export default function DressCodeSection() {
  const swatches = [
    { hex: '#c9b8a4', name: 'Warm Oat' },
    { hex: '#ffffff', name: 'Soft Ivory', border: true },
    { hex: '#b8a9c9', name: 'Dusty Lilac' },
    { hex: '#e8cfc0', name: 'Blush Silk' },
    { hex: '#837ef5', name: 'Dusty Periwinkle' },
  ];

  return (
    <section id="dress-code" className="dress-code-section" aria-label="Wedding Dress Code">
      <div className="section-header">
        <span className="section-badge font-cinzel">ATTIRE</span>
        <h2 className="section-title font-pinyon">Dress Code</h2>
        <p className="section-subtitle font-great-vibes">Semi-Formal &amp; Elegant</p>
      </div>

      <div className="dress-code-card">
        <div className="attire-columns">
          <div className="attire-col">
            <div className="attire-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#750000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.5a2 2 0 0 0 1.25 1.57L8 12.2V22h8v-9.8l3.89-1.44a2 2 0 0 0 1.25-1.57l.58-3.5a2 2 0 0 0-1.34-2.23z" />
              </svg>
            </div>
            <span className="attire-gender font-cinzel">GENTLEMEN</span>
            <p className="attire-spec font-cormorant">Suit &amp; Tie</p>
          </div>

          <div className="col-divider"></div>

          <div className="attire-col">
            <div className="attire-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#750000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2l6 4 6-4v4l-4 6v8H10v-8L6 6V2z" />
              </svg>
            </div>
            <span className="attire-gender font-cinzel">LADIES</span>
            <p className="attire-spec font-cormorant">Cocktail Dress</p>
          </div>
        </div>

        <div className="palette-wrapper">
          <span className="palette-label font-cinzel">COLOR PALETTE INSPIRATION</span>
          <div className="swatch-row">
            {swatches.map((s, idx) => (
              <div key={idx} className="swatch-item">
                <div
                  className="swatch-circle"
                  style={{
                    backgroundColor: s.hex,
                    border: s.border ? '1px solid rgba(0,0,0,0.15)' : 'none',
                  }}
                  title={s.name}
                ></div>
                <span className="swatch-name">{s.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .dress-code-section {
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
        .dress-code-card {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(197, 155, 39, 0.35);
          border-radius: 24px;
          padding: 2.5rem 2rem;
          box-shadow: 0 10px 30px rgba(117, 0, 0, 0.06);
          text-align: center;
        }
        .attire-columns {
          display: flex;
          align-items: center;
          justify-content: space-around;
          margin-bottom: 2.5rem;
        }
        .attire-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          flex: 1;
        }
        .attire-icon {
          width: 58px;
          height: 58px;
          border-radius: 50%;
          background: #faf6f0;
          border: 1px solid rgba(197, 155, 39, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0.4rem;
        }
        .attire-gender {
          font-size: 0.8rem;
          letter-spacing: 0.15em;
          color: #8c827a;
          font-weight: 600;
        }
        .attire-spec {
          font-size: 1.8rem;
          color: #750000;
          font-weight: 600;
          line-height: 1.2;
        }
        .col-divider {
          width: 1px;
          height: 80px;
          background: linear-gradient(180deg, transparent, rgba(197, 155, 39, 0.4), transparent);
        }
        .palette-wrapper {
          border-top: 1px solid rgba(197, 155, 39, 0.25);
          padding-top: 1.8rem;
        }
        .palette-label {
          display: block;
          font-size: 0.75rem;
          letter-spacing: 0.2em;
          color: #8c827a;
          margin-bottom: 1.2rem;
        }
        .swatch-row {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 1.2rem;
        }
        .swatch-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }
        .swatch-circle {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          cursor: pointer;
        }
        .swatch-circle:hover {
          transform: scale(1.15);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
        }
        .swatch-name {
          font-size: 0.7rem;
          color: #6e645e;
          font-weight: 500;
        }
        @media (max-width: 520px) {
          .attire-columns {
            flex-direction: column;
            gap: 1.5rem;
          }
          .col-divider {
            width: 80%;
            height: 1px;
          }
        }
      `}</style>
    </section>
  );
}
