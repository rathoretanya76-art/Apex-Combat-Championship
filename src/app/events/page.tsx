"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  CalendarDays, 
  MapPin, 
  Ticket, 
  Trophy, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  Shield,
  Flame,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { upcomingEvents, pastEvents, type ApexEvent } from '@/lib/data';
import { FadeIn } from '@/components/fade-in';
import { CountdownTimer } from '@/components/countdown-timer';
import { ScrollProgressBar } from '@/components/scroll-animations';
import { getVideoProps } from '@/lib/video-config';
import { useToast } from '@/hooks/use-toast';

export default function EventsPage() {
  const { toast } = useToast();
  const [selectedTicketEvent, setSelectedTicketEvent] = useState<ApexEvent | null>(null);
  const [ticketTier, setTicketTier] = useState<'Standard' | 'Ringside' | 'VIP Cage-Side'>('Ringside');
  const [ticketQuantity, setTicketQuantity] = useState(2);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [activeTicketCode, setActiveTicketCode] = useState('');

  const handleBookTickets = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTicketEvent) return;
    setIsPurchasing(true);
    try {
      const { db } = await import('@/lib/mock-db');
      const createdTicket = await db.tickets.create({
        eventId: selectedTicketEvent.id,
        eventName: selectedTicketEvent.name,
        customerName: 'Demo Registered Fan',
        customerEmail: 'fan.demo@apexchampionship.com',
        tier: ticketTier,
        quantity: ticketQuantity,
      });

      setActiveTicketCode(createdTicket.ticketCode);
      setPurchaseSuccess(true);
      toast({
        title: '🎟️ Tickets Saved in IndexedDB!',
        description: `Pass Code: ${createdTicket.ticketCode}. ${ticketQuantity}x ${ticketTier} seats confirmed.`,
        duration: 5000,
      });
    } catch (err) {
      console.error('[IndexedDB Ticket Error]', err);
      toast({
        title: 'Reservation Error',
        description: 'Failed to record reservation in database.',
        variant: 'destructive',
      });
    } finally {
      setIsPurchasing(false);
    }
  };

  const closeTicketModal = () => {
    setSelectedTicketEvent(null);
    setPurchaseSuccess(false);
  };

  const mainEvent = upcomingEvents[0];

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollProgressBar />

      {/* Hero Section */}
      <div className="relative w-full h-[70vh] md:h-[88vh] overflow-hidden bg-black">
        <video 
          {...getVideoProps()}
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="/assets/promo.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 cage-pattern-subtle opacity-25" />
        
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4 z-10 max-w-4xl mx-auto">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 border border-primary/40 text-primary text-xs font-headline uppercase tracking-widest font-bold mb-4">
              <Flame className="w-4 h-4 text-primary" /> Official Worldwide Fight Calendar
            </div>
            <h1 className="font-headline text-5xl md:text-8xl font-black uppercase tracking-wider text-primary combat-shadow-strong mb-4">
              Fight Nights
            </h1>
            <p className="mt-2 text-lg md:text-2xl text-white font-medium max-w-2xl mx-auto leading-relaxed">
              Witness the glory. Experience the violence. Remember the champions.
            </p>
            <Separator className="w-32 h-1 mx-auto mt-6 bg-gradient-to-r from-transparent via-primary to-transparent" />
            
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <Button 
                onClick={() => setSelectedTicketEvent(mainEvent)}
                size="lg" 
                className="aggressive-glow font-bold text-lg px-8 strike-animation"
              >
                <Ticket className="mr-2 h-5 w-5" /> Reserve Fight Night Tickets
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 font-bold">
                <a href="#upcoming">
                  View Full Schedule
                </a>
              </Button>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Main Events Container */}
      <div className="container mx-auto px-4 py-16" id="upcoming">
        {/* Next Marquee Event Highlight */}
        {mainEvent && (
          <div className="mb-20">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs uppercase font-headline font-bold tracking-widest text-primary">
                  Next Headlining Card
                </span>
                <h2 className="font-headline text-3xl md:text-5xl font-black text-white uppercase tracking-wider">
                  {mainEvent.name}
                </h2>
              </div>
              <span className="hidden md:inline-flex px-3 py-1 bg-primary/10 border border-primary/30 text-primary rounded-full text-xs font-bold uppercase tracking-widest">
                Main Card Pay-Per-View
              </span>
            </div>

            <div className="bg-card border-2 border-primary/30 rounded-xl overflow-hidden shadow-2xl grid lg:grid-cols-12 gap-0 relative">
              <div className="relative aspect-[4/3] lg:aspect-auto lg:col-span-5 min-h-[350px]">
                <Image
                  src={mainEvent.posterUrl}
                  alt={mainEvent.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black via-transparent to-transparent opacity-80" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-primary text-black font-headline font-black text-xs uppercase tracking-wider rounded">
                    Championship Defense
                  </span>
                </div>
              </div>

              <div className="lg:col-span-7 p-6 lg:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center text-white font-semibold">
                      <CalendarDays className="w-4 h-4 text-primary mr-1.5" /> {mainEvent.date}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 text-primary mr-1.5" /> {mainEvent.time}
                    </span>
                    <span className="flex items-center">
                      <MapPin className="w-4 h-4 text-primary mr-1.5" /> {mainEvent.venue}, {mainEvent.location}
                    </span>
                  </div>

                  <h3 className="font-headline text-2xl lg:text-3xl font-black text-primary uppercase mb-2">
                    {mainEvent.subtitle}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {mainEvent.description}
                  </p>

                  {/* Fight Card Bout Lineup */}
                  {mainEvent.fights && mainEvent.fights.length > 0 && (
                    <div className="space-y-3 mb-6 bg-black/50 border border-white/10 rounded-lg p-4">
                      <h4 className="text-xs uppercase font-headline tracking-widest text-primary font-bold">
                        Featured Bouts
                      </h4>
                      {mainEvent.fights.map((fight, idx) => (
                        <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between text-sm py-2 border-b border-white/5 last:border-none gap-1">
                          <span className="font-semibold text-white">
                            {fight.fighterA.name} <span className="text-primary font-mono font-bold">vs</span> {fight.fighterB.name}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {fight.weightClass}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-white/10">
                  <Button 
                    onClick={() => setSelectedTicketEvent(mainEvent)}
                    size="lg" 
                    className="aggressive-glow w-full sm:w-auto font-bold px-8"
                  >
                    <Ticket className="w-4 h-4 mr-2" /> Book Seats ({mainEvent.ticketPrice})
                  </Button>
                  <Button asChild variant="outline" size="lg" className="w-full sm:w-auto border-primary/30">
                    <Link href="/fighters">
                      Explore Roster <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Upcoming Events Grid */}
        <FadeIn>
          <section className="mb-20">
            <h2 className="font-headline text-3xl md:text-4xl font-bold uppercase tracking-wide mb-8 text-primary">
              Upcoming Fight Nights & Tournaments
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents.map(event => (
                <Card 
                  key={event.id}
                  className="bg-card border-border/50 overflow-hidden flex flex-col group hover:border-primary transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
                >
                  <CardHeader className="p-0">
                    <div className="relative aspect-[16/10] w-full">
                      <Image
                        src={event.posterUrl}
                        alt={event.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                      <div className="absolute top-3 right-3">
                        <span className="px-2.5 py-0.5 rounded bg-primary/90 text-black text-[10px] font-black uppercase font-headline">
                          Upcoming
                        </span>
                      </div>
                      <div className="absolute bottom-0 left-0 p-4">
                        <h3 className="font-headline text-xl lg:text-2xl font-black text-white uppercase tracking-wider italic combat-shadow">
                          {event.name}
                        </h3>
                        <p className="text-xs text-primary font-semibold">{event.subtitle}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-5 flex-grow space-y-3">
                    <div className="flex items-center text-sm font-semibold text-white">
                      <CalendarDays className="w-4 h-4 text-primary mr-2 shrink-0" />
                      {event.date}
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <MapPin className="w-4 h-4 text-primary mr-2 shrink-0" />
                      {event.venue}, {event.location}
                    </div>
                    <p className="text-xs text-foreground/80 leading-relaxed border-l-2 border-primary/50 pl-3">
                      {event.description}
                    </p>
                  </CardContent>
                  <CardFooter className="p-5 pt-0">
                    <Button 
                      onClick={() => setSelectedTicketEvent(event)}
                      className="w-full font-bold bg-primary/20 hover:bg-primary text-primary hover:text-white border border-primary/30 transition-all"
                    >
                      <Ticket className="w-4 h-4 mr-2" /> Reserve Tickets
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>
        </FadeIn>

        {/* Past Events / Results */}
        {pastEvents.length > 0 && (
          <FadeIn>
            <Separator className="my-16 bg-primary/20" />
            <section>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="font-headline text-3xl md:text-4xl font-bold uppercase tracking-wide text-primary">
                    Past Event Archives & Results
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Official combat outcomes, stoppage methods, and scorecard results.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {pastEvents.map(event => (
                  <Card 
                    key={event.id}
                    className="bg-card/70 border-border/40 overflow-hidden flex flex-col group hover:border-primary/60 transition-all duration-300"
                  >
                    <div className="relative aspect-[16/10] w-full">
                      <Image
                        src={event.posterUrl}
                        alt={event.name}
                        fill
                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                      <div className="absolute top-2 right-2">
                        <span className="px-2 py-0.5 rounded bg-white/10 text-white text-[10px] uppercase font-bold">
                          Final Result
                        </span>
                      </div>
                      <div className="absolute bottom-2 left-2 p-2">
                        <h4 className="font-headline text-lg font-black text-white uppercase">
                          {event.name}
                        </h4>
                        <p className="text-[11px] text-muted-foreground">{event.location}</p>
                      </div>
                    </div>
                    
                    <CardContent className="p-4 flex-grow space-y-2">
                      {event.result && (
                        <div className="bg-black/60 border border-primary/20 rounded p-2.5 text-xs space-y-1">
                          <div className="flex items-center gap-1.5 text-primary font-bold">
                            <Trophy className="w-3.5 h-3.5" />
                            <span>Winner: {event.result.winner}</span>
                          </div>
                          <p className="text-white/80 font-mono text-[11px]">
                            {event.result.method}
                          </p>
                          <p className="text-[10px] text-muted-foreground">
                            Round {event.result.round} • {event.result.time}
                          </p>
                        </div>
                      )}
                      <p className="text-xs text-muted-foreground/90 line-clamp-2">
                        {event.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </FadeIn>
        )}
      </div>

      {/* Ticket Reservation Modal */}
      {selectedTicketEvent && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border-2 border-primary/40 rounded-xl max-w-lg w-full p-6 relative shadow-2xl animate-in zoom-in-95 duration-200">
            <button 
              onClick={closeTicketModal}
              className="absolute top-4 right-4 text-muted-foreground hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>

            {purchaseSuccess ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center text-primary mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-headline text-2xl font-bold uppercase text-white">
                  Reservation Confirmed!
                </h3>
                <p className="text-sm text-muted-foreground">
                  Your tickets for <strong className="text-primary">{selectedTicketEvent.name}</strong> have been allocated. Present your confirmation code at will-call or the mobile entrance.
                </p>
                <div className="bg-black/60 border border-white/10 rounded-lg p-4 font-mono text-sm text-left space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Pass Type:</span>
                    <span className="text-white font-bold">{ticketTier}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Quantity:</span>
                    <span className="text-white font-bold">{ticketQuantity} Seats</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Confirmation:</span>
                    <span className="text-primary font-bold">{activeTicketCode || 'APEX-TKT-782194'}</span>
                  </div>
                </div>
                <Button onClick={closeTicketModal} className="w-full font-bold">
                  Done
                </Button>
              </div>
            ) : (
              <form onSubmit={handleBookTickets} className="space-y-4">
                <div>
                  <span className="text-xs uppercase font-headline tracking-widest text-primary font-bold">
                    Official Box Office
                  </span>
                  <h3 className="font-headline text-2xl font-black text-white uppercase">
                    {selectedTicketEvent.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {selectedTicketEvent.venue} • {selectedTicketEvent.date}
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <label className="text-xs font-semibold uppercase text-muted-foreground">
                    Select Seating Tier
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['Standard', 'Ringside', 'VIP Cage-Side'] as const).map((tier) => (
                      <button
                        type="button"
                        key={tier}
                        onClick={() => setTicketTier(tier)}
                        className={`p-3 rounded-lg border text-xs font-bold uppercase transition-all ${
                          ticketTier === tier 
                            ? 'bg-primary text-black border-primary shadow-[0_0_15px_hsl(var(--primary)/0.5)]' 
                            : 'bg-black/40 border-white/10 text-white hover:border-primary/50'
                        }`}
                      >
                        {tier}
                      </button>
                    ))}
                  </div>

                  <div className="pt-2">
                    <label className="text-xs font-semibold uppercase text-muted-foreground">
                      Number of Seats
                    </label>
                    <select
                      value={ticketQuantity}
                      onChange={(e) => setTicketQuantity(Number(e.target.value))}
                      className="w-full mt-1 bg-black/60 border border-white/10 rounded-md p-2 text-sm text-white"
                    >
                      {[1, 2, 4, 6, 8].map((q) => (
                        <option key={q} value={q}>
                          {q} {q === 1 ? 'Ticket' : 'Tickets'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                  <div>
                    <span className="text-xs text-muted-foreground">Starting From</span>
                    <p className="text-lg font-bold text-primary font-headline">
                      {selectedTicketEvent.ticketPrice || '$95'}
                    </p>
                  </div>
                  <Button 
                    type="submit" 
                    disabled={isPurchasing}
                    className="aggressive-glow font-bold px-6"
                  >
                    {isPurchasing ? 'Holding Seats...' : 'Confirm Reservation'}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
