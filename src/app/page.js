'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import RoyalEnvelopeEntrance from '@/components/RoyalEnvelopeEntrance';
import AudioPlayer from '@/components/AudioPlayer';
import Countdown from '@/components/Countdown';
import GoldenScratchCard from '@/components/GoldenScratchCard';
import DirectionArrow from '@/components/DirectionArrow';
import RosePetalShower, { triggerRosePetalBurst } from '@/components/RosePetalShower';

export default function Home() {
  const [isOpeningModalOpen, setIsOpeningModalOpen] = useState(true);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [showPetals, setShowPetals] = useState(true);
  const [toastMessage, setToastMessage] = useState('');
  const audioRef = useRef(null);

  const playAudioImmediately = () => {
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlayingMusic(true);
        })
        .catch((err) => {
          console.log('Autoplay restriction handled', err);
        });
    }
  };

  const handleModalFinished = () => {
    setIsOpeningModalOpen(false);
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlayingMusic) {
      audioRef.current.pause();
      setIsPlayingMusic(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlayingMusic(true))
        .catch(() => { });
    }
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      "You're cordially invited to Sahil & Anjali's Wedding (#SaAnj) on 12th & 13th November 2026 at Omnia by Tivoli, Greater Noida West! View the wedding invitation: " +
      (typeof window !== 'undefined' ? window.location.href : '')
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      showToast('Invitation link copied to clipboard! 📋');
    }
  };

  const getGoogleCalendarUrl = () => {
    const title = encodeURIComponent('Sahil & Anjali Wedding Celebration (#SaAnj)');
    const details = encodeURIComponent(
      'Wedding celebrations of Sahil & Anjali at Omnia by Tivoli, Sector-2, Greater Noida West. Haldi, Sangeet, Baarat, Lunch & Phere.'
    );
    const location = encodeURIComponent('Omnia by Tivoli, Sector-2, Greater Noida West, Uttar Pradesh');
    const dates = '20261112T060000Z/20261113T183000Z';
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
  };

  // Motion variants for smooth on-scroll reveal
  const fadeInUp = {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <main className="wedding-wrapper">
      {/* Background Wedding Music Soundtrack */}
      <audio
        ref={audioRef}
        src="/audio/sahil-anjali-soundtrack.m4a"
        loop
        preload="auto"
      />

      {/* Subtle Falling Rose Petal Shower across the site */}
      <RosePetalShower isEnabled={showPetals} />

      {/* Floating Audio Controller & Petal Shower Toggle */}
      <AudioPlayer isPlaying={isPlayingMusic} onTogglePlay={toggleMusic} />
      <button
        onClick={() => setShowPetals((prev) => !prev)}
        className="floating-petal-toggle font-cinzel"
        title="Toggle Rose Petal Shower"
        aria-label="Toggle pink rose flower shower"
      >
        🌸 {showPetals ? 'Petals: On' : 'Petals: Off'}
      </button>

      {/* Royal Envelope Opening Entrance Modal */}
      <RoyalEnvelopeEntrance
        isOpen={isOpeningModalOpen}
        onOpen={handleModalFinished}
        onPlayAudio={playAudioImmediately}
      />

      {/* Toast Notification */}
      {toastMessage && <div className="toast-notification">{toastMessage}</div>}

      {/* Fixed Royal Wedding Background Frame */}
      <div className="fixed-wedding-frame" aria-hidden="true"></div>

      {/* Main Single Page Column that scrolls over the fixed background */}
      <div className="invitation-container-box">
        {/* Main Content Column with safe padding between fixed pillars */}
        <div className="invitation-scroll-track">
          {/* 1. LORD GANESHA & SHLOKA */}
          <motion.div
            className="ganesha-section"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.25 }}
            variants={fadeInUp}
          >
            <div className="ganesha-circle-aura">
              <img
                src="/canva_assets/6fe044cc9ab9669f60839f5daae6cae7.png"
                alt="Lord Ganesha"
                className="ganesha-icon"
              />
            </div>
            <p className="ganesha-shloka font-script">
              वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।
              <br />
              निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥
            </p>
          </motion.div>

          {/* 2. INVITATION INVOCATION */}
          <motion.div
            className="invocation-section"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.25 }}
            variants={fadeInUp}
          >
            <p className="invocation-text font-script">
              Solicit your gracious presence &amp;
              <br />
              blessings on the auspicious occasion
              <br />
              of wedding of our loving Son
            </p>
          </motion.div>

          {/* 3. GROOM & BRIDE DETAILS */}
          <motion.div
            className="couple-intro-section"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.25 }}
            variants={fadeInUp}
          >
            <div className="groom-block">
              <h1 className="name-cursive font-alex">Sahil</h1>
              <p className="parentage-text font-script">
                S/o Smt. Shikha Jain and
                <br />
                Sh. Vipin Kumar Jain
              </p>
            </div>

            <div className="with-connector font-alex">- with -</div>

            <div className="bride-block">
              <h1 className="name-cursive font-alex">Anjali</h1>
              <p className="parentage-text font-script">
                D/o Smt. Rajesh Sharma and
                <br />
                Sh. Satyawan Sharma
              </p>
            </div>
          </motion.div>

          {/* Delicate Floral Divider */}
          <div className="divider-ornament">
            <img
              src="/canva_assets/9ca67bcd0d33931c481394c7eea55211.png"
              alt=""
              className="divider-img"
            />
          </div>

          {/* 4. SAVE THIS MOMENT & LIVE COUNTDOWN */}
          <motion.div
            className="save-moment-block"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.25 }}
            variants={fadeInUp}
          >
            <h2 className="save-moment-heading font-festive">Save this Moment</h2>
            <p className="with-us-text font-script">with us</p>

            {/* Ornate Gold Plaque with Auspicious Dates */}
            <div className="date-ornate-plaque">
              <div className="plaque-flourish top">
                <span className="flourish-line"></span>
                <span className="flourish-icon">❖</span>
                <span className="flourish-line"></span>
              </div>
              <span className="date-plaque-text font-festive">12th &amp; 13th Nov 2026</span>
              <div className="plaque-flourish btm">
                <span className="flourish-line"></span>
                <span className="flourish-icon">❖</span>
                <span className="flourish-line"></span>
              </div>
            </div>

            {/* Interactive Golden Scratch Card & Countdown */}
            <GoldenScratchCard targetDate="2026-11-12T11:30:00" />
          </motion.div>

          {/* DIRECTION ARROW 1: Under Save This Moment down towards Haldi */}
          <DirectionArrow direction="haldi-to-sangeet" />

          {/* 5. HALDI CEREMONY */}
          <motion.div
            id="haldi"
            className="ceremony-step"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.25 }}
            variants={fadeInUp}
          >
            <p className="ceremony-date-banner font-festive">Thursday 12th Nov 2026</p>
            <div className="ceremony-art-box">
              <img
                src="/canva_assets/919c422c412436717aae086f1e997ee8.png"
                alt="Haldi Ceremony"
                className="ceremony-illustration haldi-art"
              />
            </div>
            <h2 className="ceremony-title font-script">Haldi</h2>
            <p className="ceremony-time font-festive">11:30am onwards</p>
            <p className="ceremony-attire font-festive">Attire : Shades of Yellow</p>
          </motion.div>

          {/* DIRECTION ARROW 2: Haldi to Sagai & Sangeet */}
          <DirectionArrow direction="sangeet-to-baarat" />

          {/* 6. SAGAI & SANGEET CEREMONY */}
          <motion.div
            id="sangeet"
            className="ceremony-step"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.25 }}
            variants={fadeInUp}
          >
            <div className="ceremony-art-box">
              <img
                src="/canva_assets/417a9801ba54c67b87e8f43a718a6b8d.png"
                alt="Sagai & Sangeet Ceremony"
                className="ceremony-illustration sangeet-art"
              />
            </div>
            <h2 className="ceremony-title font-script">Sagai &amp; Sangeet</h2>
            <p className="ceremony-time font-festive">5:00 pm onwards</p>
            <p className="ceremony-attire font-festive">Attire : Western Glamour</p>
          </motion.div>

          {/* Delicate Floral Divider */}
          <div className="divider-ornament">
            <img
              src="/canva_assets/9ca67bcd0d33931c481394c7eea55211.png"
              alt=""
              className="divider-img"
            />
          </div>

          {/* DIRECTION ARROW 3: Sangeet down towards Baarat */}
          <DirectionArrow direction="baarat-to-lunch" />

          {/* 7. BAARAT CEREMONY */}
          <motion.div
            id="baarat"
            className="ceremony-step"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.25 }}
            variants={fadeInUp}
          >
            <p className="ceremony-date-banner font-festive">Friday, 13th Nov 2026</p>
            <div className="ceremony-art-box">
              <img
                src="/canva_assets/9c5cdc3dddd5c1b1830c6567170ea739.png"
                alt="Baarat Procession"
                className="ceremony-illustration baarat-art"
              />
            </div>
            <h2 className="ceremony-title font-script">Baarat</h2>
            <p className="ceremony-time font-festive">10:30am onwards</p>
            <p className="ceremony-attire font-festive">Attire: Traditional Indian Elegance</p>
          </motion.div>

          {/* DIRECTION ARROW 4: Baarat down to Lunch */}
          <DirectionArrow direction="lunch-to-phere" />

          {/* 8. LUNCH CEREMONY */}
          <motion.div
            id="lunch"
            className="ceremony-step"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.25 }}
            variants={fadeInUp}
          >
            <div className="ceremony-art-box">
              <img
                src="/canva_assets/35a39f1a8a905fcd1e8aeaf385a26a71.png"
                alt="Wedding Lunch Feast"
                className="ceremony-illustration lunch-art"
              />
            </div>
            <h2 className="ceremony-title font-script">Lunch</h2>
            <p className="ceremony-time font-festive">1:30 pm onwards</p>
          </motion.div>

          {/* DIRECTION ARROW 5: Lunch down to Phere */}
          <DirectionArrow direction="haldi-to-sangeet" />

          {/* 9. PHERE CEREMONY */}
          <motion.div
            id="phere"
            className="ceremony-step"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.25 }}
            variants={fadeInUp}
          >
            <div className="ceremony-art-box">
              <img
                src="/canva_assets/0b67623095b6b26f24385dd7986dccdd.png"
                alt="Sacred Phere Mandap"
                className="ceremony-illustration phere-art"
              />
            </div>
            <h2 className="ceremony-title font-script">Phere</h2>
            <p className="ceremony-time font-festive">5:00 pm onwards</p>
          </motion.div>

          {/* DIRECTION ARROW 6: Phere down to Traditional Couple Photo */}
          <DirectionArrow direction="phere-to-couple" />

          {/* 10. COUPLE WEDDING PORTRAIT */}
          <motion.div
            className="couple-photo-card"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.25 }}
            variants={fadeInUp}
          >
            <div className="wedding-photo-wrapper">
              <img
                src="/canva_assets/08348f0c20860105af811ba99db95e56.png"
                alt="Sahil and Anjali Traditional Wedding"
                className="couple-traditional-photo"
              />
            </div>
          </motion.div>

          {/* 11. VENUE SECTION */}
          <motion.div
            id="venue"
            className="venue-block"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.25 }}
            variants={fadeInUp}
          >
            <h3 className="venue-script font-script">Venue</h3>
            <h2 className="venue-heading font-festive">Omnia by Tivoli</h2>
            <p className="venue-address-text font-festive">Sector-2, Greater Noida West</p>

            <div className="map-view-box">
              <a
                href="https://www.google.com/maps?q=place_id:ChIJC7MBl-bvDDkR0VMPtoOooSI"
                target="_blank"
                rel="noopener noreferrer"
                className="map-click-link"
                title="Click to open Google Maps"
              >
                <img
                  src="/canva_assets/2812422f84aebe9a52a9f17c6085b2dd.png"
                  alt="Omnia by Tivoli Location Map"
                  className="map-image-art"
                />
                <div className="map-overlay-badge font-cinzel">Open in Google Maps ↗</div>
              </a>
            </div>

            <div className="venue-cta-row">
              <a
                href="https://share.google/XMFVZJuQyDXDhpH7A"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-royal-primary"
              >
                Get Directions 🚗
              </a>
              <a
                href={getGoogleCalendarUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-royal-gold"
              >
                Save to Calendar 📅
              </a>
            </div>
          </motion.div>

          {/* Delicate Floral Divider */}
          <div className="divider-ornament">
            <img
              src="/canva_assets/9ca67bcd0d33931c481394c7eea55211.png"
              alt=""
              className="divider-img"
            />
          </div>

          {/* 12. AWAITING PRESENCE SECTION */}
          <motion.div
            className="awaiting-section"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.25 }}
            variants={fadeInUp}
          >
            <p className="awaiting-quote font-script">
              We can’t wait to celebrate this
              <br />
              Special Occasion with you
            </p>
          </motion.div>

          {/* 13. COUPLE RECEPTION PHOTO & FAMILY SIGNATURE */}
          <motion.div
            className="reception-portrait-card"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.25 }}
            variants={fadeInUp}
          >
            {/* Framed Couple in Tuxedo & Lilac Gown */}
            <div className="golden-frame-portrait">
              <video
                src="/canva_assets/video.mp4"
                poster="/canva_assets/230ebf1fd1108b1f29b9f546b7272813.jpg"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="reception-couple-video"
              />
            </div>

            {/* Big Festive Red Title - Berkshire Swash */}
            <h2 className="family-title font-festive">
              Jain &amp; Sharma
              <br />
              Family
            </h2>

            {/* Corner Floral Lantern Arrangements */}
            {/* <div className="royal-corner-decorations" aria-hidden="true">
              <img
                src="/canva_assets/1680ccaf2ad000d6612a57b6b6c7eac4.png"
                alt=""
                className="corner-decor decor-left"
              />
              <img
                src="/canva_assets/1680ccaf2ad000d6612a57b6b6c7eac4.png"
                alt=""
                className="corner-decor decor-right"
              />
            </div> */}
          </motion.div>

          {/* 14. SOCIAL SHARE SECTION */}
          {/* <motion.div
            className="social-share-card"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.25 }}
            variants={fadeInUp}
          >
            <h4 className="share-heading font-festive">Spread the Joy #SaAnj</h4>
            <p className="share-sub font-handwriting">
              Share Sahil &amp; Anjali&apos;s wedding card with family and friends.
            </p>
            <div className="share-buttons-row">
              <button onClick={handleShareWhatsApp} className="btn-whatsapp font-cinzel">
                Share on WhatsApp 💬
              </button>
              <button onClick={handleCopyLink} className="btn-copy-link font-cinzel">
                Copy Link 🔗
              </button>
            </div>
          </motion.div> */}

          {/* 15. FOOTER */}
          <footer className="page-footer">
            <p className="footer-hashtag font-hashtag">#SaAnj</p>
            <p className="footer-blessing font-shloka">॥ सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः ॥</p>
            <p className="footer-credits font-cinzel">Sahil &amp; Anjali Wedding • 12th &amp; 13th Nov 2026</p>
          </footer>
        </div>
      </div>

      <style jsx>{`
        .wedding-wrapper {
          min-height: 100vh;
          background: #36100c radial-gradient(circle at 50% 30%, #521812 0%, #290805 100%);
          position: relative;
          overflow-x: hidden;
          display: flex;
          justify-content: center;
        }

        .toast-notification {
          position: fixed;
          top: 24px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 999999;
          background: #b20e00;
          color: #ffffff;
          padding: 0.85rem 1.8rem;
          border-radius: 9999px;
          font-family: var(--font-cinzel);
          font-size: 0.95rem;
          box-shadow: 0 8px 25px rgba(178, 14, 0, 0.5);
          border: 1px solid #e6ca65;
          animation: fadeInScale 0.3s ease;
        }

        .floating-petal-toggle {
          position: fixed;
          bottom: 22px;
          left: 22px;
          z-index: 9999;
          background: rgba(255, 255, 255, 0.94);
          backdrop-filter: blur(8px);
          border: 1.5px solid #d4af37;
          color: #6c2118;
          padding: 0.5rem 1rem;
          border-radius: 9999px;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          box-shadow: 0 4px 16px rgba(108, 33, 24, 0.15);
          cursor: pointer;
          transition: all 0.25s ease;
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        .floating-petal-toggle:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(233, 30, 99, 0.25);
          border-color: #e91e63;
          color: #b20e00;
        }

        /* Fixed Royal Wedding Frame Background */
        .fixed-wedding-frame {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          margin: 0 auto;
          width: 100%;
          max-width: 440px;
          height: 100vh;
          height: 100dvh;
          background-image: url('/assets/royal-wedding-bg.jpg');
          background-position: center top;
          background-size: 100% 100%;
          background-repeat: no-repeat;
          z-index: 1;
          pointer-events: none;
          box-shadow: 0 0 60px rgba(0, 0, 0, 0.7);
        }

        /* Container for scrollable content over the fixed background */
        .invitation-container-box {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 440px;
          min-height: 100vh;
          margin: 0 auto;
          background: transparent;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* Central Scroll Track with perfectly centered padding */
        .invitation-scroll-track {
          position: relative;
          z-index: 3;
          width: 100%;
          padding: 120px 48px 5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        /* Ganesha Header */
        .ganesha-section {
          width: 100%;
          margin: 0.8rem auto 1.8rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .ganesha-circle-aura {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: radial-gradient(circle at center, rgba(255, 215, 119, 0.45) 0%, rgba(242, 226, 206, 0.1) 75%);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 0.6rem;
        }

        .ganesha-icon {
          width: 64px;
          height: 64px;
          object-fit: contain;
          filter: drop-shadow(0 3px 6px rgba(178, 14, 0, 0.2));
        }

        .ganesha-shloka {
          font-size: 1.15rem;
          color: #b20e00;
          line-height: 1.6;
          letter-spacing: 0.02em;
          text-align: center;
          width: 100%;
        }

        /* Invocation */
        .invocation-section {
          width: 100%;
          margin: 0 auto 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .invocation-text {
          font-size: 1.25rem;
          color: #5c382f;
          line-height: 1.5;
          font-weight: 600;
          text-align: center;
          width: 100%;
        }

        /* Couple Intro */
        .couple-intro-section {
          width: 100%;
          margin: 0 auto 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .groom-block,
        .bride-block {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .name-cursive {
          font-size: 3.8rem;
          color: #b20e00;
          font-weight: 700;
          line-height: 1.05;
          margin-bottom: 0.2rem;
          letter-spacing: 0.02em;
          text-shadow: 1px 1px 0px #ffe5b4;
          text-align: center;
          width: 100%;
        }

        .parentage-text {
          font-size: 1.15rem;
          color: #5c382f;
          line-height: 1.45;
          font-weight: 600;
          text-align: center;
          width: 100%;
        }

        .with-connector {
          font-size: 2.2rem;
          color: #b20e00;
          margin: 0.6rem auto;
          text-align: center;
          width: 100%;
        }

        /* Small Delicate Floral Divider */
        .divider-ornament {
          width: 140px;
          margin: 1.4rem auto;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .divider-img {
          width: 100%;
          height: auto;
          object-fit: contain;
          filter: drop-shadow(0 2px 4px rgba(108, 33, 24, 0.12));
          display: block;
          margin: 0 auto;
        }

        /* Save This Moment & Date Plaque */
        .save-moment-block {
          width: 100%;
          margin: 1.5rem auto 1.2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .save-moment-heading {
          font-size: 3rem;
          color: #b20e00;
          font-weight: 700;
          line-height: 1.15;
          margin-bottom: 0.1rem;
          letter-spacing: 0.01em;
        }

        .with-us-text {
          font-size: 1.6rem;
          color: #5c382f;
          font-weight: 600;
          font-style: italic;
          margin-bottom: 1rem;
        }

        .date-ornate-plaque {
          position: relative;
          width: 100%;
          max-width: 290px;
          background: linear-gradient(180deg, #fef6ec 0%, #faedd8 100%);
          border: 1.5px solid #c59b27;
          border-radius: 8px;
          padding: 0.75rem 1.2rem;
          margin: 0.4rem auto 1.5rem;
          box-shadow: 0 4px 15px rgba(108, 33, 24, 0.08);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .date-ornate-plaque::before {
          content: '';
          position: absolute;
          inset: 3px;
          border: 1px solid rgba(197, 155, 39, 0.4);
          border-radius: 5px;
          pointer-events: none;
        }

        .plaque-flourish {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          width: 100%;
        }

        .plaque-flourish.top {
          margin-bottom: 0.25rem;
        }

        .plaque-flourish.btm {
          margin-top: 0.25rem;
        }

        .flourish-line {
          flex: 1;
          max-width: 50px;
          height: 1px;
          background: linear-gradient(90deg, transparent, #c59b27, transparent);
        }

        .flourish-icon {
          font-size: 0.65rem;
          color: #c59b27;
        }

        .date-plaque-text {
          font-size: 1.4rem;
          color: #42221b;
          font-weight: 700;
          letter-spacing: 0.02em;
        }

        /* Ceremonies Steps with Generous Spacing */
        .ceremony-step {
          margin: 1.8rem auto 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          width: 100%;
        }

        .ceremony-date-banner {
          font-size: 1.35rem;
          color: #42221b;
          font-weight: 700;
          margin-bottom: 0.8rem;
          letter-spacing: 0.02em;
          text-align: center;
          width: 100%;
        }

        .ceremony-art-box {
          width: 220px;
          height: 180px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 0.8rem;
        }

        .ceremony-illustration {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          filter: drop-shadow(0 4px 10px rgba(108, 33, 24, 0.12));
          display: block;
          margin: 0 auto;
        }

        .haldi-art {
          width: 185px;
        }

        .sangeet-art {
          width: 200px;
        }

        .baarat-art {
          width: 225px;
        }

        .lunch-art {
          width: 195px;
        }

        .phere-art {
          width: 195px;
        }

        .ceremony-title {
          font-size: 3.1rem;
          color: #b20e00;
          font-weight: 700;
          line-height: 1.1;
          margin-bottom: 0.3rem;
          text-align: center;
          width: 100%;
        }

        .ceremony-time {
          font-size: 1.3rem;
          color: #5c382f;
          font-weight: 600;
          margin-bottom: 0.2rem;
          text-align: center;
          width: 100%;
        }

        .ceremony-attire {
          font-size: 1.1rem;
          color: #5c382f;
          font-weight: 500;
          margin-bottom: 0.3rem;
          text-align: center;
          width: 100%;
        }

        /* Couple Traditional Wedding Photo */
        .couple-photo-card {
          margin: 2.2rem auto 2rem;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .wedding-photo-wrapper {
          width: 260px;
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 10px 25px rgba(108, 33, 24, 0.2);
          border: 2px solid #e2c07a;
          margin: 0 auto;
        }

        .couple-traditional-photo {
          width: 100%;
          height: auto;
          display: block;
          object-fit: cover;
          margin: 0 auto;
        }

        /* Venue Block with Comfortable Padding */
        .venue-block {
          margin: 2rem auto 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          width: 100%;
        }

        .venue-script {
          font-size: 2.2rem;
          color: #b20e00;
          margin-bottom: 0.1rem;
          font-weight: 700;
          text-align: center;
          width: 100%;
        }

        .venue-heading {
          font-size: 2.6rem;
          color: #5c382f;
          font-weight: 700;
          margin-bottom: 0.2rem;
          text-align: center;
          width: 100%;
        }

        .venue-address-text {
          font-size: 1.15rem;
          color: #5c382f;
          margin-bottom: 1.4rem;
          font-weight: 600;
          text-align: center;
          width: 100%;
        }

        .map-view-box {
          position: relative;
          width: 260px;
          border-radius: 14px;
          overflow: hidden;
          border: 2px solid #5c382f;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
          margin: 0 auto 1.6rem;
        }

        .map-click-link {
          display: block;
          position: relative;
          text-decoration: none;
        }

        .map-image-art {
          width: 100%;
          height: auto;
          display: block;
          margin: 0 auto;
        }

        .map-overlay-badge {
          position: absolute;
          bottom: 8px;
          right: 8px;
          background: rgba(178, 14, 0, 0.9);
          color: #ffffff;
          padding: 0.35rem 0.75rem;
          border-radius: 6px;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.04em;
        }

        .venue-cta-row {
          display: flex;
          gap: 0.8rem;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          width: 100%;
        }

        .btn-royal-gold {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background: linear-gradient(135deg, #c59b27 0%, #a67c1e 100%);
          color: #ffffff;
          padding: 0.8rem 1.6rem;
          border-radius: 9999px;
          font-family: var(--font-cinzel);
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-decoration: none;
          box-shadow: 0 4px 14px rgba(197, 155, 39, 0.35);
          border: 1.5px solid #f9e29a;
          transition: transform 0.2s ease;
        }

        .btn-royal-gold:hover {
          transform: translateY(-2px);
        }

        /* Awaiting Section */
        .awaiting-section {
          margin: 1.5rem auto 2rem;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .awaiting-quote {
          font-size: 1.35rem;
          color: #5c382f;
          line-height: 1.45;
          font-weight: 600;
          margin-bottom: 0.5rem;
          text-align: center;
          width: 100%;
        }

        /* Reception Portrait & Family Title */
        .reception-portrait-card {
          margin: 2.2rem auto 2.5rem;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          position: relative;
        }

        .golden-frame-portrait {
          position: relative;
          width: 100%;
          max-width: 290px;
          border-radius: 20px;
          overflow: hidden;
          border: 3px solid #d4af37;
          box-shadow: 0 12px 30px rgba(108, 33, 24, 0.25), 0 0 18px rgba(212, 175, 55, 0.25);
          margin: 0 auto 1.5rem;
          background: #1a0808;
        }

        .reception-couple-img,
        .reception-couple-video {
          width: 100%;
          height: auto;
          aspect-ratio: 16 / 9;
          display: block;
          object-fit: cover;
          margin: 0 auto;
          border-radius: 17px;
        }

        .family-title {
          font-size: 3.4rem;
          color: #b20e00;
          font-weight: 700;
          line-height: 1.15;
          letter-spacing: 0.02em;
          text-shadow: 2px 2px 0px #ffe5b4, 0 3px 12px rgba(178, 14, 0, 0.15);
          margin: 0.5rem auto 1.2rem;
          text-align: center;
          width: 100%;
        }

        /* Delicate Corner Floral Lanterns */
        .royal-corner-decorations {
          position: relative;
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-top: -1rem;
          pointer-events: none;
        }

        .corner-decor {
          width: 80px;
          height: auto;
          object-fit: contain;
          filter: drop-shadow(0 4px 8px rgba(108, 33, 24, 0.15));
        }

        .decor-right {
          transform: scaleX(-1);
        }

        /* Social Share */
        .social-share-card {
          background: rgba(255, 255, 255, 0.95);
          border: 1.5px solid #d4af37;
          border-radius: 16px;
          padding: 1.8rem 1.4rem;
          margin: 2rem auto 1.5rem;
          width: 100%;
          box-shadow: 0 6px 20px rgba(108, 33, 24, 0.08);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .share-heading {
          font-size: 2rem;
          color: #b20e00;
          margin-bottom: 0.3rem;
          text-align: center;
          width: 100%;
        }

        .share-sub {
          font-size: 1.05rem;
          color: #5c382f;
          margin-bottom: 1.2rem;
          text-align: center;
          width: 100%;
        }

        .share-buttons-row {
          display: flex;
          gap: 0.8rem;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          width: 100%;
        }

        .btn-whatsapp {
          background: #25d366;
          color: #ffffff;
          padding: 0.75rem 1.4rem;
          border-radius: 9999px;
          border: none;
          font-weight: 700;
          cursor: pointer;
          font-size: 0.82rem;
          transition: transform 0.2s ease;
        }

        .btn-whatsapp:hover {
          transform: translateY(-2px);
        }

        .btn-copy-link {
          background: #fdfaf3;
          color: #6c2118;
          border: 1px solid #d4af37;
          padding: 0.75rem 1.4rem;
          border-radius: 9999px;
          font-weight: 700;
          cursor: pointer;
          font-size: 0.82rem;
          transition: transform 0.2s ease;
        }

        .btn-copy-link:hover {
          background: #ffffff;
          transform: translateY(-2px);
        }

        /* Page Footer */
        .page-footer {
          margin-top: 2.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(212, 175, 55, 0.4);
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .footer-hashtag {
          font-size: 3.2rem;
          color: #b20e00;
          line-height: 1;
          margin-bottom: 0.4rem;
          text-align: center;
          width: 100%;
        }

        .footer-blessing {
          font-size: 1.05rem;
          color: #6c2118;
          margin-bottom: 0.5rem;
          text-align: center;
          width: 100%;
        }

        .footer-credits {
          font-size: 0.78rem;
          color: #8c6e67;
          letter-spacing: 0.08em;
          text-align: center;
          width: 100%;
        }

        @media (max-width: 480px) {
          .fixed-wedding-frame {
            left: 0;
            right: 0;
            margin: 0 auto;
            max-width: 100vw;
            width: 100vw;
            box-shadow: none;
          }
          .invitation-container-box {
            max-width: 100vw;
          }
          .invitation-scroll-track {
            padding: 110px 38px 4rem;
          }
          .name-cursive {
            font-size: 3.2rem;
          }
          .ceremony-title {
            font-size: 2.6rem;
          }
          .family-title {
            font-size: 2.8rem;
          }
          .corner-decor {
            width: 65px;
          }
          .ceremony-art-box {
            width: 190px;
            height: 155px;
          }
        }
      `}</style>
    </main>
  );
}
