"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { floatingChipVariants } from "./motion";

interface FloatingChipProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  bobDuration?: number;
  bobDelay?: number;
}

export const FloatingChip: React.FC<FloatingChipProps> = ({
  children,
  className = "",
  delay = 0.65,
  bobDuration = 4,
  bobDelay = 0,
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={floatingChipVariants}
      custom={delay}
      className={`absolute z-30 select-none ${className}`}
    >
      <motion.div
        animate={
          !shouldReduceMotion
            ? {
                y: [0, -6, 0, 6, 0],
              }
            : undefined
        }
        transition={{
          duration: bobDuration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: bobDelay,
        }}
        className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/90 backdrop-blur-md border border-white/80 shadow-lg shadow-slate-900/8 text-xs font-bold text-[#0F172A]"
      >
        {children}
      </motion.div>
    </motion.div>
  );
};
