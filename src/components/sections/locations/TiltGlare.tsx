"use client";

import React from "react";
import { motion, MotionValue, useMotionTemplate, useReducedMotion } from "framer-motion";

interface TiltGlareProps {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  isHovered: boolean;
}

export const TiltGlare: React.FC<TiltGlareProps> = ({
  mouseX,
  mouseY,
  isHovered,
}) => {
  const shouldReduceMotion = useReducedMotion();

  // White soft glare radial gradient following cursor
  const glareBg = useMotionTemplate`radial-gradient(320px circle at ${mouseX}px ${mouseY}px, rgba(255, 255, 255, 0.18), transparent 75%)`;

  if (shouldReduceMotion) return null;

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none z-16 mix-blend-overlay transition-opacity duration-300"
      style={{
        background: glareBg,
        opacity: isHovered ? 1 : 0,
      }}
    />
  );
};
