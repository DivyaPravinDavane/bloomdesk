"use client";

import React, { useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { EASINGS } from "./motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "solid" | "outline";
  href?: string;
  hasArrow?: boolean;
  className?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  onClick,
  variant = "solid",
  href,
  hasArrow = false,
  className = "",
}) => {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Magnetic Pull Coordinates
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 240, damping: 15 });
  const springY = useSpring(y, { stiffness: 240, damping: 15 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (shouldReduceMotion || !buttonRef.current) return;
      const rect = buttonRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Restrict pull within 20px
      const pullX = (e.clientX - centerX) * 0.28;
      const pullY = (e.clientY - centerY) * 0.28;

      x.set(Math.max(-20, Math.min(20, pullX)));
      y.set(Math.max(-20, Math.min(20, pullY)));
    },
    [shouldReduceMotion, x, y]
  );

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  }, [x, y]);

  const isSolid = variant === "solid";

  const content = (
    <motion.span
      style={{
        x: shouldReduceMotion ? 0 : springX,
        y: shouldReduceMotion ? 0 : springY,
      }}
      whileTap={!shouldReduceMotion ? { scale: 0.96 } : undefined}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`group relative inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-full text-xs sm:text-sm font-bold tracking-wide select-none overflow-hidden transition-all duration-300 shadow-md ${
        isSolid
          ? "bg-[#0891B2] text-white hover:bg-[#065F78] hover:shadow-xl hover:shadow-[#0891B2]/30"
          : "border-2 border-slate-300/90 text-slate-700 bg-white hover:border-[#0891B2] hover:text-white"
      } ${className}`}
    >
      {/* Outline Button: Teal wipe-in fill from left */}
      {!isSolid && !shouldReduceMotion && (
        <motion.span
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.35, ease: EASINGS.smoothOut }}
          className="absolute inset-0 bg-[#0891B2] origin-left z-0"
        />
      )}

      {/* Solid Button: Light sweep animation on hover */}
      {isSolid && !shouldReduceMotion && (
        <motion.span
          initial={{ x: "-120%" }}
          animate={{ x: isHovered ? "180%" : "-120%" }}
          transition={{ duration: 0.75, ease: "easeInOut" }}
          className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/35 to-transparent z-0 pointer-events-none"
        />
      )}

      {/* Button Text & Sliding Arrow */}
      <span className="relative z-10 flex items-center gap-2">
        <span>{children}</span>
        {hasArrow && (
          <motion.span
            animate={!shouldReduceMotion ? { x: isHovered ? 4 : 0 } : undefined}
            transition={{ duration: 0.25 }}
            className="inline-block"
          >
            <ArrowRight className="w-4 h-4" />
          </motion.span>
        )}
      </span>
    </motion.span>
  );

  if (href) {
    return (
      <a
        ref={buttonRef as React.Ref<HTMLAnchorElement>}
        href={href}
        className="inline-block cursor-pointer focus:outline-none"
        onClick={onClick}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={buttonRef as React.Ref<HTMLButtonElement>}
      type="button"
      onClick={onClick}
      className="inline-block cursor-pointer focus:outline-none"
    >
      {content}
    </button>
  );
};
