import Link from 'next/link';
import { Instagram, Mail } from 'lucide-react';
import { ApexLogo } from './logo';

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

export function Footer() {
  return (
    <footer className="bg-black border-t border-primary/40 relative overflow-hidden">
      {/* Cage pattern background */}
      <div className="absolute inset-0 cage-pattern-subtle opacity-10" />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          
          {/* Brand & Copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <Link href="/" className="flex items-center gap-2 group" aria-label="Apex Combat Championship Home">
              <ApexLogo showSubtitle={false} className="h-8 w-auto text-primary transition-all duration-300 group-hover:drop-shadow-[0_0_10px_hsl(var(--primary)/0.6)]" />
              <span className="font-headline text-xl font-black text-white group-hover:text-primary transition-colors tracking-wide uppercase">
                Apex Combat Championship
              </span>
            </Link>
            <p className="text-xs text-muted-foreground/60 hidden sm:block leading-relaxed sm:border-l sm:border-white/10 sm:pl-4">
              © {new Date().getFullYear()} Apex Combat Championship. All rights reserved.
              <span className="block text-primary/70 font-medium">Apex Global Sports & Entertainment</span>
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
             <Link href="/events" className="hover:text-primary transition-colors">Events</Link>
             <Link href="/fighters" className="hover:text-primary transition-colors">Fighters</Link>
             <Link href="/about" className="hover:text-primary transition-colors">About</Link>
             <Link href="/gallery-contact" className="hover:text-primary transition-colors">Gallery</Link>
             <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
             <Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
             <Link href="/terms" className="hover:text-primary transition-colors">Terms</Link>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2 rounded-full bg-white/5 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300" 
              aria-label="Instagram"
            >
              <Instagram className="size-4" />
            </a>
            <a 
              href="https://wa.me/17025550198" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2 rounded-full bg-white/5 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300" 
              aria-label="WhatsApp"
            >
              <MessageCircle className="size-4" />
            </a>
            <a 
              href="mailto:contact@apexchampionship.com" 
              className="p-2 rounded-full bg-white/5 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300" 
              aria-label="Email"
            >
              <Mail className="size-4" />
            </a>
          </div>
        </div>

        {/* Mobile Copyright notice */}
        <p className="text-[11px] text-muted-foreground/50 sm:hidden mt-6 text-center">
          © {new Date().getFullYear()} Apex Combat Championship. All rights reserved.
          <span className="block mt-0.5 text-primary/60 font-medium">Apex Global Sports & Entertainment</span>
        </p>
      </div>
    </footer>
  );
}
