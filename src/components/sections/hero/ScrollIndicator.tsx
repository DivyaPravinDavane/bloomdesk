"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

export const ScrollIndicator: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      if (latest > 40) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    });
  }, [scrollY]);

  if (shouldReduceMotion) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{
        opacity: hasScrolled ? 0 : 0.85,
        y: hasScrolled ? 10 : 0,
      }}
      transition={{ duration: 0.35 }}
      className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 hidden sm:flex flex-col items-center gap-1.5 pointer-events-none select-none"
    >
      <div className="w-5 h-8 rounded-full border-2 border-slate-400/60 p-1 flex justify-center">
        <motion.div
          animate={{
            y: [0, 8, 0],
            opacity: [1, 0.2, 1],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-1.5 h-1.5 rounded-full bg-[#0891B2]"
        />
      </div>
      <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500">
        Scroll
      </span>
    </motion.div>
  );
};
