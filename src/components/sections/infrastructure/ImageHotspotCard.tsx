"use client";

import React, { useRef, useCallback } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { Hotspot } from "./Hotspot";
import { imageCardVariants, innerImageVariants, facilityPanelVariants, EASINGS } from "./motion";

export const ImageHotspotCard: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Mouse tilt & parallax motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for translation and rotation
  const springX = useSpring(mouseX, { stiffness: 120, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 15 });

  const translateX = useTransform(springX, [-0.5, 0.5], [-12, 12]);
  const translateY = useTransform(springY, [-0.5, 0.5], [-12, 12]);
  const rotateX = useTransform(springY, [-0.5, 0.5], [1.5, -1.5]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-1.5, 1.5]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  }, [shouldReduceMotion, mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  // Words for word-by-word reveal
  const facilityDescription =
    "Hospital-grade sanitation protocols, hourly sanitization checks, and touchless dispensers in all shared corridors.";
  const words = facilityDescription.split(" ");

  return (
    <motion.div
      variants={imageCardVariants}
      className="relative w-full h-[480px] sm:h-[540px] lg:h-[620px] rounded-[28px] p-1 bg-white shadow-2xl border-4 border-white overflow-hidden select-none"
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
      }}
    >
      {/* Parallax Image Container */}
      <motion.div
        style={{
          x: shouldReduceMotion ? 0 : translateX,
          y: shouldReduceMotion ? 0 : translateY,
          rotateX: shouldReduceMotion ? 0 : rotateX,
          rotateY: shouldReduceMotion ? 0 : rotateY,
        }}
        className="relative w-full h-full rounded-[24px] overflow-hidden bg-slate-900"
      >
        {/* Modern Co-working Photo with Entrance Scale */}
        <motion.div variants={innerImageVariants} className="absolute inset-0 w-full h-full">
          <Image
            src="/assets/amenities/pointer-img.jpg"
            alt="BloomDesk Modern Co-working Infrastructure"
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 550px"
            priority
          />
        </motion.div>

        {/* Cinematic Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />

        {/* 3 Interactive Hotspots */}
        <Hotspot label="Sanitization Station" xPercent={34} yPercent={30} delayIndex={0} />
        <Hotspot label="Central AC & Filtration" xPercent={68} yPercent={49} delayIndex={1} />
        <Hotspot label="Executive Washrooms" xPercent={50} yPercent={66} delayIndex={2} />

        {/* Facility Standard Glass Panel at Bottom */}
        <motion.div
          variants={facilityPanelVariants}
          className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 p-4 sm:p-5 rounded-2xl bg-slate-950/85 backdrop-blur-md border border-white/15 shadow-2xl text-white overflow-hidden z-30"
        >
          {/* Shimmering Light Sweep Passing Every 5s */}
          {!shouldReduceMotion && (
            <motion.div
              animate={{
                x: ["-150%", "250%"],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                repeatDelay: 2.8,
                ease: "easeInOut",
              }}
              className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none"
            />
          )}

          <div className="relative z-10">
            <span className="text-[11px] font-bold text-[#0891B2] uppercase tracking-widest block mb-1">
              Facility Standard
            </span>

            {/* Word-by-word staggered reveal */}
            <p className="text-xs sm:text-[13px] text-slate-200 leading-relaxed font-medium">
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 4 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.3,
                    delay: 0.65 + i * 0.02,
                    ease: EASINGS.smoothOut,
                  }}
                  className="inline-block mr-1"
                >
                  {word}
                </motion.span>
              ))}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
