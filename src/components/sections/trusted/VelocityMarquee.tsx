"use client";

import React, { useRef, useEffect } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
  useInView,
  useReducedMotion,
  animate,
  wrap,
} from "framer-motion";
import { LogoCard } from "./LogoCard";
import { LogoItem } from "./types";

interface VelocityMarqueeProps {
  logos: LogoItem[];
  speed?: number; // 35s per full cycle
  isSectionHovered?: boolean;
  className?: string;
}

export const VelocityMarquee: React.FC<VelocityMarqueeProps> = ({
  logos,
  speed = 35,
  isSectionHovered = false,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "100px" });
  const shouldReduceMotion = useReducedMotion();

  // Motion values for smooth position and speed control
  const baseX = useMotionValue(0);
  const speedFactor = useMotionValue(1);

  // Moving left-to-right: positive velocity (+50% per full loop cycle)
  const baseVelocity = 50 / speed;

  // Smoothly slow to 25% on hover, resume on leave (not a hard pause)
  useEffect(() => {
    if (shouldReduceMotion) return;
    const targetSpeed = isSectionHovered ? 0.25 : 1;
    const controls = animate(speedFactor, targetSpeed, {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [isSectionHovered, speedFactor, shouldReduceMotion]);

  // Frame loop for steady, readable infinite marquee
  useAnimationFrame((t, delta) => {
    if (!isInView || shouldReduceMotion) return;
    const moveBy = baseVelocity * (delta / 1000) * speedFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  // Seamless wrap between -50% and 0%
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  // Duplicated list to guarantee track is at least 4x the viewport width
  const trackLogos = [...logos, ...logos, ...logos, ...logos];

  if (shouldReduceMotion) {
    return (
      <div
        ref={containerRef}
        className={`flex items-center justify-center gap-6 overflow-x-auto py-4 px-6 ${className}`}
      >
        {logos.slice(0, 6).map((logo, idx) => (
          <LogoCard key={`${logo.id}-${idx}`} logo={logo} />
        ))}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden py-4 select-none ${className}`}
    >
      <motion.div
        className="flex items-center gap-6 cursor-grab active:cursor-grabbing will-change-transform"
        style={{ x }}
        drag="x"
        dragElastic={0.06}
        dragMomentum={true}
        onDrag={(e, info) => {
          // Allow smooth horizontal dragging with inertia
          const deltaPercent = (info.delta.x / (window.innerWidth || 1200)) * 50;
          baseX.set(baseX.get() + deltaPercent);
        }}
      >
        {trackLogos.map((logo, idx) => (
          <LogoCard key={`${logo.id}-${idx}`} logo={logo} />
        ))}
      </motion.div>
    </div>
  );
};
