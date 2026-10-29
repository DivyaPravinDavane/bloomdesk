"use client";

import React, { useRef, useCallback, useState, useEffect } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  MotionValue,
} from "framer-motion";
import { Award } from "lucide-react";
import { RotatingBadge } from "./RotatingBadge";
import { ParallaxImage } from "./ParallaxImage";
import {
  aboutContainerVariants,
  heroImageRevealVariants,
  heroInnerScaleVariants,
  topRightImageVariants,
  bottomRightImageVariants,
  circularImageVariants,
  glassBadgeVariants,
} from "./motion";

interface ImageCollageProps {
  scrollYProgress?: MotionValue<number>;
}

export const ImageCollage: React.FC<ImageCollageProps> = ({ scrollYProgress }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Mouse Parallax Values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  // Different depth translations for each layer
  const heroX = useTransform(springX, [-0.5, 0.5], [-8, 8]);
  const heroY = useTransform(springY, [-0.5, 0.5], [-8, 8]);
  const heroRotateX = useTransform(springY, [-0.5, 0.5], [1.5, -1.5]);
  const heroRotateY = useTransform(springX, [-0.5, 0.5], [-1.5, 1.5]);

  const floatX = useTransform(springX, [-0.5, 0.5], [-20, 20]);
  const floatY = useTransform(springY, [-0.5, 0.5], [-20, 20]);

  const circleX = useTransform(springX, [-0.5, 0.5], [-30, 30]);
  const circleY = useTransform(springY, [-0.5, 0.5], [-30, 30]);

  // Scroll Parallax (hero ±20px, floating images ±60px)
  const fallbackScroll = useMotionValue(0.5);
  const activeScroll = scrollYProgress || fallbackScroll;
  const scrollHeroY = useTransform(activeScroll, [0, 1], [-20, 20]);
  const scrollFloatY = useTransform(activeScroll, [0, 1], [-50, 50]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (shouldReduceMotion || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    },
    [shouldReduceMotion, mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={containerRef}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={aboutContainerVariants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[540px] mx-auto py-8 sm:py-10 select-none"
      style={{ perspective: 1000 }}
    >
      {/* 1. Hero Portrait Image (Reception glass door with BloomDesk logo) */}
      <motion.div
        variants={heroImageRevealVariants}
        className="relative z-10 w-[84%] sm:w-[86%] h-[440px] sm:h-[500px] rounded-[28px] overflow-hidden border-4 border-white shadow-2xl bg-slate-900"
      >
        <motion.div
          style={
            mounted && !shouldReduceMotion
              ? {
                  x: heroX,
                  y: scrollHeroY,
                  rotateX: heroRotateX,
                  rotateY: heroRotateY,
                }
              : undefined
          }
          className="relative w-full h-full"
        >
          <motion.div variants={heroInnerScaleVariants} className="relative w-full h-full">
            <Image
              src="/assets/about/about-primary.jpg"
              alt="BloomDesk Reception Glass Door"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 500px"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
          </motion.div>

          {/* Bottom Glass Badge: Award icon + SINCE 2015 */}
          <motion.div
            variants={glassBadgeVariants}
            className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-slate-950/80 backdrop-blur-md border border-white/15 text-white overflow-hidden shadow-2xl z-20"
          >
            {/* Shimmer sweep passing every 6s */}
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
                className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none"
              />
            )}

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-1">
                {/* Award icon small bounce loop */}
                <motion.span
                  animate={!shouldReduceMotion ? { y: [0, -4, 0] } : undefined}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="inline-flex text-[#0891B2]"
                >
                  <Award className="w-4 h-4 text-[#0891B2]" />
                </motion.span>
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#0891B2]">
                  Since 2015
                </span>
              </div>
              <p className="text-xs sm:text-[13px] font-bold text-white tracking-tight">
                Over a Decade of Inspiring Workspaces in Mumbai
              </p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* 2. Floating Top-Right Image (Workstation row) */}
      <motion.div
        variants={topRightImageVariants}
        className="absolute -top-3 right-0 sm:-right-4 z-20 w-44 sm:w-52 h-44 sm:h-52 rounded-2xl overflow-hidden border-4 border-white shadow-2xl bg-slate-900"
      >
        <motion.div
          style={
            mounted && !shouldReduceMotion
              ? { x: floatX, y: scrollFloatY }
              : undefined
          }
          className="w-full h-full"
        >
          <motion.div
            animate={!shouldReduceMotion ? { y: [0, -10, 0] } : undefined}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-full h-full"
          >
            <ParallaxImage
              src="/assets/about/about-secondary.jpg"
              alt="BloomDesk Workstation Row"
              className="w-full h-full"
              aspectClass="w-full h-full"
              sizes="200px"
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* 3. Floating Bottom-Right Image (Meeting room suite) */}
      <motion.div
        variants={bottomRightImageVariants}
        className="absolute bottom-10 -right-2 sm:-right-6 z-20 w-36 sm:w-44 h-36 sm:h-44 rounded-2xl overflow-hidden border-4 border-white shadow-2xl bg-slate-900"
      >
        <motion.div
          style={
            mounted && !shouldReduceMotion
              ? { x: floatX, y: scrollFloatY }
              : undefined
          }
          className="w-full h-full"
        >
          <motion.div
            animate={!shouldReduceMotion ? { y: [0, 12, 0] } : undefined}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-full h-full"
          >
            <ParallaxImage
              src="/assets/gallery/gallery-3.jpg"
              alt="BloomDesk Conference Suite"
              className="w-full h-full"
              aspectClass="w-full h-full"
              sizes="180px"
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* 4. Circular Rotating Badge (Community lounge with rotating SVG text) */}
      <motion.div
        variants={circularImageVariants}
        className="absolute top-[42%] -left-4 sm:-left-8 z-30"
      >
        <motion.div
          style={
            mounted && !shouldReduceMotion
              ? { x: circleX, y: scrollFloatY }
              : undefined
          }
        >
          <RotatingBadge />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
