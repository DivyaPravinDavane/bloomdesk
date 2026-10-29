"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface BorderBeamProps {
  duration?: number;
  className?: string;
}

export const BorderBeam: React.FC<BorderBeamProps> = ({
  duration = 6,
  className = "",
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) return null;

  return (
    <div
      className={`absolute inset-0 rounded-[28px] p-[1.5px] pointer-events-none overflow-hidden z-20 ${className}`}
      style={{
        maskImage:
          "linear-gradient(black, black) content-box, linear-gradient(black, black)",
        WebkitMaskImage:
          "linear-gradient(black, black) content-box, linear-gradient(black, black)",
        maskComposite: "exclude",
        WebkitMaskComposite: "xor",
      }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220%] h-[220%] origin-center"
        style={{
          background:
            "conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 270deg, #0891B2 315deg, #FACC15 360deg)",
        }}
      />
    </div>
  );
};
