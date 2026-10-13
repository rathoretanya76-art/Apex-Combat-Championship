import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ZoomIn } from "lucide-react";

interface GalleryCardProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
  caption?: string;
  aspectRatio?: "video" | "square" | "portrait";
}

const GalleryCard = React.forwardRef<HTMLDivElement, GalleryCardProps>(
  ({ className, src, alt, caption, aspectRatio = "video", ...props }, ref) => {
    
    const aspectClass = {
        video: "aspect-video",
        square: "aspect-square",
        portrait: "aspect-[3/4]"
    }[aspectRatio];

    return (
      <div
        ref={ref}
        className={cn(
          "group relative overflow-hidden rounded-lg border border-white/10 bg-black",
          aspectClass,
          className
        )}
        {...props}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:opacity-80"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4">
             <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                 <ZoomIn className="w-8 h-8 text-primary mb-2 mx-auto" />
                 {caption && (
                     <p className="text-white font-bold text-center uppercase tracking-wider text-sm md:text-base">{caption}</p>
                 )}
             </div>
        </div>

        {/* Border Effect */}
        <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/50 transition-colors duration-300 rounded-lg pointer-events-none" />
      </div>
    );
  }
);
GalleryCard.displayName = "GalleryCard";

export { GalleryCard };
