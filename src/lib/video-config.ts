/**
 * Video Configuration
 * Central point for video asset management across Apex Combat Championship
 */

export const VIDEO_CONFIG = {
  // Main promotional combat video
  VIDEO_URL: '/assets/promo.mp4',
  
  // Fallback high-impact image when video doesn't load or on low-power devices
  FALLBACK_IMAGE: '/assets/images/event-poster.jpg',
  
  // Video properties
  AUTOPLAY: true,
  MUTED: true,
  LOOP: true,
  PRELOAD: 'metadata' as const,
};

// Helper function to get video element props
export const getVideoProps = () => ({
  autoPlay: VIDEO_CONFIG.AUTOPLAY,
  muted: VIDEO_CONFIG.MUTED,
  loop: VIDEO_CONFIG.LOOP,
  playsInline: true,
  preload: VIDEO_CONFIG.PRELOAD,
});
