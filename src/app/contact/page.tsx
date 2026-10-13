"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Instagram, 
  Mail, 
  MapPin, 
  Phone, 
  Send, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Building2, 
  ArrowRight,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { FadeIn } from '@/components/fade-in';
import { ScrollProgressBar } from '@/components/scroll-animations';
import { useToast } from '@/hooks/use-toast';

function MessageCircle(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  );
}

export default function ContactPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: '⚠️ Required Fields Missing',
        description: 'Please provide your name, email, and message.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const { db } = await import('@/lib/mock-db');
      await db.contacts.create({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      });

      setIsSubmitted(true);
      toast({
        title: '📬 Message Dispatched to Commission Inbox!',
        description: 'Thank you for reaching out. An Apex representative will respond within 24 hours.',
        duration: 5000,
      });
    } catch (err) {
      console.error('[IndexedDB Contact Error]', err);
      toast({
        title: 'Transmission Error',
        description: 'Failed to record message in database.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <ScrollProgressBar />
      
      {/* Header Banner */}
      <div className="relative py-20 bg-card border-b border-primary/30 overflow-hidden">
        <div className="absolute inset-0 cage-pattern-subtle opacity-20" />
        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-headline uppercase tracking-widest font-bold mb-4">
              <Building2 className="w-4 h-4 text-primary" /> Global Operations & Support
            </div>
            <h1 className="font-headline text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-wider text-primary combat-shadow-strong">
              Contact Apex
            </h1>
            <p className="mt-4 text-base sm:text-xl text-muted-foreground font-medium max-w-2xl mx-auto">
              Ready to partner with us, inquire about fight night access, or discuss media broadcasting? Our team is at your service.
            </p>
            <Separator className="w-32 h-1 mx-auto mt-6 bg-gradient-to-r from-transparent via-primary to-transparent" />
          </FadeIn>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
          
          {/* Left: Contact Info & Channels */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs uppercase font-headline tracking-widest text-primary font-bold">
                Direct Channels
              </span>
              <h2 className="font-headline text-3xl font-black uppercase text-white mt-1">
                Reach Out Today
              </h2>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                Connect with our commercial partnerships team, athletic commission, or ticket box office.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-card border border-primary/20 hover:border-primary transition-all">
                <div className="p-3 rounded-lg bg-primary/10 text-primary shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-headline text-lg font-bold text-white uppercase">World Headquarters</h4>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                    T-Mobile Arena Pavilion • Las Vegas Boulevard South, Las Vegas, NV 89158, USA
                  </p>
                  <span className="text-[11px] text-primary/80 block mt-1">Apex Global Sports & Entertainment</span>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-card border border-primary/20 hover:border-primary transition-all">
                <div className="p-3 rounded-lg bg-primary/10 text-primary shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-headline text-lg font-bold text-white uppercase">Electronic Mail</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    General Inquiries: <a href="mailto:contact@octafighting.com" className="text-primary hover:underline">contact@octafighting.com</a>
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Media & Press: <a href="mailto:press@octafighting.com" className="text-primary hover:underline">press@octafighting.com</a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-card border border-primary/20 hover:border-primary transition-all">
                <div className="p-3 rounded-lg bg-primary/10 text-primary shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-headline text-lg font-bold text-white uppercase">Operations Hours</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Monday – Friday: 9:00 AM – 6:00 PM PST
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Fight Weekends: 24/7 Event Operations Support
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="pt-2">
              <span className="text-xs uppercase font-headline tracking-widest text-muted-foreground font-semibold block mb-3">
                Instant Chat & Socials
              </span>
              <div className="flex flex-wrap gap-3">
                <Button asChild variant="outline" className="border-primary/40 text-primary hover:bg-primary hover:text-black font-bold">
                  <a href="https://wa.me/17025550198" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-4 h-4 mr-2" /> WhatsApp Official
                  </a>
                </Button>
                <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10 font-bold">
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                    <Instagram className="w-4 h-4 mr-2" /> Instagram @ApexCombat
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Right: Interactive Message Form */}
          <div className="lg:col-span-7">
            <div className="bg-card border-2 border-primary/30 rounded-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 cage-pattern-subtle opacity-10" />
              
              {isSubmitted ? (
                <div className="relative z-10 text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center text-primary mx-auto shadow-[0_0_20px_hsl(var(--primary)/0.6)]">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="font-headline text-3xl font-black uppercase text-white">
                    Message Successfully Sent!
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto">
                    Thank you for contacting Octa Fighting Championship. Our administrative coordinator will reply to <span className="text-white font-semibold">{formData.email}</span> within 1 business day.
                  </p>
                  <Button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
                    }}
                    variant="outline"
                    className="border-primary/40 text-primary hover:bg-primary hover:text-black font-bold mt-4"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="relative z-10 space-y-5">
                  <div>
                    <span className="text-xs uppercase font-headline tracking-widest text-primary font-bold">
                      Direct Communication
                    </span>
                    <h3 className="font-headline text-2xl sm:text-3xl font-black uppercase text-white">
                      Send a Transmission
                    </h3>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold uppercase text-muted-foreground">Your Name *</label>
                      <Input
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-black/50 border-white/10 text-white"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold uppercase text-muted-foreground">Email Address *</label>
                      <Input
                        required
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="bg-black/50 border-white/10 text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase text-muted-foreground">Topic of Inquiry</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-black/50 border border-white/10 rounded-md p-2.5 text-sm text-white focus:outline-none focus:border-primary"
                    >
                      <option value="General Inquiry">General Promotion Inquiry</option>
                      <option value="Sponsorship & Brand Partnership">Sponsorship & Brand Partnership</option>
                      <option value="Press & Broadcast Credentials">Press & Broadcast Credentials</option>
                      <option value="VIP Box Office & Ticketing">VIP Box Office & Ticketing</option>
                      <option value="Fighter Management & Camp Relations">Fighter Management & Camp Relations</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase text-muted-foreground">Detailed Message *</label>
                    <Textarea
                      required
                      rows={5}
                      placeholder="Please outline the nature of your request, brand details, or questions..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="bg-black/50 border-white/10 text-white resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    size="lg"
                    className="aggressive-glow w-full font-bold text-base strike-animation"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Disagreeing Transmission...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" /> Submit Message Transmission
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Banner Linking to Fighter Registration */}
        <div className="mt-16 bg-card/60 border border-primary/20 rounded-xl p-8 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="font-headline text-2xl font-bold uppercase text-white">
              Are You an Athlete Looking for Matchmaking?
            </h4>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Fighters should not use the general contact form. Submit your fight record and camp credentials through our official athletic portal.
            </p>
          </div>
          <Button asChild size="lg" className="shrink-0 font-bold bg-primary text-black hover:bg-primary/90">
            <Link href="/#register">
              Fighter Application Portal <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
