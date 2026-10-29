"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { MeshBackground } from "./MeshBackground";
import { Particles } from "./Particles";
import { HeroContent } from "./HeroContent";
import { HeroVisual } from "./HeroVisual";
import { ScrollIndicator } from "./ScrollIndicator";
import { heroContainerVariants } from "./motion";

interface HeroProps {
  onBookTour?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookTour }) => {
  const heroRef = useRef<HTMLElement>(null);
  const isInView = useInView(heroRef, { margin: "100px" });
  const shouldReduceMotion = useReducedMotion();

  // Scroll-linked exit orchestration
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Headline & content: moves up slowly (-60px) and fades slightly (1 -> 0.85)
  const contentScrollY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.85]);

  // Image stack: moves up faster (-120px) with scale 1 -> 0.94
  const stackScrollY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const stackScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);

  // Mini photos drift apart horizontally (±40px)
  const driftLeftX = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const driftRightX = useTransform(scrollYProgress, [0, 1], [0, 40]);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-[100svh] w-full flex flex-col justify-center bg-[#F5F5F0] overflow-hidden select-none pt-24 pb-14 sm:py-20"
    >
      {/* 1. Soft Animated Mesh Gradient Background & Cursor Glow */}
      <MeshBackground />

      {/* 3. Upward Floating Ambient Particles */}
      <Particles />

      {/* 4. Main Two-Column Viewport Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 my-auto">
        <motion.div
          variants={heroContainerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center"
        >
          {/* Mobile: visual first (order-1 lg:order-2), Desktop: 45% visual (5 cols) */}
          <div className="order-1 lg:order-2 lg:col-span-5 w-full">
            <HeroVisual
              scrollStackY={stackScrollY}
              scrollStackScale={stackScale}
              scrollDriftLeftX={driftLeftX}
              scrollDriftRightX={driftRightX}
            />
          </div>

          {/* Mobile: content second (order-2 lg:order-1), Desktop: 55% content (7 cols) */}
          <motion.div
            style={{
              y: shouldReduceMotion ? 0 : contentScrollY,
              opacity: shouldReduceMotion ? 1 : contentOpacity,
            }}
            className="order-2 lg:order-1 lg:col-span-7 w-full flex flex-col justify-center"
          >
            <HeroContent onBookTour={onBookTour} />
          </motion.div>
        </motion.div>
      </div>

      {/* 5. Scroll Indicator at bottom center (fades out after first scroll) */}
      <ScrollIndicator />
    </section>
  );
};
