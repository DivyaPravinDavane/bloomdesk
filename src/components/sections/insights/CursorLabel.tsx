"use client";

import React from "react";
import { motion, useSpring, useMotionValue, MotionValue, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { EASINGS } from "./motion";

interface CursorLabelProps {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  isVisible: boolean;
}

export const CursorLabel: React.FC<CursorLabelProps> = ({
  mouseX,
  mouseY,
  isVisible,
}) => {
  const shouldReduceMotion = useReducedMotion();

  const springX = useSpring(mouseX, { stiffness: 400, damping: 28 });
  const springY = useSpring(mouseY, { stiffness: 400, damping: 28 });

  if (shouldReduceMotion) return null;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={
        isVisible
          ? { scale: 1, opacity: 1 }
          : { scale: 0, opacity: 0 }
      }
      transition={{ type: "spring", ...EASINGS.cursorSpring }}
      style={{
        left: springX,
        top: springY,
        transform: "translate(-50%, -50%)",
      }}
      className="pointer-events-none absolute z-30 flex items-center justify-center gap-1 w-14 h-14 rounded-full bg-[#0891B2] text-white shadow-xl shadow-[#0891B2]/40 border border-white/30 backdrop-blur-sm select-none"
    >
      <span className="text-xs font-black tracking-wider">READ</span>
      <ArrowUpRight className="w-3.5 h-3.5" />
    </motion.div>
  );
};
