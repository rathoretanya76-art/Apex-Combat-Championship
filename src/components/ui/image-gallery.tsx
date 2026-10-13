'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ZoomIn, X, Camera, Trophy, Sparkles } from 'lucide-react';

interface GalleryMediaItem {
  id: string;
  title: string;
  category: 'Octagon Action' | 'Striking & KOs' | 'Camp Training' | 'Staredowns';
  src: string;
  aspect: 'video' | 'portrait' | 'square';
  caption: string;
}

const galleryItems: GalleryMediaItem[] = [
  {
    id: 'g-1',
    title: 'The Proving Ground',
    category: 'Octagon Action',
    src: '/assets/images/mma-octagon.png',
    aspect: 'video',
    caption: 'Overhead panoramic view of the official Apex Octagon prior to the main card broadcast.'
  },
  {
    id: 'g-2',
    title: 'War Room Preparation',
    category: 'Camp Training',
    src: '/assets/images/fighter-prep.png',
    aspect: 'portrait',
    caption: 'Official corner wrapping and hand taping under the supervision of the state commission.'
  },
  {
    id: 'g-3',
    title: 'Precision Heavy Bag Drill',
    category: 'Camp Training',
    src: '/assets/images/1.png',
    aspect: 'square',
    caption: 'Conditioning combinations in preparation for a five-round championship title clash.'
  },
  {
    id: 'g-4',
    title: 'The High Kick Impact',
    category: 'Striking & KOs',
    src: '/assets/images/kickboxing-match.png',
    aspect: 'video',
    caption: 'Devastating head-kick exchange in the Apex Kickboxing division co-main event.'
  },
  {
    id: 'g-5',
    title: 'Unblinking Staredown',
    category: 'Staredowns',
    src: '/assets/images/fighter-staredown.png',
    aspect: 'portrait',
    caption: 'Tense championship weigh-in faceoff ahead of Apex 28: War of Champions.'
  },
  {
    id: 'g-6',
    title: 'Grit in Camp',
    category: 'Camp Training',
    src: '/assets/images/fighter-training.png',
    aspect: 'square',
    caption: 'High-intensity conditioning camp push at the Apex Performance Institute.'
  },
  {
    id: 'g-7',
    title: 'Championship Belt Raised',
    category: 'Octagon Action',
    src: '/assets/images/hero-bg.jpg',
    aspect: 'video',
    caption: 'The moment of victory: newly crowned world champion celebrated under the laser lights.'
  },
  {
    id: 'g-8',
    title: 'The Fight for Position',
    category: 'Octagon Action',
    src: '/assets/images/brand-story.jpg',
    aspect: 'portrait',
    caption: 'Tactical ground scramble showcasing the technical artistry of submission grappling.'
  },
  {
    id: 'g-9',
    title: 'Refined Striking Combos',
    category: 'Striking & KOs',
    src: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=800&auto=format&fit=crop',
    aspect: 'video',
    caption: 'Precision southpaw combinations landed during the lightweight tournament eliminator.'
  },
  {
    id: 'g-10',
    title: 'Iron Focus at Weigh-In',
    category: 'Staredowns',
    src: 'https://images.unsplash.com/photo-1517438322307-e67111335449?q=80&w=800&auto=format&fit=crop',
    aspect: 'square',
    caption: 'Athletes hit official championship weight within grams of the division limit.'
  },
  {
    id: 'g-11',
    title: 'Heavyweight Collision',
    category: 'Striking & KOs',
    src: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop',
    aspect: 'portrait',
    caption: 'Heavyweight titans exchanging thunderous blows inside the championship cage.'
  },
  {
    id: 'g-12',
    title: 'Corner Strategy',
    category: 'Octagon Action',
    src: '/assets/images/about-us-extra.jpg',
    aspect: 'video',
    caption: 'Critical between-round instructions delivered by head coaches before the final championship round.'
  }
];

export function ImageGallery() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryMediaItem | null>(null);

  const categories = ['All', 'Octagon Action', 'Striking & KOs', 'Camp Training', 'Staredowns'];

  const filteredItems = activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <div className="w-full space-y-8">
      {/* Category Pills */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-headline uppercase tracking-wider transition-all ${
              activeCategory === cat
                ? 'bg-primary text-black font-black shadow-[0_0_15px_hsl(var(--primary)/0.5)]'
                : 'bg-card border border-white/10 text-muted-foreground hover:text-white hover:border-primary/40'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedPhoto(item)}
            className="group relative overflow-hidden rounded-xl border border-primary/20 bg-card cursor-pointer shadow-lg hover:border-primary transition-all duration-300 hover:-translate-y-1"
          >
            <div className="relative aspect-[16/11] w-full overflow-hidden bg-neutral-900">
              <Image
                src={item.src}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-0.5 rounded bg-black/70 backdrop-blur-sm border border-white/10 text-[10px] font-mono text-primary font-bold uppercase">
                  {item.category}
                </span>
              </div>

              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="p-3 rounded-full bg-black/80 text-primary border border-primary">
                  <ZoomIn className="w-6 h-6" />
                </div>
              </div>

              <div className="absolute bottom-3 left-3 right-3">
                <h4 className="font-headline text-lg font-black uppercase text-white tracking-wide">
                  {item.title}
                </h4>
                <p className="text-xs text-muted-foreground line-clamp-1">
                  {item.caption}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div 
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-card border-2 border-primary/40 rounded-xl max-w-3xl w-full overflow-hidden shadow-2xl relative"
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/80 text-white hover:bg-primary hover:text-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-video w-full bg-black">
              <Image
                src={selectedPhoto.src}
                alt={selectedPhoto.title}
                fill
                className="object-contain"
              />
            </div>

            <div className="p-6 space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/30 text-xs font-mono font-bold uppercase">
                  {selectedPhoto.category}
                </span>
                <span className="text-xs text-muted-foreground">• Apex Official Media Archive</span>
              </div>
              <h3 className="font-headline text-2xl font-black uppercase text-white">
                {selectedPhoto.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {selectedPhoto.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
