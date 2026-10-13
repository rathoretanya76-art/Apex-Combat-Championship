import Link from 'next/link';
import { FileText, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-card border-2 border-primary/30 rounded-2xl p-6 sm:p-12 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 cage-pattern-subtle opacity-10" />
        
        <div className="relative z-10 mb-8">
          <Button asChild variant="ghost" size="sm" className="mb-4 text-xs text-muted-foreground hover:text-white">
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-1" /> Return to Home
            </Link>
          </Button>
          <div className="flex items-center gap-3">
            <FileText className="w-8 h-8 text-primary" />
            <h1 className="font-headline text-3xl sm:text-5xl font-black uppercase tracking-wider text-white">
              Terms & Conditions
            </h1>
          </div>
          <p className="text-xs text-muted-foreground mt-2 font-mono">
            Governing Athletic Regulations & Platform Usage • Apex Combat Championship
          </p>
          <Separator className="my-6 bg-primary/30" />
        </div>

        <div className="space-y-6 text-muted-foreground text-sm leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-headline text-xl font-bold uppercase text-white">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing the Apex Combat Championship website, applying for combat trials, purchasing spectator event passes, or viewing promotional media, you acknowledge and agree to be bound by these Terms and Conditions and all applicable local, national, and international sports entertainment laws.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-headline text-xl font-bold uppercase text-white">
              2. Fighter Application & Athletic Eligibility
            </h2>
            <p>
              Submission of the Apex Fighter Registration Form constitutes an expression of interest and does not guarantee contract issuance, matchmaking placement, or an appearance fee.
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>Applicants must provide honest, verifiable records of prior competitive bouts and amateur/pro licenses.</li>
              <li>Athletes must pass rigorous cardiovascular, neurological, orthopedic, and infectious disease screenings conducted by sanctioned commission physicians before entering the cage.</li>
              <li>Apex enforces a strict zero-tolerance anti-doping policy aligning with WADA/USADA standards. Positive tests will result in immediate disqualification and contractual forfeiture.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-headline text-xl font-bold uppercase text-white">
              3. Event Ticketing & Arena Protocol
            </h2>
            <p>
              All fight night ticket reservations and passes are subject to venue capacity regulations. Weapons, illicit substances, unauthorized professional broadcasting gear, and disruptive conduct are strictly prohibited within arena premises. Apex reserves the right to deny admission without refund in instances of sportsmanship or security violations.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-headline text-xl font-bold uppercase text-white">
              4. Intellectual Property
            </h2>
            <p>
              All trademarks, video fight footage, audio recordings, graphic badges, logos, and promotional typography associated with &quot;Apex&quot;, &quot;Apex Combat Championship&quot;, and Apex Global Sports & Entertainment are the exclusive intellectual property of the organization. Unauthorized redistribution or rebroadcasting is subject to immediate legal enforcement.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-headline text-xl font-bold uppercase text-white">
              5. Governing Law
            </h2>
            <p>
              These terms are governed in accordance with international sports arbitration standards and the corporate jurisdiction of Apex Global Sports & Entertainment. For inquiries, reach out via <Link href="/contact" className="underline hover:text-white">our official contact office</Link>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
