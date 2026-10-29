"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { wordRevealVariants } from "./motion";

interface SplitHeadlineProps {
  text: string;
  className?: string;
}

export const SplitHeadline: React.FC<SplitHeadlineProps> = ({
  text,
  className = "",
}) => {
  const shouldReduceMotion = useReducedMotion();
  const words = text.split(" ");

  if (shouldReduceMotion) {
    return (
      <h2 className={`text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight ${className}`}>
        {text}
      </h2>
    );
  }

  return (
    <h2 className={`text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight flex flex-wrap justify-center gap-x-2 gap-y-1 ${className}`}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="inline-block overflow-hidden pb-1">
          <motion.span
            variants={wordRevealVariants}
            className="inline-block"
            transition={{
              duration: 0.75,
              delay: index * 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </h2>
  );
};
