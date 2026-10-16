'use client';

import { useState, useEffect } from 'react';

export default function GuestbookSection() {
  const [wishes, setWishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [emoji, setEmoji] = useState('🪔');
  const [submitting, setSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  const emojiList = ['🪔', '🌸', '🥂', '💍', '❤️', '✨', '🙏', '🌺'];

  useEffect(() => {
    fetchWishes();
  }, []);

  const fetchWishes = async () => {
    try {
      const res = await fetch('/api/wishes');
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setWishes(data.data);
      }
    } catch (e) {
      console.error('Failed to load wishes', e);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setSubmitting(true);
    setStatusMsg('');

    try {
      const res = await fetch('/api/wishes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, message, emoji }),
      });

      const data = await res.json();
      if (data.success) {
        setWishes((prev) => [data.data, ...prev]);
        setName('');
        setMessage('');
        setStatusMsg('Your warm blessings have been showered on the couple! 🪔✨');
        setTimeout(() => setStatusMsg(''), 4500);
      }
    } catch (err) {
      setStatusMsg('Failed to post blessings. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    try {
      const d = new Date(dateString);
      return d.toLocaleDateString('en-IN', {
        month: 'short',
        day: 'numeric',
      });
    } catch (e) {
      return '';
    }
  };

  return (
    <section id="guestbook" className="guestbook-section" aria-label="Wedding Wishes Guestbook">
      <div className="section-header">
        <span className="section-badge font-cinzel">SHUBHKAAMNAYEIN</span>
        <h2 className="section-title font-couple">Wishes &amp; Blessings Wall</h2>
        <p className="section-subtitle font-script">Bestow your blessings upon Sahil &amp; Anjali</p>
      </div>

      <div className="guestbook-container">
        {/* Wish Submission Form */}
        <div className="wish-form-card indian-card-frame">
          <form onSubmit={handleSubmit}>
            {statusMsg && <div className="status-banner">{statusMsg}</div>}

            <div className="form-row">
              <input
                type="text"
                placeholder="Your Name / Family"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="wish-input"
              />

              <div className="emoji-picker">
                {emojiList.map((e) => (
                  <button
                    key={e}
                    type="button"
                    onClick={() => setEmoji(e)}
                    className={`emoji-btn ${emoji === e ? 'active' : ''}`}
                  >
                    {e}
                  </button>
                ))}
              </div>
            </div>

            <textarea
              placeholder="Write your heartfelt wedding wishes, shayari or blessings..."
              required
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="wish-textarea"
            />

            <button type="submit" disabled={submitting} className="btn-royal-primary" style={{ width: '100%' }}>
              {submitting ? 'Sending Blessings...' : 'Post Your Blessings 🪔✨'}
            </button>
          </form>
        </div>

        {/* Wishes Wall Feed */}
        <div className="wishes-feed">
          {loading ? (
            <p className="loading-text font-couple">Loading lovely blessings...</p>
          ) : wishes.length === 0 ? (
            <p className="empty-text font-couple">Be the first to bestow your blessings upon Sahil &amp; Anjali!</p>
          ) : (
            <div className="wishes-grid">
              {wishes.map((w, idx) => (
                <div key={w._id || idx} className="wish-bubble indian-card-frame animate-fade-in">
                  <div className="wish-bubble-top">
                    <span className="wish-emoji">{w.emoji || '🪔'}</span>
                    <span className="wish-author font-cinzel">{w.name}</span>
                    <span className="wish-date">{formatDate(w.createdAt)}</span>
                  </div>
                  <p className="wish-content font-couple">{w.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .guestbook-section {
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
        .wish-form-card {
          padding: 2.2rem;
          background: #ffffff;
          margin-bottom: 2.5rem;
        }
        .status-banner {
          background: #e8f5e9;
          color: #2e7d32;
          padding: 0.8rem 1.2rem;
          border-radius: 12px;
          font-size: 0.95rem;
          margin-bottom: 1.2rem;
          text-align: center;
          font-weight: 600;
        }
        .form-row {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.2rem;
          flex-wrap: wrap;
        }
        .wish-input {
          flex: 1;
          min-width: 200px;
          padding: 0.85rem 1.2rem;
          border: 1px solid rgba(212, 175, 55, 0.45);
          border-radius: 12px;
          font-family: inherit;
          font-size: 0.95rem;
          outline: none;
        }
        .wish-input:focus,
        .wish-textarea:focus {
          border-color: #b20e00;
        }
        .emoji-picker {
          display: flex;
          gap: 0.4rem;
          align-items: center;
          flex-wrap: wrap;
        }
        .emoji-btn {
          background: #fdfaf3;
          border: 1px solid rgba(212, 175, 55, 0.4);
          border-radius: 8px;
          font-size: 1.25rem;
          padding: 0.35rem 0.55rem;
          cursor: pointer;
          transition: transform 0.15s ease;
        }
        .emoji-btn:hover {
          transform: scale(1.2);
        }
        .emoji-btn.active {
          background: #b20e00;
          border-color: #b20e00;
        }
        .wish-textarea {
          width: 100%;
          padding: 0.85rem 1.2rem;
          border: 1px solid rgba(212, 175, 55, 0.45);
          border-radius: 12px;
          font-family: inherit;
          font-size: 0.95rem;
          outline: none;
          margin-bottom: 1.2rem;
        }
        .wishes-feed {
          margin-top: 1.5rem;
        }
        .loading-text,
        .empty-text {
          text-align: center;
          color: #735952;
          font-size: 1.3rem;
          padding: 2rem;
        }
        .wishes-grid {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }
        .wish-bubble {
          background: #ffffff;
          padding: 1.5rem 1.8rem;
        }
        .wish-bubble-top {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          margin-bottom: 0.6rem;
        }
        .wish-emoji {
          font-size: 1.4rem;
        }
        .wish-author {
          font-size: 1.1rem;
          color: #6c2118;
          font-weight: 700;
          letter-spacing: 0.05em;
        }
        .wish-date {
          margin-left: auto;
          font-size: 0.8rem;
          color: #a08c86;
        }
        .wish-content {
          font-size: 1.25rem;
          color: #3e2621;
          line-height: 1.6;
        }
      `}</style>
    </section>
  );
}
