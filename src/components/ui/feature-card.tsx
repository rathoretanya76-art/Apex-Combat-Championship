import * as React from "react";
import { cn } from "@/lib/utils";
import { CageOverlay } from "@/components/cage-pattern";

interface FeatureCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl: string;
  imageAlt: string;
  icon?: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = React.forwardRef<HTMLDivElement, FeatureCardProps>(
  ({ className, imageUrl, imageAlt, icon, title, description, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "group relative w-full h-full overflow-hidden rounded-lg bg-card border-2 border-primary/20",
          "transition-all duration-300 ease-out hover:border-primary hover:shadow-[0_0_30px_hsl(var(--primary)/0.3)]",
          className
        )}
        {...props}
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={imageUrl}
            alt={imageAlt}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 grayscale group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-80" />
          <CageOverlay intensity="subtle" className="opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Content */}
        <div className="relative h-full flex flex-col justify-end p-6 z-10">
          <div className="mb-4 transform transition-all duration-300 group-hover:-translate-y-2">
            <div className="flex items-center gap-3 mb-3">
              {icon && (
                <div className="p-2 rounded bg-primary/10 border border-primary/30 text-primary backdrop-blur-sm">
                  {icon}
                </div>
              )}
              <h3 className="font-headline text-2xl font-bold text-white uppercase tracking-wide group-hover:text-primary transition-colors">
                {title}
              </h3>
            </div>
            
            <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-300">
               <div className="bg-primary/20 h-0.5 w-12 mb-3" />
            </div>

            <p className="text-muted-foreground group-hover:text-white transition-colors duration-300 leading-relaxed text-sm md:text-base">
              {description}
            </p>
          </div>
        </div>

        {/* Decorative Corner */}
        <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
           <div className="w-2 h-2 bg-primary animate-pulse" />
        </div>
      </div>
    );
  }
);
FeatureCard.displayName = "FeatureCard";

export { FeatureCard };
