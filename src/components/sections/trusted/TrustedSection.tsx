"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { TRUSTED_LOGOS } from "./types";
import { LogoMarquee } from "./LogoMarquee";
import { SplitHeadline } from "./SplitHeadline";
import { CountUp } from "./CountUp";
import {
  sectionContainerVariants,
  chipEntranceVariants,
  dotPulseVariants,
  marqueeRowEntranceVariants,
} from "./motion";

export const TrustedSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isSectionHovered, setIsSectionHovered] = useState(false);

  return (
    <section
      ref={sectionRef}
      onMouseEnter={() => setIsSectionHovered(true)}
      onMouseLeave={() => setIsSectionHovered(false)}
      /* Plain warm off-white (#F5F5F0), no color tinting orbs behind marquee */
      className="relative py-20 sm:py-28 bg-[#F5F5F0] overflow-hidden border-y border-slate-200/60"
    >
      {/* Very faint dot grid at 4% opacity for subtle texture without tinting cards */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(#0F172A 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Section Entrance Container */}
      <motion.div
        variants={sectionContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative z-10 w-full"
      >
        {/* Centered Minimal Header (Kept intact as specified) */}
        <div className="max-w-3xl mx-auto px-4 text-center mb-10 sm:mb-14">
          {/* Glass Pill Chip with Pulsing Teal Dot */}
          <motion.div
            variants={chipEntranceVariants}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-slate-200/90 shadow-xs mb-4 select-none"
          >
            <span className="relative flex h-2 w-2">
              <motion.span
                variants={dotPulseVariants}
                animate="animate"
                className="absolute inline-flex h-full w-full rounded-full bg-[#0891B2]"
              />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0891B2]" />
            </span>
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.16em] text-slate-700">
              ENTERPRISE & AGENCY NETWORK
            </span>
          </motion.div>

          {/* Headline: Word-by-word Mask Reveal */}
          <SplitHeadline
            text="Trusted by Ambitious Teams"
            className="tracking-tight"
          />
        </div>

        {/* Single Marquee Line: Narrow edge mask (transparent -> black at 6%, and black 94% -> transparent) */}
        <div
          className="relative w-full"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
          }}
        >
          {/* Single Row: Left-to-right steady readable speed (35s), fades up without blur */}
          <motion.div
            variants={marqueeRowEntranceVariants}
            className="w-full"
          >
            <LogoMarquee
              logos={TRUSTED_LOGOS}
              speed={35}
              isSectionHovered={isSectionHovered}
            />
          </motion.div>
        </div>

        {/* Tiny Stat Count-Up Below Marquee */}
        <div className="mt-10 sm:mt-12 text-center">
          <CountUp
            from={0}
            to={100}
            duration={1.6}
            suffix="+"
            label="teams thriving across Mumbai"
          />
        </div>
      </motion.div>
    </section>
  );
};
