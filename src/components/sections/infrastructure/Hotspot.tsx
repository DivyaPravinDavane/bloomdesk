"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { EASINGS } from "./motion";

export interface HotspotProps {
  label: string;
  xPercent: number; // e.g. 33 for left 33%
  yPercent: number; // e.g. 25 for top 25%
  delayIndex?: number;
}

export const Hotspot: React.FC<HotspotProps> = ({
  label,
  xPercent,
  yPercent,
  delayIndex = 0,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: "spring",
        ...EASINGS.hotspotSpring,
        delay: 0.8 + delayIndex * 0.15,
      }}
      style={{
        left: `${xPercent}%`,
        top: `${yPercent}%`,
      }}
      className="absolute -translate-x-1/2 -translate-y-1/2 z-20 flex items-center gap-2.5 pointer-events-auto"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onClick={() => setIsOpen((prev) => !prev)}
    >
      {/* Interactive Trigger Button with Pulsing Ring */}
      <div className="relative flex items-center justify-center cursor-pointer">
        {/* Pulsing ring animation */}
        {!shouldReduceMotion && (
          <motion.span
            animate={{
              scale: [1, 2.1],
              opacity: [0.65, 0],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeOut",
              delay: delayIndex * 0.4,
            }}
            className="absolute w-8 h-8 rounded-full bg-[#0891B2] pointer-events-none"
          />
        )}

        <motion.button
          type="button"
          aria-label={`Hotspot: ${label}`}
          animate={{
            scale: isOpen ? 1.15 : 1,
            backgroundColor: isOpen ? "#065F78" : "#0891B2",
          }}
          transition={{ duration: 0.25 }}
          className="relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-white shadow-lg shadow-[#0891B2]/30 border-2 border-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <motion.span
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.3, ease: EASINGS.smoothOut }}
            className="font-bold text-sm leading-none flex items-center justify-center select-none"
          >
            +
          </motion.span>
        </motion.button>
      </div>

      {/* Expanding Label Pill */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            layout
            initial={{ opacity: 0, scale: 0.85, filter: "blur(4px)", width: 0 }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)", width: "auto" }}
            exit={{ opacity: 0, scale: 0.85, filter: "blur(4px)", width: 0 }}
            transition={{ duration: 0.3, ease: EASINGS.smoothOut }}
            className="overflow-hidden whitespace-nowrap"
          >
            <div className="px-3.5 py-1.5 rounded-xl bg-slate-950/85 backdrop-blur-md text-white text-xs font-bold tracking-wide shadow-xl border border-white/20 select-none">
              {label}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
