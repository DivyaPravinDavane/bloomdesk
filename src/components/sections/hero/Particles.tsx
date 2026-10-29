"use client";

import React, { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

export const Particles: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  // Generate 10 fixed particle specs with varied initial positions and animation offsets
  const particles = useMemo(
    () => [
      { id: 1, left: "12%", size: 4, duration: 9, delay: 0 },
      { id: 2, left: "28%", size: 3, duration: 12, delay: 2 },
      { id: 3, left: "42%", size: 5, duration: 8, delay: 4 },
      { id: 4, left: "55%", size: 3, duration: 11, delay: 1 },
      { id: 5, left: "68%", size: 4, duration: 10, delay: 3 },
      { id: 6, left: "82%", size: 5, duration: 13, delay: 5 },
      { id: 7, left: "20%", size: 3, duration: 10, delay: 2.5 },
      { id: 8, left: "75%", size: 4, duration: 11, delay: 4.5 },
      { id: 9, left: "35%", size: 3, duration: 9.5, delay: 1.5 },
      { id: 10, left: "90%", size: 4, duration: 12.5, delay: 3.5 },
    ],
    []
  );

  if (shouldReduceMotion) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden -z-5">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: "110vh", opacity: 0 }}
          animate={{
            y: ["110vh", "-10vh"],
            opacity: [0, 0.6, 0.7, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
          }}
          className="absolute rounded-full bg-[#0891B2]/40 shadow-xs shadow-[#0891B2]/30 pointer-events-none"
        />
      ))}
    </div>
  );
};
