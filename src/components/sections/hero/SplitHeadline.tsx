"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { wordRevealVariants, EASINGS } from "./motion";

export const SplitHeadline: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const line1Words = ["Inspiring", "Spaces", "to", "Work,"];
  const line2Words = ["Room", "to", "Grow."];

  if (shouldReduceMotion) {
    return (
      <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-[#0F172A] tracking-tight leading-[1.08]">
        <span>Inspiring Spaces to Work,</span>
        <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0891B2] via-[#065F78] to-[#0891B2]">
          Room to Grow.
        </span>
      </h1>
    );
  }

  return (
    <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-[#0F172A] tracking-tight leading-[1.08] select-none">
      {/* Line 1: Inspiring Spaces to Work, */}
      <div className="flex flex-wrap gap-x-3.5 gap-y-1">
        {line1Words.map((word, idx) => (
          <span key={`line1-${word}-${idx}`} className="inline-block overflow-hidden pb-1">
            <motion.span
              variants={wordRevealVariants}
              transition={{
                duration: 0.75,
                delay: 0.2 + idx * 0.06,
                ease: EASINGS.smoothOut,
              }}
              className="inline-block"
            >
              {word}
            </motion.span>
          </span>
        ))}
      </div>

      {/* Line 2: Room to Grow. (Teal Gradient + Shimmer Sweep + Loop Shift) */}
      <div className="flex flex-wrap gap-x-3.5 gap-y-1 mt-1 sm:mt-2 relative">
        {line2Words.map((word, idx) => (
          <span key={`line2-${word}-${idx}`} className="inline-block overflow-hidden pb-1">
            <motion.span
              variants={wordRevealVariants}
              transition={{
                duration: 0.75,
                delay: 0.2 + (line1Words.length + idx) * 0.06,
                ease: EASINGS.smoothOut,
              }}
              className="inline-block relative"
            >
              <motion.span
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  backgroundSize: "200% 200%",
                }}
                className="text-transparent bg-clip-text bg-gradient-to-r from-[#0891B2] via-[#065F78] to-[#0891B2]"
              >
                {word}
              </motion.span>
            </motion.span>
          </span>
        ))}

        {/* One-time Shimmer Sweep across 'Room to Grow.' */}
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "200%" }}
          transition={{
            duration: 1.1,
            delay: 1.0,
            ease: EASINGS.smoothOut,
          }}
          className="absolute inset-0 -skew-x-20 bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none"
        />
      </div>
    </h1>
  );
};
