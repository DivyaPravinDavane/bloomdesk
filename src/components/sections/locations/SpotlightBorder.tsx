"use client";

import React from "react";
import { motion, MotionValue, useMotionTemplate, useReducedMotion } from "framer-motion";

interface SpotlightBorderProps {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  isHovered: boolean;
  radius?: number;
}

export const SpotlightBorder: React.FC<SpotlightBorderProps> = ({
  mouseX,
  mouseY,
  isHovered,
  radius = 220,
}) => {
  const shouldReduceMotion = useReducedMotion();

  // Surface teal spotlight radial template
  const surfaceSpotlight = useMotionTemplate`radial-gradient(${radius}px circle at ${mouseX}px ${mouseY}px, rgba(8, 145, 178, 0.22), transparent 80%)`;

  // Border spotlight template
  const borderSpotlight = useMotionTemplate`radial-gradient(${radius}px circle at ${mouseX}px ${mouseY}px, rgba(8, 145, 178, 0.75), transparent 70%)`;

  if (shouldReduceMotion) return null;

  return (
    <>
      {/* Surface Glow Layer */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-15 transition-opacity duration-300"
        style={{
          background: surfaceSpotlight,
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* Border Glow Layer */}
      <motion.div
        className="absolute inset-0 rounded-[28px] pointer-events-none z-20 border border-transparent transition-opacity duration-300"
        style={{
          background: borderSpotlight,
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "1.5px",
          opacity: isHovered ? 1 : 0,
        }}
      />
    </>
  );
};
