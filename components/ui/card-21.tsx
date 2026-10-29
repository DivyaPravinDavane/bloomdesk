import * as React from "react";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

// Define the props for the DestinationCard component
export interface DestinationCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl: string;
  location: string;
  flag?: string;
  stats?: string;
  href?: string;
  themeColor?: string; // e.g., "192 90% 25%" for teal
  eyebrow?: string;
  onExplore?: () => void;
}

const DestinationCard = React.forwardRef<HTMLDivElement, DestinationCardProps>(
  (
    {
      className,
      imageUrl,
      location,
      flag,
      stats,
      href = "#",
      themeColor = "192 90% 25%",
      eyebrow,
      onExplore,
      ...props
    },
    ref
  ) => {
    return (
      // The 'group' class enables hover effects on child elements
      <div
        ref={ref}
        style={
          {
            // @ts-ignore - CSS custom properties are valid
            "--theme-color": themeColor,
          } as React.CSSProperties
        }
        className={cn("group w-full h-full", className)}
        {...props}
      >
        <a
          href={href}
          onClick={(e) => {
            if (onExplore) {
              e.preventDefault();
              onExplore();
            }
          }}
          className="relative block w-full h-full rounded-2xl overflow-hidden shadow-lg 
                     transition-all duration-500 ease-in-out 
                     group-hover:scale-105 group-hover:shadow-[0_0_60px_-15px_hsl(var(--theme-color)/0.6)]"
          aria-label={`Explore details for ${location}`}
          style={{
            boxShadow: `0 0 40px -15px hsl(var(--theme-color) / 0.5)`,
          }}
        >
          {/* Background Image with Parallax Zoom */}
          <div
            className="absolute inset-0 bg-cover bg-center 
                       transition-transform duration-500 ease-in-out group-hover:scale-110"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />

          {/* Themed Gradient Overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to top, hsl(var(--theme-color) / 0.95), hsl(var(--theme-color) / 0.6) 35%, transparent 70%)`,
            }}
          />

          {/* Content */}
          <div className="relative flex flex-col justify-end h-full p-6 text-white">
            {eyebrow && (
              <span className="text-xs font-bold uppercase tracking-wider text-white/80 mb-1">
                {eyebrow}
              </span>
            )}
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
              {location} {flag && <span className="text-xl ml-1">{flag}</span>}
            </h3>
            {stats && <p className="text-sm text-white/85 mt-1 font-medium">{stats}</p>}

            {/* Explore Button */}
            <div
              className="mt-6 flex items-center justify-between bg-[hsl(var(--theme-color)/0.25)] backdrop-blur-md border border-[hsl(var(--theme-color)/0.35)] 
                           rounded-lg px-4 py-3 
                           transition-all duration-300 
                           group-hover:bg-[hsl(var(--theme-color)/0.5)] group-hover:border-[hsl(var(--theme-color)/0.6)] cursor-pointer"
            >
              <span className="text-sm font-semibold tracking-wide">Inquire & Explore Now</span>
              <ArrowRight className="h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </div>
        </a>
      </div>
    );
  }
);
DestinationCard.displayName = "DestinationCard";

export { DestinationCard };
export default DestinationCard;
