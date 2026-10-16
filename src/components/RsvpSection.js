'use client';

import { useState } from 'react';
import confetti from 'canvas-confetti';

export default function RsvpSection() {
  const [formData, setFormData] = useState({
    name: '',
    attending: 'attending',
    guestsCount: 1,
    eventsAttending: ['Haldi', 'Sagai & Sangeet', 'Baarat', 'Lunch', 'Phere'],
    dietary: ['Pure Vegetarian'],
    dietaryNotes: '',
    songRequest: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [submittedData, setSubmittedData] = useState(null);

  const availableEvents = [
    'Haldi (12th Nov)',
    'Sagai & Sangeet (12th Nov)',
    'Baarat (13th Nov)',
    'Lunch (13th Nov)',
    'Phere (13th Nov)',
  ];

  const dietaryOptions = [
    'Pure Vegetarian',
    'Jain Food (No Onion/Garlic)',
    'Vegan',
    'No Restrictions',
  ];

  const handleEventToggle = (eventName) => {
    setFormData((prev) => {
      const exists = prev.eventsAttending.includes(eventName);
      if (exists) {
        return { ...prev, eventsAttending: prev.eventsAttending.filter((e) => e !== eventName) };
      } else {
        return { ...prev, eventsAttending: [...prev.eventsAttending, eventName] };
      }
    });
  };

  const handleDietaryToggle = (opt) => {
    setFormData((prev) => {
      const exists = prev.dietary.includes(opt);
      if (exists) {
        return { ...prev, dietary: prev.dietary.filter((d) => d !== opt) };
      } else {
        return { ...prev, dietary: [...prev.dietary, opt] };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          dietaryNotes: `${formData.dietaryNotes} | Events: ${formData.eventsAttending.join(', ')}`,
        }),
      });

      const result = await res.json();

      if (result.success) {
        setSubmitted(true);
        setSubmittedData(result.data);

        try {
          confetti({
            particleCount: 120,
            spread: 90,
            origin: { y: 0.6 },
            colors: ['#b20e00', '#d4af37', '#f3e5ab', '#ff9933'],
          });
        } catch (err) {}
      } else {
        setErrorMsg(result.error || 'Failed to submit RSVP. Please try again.');
      }
    } catch (err) {
      setErrorMsg('Connection error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setSubmittedData(null);
    setFormData({
      name: '',
      attending: 'attending',
      guestsCount: 1,
      eventsAttending: ['Haldi', 'Sagai & Sangeet', 'Baarat', 'Lunch', 'Phere'],
      dietary: ['Pure Vegetarian'],
      dietaryNotes: '',
      songRequest: '',
      message: '',
    });
  };

  return (
    <section id="rsvp" className="rsvp-section" aria-label="Wedding RSVP">
      <div className="section-header">
        <span className="section-badge font-cinzel">RESPOND</span>
        <h2 className="section-title font-couple">RSVP</h2>
        <p className="section-subtitle font-script">Kindly confirm your presence by 25th October 2026</p>
      </div>

      <div className="rsvp-card indian-card-frame">
        {submitted ? (
          <div className="success-state animate-fade-in">
            <div className="success-icon">🪔</div>

            <h3 className="success-title font-couple">
              {submittedData?.attending === 'attending'
                ? 'Thank You for Joining the Celebration!'
                : 'Thank You for Your Blessings!'}
            </h3>

            <p className="success-desc font-couple">
              {submittedData?.attending === 'attending'
                ? `Dearest ${submittedData?.name}, we are overjoyed to welcome your family for ${submittedData?.guestsCount} guest(s)! Your response has been saved.`
                : `Dearest ${submittedData?.name}, we will truly miss your presence, but your blessings mean the world to Sahil & Anjali!`}
            </p>

            <button onClick={handleReset} className="btn-royal-gold" style={{ marginTop: '1.5rem' }}>
              Submit Another RSVP
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="rsvp-form">
            {errorMsg && <div className="error-banner">{errorMsg}</div>}

            {/* Attendance Choice */}
            <div className="form-group">
              <label className="form-label font-cinzel">Will you be gracing the occasion?</label>
              <div className="attendance-pills">
                <button
                  type="button"
                  className={`attendance-pill ${formData.attending === 'attending' ? 'active' : ''}`}
                  onClick={() => setFormData({ ...formData, attending: 'attending' })}
                >
                  <span className="pill-dot"></span>
                  Joyfully Attend 🪔
                </button>
                <button
                  type="button"
                  className={`attendance-pill ${formData.attending === 'declined' ? 'active' : ''}`}
                  onClick={() => setFormData({ ...formData, attending: 'declined' })}
                >
                  <span className="pill-dot"></span>
                  Regretfully Decline
                </button>
              </div>
            </div>

            {/* Full Name */}
            <div className="form-group">
              <label htmlFor="rsvp-name" className="form-label font-cinzel">
                Full Name / Family Name <span className="req">*</span>
              </label>
              <input
                id="rsvp-name"
                type="text"
                required
                placeholder="e.g., Sharma Family / Rajat Gupta"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="form-input"
              />
            </div>

            {formData.attending === 'attending' && (
              <>
                {/* Number of Guests */}
                <div className="form-group">
                  <label htmlFor="rsvp-guests" className="form-label font-cinzel">
                    Number of Attendees
                  </label>
                  <select
                    id="rsvp-guests"
                    value={formData.guestsCount}
                    onChange={(e) => setFormData({ ...formData, guestsCount: Number(e.target.value) })}
                    className="form-select"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Events Attending */}
                <div className="form-group">
                  <label className="form-label font-cinzel">Functions You Will Attend</label>
                  <div className="chips-container">
                    {availableEvents.map((ev) => (
                      <button
                        type="button"
                        key={ev}
                        onClick={() => handleEventToggle(ev)}
                        className={`chip-btn ${formData.eventsAttending.includes(ev) ? 'chip-active' : ''}`}
                      >
                        ✓ {ev}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dietary Requirements */}
                <div className="form-group">
                  <label className="form-label font-cinzel">Food &amp; Dining Preference</label>
                  <div className="chips-container">
                    {dietaryOptions.map((opt) => (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => handleDietaryToggle(opt)}
                        className={`chip-btn ${formData.dietary.includes(opt) ? 'chip-active' : ''}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sangeet Song Request */}
                <div className="form-group">
                  <label htmlFor="rsvp-song" className="form-label font-cinzel">
                    Sangeet &amp; Baarat Song Recommendation 💃🕺
                  </label>
                  <input
                    id="rsvp-song"
                    type="text"
                    placeholder="e.g., Gallan Goodiyaan / Kudmayi"
                    value={formData.songRequest}
                    onChange={(e) => setFormData({ ...formData, songRequest: e.target.value })}
                    className="form-input"
                  />
                </div>
              </>
            )}

            {/* Message to Couple */}
            <div className="form-group">
              <label htmlFor="rsvp-message" className="form-label font-cinzel">
                Heartfelt Blessings for Sahil &amp; Anjali
              </label>
              <textarea
                id="rsvp-message"
                rows={3}
                placeholder="Share your warm wishes and blessings..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="form-textarea"
              />
            </div>

            <button type="submit" disabled={loading} className="btn-royal-primary" style={{ width: '100%' }}>
              {loading ? 'Submitting to Database...' : 'Confirm RSVP & Send Blessings ✨'}
            </button>
          </form>
        )}
      </div>

      <style jsx>{`
        .rsvp-section {
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
        .rsvp-card {
          padding: 3rem 2.2rem;
          background: #ffffff;
        }
        .error-banner {
          background: #ffebee;
          color: #c62828;
          padding: 0.8rem 1rem;
          border-radius: 10px;
          font-size: 0.85rem;
          margin-bottom: 1.5rem;
        }
        .form-group {
          margin-bottom: 1.6rem;
        }
        .form-label {
          display: block;
          font-size: 0.85rem;
          letter-spacing: 0.1em;
          color: #4a150e;
          margin-bottom: 0.6rem;
          font-weight: 700;
        }
        .req {
          color: #b20e00;
        }
        .attendance-pills {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        .attendance-pill {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          padding: 0.9rem;
          background: #fdfaf3;
          border: 1px solid rgba(212, 175, 55, 0.4);
          border-radius: 14px;
          color: #6c2118;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .attendance-pill.active {
          background: #b20e00;
          color: #ffffff;
          border-color: #b20e00;
          box-shadow: 0 4px 14px rgba(178, 14, 0, 0.3);
        }
        .pill-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: currentColor;
        }
        .form-input,
        .form-select,
        .form-textarea {
          width: 100%;
          padding: 0.9rem 1.2rem;
          border: 1px solid rgba(212, 175, 55, 0.45);
          border-radius: 12px;
          background: #ffffff;
          font-family: inherit;
          font-size: 0.95rem;
          color: #2c1a16;
          outline: none;
        }
        .form-input:focus,
        .form-select:focus,
        .form-textarea:focus {
          border-color: #b20e00;
          box-shadow: 0 0 0 3px rgba(178, 14, 0, 0.1);
        }
        .chips-container {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
        }
        .chip-btn {
          padding: 0.5rem 1rem;
          border-radius: 9999px;
          font-size: 0.85rem;
          background: #fdfaf3;
          border: 1px solid rgba(212, 175, 55, 0.4);
          color: #554d48;
          cursor: pointer;
          transition: all 0.2s ease;
          font-weight: 500;
        }
        .chip-btn.chip-active {
          background: #6c2118;
          color: #ffffff;
          border-color: #6c2118;
        }
        .success-state {
          text-align: center;
          padding: 2rem 1rem;
        }
        .success-icon {
          font-size: 3.5rem;
          margin-bottom: 1rem;
        }
        .success-title {
          font-size: 2.4rem;
          color: #6c2118;
          margin-bottom: 0.8rem;
          font-weight: 700;
        }
        .success-desc {
          font-size: 1.3rem;
          color: #554d48;
          line-height: 1.6;
          max-width: 520px;
          margin: 0 auto;
        }
        @media (max-width: 520px) {
          .attendance-pills {
            grid-template-columns: 1fr;
          }
          .rsvp-card {
            padding: 2rem 1.2rem;
          }
        }
      `}</style>
    </section>
  );
}
