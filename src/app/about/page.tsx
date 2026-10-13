import Image from 'next/image';
import Link from 'next/link';
import { 
  Shield, 
  Award, 
  Target, 
  Users, 
  Globe2, 
  HeartHandshake, 
  CheckCircle,
  ArrowRight,
  Flame,
  Scale
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { leadershipTeam, faqItems } from '@/lib/data';
import { FadeIn } from '@/components/fade-in';
import { CageOverlay } from '@/components/cage-pattern';
import { ScrollProgressBar } from '@/components/scroll-animations';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function AboutPage() {
  const pillars = [
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: "Athlete Safety & Medical Rigor",
      description: "Comprehensive neurological monitoring, state-of-the-art ring-side emergency trauma teams, and strict post-fight rest protocols."
    },
    {
      icon: <Scale className="w-8 h-8 text-primary" />,
      title: "Integrity & Fair Judging",
      description: "Certified international commissions, transparent open-scorecard reviews, and zero tolerance for biased officiating."
    },
    {
      icon: <Globe2 className="w-8 h-8 text-primary" />,
      title: "Worldwide Talent Scouting",
      description: "Discovering gritty fighters from grassroots gyms across the Americas, Europe, Asia, and Africa, giving raw warriors a global stage."
    },
    {
      icon: <Flame className="w-8 h-8 text-primary" />,
      title: "Unmatched Production Value",
      description: "High-definition streaming, interactive fighter biometrics, and electrifying live arena spectacles designed for true combat fans."
    }
  ];

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <ScrollProgressBar />

      {/* Hero Header */}
      <section className="relative py-20 md:py-28 bg-card border-b border-primary/30 overflow-hidden">
        <CageOverlay intensity="medium" />
        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-headline uppercase tracking-widest font-bold mb-4">
              <Award className="w-4 h-4 text-primary" /> The Organization Behind The Combat
            </div>
            <h1 className="font-headline text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-wider text-primary combat-shadow-strong">
              About Apex Championship
            </h1>
            <p className="mt-4 text-lg sm:text-2xl text-foreground font-semibold max-w-2xl mx-auto leading-relaxed">
              Forged in combat. Proven in blood. Crowned in glory. Committed to athletic excellence and global prestige.
            </p>
            <Separator className="w-32 h-1 mx-auto mt-6 bg-gradient-to-r from-transparent via-primary to-transparent" />
          </FadeIn>
        </div>
      </section>

      {/* Brand Story & Mission */}
      <section className="py-16 md:py-24 relative">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs uppercase font-headline tracking-widest text-primary font-bold">
                Our Genesis & Mission
              </span>
              <h2 className="font-headline text-3xl sm:text-5xl font-black uppercase text-white leading-tight">
                Where True Combat Meets Pure Honor
              </h2>
              <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
                Apex Combat Championship (ACC) was established with a single, unyielding mission: to create a serious, transparent, and electrifying battleground for professional mixed martial artists, boxers, kickboxers, and submission grapplers.
              </p>
              <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
                Under the strategic stewardship of <strong className="text-white">Apex Global Sports & Entertainment</strong>, Apex unites sports science, athletic healthcare, and world-class sports entertainment. We believe combat athletes put their lives on the line—and they deserve unmatched medical care, fair pay, and a global spotlight.
              </p>
              
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10 font-mono text-sm">
                <div>
                  <span className="text-2xl font-headline font-black text-primary block">100%</span>
                  <span className="text-xs text-muted-foreground">Commission Sanctioned</span>
                </div>
                <div>
                  <span className="text-2xl font-headline font-black text-secondary block">40+</span>
                  <span className="text-xs text-muted-foreground">Countries Represented</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden border border-primary/30 shadow-xl">
                <Image
                  src="/assets/images/about-us.jpg"
                  alt="Apex Combat Action"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden border border-primary/30 shadow-xl mt-8">
                <Image
                  src="/assets/images/about-us-extra.jpg"
                  alt="Apex Judging & Ring Action"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Pillars */}
      <section className="py-16 md:py-20 bg-card border-y border-primary/20 relative">
        <CageOverlay intensity="subtle" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase font-headline tracking-widest text-primary font-bold">
              Guiding Principles
            </span>
            <h2 className="font-headline text-3xl sm:text-5xl font-black uppercase text-white mt-1">
              The Four Pillars of Apex
            </h2>
            <Separator className="w-24 h-1 mx-auto my-4 bg-primary" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, i) => (
              <div 
                key={i} 
                className="bg-black/60 border border-primary/20 rounded-xl p-6 hover:border-primary transition-all duration-300 group hover:shadow-[0_0_25px_hsl(var(--primary)/0.3)]"
              >
                <div className="mb-4 p-3 rounded-lg bg-primary/10 border border-primary/30 w-fit text-primary group-hover:scale-110 transition-transform">
                  {pillar.icon}
                </div>
                <h3 className="font-headline text-xl font-bold uppercase text-white mb-2 group-hover:text-primary transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Executive Leadership Team Section */}
      <section className="py-20 md:py-28 relative">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase font-headline tracking-widest text-primary font-bold">
              Leadership & Governance
            </span>
            <h2 className="font-headline text-3xl sm:text-5xl font-black uppercase text-white mt-1">
              Executive Committee
            </h2>
            <Separator className="w-24 h-1 mx-auto my-4 bg-primary" />
            <p className="text-muted-foreground text-sm sm:text-base">
              The driving force orchestrating global championships, athlete welfare, and cutting-edge combat entertainment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {leadershipTeam.map((member) => (
              <div 
                key={member.name}
                className="bg-card border-2 border-primary/20 rounded-xl overflow-hidden group hover:border-primary transition-all duration-300 shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[3/4] w-full bg-neutral-900 overflow-hidden">
                    <Image
                      src={member.imageUrl}
                      alt={member.name}
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-90" />
                    <div className="absolute bottom-3 left-4 right-4">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-primary font-bold block">
                        {member.organization}
                      </span>
                      <h3 className="font-headline text-2xl font-black text-white uppercase leading-tight">
                        {member.name}
                      </h3>
                      <p className="text-xs text-secondary font-semibold mt-0.5">
                        {member.role}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="inline-block px-2.5 py-0.5 rounded bg-primary/10 border border-primary/20 text-[11px] text-primary font-semibold">
                      Focus: {member.specialization}
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <div className="h-0.5 w-full bg-primary/20 group-hover:bg-primary transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-16 md:py-24 bg-card border-t border-primary/20">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <span className="text-xs uppercase font-headline tracking-widest text-primary font-bold">
              Need Answers?
            </span>
            <h2 className="font-headline text-3xl sm:text-5xl font-black uppercase text-white mt-1">
              Frequently Asked Questions
            </h2>
            <Separator className="w-24 h-1 mx-auto my-4 bg-primary" />
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqItems.map((item, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-black/60 border border-primary/20 rounded-lg px-4"
              >
                <AccordionTrigger className="text-white hover:text-primary font-headline text-lg uppercase text-left py-4">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-4">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="text-center mt-12">
            <Button asChild size="lg" className="aggressive-glow font-bold text-lg px-8">
              <Link href="/contact">
                Have a Query? Contact Apex Operations <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
