import { useEffect, useRef, useState } from 'react';

interface YouTubeBackgroundProps {
  videoId: string;
  opacity?: number;
}

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export function YouTubeBackground({ videoId, opacity = 0.25 }: YouTubeBackgroundProps) {
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Start video initialization immediately for better UX
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100); // Reduced from 500ms to 100ms

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    // Load YouTube IFrame API
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      tag.async = true;
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    // Initialize player when API is ready
    const initPlayer = () => {
      if (containerRef.current && !playerRef.current) {
        playerRef.current = new window.YT.Player(containerRef.current, {
          videoId: videoId,
          playerVars: {
            autoplay: 1,
            mute: 1,
            controls: 0,
            showinfo: 0,
            modestbranding: 1,
            playsinline: 1,
            rel: 0,
            enablejsapi: 1,
            disablekb: 1,
            iv_load_policy: 3,
            start: 1.5,
            // Optimized quality settings - 720p is sweet spot for performance
            quality: 'hd720',
            vq: 'hd720',
            hd: 1
          },
          events: {
            onReady: (event: any) => {
              // Start playing from 1.5 seconds when ready
              event.target.seekTo(1.5, true);
              event.target.playVideo();
              // Force 720p for optimal performance
              event.target.setPlaybackQuality('hd720');
            },
            onStateChange: (event: any) => {
              // When video ends (state 0), restart from 1.5 seconds
              if (event.data === window.YT.PlayerState.ENDED) {
                event.target.seekTo(1.5, true);
                event.target.playVideo();
              }
              // If video pauses for any reason, restart it
              if (event.data === window.YT.PlayerState.PAUSED) {
                event.target.playVideo();
              }
            }
          }
        });
      }
    };

    // Check if API is already loaded
    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      // Wait for API to load
      window.onYouTubeIframeAPIReady = initPlayer;
    }

    // Cleanup
    return () => {
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [videoId, isVisible]);

  if (!isVisible) {
    return null;
  }

  return (
    <div 
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        opacity: opacity,
        willChange: 'opacity',
        overflow: 'hidden',
        backgroundColor: '#151E35' // Match background while loading
      }}
    >
      <div
        ref={containerRef}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%) scale(1.1)', // Scale up to ensure full coverage
          width: '100vw',
          height: '56.25vw', // 16:9 aspect ratio
          minHeight: '110vh', // Slightly larger to ensure no gaps
          minWidth: '195.56vh', // Adjusted for scale
          pointerEvents: 'none'
        }}
      />
    </div>
  );
}