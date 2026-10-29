"use client";

import React from "react";
import { motion, useTransform, useReducedMotion, MotionValue } from "framer-motion";
import { wordRevealVariants } from "./motion";

interface SplitHeadlineProps {
  scrollYProgress?: MotionValue<number>;
}

export const SplitHeadline: React.FC<SplitHeadlineProps> = ({ scrollYProgress }) => {
  const shouldReduceMotion = useReducedMotion();

  // Scroll-linked background position shift for gradient text
  const bgPos = useTransform(
    scrollYProgress || new MotionValue(0.5),
    [0, 1],
    ["0% 50%", "100% 50%"]
  );

  const plainWords = ["Passion", "to", "Create"];
  const gradientWords = ["Inspirational", "Workspace", "Solutions"];

  return (
    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F172A] tracking-tight leading-[1.12]">
      {/* Plain Words */}
      <span className="inline-block mr-2.5">
        {plainWords.map((word, idx) => (
          <span key={idx} className="inline-block overflow-hidden mr-2 align-bottom">
            <motion.span
              variants={wordRevealVariants}
              className="inline-block"
            >
              {word}
            </motion.span>
          </span>
        ))}
      </span>

      {/* Gradient Words */}
      <motion.span
        style={!shouldReduceMotion ? { backgroundPosition: bgPos } : undefined}
        className="relative inline-block bg-gradient-to-r from-[#0891B2] via-cyan-500 to-[#065F78] bg-clip-text text-transparent bg-[size:200%_auto]"
      >
        {gradientWords.map((word, idx) => (
          <span key={idx} className="inline-block overflow-hidden mr-2 align-bottom">
            <motion.span
              variants={wordRevealVariants}
              custom={plainWords.length + idx}
              className="inline-block font-extrabold"
            >
              {word}
            </motion.span>
          </span>
        ))}

        {/* Shimmer sweep running once after reveal */}
        {!shouldReduceMotion && (
          <motion.span
            initial={{ x: "-100%" }}
            whileInView={{ x: "200%" }}
            viewport={{ once: true }}
            transition={{
              duration: 1.2,
              delay: 0.8,
              ease: "easeInOut",
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none mix-blend-overlay"
          />
        )}
      </motion.span>
    </h2>
  );
};
