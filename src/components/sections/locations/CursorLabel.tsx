"use client";

import React from "react";
import { motion, AnimatePresence, MotionValue, useSpring } from "framer-motion";
import { Eye } from "lucide-react";

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
  // Smooth cursor follow spring
  const springX = useSpring(mouseX, { stiffness: 400, damping: 28 });
  const springY = useSpring(mouseY, { stiffness: 400, damping: 28 });

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.4 }}
          transition={{ duration: 0.18 }}
          style={{
            left: springX,
            top: springY,
            transform: "translate(-50%, -50%)",
          }}
          className="pointer-events-none absolute z-35 hidden md:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0891B2] text-white text-xs font-bold shadow-xl shadow-[#0891B2]/40 border border-white/30 backdrop-blur-md"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>View</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
