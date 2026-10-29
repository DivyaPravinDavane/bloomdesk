"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { CountUp } from "../infrastructure/CountUp";
import { featureTileVariants, EASINGS } from "./motion";

export interface FeatureTileProps {
  title: string;
  tagOrNumber: string;
  description: string;
  icon: React.ReactNode;
  bgImage: string;
  countTo?: number;
  hasPlus?: boolean;
}

export const FeatureTile: React.FC<FeatureTileProps> = ({
  title,
  tagOrNumber,
  description,
  icon,
  bgImage,
  countTo,
  hasPlus = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [countFinished, setCountFinished] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={featureTileVariants}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={
        !shouldReduceMotion
          ? {
              y: -8,
              transition: { type: "spring", ...EASINGS.springBounce },
            }
          : undefined
      }
      className="group relative h-40 sm:h-44 rounded-[18px] overflow-hidden p-4 sm:p-5 flex flex-col justify-between border border-slate-200/80 shadow-md select-none cursor-pointer"
    >
      {/* Background Image with Hover Zoom */}
      <motion.div
        animate={!shouldReduceMotion ? { scale: isHovered ? 1.12 : 1 } : undefined}
        transition={{ duration: 0.6, ease: EASINGS.smoothOut }}
        className="absolute inset-0 w-full h-full"
      >
        <Image
          src={bgImage}
          alt={title}
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, 300px"
        />
      </motion.div>

      {/* Dynamic Overlay Shift: Navy to Teal on Hover */}
      <motion.div
        animate={{
          backgroundColor: isHovered
            ? "rgba(8, 145, 178, 0.88)"
            : "rgba(15, 23, 42, 0.82)",
        }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0 backdrop-blur-[1px]"
      />

      {/* Top Row: Icon Box & Tag/Number */}
      <div className="relative z-10 flex items-center justify-between">
        {/* Icon box rotates -8deg and fills solid teal on hover */}
        <motion.div
          animate={
            !shouldReduceMotion
              ? {
                  rotate: isHovered ? -8 : 0,
                  backgroundColor: isHovered ? "#0891B2" : "rgba(255, 255, 255, 0.15)",
                }
              : undefined
          }
          transition={{ type: "spring", stiffness: 350, damping: 20 }}
          className="w-9 h-9 rounded-xl flex items-center justify-center text-white border border-white/20 shadow-sm"
        >
          {icon}
        </motion.div>

        {/* Number / Short Tag */}
        <div className="text-right">
          {countTo !== undefined ? (
            <div className="flex items-center justify-end font-black text-white text-base sm:text-lg tracking-tight leading-none">
              <CountUp to={countTo} duration={1.6} onComplete={() => setCountFinished(true)} />
              {hasPlus && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={countFinished || shouldReduceMotion ? { scale: 1 } : { scale: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="text-[#FACC15] ml-0.5"
                >
                  +
                </motion.span>
              )}
              <span className="text-xs font-semibold text-slate-200 ml-1">Entities</span>
            </div>
          ) : (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-white/20 text-white tracking-wider uppercase border border-white/25">
              {tagOrNumber}
            </span>
          )}
        </div>
      </div>

      {/* Bottom Content: Title + Slide-up Description on Hover */}
      <div className="relative z-10 overflow-hidden">
        <h4 className="text-sm sm:text-base font-extrabold text-white tracking-tight leading-snug">
          {title}
        </h4>

        {/* Description slides up from below on hover */}
        <motion.p
          initial={{ y: 24, opacity: 0 }}
          animate={{
            y: isHovered ? 0 : 24,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: EASINGS.smoothOut }}
          className="text-[11px] text-cyan-50/90 leading-tight mt-1 line-clamp-2"
        >
          {description}
        </motion.p>
      </div>
    </motion.div>
  );
};
