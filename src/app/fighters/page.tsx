"use client";

import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Trophy, 
  Search, 
  Filter, 
  Shield, 
  Zap, 
  Flame, 
  ArrowRight,
  UserCheck,
  X,
  Target
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { fighters, divisions, weightClasses, type Fighter } from '@/lib/data';
import { FadeIn } from '@/components/fade-in';
import { ScrollProgressBar } from '@/components/scroll-animations';

export default function FightersPage() {
  const [fighterList, setFighterList] = useState<Fighter[]>(fighters);
  const [selectedDivision, setSelectedDivision] = useState<string>('All');
  const [selectedWeight, setSelectedWeight] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFighterModal, setActiveFighterModal] = useState<Fighter | null>(null);

  useEffect(() => {
    async function loadDbFighters() {
      try {
        const { db } = await import('@/lib/mock-db');
        const dbFighters = await db.fighters.getAll();
        if (dbFighters && dbFighters.length > 0) {
          setFighterList(dbFighters);
        }
      } catch (err) {
        console.warn('[FightersPage] Fallback to seed fighters:', err);
      }
    }
    loadDbFighters();
  }, []);

  const filteredFighters = useMemo(() => {
    return fighterList.filter((fighter) => {
      const matchesDivision = 
        selectedDivision === 'All' || fighter.division === selectedDivision;
      const matchesWeight = 
        selectedWeight === 'All' || fighter.weightClass === selectedWeight;
      const matchesSearch = 
        fighter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fighter.nickname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fighter.country.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesDivision && matchesWeight && matchesSearch;
    });
  }, [fighterList, selectedDivision, selectedWeight, searchQuery]);

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <ScrollProgressBar />

      {/* Header Banner */}
      <div className="relative py-20 bg-card border-b border-primary/30 overflow-hidden">
        <div className="absolute inset-0 cage-pattern-subtle opacity-20" />
        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-headline uppercase tracking-widest font-bold mb-4">
              <Shield className="w-4 h-4 text-primary" /> Official Fighter Roster & Rankings
            </div>
            <h1 className="font-headline text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-wider text-primary combat-shadow-strong">
              The Warriors of Apex
            </h1>
            <p className="mt-4 text-base sm:text-xl text-muted-foreground font-medium max-w-2xl mx-auto">
              Meet the elite athletes contending for undisputed global supremacy in the octagon, ring, and tatami.
            </p>
            <Separator className="w-32 h-1 mx-auto mt-6 bg-gradient-to-r from-transparent via-primary to-transparent" />
          </FadeIn>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-card/70 border border-primary/20 rounded-xl p-4 sm:p-6 mb-10 shadow-lg space-y-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            {/* Division Tabs */}
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              <button
                onClick={() => setSelectedDivision('All')}
                className={`px-4 py-2 rounded-lg font-headline text-sm uppercase tracking-wider transition-all ${
                  selectedDivision === 'All'
                    ? 'bg-primary text-black font-black shadow-[0_0_15px_hsl(var(--primary)/0.5)]'
                    : 'bg-black/60 text-white/80 hover:bg-white/10'
                }`}
              >
                All Divisions ({fighters.length})
              </button>
              {divisions.map((div) => (
                <button
                  key={div}
                  onClick={() => setSelectedDivision(div)}
                  className={`px-4 py-2 rounded-lg font-headline text-sm uppercase tracking-wider transition-all ${
                    selectedDivision === div
                      ? 'bg-primary text-black font-black shadow-[0_0_15px_hsl(var(--primary)/0.5)]'
                      : 'bg-black/60 text-white/80 hover:bg-white/10'
                  }`}
                >
                  {div}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search athlete, nickname, country..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-black/60 border-white/10 text-white text-sm"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Fighters Grid */}
        {filteredFighters.length === 0 ? (
          <div className="text-center py-20 bg-card/40 rounded-xl border border-white/5 p-8">
            <Shield className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="font-headline text-2xl uppercase font-bold text-white">No Fighters Found</h3>
            <p className="text-muted-foreground text-sm mt-1">Try resetting your filters or search keywords.</p>
            <Button 
              onClick={() => { setSelectedDivision('All'); setSelectedWeight('All'); setSearchQuery(''); }}
              variant="outline" 
              className="mt-4 border-primary/30 text-primary"
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredFighters.map((fighter) => (
              <div
                key={fighter.id}
                onClick={() => setActiveFighterModal(fighter)}
                className="bg-card border border-primary/20 hover:border-primary rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-1 group cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Fighter Image Container */}
                  <div className="relative aspect-[4/4.5] w-full bg-neutral-900 overflow-hidden">
                    <Image
                      src={fighter.imageUrl}
                      alt={fighter.name}
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
                    
                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
                      <span className="px-2 py-0.5 rounded bg-black/80 backdrop-blur-sm border border-white/10 text-[11px] font-bold uppercase text-white font-mono">
                        {fighter.division}
                      </span>
                      {fighter.isChampion && (
                        <span className="px-2 py-0.5 rounded bg-secondary text-black text-[10px] font-black uppercase font-headline tracking-wider flex items-center gap-1 shadow-md">
                          <Trophy className="w-3 h-3" /> Champion
                        </span>
                      )}
                      {!fighter.isChampion && fighter.ranking && (
                        <span className="px-2 py-0.5 rounded bg-primary/90 text-white text-[10px] font-black uppercase font-headline tracking-wider">
                          Rank #{fighter.ranking}
                        </span>
                      )}
                    </div>

                    <div className="absolute top-3 right-3 text-2xl drop-shadow-md">
                      {fighter.flag}
                    </div>

                    {/* Bottom Info in Image */}
                    <div className="absolute bottom-3 left-3 right-3">
                      <span className="text-xs uppercase font-headline font-bold text-primary tracking-widest">
                        "{fighter.nickname}"
                      </span>
                      <h3 className="font-headline text-xl font-black text-white uppercase tracking-wider leading-tight">
                        {fighter.name}
                      </h3>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        {fighter.weightClass}
                      </p>
                    </div>
                  </div>

                  {/* Stats Bar */}
                  <div className="p-4 bg-card/90 space-y-3">
                    <div className="grid grid-cols-3 gap-2 text-center py-2 bg-black/50 border border-white/5 rounded-lg">
                      <div>
                        <span className="text-[10px] uppercase text-muted-foreground block">Wins</span>
                        <span className="font-headline text-lg font-black text-white">
                          {fighter.record.wins}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase text-muted-foreground block">Losses</span>
                        <span className="font-headline text-lg font-black text-muted-foreground">
                          {fighter.record.losses}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase text-muted-foreground block">KOs</span>
                        <span className="font-headline text-lg font-black text-primary">
                          {fighter.record.kos}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {fighter.bio}
                    </p>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full text-xs font-bold border-primary/30 group-hover:bg-primary group-hover:text-black transition-all"
                  >
                    Tale of the Tape <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Join the Ranks CTA Banner */}
        <div className="mt-20 p-8 sm:p-12 rounded-2xl bg-card border-2 border-primary/30 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 cage-pattern-subtle opacity-15" />
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <span className="text-xs uppercase font-headline tracking-widest text-primary font-bold">
              Become an Apex Athlete
            </span>
            <h2 className="font-headline text-3xl sm:text-5xl font-black uppercase text-white">
              Are You Ready For The Octagon?
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              We scout elite talent worldwide across MMA, Boxing, Kickboxing, and Submission Grappling. Submit your application today.
            </p>
            <Button asChild size="lg" className="aggressive-glow font-bold text-lg px-8 strike-animation">
              <Link href="/#register">
                Apply for Fighter Contract <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Tale of the Tape Modal */}
      {activeFighterModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-card border-2 border-primary/40 rounded-xl max-w-lg w-full overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setActiveFighterModal(null)}
              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-primary hover:text-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-[16/10] w-full">
              <Image
                src={activeFighterModal.imageUrl}
                alt={activeFighterModal.name}
                fill
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-black/40 to-transparent" />
              <div className="absolute bottom-4 left-6 right-6">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl">{activeFighterModal.flag}</span>
                  <span className="text-xs uppercase font-headline tracking-widest text-primary font-bold">
                    {activeFighterModal.country} • {activeFighterModal.division}
                  </span>
                </div>
                <h3 className="font-headline text-3xl font-black text-white uppercase">
                  {activeFighterModal.name}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {activeFighterModal.weightClass}
                </p>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Tale of Tape Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center bg-black/60 border border-white/10 rounded-lg p-3">
                <div>
                  <span className="text-[10px] uppercase text-muted-foreground block">Height</span>
                  <span className="font-mono text-sm font-bold text-white">{activeFighterModal.height}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-muted-foreground block">Reach</span>
                  <span className="font-mono text-sm font-bold text-white">{activeFighterModal.reach}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-muted-foreground block">Stance</span>
                  <span className="font-mono text-sm font-bold text-white">{activeFighterModal.stance}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-muted-foreground block">Record</span>
                  <span className="font-mono text-sm font-bold text-primary">
                    {activeFighterModal.record.wins}-{activeFighterModal.record.losses}-{activeFighterModal.record.draws}
                  </span>
                </div>
              </div>

              {/* Bio & Details */}
              <div className="space-y-2">
                <h4 className="text-xs uppercase font-headline tracking-wider text-primary font-bold">
                  Athletic Profile & Style
                </h4>
                <p className="text-sm text-foreground/90 leading-relaxed">
                  {activeFighterModal.bio}
                </p>
              </div>

              <div className="flex justify-between items-center text-xs text-muted-foreground pt-3 border-t border-white/10">
                <span>Sanctioned by Apex Commission</span>
                <span className="text-primary font-bold">Verified Athletic Dossier</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
