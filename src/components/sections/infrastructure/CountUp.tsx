"use client";

import React, { useEffect, useState, useRef } from "react";
import { useMotionValue, animate, useReducedMotion, useInView } from "framer-motion";

interface CountUpProps {
  to: number;
  duration?: number;
  onComplete?: () => void;
  className?: string;
}

export const CountUp: React.FC<CountUpProps> = ({
  to,
  duration = 1.8,
  onComplete,
  className = "",
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const count = useMotionValue(0);
  const [displayValue, setDisplayValue] = useState<number>(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayValue(to);
      onComplete?.();
      return;
    }

    if (isInView) {
      const controls = animate(count, to, {
        duration,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (latest) => {
          setDisplayValue(Math.floor(latest));
        },
        onComplete: () => {
          setDisplayValue(to);
          onComplete?.();
        },
      });

      return () => controls.stop();
    }
  }, [isInView, to, duration, shouldReduceMotion, count, onComplete]);

  return (
    <span ref={ref} className={className}>
      {displayValue}
    </span>
  );
};
