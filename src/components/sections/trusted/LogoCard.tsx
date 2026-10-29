"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import {
  motion,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { SpotlightCard } from "./SpotlightCard";
import { LogoItem } from "./types";

interface LogoCardProps {
  logo: LogoItem;
}

export const LogoCard: React.FC<LogoCardProps> = ({ logo }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [imgError, setImgError] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Continuous depth transform based on proximity to center of viewport
  // Scale: 1.06 at center down to 0.95 at edges.
  // Opacity: 1 at center down to min 0.85 at edges. Zero blur.
  const springScale = useSpring(1, { stiffness: 220, damping: 24 });
  const springOpacity = useSpring(1, { stiffness: 220, damping: 24 });

  useEffect(() => {
    if (shouldReduceMotion) return;

    let animFrame: number;
    const checkProximity = () => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const windowCenter = window.innerWidth / 2;
      const dist = Math.abs(cardCenter - windowCenter);
      const maxDist = window.innerWidth / 2 || 600;
      const normDist = Math.min(1, dist / maxDist);

      // Center card becomes active when within ~125px of the center
      const activeState = dist < 125;
      setIsActive(activeState);

      // Gentle scale: 1.06 at center to 0.95 at edges
      const targetScale = 1.06 - normDist * 0.11;
      // Opacity never drops below 0.85
      const targetOpacity = 1 - normDist * 0.15;

      springScale.set(targetScale);
      springOpacity.set(targetOpacity);

      animFrame = requestAnimationFrame(checkProximity);
    };

    animFrame = requestAnimationFrame(checkProximity);
    return () => cancelAnimationFrame(animFrame);
  }, [shouldReduceMotion, springScale, springOpacity]);

  return (
    <div ref={cardRef} className="flex-shrink-0">
      <motion.div
        style={{
          scale: shouldReduceMotion ? 1 : springScale,
          opacity: shouldReduceMotion ? 1 : springOpacity,
        }}
      >
        <SpotlightCard isActive={isActive}>
          {/* Logo container: normalized max height 40px, max width 150px, centered */}
          <div className="relative w-full h-10 flex items-center justify-center">
            {imgError ? (
              /* Fallback Wordmark: Inter 600, navy, 16px */
              <span className="font-semibold text-[#0F172A] text-base tracking-tight select-none">
                {logo.name}
              </span>
            ) : (
              <Image
                src={logo.src}
                alt={logo.name}
                width={150}
                height={40}
                unoptimized
                priority={false}
                onError={() => {
                  if (process.env.NODE_ENV === "development") {
                    console.warn(`[LogoCard] Failed to load logo: ${logo.src}. Displaying fallback wordmark.`);
                  }
                  setImgError(true);
                }}
                className="max-h-10 max-w-[150px] w-auto h-auto object-contain select-none"
              />
            )}
          </div>

          {/* Small Teal Dot Indicator under the Active Center Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={
              isActive
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0 }
            }
            transition={{ duration: 0.25 }}
            className="absolute bottom-2.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#0891B2] shadow-xs shadow-[#0891B2]/50"
          />
        </SpotlightCard>
      </motion.div>
    </div>
  );
};
