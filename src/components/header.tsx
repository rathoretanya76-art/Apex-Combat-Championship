"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, Home, CalendarDays, GalleryHorizontal, Mail, Trophy, Users } from 'lucide-react';
import { useState, useMemo } from 'react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ApexLogo } from '@/components/logo';
import { cn } from '@/lib/utils';
import { LimelightNav } from '@/components/ui/limelight-nav';
import type { NavItem } from '@/components/ui/limelight-nav';
import { ScrollProgressBar } from '@/components/scroll-animations';

export function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const navLinks = useMemo(() => [
    { href: '/', label: 'Home', icon: <Home className="w-4 h-4" /> },
    { href: '/events', label: 'Events', icon: <CalendarDays className="w-4 h-4" /> },
    { href: '/fighters', label: 'Fighters', icon: <Trophy className="w-4 h-4" /> },
    { href: '/about', label: 'About', icon: <Users className="w-4 h-4" /> },
    { href: '/gallery-contact', label: 'Gallery', icon: <GalleryHorizontal className="w-4 h-4" /> },
    { href: '/contact', label: 'Contact', icon: <Mail className="w-4 h-4" /> },
  ], []);

  const limelightNavItems: NavItem[] = useMemo(() => navLinks.map(link => ({
    id: link.href,
    icon: link.icon,
    label: link.label,
    onClick: () => router.push(link.href)
  })), [router, navLinks]);

  const defaultActiveIndex = useMemo(() => {
    const activeIndex = navLinks.findIndex(link => pathname === link.href);
    return activeIndex > -1 ? activeIndex : 0;
  }, [pathname, navLinks]);

  return (
    <>
    <header className="sticky top-0 z-50 w-full border-b-2 border-primary/20 bg-black/95 backdrop-blur-md supports-[backdrop-filter]:bg-black/80 cage-pattern-subtle">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group" aria-label="Apex Combat Championship Home">
          <ApexLogo showSubtitle={false} className="h-9 w-auto text-primary transition-all duration-300 group-hover:drop-shadow-[0_0_10px_hsl(var(--primary)/0.8)]" />
          <span className="font-headline text-2xl font-black hidden lg:inline-block text-primary group-hover:text-secondary transition-colors truncate max-w-[280px] xl:max-w-none">
            Apex Combat Championship
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4">
          <LimelightNav items={limelightNavItems} defaultActiveIndex={defaultActiveIndex} />
          
          <Button asChild size="sm" className="hidden xl:inline-flex font-headline font-bold text-xs uppercase tracking-wider aggressive-glow">
            <Link href="/#register">
              Fighter Tryouts
            </Link>
          </Button>
        </nav>
        
        <div className="md:hidden flex items-center gap-2">
          <Button asChild size="sm" className="text-xs font-bold px-2.5 py-1 h-8 aggressive-glow">
            <Link href="/#register">
              Tryouts
            </Link>
          </Button>

          <Sheet open={isMenuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative text-primary border-2 border-primary/40 p-1 rounded-sm bg-primary/5 hover:bg-primary/20 transition-all focus-visible:ring-0 focus-visible:ring-offset-0 active:scale-95 group"
              >
                <div className="absolute inset-0 bg-primary/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity animate-pulse" />
                <Menu className="h-7 w-7 relative z-10" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85%] bg-black/98 border-l-2 border-primary/30 p-0 shadow-[0_0_50px_rgba(234,0,0,0.15)] flex flex-col justify-center">
              <div className="absolute top-6 left-6 opacity-30 pointer-events-none">
                <ApexLogo className="h-10 w-auto text-primary" />
              </div>
              <nav className="flex flex-col items-center justify-center gap-8 py-10">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      'text-3xl font-headline transition-all duration-300 hover:text-primary uppercase italic tracking-widest hover:scale-105 combat-shadow',
                      pathname === link.href ? 'text-primary' : 'text-foreground'
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="absolute bottom-8 w-full text-center px-6 opacity-60">
                <p className="text-[10px] uppercase tracking-[0.2em] font-medium text-muted-foreground">
                  Apex Combat Championship • Global Series
                </p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
    <ScrollProgressBar className="!fixed top-[64px] h-[3px] shadow-[0_0_10px_hsl(var(--primary)/0.5)]" />
    </>
  );
}
