'use client';

export default function AudioPlayer({ isPlaying, onTogglePlay }) {
  return (
    <aside 
      aria-label="Wedding Music Controller"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
      }}
    >
      <button
        onClick={onTogglePlay}
        className={`audio-btn ${isPlaying ? 'playing' : ''}`}
        aria-label={isPlaying ? 'Pause background wedding music' : 'Play wedding music'}
        title={isPlaying ? 'Pause Music' : 'Play Sahil & Anjali Wedding Music'}
      >
        {isPlaying ? (
          <div className="wave-box">
            <span className="sound-wave wave-1"></span>
            <span className="sound-wave wave-2"></span>
            <span className="sound-wave wave-3"></span>
            <span className="sound-wave wave-4"></span>
          </div>
        ) : (
          <span className="play-icon">🎵</span>
        )}
      </button>

      <style jsx>{`
        .audio-btn {
          width: 58px;
          height: 58px;
          border-radius: 50%;
          background: linear-gradient(135deg, #b20e00 0%, #6c2118 100%);
          border: 2px solid #e6ca65;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 8px 24px rgba(108, 33, 24, 0.45);
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .audio-btn:hover {
          transform: scale(1.1);
          box-shadow: 0 12px 30px rgba(178, 14, 0, 0.6);
        }
        .play-icon {
          font-size: 1.5rem;
        }
        .wave-box {
          display: flex;
          align-items: center;
          gap: 3px;
        }
        .sound-wave {
          display: inline-block;
          width: 3.5px;
          background-color: #ffffff;
          border-radius: 2px;
          animation: waveJump 1s ease-in-out infinite;
        }
        .wave-1 {
          height: 12px;
          animation-delay: 0s;
        }
        .wave-2 {
          height: 20px;
          animation-delay: 0.2s;
        }
        .wave-3 {
          height: 15px;
          animation-delay: 0.4s;
        }
        .wave-4 {
          height: 9px;
          animation-delay: 0.15s;
        }
        @keyframes waveJump {
          0%, 100% {
            transform: scaleY(0.4);
          }
          50% {
            transform: scaleY(1.3);
          }
        }
      `}</style>
    </aside>
  );
}
