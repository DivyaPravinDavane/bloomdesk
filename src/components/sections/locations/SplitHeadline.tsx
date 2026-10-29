"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { wordRevealVariants, underlineDrawVariants } from "./motion";

interface SplitHeadlineProps {
  text: string;
  className?: string;
  withUnderline?: boolean;
}

export const SplitHeadline: React.FC<SplitHeadlineProps> = ({
  text,
  className = "",
  withUnderline = true,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const words = text.split(" ");

  if (shouldReduceMotion) {
    return (
      <div className="relative inline-block">
        <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F172A] tracking-tight ${className}`}>
          {text}
        </h2>
        {withUnderline && (
          <div className="h-1 sm:h-1.5 w-full bg-gradient-to-r from-[#0891B2] via-[#0891B2] to-[#FACC15] rounded-full mt-2" />
        )}
      </div>
    );
  }

  return (
    <div className="relative inline-block">
      <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F172A] tracking-tight flex flex-wrap gap-x-2.5 gap-y-1 ${className}`}>
        {words.map((word, index) => (
          <span key={`${word}-${index}`} className="inline-block overflow-hidden pb-1">
            <motion.span
              variants={wordRevealVariants}
              className="inline-block"
              transition={{
                duration: 0.75,
                delay: index * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </h2>

      {withUnderline && (
        <motion.div
          variants={underlineDrawVariants}
          className="h-1 sm:h-1.5 w-full bg-gradient-to-r from-[#0891B2] via-[#0891B2] to-[#FACC15] rounded-full mt-2 origin-left"
        />
      )}
    </div>
  );
};
