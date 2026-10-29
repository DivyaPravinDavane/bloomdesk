"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

export const MeshBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  // Cursor glow: soft teal radial light follows cursor (400px, 10% opacity)
  const mouseX = useMotionValue(500);
  const mouseY = useMotionValue(400);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (shouldReduceMotion || isTouchDevice || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    },
    [shouldReduceMotion, isTouchDevice, mouseX, mouseY]
  );

  const cursorGlow = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(8, 145, 178, 0.10), transparent 80%)`;

  // Scroll parallax for mesh blobs
  const { scrollY } = useScroll();
  const blob1ParallaxY = useTransform(scrollY, [0, 800], [0, -60]);
  const blob2ParallaxY = useTransform(scrollY, [0, 800], [0, 50]);
  const blob3ParallaxY = useTransform(scrollY, [0, 800], [0, -35]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="absolute inset-0 overflow-hidden pointer-events-none select-none -z-10"
    >
      {/* Interactive Cursor Glow Layer (desktop only, mounted client-side only) */}
      {mounted && !shouldReduceMotion && !isTouchDevice && (
        <motion.div
          className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300"
          style={{ background: cursorGlow }}
        />
      )}

      {/* 3 Animated Mesh Blobs drifting along distinct paths */}
      {!shouldReduceMotion && (
        <div className="absolute inset-0 overflow-hidden">
          {/* Blob 1: Teal Glow (top right) */}
          <motion.div
            style={{ y: blob1ParallaxY }}
            animate={{
              x: [0, 60, -40, 0],
              y: [0, -50, 30, 0],
              scale: [1, 1.15, 0.95, 1],
            }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-10 right-10 w-[520px] h-[520px] rounded-full bg-[#0891B2]/16 blur-[130px] will-change-transform"
          />

          {/* Blob 2: Soft Warm Yellow Glow (bottom left) */}
          <motion.div
            style={{ y: blob2ParallaxY }}
            animate={{
              x: [0, -50, 45, 0],
              y: [0, 40, -45, 0],
              scale: [1, 0.9, 1.12, 1],
            }}
            transition={{
              duration: 26,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            className="absolute bottom-10 left-10 w-[480px] h-[480px] rounded-full bg-[#FACC15]/14 blur-[120px] will-change-transform"
          />

          {/* Blob 3: Pale Cyan / Deep Teal Ambient (center right) */}
          <motion.div
            style={{ y: blob3ParallaxY }}
            animate={{
              x: [0, 35, -50, 0],
              y: [0, 50, -30, 0],
              scale: [1, 1.18, 0.92, 1],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4,
            }}
            className="absolute top-1/3 left-1/3 w-[440px] h-[440px] rounded-full bg-[#065F78]/12 blur-[140px] will-change-transform"
          />
        </div>
      )}
    </div>
  );
};
