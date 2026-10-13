import React from 'react';

interface ApexLogoProps {
  className?: string;
  showSubtitle?: boolean;
}

export function ApexLogo({ className = 'h-10 w-auto', showSubtitle = true }: ApexLogoProps) {
  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Dynamic Geometric Apex Crest */}
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10 shrink-0 drop-shadow-[0_0_12px_rgba(245,158,11,0.45)]"
      >
        <defs>
          <linearGradient id="apexGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="35%" stopColor="#F59E0B" />
            <stop offset="70%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#92400E" />
          </linearGradient>
          <linearGradient id="apexCrimsonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EF4444" />
            <stop offset="100%" stopColor="#991B1B" />
          </linearGradient>
          <linearGradient id="apexDarkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E1E24" />
            <stop offset="100%" stopColor="#0B0B0E" />
          </linearGradient>
        </defs>

        {/* Octagonal Outer Shield */}
        <polygon
          points="14,3 34,3 45,14 45,34 34,45 14,45 3,34 3,14"
          fill="url(#apexDarkGrad)"
          stroke="url(#apexGoldGrad)"
          strokeWidth="1.8"
        />

        {/* Inner Octagonal Border */}
        <polygon
          points="16,6 32,6 42,16 42,32 32,42 16,42 6,32 6,16"
          fill="none"
          stroke="url(#apexGoldGrad)"
          strokeWidth="0.8"
          strokeOpacity="0.4"
        />

        {/* Stylized Apex Peak / Monogram 'A' */}
        {/* Left leg of A */}
        <polygon
          points="24,10 13,38 18,38 24,23"
          fill="url(#apexGoldGrad)"
        />
        {/* Right leg of A */}
        <polygon
          points="24,10 35,38 30,38 24,23"
          fill="url(#apexGoldGrad)"
        />
        {/* Center Crossbar Blade */}
        <polygon
          points="17,29 31,29 29,32 19,32"
          fill="url(#apexCrimsonGrad)"
        />
        {/* Top Diamond Apex Crown */}
        <polygon
          points="24,8 27,12 24,15 21,12"
          fill="#FEF08A"
        />
      </svg>

      {/* Brand Typography */}
      <div className="flex flex-col leading-none">
        <div className="flex items-center tracking-widest font-black text-xl italic font-sans text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          APEX
        </div>
        {showSubtitle && (
          <span className="text-[9px] font-bold tracking-[0.22em] text-red-500 uppercase font-sans mt-0.5">
            Combat Championship
          </span>
        )}
      </div>
    </div>
  );
}
