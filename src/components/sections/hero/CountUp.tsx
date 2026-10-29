"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, animate, useReducedMotion } from "framer-motion";
import { EASINGS } from "./motion";

interface CountUpProps {
  to?: number;
  duration?: number;
  delay?: number;
}

export const CountUp: React.FC<CountUpProps> = ({
  to = 100,
  duration = 1.6,
  delay = 0.7,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const count = useMotionValue(0);
  const [displayVal, setDisplayVal] = useState(shouldReduceMotion ? to : 0);

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayVal(to);
      return;
    }

    const timer = setTimeout(() => {
      const controls = animate(count, to, {
        duration,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (latest) => {
          setDisplayVal(Math.floor(latest));
        },
      });
      return () => controls.stop();
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [count, to, duration, delay, shouldReduceMotion]);

  return (
    <span className="font-extrabold text-[#0F172A] inline-flex items-center">
      <span>{displayVal}</span>
      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          ...EASINGS.popSpring,
          delay: delay + duration * 0.75,
        }}
        className="text-[#0891B2] ml-0.5"
      >
        +
      </motion.span>
    </span>
  );
};
