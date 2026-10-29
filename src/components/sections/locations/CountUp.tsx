"use client";

import React, { useEffect, useState, useRef } from "react";
import { useInView, useMotionValue, animate, useReducedMotion } from "framer-motion";

interface PriceCountUpProps {
  value: number;
  duration?: number;
  className?: string;
}

export const CountUp: React.FC<PriceCountUpProps> = ({
  value,
  duration = 1.4,
  className = "",
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const shouldReduceMotion = useReducedMotion();
  const motionVal = useMotionValue(0);
  const [displayVal, setDisplayVal] = useState(shouldReduceMotion ? value : 0);

  useEffect(() => {
    if (!isInView || shouldReduceMotion) {
      setDisplayVal(value);
      return;
    }

    const controls = animate(motionVal, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        setDisplayVal(Math.floor(latest));
      },
    });

    return () => controls.stop();
  }, [isInView, motionVal, value, duration, shouldReduceMotion]);

  // Format to Indian Currency Format: e.g. 11,990 or 29,990
  const formatted = displayVal.toLocaleString("en-IN");

  return (
    <span ref={ref} className={`font-black tracking-tight ${className}`}>
      ₹{formatted}
    </span>
  );
};
