import * as React from "react";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface DivisionCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl: string;
  name: string;
  icon: string;
  description: string;
  href?: string;
  accentColor?: string;
}

const DivisionCard = React.forwardRef<HTMLDivElement, DivisionCardProps>(
  ({ className, imageUrl, name, icon, description, href = "#", accentColor = "0 84.2% 60.2%", ...props }, ref) => {
    return (
      <div
        ref={ref}
        style={{ "--accent-color": accentColor } as React.CSSProperties}
        className={cn("group w-full h-full perspective-1000", className)}
        {...props}
      >
        <a
          href={href}
          className="relative block w-full h-full rounded-lg overflow-hidden border-2 border-transparent 
                     transition-all duration-500 ease-out 
                     group-hover:border-[hsl(var(--accent-color))] group-hover:shadow-[0_0_40px_-10px_hsl(var(--accent-color)/0.5)]"
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center 
                       transition-transform duration-700 ease-out group-hover:scale-110 grayscale group-hover:grayscale-0"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />

          {/* Aggressive Gradient Overlay */}
          <div
            className="absolute inset-0 transition-opacity duration-500"
            style={{
              background: `linear-gradient(to top, hsl(var(--accent-color) / 0.95), black 60%, transparent)`,
              opacity: 0.8
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

          {/* Content */}
          <div className="relative flex flex-col justify-end h-full p-6 text-white z-10">
            <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
              <h3 className="font-headline text-3xl font-black uppercase tracking-wider mb-1 flex items-center gap-3">
                <span className="text-4xl filter drop-shadow-lg">{icon}</span>
                <span className="combat-shadow-strong">{name}</span>
              </h3>
              
              <div className="h-1 w-0 group-hover:w-full bg-[hsl(var(--accent-color))] transition-all duration-500 mb-3" />
              
              <p className="text-base text-gray-300 font-medium opacity-80 group-hover:opacity-100 transition-opacity">
                {description}
              </p>
            </div>

            {/* Action Area */}
            <div className="mt-6 flex items-center justify-between opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-75">
              <span className="text-sm font-bold uppercase tracking-widest text-[hsl(var(--accent-color))]">
                View Roster
              </span>
              <div className="p-2 rounded-full border border-[hsl(var(--accent-color))] text-[hsl(var(--accent-color))] group-hover:bg-[hsl(var(--accent-color))] group-hover:text-white transition-colors">
                 <ArrowRight className="h-5 w-5" />
              </div>
            </div>
          </div>
        </a>
      </div>
    );
  }
);
DivisionCard.displayName = "DivisionCard";

export { DivisionCard };
