"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MapPin } from "lucide-react";
import { bottomGlassCardVariants } from "./motion";

export const GlassLocationCard: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={bottomGlassCardVariants}
      className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 p-4 sm:p-5 rounded-2xl bg-slate-950/80 backdrop-blur-md border border-white/15 text-white shadow-2xl z-25 overflow-hidden select-none"
    >
      {/* Shimmer sweep passing across every 6s */}
      {!shouldReduceMotion && (
        <motion.div
          animate={{
            x: ["-150%", "250%"],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            repeatDelay: 3.8,
            ease: "easeInOut",
          }}
          className="absolute inset-0 -skew-x-20 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none"
        />
      )}

      <div className="relative z-10 flex flex-col gap-1.5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#0891B2] flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            <span>Western Suburbs Mumbai</span>
          </span>

          {/* Pulsing Green '5 Centers Active' Badge */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold">
            <span className="relative flex h-2 w-2">
              <motion.span
                animate={
                  !shouldReduceMotion
                    ? {
                        scale: [1, 1.8, 1],
                        opacity: [1, 0, 1],
                      }
                    : undefined
                }
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inline-flex h-full w-full rounded-full bg-emerald-400"
              />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span>5 Centers Active</span>
          </div>
        </div>

        <h4 className="text-sm sm:text-base font-extrabold text-white tracking-tight">
          Borivali East & West | Kandivali West
        </h4>
      </div>
    </motion.div>
  );
};
