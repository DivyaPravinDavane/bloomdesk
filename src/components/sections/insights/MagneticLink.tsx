"use client";

import React, { useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface MagneticLinkProps {
  href?: string;
  children: React.ReactNode;
  className?: string;
}

export const MagneticLink: React.FC<MagneticLinkProps> = ({
  href = "#",
  children,
  className = "",
}) => {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 260, damping: 18 });
  const springY = useSpring(y, { stiffness: 260, damping: 18 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (shouldReduceMotion || !linkRef.current) return;
      const rect = linkRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Follow within 16px
      const pullX = (e.clientX - centerX) * 0.35;
      const pullY = (e.clientY - centerY) * 0.35;

      x.set(Math.max(-16, Math.min(16, pullX)));
      y.set(Math.max(-16, Math.min(16, pullY)));
    },
    [shouldReduceMotion, x, y]
  );

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.a
      ref={linkRef}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        x: shouldReduceMotion ? 0 : springX,
        y: shouldReduceMotion ? 0 : springY,
      }}
      whileTap={!shouldReduceMotion ? { scale: 0.95 } : undefined}
      className={`group inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0891B2] hover:text-[#065F78] transition-colors py-1.5 px-3 rounded-full hover:bg-[#0891B2]/10 select-none ${className}`}
    >
      <span>{children}</span>
      <motion.span
        animate={!shouldReduceMotion ? { x: isHovered ? 4 : 0 } : undefined}
        transition={{ duration: 0.2 }}
        className="inline-block"
      >
        <ArrowRight className="w-4 h-4" />
      </motion.span>
    </motion.a>
  );
};
