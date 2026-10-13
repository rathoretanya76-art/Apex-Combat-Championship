"use client";

import { useEffect, useRef, useState } from 'react';
import { Trophy, Zap, Users, Globe } from 'lucide-react';

interface Stat {
  icon: React.ReactNode;
  value: number;
  label: string;
  suffix?: string;
}

const stats: Stat[] = [
  {
    icon: <Trophy className="size-8 md:size-10" />,
    value: 247,
    label: 'Total Fights',
    suffix: '+',
  },
  {
    icon: <Zap className="size-8 md:size-10" />,
    value: 156,
    label: 'Knockouts',
    suffix: '',
  },
  {
    icon: <Users className="size-8 md:size-10" />,
    value: 189,
    label: 'Active Fighters',
    suffix: '',
  },
  {
    icon: <Globe className="size-8 md:size-10" />,
    value: 42,
    label: 'Countries',
    suffix: '',
  },
];

function useCountUp(end: number, duration: number = 2000, isVisible: boolean = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, isVisible]);

  return count;
}

export function StatsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="w-full py-16 md:py-20 relative overflow-hidden">
      {/* Background with cage pattern */}
      <div className="absolute inset-0 cage-pattern-subtle opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-center font-headline text-3xl md:text-5xl font-black uppercase tracking-wider text-primary mb-4 combat-shadow-strong">
          By The Numbers
        </h2>
        <p className="text-center text-muted-foreground text-lg mb-12 max-w-2xl mx-auto">
          The proof is in the octagon. Our legacy speaks for itself.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} isVisible={isVisible} delay={index * 100} />
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ stat, isVisible, delay }: { stat: Stat; isVisible: boolean; delay: number }) {
  const count = useCountUp(stat.value, 2000, isVisible);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setShouldAnimate(true), delay);
      return () => clearTimeout(timer);
    }
  }, [isVisible, delay]);

  return (
    <div 
      className={`text-center group transition-all duration-700 ${
        shouldAnimate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="bg-card border-2 border-primary/20 rounded-lg p-6 md:p-8 transition-all duration-300 group-hover:border-primary group-hover:shadow-[0_0_30px_hsl(var(--primary)/0.5)] relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="relative z-10">
          <div className="text-primary mb-3 flex justify-center transition-transform duration-300 group-hover:scale-110">
            {stat.icon}
          </div>
          <div className="text-4xl md:text-5xl font-black font-headline text-primary mb-2 combat-shadow tabular-nums">
            {count}{stat.suffix}
          </div>
          <div className="text-sm md:text-base text-muted-foreground uppercase tracking-wider font-semibold">
            {stat.label}
          </div>
        </div>
      </div>
    </div>
  );
}
