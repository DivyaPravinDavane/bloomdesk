"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, animate, useReducedMotion } from "framer-motion";
import { EASINGS } from "./motion";

interface CountUpProps {
  from?: number;
  to?: number;
  duration?: number;
  suffix?: string;
  label?: string;
  className?: string;
}

export const CountUp: React.FC<CountUpProps> = ({
  from = 0,
  to = 100,
  duration = 1.6,
  suffix = "+",
  label = "teams thriving across Mumbai",
  className = "",
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const shouldReduceMotion = useReducedMotion();
  const count = useMotionValue(from);
  const [displayValue, setDisplayValue] = useState(shouldReduceMotion ? to : from);

  useEffect(() => {
    if (!isInView || shouldReduceMotion) {
      setDisplayValue(to);
      return;
    }

    const controls = animate(count, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        setDisplayValue(Math.floor(latest));
      },
    });

    return () => controls.stop();
  }, [isInView, count, to, duration, shouldReduceMotion]);

  return (
    <div
      ref={ref}
      className={`inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full bg-white/70 backdrop-blur-md border border-slate-200/80 shadow-xs text-xs sm:text-sm font-medium text-slate-600 ${className}`}
    >
      <span className="font-extrabold text-[#0F172A] text-sm sm:text-base tracking-tight flex items-center">
        <span>{displayValue}</span>
        <motion.span
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{
            type: "spring",
            ...EASINGS.popSpring,
            delay: duration * 0.8,
          }}
          className="text-[#0891B2] ml-0.5"
        >
          {suffix}
        </motion.span>
      </span>
      <span className="w-1 h-1 rounded-full bg-slate-300" />
      <span>{label}</span>
    </div>
  );
};
