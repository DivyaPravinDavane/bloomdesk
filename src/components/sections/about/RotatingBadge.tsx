"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { circularImageVariants } from "./motion";

interface RotatingBadgeProps {
  className?: string;
}

export const RotatingBadge: React.FC<RotatingBadgeProps> = ({ className = "" }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={circularImageVariants}
      className={`relative flex items-center justify-center select-none ${className}`}
    >
      {/* Outer Rotating SVG Circular Text */}
      <motion.div
        animate={!shouldReduceMotion ? { rotate: 360 } : undefined}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -inset-3 w-32 h-32 pointer-events-none z-20"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path
            id="textPath"
            d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
            fill="none"
          />
          <text className="text-[7px] font-extrabold uppercase tracking-[0.22em] fill-[#0891B2]">
            <textPath href="#textPath" startOffset="0%">
              BORIVALI • KANDIVALI • BLOOMDESK •
            </textPath>
          </text>
        </svg>
      </motion.div>

      {/* Inner Circular Image with Soft Zoom */}
      <div className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-full overflow-hidden border-3 border-white shadow-xl bg-slate-900 z-10">
        <motion.div
          animate={!shouldReduceMotion ? { scale: [1, 1.18, 1] } : undefined}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative w-full h-full"
        >
          <Image
            src="/assets/gallery/gallery-2.jpg"
            alt="BloomDesk Community Lounge"
            fill
            className="object-cover"
            sizes="90px"
          />
        </motion.div>
        {/* Subtle cyan inner glow ring */}
        <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-[#0891B2]/30 pointer-events-none" />
      </div>
    </motion.div>
  );
};
