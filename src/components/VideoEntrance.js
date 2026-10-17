'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

/**
 * VideoEntrance Component
 * 
 * Requirements:
 * 1. No buttons, no text, no overlays — only the video is visible.
 * 2. On click/tap, the video starts playing.
 * 3. 3 seconds before the video ends, its visibility starts decreasing (smooth 3s fade down).
 * 4. Disappears completely when finished and triggers background audio.
 * 5. When the user reaches the page after the video closes, they always start at the very top.
 * 6. No video player controls shown.
 */
export default function VideoEntrance({ isOpen, onOpen, onPlayAudio }) {
  const [hasStarted, setHasStarted] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const videoRef = useRef(null);
  const isFinishedRef = useRef(false);

  const scrollToTop = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      if (document.documentElement) document.documentElement.scrollTop = 0;
      if (document.body) document.body.scrollTop = 0;
    }
  }, []);

  const handleEnded = useCallback(() => {
    if (isFinishedRef.current) return;
    isFinishedRef.current = true;

    // Ensure user starts at the very top when video closes
    scrollToTop();

    if (onPlayAudio) {
      onPlayAudio();
    }
    if (onOpen) {
      onOpen();
    }
  }, [onOpen, onPlayAudio, scrollToTop]);

  // Lock scroll on background body during video entrance and ensure scroll is reset to top
  useEffect(() => {
    if (isOpen) {
      if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      scrollToTop();
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      return () => {
        document.body.style.overflow = prevOverflow;
        scrollToTop();
      };
    }
  }, [isOpen, scrollToTop]);

  const handleClick = () => {
    if (hasStarted) return;
    setHasStarted(true);

    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Playback error, retrying muted:', err);
          if (videoRef.current) {
            videoRef.current.muted = true;
            videoRef.current.play().catch(() => {});
          }
        });
      }
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const { currentTime, duration } = videoRef.current;

    // Start decreasing visibility 3 seconds before end
    if (duration && duration > 3 && currentTime >= duration - 3.0) {
      if (!isFading) {
        setIsFading(true);
        scrollToTop();
      }
    }
  };

  // Fallback timer once fading starts: ensures transition finishes after 3 seconds
  useEffect(() => {
    if (isFading) {
      const timer = setTimeout(() => {
        handleEnded();
      }, 3100);
      return () => clearTimeout(timer);
    }
  }, [isFading, handleEnded]);

  if (!isOpen) return null;

  return (
    <div
      className={`video-entrance-wrapper ${isFading ? 'fade-down' : ''}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label="Video entrance"
    >
      <video
        ref={videoRef}
        src="/internce/inter.mp4"
        poster="/internce/inter-poster.jpg"
        playsInline
        webkit-playsinline="true"
        x5-playsinline="true"
        preload="auto"
        controls={false}
        disablePictureInPicture
        controlsList="nodownload nofullscreen noremoteplayback"
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        onContextMenu={(e) => e.preventDefault()}
        className="entrance-video"
      />

      <style jsx>{`
        .video-entrance-wrapper {
          position: fixed;
          inset: 0;
          z-index: 999999;
          background: #000;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          user-select: none;
          overflow: hidden;
          opacity: 1;
          transition: opacity 3s linear;
        }

        .video-entrance-wrapper.fade-down {
          opacity: 0;
          pointer-events: none;
        }

        .entrance-video {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
          pointer-events: none;
          background: #000;
        }

        @media (max-width: 768px) {
          .entrance-video {
            object-fit: cover;
          }
        }

        /* Hide all default browser controls */
        .entrance-video::-webkit-media-controls,
        .entrance-video::-webkit-media-controls-enclosure,
        .entrance-video::-webkit-media-controls-panel,
        .entrance-video::-webkit-media-controls-play-button,
        .entrance-video::-webkit-media-controls-timeline,
        .entrance-video::-webkit-media-controls-current-time-display,
        .entrance-video::-webkit-media-controls-time-remaining-display,
        .entrance-video::-webkit-media-controls-mute-button,
        .entrance-video::-webkit-media-controls-toggle-closed-captions-button,
        .entrance-video::-webkit-media-controls-volume-slider {
          display: none !important;
          -webkit-appearance: none !important;
          opacity: 0 !important;
        }
      `}</style>
    </div>
  );
}
