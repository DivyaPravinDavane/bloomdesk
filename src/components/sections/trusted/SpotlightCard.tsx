"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
} from "framer-motion";
import { EASINGS } from "./motion";

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  isActive?: boolean;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = "",
  isActive = false,
  onHoverStart,
  onHoverEnd,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Detect touch device
  useEffect(() => {
    setIsTouchDevice(
      "ontouchstart" in window || navigator.maxTouchPoints > 0
    );
  }, []);

  // Mouse coordinate values for spotlight and tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Normalized coordinates (-0.5 to 0.5)
  const normX = useMotionValue(0);
  const normY = useMotionValue(0);

  // 3D Tilt springs (perspective 800px)
  const tiltSpringX = useSpring(normX, { stiffness: 240, damping: 20 });
  const tiltSpringY = useSpring(normY, { stiffness: 240, damping: 20 });

  const rotateX = useTransform(tiltSpringY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(tiltSpringX, [-0.5, 0.5], [-8, 8]);

  // Magic Card Spotlight: 180px, max 12% opacity so logo stays crystal clear
  const spotlightBg = useMotionTemplate`radial-gradient(180px circle at ${mouseX}px ${mouseY}px, rgba(8, 145, 178, 0.12), transparent 75%)`;
  const spotlightBorder = useMotionTemplate`radial-gradient(160px circle at ${mouseX}px ${mouseY}px, rgba(8, 145, 178, 0.45), transparent 70%)`;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (shouldReduceMotion || isTouchDevice || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      mouseX.set(x);
      mouseY.set(y);
      normX.set(x / rect.width - 0.5);
      normY.set(y / rect.height - 0.5);
    },
    [shouldReduceMotion, isTouchDevice, mouseX, mouseY, normX, normY]
  );

  const handleMouseEnter = useCallback(() => {
    if (isTouchDevice) return;
    setIsHovered(true);
    onHoverStart?.();
  }, [isTouchDevice, onHoverStart]);

  const handleMouseLeave = useCallback(() => {
    if (isTouchDevice) return;
    setIsHovered(false);
    normX.set(0);
    normY.set(0);
    onHoverEnd?.();
  }, [isTouchDevice, normX, normY, onHoverEnd]);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        y: isHovered && !isTouchDevice && !shouldReduceMotion ? -6 : 0,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      style={{
        perspective: 800,
        transformStyle: "preserve-3d",
      }}
      className={`relative select-none ${className}`}
    >
      <motion.div
        style={{
          rotateX: shouldReduceMotion || isTouchDevice ? 0 : rotateX,
          rotateY: shouldReduceMotion || isTouchDevice ? 0 : rotateY,
          transformStyle: "preserve-3d",
        }}
        transition={{ type: "spring", ...EASINGS.tiltSpring }}
        /* Solid white background, 1px slate-200 border, radius 20px, 240x104px, subtle shadow */
        className={`relative w-[240px] h-[104px] rounded-[20px] bg-white transition-all duration-300 overflow-hidden ${
          isActive
            ? "border-[#0891B2] shadow-[0_8px_24px_rgba(8,145,178,0.15)]"
            : isHovered
            ? "border-[#0891B2] shadow-[0_8px_24px_rgba(15,23,42,0.1)]"
            : "border-slate-200 shadow-[0_4px_16px_rgba(15,23,42,0.06)]"
        } border`}
      >
        {/* Soft Teal Spotlight Glow on Surface (max 12% opacity) */}
        {!shouldReduceMotion && !isTouchDevice && isHovered && (
          <motion.div
            className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-200"
            style={{ background: spotlightBg }}
          />
        )}

        {/* Soft Teal Spotlight Glow on Border */}
        {!shouldReduceMotion && !isTouchDevice && isHovered && (
          <motion.div
            className="absolute inset-0 rounded-[20px] pointer-events-none z-15 border border-transparent"
            style={{
              background: spotlightBorder,
              WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
              padding: "1px",
            }}
          />
        )}

        {/* Diagonal Shine Sweep on Hover (0.7s) */}
        {!shouldReduceMotion && !isTouchDevice && (
          <motion.div
            initial={{ x: "-150%" }}
            animate={isHovered ? { x: "150%" } : { x: "-150%" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 -skew-x-20 bg-gradient-to-r from-transparent via-slate-100/60 to-transparent pointer-events-none z-20"
          />
        )}

        {/* Inner Card Content: Centered with padding */}
        <div className="relative w-full h-full z-10 flex flex-col items-center justify-center px-6 py-4">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
};
