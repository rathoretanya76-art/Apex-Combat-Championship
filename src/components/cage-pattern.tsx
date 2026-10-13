interface CagePatternProps {
  opacity?: number;
  className?: string;
}

export function CagePattern({ opacity = 0.1, className = '' }: CagePatternProps) {
  return (
    <div 
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ opacity }}
    >
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="cage-wire"
            x="0"
            y="0"
            width="30"
            height="30"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 0 0 L 30 0 L 30 30 L 0 30 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-primary/30"
            />
            <path
              d="M 15 0 L 15 30 M 0 15 L 30 15"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.3"
              className="text-primary/20"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cage-wire)" />
      </svg>
    </div>
  );
}

interface CageOverlayProps {
  intensity?: 'subtle' | 'medium' | 'strong';
  className?: string;
}

export function CageOverlay({ intensity = 'subtle', className = '' }: CageOverlayProps) {
  const opacityMap = {
    subtle: 0.05,
    medium: 0.15,
    strong: 0.25,
  };

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      <div 
        className="absolute inset-0 cage-pattern-subtle"
        style={{ opacity: opacityMap[intensity] }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20" />
    </div>
  );
}
