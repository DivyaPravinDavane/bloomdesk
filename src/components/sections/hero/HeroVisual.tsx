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
import { Users, Wifi } from "lucide-react";
import { FloatingChip } from "./FloatingChip";
import { GlassLocationCard } from "./GlassLocationCard";
import { CountUp } from "./CountUp";
import {
  heroMainClipVariants,
  heroInnerScaleVariants,
  miniPhotoTopLeftVariants,
  miniPhotoBottomRightVariants,
} from "./motion";

interface HeroVisualProps {
  scrollStackY?: MotionValue<number>;
  scrollStackScale?: MotionValue<number>;
  scrollDriftLeftX?: MotionValue<number>;
  scrollDriftRightX?: MotionValue<number>;
}

export const HeroVisual: React.FC<HeroVisualProps> = ({
  scrollStackY,
  scrollStackScale,
  scrollDriftLeftX,
  scrollDriftRightX,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  // Mouse Parallax Values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  // Different layer depths:
  // Main photo: ±8px, tilt ±5deg
  const mainX = useTransform(springX, [-0.5, 0.5], [-8, 8]);
  const mainY = useTransform(springY, [-0.5, 0.5], [-8, 8]);
  const tiltRotateX = useTransform(springY, [-0.5, 0.5], [5, -5]);
  const tiltRotateY = useTransform(springX, [-0.5, 0.5], [-5, 5]);

  // Mini photos: ±22px
  const miniX = useTransform(springX, [-0.5, 0.5], [-22, 22]);
  const miniY = useTransform(springY, [-0.5, 0.5], [-22, 22]);

  // Chips: ±30px
  const chipX = useTransform(springX, [-0.5, 0.5], [-30, 30]);
  const chipY = useTransform(springY, [-0.5, 0.5], [-30, 30]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (shouldReduceMotion || isTouchDevice || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    },
    [shouldReduceMotion, isTouchDevice, mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[480px] sm:max-w-[520px] aspect-[4/5] mx-auto py-4 select-none"
      style={{ perspective: 1200 }}
    >
      {/* 1. Thin Rotating Dashed Teal Ring behind stack (40s linear) */}
      {!shouldReduceMotion && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-6 sm:-inset-10 rounded-full border-2 border-dashed border-[#0891B2]/25 pointer-events-none -z-10"
        />
      )}

      {/* Main Stack Container with scroll-linked exit */}
      <motion.div
        style={{
          y: shouldReduceMotion ? 0 : scrollStackY,
          scale: shouldReduceMotion ? 1 : scrollStackScale,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full h-full flex items-center justify-center"
      >
        {/* 2. Main Hero Photo Card (Reception glass door) */}
        <motion.div
          variants={heroMainClipVariants}
          style={{
            x: shouldReduceMotion || isTouchDevice ? 0 : mainX,
            y: shouldReduceMotion || isTouchDevice ? 0 : mainY,
            rotateX: shouldReduceMotion || isTouchDevice ? 0 : tiltRotateX,
            rotateY: shouldReduceMotion || isTouchDevice ? 0 : tiltRotateY,
            transformStyle: "preserve-3d",
          }}
          className="relative w-[86%] sm:w-[88%] h-[420px] sm:h-[470px] rounded-[28px] overflow-hidden border-4 border-white shadow-2xl bg-slate-900 z-10"
        >
          {/* Slow Ken Burns Zoom (1 -> 1.06, 14s alternate) */}
          <motion.div
            variants={heroInnerScaleVariants}
            animate={
              !shouldReduceMotion
                ? {
                    scale: [1, 1.06, 1],
                  }
                : undefined
            }
            transition={{
              duration: 14,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative w-full h-full"
          >
            <Image
              src="/images/hero-main.jpg"
              alt="BloomDesk Reception Glass Door Coworking"
              fill
              priority
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4IDUiPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjUiIGZpbGw9IiMwZjE3MmEiLz48L3N2Zz4="
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 550px"
            />
            {/* Deep subtle gradient for glass card readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
          </motion.div>

          {/* Bottom Glass Card inside/over main photo */}
          <GlassLocationCard />
        </motion.div>

        {/* 3. Floating Mini Photo Top-Left (Workstations) */}
        <motion.div
          variants={miniPhotoTopLeftVariants}
          style={{
            x: shouldReduceMotion
              ? 0
              : isTouchDevice
              ? scrollDriftLeftX
              : useTransform(
                  [miniX, scrollDriftLeftX || new MotionValue(0)],
                  ([mx, sx]) => (mx as number) + (sx as number)
                ),
            y: shouldReduceMotion || isTouchDevice ? 0 : miniY,
          }}
          className="absolute -top-3 left-0 sm:-top-5 sm:-left-5 w-36 sm:w-44 h-26 sm:h-32 rounded-[20px] overflow-hidden border-3 border-white shadow-xl bg-slate-900 z-20"
        >
          {/* Idle float: y: [0, -12, 0], rotate ±1.5deg (5s) */}
          <motion.div
            animate={
              !shouldReduceMotion
                ? {
                    y: [0, -12, 0],
                    rotate: [-1.5, 1.5, -1.5],
                  }
                : undefined
            }
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative w-full h-full"
          >
            <Image
              src="/images/hero-desk.jpg"
              alt="BloomDesk Dedicated Workstations"
              fill
              priority
              className="object-cover"
              sizes="180px"
            />
            <div className="absolute inset-0 bg-slate-950/20" />
          </motion.div>
        </motion.div>

        {/* 4. Floating Mini Photo Bottom-Right (Meeting Room) */}
        <motion.div
          variants={miniPhotoBottomRightVariants}
          style={{
            x: shouldReduceMotion
              ? 0
              : isTouchDevice
              ? scrollDriftRightX
              : useTransform(
                  [miniX, scrollDriftRightX || new MotionValue(0)],
                  ([mx, sx]) => (mx as number) + (sx as number)
                ),
            y: shouldReduceMotion || isTouchDevice ? 0 : miniY,
          }}
          className="absolute bottom-2 -right-2 sm:bottom-4 sm:-right-4 w-36 sm:w-44 h-26 sm:h-32 rounded-[20px] overflow-hidden border-3 border-white shadow-xl bg-slate-900 z-20"
        >
          {/* Idle float: y: [0, 14, 0], rotate ±1.5deg (6.5s) */}
          <motion.div
            animate={
              !shouldReduceMotion
                ? {
                    y: [0, 14, 0],
                    rotate: [1.5, -1.5, 1.5],
                  }
                : undefined
            }
            transition={{
              duration: 6.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative w-full h-full"
          >
            <Image
              src="/images/hero-meeting.jpg"
              alt="BloomDesk Conference Room"
              fill
              priority
              className="object-cover"
              sizes="180px"
            />
            <div className="absolute inset-0 bg-slate-950/20" />
          </motion.div>
        </motion.div>

        {/* 5. Glass Chip Top-Right: Users Icon + 100+ Companies (count up) */}
        <motion.div
          style={{
            x: shouldReduceMotion || isTouchDevice ? 0 : chipX,
            y: shouldReduceMotion || isTouchDevice ? 0 : chipY,
          }}
          className="absolute top-6 -right-2 sm:-right-6 z-30"
        >
          <FloatingChip delay={0.65} bobDuration={4} bobDelay={0}>
            <div className="w-6 h-6 rounded-full bg-[#0891B2]/12 flex items-center justify-center text-[#0891B2]">
              <Users className="w-3.5 h-3.5" />
            </div>
            <div className="flex items-center gap-1">
              <CountUp to={100} duration={1.6} delay={0.7} />
              <span className="text-slate-600 font-bold">Companies</span>
            </div>
          </FloatingChip>
        </motion.div>

        {/* 6. Glass Chip Left-Middle: Wifi Icon with Animated Signal Arcs + Fiber Ready */}
        <motion.div
          style={{
            x: shouldReduceMotion || isTouchDevice ? 0 : chipX,
            y: shouldReduceMotion || isTouchDevice ? 0 : chipY,
          }}
          className="absolute top-[48%] -left-3 sm:-left-8 z-30"
        >
          <FloatingChip delay={0.75} bobDuration={4.5} bobDelay={1}>
            <div className="relative w-6 h-6 rounded-full bg-[#0891B2]/12 flex items-center justify-center text-[#0891B2]">
              <motion.div
                animate={
                  !shouldReduceMotion
                    ? {
                        opacity: [0.4, 1, 0.4],
                        scale: [0.95, 1.05, 0.95],
                      }
                    : undefined
                }
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Wifi className="w-3.5 h-3.5" />
              </motion.div>
            </div>
            <span className="text-slate-800 font-extrabold tracking-tight">
              Fiber Ready
            </span>
          </FloatingChip>
        </motion.div>
      </motion.div>
    </div>
  );
};
