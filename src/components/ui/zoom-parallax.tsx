'use client';

import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef, ReactNode, useEffect, useState } from 'react';

interface Image {
  src: string;
  alt?: string;
}

interface ZoomParallaxProps {
  /** Array of images to be displayed in the parallax effect max 7 images */
  images: Image[];
  children?: ReactNode;
}

export function ZoomParallax({ images, children }: ZoomParallaxProps) {
  const container = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  // Soft, GPU-friendly cinematic zooms (eliminating heavy 9x texture-rasterization lag)
  const scaleCenter = useTransform(scrollYProgress, [0, 1], isMobile ? [1, 1.1] : [1, 1.4]);
  const scaleCard1 = useTransform(scrollYProgress, [0, 1], isMobile ? [1, 1.05] : [1, 1.55]);
  const scaleCard2 = useTransform(scrollYProgress, [0, 1], isMobile ? [1, 1.05] : [1, 1.45]);
  const scaleCard3 = useTransform(scrollYProgress, [0, 1], isMobile ? [1, 1.05] : [1, 1.5]);
  const scaleCard4 = useTransform(scrollYProgress, [0, 1], isMobile ? [1, 1.05] : [1, 1.35]);
  const scaleCard5 = useTransform(scrollYProgress, [0, 1], isMobile ? [1, 1.05] : [1, 1.4]);
  const scaleCard6 = useTransform(scrollYProgress, [0, 1], isMobile ? [1, 1.05] : [1, 1.3]);

  const scales = [scaleCenter, scaleCard1, scaleCard2, scaleCard3, scaleCard4, scaleCard5, scaleCard6];
  
  // Soft hero text fade out as user scrolls
  const textOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const textScale = useTransform(scrollYProgress, [0, 0.45], [1, 0.95]);

  // Mobile: Show clean static media hero
  if (isMobile) {
    const isVideo = images[0]?.src.endsWith('.mp4');
    return (
      <div ref={container} className="relative h-[120vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="absolute top-0 flex h-full w-full items-center justify-center">
            <div className="relative h-full w-full">
              {isVideo ? (
                <video
                  src={images[0]?.src || '/placeholder.svg'}
                  className="h-full w-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                />
              ) : (
                <img
                  src={images[0]?.src || '/placeholder.svg'}
                  alt={images[0]?.alt || 'Hero image'}
                  className="h-full w-full object-cover"
                />
              )}
            </div>
          </div>
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center p-4 bg-black/60 backdrop-blur-[2px]">
            {children}
          </div>
        </div>
      </div>
    );
  }

  // Desktop: Fluid, GPU-accelerated cinematic parallax
  return (
    <div ref={container} className="relative h-[175vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {images.map(({ src, alt }, index) => {
          const scale = scales[index % scales.length];
          const isVideo = src.endsWith('.mp4');

          return (
            <motion.div
              key={index}
              style={{ scale }}
              className={`absolute top-0 flex h-full w-full items-center justify-center transform-gpu will-change-transform ${
                index === 1 ? '[&>div]:!-top-[28vh] [&>div]:!left-[6vw] [&>div]:!h-[28vh] [&>div]:!w-[32vw]' : ''
              } ${
                index === 2 ? '[&>div]:!-top-[8vh] [&>div]:!-left-[24vw] [&>div]:!h-[42vh] [&>div]:!w-[22vw]' : ''
              } ${
                index === 3 ? '[&>div]:!left-[26vw] [&>div]:!h-[24vh] [&>div]:!w-[24vw]' : ''
              } ${
                index === 4 ? '[&>div]:!top-[26vh] [&>div]:!left-[6vw] [&>div]:!h-[24vh] [&>div]:!w-[22vw]' : ''
              } ${
                index === 5 ? '[&>div]:!top-[26vh] [&>div]:!-left-[22vw] [&>div]:!h-[24vh] [&>div]:!w-[28vw]' : ''
              } ${
                index === 6 ? '[&>div]:!top-[20vh] [&>div]:!left-[24vw] [&>div]:!h-[16vh] [&>div]:!w-[16vw]' : ''
              }`}
            >
              <div className="relative h-[25vh] w-[25vw] rounded-xl overflow-hidden shadow-2xl border border-white/10">
                {isVideo ? (
                  <video
                    src={src || '/placeholder.svg'}
                    className="h-full w-full object-cover transform-gpu"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                  />
                ) : (
                  <img
                    src={src || '/placeholder.svg'}
                    alt={alt || `Parallax image ${index + 1}`}
                    className="h-full w-full object-cover transform-gpu"
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                )}
                <div className="absolute inset-0 bg-black/25 pointer-events-none" />
              </div>
            </motion.div>
          );
        })}

        <motion.div
          style={{ opacity: textOpacity, scale: textScale }}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center p-4 bg-black/60 pointer-events-none [&>*]:pointer-events-auto transform-gpu will-change-[opacity,transform]"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
