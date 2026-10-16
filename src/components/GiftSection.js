'use client';

import { useState } from 'react';

export default function GiftSection() {
  const [copied, setCopied] = useState(false);
  const iban = 'BE89 565 52 24 55';

  const handleCopyIban = () => {
    navigator.clipboard.writeText(iban);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="gifts" className="gift-section" aria-label="Wedding Gifts & Registry">
      <div className="section-header">
        <span className="section-badge font-cinzel">REGISTRY</span>
        <h2 className="section-title font-pinyon">Gifts</h2>
      </div>

      <div className="gift-card">
        <p className="gift-message font-cormorant">
          &ldquo;Your presence is the best gift we could ask for. But if you’d like to bring a little something, feel free to surprise us with something festive from the heart.&rdquo;
        </p>

        {/* Amazon Registry Link */}
        <div className="registry-box">
          <a
            href="https://www.amazon.com"
            target="_blank"
            rel="noopener noreferrer"
            className="registry-btn"
          >
            <span className="btn-icon">🎁</span>
            <div className="btn-text">
              <span className="registry-name font-cinzel">Amazon Wedding Registry</span>
              <span className="registry-sub">Browse our curated gift wishlist</span>
            </div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14" />
              <path d="M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* Bank Contribution */}
        <div className="bank-card">
          <span className="bank-label font-cinzel">Prefer to contribute directly?</span>
          
          <div className="bank-details-grid">
            <div className="bank-item">
              <span className="item-title font-cinzel">Bank</span>
              <span className="item-val">KBC</span>
            </div>
            <div className="bank-item">
              <span className="item-title font-cinzel">Account Holder</span>
              <span className="item-val">Greg</span>
            </div>
            <div className="bank-item full-width">
              <span className="item-title font-cinzel">IBAN</span>
              <div className="iban-row">
                <code className="iban-code">{iban}</code>
                <button
                  onClick={handleCopyIban}
                  className={`copy-btn ${copied ? 'copied' : ''}`}
                  title="Copy IBAN to clipboard"
                  aria-label="Copy IBAN"
                >
                  {copied ? (
                    <>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Copied!
                    </>
                  ) : (
                    <>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                      Copy
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .gift-section {
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
        .gift-card {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(197, 155, 39, 0.35);
          border-radius: 24px;
          padding: 2.8rem 2.2rem;
          box-shadow: 0 12px 35px rgba(117, 0, 0, 0.07);
          text-align: center;
        }
        .gift-message {
          font-size: 1.4rem;
          line-height: 1.6;
          color: #750000;
          font-style: italic;
          margin-bottom: 2.5rem;
        }
        .registry-box {
          margin-bottom: 2rem;
        }
        .registry-btn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.2rem 1.6rem;
          background: #ffffff;
          border: 1px solid rgba(197, 155, 39, 0.4);
          border-radius: 16px;
          color: #750000;
          text-decoration: none;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.04);
          transition: all 0.3s ease;
        }
        .registry-btn:hover {
          transform: translateY(-2px);
          border-color: #c59b27;
          box-shadow: 0 8px 24px rgba(197, 155, 39, 0.2);
        }
        .btn-icon {
          font-size: 1.8rem;
        }
        .btn-text {
          text-align: left;
          flex: 1;
          margin-left: 1.2rem;
        }
        .registry-name {
          display: block;
          font-size: 1.05rem;
          font-weight: 600;
          color: #2c2523;
        }
        .registry-sub {
          font-size: 0.8rem;
          color: #8c827a;
        }
        .bank-card {
          background: #faf6f0;
          border: 1px solid rgba(197, 155, 39, 0.3);
          border-radius: 18px;
          padding: 1.8rem 1.5rem;
          text-align: left;
        }
        .bank-label {
          display: block;
          font-size: 0.85rem;
          letter-spacing: 0.1em;
          color: #750000;
          margin-bottom: 1.2rem;
          text-align: center;
          font-weight: 600;
        }
        .bank-details-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.2rem;
        }
        .bank-item {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }
        .full-width {
          grid-column: span 2;
        }
        .item-title {
          font-size: 0.7rem;
          letter-spacing: 0.15em;
          color: #8c827a;
        }
        .item-val {
          font-size: 1.1rem;
          font-weight: 600;
          color: #2c2523;
        }
        .iban-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #ffffff;
          padding: 0.6rem 1rem;
          border-radius: 10px;
          border: 1px solid rgba(197, 155, 39, 0.3);
          margin-top: 0.3rem;
        }
        .iban-code {
          font-family: monospace;
          font-size: 1.05rem;
          font-weight: 600;
          color: #750000;
          letter-spacing: 0.05em;
        }
        .copy-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          background: #750000;
          color: #ffffff;
          border: none;
          padding: 0.4rem 0.8rem;
          border-radius: 6px;
          font-size: 0.75rem;
          cursor: pointer;
          font-weight: 600;
          transition: background 0.2s ease;
        }
        .copy-btn:hover {
          background: #580000;
        }
        .copy-btn.copied {
          background: #2e7d32;
        }
        @media (max-width: 500px) {
          .bank-details-grid {
            grid-template-columns: 1fr;
          }
          .full-width {
            grid-column: span 1;
          }
          .iban-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.6rem;
          }
          .copy-btn {
            align-self: flex-end;
          }
        }
      `}</style>
    </section>
  );
}
