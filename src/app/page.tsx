import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Trophy,
  Scale,
  Handshake,
  Dumbbell,
  Shield,
  Target,
  Sparkles,
  Flame,
  Users
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ApexLogo } from '@/components/logo';
import { placeholderImages, sponsors, upcomingEvents } from '@/lib/data';
import { Separator } from '@/components/ui/separator';
import { FadeIn } from '@/components/fade-in';
import { FighterRegistrationForm } from '@/components/fighter-registration-form';
import { ZoomParallax } from '@/components/ui/zoom-parallax';
import { FeatureCard } from '@/components/ui/feature-card';
import { DivisionCard } from '@/components/ui/division-card';
import { GalleryCard } from '@/components/ui/gallery-card';
import { CountdownTimer } from '@/components/countdown-timer';
import { StatsSection } from '@/components/stats-section';
import { CageOverlay } from '@/components/cage-pattern';
import { ScrollReveal, StaggerContainer, StaggerItem, FloatingElement } from '@/components/scroll-animations';

export default function Home() {
  const nextEvent = upcomingEvents[0];

  const whyApex = [
    {
      icon: <Target className="size-8 text-primary" />,
      title: 'Elite Competition',
      description: 'Face the world\'s most dangerous fighters in professionally sanctioned, high-stakes combat.',
    },
    {
      icon: <Shield className="size-8 text-primary" />,
      title: 'Uncompromising Standards',
      description: 'Expert commission judges, strict anti-doping regulations, and absolute fairness in every bout.',
    },
    {
      icon: <Trophy className="size-8 text-primary" />,
      title: 'Championship Glory',
      description: 'Prove yourself on the biggest global stage with multi-million dollar viewership.',
    },
    {
      icon: <Dumbbell className="size-8 text-primary" />,
      title: 'Warrior Discipline',
      description: 'Honor, martial arts respect, and the relentless pursuit of undisputed greatness.',
    },
  ];

  const whyApexImages = [
    placeholderImages.find(p => p.id === 'why-apex-1') || placeholderImages[0],
    placeholderImages.find(p => p.id === 'why-apex-2') || placeholderImages[1],
    placeholderImages.find(p => p.id === 'why-apex-3') || placeholderImages[2],
    placeholderImages.find(p => p.id === 'why-apex-4') || placeholderImages[3],
  ];

  const divisionCards = [
    {
      name: 'MMA',
      icon: '🥊',
      imageUrl: '/assets/images/mma-octagon.png',
      stats: 'The pinnacle of mixed martial arts combat.',
    },
    {
      name: 'Boxing',
      icon: '🥊',
      imageUrl: '/assets/images/1.png',
      stats: 'The sweet science of precision striking.',
    },
    {
      name: 'Kickboxing',
      icon: '🦵',
      imageUrl: '/assets/images/kickboxing-match.png',
      stats: 'Devastating kicks, knees, and explosive power.',
    },
    {
      name: 'Grappling',
      icon: '🤼',
      imageUrl: '/assets/images/fighter-prep.png',
      stats: 'The tactical chess match of submissions.',
    },
  ];

  const galleryImages = placeholderImages.filter(p => p.group === 'home-gallery');

  const parallaxImages = [
    { src: '/assets/promo.mp4', alt: 'Apex Combat Athlete' },
    placeholderImages.find(p => p.id === 'gallery-2'),
    placeholderImages.find(p => p.id === 'gallery-4'),
    placeholderImages.find(p => p.id === 'gallery-8'),
    placeholderImages.find(p => p.id === 'gallery-3'),
    placeholderImages.find(p => p.id === 'home-gallery-2'),
    placeholderImages.find(p => p.id === 'video-thumb'),
  ].filter((p): p is NonNullable<typeof p> => !!p).map(p => {
    if ('src' in p) {
      return p;
    }
    return {
      src: p.imageUrl,
      alt: p.description
    };
  });

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <ZoomParallax images={parallaxImages}>
        <div className="relative z-10 p-4 sm:p-8 rounded-2xl bg-black/60 backdrop-blur-sm border border-white/10 shadow-2xl mx-4">
          <FloatingElement intensity={10}>
             <ApexLogo className="w-40 sm:w-56 md:w-64 h-auto mb-6 mx-auto drop-shadow-xl" />
          </FloatingElement>
          
          <h1 className="font-headline text-4xl sm:text-6xl md:text-8xl font-black tracking-wider text-primary uppercase text-shadow-md mb-2 leading-tight md:leading-none">
            Forged in Combat
          </h1>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-1 md:gap-4 mb-4">
             <p className="text-xl sm:text-2xl md:text-4xl font-body font-bold text-white uppercase tracking-widest drop-shadow-md">
               Proven in Blood.
             </p>
             <p className="text-xl sm:text-2xl md:text-4xl font-headline text-secondary uppercase tracking-widest drop-shadow-md">
               Crowned in Glory.
             </p>
          </div>

          <p className="max-w-2xl mx-auto mt-4 text-base md:text-xl text-gray-200 font-body font-medium leading-relaxed drop-shadow-sm">
            Where the world&apos;s most dangerous fighters prove their worth in the championship octagon.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="w-full sm:w-auto font-headline text-lg tracking-wide hover:scale-105 transition-transform aggressive-glow">
              <Link href="/events">
                Latest Events <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto font-headline text-lg tracking-wide hover:bg-white/10 hover:scale-105 transition-transform border-2">
              <Link href="/fighters">
                Fighter Roster
              </Link>
            </Button>
          </div>
        </div>
      </ZoomParallax>

      {/* Stats Section */}
      <ScrollReveal direction="up" delay={0.2}>
        <StatsSection />
      </ScrollReveal>

      {/* About Apex */}
      <ScrollReveal direction="fade">
        <section className="py-16 md:py-24 relative">
          <CageOverlay intensity="subtle" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <ScrollReveal direction="left" delay={0.2}>
                <div className="text-center md:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-headline uppercase tracking-widest font-bold mb-4">
                    <Flame className="w-4 h-4 text-primary" /> The Championship Heritage
                  </div>
                  <h2 className="font-headline text-3xl md:text-5xl font-black uppercase tracking-wider text-primary combat-shadow">
                    The Apex Championship Legacy
                  </h2>
                  <Separator className="w-24 h-1 mx-auto md:mx-0 my-6 bg-gradient-to-r from-primary to-secondary" />
                  <p className="text-xl md:text-2xl text-balance text-foreground leading-relaxed font-semibold mb-4">
                    <span className="text-primary font-bold">Apex Combat Championship</span> is where warriors become global legends.
                  </p>
                  <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
                    We don&apos;t just host fights—we forge champions. Built on a foundation of integrity, discipline, and respect, Apex is the ultimate proving ground for the world&apos;s most elite combat athletes.
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    <Button asChild variant="outline" className="border-primary/50 text-white hover:bg-primary/20">
                      <Link href="/about">
                        Meet Our Leadership & Story <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </ScrollReveal>
              <ScrollReveal direction="right" delay={0.3}>
                <div className="relative aspect-square rounded-lg overflow-hidden shadow-2xl shadow-primary/30 border-2 border-primary/20 group">
                  <Image
                    src="/assets/images/brand-story.jpg"
                    alt="Apex Combat Championship Brand Story"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 p-4 bg-black/60 backdrop-blur-md rounded-lg border border-white/10">
                    <p className="text-white font-headline text-xl font-bold uppercase tracking-wider">
                      Apex Global Sports & Entertainment
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Setting global standards for fighter longevity, safety & athletic supremacy.
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Upcoming Event Highlight */}
      <ScrollReveal direction="scale" delay={0.1}>
        <section className="py-16 md:py-24 bg-card relative overflow-hidden">
          <CageOverlay intensity="medium" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <ScrollReveal direction="left" delay={0.3}>
                <div className="text-center md:text-left">
                  <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/30 rounded-full mb-4">
                    <span className="text-primary font-headline text-sm uppercase tracking-widest font-bold flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                      Next World Title Fight Night
                    </span>
                  </div>
                  <h2 className="font-headline text-4xl md:text-6xl font-black uppercase tracking-wider text-primary combat-shadow-strong italic">
                    {nextEvent.name}
                  </h2>
                  <p className="text-lg md:text-xl text-white font-semibold mt-1">
                    {nextEvent.subtitle}
                  </p>
                  <p className="text-2xl md:text-3xl text-foreground mt-4 font-bold">
                    {nextEvent.date}
                  </p>
                  <p className="text-xl text-muted-foreground font-semibold">
                    {nextEvent.venue} • {nextEvent.location}
                  </p>
                  
                  <div className="mt-8 mb-8">
                    <CountdownTimer 
                      targetDate={nextEvent.isoDate} 
                      eventName={nextEvent.name}
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                    <Button asChild size="lg" className="aggressive-glow font-bold text-lg px-8 strike-animation">
                      <Link href="/events">
                        View Full Fight Card <ArrowRight className="ml-2" />
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="font-bold border-primary/40 hover:bg-primary/10">
                      <Link href="/events">
                        Get Tickets ({nextEvent.ticketPrice || 'Available Now'})
                      </Link>
                    </Button>
                  </div>
                </div>
              </ScrollReveal>
              <ScrollReveal direction="right" delay={0.4}>
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-2xl shadow-primary/40 border-2 border-primary/30 group">
                  <Image
                    src={nextEvent.posterUrl}
                    alt={nextEvent.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="px-2.5 py-1 bg-primary text-black font-headline font-black text-xs uppercase tracking-widest rounded mb-2 inline-block">
                      Main Event
                    </span>
                    <p className="text-white font-headline text-2xl md:text-3xl uppercase font-bold">
                      Silva vs Vance • Heavyweight Title
                    </p>
                    <p className="text-sm text-gray-300 mt-1">
                      Live on Worldwide Pay-Per-View
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Divisions Section */}
      <ScrollReveal direction="up" delay={0.1}>
        <section className="py-16 md:py-24 bg-black">
          <div className="container mx-auto px-4">
             <ScrollReveal direction="scale" delay={0.2}>
               <h2 className="text-center font-headline text-3xl md:text-5xl font-bold uppercase tracking-wider text-primary">
                 Our Combat Divisions
               </h2>
               <Separator className="w-24 h-1 mx-auto my-6 bg-primary" />
               <p className="text-center text-muted-foreground text-lg max-w-2xl mx-auto mb-10">
                 Explore elite combat divisions sanctioned under international athletic regulations.
               </p>
             </ScrollReveal>
            <StaggerContainer staggerDelay={0.12} className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {divisionCards.map((division) => (
                <StaggerItem key={division.name} className="h-[450px]">
                  <DivisionCard
                    imageUrl={division.imageUrl}
                    name={division.name}
                    icon={division.icon}
                    description={division.stats}
                    href={`/fighters?division=${encodeURIComponent(division.name)}`}
                    accentColor="0 84.2% 60.2%"
                  />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      </ScrollReveal>

      {/* Why Apex Section */}
      <ScrollReveal direction="up" delay={0.1}>
        <section className="py-16 md:py-24 relative">
          <CageOverlay intensity="subtle" />
          <div className="container mx-auto px-4 relative z-10">
            <ScrollReveal direction="scale" delay={0.2}>
              <h2 className="text-center font-headline text-3xl md:text-5xl font-black uppercase tracking-wider text-primary combat-shadow-strong">The Apex Difference</h2>
              <Separator className="w-32 h-1 mx-auto my-6 bg-gradient-to-r from-transparent via-primary to-transparent" />
              <p className="text-center text-muted-foreground text-lg max-w-3xl mx-auto mb-12">
                We don&apos;t compromise. We don&apos;t settle. We set the standard for combat sports excellence.
              </p>
            </ScrollReveal>
            <StaggerContainer staggerDelay={0.15} className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {whyApex.map((item, index) => (
                <StaggerItem key={index} className="h-96">
                  <FeatureCard
                    imageUrl={whyApexImages[index]?.imageUrl || '/assets/images/hero-bg.jpg'}
                    imageAlt={item.title}
                    icon={item.icon}
                    title={item.title}
                    description={item.description}
                  />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      </ScrollReveal>

      {/* Gallery Preview */}
      <ScrollReveal direction="up" delay={0.1}>
        <section className="py-16 md:py-24 bg-card/50">
          <div className="container mx-auto px-4">
            <ScrollReveal direction="scale" delay={0.2}>
              <h2 className="text-center font-headline text-3xl md:text-5xl font-bold uppercase tracking-wider text-primary">Combat Gallery</h2>
              <Separator className="w-24 h-1 mx-auto my-6 bg-primary" />
              <p className="text-center text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
                Unfiltered intensity captured in the heat of battle.
              </p>
            </ScrollReveal>
            <StaggerContainer staggerDelay={0.08} className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
              {galleryImages.map((image, i) => (
                <StaggerItem key={image.id} className={` ${i >= 2 ? 'hidden md:block' : ''}`}>
                  <GalleryCard
                     src={image.imageUrl}
                     alt={image.description}
                     caption={image.description}
                     aspectRatio="video"
                     className="h-full w-full"
                  />
                </StaggerItem>
              ))}
            </StaggerContainer>
            <div className="text-center mt-8">
              <Button asChild variant="outline" size="lg" className="border-primary/40 text-white hover:bg-primary/20">
                <Link href="/gallery-contact">View Full Gallery & Media Archive</Link>
              </Button>
            </div>
          </div>
        </section>
      </ScrollReveal>
      
      {/* Fighter Registration */}
      <ScrollReveal direction="scale" delay={0.1}>
        <section className="py-16 md:py-24" id="register">
          <div className="container mx-auto px-4 max-w-3xl">
            <ScrollReveal direction="up" delay={0.2}>
              <h2 className="text-center font-headline text-3xl md:text-5xl font-bold uppercase tracking-wider text-primary">Join the Ranks</h2>
              <Separator className="w-24 h-1 mx-auto my-6 bg-primary" />
              <p className="text-center text-muted-foreground text-lg mb-12">
                Think you have what it takes to compete under the lights? Apply directly to the Apex Matchmaking Commission.
              </p>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.3}>
              <FighterRegistrationForm />
            </ScrollReveal>
          </div>
        </section>
      </ScrollReveal>

      {/* Sponsors Section */}
      <ScrollReveal direction="up" delay={0.1}>
        <section className="py-16 md:py-24 bg-black border-t border-primary/20 overflow-hidden">
          <div className="container mx-auto px-4">
            <ScrollReveal direction="scale" delay={0.2}>
              <div className="text-center mb-10">
                <span className="text-xs font-headline uppercase tracking-widest text-primary font-bold">
                  Corporate Alliances & Partners
                </span>
                <h2 className="font-headline text-3xl md:text-5xl font-bold uppercase tracking-wider text-white mt-1">
                  Official Global Partners
                </h2>
                <Separator className="w-24 h-1 mx-auto my-4 bg-primary" />
              </div>
            </ScrollReveal>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-6xl mx-auto">
              {sponsors.map((sponsor) => (
                <div 
                  key={sponsor.name}
                  className="bg-card/70 border border-primary/20 rounded-lg p-5 flex flex-col items-center justify-center text-center hover:border-primary transition-all duration-300 group hover:shadow-[0_0_20px_hsl(var(--primary)/0.3)]"
                >
                  <span className="text-[10px] uppercase font-mono tracking-widest text-primary/80 mb-2">
                    {sponsor.category}
                  </span>
                  <h4 className="font-headline text-lg font-black text-white uppercase group-hover:text-primary transition-colors">
                    {sponsor.name}
                  </h4>
                  <span className="text-xs text-muted-foreground mt-1">
                    {sponsor.badge}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}