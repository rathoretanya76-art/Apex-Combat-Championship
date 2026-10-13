import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Toaster } from "@/components/ui/toaster";
import { SmoothScroll } from '@/components/smooth-scroll';
import { DemoDbControls } from '@/components/demo-db-controls';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://apex-combat-championship.vercel.app'),
  title: 'Apex Combat Championship (ACC) - Forged in Combat. Crowned in Glory.',
  description: 'Apex Combat Championship is the premier international combat sports organization featuring world-class MMA, Boxing, Kickboxing, and Submission Grappling.',
  keywords: ['Apex Combat Championship', 'ACC', 'MMA', 'Boxing', 'Kickboxing', 'Grappling', 'Fight Night', 'Combat Sports', 'Championship'],
  openGraph: {
    title: 'Apex Combat Championship (ACC) - Forged in Combat. Crowned in Glory.',
    description: 'Where the world\'s most dangerous combat athletes contend for global championship supremacy.',
    images: [{ url: '/assets/images/brand-story.jpg', width: 1200, height: 630 }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Allan&family=Bangers&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
      </head>
      <body className={cn('font-body antialiased min-h-screen bg-black text-foreground')}>
        <SmoothScroll>
          <div className="flex flex-col min-h-screen overflow-x-clip">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
            <Toaster />
            <DemoDbControls />
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
