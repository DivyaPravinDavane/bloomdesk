"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkles, Calendar, ArrowRight, Train, Wifi, ShieldCheck } from "lucide-react";
import { SplitHeadline } from "./SplitHeadline";
import { MagneticButton } from "./MagneticButton";
import {
  locationChipVariants,
  sparkleSpinVariants,
  subtitleVariants,
  ctaGroupVariants,
  ctaButtonVariants,
  trustRowVariants,
  trustItemVariants,
  EASINGS,
} from "./motion";

interface HeroContentProps {
  onBookTour?: () => void;
}

export const HeroContent: React.FC<HeroContentProps> = ({ onBookTour }) => {
  const shouldReduceMotion = useReducedMotion();
  const [hoveredTrust, setHoveredTrust] = useState<string | null>(null);

  const trustItems = [
    { id: "metro", icon: Train, label: "Metro Line 7" },
    { id: "fiber", icon: Wifi, label: "Dual Fiber" },
    { id: "power", icon: ShieldCheck, label: "100% UPS" },
  ];

  return (
    <div className="flex flex-col items-start space-y-6 sm:space-y-7 max-w-2xl">
      {/* 1. Location Chip (drops in with spring, sparkle icon spins once) */}
      <motion.div
        variants={locationChipVariants}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-xs select-none"
      >
        <motion.span variants={sparkleSpinVariants} className="inline-flex text-[#0891B2]">
          <Sparkles className="w-3.5 h-3.5 text-[#0891B2]" />
        </motion.span>
        <span className="text-xs font-bold text-slate-700 tracking-wide">
          Borivali & Kandivali, Mumbai
        </span>
      </motion.div>

      {/* 2. Headline with masked reveal & animated teal gradient */}
      <div className="relative w-full">
        {/* Subtle decorative wave line behind headline */}
        {!shouldReduceMotion && (
          <motion.svg
            viewBox="0 0 500 40"
            className="absolute -top-4 -left-6 w-72 sm:w-96 h-12 pointer-events-none opacity-20 -z-10"
            fill="none"
          >
            <motion.path
              d="M 0 20 Q 125 5 250 20 T 500 20"
              stroke="#0891B2"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.8, ease: EASINGS.smoothOut }}
            />
          </motion.svg>
        )}

        <SplitHeadline />
      </div>

      {/* 3. Single Line: max 10 words, blur-fade entrance */}
      <motion.p
        variants={subtitleVariants}
        className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed max-w-xl"
      >
        Coworking, private cabins and meeting rooms across 5 centers.
      </motion.p>

      {/* 4. Magnetic CTAs Group with spring pop entrance */}
      <motion.div
        variants={ctaGroupVariants}
        className="flex flex-wrap items-center gap-4 pt-1"
      >
        <motion.div variants={ctaButtonVariants}>
          <MagneticButton
            variant="primary"
            onClick={onBookTour}
            icon={<Calendar className="w-4 h-4" />}
          >
            Schedule Free Tour
          </MagneticButton>
        </motion.div>

        <motion.div variants={ctaButtonVariants}>
          <MagneticButton
            variant="secondary"
            href="#locations"
            icon={<ArrowRight className="w-4 h-4" />}
          >
            Explore 5 Centers
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* 5. Minimal Trust Row (icon + 2 to 3 words only) */}
      <motion.div
        variants={trustRowVariants}
        className="pt-4 border-t border-slate-200/80 flex flex-wrap items-center gap-6 sm:gap-8 select-none"
      >
        {trustItems.map((item) => {
          const Icon = item.icon;
          const isHovered = hoveredTrust === item.id;

          return (
            <motion.div
              key={item.id}
              variants={trustItemVariants}
              onMouseEnter={() => setHoveredTrust(item.id)}
              onMouseLeave={() => setHoveredTrust(null)}
              className="relative flex items-center gap-2 cursor-pointer group"
            >
              <motion.div
                animate={
                  isHovered && !shouldReduceMotion
                    ? { y: [0, -4, 0] }
                    : { y: 0 }
                }
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="w-8 h-8 rounded-full bg-[#0891B2]/10 flex items-center justify-center text-[#0891B2] group-hover:bg-[#0891B2] group-hover:text-white transition-colors duration-200"
              >
                <Icon className="w-4 h-4" />
              </motion.div>

              <span className="text-xs sm:text-[13px] font-bold text-slate-700 tracking-tight relative">
                {item.label}
                {/* Underline draw on hover */}
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: EASINGS.smoothOut }}
                  className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#0891B2] origin-left"
                />
              </span>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};
