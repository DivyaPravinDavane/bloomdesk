"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CountUp } from "./CountUp";
import { statCardVariants, checklistItemVariants, checkPathVariants, EASINGS } from "./motion";

export const StatCard: React.FC = () => {
  const [countFinished, setCountFinished] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const checklist = [
    "Zero maintenance or utility bills",
    "Ready-to-use plug & play setup",
    "Included in all monthly memberships",
  ];

  return (
    <motion.div
      variants={statCardVariants}
      className="relative p-7 sm:p-8 rounded-[24px] overflow-hidden text-white shadow-xl shadow-[#0891B2]/15 border border-white/20 select-none"
      style={{
        background: "linear-gradient(135deg, #0891B2 0%, #065F78 50%, #0891B2 100%)",
        backgroundSize: "200% 200%",
      }}
      animate={
        !shouldReduceMotion
          ? {
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }
          : undefined
      }
      transition={{
        duration: 12,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {/* 2 Blurred Floating Light Orbs */}
      {!shouldReduceMotion && (
        <>
          <motion.div
            animate={{
              x: [-20, 30, -20],
              y: [-15, 20, -15],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-cyan-300/25 blur-3xl pointer-events-none"
          />
          <motion.div
            animate={{
              x: [25, -20, 25],
              y: [20, -15, 20],
              scale: [1.1, 0.9, 1.1],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -bottom-12 -right-12 w-56 h-56 rounded-full bg-teal-400/20 blur-3xl pointer-events-none"
          />
        </>
      )}

      {/* Content Layout */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 sm:gap-8">
        {/* Left: Big Number & Headlines */}
        <div className="space-y-1">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-cyan-100/90 block">
            Comprehensive Infrastructure
          </span>

          <div className="flex items-baseline gap-1">
            <span className="text-5xl sm:text-6xl font-black text-white tracking-tight leading-none">
              <CountUp to={40} onComplete={() => setCountFinished(true)} />
            </span>

            {/* Yellow "+" Spring Pop-in + Slow Infinite Pulse */}
            <motion.span
              initial={{ scale: 0, rotate: -90, opacity: 0 }}
              animate={
                countFinished || shouldReduceMotion
                  ? {
                      scale: shouldReduceMotion ? 1 : [1, 1.12, 1],
                      rotate: 0,
                      opacity: 1,
                    }
                  : { scale: 0, opacity: 0 }
              }
              transition={
                countFinished && !shouldReduceMotion
                  ? {
                      scale: {
                        duration: 2.4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                      rotate: { type: "spring", stiffness: 300, damping: 15 },
                      opacity: { duration: 0.2 },
                    }
                  : {
                      type: "spring",
                      stiffness: 300,
                      damping: 15,
                    }
              }
              className="text-4xl sm:text-5xl font-black text-[#FACC15] inline-block origin-center ml-1"
            >
              +
            </motion.span>
          </div>

          <p className="text-xs sm:text-sm font-semibold text-cyan-50/90 max-w-sm pt-1 leading-snug">
            High Range of Modern Amenities Across Every Center
          </p>
        </div>

        {/* Right: Checklist with SVG Draw Animations */}
        <div className="space-y-2.5 pt-4 md:pt-0 md:pl-6 border-t md:border-t-0 md:border-l border-white/20">
          {checklist.map((item, idx) => (
            <motion.div
              key={idx}
              variants={checklistItemVariants}
              custom={idx}
              className="flex items-center gap-2.5 text-xs sm:text-[13px] font-medium text-white/95"
            >
              <span className="w-5 h-5 rounded-full bg-white/15 flex items-center justify-center shrink-0 border border-white/25">
                <svg
                  className="w-3 h-3 text-[#FACC15]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <motion.path
                    d="M20 6L9 17L4 12"
                    variants={checkPathVariants}
                    custom={idx}
                  />
                </svg>
              </span>
              <span>{item}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
