"use client";

import React, { useRef, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useReducedMotion,
} from "framer-motion";
import { amenityCardVariants, EASINGS } from "./motion";

export interface AmenityCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export const AmenityCard: React.FC<AmenityCardProps> = ({
  title,
  description,
  icon,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Cursor spotlight values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (shouldReduceMotion || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    },
    [shouldReduceMotion, mouseX, mouseY]
  );

  const spotlightBg = useMotionTemplate`radial-gradient(220px circle at ${mouseX}px ${mouseY}px, rgba(8, 145, 178, 0.12), transparent 80%)`;

  return (
    <motion.div
      ref={cardRef}
      variants={amenityCardVariants}
      onMouseMove={handleMouseMove}
      whileHover={
        !shouldReduceMotion
          ? {
              y: -6,
              scale: 1.02,
              borderColor: "rgba(8, 145, 178, 0.45)",
              boxShadow: "0 20px 30px -10px rgba(8, 145, 178, 0.12), 0 10px 10px -5px rgba(15, 23, 42, 0.04)",
            }
          : undefined
      }
      whileTap={!shouldReduceMotion ? { scale: 0.98 } : undefined}
      transition={{
        type: "spring",
        ...EASINGS.bounceSpring,
      }}
      className="group relative p-5 sm:p-6 rounded-[20px] bg-white border border-slate-200/80 shadow-sm transition-colors duration-300 flex items-start gap-4 overflow-hidden select-none cursor-pointer"
    >
      {/* Dynamic Cursor Spotlight Layer */}
      {!shouldReduceMotion && (
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: spotlightBg }}
        />
      )}

      {/* Pale Teal Icon Container with Hover Morph */}
      <motion.div
        className="relative z-10 w-12 h-12 rounded-[14px] bg-[#0891B2]/10 text-[#0891B2] flex items-center justify-center shrink-0 transition-colors duration-300 group-hover:bg-[#0891B2] group-hover:text-white"
        whileHover={
          !shouldReduceMotion
            ? {
                rotate: -8,
                scale: 1.1,
              }
            : undefined
        }
        transition={{ type: "spring", stiffness: 400, damping: 18 }}
      >
        <motion.div
          whileHover={
            !shouldReduceMotion
              ? {
                  rotate: [0, -10, 10, -5, 5, 0],
                  transition: { duration: 0.5 },
                }
              : undefined
          }
        >
          {icon}
        </motion.div>
      </motion.div>

      {/* Card Content & Underline Animation */}
      <div className="relative z-10 flex-1 min-w-0">
        <div className="relative inline-block mb-1">
          <h4 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-[#065F78] transition-colors duration-200">
            {title}
          </h4>
          {/* Animated Teal Gradient Underline */}
          {!shouldReduceMotion && (
            <motion.span
              className="absolute left-0 -bottom-0.5 h-[2px] w-full bg-gradient-to-r from-[#0891B2] to-cyan-400 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"
            />
          )}
        </div>

        <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed font-normal mt-0.5">
          {description}
        </p>
      </div>
    </motion.div>
  );
};
