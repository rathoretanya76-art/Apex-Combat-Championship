import Link from 'next/link';
import { Shield, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black py-16 px-4">
      <div className="container mx-auto max-w-4xl bg-card border border-primary/20 rounded-xl p-6 sm:p-12 shadow-2xl space-y-8">
        <div>
          <Button asChild variant="ghost" size="sm" className="mb-4 text-muted-foreground hover:text-white">
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
            </Link>
          </Button>
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-primary" />
            <h1 className="font-headline text-3xl sm:text-5xl font-black uppercase tracking-wider text-white">
              Privacy Policy
            </h1>
          </div>
          <p className="text-xs text-muted-foreground mt-2 font-mono">
            Last Updated: October 2026 • Apex Combat Championship (ACC) & Apex Global Sports & Entertainment
          </p>
          <Separator className="my-6 bg-primary/30" />
        </div>

        <div className="space-y-6 text-muted-foreground text-sm leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-headline text-xl font-bold uppercase text-white">
              1. Information We Collect
            </h2>
            <p>
              When you interact with the Apex Combat Championship platform—including submitting a fighter registration application, reserving fight night tickets, or contacting our executive office—we may collect personal identification data such as:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>Full legal name, contact email address, telephone/WhatsApp contact details</li>
              <li>Athletic combat background, gym affiliations, sanctioned competition records, and weight division data</li>
              <li>Ticketing preferences, reservation reference codes, and billing information for live spectator events</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-headline text-xl font-bold uppercase text-white">
              2. How We Use Your Data
            </h2>
            <p>
              Your data is utilized strictly for combat sports operations and administration:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>Evaluating prospective fighter applications through our matchmaking and medical clearance board</li>
              <li>Processing fight event attendance passes and issuing credential passes for media and staff</li>
              <li>Transmitting critical event updates, fight card announcements, and championship schedule changes</li>
              <li>Ensuring compliance with international sports regulatory bodies and anti-doping commissions</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-headline text-xl font-bold uppercase text-white">
              3. Data Protection & Security
            </h2>
            <p>
              We implement industry-grade encryption and administrative safeguards to protect athlete personal medical files and customer ticket records. We never sell, rent, or trade your personal data to third-party commercial brokers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-headline text-xl font-bold uppercase text-white">
              4. Cookies & Analytics
            </h2>
            <p>
              Our website uses basic performance analytics cookies to monitor system responsiveness, video stream delivery rates, and fan interaction metrics. You can manage or disable cookie preferences in your browser settings at any time.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-headline text-xl font-bold uppercase text-white">
              5. Contact Our Privacy Office
            </h2>
            <p>
              For inquiries regarding personal data access, modification, or removal from our athletic scouting registers, please contact our Legal & Compliance Department at <span className="text-primary font-bold">legal@apexchampionship.com</span> or via our official <Link href="/contact" className="underline hover:text-white">Contact Page</Link>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
