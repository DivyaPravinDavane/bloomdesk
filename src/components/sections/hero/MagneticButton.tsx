"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { EASINGS } from "./motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  onClick?: () => void;
  href?: string;
  className?: string;
  icon?: React.ReactNode;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  variant = "primary",
  onClick,
  href,
  className = "",
  icon,
}) => {
  const buttonRef = useRef<HTMLButtonElement & HTMLAnchorElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  // Magnetic spring offsets (within ±20px)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 250, damping: 20 });
  const springY = useSpring(y, { stiffness: 250, damping: 20 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (shouldReduceMotion || isTouchDevice || !buttonRef.current) return;
      const rect = buttonRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distPercentX = (e.clientX - centerX) / (rect.width / 2);
      const distPercentY = (e.clientY - centerY) / (rect.height / 2);

      x.set(distPercentX * 18);
      y.set(distPercentY * 18);
    },
    [shouldReduceMotion, isTouchDevice, x, y]
  );

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  }, [x, y]);

  const handleMouseEnter = useCallback(() => {
    if (!isTouchDevice) setIsHovered(true);
  }, [isTouchDevice]);

  const baseStyles =
    "relative inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full font-bold text-sm tracking-wide select-none overflow-hidden transition-shadow duration-300 outline-none focus-visible:ring-3 focus-visible:ring-[#0891B2] focus-visible:ring-offset-2 cursor-pointer";

  const Component = href ? motion.a : motion.button;

  return (
    <Component
      ref={buttonRef}
      href={href}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileTap={!shouldReduceMotion ? { scale: 0.96 } : undefined}
      style={{
        x: shouldReduceMotion || isTouchDevice ? 0 : springX,
        y: shouldReduceMotion || isTouchDevice ? 0 : springY,
      }}
      className={`${baseStyles} ${
        variant === "primary"
          ? "bg-[#0891B2] hover:bg-[#065F78] text-white shadow-xl shadow-[#0891B2]/30"
          : "bg-[#0F172A] text-white border border-slate-700/80 shadow-lg shadow-slate-950/20"
      } ${className}`}
    >
      {/* Primary variant: light shine sweep across */}
      {variant === "primary" && !shouldReduceMotion && (
        <motion.div
          initial={{ x: "-150%" }}
          animate={isHovered ? { x: "150%" } : { x: "-150%" }}
          transition={{ duration: 0.7, ease: EASINGS.smoothOut }}
          className="absolute inset-0 -skew-x-20 bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none z-10"
        />
      )}

      {/* Secondary variant: teal wipe fill from the left */}
      {variant === "secondary" && !shouldReduceMotion && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.35, ease: EASINGS.smoothOut }}
          className="absolute inset-0 bg-[#0891B2] origin-left pointer-events-none z-0"
        />
      )}

      {/* Button Content */}
      <span className="relative z-10 flex items-center gap-2.5">
        {icon && (
          <span className="shrink-0 transition-transform duration-300">
            {icon}
          </span>
        )}
        <span>{children}</span>
      </span>
    </Component>
  );
};
