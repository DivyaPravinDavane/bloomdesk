"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";

export interface DepthCardLayer {
  image?: string;
  depth?: number;
  content?: React.ReactNode;
  className?: string;
}

export interface DepthCardProps {
  image?: string;
  title?: string;
  description?: React.ReactNode | string;
  width?: number | string;
  height?: number | string;
  maxRotation?: number;
  maxTranslation?: number;
  borderRadius?: string;
  className?: string;
  contentClassName?: string;
  onClick?: () => void;
  href?: string;
  target?: string;
  imageAlt?: string;
  disableOnMobile?: boolean;
  ariaLabel?: string;
  layers?: DepthCardLayer[];
  staggerDelay?: number;
  revealAnimation?: "slide" | "fade" | "none";
  respectReducedMotion?: boolean;
  spotlight?: boolean;
  spotlightColor?: string;
  children?: React.ReactNode;
}

export const DepthCard: React.FC<DepthCardProps> = ({
  image,
  title,
  description,
  width = "100%",
  height = 360,
  maxRotation = 18,
  maxTranslation = 20,
  borderRadius = "24px",
  className = "",
  contentClassName = "",
  onClick,
  href,
  target = "_self",
  imageAlt = "Card image",
  disableOnMobile = false,
  ariaLabel,
  layers,
  staggerDelay = 100,
  revealAnimation = "slide",
  respectReducedMotion = true,
  spotlight = true,
  spotlightColor = "rgba(255, 255, 255, 0.45)",
  children,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [percent, setPercent] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mediaQuery.matches);
      const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener("change", handler);

      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768 || "ontouchstart" in window);
      };
      checkMobile();
      window.addEventListener("resize", checkMobile);

      return () => {
        mediaQuery.removeEventListener("change", handler);
        window.removeEventListener("resize", checkMobile);
      };
    }
  }, []);

  const shouldDisable3D = (respectReducedMotion && prefersReducedMotion) || (disableOnMobile && isMobile);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (shouldDisable3D || !cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      // Normalized coordinates from -1 to 1 (center is 0)
      const normX = ((clientX / rect.width) * 2 - 1);
      const normY = ((clientY / rect.height) * 2 - 1);

      // Clamped
      const clampedX = Math.max(-1, Math.min(1, normX));
      const clampedY = Math.max(-1, Math.min(1, normY));

      setCoords({ x: clampedX, y: clampedY });
      setPercent({
        x: (clientX / rect.width) * 100,
        y: (clientY / rect.height) * 100,
      });
    },
    [shouldDisable3D]
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setCoords({ x: 0, y: 0 });
  }, []);

  // Compute 3D rotation angles
  const rotateX = shouldDisable3D ? 0 : -coords.y * maxRotation;
  const rotateY = shouldDisable3D ? 0 : coords.x * maxRotation;

  // Background parallax translation
  const bgTranslateX = shouldDisable3D ? 0 : -coords.x * maxTranslation * 0.6;
  const bgTranslateY = shouldDisable3D ? 0 : -coords.y * maxTranslation * 0.6;

  // Dynamic style calculation
  const cardTransform = isHovered && !shouldDisable3D
    ? `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.025, 1.025, 1.025)`
    : "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";

  const cardTransition = isHovered
    ? "transform 0.1s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease"
    : "transform 0.55s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.4s ease";

  const widthStyle = typeof width === "number" ? `${width}px` : width;
  const heightStyle = typeof height === "number" ? `${height}px` : height;

  const content = (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      role={onClick || href ? "button" : undefined}
      tabIndex={onClick || href ? 0 : undefined}
      onKeyDown={(e) => {
        if ((e.key === "Enter" || e.key === " ") && onClick) {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={ariaLabel || title || imageAlt}
      className={cn(
        "group relative block select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#008fb4] focus-visible:ring-offset-2",
        onClick || href ? "cursor-pointer" : "cursor-default",
        className
      )}
      style={{
        width: widthStyle,
        height: heightStyle,
        perspective: "1000px",
        borderRadius,
      }}
    >
      <div
        className="relative w-full h-full overflow-hidden transition-shadow duration-300 ease-out"
        style={{
          borderRadius,
          transform: cardTransform,
          transition: cardTransition,
          transformStyle: "preserve-3d",
          WebkitBackfaceVisibility: "hidden",
          backfaceVisibility: "hidden",
          boxShadow: isHovered
            ? "0 24px 48px -12px rgba(15, 23, 42, 0.35), 0 0 20px 0 rgba(0, 143, 180, 0.2)"
            : "0 10px 25px -5px rgba(15, 23, 42, 0.12), 0 8px 10px -6px rgba(15, 23, 42, 0.08)",
        }}
      >
        {/* Base Background Image Layer */}
        {image && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              borderRadius,
              transform: `translate3d(${bgTranslateX.toFixed(2)}px, ${bgTranslateY.toFixed(2)}px, 0) scale(1.12)`,
              transition: isHovered ? "transform 0.1s ease-out" : "transform 0.55s ease-out",
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              WebkitBackfaceVisibility: "hidden",
              backfaceVisibility: "hidden",
            }}
          />
        )}

        {/* Additional Custom Parallax Layers */}
        {layers?.map((layer, idx) => {
          const depthMultiplier = layer.depth ?? (idx + 1) * 0.5;
          const layerX = shouldDisable3D ? 0 : -coords.x * maxTranslation * depthMultiplier;
          const layerY = shouldDisable3D ? 0 : -coords.y * maxTranslation * depthMultiplier;
          const layerZ = depthMultiplier * 24;

          return (
            <div
              key={idx}
              className={cn("absolute inset-0 pointer-events-none", layer.className)}
              style={{
                borderRadius,
                transform: `translate3d(${layerX.toFixed(2)}px, ${layerY.toFixed(2)}px, ${layerZ}px)`,
                transition: isHovered ? "transform 0.1s ease-out" : "transform 0.55s ease-out",
                backgroundImage: layer.image ? `url(${layer.image})` : undefined,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {layer.content}
            </div>
          );
        })}

        {/* Subtle Dark Gradient Overlay for Readability */}
        <div
          className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300"
          style={{
            background:
              "linear-gradient(to top, rgba(15, 23, 42, 0.92) 0%, rgba(15, 23, 42, 0.45) 45%, rgba(15, 23, 42, 0.1) 80%, transparent 100%)",
            opacity: isHovered ? 0.95 : 0.8,
          }}
        />

        {/* Interactive Spotlight / Glare Layer */}
        {spotlight && !shouldDisable3D && (
          <div
            className="absolute inset-0 pointer-events-none z-20 transition-opacity duration-300 ease-out"
            style={{
              opacity: isHovered ? 1 : 0,
              background: `radial-gradient(circle 280px at ${percent.x}% ${percent.y}%, ${spotlightColor}, transparent 70%)`,
              mixBlendMode: "soft-light",
              filter: "blur(2px)",
            }}
          />
        )}

        {/* Custom Inner Content / Floating Elements (Tags, Icons, Lightbox buttons) */}
        {children && (
          <div
            className="absolute inset-0 z-30 pointer-events-none"
            style={{
              transform: `translate3d(${(-coords.x * 6).toFixed(1)}px, ${(-coords.y * 6).toFixed(1)}px, 30px)`,
              transition: isHovered ? "transform 0.15s ease-out" : "transform 0.55s ease-out",
            }}
          >
            {children}
          </div>
        )}

        {/* Built-in Title & Description Overlay */}
        {(title || description) && (
          <div
            className={cn(
              "absolute inset-0 z-30 flex flex-col justify-end p-6 pointer-events-none",
              contentClassName
            )}
            style={{
              transform: `translate3d(${(-coords.x * 10).toFixed(1)}px, ${(-coords.y * 10).toFixed(1)}px, 40px)`,
              transition: isHovered ? "transform 0.15s ease-out" : "transform 0.55s ease-out",
            }}
          >
            {title && (
              <h3
                className={cn(
                  "text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug drop-shadow-sm",
                  revealAnimation === "slide" &&
                    "transition-transform duration-500 ease-out translate-y-1 group-hover:translate-y-0",
                  revealAnimation === "fade" &&
                    "transition-opacity duration-500 ease-out opacity-90 group-hover:opacity-100"
                )}
              >
                {title}
              </h3>
            )}
            {description && (
              <div
                className={cn(
                  "mt-1.5 text-xs sm:text-sm text-slate-200/90 leading-relaxed drop-shadow-sm",
                  revealAnimation === "slide" &&
                    "transition-all duration-500 ease-out delay-75 translate-y-2 group-hover:translate-y-0 opacity-80 group-hover:opacity-100",
                  revealAnimation === "fade" &&
                    "transition-opacity duration-500 ease-out delay-75 opacity-75 group-hover:opacity-100"
                )}
                style={{
                  transitionDelay: `${staggerDelay}ms`,
                }}
              >
                {description}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
        className="block no-underline"
      >
        {content}
      </a>
    );
  }

  return content;
};

export default DepthCard;
